export interface Property {
  id: string
  title: string
  description: string
  price: number
  area: number
  bedrooms: number
  bathrooms: number
  location: string
  type: 'residential' | 'commercial' | 'investment' | 'luxury'
  status: 'for_sale' | 'for_rent' | 'sold' | 'rented'
  images: string[]
  features: string[]
  coordinates: {
    lat: number
    lng: number
  }
  projectName?: string
  projectNameAr?: string
  projectSlug?: string
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  slug: string
  title: {
    ar: string
    en: string
  }
  description: {
    ar: string
    en: string
  }
  status: {
    ar: string
    en: string
  }
  type: {
    ar: string
    en: string
  }
  location: {
    ar: string
    en: string
  }
  totalUnits?: number
  completionDate?: string
  startingPrice?: number
  images: string[]
  features: {
    ar: string[]
    en: string[]
  }
  coordinates: {
    lat: number
    lng: number
  }
  amenities?: {
    ar: string[]
    en: string[]
  }
  developer?: {
    ar: string
    en: string
  }
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'admin' | 'agent' | 'customer'
  avatar?: string
  createdAt: string
}

export interface Language {
  code: 'ar' | 'en'
  name: string
  direction: 'rtl' | 'ltr'
}

export interface Theme {
  mode: 'light' | 'dark'
}

export interface ContactForm {
  name: string
  email: string
  phone: string
  message: string
  propertyId?: string
}

export interface InterestFormData {
  name: string
  email: string
  phone: string
  contactMethod: 'email' | 'phone' | 'both'
  message?: string
  visitDate?: string
  visitTime?: string
}

// Google Maps API Types
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
    initMap: () => void;
  }
}

export interface GoogleMapsLocation {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  address: {
    ar: string;
    en: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  status: {
    ar: string;
    en: string;
  };
  type: {
    ar: string;
    en: string;
  };
}
