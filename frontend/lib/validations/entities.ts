import { z } from 'zod';

export const FoodDonorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  contactInfo: z.string().min(1, 'Contact info is required'),
});

export const CollectionCenterSchema = z.object({
  location: z.string().min(1, 'Location is required'),
  maximumCapacityKg: z.number().min(0.01, 'Maximum capacity must be greater than 0'),
  wasteProcessorId: z.number().min(1, 'Waste processor is required'),
});

export const WasteProcessorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  location: z.string().min(1, 'Location is required'),
  maximumProcessingCapacityKg: z.number().min(0.01, 'Maximum processing capacity must be greater than 0'),
  processingType: z.string().min(1, 'Processing type is required'),
});

export const FoodWasteItemSchema = z.object({
  weightKg: z.number().min(0.01, 'Weight must be greater than 0'),
  expirationDate: z.string().min(1, 'Expiration date is required'),
  wasteType: z.string().min(1, 'Waste type is required'),
  status: z.string().min(1, 'Status is required'),
  foodDonorId: z.number().min(1, 'Food donor is required'),
});

