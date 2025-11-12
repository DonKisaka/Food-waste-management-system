import Link from 'next/link';
import { Users, Building2, Recycle, Package, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const cards = [
    {
      title: 'Food Donors',
      description: 'Manage food donation sources and their details',
      icon: Users,
      href: '/food-donors',
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      available: true,
    },
    {
      title: 'Collection Centers',
      description: 'Track collection facilities and their capacity',
      icon: Building2,
      href: '/collection-centers',
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      textColor: 'text-green-600',
      available: false,
    },
    {
      title: 'Waste Processors',
      description: 'Manage waste processing facilities and types',
      icon: Recycle,
      href: '/waste-processors',
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      available: false,
    },
    {
      title: 'Food Waste Items',
      description: 'Track individual food waste batches and status',
      icon: Package,
      href: '/food-waste-items',
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      available: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-base text-gray-600">
            Welcome to your Food Waste Management System
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.available ? card.href : '#'}
                className={`group relative ${!card.available ? 'pointer-events-none' : ''}`}
              >
                <div className={`
                  bg-white rounded-xl shadow-sm border border-gray-200 p-6 
                  transition-all duration-200
                  ${card.available ? 'hover:shadow-lg hover:-translate-y-1' : 'opacity-60'}
                `}>
                  <div className={`
                    w-12 h-12 rounded-lg ${card.lightColor} 
                    flex items-center justify-center mb-4
                    transition-transform duration-200
                    ${card.available ? 'group-hover:scale-110' : ''}
                  `}>
                    <Icon className={`w-6 h-6 ${card.textColor}`} />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {card.description}
                  </p>

                  {card.available ? (
                    <div className="flex items-center text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
                      <span>Open</span>
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      Coming Soon
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 bg-linear-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Getting Started
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Start by managing your <strong>Food Donors</strong> to track donation sources. 
            As you add more entities, you&apos;ll be able to track the complete lifecycle of 
            food waste from donation to processing.
          </p>
        </div>
      </div>
    </div>
  );
}
