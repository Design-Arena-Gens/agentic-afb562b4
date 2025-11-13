'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import QuranReader from '@/components/QuranReader';
import HadithBrowser from '@/components/HadithBrowser';
import AdhkarLibrary from '@/components/AdhkarLibrary';
import QiblaFinder from '@/components/QiblaFinder';
import PrayerTimes from '@/components/PrayerTimes';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const [currentTab, setCurrentTab] = useState('quran');

  const renderContent = () => {
    switch (currentTab) {
      case 'quran':
        return <QuranReader />;
      case 'hadith':
        return <HadithBrowser />;
      case 'adhkar':
        return <AdhkarLibrary />;
      case 'qibla':
        return <QiblaFinder />;
      case 'prayer':
        return <PrayerTimes />;
      default:
        return <QuranReader />;
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
