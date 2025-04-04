'use client';

import { useState } from 'react';
import {
  BoltIcon,
  ClockIcon,
  WrenchScrewdriverIcon,
  ArrowPathIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface ChargingStation {
  id: string;
  location: string;
  status: 'Available' | 'In Use' | 'Maintenance';
  power: string;
  currentVehicle: string | null;
  estimatedTime: string | null;
  health: number;
  temperature: number;
  voltage: number;
}

interface ElectricityPrice {
  time: string;
  price: number;
}

interface V2GEarning {
  date: string;
  earnings: number;
}

interface ScheduledCharge {
  id: number;
  vehicle: string;
  station: string;
  startTime: string;
  endTime: string;
  estimatedCost: number;
}

// Mock data - Replace with real API data
const chargingStations: ChargingStation[] = [
  {
    id: 'CS-001',
    location: 'Depot A',
    status: 'Available',
    power: '150kW',
    currentVehicle: null,
    estimatedTime: null,
    health: 95,
    temperature: 32,
    voltage: 480,
  },
  {
    id: 'CS-002',
    location: 'Depot A',
    status: 'In Use',
    power: '150kW',
    currentVehicle: 'Truck-001',
    estimatedTime: '45 min',
    health: 92,
    temperature: 35,
    voltage: 480,
  },
  {
    id: 'CS-003',
    location: 'Depot B',
    status: 'Maintenance',
    power: '150kW',
    currentVehicle: null,
    estimatedTime: null,
    health: 85,
    temperature: 38,
    voltage: 475,
  },
];

const electricityPrices: ElectricityPrice[] = [
  { time: '00:00', price: 0.12 },
  { time: '04:00', price: 0.10 },
  { time: '08:00', price: 0.15 },
  { time: '12:00', price: 0.18 },
  { time: '16:00', price: 0.20 },
  { time: '20:00', price: 0.15 },
];

const v2gEarnings: V2GEarning[] = [
  { date: '2024-01-01', earnings: 150 },
  { date: '2024-01-02', earnings: 180 },
  { date: '2024-01-03', earnings: 200 },
  { date: '2024-01-04', earnings: 170 },
  { date: '2024-01-05', earnings: 190 },
];

const scheduledCharges: ScheduledCharge[] = [
  {
    id: 1,
    vehicle: 'Truck-001',
    station: 'CS-002',
    startTime: '2024-01-08T14:00:00',
    endTime: '2024-01-08T15:00:00',
    estimatedCost: 45,
  },
  {
    id: 2,
    vehicle: 'Van-003',
    station: 'CS-001',
    startTime: '2024-01-08T16:00:00',
    endTime: '2024-01-08T17:00:00',
    estimatedCost: 35,
  },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function ChargingPage() {
  const [selectedStation, setSelectedStation] = useState<ChargingStation>(chargingStations[0]);

  return (
    <div className="min-h-screen bg-[#2F4F4F] p-6">
      {/* Charging Infrastructure Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Active Stations</h3>
            <BoltIcon className="h-6 w-6 text-[#007bff]" />
          </div>
          <p className="text-3xl font-bold text-[#39FF14]">
            {chargingStations.filter(station => station.status === 'Available' || station.status === 'In Use').length}
          </p>
          <p className="text-sm text-gray-600">out of {chargingStations.length} total stations</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Currently Charging</h3>
            <ClockIcon className="h-6 w-6 text-[#007bff]" />
          </div>
          <p className="text-3xl font-bold text-[#39FF14]">
            {chargingStations.filter(station => station.status === 'In Use').length}
          </p>
          <p className="text-sm text-gray-600">vehicles being charged</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Average Idle Time</h3>
            <ArrowPathIcon className="h-6 w-6 text-[#007bff]" />
          </div>
          <p className="text-3xl font-bold text-[#39FF14]">2.5</p>
          <p className="text-sm text-gray-600">hours per day</p>
        </div>
      </div>

      {/* Charging Stations List */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Charging Stations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chargingStations.map((station) => (
            <div
              key={station.id}
              className={`p-4 rounded-lg border ${
                station.status === 'Available' ? 'border-green-200 bg-green-50' :
                station.status === 'In Use' ? 'border-blue-200 bg-blue-50' :
                'border-red-200 bg-red-50'
              }`}
              onClick={() => setSelectedStation(station)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900">{station.id}</p>
                  <p className="text-sm text-gray-600">{station.location}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  station.status === 'Available' ? 'bg-green-100 text-green-800' :
                  station.status === 'In Use' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {station.status}
                </span>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">Power: {station.power}</p>
                {station.currentVehicle && (
                  <p className="text-sm text-gray-600">
                    Vehicle: {station.currentVehicle}
                  </p>
                )}
                {station.estimatedTime && (
                  <p className="text-sm text-gray-600">
                    Time remaining: {station.estimatedTime}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Station Details */}
      {selectedStation && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Station Health Metrics */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Station Health</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Health</p>
                <p className="text-2xl font-bold text-[#39FF14]">{selectedStation.health}%</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Temperature</p>
                <p className="text-2xl font-bold text-[#39FF14]">{selectedStation.temperature}°C</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Voltage</p>
                <p className="text-2xl font-bold text-[#39FF14]">{selectedStation.voltage}V</p>
              </div>
            </div>
          </div>

          {/* Electricity Prices */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Electricity Prices</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={electricityPrices}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="price" stroke="#007bff" fill="#007bff" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Scheduled Charges */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Scheduled Charges</h3>
        <div className="space-y-4">
          {scheduledCharges.map((schedule) => (
            <div key={schedule.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">{schedule.vehicle}</p>
                <p className="text-sm text-gray-600">Station: {schedule.station}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  {new Date(schedule.startTime).toLocaleTimeString()} - {new Date(schedule.endTime).toLocaleTimeString()}
                </p>
                <p className="text-sm font-medium text-gray-900">Est. Cost: ${schedule.estimatedCost}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* V2G Earnings */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">V2G Earnings</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={v2gEarnings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="earnings" stroke="#39FF14" fill="#39FF14" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 