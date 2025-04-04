'use client';

import { useState } from 'react';
import { 
  TruckIcon, 
  BoltIcon, 
  ClockIcon, 
  MagnifyingGlassIcon,
  Battery100Icon,
  WrenchScrewdriverIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

const fleetStats = [
  { name: 'Active Vehicles', value: '35', icon: TruckIcon, trend: '+3', trendPositive: true },
  { name: 'Charging', value: '8', icon: BoltIcon, trend: '-2', trendPositive: false },
  { name: 'Idle', value: '7', icon: ClockIcon, trend: '+1', trendPositive: false },
];

const vehicles = [
  {
    id: 'VH001',
    type: 'Delivery Van',
    model: 'Ford E-Transit',
    status: 'Charging',
    batteryHealth: '95%',
    lastMaintenance: '2024-03-15',
    nextMaintenance: '2024-04-15',
    mileage: '12,450',
    chargingTime: '45 min',
    location: 'Main Depot',
  },
  {
    id: 'VH002',
    type: 'Truck',
    model: 'Tesla Semi',
    status: 'Active',
    batteryHealth: '92%',
    lastMaintenance: '2024-03-20',
    nextMaintenance: '2024-04-20',
    mileage: '8,750',
    chargingTime: '1h 30min',
    location: 'North Station',
  },
  {
    id: 'VH003',
    type: 'Delivery Van',
    model: 'Rivian EDV',
    status: 'Maintenance',
    batteryHealth: '78%',
    lastMaintenance: '2024-02-15',
    nextMaintenance: '2024-03-15',
    mileage: '15,200',
    chargingTime: '1h',
    location: 'Service Center',
  },
];

const maintenanceAlerts = [
  { id: 1, vehicleId: 'VH003', type: 'warning', message: 'Battery health below 80%', time: '2 hours ago' },
  { id: 2, vehicleId: 'VH001', type: 'info', message: 'Scheduled maintenance in 5 days', time: '1 day ago' },
];

export default function Fleet() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Fleet Overview Panel */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {fleetStats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {stat.value}
                    </dd>
                    <dd className={`text-sm ${stat.trendPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.trend}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Maintenance Alerts */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Maintenance Alerts
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {maintenanceAlerts.map((alert) => (
              <li key={alert.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center">
                  <ExclamationTriangleIcon className={`h-5 w-5 ${
                    alert.type === 'warning' ? 'text-yellow-400' :
                    alert.type === 'info' ? 'text-blue-400' :
                    'text-green-400'
                  }`} />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {alert.vehicleId} - {alert.message}
                    </p>
                    <p className="text-sm text-gray-500">{alert.time}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search vehicles by ID, model, or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Vehicle List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Vehicle Profiles
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {filteredVehicles.map((vehicle) => (
              <li 
                key={vehicle.id} 
                className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedVehicle(vehicle.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-blue-600 truncate">
                      {vehicle.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {vehicle.type} - {vehicle.model}
                    </p>
                    <p className="text-sm text-gray-500">
                      Location: {vehicle.location}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-end">
                      <span className="text-sm text-gray-500">
                        Battery: {vehicle.batteryHealth}
                      </span>
                      <span className="text-sm text-gray-500">
                        Mileage: {vehicle.mileage}
                      </span>
                      <span className="text-sm text-gray-500">
                        Next Maintenance: {vehicle.nextMaintenance}
                      </span>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      vehicle.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : vehicle.status === 'Charging'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {vehicle.status}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 