'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Button3D from '@/components/ui/Button3D';
import Card3D from '@/components/cards/Card3D';
import { FiDownload, FiArrowRight, FiStar, FiSettings, FiPlus } from 'react-icons/fi';
import FloatingElement from '@/components/ui/FloatingElement';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';

export default function ComponentsShowcase() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Component Showcase</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Explore all the beautiful UI components available in this dashboard.
        </p>
      </div>

      {/* Button3D Showcase */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">3D Buttons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium text-gray-700 dark:text-gray-300">Primary Variants</h3>
            <Button3D variant="primary">Primary Button</Button3D>
            <Button3D variant="secondary">Secondary Button</Button3D>
            <Button3D variant="success">Success Button</Button3D>
            <Button3D variant="danger">Danger Button</Button3D>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium text-gray-700 dark:text-gray-300">With Icons</h3>
            <Button3D variant="primary" icon={<FiDownload />}>Download</Button3D>
            <Button3D variant="secondary" icon={<FiStar />}>Favorite</Button3D>
            <Button3D variant="success" icon={<FiPlus />}>Add New</Button3D>
            <Button3D variant="info" icon={<FiArrowRight />} iconPosition="right">Next Step</Button3D>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium text-gray-700 dark:text-gray-300">Sizes</h3>
            <Button3D variant="primary" size="xs">Extra Small</Button3D>
            <Button3D variant="primary" size="sm">Small</Button3D>
            <Button3D variant="primary" size="md">Medium</Button3D>
            <Button3D variant="primary" size="lg">Large</Button3D>
            <Button3D variant="primary" size="xl">Extra Large</Button3D>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium text-gray-700 dark:text-gray-300">States</h3>
            <Button3D variant="primary" isLoading>Loading</Button3D>
            <Button3D variant="primary" isDisabled>Disabled</Button3D>
            <Button3D variant="gradient">Gradient</Button3D>
            <Button3D variant="light">Light</Button3D>
            <Button3D variant="dark">Dark</Button3D>
          </div>
        </div>
      </section>

      {/* Card3D Showcase */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">3D Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card3D>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Premium Card</h3>
              <p className="text-gray-600 dark:text-gray-400">
                This interactive 3D card provides a premium feel to content display.
              </p>
              <div className="mt-4">
                <Button3D variant="primary" size="sm">Learn More</Button3D>
              </div>
            </div>
          </Card3D>

          <Card3D backgroundColor="rgba(239, 246, 255, 0.7)" borderColor="rgba(191, 219, 254, 0.4)">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Feature Card</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Highlight important features with this eye-catching card component.
              </p>
              <div className="mt-4">
                <Button3D variant="info" size="sm">Explore Features</Button3D>
              </div>
            </div>
          </Card3D>

          <Card3D backgroundColor="rgba(254, 242, 242, 0.7)" borderColor="rgba(254, 202, 202, 0.4)">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Customizable</h3>
              <p className="text-gray-600 dark:text-gray-400">
                These cards can be customized with different colors and effects.
              </p>
              <div className="mt-4">
                <Button3D variant="danger" size="sm">Customize</Button3D>
              </div>
            </div>
          </Card3D>
        </div>
      </section>

      {/* FloatingElement Showcase */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Floating Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <FloatingElement amplitude={3} duration={3}>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-200">Subtle Float</h3>
              <p className="text-blue-600 dark:text-blue-300">Small amplitude, medium speed</p>
            </div>
          </FloatingElement>

          <FloatingElement amplitude={8} duration={4} delay={0.2}>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-purple-800 dark:text-purple-200">Medium Float</h3>
              <p className="text-purple-600 dark:text-purple-300">Medium amplitude, slow speed</p>
            </div>
          </FloatingElement>

          <FloatingElement amplitude={12} duration={2} delay={0.4}>
            <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-green-800 dark:text-green-200">Large Float</h3>
              <p className="text-green-600 dark:text-green-300">Large amplitude, fast speed</p>
            </div>
          </FloatingElement>

          <FloatingElement amplitude={6} duration={5} delay={0.6}>
            <div className="bg-amber-100 dark:bg-amber-900/30 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-amber-800 dark:text-amber-200">Custom Float</h3>
              <p className="text-amber-600 dark:text-amber-300">Medium amplitude, very slow</p>
            </div>
          </FloatingElement>
        </div>
      </section>

      {/* GlassMorphicCard Showcase */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Glassmorphic Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassMorphicCard title="Standard Glass Card">
            <div className="p-4">
              <p className="text-gray-700 dark:text-gray-300">
                This card features a modern glassmorphic design with hover effects and interactive elements.
              </p>
            </div>
          </GlassMorphicCard>

          <GlassMorphicCard 
            title="Interactive Card" 
            onRefresh={() => alert('Refreshing card...')}
            onExport={() => alert('Exporting card data...')}
            onRemove={() => alert('Remove action triggered')}
          >
            <div className="p-4">
              <p className="text-gray-700 dark:text-gray-300">
                Try interacting with this card's menu options to see the available actions.
              </p>
              <div className="mt-4 flex justify-end">
                <Button3D variant="primary" size="sm" icon={<FiSettings />}>Configure</Button3D>
              </div>
            </div>
          </GlassMorphicCard>
        </div>
      </section>
    </DashboardLayout>
  );
} 