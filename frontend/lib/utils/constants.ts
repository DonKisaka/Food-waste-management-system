export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_ENDPOINTS = {
  AUTH: {
    SIGNIN: '/api/v1/auth/login',  
    SIGNUP: '/api/v1/auth/signup',  
    ME: '/api/v1/auth/me',
  },
  FOOD_DONORS: '/api/v1/food-donor',              
  COLLECTION_CENTERS: '/api/v1/collection-centers', 
  WASTE_PROCESSORS: '/api/v1/waste-processor',    
  FOOD_WASTE_ITEMS: '/api/v1/food-waste-item',    
} as const;

export const TOKEN_KEY = 'auth_token';
export const TOKEN_EXPIRY_KEY = 'token_expiry';

export const WASTE_TYPE_LABELS = {
  VEGETABLES: 'Vegetables',
  FRUITS: 'Fruits',
  MEAT: 'Meat',
  DAIRY: 'Dairy',
  GRAINS: 'Grains',
  OTHERS: 'Others',
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

