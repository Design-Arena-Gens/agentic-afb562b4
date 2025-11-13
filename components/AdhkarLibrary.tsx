'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/translations';
import { adhkarData, AdhkarCategory } from '@/lib/adhkar-data';
import { Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdhkarLibrary() {
  const { language } = useAppStore();
  const t = translations[language];

  const [selectedCategory, setSelectedCategory] = useState<string>('morning');
  const [counters, setCounters] = useState<Record<string, number>>({});

  const currentCategory = adhkarData.find(cat => cat.id === selectedCategory);

  const handleIncrement = (dhikrId: string, maxCount?: number) => {
    setCounters(prev => {
      const current = prev[dhikrId] || 0;
      const next = current + 1;
      if (maxCount && next > maxCount) {
        return { ...prev, [dhikrId]: 0 };
      }
      return { ...prev, [dhikrId]: next };
    });
  };

  const handleReset = (dhikrId: string) => {
    setCounters(prev => ({ ...prev, [dhikrId]: 0 }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              {t.adhkar}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {adhkarData.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category.id)}
                    className="w-full"
                  >
                    {category.name[language]}
                  </Button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {currentCategory && (
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {currentCategory.adhkar.map((dhikr, index) => {
                    const count = counters[dhikr.id] || 0;
                    const isComplete = dhikr.count && count >= dhikr.count;

                    return (
                      <motion.div
                        key={dhikr.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className={`${isComplete ? 'border-primary bg-primary/5' : ''}`}>
                          <CardContent className="pt-6">
                            <div className="mb-4">
                              <p className="text-2xl leading-loose arabic-text mb-4">
                                {dhikr.arabic}
                              </p>
                              <p className="text-sm text-muted-foreground italic mb-2">
                                {dhikr.transliteration}
                              </p>
                              <p className="text-base">
                                {dhikr.translation[language === 'ar' ? 'en' : language]}
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {dhikr.reference}
                              </p>
                            </div>

                            {dhikr.count && (
                              <div className="flex items-center gap-4">
                                <Button
                                  onClick={() => handleIncrement(dhikr.id, dhikr.count)}
                                  className="flex-1"
                                  variant={isComplete ? 'default' : 'outline'}
                                >
                                  {isComplete && <Check className="h-4 w-4 mr-2" />}
                                  {count} / {dhikr.count}
                                </Button>
                                {count > 0 && (
                                  <Button
                                    onClick={() => handleReset(dhikr.id)}
                                    variant="ghost"
                                    size="sm"
                                  >
                                    {language === 'ar' ? 'إعادة' : language === 'fr' ? 'Réinitialiser' : 'Reset'}
                                  </Button>
                                )}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
