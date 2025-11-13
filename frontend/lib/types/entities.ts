
export interface FoodDonor {
  id: number;
  name: string;
  address: string;
  contactInfo: string;
  registrationDate?: string; 
}

export interface CollectionCenter {
  id: number;
  location: string;
  maximumCapacityKg: number;
  wasteProcessorId: number;
}

export interface WasteProcessor {
  id: number;
  name: string;
  location: string;
  maximumProcessingCapacityKg: number;
  processingType: string;
}

export interface FoodWasteItem {
  id: number;
  weightKg: number;
  expirationDate: string;
  wasteType: string;
  status: string;
  foodDonorId: number;
}
