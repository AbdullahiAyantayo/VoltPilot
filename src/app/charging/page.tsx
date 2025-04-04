'use client';

import { useState } from 'react';
import { 
  BoltIcon, 
  ClockIcon, 
  ChartBarIcon,
  CalendarIcon,
  SunIcon,
  CloudIcon,
  Battery100Icon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

interface ChargingStation {
  id: string;
  location: string;
  status: 'Active' | 'Maintenance' | 'Idle';
  power: string;
  currentVehicle: string;
  estimatedTime: string;
  utilization: number;
  costPerKwh: number;
  energySource: 'Solar' | 'Grid' | 'Hybrid';
}

const chargingStats = [
  { name: 'Active Stations', value: '12', icon: BoltIcon, trend: '+2', trendPositive: true },
  { name: 'Currently Charging', value: '8', icon: ClockIcon, trend: '-1', trendPositive: false },
  { name: 'Average Idle Time', value: '2.5h', icon: ChartBarIcon, trend: '-0.5h', trendPositive: true },
  { name: 'Utilization Rate', value: '75%', icon: Battery100Icon, trend: '+5%', trendPositive: true },
];

const chargingStations: ChargingStation[] = [
  {
    id: 'CS001',
    location: 'Main Depot',
    status: 'Active',
    power: '150kW',
    currentVehicle: 'VH001',
    estimatedTime: '45 min',
    utilization: 85,
    costPerKwh: 0.12,
    energySource: 'Hybrid',
  },
  {
    id: 'CS002',
    location: 'North Station',
    status: 'Maintenance',
    power: '100kW',
    currentVehicle: 'None',
    estimatedTime: 'N/A',
    utilization: 65,
    costPerKwh: 0.15,
    energySource: 'Grid',
  },
  {
    id: 'CS003',
    location: 'Solar Farm',
    status: 'Active',
    power: '200kW',
    currentVehicle: 'VH002',
    estimatedTime: '1h 30min',
    utilization: 90,
    costPerKwh: 0.08,
    energySource: 'Solar',
  },
];

const energySources = [
  { name: 'Solar', percentage: 40, color: 'text-yellow-400', cost: '$0.08/kWh' },
  { name: 'Grid', percentage: 60, color: 'text-gray-400', cost: '$0.15/kWh' },
];

const chargingSchedule = [
  { time: '6:00 AM - 2:00 PM', type: 'Morning Shift', vehicles: 8, cost: '$0.10/kWh' },
  { time: '2:00 PM - 10:00 PM', type: 'Evening Shift', vehicles: 12, cost: '$0.18/kWh' },
  { time: '10:00 PM - 6:00 AM', type: 'Night Shift', vehicles: 5, cost: '$0.08/kWh' },
];

export default function Charging() {
  const [selectedStation, setSelectedStation] = useState<ChargingStation | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');

  return (
    <div className="space-y-6">
      {/* Charging Infrastructure Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {chargingStats.map((stat) => (
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

      {/* Charging Stations List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Charging Stations
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {chargingStations.map((station) => (
              <li 
                key={station.id} 
                className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedStation(station)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-blue-600 truncate">
                      {station.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {station.location}
                    </p>
                    <p className="text-sm text-gray-500">
                      Energy Source: {station.energySource}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-end">
                      <span className="text-sm text-gray-500">
                        Power: {station.power}
                      </span>
                      <span className="text-sm text-gray-500">
                        Cost: ${station.costPerKwh}/kWh
                      </span>
                      <span className="text-sm text-gray-500">
                        Utilization: {station.utilization}%
                      </span>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      station.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : station.status === 'Maintenance'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {station.status}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Scheduling Interface */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Charging Schedule
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-4">
                Today's Schedule
              </h4>
              <div className="space-y-4">
                {chargingSchedule.map((schedule) => (
                  <div key={schedule.time} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{schedule.time}</p>
                        <p className="text-sm text-gray-500">{schedule.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{schedule.vehicles} vehicles</p>
                      <p className="text-sm text-gray-500">{schedule.cost}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-4">
                Energy Sources
              </h4>
              <div className="space-y-4">
                {energySources.map((source) => (
                  <div key={source.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-900">{source.name}</span>
                      <span className="text-sm text-gray-500">{source.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${source.color}`}
                        style={{ width: `${source.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500">{source.cost}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 