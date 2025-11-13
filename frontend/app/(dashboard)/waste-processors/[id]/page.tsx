'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getWasteProcessor, updateWasteProcessor, deleteWasteProcessor } from '@/app/actions/waste-processors';
import { Button } from '@/components/ui/button';
import { Form, FormGroup, FormLabel, FormInput } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { WasteProcessor } from '@/lib/types/entities';
import { ArrowLeft, Edit, Trash2, Save, X, MapPin, Gauge, Recycle } from 'lucide-react';
import { PROCESSING_TYPE_LABELS } from '@/lib/utils/constants';

export default function WasteProcessorDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [processor, setProcessor] = useState<WasteProcessor | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editProcessingType, setEditProcessingType] = useState('');

  useEffect(() => {
    async function load() {
      const result = await getWasteProcessor(id);
      if (result.success) {
        setProcessor(result.data);
        setEditProcessingType(result.data.processingType);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  async function handleUpdate(formData: FormData) {
    formData.set('processingType', editProcessingType);
    const result = await updateWasteProcessor(id, formData);
    if (result.success) {
      toast.success('Waste processor updated successfully!');
      setProcessor(result.data!);
      setIsEditing(false);
    } else {
      toast.error(result.message || 'Failed to update waste processor');
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this waste processor? This action cannot be undone.')) return;
    
    setIsDeleting(true);
    const result = await deleteWasteProcessor(id);
    if (result.success) {
      toast.success('Waste processor deleted successfully!');
      router.push('/waste-processors');
    } else {
      toast.error(result.message || 'Failed to delete waste processor');
      setIsDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading waste processor details...</p>
        </div>
      </div>
    );
  }

  if (!processor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Waste Processor Not Found</h2>
          <p className="text-gray-600 mb-6">The waste processor you are looking for does not exist or has been removed.</p>
          <Link href="/waste-processors">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Waste Processors
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
            href="/waste-processors" 
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Waste Processors
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {isEditing ? 'Edit Waste Processor' : 'Waste Processor Details'}
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                {isEditing ? 'Update waste processor information' : 'View and manage waste processor information'}
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
                    <Recycle className="w-3.5 h-3.5" />
                    Processor Name
                  </label>
                  <p className="text-lg font-semibold text-gray-900">{processor.name}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" />
                    Location
                  </label>
                  <p className="text-lg text-gray-900">{processor.location}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <Gauge className="w-3.5 h-3.5" />
                    Maximum Processing Capacity
                  </label>
                  <p className="text-lg text-gray-900">
                    {processor.maximumProcessingCapacityKg.toLocaleString()} kg
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Processing Type
                  </label>
                  <div>
                    <Badge variant="secondary" className="text-base">
                      {PROCESSING_TYPE_LABELS[processor.processingType as keyof typeof PROCESSING_TYPE_LABELS]}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Processor ID
                  </label>
                  <p className="text-lg text-gray-900">#{processor.id}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-8">
              <Form action={handleUpdate} className="space-y-6">
                <FormGroup>
                  <FormLabel htmlFor="name" className="text-sm font-semibold text-gray-700">
                    Processor Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormInput 
                    id="name" 
                    name="name" 
                    defaultValue={processor.name} 
                    required 
                    className="mt-1.5"
                    placeholder="Enter processor name"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="location" className="text-sm font-semibold text-gray-700">
                    Location <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormInput 
                    id="location" 
                    name="location" 
                    defaultValue={processor.location} 
                    required 
                    className="mt-1.5"
                    placeholder="Enter location address"
                  />
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
                    defaultValue={processor.maximumProcessingCapacityKg} 
                    required 
                    className="mt-1.5"
                    placeholder="Enter maximum capacity"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="processingType" className="text-sm font-semibold text-gray-700">
                    Processing Type <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select value={editProcessingType} onValueChange={setEditProcessingType}>
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
              <strong>Tip:</strong> Click the Edit button above to update the waste processor information 
              or Delete to remove it from the system.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
