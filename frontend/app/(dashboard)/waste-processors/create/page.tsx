'use client';

import { useActionState, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createWasteProcessor } from '@/app/actions/waste-processors';
import { Button } from '@/components/ui/button';
import { Form, FormGroup, FormLabel, FormInput, FormError } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ArrowLeft, Save, X } from 'lucide-react';
import { PROCESSING_TYPE_LABELS } from '@/lib/utils/constants';

type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export default function CreateWasteProcessorPage() {
  const router = useRouter();
  const [processingType, setProcessingType] = useState('');
  
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    async (_prevState, formData) => {
      const result = await createWasteProcessor(formData);
      
      if (result.success) {
        toast.success('Waste processor created successfully!');
        router.push('/waste-processors');
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
            href="/waste-processors" 
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Waste Processors
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Add New Waste Processor</h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter the details of the new waste processing facility
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

              {/* Hidden input to sync Select value with FormData */}
              <input type="hidden" name="processingType" value={processingType} />

              <FormGroup>
                <FormLabel htmlFor="name" className="text-sm font-semibold text-gray-700">
                  Processor Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormInput
                  id="name"
                  name="name"
                  required
                  disabled={isPending}
                  placeholder="e.g., Green Energy Waste Facility"
                  className="mt-1.5"
                />
                {state?.errors?.name && (
                  <p className="text-sm text-red-600 mt-1.5">
                    {state.errors.name[0]}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1.5">
                  The official name of the waste processing facility
                </p>
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="location" className="text-sm font-semibold text-gray-700">
                  Location <span className="text-red-500">*</span>
                </FormLabel>
                <FormInput
                  id="location"
                  name="location"
                  required
                  disabled={isPending}
                  placeholder="e.g., 789 Processing Drive, City, State"
                  className="mt-1.5"
                />
                {state?.errors?.location && (
                  <p className="text-sm text-red-600 mt-1.5">
                    {state.errors.location[0]}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1.5">
                  Full physical address of the processing facility
                </p>
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="maximumProcessingCapacityKg" className="text-sm font-semibold text-gray-700">
                  Maximum Processing Capacity (kg) <span className="text-red-500">*</span>
                </FormLabel>
                <FormInput
                  id="maximumProcessingCapacityKg"
                  name="maximumProcessingCapacityKg"
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  disabled={isPending}
                  placeholder="e.g., 10000"
                  className="mt-1.5"
                />
                {state?.errors?.maximumProcessingCapacityKg && (
                  <p className="text-sm text-red-600 mt-1.5">
                    {state.errors.maximumProcessingCapacityKg[0]}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1.5">
                  Maximum waste this processor can handle in kilograms
                </p>
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="processingType" className="text-sm font-semibold text-gray-700">
                  Processing Type <span className="text-red-500">*</span>
                </FormLabel>
                <Select value={processingType} onValueChange={setProcessingType} disabled={isPending}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select processing type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PROCESSING_TYPE_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {state?.errors?.processingType && (
                  <p className="text-sm text-red-600 mt-1.5">
                    {state.errors.processingType[0]}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1.5">
                  Type of waste processing performed at this facility
                </p>
              </FormGroup>

              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-gray-200">
                <Link href="/waste-processors" className="flex-1 sm:flex-initial">
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
                      Create Waste Processor
                    </>
                  )}
                </Button>
              </div>
            </Form>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Waste processors handle the conversion of food waste into useful byproducts 
            such as compost, biogas, fertilizer, animal feed, or energy.
          </p>
        </div>
      </div>
    </div>
  );
}
