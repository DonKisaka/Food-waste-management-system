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

