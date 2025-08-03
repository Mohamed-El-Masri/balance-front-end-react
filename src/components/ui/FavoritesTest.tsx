import React from 'react';
import { useFavorites } from '../../contexts/useFavorites';
import { useAuth } from '../../contexts/useAuth';
import { useLanguage } from '../../contexts/useLanguage';

// مكون اختبار للمفضلة
const FavoritesTest: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { currentLanguage } = useLanguage();
  const { 
    favoriteProjects, 
    favoriteUnits, 
    totalFavoriteProjects, 
    totalFavoriteUnits,
    isLoading,
    error,
    addProjectToFavorites,
    removeProjectFromFavorites,
    isProjectFavorited
  } = useFavorites();
  
  const isArabic = currentLanguage.code === 'ar';

  const testProject = {
    id: 1,
    title: 'Test Project',
    titleAr: 'مشروع تجريبي'
  };

  const handleTestAddProject = async () => {
    await addProjectToFavorites(testProject.id);
  };

  const handleTestRemoveProject = async () => {
    await removeProjectFromFavorites(testProject.id);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '20px', border: '2px solid #f0f0f0', margin: '20px' }}>
        <h2>🔐 Favorites Test - Not Authenticated</h2>
        <p>{isArabic ? 'يرجى تسجيل الدخول لاختبار المفضلة' : 'Please sign in to test favorites'}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', border: '2px solid #4CAF50', margin: '20px', borderRadius: '8px' }}>
      <h2>✅ Favorites Test Component</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <strong>User:</strong> {user?.firstName} {user?.lastName} ({user?.email})
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>Loading:</strong> {isLoading ? '⏳ Yes' : '✅ No'}
      </div>

      {error && (
        <div style={{ color: 'red', marginBottom: '15px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div style={{ marginBottom: '15px' }}>
        <strong>Total Favorites:</strong> 
        <ul>
          <li>Projects: {totalFavoriteProjects}</li>
          <li>Units: {totalFavoriteUnits}</li>
        </ul>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>Test Project (ID: {testProject.id}):</strong>
        <div>
          Status: {isProjectFavorited(testProject.id) ? '❤️ Favorited' : '🤍 Not Favorited'}
        </div>
        <div style={{ marginTop: '10px' }}>
          <button 
            onClick={handleTestAddProject}
            disabled={isLoading || isProjectFavorited(testProject.id)}
            style={{ 
              marginRight: '10px', 
              padding: '8px 16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            ➕ Add to Favorites
          </button>
          <button 
            onClick={handleTestRemoveProject}
            disabled={isLoading || !isProjectFavorited(testProject.id)}
            style={{ 
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            ➖ Remove from Favorites
          </button>
        </div>
      </div>

      <div>
        <strong>Current Favorite Projects:</strong>
        {favoriteProjects.length > 0 ? (
          <ul>
            {favoriteProjects.map(project => (
              <li key={project.id}>
                {isArabic ? project.titleAr : project.title} (ID: {project.id})
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ fontStyle: 'italic', color: '#666' }}>No favorite projects yet</p>
        )}
      </div>

      <div style={{ marginTop: '15px' }}>
        <strong>Current Favorite Units:</strong>
        {favoriteUnits.length > 0 ? (
          <ul>
            {favoriteUnits.map(unit => (
              <li key={unit.id}>
                {isArabic ? unit.nameAr : unit.name} (ID: {unit.id})
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ fontStyle: 'italic', color: '#666' }}>No favorite units yet</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesTest;
