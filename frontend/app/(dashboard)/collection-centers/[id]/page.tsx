'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getCollectionCenter, updateCollectionCenter, deleteCollectionCenter } from '@/app/actions/collection-centers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { CollectionCenter } from '@/lib/types/entities';
import { ArrowLeft, Edit, Trash2, Save, X, MapPin, Gauge } from 'lucide-react';

export default function CollectionCenterDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [center, setCenter] = useState<CollectionCenter | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function load() {
      const result = await getCollectionCenter(id);
      if (result.success) setCenter(result.data);
      setLoading(false);
    }
    load();
  }, [id]);

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await updateCollectionCenter(id, formData);
    if (result.success) {
      toast.success('Collection center updated successfully!');
      setCenter(result.data!);
      setIsEditing(false);
    } else {
      toast.error(result.message || 'Failed to update collection center');
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this collection center? This action cannot be undone.')) return;
    
    setIsDeleting(true);
    const result = await deleteCollectionCenter(id);
    if (result.success) {
      toast.success('Collection center deleted successfully!');
      router.push('/collection-centers');
    } else {
      toast.error(result.message || 'Failed to delete collection center');
      setIsDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading collection center details...</p>
        </div>
      </div>
    );
  }

  if (!center) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Collection Center Not Found</h2>
          <p className="text-gray-600 mb-6">The collection center you are looking for does not exist or has been removed.</p>
          <Link href="/collection-centers">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Collection Centers
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/collection-centers">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">Collection Center Details</h1>
          <p className="text-gray-600 mt-1">View and manage collection center information</p>
        </div>
      </div>

      {/* Main Content */}
      {!isEditing ? (
        <>
          {/* View Mode */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {/* Actions Bar */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                onClick={handleDelete}
                variant="destructive"
                disabled={isDeleting}
                className="w-full sm:w-auto"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>

            {/* Details */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>Location</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 pl-6">{center.location}</p>
                </div>

                {/* Maximum Capacity */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <Gauge className="w-4 h-4" />
                    <span>Maximum Capacity</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 pl-6">
                    {center.maximumCapacityKg.toLocaleString()} kg
                  </p>
                </div>

                {/* Waste Processor ID */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-500">
                    Waste Processor ID
                  </div>
                  <p className="text-lg font-semibold text-gray-900 pl-6">
                    #{center.wasteProcessorId}
                  </p>
                </div>

                {/* ID */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-500">
                    Center ID
                  </div>
                  <p className="text-lg font-semibold text-gray-900 pl-6">
                    #{center.id}
                  </p>
                </div>
              </div>

              {/* Info Card */}
              <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <p className="text-sm text-indigo-800">
                  <strong>Tip:</strong> Click the Edit button above to update the collection center information 
                  or Delete to remove it from the system.
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Edit Mode */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Edit Collection Center</h2>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-6">
              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                  Location <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  defaultValue={center.location}
                  placeholder="Enter location address"
                  className="w-full"
                  required
                />
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
                  defaultValue={center.maximumCapacityKg}
                  placeholder="Enter maximum capacity in kilograms"
                  className="w-full"
                  required
                />
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
                  defaultValue={center.wasteProcessorId}
                  placeholder="Enter waste processor ID"
                  className="w-full"
                  required
                />
                <p className="text-sm text-gray-500">ID of the waste processor handling this collection center</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <Button type="submit" className="flex-1 sm:flex-initial">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 sm:flex-initial"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

