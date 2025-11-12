'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { createFoodDonor } from '@/app/actions/food-donors';
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

export default function CreateFoodDonorPage() {
  const router = useRouter();
  
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    async (_prevState, formData) => {
      const result = await createFoodDonor(formData);
      
      if (result.success) {
        toast.success('Donor created successfully!');
        router.push('/food-donors');
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
            href="/food-donors" 
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Donors
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Add New Food Donor</h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter the details of the new food donation source
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
                <FormLabel htmlFor="name" className="text-sm font-semibold text-gray-700">
                  Donor Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormInput
                  id="name"
                  name="name"
                  required
                  disabled={isPending}
                  placeholder="e.g., Fresh Market Store"
                  className="mt-1.5"
                />
                {state?.errors?.name && (
                  <p className="text-sm text-red-600 mt-1.5 flex items-center gap-1">
                    {state.errors.name[0]}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1.5">
                  The official name of the food donor organization
                </p>
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="address" className="text-sm font-semibold text-gray-700">
                  Address <span className="text-red-500">*</span>
                </FormLabel>
                <FormInput
                  id="address"
                  name="address"
                  required
                  disabled={isPending}
                  placeholder="e.g., 123 Main Street, City, State 12345"
                  className="mt-1.5"
                />
                {state?.errors?.address && (
                  <p className="text-sm text-red-600 mt-1.5">
                    {state.errors.address[0]}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1.5">
                  Full physical address of the donor location
                </p>
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="contactInfo" className="text-sm font-semibold text-gray-700">
                  Contact Information <span className="text-red-500">*</span>
                </FormLabel>
                <FormInput
                  id="contactInfo"
                  name="contactInfo"
                  required
                  disabled={isPending}
                  placeholder="e.g., john@example.com or +1 (555) 123-4567"
                  className="mt-1.5"
                />
                {state?.errors?.contactInfo && (
                  <p className="text-sm text-red-600 mt-1.5">
                    {state.errors.contactInfo[0]}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1.5">
                  Email address or phone number of primary contact
                </p>
              </FormGroup>

              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-gray-200">
                <Link href="/food-donors" className="flex-1 sm:flex-initial">
                  <Button 
                    type="button" 
                    variant="outline" 
                    disabled={isPending}
                    className="w-full sm:w-auto hover:bg-gray-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  disabled={isPending} 
                  className="bg-indigo-600 hover:bg-indigo-700 shadow-sm flex-1 sm:flex-initial"
                >
                  {isPending ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Create Donor
                    </>
                  )}
                </Button>
              </div>
            </Form>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Make sure all information is accurate before submitting. 
            You can edit these details later if needed.
          </p>
        </div>
      </div>
    </div>
  );
}
