'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { CollectionCenterSchema } from '@/lib/validations/entities';
import { getSession } from '@/lib/session';
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/utils/constants';

async function getAuthHeaders(): Promise<Record<string, string>> {
  const token = await getSession();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export async function getCollectionCenters() {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.COLLECTION_CENTERS}`, { headers });
    
    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data?.message || 'Failed to fetch collection centers' };
    }
    return { success: false, message: 'Failed to fetch collection centers' };
  }
}

export async function getCollectionCenter(id: number) {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.COLLECTION_CENTERS}/${id}`, { headers });
    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data?.message || 'Failed to fetch collection center' };
    }
    return { success: false, message: 'Failed to fetch collection center' };
  }
}

export async function createCollectionCenter(formData: FormData) {
  try {
    const data = {
      location: formData.get('location') as string,
      maximumCapacityKg: parseFloat(formData.get('maximumCapacityKg') as string),
      wasteProcessorId: parseInt(formData.get('wasteProcessorId') as string, 10),
    };

    const validation = CollectionCenterSchema.safeParse(data);
    if (!validation.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const headers = await getAuthHeaders();
    const response = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.COLLECTION_CENTERS}`,
      validation.data,
      { headers }
    );

    revalidatePath('/collection-centers');
    return { success: true, message: 'Collection center created!', data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data?.message || 'Failed to create collection center' };
    }
    return { success: false, message: 'Failed to create collection center' };
  }
}

export async function updateCollectionCenter(id: number, formData: FormData) {
  try {
    const data = {
      location: formData.get('location') as string,
      maximumCapacityKg: parseFloat(formData.get('maximumCapacityKg') as string),
      wasteProcessorId: parseInt(formData.get('wasteProcessorId') as string, 10),
    };

    const validation = CollectionCenterSchema.safeParse(data);
    if (!validation.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const headers = await getAuthHeaders();
    const response = await axios.put(
      `${API_BASE_URL}${API_ENDPOINTS.COLLECTION_CENTERS}/${id}`,
      validation.data,
      { headers }
    );

    revalidatePath('/collection-centers');
    return { success: true, message: 'Collection center updated!', data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data?.message || 'Failed to update collection center' };
    }
    return { success: false, message: 'Failed to update collection center' };
  }
}

export async function deleteCollectionCenter(id: number) {
  try {
    const headers = await getAuthHeaders();
    await axios.delete(`${API_BASE_URL}${API_ENDPOINTS.COLLECTION_CENTERS}/${id}`, { headers });
    revalidatePath('/collection-centers');
    return { success: true, message: 'Collection center deleted!' };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data?.message || 'Failed to delete collection center' };
    }
    return { success: false, message: 'Failed to delete collection center' };
  }
}

