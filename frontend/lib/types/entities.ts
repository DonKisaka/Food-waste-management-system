// All entity types in one simple file

export interface FoodDonor {
  id: number;
  name: string;
  address: string;
  contactInfo: string;
}

export interface CollectionCenter {
  id: number;
  location: string;
  maxCapacity: number;
}

export interface WasteProcessor {
  id: number;
  name: string;
  location: string;
  maxProcessingCapacity: number;
  processingType: string;
}

export interface FoodWasteItem {
  id: number;
  weight: number;
  expirationDate: string;
  wasteType: string;
  status: string;
  donorId: number;
}
