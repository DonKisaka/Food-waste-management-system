'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { FoodDonorSchema } from '@/lib/validations/entities';
import { getSession } from '@/lib/session';
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/utils/constants';

async function getAuthHeaders(): Promise<Record<string, string>> {
  const token = await getSession();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export async function getFoodDonors() {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.FOOD_DONORS}`, { headers });
    
    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data?.message || 'Failed to fetch donors' };
    }
    return { success: false, message: 'Failed to fetch donors' };
  }
}

export async function getFoodDonor(id: number) {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.FOOD_DONORS}/${id}`, { headers });
    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data?.message || 'Failed to fetch donor' };
    }
    return { success: false, message: 'Failed to fetch donor' };
  }
}

export async function createFoodDonor(formData: FormData) {
  try {
    const data = {
      name: formData.get('name') as string,
      address: formData.get('address') as string,
      contactInfo: formData.get('contactInfo') as string,
    };

    const validation = FoodDonorSchema.safeParse(data);
    if (!validation.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const headers = await getAuthHeaders();
    const response = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.FOOD_DONORS}`,
      validation.data,
      { headers }
    );

    revalidatePath('/food-donors');
    return { success: true, message: 'Donor created!', data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data?.message || 'Failed to create donor' };
    }
    return { success: false, message: 'Failed to create donor' };
  }
}

export async function updateFoodDonor(id: number, formData: FormData) {
  try {
    const data = {
      name: formData.get('name') as string,
      address: formData.get('address') as string,
      contactInfo: formData.get('contactInfo') as string,
    };

    const validation = FoodDonorSchema.safeParse(data);
    if (!validation.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const headers = await getAuthHeaders();
    const response = await axios.put(
      `${API_BASE_URL}${API_ENDPOINTS.FOOD_DONORS}/${id}`,
      validation.data,
      { headers }
    );

    revalidatePath('/food-donors');
    return { success: true, message: 'Donor updated!', data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data?.message || 'Failed to update donor' };
    }
    return { success: false, message: 'Failed to update donor' };
  }
}

export async function deleteFoodDonor(id: number) {
  try {
    const headers = await getAuthHeaders();
    await axios.delete(`${API_BASE_URL}${API_ENDPOINTS.FOOD_DONORS}/${id}`, { headers });
    revalidatePath('/food-donors');
    return { success: true, message: 'Donor deleted!' };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data?.message || 'Failed to delete donor' };
    }
    return { success: false, message: 'Failed to delete donor' };
  }
}

