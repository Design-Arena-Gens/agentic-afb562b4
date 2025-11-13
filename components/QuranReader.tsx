'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/translations';
import { BookmarkIcon, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Verse {
  number: number;
  text: string;
  numberInSurah: number;
}

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export default function QuranReader() {
  const { language, bookmarks, addBookmark, removeBookmark } = useAppStore();
  const t = translations[language];

  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [currentSurah, setCurrentSurah] = useState<number>(1);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchSurahs();
  }, []);

  useEffect(() => {
    if (currentSurah) {
      fetchVerses(currentSurah);
    }
  }, [currentSurah, language]);

  const fetchSurahs = async () => {
    try {
      const response = await axios.get('https://api.alquran.cloud/v1/surah');
      setSurahs(response.data.data);
    } catch (error) {
      console.error('Error fetching surahs:', error);
    }
  };

  const fetchVerses = async (surahNumber: number) => {
    setLoading(true);
    try {
      const editionMap: Record<string, string> = {
        en: 'en.sahih',
        ar: 'ar.alafasy',
        fr: 'fr.hamidullah',
      };
      const edition = editionMap[language] || 'en.sahih';

      const response = await axios.get(
        `https://api.alquran.cloud/v1/surah/${surahNumber}/${edition}`
      );
      setVerses(response.data.data.ayahs);
    } catch (error) {
      console.error('Error fetching verses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = (surah: number, verse: number) => {
    const bookmarkId = `${surah}:${verse}`;
    if (bookmarks.includes(bookmarkId)) {
      removeBookmark(bookmarkId);
    } else {
      addBookmark(bookmarkId);
    }
  };

  const isBookmarked = (surah: number, verse: number) => {
    return bookmarks.includes(`${surah}:${verse}`);
  };

  const currentSurahData = surahs.find(s => s.number === currentSurah);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{t.quran}</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentSurah(Math.max(1, currentSurah - 1))}
                  disabled={currentSurah === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentSurah(Math.min(114, currentSurah + 1))}
                  disabled={currentSurah === 114}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                type="number"
                min="1"
                max="114"
                value={currentSurah}
                onChange={(e) => setCurrentSurah(parseInt(e.target.value) || 1)}
                placeholder={t.surah}
                className="mb-2"
              />
              {currentSurahData && (
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <h2 className="text-2xl font-bold mb-2">
                    {currentSurahData.name}
                  </h2>
                  <p className="text-lg">
                    {currentSurahData.englishName} - {currentSurahData.englishNameTranslation}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {currentSurahData.numberOfAyahs} {t.verse}s - {currentSurahData.revelationType}
                  </p>
                </div>
              )}
            </div>

            {loading ? (
              <div className="text-center py-8">{t.loading}</div>
            ) : (
              <div className="space-y-4">
                {verses.map((verse, index) => (
                  <motion.div
                    key={verse.number}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                        {verse.numberInSurah}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleBookmark(currentSurah, verse.numberInSurah)}
                      >
                        <BookmarkIcon
                          className={`h-5 w-5 ${
                            isBookmarked(currentSurah, verse.numberInSurah)
                              ? 'fill-primary text-primary'
                              : ''
                          }`}
                        />
                      </Button>
                    </div>
                    <p className={`text-lg leading-loose ${language === 'ar' ? 'arabic-text text-2xl' : ''}`}>
                      {verse.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
