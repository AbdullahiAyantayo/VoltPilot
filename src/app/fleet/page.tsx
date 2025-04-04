'use client';

import { useState } from 'react';
import {
  Battery100Icon,
  BoltIcon,
  ClockIcon,
  WrenchScrewdriverIcon,
  ArrowPathIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  MapPinIcon,
  TruckIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Mock data - Replace with real API data
const vehicles = [
  {
    id: 'Truck-001',
    type: 'Heavy Duty',
    model: 'Tesla Semi',
    status: 'Charging',
    batteryHealth: 92,
    lastChargeTime: '2024-01-08T10:30:00',
    location: 'Depot A',
    soc: 85,
    v2gCompatible: true,
    maintenanceHistory: [
      { date: '2024-01-01', type: 'Routine Check', status: 'Completed' },
      { date: '2023-12-15', type: 'Battery Inspection', status: 'Completed' },
    ],
  },
  {
    id: 'Van-003',
    type: 'Delivery Van',
    model: 'Ford E-Transit',
    status: 'Idle',
    batteryHealth: 88,
    lastChargeTime: '2024-01-08T09:15:00',
    location: 'Depot B',
    soc: 45,
    v2gCompatible: false,
    maintenanceHistory: [
      { date: '2024-01-05', type: 'Software Update', status: 'Completed' },
      { date: '2023-12-20', type: 'Tire Rotation', status: 'Completed' },
    ],
  },
];

const batteryHealthData = [
  { date: '2024-01-01', health: 95 },
  { date: '2024-01-02', health: 94 },
  { date: '2024-01-03', health: 93 },
  { date: '2024-01-04', health: 92 },
  { date: '2024-01-05', health: 91 },
  { date: '2024-01-06', health: 90 },
  { date: '2024-01-07', health: 89 },
];

const chargingHistory = [
  { date: '2024-01-08', duration: 45, energy: 150, cost: 30 },
  { date: '2024-01-07', duration: 50, energy: 160, cost: 32 },
  { date: '2024-01-06', duration: 48, energy: 155, cost: 31 },
];

const fleetEfficiency = {
  uptime: 95,
  socManagement: 88,
  maintenanceSuccess: 92,
  energyEfficiency: 90,
};

export default function FleetPage() {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vehicle.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#2F4F4F] p-6">
      {/* Fleet Overview */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Fleet Management</h2>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search vehicles..."
              className="px-4 py-2 border rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="px-4 py-2 border rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="charging">Charging</option>
              <option value="idle">Idle</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>

        {/* Vehicles Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Battery Health
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Charge
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVehicles.map((vehicle) => (
                <tr
                  key={vehicle.id}
                  className={`cursor-pointer hover:bg-gray-50 ${
                    selectedVehicle?.id === vehicle.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <TruckIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{vehicle.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{vehicle.type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      vehicle.status === 'Charging' ? 'bg-green-100 text-green-800' :
                      vehicle.status === 'Idle' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Battery100Icon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{vehicle.batteryHealth}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{vehicle.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {new Date(vehicle.lastChargeTime).toLocaleTimeString()}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Vehicle Details */}
      {selectedVehicle && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Battery Health & Charging History */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Battery Health & Charging</h3>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={batteryHealthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="health" stroke="#007bff" fill="#007bff" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Recent Charging Sessions</h4>
              {chargingHistory.map((session, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{session.date}</p>
                    <p className="text-sm text-gray-600">{session.duration} minutes</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{session.energy} kWh</p>
                    <p className="text-sm text-gray-600">${session.cost}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance & V2G */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance History</h3>
              <div className="space-y-4">
                {selectedVehicle.maintenanceHistory.map((record, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{record.type}</p>
                      <p className="text-sm text-gray-600">{record.date}</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {record.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">V2G Status</h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <BoltIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-900">
                    {selectedVehicle.v2gCompatible ? 'V2G Compatible' : 'Not V2G Compatible'}
                  </span>
                </div>
                {selectedVehicle.v2gCompatible && (
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Total Energy Supplied</p>
                    <p className="text-sm text-gray-600">1,250 kWh</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fleet Efficiency Score */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fleet Efficiency Score</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Uptime</p>
            <p className="text-2xl font-bold text-[#39FF14]">{fleetEfficiency.uptime}%</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">SOC Management</p>
            <p className="text-2xl font-bold text-[#39FF14]">{fleetEfficiency.socManagement}%</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Maintenance Success</p>
            <p className="text-2xl font-bold text-[#39FF14]">{fleetEfficiency.maintenanceSuccess}%</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Energy Efficiency</p>
            <p className="text-2xl font-bold text-[#39FF14]">{fleetEfficiency.energyEfficiency}%</p>
          </div>
        </div>
      </div>
    </div>
  );
} 