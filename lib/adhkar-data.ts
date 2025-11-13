export interface Dhikr {
  id: string;
  arabic: string;
  transliteration: string;
  translation: {
    en: string;
    fr: string;
  };
  reference: string;
  count?: number;
}

export interface AdhkarCategory {
  id: string;
  name: {
    en: string;
    ar: string;
    fr: string;
  };
  adhkar: Dhikr[];
}

export const adhkarData: AdhkarCategory[] = [
  {
    id: 'morning',
    name: {
      en: 'Morning Adhkar',
      ar: 'أذكار الصباح',
      fr: 'Adhkar du Matin',
    },
    adhkar: [
      {
        id: 'morning-1',
        arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'Asbahna wa asbahal-mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la shareeka lah, lahul-mulku walahul-hamd, wahuwa \'ala kulli shay\'in qadeer',
        translation: {
          en: 'We have entered the morning and with it all dominion is Allah\'s. Praise is to Allah. None has the right to be worshipped but Allah alone, Who has no partner. To Allah belongs the dominion, and to Him belongs all praise, and He is capable of all things.',
          fr: 'Nous sommes entrés dans le matin et avec lui toute domination appartient à Allah. La louange est à Allah. Nul n\'a le droit d\'être adoré sauf Allah seul, Qui n\'a pas d\'associé. À Allah appartient la domination, et à Lui appartient toute louange, et Il est capable de toutes choses.',
        },
        reference: 'Muslim',
        count: 1,
      },
      {
        id: 'morning-2',
        arabic: 'اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ',
        transliteration: 'Allahumma inni asbahtu ushhiduka, wa ushhidu hamalata \'arshik, wa mala\'ikatak, wa jami\'a khalqik, annaka antallahu la ilaha illa anta wahdaka la shareeka lak, wa anna Muhammadan \'abduka wa rasooluk',
        translation: {
          en: 'O Allah, I have entered the morning and I call upon You and upon the bearers of Your Throne, and Your angels and all creation to bear witness that surely You are Allah, there is none worthy of worship but You alone, You have no partners, and that Muhammad is Your slave and Your Messenger.',
          fr: 'Ô Allah, je suis entré dans le matin et je T\'appelle ainsi que les porteurs de Ton Trône, et Tes anges et toute la création pour témoigner que Tu es certainement Allah, il n\'y a de dieu digne d\'adoration que Toi seul, Tu n\'as pas d\'associés, et que Muhammad est Ton serviteur et Ton Messager.',
        },
        reference: 'Abu Dawud',
        count: 4,
      },
      {
        id: 'morning-3',
        arabic: 'أَعُوذُ بِاللَّهِ السَّمِيعِ الْعَلِيمِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
        transliteration: 'A\'udhu billahis-sami\'il-\'aleemi minash-shaytanir-rajeem',
        translation: {
          en: 'I seek refuge in Allah, the All-Hearing, the All-Knowing, from the accursed devil.',
          fr: 'Je cherche refuge auprès d\'Allah, Celui qui entend tout, Celui qui sait tout, contre le diable maudit.',
        },
        reference: 'Abu Dawud, Tirmidhi',
        count: 3,
      },
    ],
  },
  {
    id: 'evening',
    name: {
      en: 'Evening Adhkar',
      ar: 'أذكار المساء',
      fr: 'Adhkar du Soir',
    },
    adhkar: [
      {
        id: 'evening-1',
        arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'Amsayna wa amsal-mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la shareeka lah, lahul-mulku walahul-hamd, wahuwa \'ala kulli shay\'in qadeer',
        translation: {
          en: 'We have entered the evening and with it all dominion is Allah\'s. Praise is to Allah. None has the right to be worshipped but Allah alone, Who has no partner. To Allah belongs the dominion, and to Him belongs all praise, and He is capable of all things.',
          fr: 'Nous sommes entrés dans le soir et avec lui toute domination appartient à Allah. La louange est à Allah. Nul n\'a le droit d\'être adoré sauf Allah seul, Qui n\'a pas d\'associé. À Allah appartient la domination, et à Lui appartient toute louange, et Il est capable de toutes choses.',
        },
        reference: 'Muslim',
        count: 1,
      },
      {
        id: 'evening-2',
        arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
        transliteration: 'Allahumma bika amsayna, wa bika asbahna, wa bika nahya, wa bika namootu, wa ilaykal-maseer',
        translation: {
          en: 'O Allah, by You we have entered the evening and by You we have entered the morning, by You we live and by You we die, and to You is the return.',
          fr: 'Ô Allah, par Toi nous sommes entrés dans le soir et par Toi nous sommes entrés dans le matin, par Toi nous vivons et par Toi nous mourrons, et vers Toi est le retour.',
        },
        reference: 'Abu Dawud, Tirmidhi',
        count: 1,
      },
    ],
  },
  {
    id: 'after-salah',
    name: {
      en: 'After Salah',
      ar: 'بعد الصلاة',
      fr: 'Après la Salat',
    },
    adhkar: [
      {
        id: 'after-salah-1',
        arabic: 'أَسْتَغْفِرُ اللَّهَ (ثَلَاثًا) اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
        transliteration: 'Astaghfirullah (3 times). Allahumma antas-salamu wa minkas-salam, tabarakta ya dhal-jalali wal-ikram',
        translation: {
          en: 'I seek Allah\'s forgiveness (3 times). O Allah, You are Peace and from You comes peace. Blessed are You, O Owner of majesty and honor.',
          fr: 'Je demande le pardon d\'Allah (3 fois). Ô Allah, Tu es la Paix et de Toi vient la paix. Béni sois-Tu, ô Possesseur de majesté et d\'honneur.',
        },
        reference: 'Muslim',
        count: 1,
      },
      {
        id: 'after-salah-2',
        arabic: 'سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَاللَّهُ أَكْبَرُ',
        transliteration: 'SubhanAllah (33 times), Alhamdulillah (33 times), Allahu Akbar (33 times)',
        translation: {
          en: 'Glory be to Allah (33 times), Praise be to Allah (33 times), Allah is the Greatest (33 times)',
          fr: 'Gloire à Allah (33 fois), Louange à Allah (33 fois), Allah est le Plus Grand (33 fois)',
        },
        reference: 'Muslim',
        count: 33,
      },
      {
        id: 'after-salah-3',
        arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'La ilaha illallahu wahdahu la shareeka lah, lahul-mulku walahul-hamd, wahuwa \'ala kulli shay\'in qadeer',
        translation: {
          en: 'None has the right to be worshipped but Allah alone, Who has no partner. To Allah belongs the dominion and to Him belongs all praise, and He has power over all things.',
          fr: 'Nul n\'a le droit d\'être adoré sauf Allah seul, Qui n\'a pas d\'associé. À Allah appartient la domination et à Lui appartient toute louange, et Il a pouvoir sur toutes choses.',
        },
        reference: 'Muslim',
        count: 1,
      },
    ],
  },
  {
    id: 'daily',
    name: {
      en: 'Daily Dhikr',
      ar: 'الذكر اليومي',
      fr: 'Dhikr Quotidien',
    },
    adhkar: [
      {
        id: 'daily-1',
        arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
        transliteration: 'La ilaha illallah',
        translation: {
          en: 'There is no god but Allah',
          fr: 'Il n\'y a de dieu qu\'Allah',
        },
        reference: 'Tirmidhi',
        count: 100,
      },
      {
        id: 'daily-2',
        arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
        transliteration: 'SubhanAllahi wa bihamdihi',
        translation: {
          en: 'Glory be to Allah and praise Him',
          fr: 'Gloire à Allah et louange à Lui',
        },
        reference: 'Muslim',
        count: 100,
      },
      {
        id: 'daily-3',
        arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
        transliteration: 'Allahumma salli \'ala Muhammadin wa \'ala ali Muhammad',
        translation: {
          en: 'O Allah, send blessings upon Muhammad and upon the family of Muhammad',
          fr: 'Ô Allah, envoie des bénédictions sur Muhammad et sur la famille de Muhammad',
        },
        reference: 'Bukhari',
        count: 10,
      },
    ],
  },
];
