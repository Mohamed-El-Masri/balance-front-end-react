import React, { useState, useEffect } from 'react';
import googleAuthService from '../../services/googleAuth';

const GoogleOAuthTest: React.FC = () => {
  const [status, setStatus] = useState<string>('Initializing...');
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  const testGoogleAuth = async () => {
    try {
      setStatus('Testing Google OAuth...');
      setError(null);
      
      // Test the service
      const token = await googleAuthService.signInWithPopup();
      
      // Decode the JWT to show user info
      const parts = token.split('.');
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      
      setUserInfo(payload);
      setStatus('✅ Google OAuth working successfully!');
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setStatus('❌ Google OAuth failed');
      console.error('Google OAuth test error:', err);
    }
  };

  useEffect(() => {
    setStatus('Ready to test');
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>🧪 Google OAuth Test Page</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <strong>Status:</strong> {status}
      </div>

      {error && (
        <div style={{ 
          background: '#f8d7da', 
          color: '#721c24', 
          padding: '10px', 
          borderRadius: '5px', 
          marginBottom: '20px' 
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {userInfo && (
        <div style={{ 
          background: '#d4edda', 
          color: '#155724', 
          padding: '15px', 
          borderRadius: '5px', 
          marginBottom: '20px' 
        }}>
          <h3>✅ User Information:</h3>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Picture:</strong> {userInfo.picture && <img src={userInfo.picture} alt="Profile" style={{width: '50px', height: '50px', borderRadius: '50%'}} />}</p>
          <p><strong>Email Verified:</strong> {userInfo.email_verified ? 'Yes' : 'No'}</p>
        </div>
      )}

      <button 
        onClick={testGoogleAuth}
        style={{
          background: '#4285f4',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        🚀 Test Google OAuth
      </button>

      <div style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
        <h4>How this test works:</h4>
        <ul>
          <li>Clicks the button to test Google OAuth</li>
          <li>Uses the same service as the Sign In page</li>
          <li>Shows user information if successful</li>
          <li>Shows error details if failed</li>
        </ul>
      </div>
    </div>
  );
};

export default GoogleOAuthTest;
