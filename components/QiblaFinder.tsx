'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/translations';
import { Compass, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QiblaFinder() {
  const { language } = useAppStore();
  const t = translations[language];

  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [heading, setHeading] = useState<number>(0);

  const calculateQibla = (lat: number, lng: number) => {
    // Kaaba coordinates
    const kaabaLat = 21.4225;
    const kaabaLng = 39.8262;

    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
    const toDegrees = (radians: number) => (radians * 180) / Math.PI;

    const lat1 = toRadians(lat);
    const lng1 = toRadians(lng);
    const lat2 = toRadians(kaabaLat);
    const lng2 = toRadians(kaabaLng);

    const dLng = lng2 - lng1;

    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

    let bearing = toDegrees(Math.atan2(y, x));
    bearing = (bearing + 360) % 360;

    return bearing;
  };

  const findQibla = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        const qibla = calculateQibla(latitude, longitude);
        setQiblaDirection(qibla);
        setLoading(false);

        // Try to get device orientation
        if (typeof DeviceOrientationEvent !== 'undefined' && 'requestPermission' in DeviceOrientationEvent) {
          // @ts-ignore
          DeviceOrientationEvent.requestPermission()
            .then((response: string) => {
              if (response === 'granted') {
                window.addEventListener('deviceorientation', handleOrientation);
              }
            })
            .catch(console.error);
        } else {
          window.addEventListener('deviceorientation', handleOrientation);
        }
      },
      (err) => {
        setError('Unable to retrieve your location');
        setLoading(false);
        console.error(err);
      }
    );
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    if (event.alpha !== null) {
      setHeading(360 - event.alpha);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Compass className="h-6 w-6 text-primary" />
              {t.qibla}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!qiblaDirection ? (
              <div className="text-center py-8">
                <Navigation className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">
                  {language === 'ar'
                    ? 'اضغط الزر للعثور على اتجاه القبلة'
                    : language === 'fr'
                    ? 'Appuyez sur le bouton pour trouver la direction de la Qibla'
                    : 'Press the button to find Qibla direction'}
                </p>
                <Button onClick={findQibla} disabled={loading} size="lg">
                  <Compass className="h-5 w-5 mr-2" />
                  {t.findQibla}
                </Button>
                {error && <p className="text-destructive mt-4">{error}</p>}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="relative w-64 h-64 mx-auto">
                    <svg className="w-full h-full" viewBox="0 0 200 200">
                      {/* Compass circle */}
                      <circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-muted"
                      />

                      {/* Compass markings */}
                      <text x="100" y="25" textAnchor="middle" className="text-sm font-bold">
                        N
                      </text>
                      <text x="175" y="105" textAnchor="middle" className="text-sm font-bold">
                        E
                      </text>
                      <text x="100" y="185" textAnchor="middle" className="text-sm font-bold">
                        S
                      </text>
                      <text x="25" y="105" textAnchor="middle" className="text-sm font-bold">
                        W
                      </text>

                      {/* Qibla direction arrow */}
                      <g transform={`rotate(${qiblaDirection - heading} 100 100)`}>
                        <path
                          d="M 100 40 L 110 100 L 100 90 L 90 100 Z"
                          fill="currentColor"
                          className="text-primary"
                        />
                        <motion.circle
                          cx="100"
                          cy="100"
                          r="8"
                          fill="currentColor"
                          className="text-primary"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </g>
                    </svg>
                  </div>

                  <div className="mt-6 space-y-2">
                    <p className="text-2xl font-bold text-primary">
                      {qiblaDirection.toFixed(1)}°
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t.direction}
                    </p>
                    {userLocation && (
                      <p className="text-xs text-muted-foreground">
                        {t.yourLocation}: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-accent/50 p-4 rounded-lg text-center">
                  <p className="text-sm">
                    {language === 'ar'
                      ? 'وجه جهازك نحو السهم الأخضر'
                      : language === 'fr'
                      ? 'Orientez votre appareil vers la flèche verte'
                      : 'Point your device towards the green arrow'}
                  </p>
                </div>

                <Button onClick={findQibla} variant="outline" className="w-full">
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
