'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createFoodWasteItem } from '@/app/actions/food-waste-items';
import { getFoodDonors } from '@/app/actions/food-donors';
import { Button } from '@/components/ui/button';
import { Form, FormGroup, FormLabel, FormInput, FormError } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ArrowLeft, Save, X } from 'lucide-react';
import { WASTE_TYPE_LABELS, PROCESSING_STATUS_LABELS } from '@/lib/utils/constants';
import { FoodDonor } from '@/lib/types/entities';

type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export default function CreateFoodWasteItemPage() {
  const router = useRouter();
  const [wasteType, setWasteType] = useState('');
  const [status, setStatus] = useState('');
  const [foodDonorId, setFoodDonorId] = useState('');
  const [donors, setDonors] = useState<FoodDonor[]>([]);
  const [loadingDonors, setLoadingDonors] = useState(true);

  useEffect(() => {
    async function loadDonors() {
      const result = await getFoodDonors();
      if (result.success) {
        setDonors(result.data || []);
      }
      setLoadingDonors(false);
    }
    loadDonors();
  }, []);
  
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    async (_prevState, formData) => {
      const result = await createFoodWasteItem(formData);
      
      if (result.success) {
        toast.success('Food waste item created successfully!');
        router.push('/food-waste-items');
      }
      
      return result;
    },
    { success: false, message: '' }
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/food-waste-items" 
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Food Waste Items
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Add New Food Waste Item</h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter the details of the new food waste donation
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 sm:p-8">
            <Form action={formAction} className="space-y-6">
              {state?.message && !state.success && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <FormError>{state.message}</FormError>
                </div>
              )}

              {/* Hidden inputs to sync Select values with FormData */}
              <input type="hidden" name="wasteType" value={wasteType} />
              <input type="hidden" name="status" value={status} />
              <input type="hidden" name="foodDonorId" value={foodDonorId} />

              <FormGroup>
                <FormLabel htmlFor="weightKg" className="text-sm font-semibold text-gray-700">
                  Weight (kg) <span className="text-red-500">*</span>
                </FormLabel>
                <FormInput
                  id="weightKg"
                  name="weightKg"
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  disabled={isPending}
                  placeholder="e.g., 25.5"
                  className="mt-1.5"
                />
                {state?.errors?.weightKg && (
                  <p className="text-sm text-red-600 mt-1.5">
                    {state.errors.weightKg[0]}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1.5">
                  Total weight of the food waste in kilograms
                </p>
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="expirationDate" className="text-sm font-semibold text-gray-700">
                  Expiration Date <span className="text-red-500">*</span>
                </FormLabel>
                <FormInput
                  id="expirationDate"
                  name="expirationDate"
                  type="date"
                  required
                  disabled={isPending}
                  className="mt-1.5"
                />
                {state?.errors?.expirationDate && (
                  <p className="text-sm text-red-600 mt-1.5">
                    {state.errors.expirationDate[0]}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1.5">
                  Date when the food waste will expire
                </p>
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="wasteType" className="text-sm font-semibold text-gray-700">
                  Waste Type <span className="text-red-500">*</span>
                </FormLabel>
                <Select value={wasteType} onValueChange={setWasteType} disabled={isPending}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select waste type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(WASTE_TYPE_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {state?.errors?.wasteType && (
                  <p className="text-sm text-red-600 mt-1.5">
                    {state.errors.wasteType[0]}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1.5">
                  Category of the food waste being donated
                </p>
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="status" className="text-sm font-semibold text-gray-700">
                  Processing Status <span className="text-red-500">*</span>
                </FormLabel>
                <Select value={status} onValueChange={setStatus} disabled={isPending}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select processing status" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PROCESSING_STATUS_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {state?.errors?.status && (
                  <p className="text-sm text-red-600 mt-1.5">
                    {state.errors.status[0]}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1.5">
                  Current processing status of the food waste
                </p>
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="foodDonorId" className="text-sm font-semibold text-gray-700">
                  Food Donor <span className="text-red-500">*</span>
                </FormLabel>
                <Select value={foodDonorId} onValueChange={setFoodDonorId} disabled={isPending || loadingDonors}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder={loadingDonors ? "Loading donors..." : "Select food donor"} />
                  </SelectTrigger>
                  <SelectContent>
                    {donors.map((donor) => (
                      <SelectItem key={donor.id} value={donor.id.toString()}>
                        {donor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {state?.errors?.foodDonorId && (
                  <p className="text-sm text-red-600 mt-1.5">
                    {state.errors.foodDonorId[0]}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1.5">
                  Organization that provided this food waste donation
                </p>
              </FormGroup>

              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-gray-200">
                <Link href="/food-waste-items" className="flex-1 sm:flex-initial">
                  <Button 
                    type="button" 
                    variant="outline" 
                    disabled={isPending}
                    className="w-full sm:w-auto hover:bg-gray-50 cursor-pointer"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  disabled={isPending} 
                  className="bg-indigo-600 hover:bg-indigo-700 shadow-sm flex-1 sm:flex-initial cursor-pointer"
                >
                  {isPending ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Create Food Waste Item
                    </>
                  )}
                </Button>
              </div>
            </Form>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Each food waste item represents a batch of donated food waste. 
            Make sure to select the correct donor and waste type for accurate tracking.
          </p>
        </div>
      </div>
    </div>
  );
}
