'use client';

import { useState } from 'react';
import { 
  Battery100Icon, 
  CurrencyDollarIcon, 
  GlobeAltIcon, 
  WrenchScrewdriverIcon,
  ChartBarIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const stats = [
  { name: 'Total Fleet Status', value: '45/50', icon: Battery100Icon, trend: '+5%', trendPositive: true },
  { name: 'Cost Savings', value: '$12,450', icon: CurrencyDollarIcon, trend: '+$2,100', trendPositive: true },
  { name: 'Battery Health', value: '92%', icon: WrenchScrewdriverIcon, trend: '-2%', trendPositive: false },
  { name: 'Carbon Reduction', value: '2.4t CO2', icon: GlobeAltIcon, trend: '+0.5t', trendPositive: true },
];

const alerts = [
  { id: 1, type: 'warning', message: 'Battery health below 80% for 3 vehicles', time: '2 hours ago' },
  { id: 2, type: 'info', message: 'Peak charging hours approaching', time: '1 hour ago' },
  { id: 3, type: 'success', message: 'Maintenance completed for CS-002', time: '30 minutes ago' },
];

const energySources = [
  { name: 'Solar', percentage: 40, color: 'text-yellow-400' },
  { name: 'Grid', percentage: 60, color: 'text-gray-400' },
];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('today');

  return (
    <div className="space-y-6">
      {/* Overview Panel */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
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

      {/* Alerts Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Alerts
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {alerts.map((alert) => (
              <li key={alert.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center">
                  <ExclamationTriangleIcon className={`h-5 w-5 ${
                    alert.type === 'warning' ? 'text-yellow-400' :
                    alert.type === 'info' ? 'text-blue-400' :
                    'text-green-400'
                  }`} />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <p className="text-sm text-gray-500">{alert.time}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Analytics</h2>
          <div className="flex space-x-2">
            {['today', 'week', 'month'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-sm rounded-md ${
                  timeRange === range
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Cost Optimization Chart */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Cost Optimization
            </h3>
            <div className="h-64 bg-white rounded-md border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Peak Hours</p>
                  <p className="text-lg font-semibold">2:00 PM - 8:00 PM</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Off-Peak Savings</p>
                  <p className="text-lg font-semibold text-green-600">$1,200</p>
                </div>
              </div>
              <div className="h-32 bg-gray-100 rounded">
                {/* Placeholder for chart */}
              </div>
            </div>
          </div>

          {/* Energy Sources */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Energy Sources
            </h3>
            <div className="h-64 bg-white rounded-md border border-gray-200 p-4">
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Reports</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <ChartBarIcon className="h-5 w-5 mr-2" />
            Export Energy Report
          </button>
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <WrenchScrewdriverIcon className="h-5 w-5 mr-2" />
            Export Maintenance Logs
          </button>
        </div>
      </div>
    </div>
  );
} 