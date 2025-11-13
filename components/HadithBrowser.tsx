'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/translations';
import { Search, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface Hadith {
  number: number;
  arab: string;
  id: number;
}

interface Chapter {
  id: string;
  chapterNumber: string;
  chapterEnglish: string;
  chapterUrdu: string;
  chapterArabic: string;
  bookSlug: string;
}

export default function HadithBrowser() {
  const { language } = useAppStore();
  const t = translations[language];

  const [books] = useState([
    { slug: 'sahih-bukhari', name: 'Sahih Bukhari' },
    { slug: 'sahih-muslim', name: 'Sahih Muslim' },
    { slug: 'abu-dawood', name: 'Abu Dawood' },
    { slug: 'tirmidhi', name: 'Tirmidhi' },
  ]);

  const [selectedBook, setSelectedBook] = useState('sahih-bukhari');
  const [hadiths, setHadiths] = useState<Hadith[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchHadiths();
  }, [selectedBook, currentPage]);

  const fetchHadiths = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${selectedBook}.json`
      );

      const allHadiths = response.data.hadiths;
      const itemsPerPage = 10;
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;

      setHadiths(allHadiths.slice(start, end));
      setTotalPages(Math.ceil(allHadiths.length / itemsPerPage));
    } catch (error) {
      console.error('Error fetching hadiths:', error);
    } finally {
      setLoading(false);
    }
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
              <BookOpen className="h-6 w-6" />
              {t.hadith}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                {t.category}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {books.map((book) => (
                  <Button
                    key={book.slug}
                    variant={selectedBook === book.slug ? 'default' : 'outline'}
                    onClick={() => {
                      setSelectedBook(book.slug);
                      setCurrentPage(1);
                    }}
                    className="w-full"
                  >
                    {book.name}
                  </Button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="text-center py-8">{t.loading}</div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {hadiths.map((hadith, index) => (
                    <motion.div
                      key={hadith.number}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="p-6 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                          #{hadith.number}
                        </span>
                      </div>
                      <p className="text-lg leading-loose arabic-text text-xl">
                        {hadith.arab}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    {t.language === 'ar' ? 'السابق' : language === 'fr' ? 'Précédent' : 'Previous'}
                  </Button>
                  <span className="inline-flex items-center px-4">
                    {currentPage} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    {t.language === 'ar' ? 'التالي' : language === 'fr' ? 'Suivant' : 'Next'}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
