'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getCollectionCenter, updateCollectionCenter, deleteCollectionCenter } from '@/app/actions/collection-centers';
import { Button } from '@/components/ui/button';
import { Form, FormGroup, FormLabel, FormInput } from '@/components/ui/form';
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

  async function handleUpdate(formData: FormData) {
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading collection center details...</p>
        </div>
      </div>
    );
  }

  if (!center) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/collection-centers" 
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Collection Centers
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {isEditing ? 'Edit Collection Center' : 'Collection Center Details'}
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                {isEditing ? 'Update collection center information' : 'View and manage collection center information'}
              </p>
            </div>
            
            {!isEditing && (
              <div className="flex gap-2">
                <Button 
                  onClick={() => setIsEditing(true)} 
                  variant="outline"
                  className="hover:bg-gray-50"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button 
                  onClick={handleDelete} 
                  variant="outline" 
                  disabled={isDeleting}
                  className="text-red-600 hover:bg-red-50 hover:border-red-300"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {!isEditing ? (
            <div className="p-6 sm:p-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" />
                    Location
                  </label>
                  <p className="text-lg font-semibold text-gray-900">{center.location}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <Gauge className="w-3.5 h-3.5" />
                    Maximum Capacity
                  </label>
                  <p className="text-lg text-gray-900">
                    {center.maximumCapacityKg.toLocaleString()} kg
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Waste Processor ID
                  </label>
                  <p className="text-lg text-gray-900">#{center.wasteProcessorId}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Center ID
                  </label>
                  <p className="text-lg text-gray-900">#{center.id}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-8">
              <Form action={handleUpdate} className="space-y-6">
                <FormGroup>
                  <FormLabel htmlFor="location" className="text-sm font-semibold text-gray-700">
                    Location <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormInput 
                    id="location" 
                    name="location" 
                    defaultValue={center.location} 
                    required 
                    className="mt-1.5"
                    placeholder="Enter location address"
                  />
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
                    defaultValue={center.maximumCapacityKg} 
                    required 
                    className="mt-1.5"
                    placeholder="Enter maximum capacity"
                  />
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
                    defaultValue={center.wasteProcessorId} 
                    required 
                    className="mt-1.5"
                    placeholder="Enter waste processor ID"
                  />
                </FormGroup>

                <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-gray-200">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                    className="w-full sm:w-auto hover:bg-gray-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-indigo-600 hover:bg-indigo-700 shadow-sm w-full sm:w-auto"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </div>

        {!isEditing && (
          <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <p className="text-sm text-indigo-800">
              <strong>Tip:</strong> Click the Edit button above to update the collection center information 
              or Delete to remove it from the system.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
