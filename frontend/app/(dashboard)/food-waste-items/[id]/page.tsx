'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getFoodWasteItem, updateFoodWasteItem, deleteFoodWasteItem } from '@/app/actions/food-waste-items';
import { getFoodDonors } from '@/app/actions/food-donors';
import { Button } from '@/components/ui/button';
import { Form, FormGroup, FormLabel, FormInput } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FoodWasteItem, FoodDonor } from '@/lib/types/entities';
import { ArrowLeft, Edit, Trash2, Save, X, Weight, Calendar, Package, Users } from 'lucide-react';
import { WASTE_TYPE_LABELS, PROCESSING_STATUS_LABELS } from '@/lib/utils/constants';

export default function FoodWasteItemDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [item, setItem] = useState<FoodWasteItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editWasteType, setEditWasteType] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editFoodDonorId, setEditFoodDonorId] = useState('');
  const [donors, setDonors] = useState<FoodDonor[]>([]);

  useEffect(() => {
    async function load() {
      const [itemResult, donorsResult] = await Promise.all([
        getFoodWasteItem(id),
        getFoodDonors()
      ]);
      
      if (itemResult.success) {
        setItem(itemResult.data);
        setEditWasteType(itemResult.data.wasteType);
        setEditStatus(itemResult.data.status);
        setEditFoodDonorId(itemResult.data.foodDonorId.toString());
      }
      if (donorsResult.success) {
        setDonors(donorsResult.data || []);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  async function handleUpdate(formData: FormData) {
    formData.set('wasteType', editWasteType);
    formData.set('status', editStatus);
    formData.set('foodDonorId', editFoodDonorId);
    const result = await updateFoodWasteItem(id, formData);
    if (result.success) {
      toast.success('Food waste item updated successfully!');
      setItem(result.data!);
      setIsEditing(false);
    } else {
      toast.error(result.message || 'Failed to update food waste item');
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this food waste item? This action cannot be undone.')) return;
    
    setIsDeleting(true);
    const result = await deleteFoodWasteItem(id);
    if (result.success) {
      toast.success('Food waste item deleted successfully!');
      router.push('/food-waste-items');
    } else {
      toast.error(result.message || 'Failed to delete food waste item');
      setIsDeleting(false);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PROCESSED': return 'bg-green-100 text-green-800 border-green-200';
      case 'PROCESSING': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading food waste item details...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Food Waste Item Not Found</h2>
          <p className="text-gray-600 mb-6">The food waste item you are looking for does not exist or has been removed.</p>
          <Link href="/food-waste-items">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Food Waste Items
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
            href="/food-waste-items" 
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Food Waste Items
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {isEditing ? 'Edit Food Waste Item' : 'Food Waste Item Details'}
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                {isEditing ? 'Update food waste item information' : 'View and manage food waste item information'}
              </p>
            </div>
            
            {!isEditing && (
              <div className="flex gap-2">
                <Button 
                  onClick={() => setIsEditing(true)} 
                  variant="outline"
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button 
                  onClick={handleDelete} 
                  variant="outline" 
                  disabled={isDeleting}
                  className="text-red-600 hover:bg-red-50 hover:border-red-300 cursor-pointer"
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
                    <Weight className="w-3.5 h-3.5" />
                    Weight
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {item.weightKg.toLocaleString()} kg
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    Expiration Date
                  </label>
                  <p className="text-lg text-gray-900">
                    {new Date(item.expirationDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <Package className="w-3.5 h-3.5" />
                    Waste Type
                  </label>
                  <div>
                    <Badge variant="outline" className="text-base">
                      {WASTE_TYPE_LABELS[item.wasteType as keyof typeof WASTE_TYPE_LABELS]}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Processing Status
                  </label>
                  <div>
                    <Badge className={`${getStatusColor(item.status)} text-base`}>
                      {PROCESSING_STATUS_LABELS[item.status as keyof typeof PROCESSING_STATUS_LABELS]}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-3.5 h-3.5" />
                    Food Donor
                  </label>
                  <p className="text-lg text-gray-900">
                    {donors.find(donor => donor.id === item.foodDonorId)?.name || `ID: ${item.foodDonorId}`}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Item ID
                  </label>
                  <p className="text-lg text-gray-900">#{item.id}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-8">
              <Form action={handleUpdate} className="space-y-6">
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
                    defaultValue={item.weightKg} 
                    required 
                    className="mt-1.5"
                    placeholder="Enter weight in kilograms"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="expirationDate" className="text-sm font-semibold text-gray-700">
                    Expiration Date <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormInput 
                    id="expirationDate" 
                    name="expirationDate" 
                    type="date"
                    defaultValue={item.expirationDate} 
                    required 
                    className="mt-1.5"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="wasteType" className="text-sm font-semibold text-gray-700">
                    Waste Type <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select value={editWasteType} onValueChange={setEditWasteType}>
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
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="status" className="text-sm font-semibold text-gray-700">
                    Processing Status <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select value={editStatus} onValueChange={setEditStatus}>
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
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="foodDonorId" className="text-sm font-semibold text-gray-700">
                    Food Donor <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select value={editFoodDonorId} onValueChange={setEditFoodDonorId}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select food donor" />
                    </SelectTrigger>
                    <SelectContent>
                      {donors.map((donor) => (
                        <SelectItem key={donor.id} value={donor.id.toString()}>
                          {donor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormGroup>

                <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-gray-200">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                    className="w-full sm:w-auto hover:bg-gray-50 cursor-pointer"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-indigo-600 hover:bg-indigo-700 shadow-sm w-full sm:w-auto cursor-pointer"
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
              <strong>Tip:</strong> Click the Edit button above to update the food waste item information 
              or Delete to remove it from the system.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
