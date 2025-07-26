import React, { useState } from 'react';
import { useLanguage } from '../../contexts/useLanguage';
import { useToast } from '../../contexts/useToast';
import authService from '../../services/authService';
import axios from 'axios';
import styles from '../../styles/components/test/ApiTest.module.css';

interface ApiTestResult {
  endpoint: string;
  status: 'success' | 'error' | 'pending';
  message: string;
  data?: any;
}

const ApiTestPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { showToast } = useToast();
  const isArabic = currentLanguage.code === 'ar';
  
  const [testResults, setTestResults] = useState<ApiTestResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const content = {
    en: {
      title: 'API Test Page',
      subtitle: 'Test Balance Real Estate API endpoints',
      testBasic: 'Test Basic Connection',
      testRegister: 'Test Registration',
      testLogin: 'Test Login',
      testAll: 'Test All Endpoints',
      clear: 'Clear Results',
      endpoint: 'Endpoint',
      status: 'Status',
      message: 'Message',
      data: 'Response Data',
      testing: 'Testing...',
      success: 'Success',
      error: 'Error',
      serverError: 'Server Error - Database not configured properly',
      networkError: 'Network Error - Cannot reach server',
      validationError: 'Validation Error',
      unknownError: 'Unknown Error'
    },
    ar: {
      title: 'صفحة اختبار الـ API',
      subtitle: 'اختبار نقاط نهاية API لبالانس العقارية',
      testBasic: 'اختبار الاتصال الأساسي',
      testRegister: 'اختبار التسجيل',
      testLogin: 'اختبار تسجيل الدخول',
      testAll: 'اختبار جميع النقاط',
      clear: 'مسح النتائج',
      endpoint: 'نقطة النهاية',
      status: 'الحالة',
      message: 'الرسالة',
      data: 'بيانات الاستجابة',
      testing: 'جاري الاختبار...',
      success: 'نجح',
      error: 'خطأ',
      serverError: 'خطأ في الخادم - قاعدة البيانات غير مُعدة بشكل صحيح',
      networkError: 'خطأ في الشبكة - لا يمكن الوصول للخادم',
      validationError: 'خطأ في التحقق',
      unknownError: 'خطأ غير معروف'
    }
  };

  const t = isArabic ? content.ar : content.en;

  const addTestResult = (result: ApiTestResult) => {
    setTestResults(prev => [...prev, result]);
  };

  const testBasicConnection = async () => {
    const result: ApiTestResult = {
      endpoint: 'GET /',
      status: 'pending',
      message: t.testing
    };
    addTestResult(result);

    try {
      const response = await axios.get('https://balancerealestate.runasp.net/');
      
      setTestResults(prev => prev.map(r => 
        r === result 
          ? { ...r, status: 'success', message: t.success, data: response.data }
          : r
      ));
      
      showToast('success', 'Basic connection successful');
    } catch (error: any) {
      setTestResults(prev => prev.map(r => 
        r === result 
          ? { ...r, status: 'error', message: error.message || t.networkError }
          : r
      ));
      
      showToast('error', 'Basic connection failed');
    }
  };

  const testRegistration = async () => {
    const result: ApiTestResult = {
      endpoint: 'POST /api/Auth/register',
      status: 'pending',
      message: t.testing
    };
    addTestResult(result);

    try {
      const testData = {
        userName: 'testuser123',
        email: 'test@example.com',
        password: 'Test123!@#',
        confirmPassword: 'Test123!@#',
        firstName: 'Test',
        lastName: 'User',
        phoneNumber: '+201001234567'
      };

      const response = await authService.register(testData);
      
      setTestResults(prev => prev.map(r => 
        r === result 
          ? { ...r, status: 'success', message: t.success, data: response }
          : r
      ));
      
      showToast('success', 'Registration test successful');
    } catch (error: any) {
      let errorMessage = t.unknownError;
      
      if (error.message.includes('AspNetUsers')) {
        errorMessage = t.serverError;
      } else if (error.message.includes('network') || error.message.includes('Network')) {
        errorMessage = t.networkError;
      } else if (error.message.includes('validation') || error.message.includes('تنسيق')) {
        errorMessage = t.validationError;
      } else {
        errorMessage = error.message;
      }
      
      setTestResults(prev => prev.map(r => 
        r === result 
          ? { ...r, status: 'error', message: errorMessage, data: error }
          : r
      ));
      
      showToast('error', 'Registration test failed');
    }
  };

  const testLogin = async () => {
    const result: ApiTestResult = {
      endpoint: 'POST /api/Auth/login',
      status: 'pending',
      message: t.testing
    };
    addTestResult(result);

    try {
      const testData = {
        email: 'test@example.com',
        password: 'Test123!@#'
      };

      const response = await authService.login(testData);
      
      setTestResults(prev => prev.map(r => 
        r === result 
          ? { ...r, status: 'success', message: t.success, data: response }
          : r
      ));
      
      showToast('success', 'Login test successful');
    } catch (error: any) {
      let errorMessage = t.unknownError;
      
      if (error.message.includes('AspNetUsers')) {
        errorMessage = t.serverError;
      } else if (error.message.includes('network') || error.message.includes('Network')) {
        errorMessage = t.networkError;
      } else if (error.message.includes('validation') || error.message.includes('تنسيق')) {
        errorMessage = t.validationError;
      } else {
        errorMessage = error.message;
      }
      
      setTestResults(prev => prev.map(r => 
        r === result 
          ? { ...r, status: 'error', message: errorMessage, data: error }
          : r
      ));
      
      showToast('error', 'Login test failed');
    }
  };

  const testAllEndpoints = async () => {
    setIsLoading(true);
    await testBasicConnection();
    await new Promise(resolve => setTimeout(resolve, 1000));
    await testRegistration();
    await new Promise(resolve => setTimeout(resolve, 1000));
    await testLogin();
    setIsLoading(false);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className={styles.apiTest} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.apiTest__container}>
        <div className={styles.apiTest__header}>
          <h1 className={styles.apiTest__title}>{t.title}</h1>
          <p className={styles.apiTest__subtitle}>{t.subtitle}</p>
        </div>

        <div className={styles.apiTest__actions}>
          <button 
            onClick={testBasicConnection}
            disabled={isLoading}
            className={styles.apiTest__button}
          >
            {t.testBasic}
          </button>
          
          <button 
            onClick={testRegistration}
            disabled={isLoading}
            className={styles.apiTest__button}
          >
            {t.testRegister}
          </button>
          
          <button 
            onClick={testLogin}
            disabled={isLoading}
            className={styles.apiTest__button}
          >
            {t.testLogin}
          </button>
          
          <button 
            onClick={testAllEndpoints}
            disabled={isLoading}
            className={`${styles.apiTest__button} ${styles.apiTest__button_primary}`}
          >
            {isLoading ? t.testing : t.testAll}
          </button>
          
          <button 
            onClick={clearResults}
            disabled={isLoading}
            className={`${styles.apiTest__button} ${styles.apiTest__button_secondary}`}
          >
            {t.clear}
          </button>
        </div>

        <div className={styles.apiTest__results}>
          <h2 className={styles.apiTest__resultsTitle}>Test Results</h2>
          
          {testResults.length === 0 ? (
            <p className={styles.apiTest__noResults}>
              {isArabic ? 'لا توجد نتائج اختبار حتى الآن' : 'No test results yet'}
            </p>
          ) : (
            <div className={styles.apiTest__resultsList}>
              {testResults.map((result, index) => (
                <div 
                  key={index} 
                  className={`${styles.apiTest__result} ${styles[`apiTest__result_${result.status}`]}`}
                >
                  <div className={styles.apiTest__resultHeader}>
                    <span className={styles.apiTest__endpoint}>{result.endpoint}</span>
                    <span className={`${styles.apiTest__status} ${styles[`apiTest__status_${result.status}`]}`}>
                      {result.status === 'success' ? t.success : 
                       result.status === 'error' ? t.error : 
                       t.testing}
                    </span>
                  </div>
                  
                  <div className={styles.apiTest__message}>
                    {result.message}
                  </div>
                  
                  {result.data && (
                    <details className={styles.apiTest__details}>
                      <summary>{t.data}</summary>
                      <pre className={styles.apiTest__data}>
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiTestPage;
