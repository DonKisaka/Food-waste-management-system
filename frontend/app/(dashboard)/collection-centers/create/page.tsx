'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createCollectionCenter } from '@/app/actions/collection-centers';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

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
      return result as ActionState;
    },
    { success: false, message: '' }
  );

  useEffect(() => {
    if (state.success && state.message) {
      toast.success(state.message);
      router.push('/collection-centers');
    } else if (!state.success && state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/collection-centers">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create Collection Center</h1>
          <p className="text-gray-600 mt-1">Add a new waste collection facility</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <form action={formAction} className="p-6 space-y-6">
          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium text-gray-700">
              Location <span className="text-red-500">*</span>
            </Label>
            <Input
              id="location"
              name="location"
              type="text"
              placeholder="Enter location address"
              className="w-full"
              disabled={isPending}
              required
            />
            {state.errors?.location && (
              <p className="text-sm text-red-600">{state.errors.location[0]}</p>
            )}
          </div>

          {/* Maximum Capacity */}
          <div className="space-y-2">
            <Label htmlFor="maximumCapacityKg" className="text-sm font-medium text-gray-700">
              Maximum Capacity (kg) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="maximumCapacityKg"
              name="maximumCapacityKg"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="Enter maximum capacity in kilograms"
              className="w-full"
              disabled={isPending}
              required
            />
            {state.errors?.maximumCapacityKg && (
              <p className="text-sm text-red-600">{state.errors.maximumCapacityKg[0]}</p>
            )}
            <p className="text-sm text-gray-500">Specify the maximum waste capacity this center can hold</p>
          </div>

          {/* Waste Processor ID */}
          <div className="space-y-2">
            <Label htmlFor="wasteProcessorId" className="text-sm font-medium text-gray-700">
              Waste Processor ID <span className="text-red-500">*</span>
            </Label>
            <Input
              id="wasteProcessorId"
              name="wasteProcessorId"
              type="number"
              min="1"
              placeholder="Enter waste processor ID"
              className="w-full"
              disabled={isPending}
              required
            />
            {state.errors?.wasteProcessorId && (
              <p className="text-sm text-red-600">{state.errors.wasteProcessorId[0]}</p>
            )}
            <p className="text-sm text-gray-500">ID of the waste processor handling this collection center</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 sm:flex-initial"
            >
              {isPending ? 'Creating...' : 'Create Collection Center'}
            </Button>
            <Link href="/collection-centers" className="flex-1 sm:flex-initial">
              <Button type="button" variant="outline" className="w-full" disabled={isPending}>
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Ensure the waste processor exists before creating a collection center. 
          The center will be linked to the specified processor for waste handling.
        </p>
      </div>
    </div>
  );
}

