'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getFoodDonor, updateFoodDonor, deleteFoodDonor } from '@/app/actions/food-donors';
import { Button } from '@/components/ui/button';
import { Form, FormGroup, FormLabel, FormInput } from '@/components/ui/form';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FoodDonor } from '@/lib/types/entities';
import { ArrowLeft, Edit, Trash2, Save, X, Mail, MapPin, Calendar } from 'lucide-react';

export default function FoodDonorDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [donor, setDonor] = useState<FoodDonor | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function load() {
      const result = await getFoodDonor(id);
      if (result.success) setDonor(result.data);
      setLoading(false);
    }
    load();
  }, [id]);

  async function handleUpdate(formData: FormData) {
    const result = await updateFoodDonor(id, formData);
    if (result.success) {
      toast.success('Donor updated successfully!');
      setDonor(result.data!);
      setIsEditing(false);
    } else {
      toast.error(result.message || 'Failed to update donor');
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this donor? This action cannot be undone.')) return;
    
    setIsDeleting(true);
    const result = await deleteFoodDonor(id);
    if (result.success) {
      toast.success('Donor deleted successfully!');
      router.push('/food-donors');
    } else {
      toast.error(result.message || 'Failed to delete donor');
      setIsDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading donor details...</p>
        </div>
      </div>
    );
  }

  if (!donor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Donor Not Found</h2>
          <p className="text-gray-600 mb-6">The donor you are looking for does not exist or has been removed.</p>
          <Link href="/food-donors">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Donors
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
            href="/food-donors" 
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Donors
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {isEditing ? 'Edit Donor' : 'Donor Details'}
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                {isEditing ? 'Update donor information' : 'View and manage donor information'}
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
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Donor Name
                  </label>
                  <p className="text-lg font-semibold text-gray-900">{donor.name}</p>
                </div>

                {donor.registrationDate && (
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      Registered
                    </label>
                    <p className="text-lg text-gray-900">
                      {new Date(donor.registrationDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" />
                    Address
                  </label>
                  <p className="text-base text-gray-700 leading-relaxed">{donor.address}</p>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" />
                    Contact Information
                  </label>
                  <p className="text-base text-gray-700">{donor.contactInfo}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-8">
              <Form action={handleUpdate} className="space-y-6">
                <FormGroup>
                  <FormLabel htmlFor="name" className="text-sm font-semibold text-gray-700">
                    Donor Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormInput 
                    id="name" 
                    name="name" 
                    defaultValue={donor.name} 
                    required 
                    className="mt-1.5"
                    placeholder="Enter donor name"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="address" className="text-sm font-semibold text-gray-700">
                    Address <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormInput 
                    id="address" 
                    name="address" 
                    defaultValue={donor.address} 
                    required 
                    className="mt-1.5"
                    placeholder="Enter full address"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="contactInfo" className="text-sm font-semibold text-gray-700">
                    Contact Information <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormInput 
                    id="contactInfo" 
                    name="contactInfo" 
                    defaultValue={donor.contactInfo} 
                    required 
                    className="mt-1.5"
                    placeholder="Enter contact email or phone"
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
              <strong>Tip:</strong> Click the Edit button above to update the donor information 
              or Delete to remove them from the system.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
