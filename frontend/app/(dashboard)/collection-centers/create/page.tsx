'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { createCollectionCenter } from '@/app/actions/collection-centers';
import { Button } from '@/components/ui/button';
import { Form, FormGroup, FormLabel, FormInput, FormError } from '@/components/ui/form';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ArrowLeft, Save, X } from 'lucide-react';

type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export default function CreateCollectionCenterPage() {
  const router = useRouter();
  
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    async (_prevState, formData) => {
      const result = await createCollectionCenter(formData);
      
      if (result.success) {
        toast.success('Collection center created successfully!');
        router.push('/collection-centers');
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
            href="/collection-centers" 
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Collection Centers
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Add New Collection Center</h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter the details of the new waste collection facility
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

              <FormGroup>
                <FormLabel htmlFor="location" className="text-sm font-semibold text-gray-700">
                  Location <span className="text-red-500">*</span>
                </FormLabel>
                <FormInput
                  id="location"
                  name="location"
                  required
                  disabled={isPending}
                  placeholder="e.g., 456 Industrial Park, City, State"
                  className="mt-1.5"
                />
                {state?.errors?.location && (
                  <p className="text-sm text-red-600 mt-1.5">
                    {state.errors.location[0]}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1.5">
                  Full address of the collection center facility
                </p>
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="maximumCapacityKg" className="text-sm font-semibold text-gray-700">
                  Maximum Capacity (kg) <span className="text-red-500">*</span>
                </FormLabel>
                <FormInput
                  id="maximumCapacityKg"
                  name="maximumCapacityKg"
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  disabled={isPending}
                  placeholder="e.g., 5000"
                  className="mt-1.5"
                />
                {state?.errors?.maximumCapacityKg && (
                  <p className="text-sm text-red-600 mt-1.5">
                    {state.errors.maximumCapacityKg[0]}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1.5">
                  Maximum waste capacity this center can hold in kilograms
                </p>
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="wasteProcessorId" className="text-sm font-semibold text-gray-700">
                  Waste Processor ID <span className="text-red-500">*</span>
                </FormLabel>
                <FormInput
                  id="wasteProcessorId"
                  name="wasteProcessorId"
                  type="number"
                  min="1"
                  required
                  disabled={isPending}
                  placeholder="e.g., 1"
                  className="mt-1.5"
                />
                {state?.errors?.wasteProcessorId && (
                  <p className="text-sm text-red-600 mt-1.5">
                    {state.errors.wasteProcessorId[0]}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1.5">
                  ID of the waste processor that handles this collection center
                </p>
              </FormGroup>

              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-gray-200">
                <Link href="/collection-centers" className="flex-1 sm:flex-initial">
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
                      Create Collection Center
                    </>
                  )}
                </Button>
              </div>
            </Form>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Ensure the waste processor exists before creating a collection center. 
            The center will be linked to the specified processor for waste handling.
          </p>
        </div>
      </div>
    </div>
  );
}
