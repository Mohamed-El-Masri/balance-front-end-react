const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://balancerealestate.runasp.net/api';

export interface FavoriteUnit {
  id: number;
  name: string;
  nameAr: string;
  price: number;
  area: number;
  location: string;
  locationAr: string;
  image: string;
  type: string;
  typeAr: string;
  bedrooms?: number;
  bathrooms?: number;
  isAvailable: boolean;
}

export interface FavoriteProject {
  id: number;
  title: string;
  titleAr: string;
  description?: string;
  descriptionAr?: string;
  price: string;
  priceAr: string;
  location: string;
  locationAr: string;
  image: string;
  status: string;
  statusAr: string;
  completionDate: string;
  totalUnits?: number;
  district?: string;
  city?: string;
  area?: string;
  slug?: string;
}

export interface UserFavoritesResponse {
  itemsProjects: FavoriteProject[];
  itemsUnits: FavoriteUnit[];
  totalCountProjects: number;
  totalCountUnits: number;
}

export interface FavoriteProjectsResponse {
  items: FavoriteProject[];
  totalCount: number;
}

export interface FavoriteUnitsResponse {
  items: FavoriteUnit[];
  totalCount: number;
}

export interface AddToFavoritesRequest {
  userId: string;
  unitId?: number;
  projectId?: number;
  isAvailable: boolean;
}

class FavoritesAPI {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = `${API_BASE_URL}/favorites`;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        
        try {
          const errorData = await response.json();
          // Handle different error response formats
          if (errorData.detail) {
            errorMessage = errorData.detail;
          } else if (errorData.message) {
            errorMessage = errorData.message;
          } else if (errorData.title) {
            errorMessage = errorData.title;
          }
        } catch (parseError) {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error('Favorites API Error:', error);
      throw error;
    }
  }

  // GET /favorites/user-units-projects/{userId}
  async getUserFavorites(userId: string): Promise<UserFavoritesResponse> {
    return this.request<UserFavoritesResponse>(`/user-units-projects/${userId}`);
  }

  // GET /favorites/project/{userId}
  async getFavoriteProjects(userId: string): Promise<FavoriteProjectsResponse> {
    return this.request<FavoriteProjectsResponse>(`/project/${userId}`);
  }

  // GET /favorites/unit/{userId}
  async getFavoriteUnits(userId: string): Promise<FavoriteUnitsResponse> {
    return this.request<FavoriteUnitsResponse>(`/unit/${userId}`);
  }

  // POST /favorites/unit
  async addUnitToFavorites(data: AddToFavoritesRequest): Promise<FavoriteUnitsResponse> {
    return this.request<FavoriteUnitsResponse>('/unit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // POST /favorites/project
  async addProjectToFavorites(data: AddToFavoritesRequest): Promise<FavoriteProjectsResponse> {
    return this.request<FavoriteProjectsResponse>('/project', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT /favorites/unit?unitId={unitId}
  async removeUnitFromFavorites(unitId: number): Promise<FavoriteUnitsResponse> {
    return this.request<FavoriteUnitsResponse>(`/unit?unitId=${unitId}`, {
      method: 'PUT',
    });
  }

  // PUT /favorites/project?projectId={projectId}
  async removeProjectFromFavorites(projectId: number): Promise<FavoriteProjectsResponse> {
    return this.request<FavoriteProjectsResponse>(`/project?projectId=${projectId}`, {
      method: 'PUT',
    });
  }
}

export const favoritesAPI = new FavoritesAPI();
