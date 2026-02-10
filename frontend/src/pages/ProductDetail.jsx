import { useState } from 'react';
import Navbar from '../components/Navbar';
import VirtualTryOn from '../components/VirtualTryOn';
import SizeSuggestion from '../components/SizeSuggestion';
import BodyMeasurements from '../components/BodyMeasurements';

export default function ProductDetail() {
  const [activeTab, setActiveTab] = useState('tryon');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="py-8 px-4">
        {activeTab === 'tryon' && <VirtualTryOn />}
        {activeTab === 'size' && <SizeSuggestion />}
        {activeTab === 'measurements' && <BodyMeasurements />}
      </main>
    </div>
  );
}
