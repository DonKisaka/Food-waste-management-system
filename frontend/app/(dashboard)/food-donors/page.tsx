import Link from 'next/link';
import { getFoodDonors } from '@/app/actions/food-donors';
import { Button } from '@/components/ui/button';
import { FoodDonor } from '@/lib/types/entities';
import { Plus, Eye, Mail, MapPin } from 'lucide-react';

export default async function FoodDonorsPage() {
  const result = await getFoodDonors();

  if (!result.success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Donors</h2>
          <p className="text-red-600">{result.message}</p>
        </div>
      </div>
    );
  }

  const donors = result.data || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Food Donors</h1>
              <p className="mt-1 text-sm text-gray-500">Manage your food donation sources</p>
            </div>
            <Link href="/food-donors/create">
              <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-sm w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add Donor
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {donors.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No donors yet</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              Get started by adding your first food donor to the system
            </p>
            <Link href="/food-donors/create">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Donor
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
                      Address
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donors.map((donor: FoodDonor) => (
                    <tr key={donor.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{donor.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gray-400" />
                          <span className="line-clamp-2">{donor.address}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 flex items-center gap-2">
                          <Mail className="w-4 h-4 shrink-0 text-gray-400" />
                          <span className="truncate">{donor.contactInfo}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/food-donors/${donor.id}`}>
                          <Button variant="outline" size="sm" className="hover:bg-gray-50">
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

{/* Mobile Card View  */}
            <div className="lg:hidden space-y-4">
              {donors.map((donor: FoodDonor) => (
                <div
                  key={donor.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-lg text-gray-900">{donor.name}</h3>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 mt-1 shrink-0 text-gray-400" />
                      <p className="text-sm text-gray-600">{donor.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 shrink-0 text-gray-400" />
                      <p className="text-sm text-gray-600 truncate">{donor.contactInfo}</p>
                    </div>
                  </div>

                  <Link href={`/food-donors/${donor.id}`} className="block">
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              Showing {donors.length} {donors.length === 1 ? 'donor' : 'donors'}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
