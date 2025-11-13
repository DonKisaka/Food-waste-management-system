'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { WasteProcessorSchema } from '@/lib/validations/entities';
import { getSession } from '@/lib/session';
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/utils/constants';

async function getAuthHeaders(): Promise<Record<string, string>> {
  const token = await getSession();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export async function getWasteProcessors() {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.WASTE_PROCESSORS}`, { headers });
    
    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data?.message || 'Failed to fetch waste processors' };
    }
    return { success: false, message: 'Failed to fetch waste processors' };
  }
}

export async function getWasteProcessor(id: number) {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.WASTE_PROCESSORS}/${id}`, { headers });
    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data?.message || 'Failed to fetch waste processor' };
    }
    return { success: false, message: 'Failed to fetch waste processor' };
  }
}

export async function createWasteProcessor(formData: FormData) {
  try {
    const data = {
      name: formData.get('name') as string,
      location: formData.get('location') as string,
      maximumProcessingCapacityKg: parseFloat(formData.get('maximumProcessingCapacityKg') as string),
      processingType: formData.get('processingType') as string,
    };

    const validation = WasteProcessorSchema.safeParse(data);
    if (!validation.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const headers = await getAuthHeaders();
    const response = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.WASTE_PROCESSORS}`,
      validation.data,
      { headers }
    );

    revalidatePath('/waste-processors');
    return { success: true, message: 'Waste processor created!', data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data?.message || 'Failed to create waste processor' };
    }
    return { success: false, message: 'Failed to create waste processor' };
  }
}

export async function updateWasteProcessor(id: number, formData: FormData) {
  try {
    const data = {
      name: formData.get('name') as string,
      location: formData.get('location') as string,
      maximumProcessingCapacityKg: parseFloat(formData.get('maximumProcessingCapacityKg') as string),
      processingType: formData.get('processingType') as string,
    };

    const validation = WasteProcessorSchema.safeParse(data);
    if (!validation.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const headers = await getAuthHeaders();
    const response = await axios.put(
      `${API_BASE_URL}${API_ENDPOINTS.WASTE_PROCESSORS}/${id}`,
      validation.data,
      { headers }
    );

    revalidatePath('/waste-processors');
    return { success: true, message: 'Waste processor updated!', data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data?.message || 'Failed to update waste processor' };
    }
    return { success: false, message: 'Failed to update waste processor' };
  }
}

export async function deleteWasteProcessor(id: number) {
  try {
    const headers = await getAuthHeaders();
    await axios.delete(`${API_BASE_URL}${API_ENDPOINTS.WASTE_PROCESSORS}/${id}`, { headers });
    revalidatePath('/waste-processors');
    return { success: true, message: 'Waste processor deleted!' };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data?.message || 'Failed to delete waste processor' };
    }
    return { success: false, message: 'Failed to delete waste processor' };
  }
}

