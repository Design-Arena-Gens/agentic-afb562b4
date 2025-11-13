'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/translations';
import { Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Coordinates, CalculationMethod, PrayerTimes as AdhanPrayerTimes } from 'adhan';

interface PrayerTime {
  name: string;
  time: Date;
}

export default function PrayerTimes() {
  const { language } = useAppStore();
  const t = translations[language];

  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nextPrayer, setNextPrayer] = useState<string>('');
  const [timeToNext, setTimeToNext] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  useEffect(() => {
    if (prayerTimes.length > 0) {
      const interval = setInterval(() => {
        updateNextPrayer();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [prayerTimes]);

  const fetchPrayerTimes = () => {
    setLoading(true);

    if (!navigator.geolocation) {
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });

        calculatePrayerTimes(latitude, longitude);
        setLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        // Default to Mecca if location not available
        calculatePrayerTimes(21.4225, 39.8262);
        setLoading(false);
      }
    );
  };

  const calculatePrayerTimes = (lat: number, lng: number) => {
    const coordinates = new Coordinates(lat, lng);
    const params = CalculationMethod.MuslimWorldLeague();
    const date = new Date();
    const times = new AdhanPrayerTimes(coordinates, date, params);

    const prayers: PrayerTime[] = [
      { name: 'fajr', time: times.fajr },
      { name: 'sunrise', time: times.sunrise },
      { name: 'dhuhr', time: times.dhuhr },
      { name: 'asr', time: times.asr },
      { name: 'maghrib', time: times.maghrib },
      { name: 'isha', time: times.isha },
    ];

    setPrayerTimes(prayers);
    updateNextPrayer(prayers);
  };

  const updateNextPrayer = (prayers?: PrayerTime[]) => {
    const times = prayers || prayerTimes;
    if (times.length === 0) return;

    const now = new Date();
    let next = times.find(prayer => prayer.time > now);

    if (!next) {
      // If no prayer found, next prayer is Fajr tomorrow
      next = times[0];
    }

    setNextPrayer(next.name);

    const diff = next.time.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeToNext(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getPrayerIcon = (prayerName: string) => {
    return <Clock className="h-5 w-5" />;
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
              <Clock className="h-6 w-6 text-primary" />
              {t.prayerTimes}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">{t.loading}</div>
            ) : prayerTimes.length === 0 ? (
              <div className="text-center py-8">
                <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">
                  {language === 'ar'
                    ? 'اضغط للحصول على أوقات الصلاة'
                    : language === 'fr'
                    ? 'Cliquez pour obtenir les horaires de prière'
                    : 'Click to get prayer times'}
                </p>
                <Button onClick={fetchPrayerTimes} size="lg">
                  <MapPin className="h-5 w-5 mr-2" />
                  {language === 'ar' ? 'احصل على الأوقات' : language === 'fr' ? 'Obtenir les horaires' : 'Get Times'}
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {nextPrayer && (
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="bg-primary/10 p-6 rounded-lg text-center border-2 border-primary"
                  >
                    <p className="text-sm text-muted-foreground mb-2">{t.nextPrayer}</p>
                    <p className="text-3xl font-bold mb-2">{t[nextPrayer as keyof typeof t]}</p>
                    <p className="text-2xl font-mono text-primary">{timeToNext}</p>
                  </motion.div>
                )}

                <div className="grid gap-3">
                  {prayerTimes.map((prayer, index) => {
                    const isNext = prayer.name === nextPrayer;
                    return (
                      <motion.div
                        key={prayer.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`flex items-center justify-between p-4 rounded-lg border ${
                          isNext
                            ? 'bg-primary/5 border-primary'
                            : 'bg-card hover:bg-accent/50'
                        } transition-colors`}
                      >
                        <div className="flex items-center gap-3">
                          {getPrayerIcon(prayer.name)}
                          <span className={`font-medium ${isNext ? 'text-primary' : ''}`}>
                            {t[prayer.name as keyof typeof t]}
                          </span>
                        </div>
                        <span className={`text-lg font-mono ${isNext ? 'text-primary font-bold' : ''}`}>
                          {formatTime(prayer.time)}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                {location && (
                  <div className="text-center text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 inline mr-1" />
                    {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                  </div>
                )}

                <Button onClick={fetchPrayerTimes} variant="outline" className="w-full">
                  {t.retry}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
