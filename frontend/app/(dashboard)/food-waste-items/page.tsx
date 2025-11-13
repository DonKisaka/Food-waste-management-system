import Link from 'next/link';
import { Package, Weight, Calendar, Users, Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getFoodWasteItems } from '@/app/actions/food-waste-items';
import { FoodWasteItem } from '@/lib/types/entities';
import { WASTE_TYPE_LABELS, PROCESSING_STATUS_LABELS } from '@/lib/utils/constants';

export default async function FoodWasteItemsPage() {
  const result = await getFoodWasteItems();

  if (!result.success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Items</h2>
          <p className="text-red-600">{result.message}</p>
        </div>
      </div>
    );
  }

  const items = result.data || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PROCESSED': return 'bg-green-100 text-green-800 border-green-200';
      case 'PROCESSING': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Food Waste Items</h1>
              <p className="mt-1 text-sm text-gray-500">Track and manage food waste donations</p>
            </div>
            <Link href="/food-waste-items/create">
              <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-sm w-full sm:w-auto cursor-pointer">
                <Plus className="w-4 h-4 mr-2" />
                Add Waste Item
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No food waste items yet</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              Get started by adding your first food waste item to the system
            </p>
            <Link href="/food-waste-items/create">
              <Button className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Item
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
                      Weight (kg)
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Expiration Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Waste Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Donor ID
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item: FoodWasteItem) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Weight className="w-4 h-4 shrink-0 text-gray-400" />
                          <span className="font-medium text-gray-900">{item.weightKg.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 shrink-0 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {new Date(item.expirationDate).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline">
                          {WASTE_TYPE_LABELS[item.wasteType as keyof typeof WASTE_TYPE_LABELS]}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={getStatusColor(item.status)}>
                          {PROCESSING_STATUS_LABELS[item.status as keyof typeof PROCESSING_STATUS_LABELS]}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 shrink-0 text-gray-400" />
                          <span className="text-sm text-gray-600">#{item.foodDonorId}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/food-waste-items/${item.id}`}>
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
              {items.map((item: FoodWasteItem) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-lg text-gray-900">Item #{item.id}</h3>
                    <Badge className={getStatusColor(item.status)}>
                      {PROCESSING_STATUS_LABELS[item.status as keyof typeof PROCESSING_STATUS_LABELS]}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3">
                      <Weight className="w-4 h-4 shrink-0 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Weight: <span className="font-medium text-gray-900">{item.weightKg.toLocaleString()} kg</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 shrink-0 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Expiration: {new Date(item.expirationDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Package className="w-4 h-4 shrink-0 text-gray-400" />
                      <div className="text-sm">
                        <span className="text-gray-600">Type: </span>
                        <Badge variant="outline" className="ml-1">
                          {WASTE_TYPE_LABELS[item.wasteType as keyof typeof WASTE_TYPE_LABELS]}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 shrink-0 text-gray-400" />
                      <p className="text-sm text-gray-600">Donor ID: #{item.foodDonorId}</p>
                    </div>
                  </div>

                  <Link href={`/food-waste-items/${item.id}`} className="block">
                    <Button variant="outline" size="sm" className="w-full cursor-pointer">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              Showing {items.length} {items.length === 1 ? 'item' : 'items'}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
