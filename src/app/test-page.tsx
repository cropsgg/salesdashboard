'use client';

import { DashboardCard } from '@/components/ui/DashboardCard';

export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      
      <DashboardCard title="Test Card">
        <div className="p-4">
          <p>This is a test card to verify styles are working.</p>
          
          <div className="mt-4 flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-blue-500">
              <img src="/images/products/headphones.png" alt="Headphones" className="w-full h-full object-cover" />
            </div>
            <span className="ml-2">Product Image</span>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
} 