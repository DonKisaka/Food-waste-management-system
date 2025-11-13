import Link from 'next/link';
import { MapPin, Gauge, Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getWasteProcessors } from '@/app/actions/waste-processors';
import { WasteProcessor } from '@/lib/types/entities';
import { PROCESSING_TYPE_LABELS } from '@/lib/utils/constants';

export default async function WasteProcessorsPage() {
  const result = await getWasteProcessors();

  if (!result.success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Processors</h2>
          <p className="text-red-600">{result.message}</p>
        </div>
      </div>
    );
  }

  const processors = result.data || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Waste Processors</h1>
              <p className="mt-1 text-sm text-gray-500">Manage waste processing facilities</p>
            </div>
            <Link href="/waste-processors/create">
              <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-sm w-full sm:w-auto cursor-pointer">
                <Plus className="w-4 h-4 mr-2" />
                Add Waste Processor
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {processors.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No waste processors yet</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              Get started by adding your first waste processor to the system
            </p>
            <Link href="/waste-processors/create">
              <Button className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Processor
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Max Capacity (kg)
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Processing Type
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {processors.map((processor: WasteProcessor) => (
                    <tr key={processor.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{processor.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gray-400" />
                          <span className="text-sm text-gray-600">{processor.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Gauge className="w-4 h-4 shrink-0 text-gray-400" />
                          <span className="text-sm text-gray-600">{processor.maximumProcessingCapacityKg.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary">
                          {PROCESSING_TYPE_LABELS[processor.processingType as keyof typeof PROCESSING_TYPE_LABELS]}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/waste-processors/${processor.id}`}>
                          <Button variant="outline" size="sm" className="hover:bg-gray-50 cursor-pointer">
                            <Eye className="w-4 h-4 mr-1.5" />
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {processors.map((processor: WasteProcessor) => (
                <div
                  key={processor.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-lg text-gray-900">{processor.name}</h3>
                    <Badge variant="secondary">
                      {PROCESSING_TYPE_LABELS[processor.processingType as keyof typeof PROCESSING_TYPE_LABELS]}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 mt-1 shrink-0 text-gray-400" />
                      <p className="text-sm text-gray-600">{processor.location}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Gauge className="w-4 h-4 shrink-0 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Max Capacity: <span className="font-medium text-gray-900">{processor.maximumProcessingCapacityKg.toLocaleString()} kg</span>
                      </p>
                    </div>
                  </div>

                  <Link href={`/waste-processors/${processor.id}`} className="block">
                    <Button variant="outline" size="sm" className="w-full cursor-pointer">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              Showing {processors.length} {processors.length === 1 ? 'processor' : 'processors'}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
