// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// API Endpoints - Must match Spring Boot backend exactly
export const API_ENDPOINTS = {
  AUTH: {
    SIGNIN: '/v1/auth/signin',      
    SIGNUP: '/v1/auth/signup',  
    ME: '/v1/auth/me',
  },
  FOOD_DONORS: '/v1/food-donor',              
  COLLECTION_CENTERS: '/v1/collection-centers', 
  WASTE_PROCESSORS: '/v1/waste-processor',    
  FOOD_WASTE_ITEMS: '/v1/food-waste-item',    
} as const;

// Cookie & Session Keys
export const TOKEN_KEY = 'auth_token';
export const TOKEN_EXPIRY_KEY = 'token_expiry';

// Enum Labels
export const WASTE_TYPE_LABELS = {
  VEGETABLES: 'Vegetables',
  DAIRY: 'Dairy',
  GRAINS: 'Grains',
  MEAT: 'Meat',
  FRUITS: 'Fruits',
  OTHER: 'Other',
} as const;

export const PROCESSING_STATUS_LABELS = {
  PROCESSING: 'Processing',
  PROCESSED: 'Processed',
  CANCELLED: 'Cancelled',
} as const;

export const PROCESSING_TYPE_LABELS = {
  COMPOSTING: 'Composting',
  BIOGAS: 'Biogas',
  FERTILIZER: 'Fertilizer',
  ANIMAL_FEED: 'Animal Feed',
  ENERGY_CONVERSION: 'Energy Conversion',
} as const;

