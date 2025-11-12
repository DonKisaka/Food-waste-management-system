import Link from 'next/link';
import { MapPin, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCollectionCenters } from '@/app/actions/collection-centers';

export default async function CollectionCentersPage() {
  const result = await getCollectionCenters();

  if (!result.success) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {result.message}
        </div>
      </div>
    );
  }

  const centers = result.data || [];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Collection Centers</h1>
          <p className="text-gray-600 mt-1">Manage waste collection facilities</p>
        </div>
        <Link href="/collection-centers/create">
          <Button className="w-full sm:w-auto">
            + Add Collection Center
          </Button>
        </Link>
      </div>

      {centers.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Collection Centers Yet</h3>
            <p className="text-gray-600 mb-6">
              Get started by creating your first collection center to track waste collection facilities.
            </p>
            <Link href="/collection-centers/create">
              <Button>Create Collection Center</Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Max Capacity (kg)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Waste Processor ID
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {centers.map((center: any) => (
                  <tr key={center.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{center.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Gauge className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{center.maximumCapacityKg.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">#{center.wasteProcessorId}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/collection-centers/${center.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden grid grid-cols-1 gap-4">
            {centers.map((center: any) => (
              <div key={center.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                      <h3 className="font-semibold text-gray-900">{center.location}</h3>
                    </div>
                  </div>

                  <div className="space-y-2 pl-7">
                    <div className="flex items-center gap-2 text-sm">
                      <Gauge className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Max Capacity:</span>
                      <span className="font-medium text-gray-900">{center.maximumCapacityKg.toLocaleString()} kg</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Processor:</span>
                      <span className="ml-2 text-gray-900">#{center.wasteProcessorId}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <Link href={`/collection-centers/${center.id}`} className="block">
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

