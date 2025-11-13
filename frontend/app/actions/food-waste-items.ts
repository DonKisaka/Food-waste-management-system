'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { FoodWasteItemSchema } from '@/lib/validations/entities';
import { getSession } from '@/lib/session';
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/utils/constants';

async function getAuthHeaders(): Promise<Record<string, string>> {
  const token = await getSession();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export async function getFoodWasteItems() {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.FOOD_WASTE_ITEMS}`, { headers });
    
    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data?.message || 'Failed to fetch food waste items' };
    }
    return { success: false, message: 'Failed to fetch food waste items' };
  }
}

export async function getFoodWasteItem(id: number) {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.FOOD_WASTE_ITEMS}/${id}`, { headers });
    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data?.message || 'Failed to fetch food waste item' };
    }
    return { success: false, message: 'Failed to fetch food waste item' };
  }
}

export async function createFoodWasteItem(formData: FormData) {
  try {
    const data = {
      weightKg: parseFloat(formData.get('weightKg') as string),
      expirationDate: formData.get('expirationDate') as string,
      wasteType: formData.get('wasteType') as string,
      status: formData.get('status') as string,
      foodDonorId: parseInt(formData.get('foodDonorId') as string, 10),
    };

    const validation = FoodWasteItemSchema.safeParse(data);
    if (!validation.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const headers = await getAuthHeaders();
    const response = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.FOOD_WASTE_ITEMS}`,
      validation.data,
      { headers }
    );

    revalidatePath('/food-waste-items');
    return { success: true, message: 'Food waste item created!', data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data?.message || 'Failed to create food waste item' };
    }
    return { success: false, message: 'Failed to create food waste item' };
  }
}

export async function updateFoodWasteItem(id: number, formData: FormData) {
  try {
    const data = {
      weightKg: parseFloat(formData.get('weightKg') as string),
      expirationDate: formData.get('expirationDate') as string,
      wasteType: formData.get('wasteType') as string,
      status: formData.get('status') as string,
      foodDonorId: parseInt(formData.get('foodDonorId') as string, 10),
    };

    const validation = FoodWasteItemSchema.safeParse(data);
    if (!validation.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const headers = await getAuthHeaders();
    const response = await axios.put(
      `${API_BASE_URL}${API_ENDPOINTS.FOOD_WASTE_ITEMS}/${id}`,
      validation.data,
      { headers }
    );

    revalidatePath('/food-waste-items');
    return { success: true, message: 'Food waste item updated!', data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data?.message || 'Failed to update food waste item' };
    }
    return { success: false, message: 'Failed to update food waste item' };
  }
}

export async function deleteFoodWasteItem(id: number) {
  try {
    const headers = await getAuthHeaders();
    await axios.delete(`${API_BASE_URL}${API_ENDPOINTS.FOOD_WASTE_ITEMS}/${id}`, { headers });
    revalidatePath('/food-waste-items');
    return { success: true, message: 'Food waste item deleted!' };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data?.message || 'Failed to delete food waste item' };
    }
    return { success: false, message: 'Failed to delete food waste item' };
  }
}

