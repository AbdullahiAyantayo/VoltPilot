'use client';

import { useState } from 'react';
import {
  TruckIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  ClockIcon,
  UserIcon,
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
  BarChart,
  Bar,
} from 'recharts';
import { format } from 'date-fns';

// Mock data - Replace with real API data
const overviewData = {
  vehicles: {
    total: 42,
    charging: 15,
    idle: 20,
    maintenance: 7,
  },
  costSavings: {
    '24h': 1250,
    '7d': 8750,
    '30d': 37500,
  },
  carbonReduction: 125, // tons
  chargerUptime: 98.5, // percentage
};

const costHeatmapData = [
  { time: '00:00', Monday: 0.12, Tuesday: 0.11, Wednesday: 0.13, Thursday: 0.12, Friday: 0.11 },
  { time: '04:00', Monday: 0.10, Tuesday: 0.09, Wednesday: 0.10, Thursday: 0.09, Friday: 0.08 },
  { time: '08:00', Monday: 0.15, Tuesday: 0.16, Wednesday: 0.15, Thursday: 0.16, Friday: 0.15 },
  { time: '12:00', Monday: 0.18, Tuesday: 0.19, Wednesday: 0.18, Thursday: 0.19, Friday: 0.18 },
  { time: '16:00', Monday: 0.20, Tuesday: 0.21, Wednesday: 0.20, Thursday: 0.21, Friday: 0.20 },
  { time: '20:00', Monday: 0.15, Tuesday: 0.14, Wednesday: 0.15, Thursday: 0.14, Friday: 0.13 },
];

const fleetUtilizationData = [
  { date: '2024-01-01', utilization: 75 },
  { date: '2024-01-02', utilization: 82 },
  { date: '2024-01-03', utilization: 78 },
  { date: '2024-01-04', utilization: 85 },
  { date: '2024-01-05', utilization: 88 },
  { date: '2024-01-06', utilization: 90 },
  { date: '2024-01-07', utilization: 92 },
];

const maintenanceAlerts = [
  {
    id: 1,
    vehicle: 'Truck-001',
    issue: 'Battery degradation detected',
    severity: 'high',
    predictedDate: '2024-02-15',
  },
  {
    id: 2,
    vehicle: 'Van-003',
    issue: 'Charging port wear',
    severity: 'medium',
    predictedDate: '2024-03-01',
  },
];

const chargerStatusData = [
  { name: 'Charging', value: 15 },
  { name: 'Idle', value: 20 },
  { name: 'Down', value: 2 },
];

const v2gData = [
  { date: '2024-01-01', energy: 150 },
  { date: '2024-01-02', energy: 180 },
  { date: '2024-01-03', energy: 200 },
  { date: '2024-01-04', energy: 170 },
  { date: '2024-01-05', energy: 190 },
];

const userActivityLog = [
  {
    id: 1,
    user: 'John Doe',
    action: 'Scheduled maintenance',
    timestamp: '2024-01-08T10:30:00',
  },
  {
    id: 2,
    user: 'Jane Smith',
    action: 'Updated charging schedule',
    timestamp: '2024-01-08T09:15:00',
  },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('24h');

  return (
    <div className="min-h-screen bg-[#2F4F4F] p-6">
      {/* Overview Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Fleet Status</h3>
            <ChartBarIcon className="h-6 w-6 text-[#007bff]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Total Vehicles</p>
              <p className="text-2xl font-bold text-gray-900">{overviewData.vehicles.total}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Charging</p>
              <p className="text-2xl font-bold text-[#39FF14]">{overviewData.vehicles.charging}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Idle</p>
              <p className="text-2xl font-bold text-gray-900">{overviewData.vehicles.idle}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Maintenance</p>
              <p className="text-2xl font-bold text-red-500">{overviewData.vehicles.maintenance}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Cost Savings</h3>
            <BoltIcon className="h-6 w-6 text-[#007bff]" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Last 24h</span>
              <span className="font-semibold text-[#39FF14]">${overviewData.costSavings['24h']}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Last 7d</span>
              <span className="font-semibold text-[#39FF14]">${overviewData.costSavings['7d']}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Last 30d</span>
              <span className="font-semibold text-[#39FF14]">${overviewData.costSavings['30d']}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Carbon Reduction</h3>
            <GlobeAltIcon className="h-6 w-6 text-[#007bff]" />
          </div>
          <p className="text-3xl font-bold text-[#39FF14]">{overviewData.carbonReduction}</p>
          <p className="text-sm text-gray-600">tons of CO2 avoided</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Charger Uptime</h3>
            <ClockIcon className="h-6 w-6 text-[#007bff]" />
          </div>
          <p className="text-3xl font-bold text-[#39FF14]">{overviewData.chargerUptime}%</p>
          <p className="text-sm text-gray-600">average uptime</p>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Cost Optimization Heatmap */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Optimization Heatmap</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costHeatmapData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Monday" fill="#007bff" />
                <Bar dataKey="Tuesday" fill="#39FF14" />
                <Bar dataKey="Wednesday" fill="#FFBB28" />
                <Bar dataKey="Thursday" fill="#FF8042" />
                <Bar dataKey="Friday" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fleet Utilization Graph */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fleet Utilization</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fleetUtilizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="utilization" stroke="#007bff" fill="#007bff" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charger Status Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Charger Status</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chargerStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chargerStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* V2G Contribution Graph */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">V2G Contribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={v2gData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="energy" stroke="#39FF14" fill="#39FF14" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Maintenance Alerts */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Alerts</h3>
        <div className="space-y-4">
          {maintenanceAlerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-center justify-between p-4 bg-red-50 rounded-lg"
            >
              <div>
                <p className="font-semibold text-gray-900">{alert.vehicle}</p>
                <p className="text-sm text-gray-600">{alert.issue}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Predicted: {alert.predictedDate}</p>
                <span className={`px-2 py-1 rounded text-sm ${
                  alert.severity === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {alert.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Activity Log */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Activity Log</h3>
        <div className="space-y-4">
          {userActivityLog.map((log) => (
            <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">{log.user}</p>
                <p className="text-sm text-gray-600">{log.action}</p>
              </div>
              <p className="text-sm text-gray-600">
                {format(new Date(log.timestamp), 'MMM d, yyyy HH:mm')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 