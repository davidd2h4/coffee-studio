import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Lang = 'uk' | 'en';
export type Localized = Record<Lang, string>;

const STORAGE_KEY = 'coffee-studio-lang';

const uk = {
  meta: {
    title: 'COFFEE STUDIO — спешелті-кава',
    description: 'COFFEE STUDIO — спешелті-кава, неспішні ранки та сезонні авторські напої. Демонстраційний сайт.',
  },
  skip: 'Перейти до вмісту',
  nav: {
    menu: 'Меню',
    story: 'Наша історія',
    featured: 'Авторські напої',
    gallery: 'Галерея',
    visit: 'Як знайти',
    contact: 'Контакти',
    findUs: 'Знайти нас',
    home: 'Coffee Studio — на початок сторінки',
    primary: 'Основна навігація',
    mobile: 'Мобільна навігація',
    open: 'Відкрити меню',
    close: 'Закрити меню',
    foot: 'Працюємо щодня · Демонстраційний сайт',
    language: 'Мова сайту',
  },
  hero: {
    eyebrow: 'Спешелті-кава · з 2026 року',
    line1: 'Неспішна кава',
    line2: 'для',
    line2em: 'спокійних',
    line3: 'ранків.',
    lead: 'Сезонне зерно, уважні руки й тиха зала, наповнена теплим світлом. Coffee Studio — місце, де смакують повільно й залишаються трохи довше.',
    ctaMenu: 'Переглянути меню',
    ctaStory: 'Наша історія',
    cardLabel: 'Напій сезону',
    cardName: 'Капучино від Studio',
    cardNote: 'Подвійне еспресо, оксамитове молоко й латте-арт «розетта».',
    cardLink: 'У меню',
    photoAlt: 'Капучино з латте-артом «розетта» в керамічній чашці',
    badge: 'COFFEE STUDIO · СПЕШЕЛТІ-КАВА · З 2026 ·',
    stats: [
      { dt: 'Сортів цього сезону', dd: '06' },
      { dt: 'Годин настою колд брю', dd: '18' },
      { dt: 'Випічка щодня', dd: 'Власна' },
    ],
    scroll: 'Прокрутити до меню',
  },
  menu: {
    eyebrow: 'Меню',
    title: 'Заварено',
    titleEm: 'з любов’ю',
    lead: 'Ціни вказано в гривнях (₴). Вівсяне, мигдалеве та безлактозне молоко — без доплати.',
    filterLabel: 'Фільтр меню за категоріями',
    showing: (n: number) => `Показано позицій: ${n}`,
    volume: 'Об’єм',
    weight: 'Вага',
    ml: 'мл',
    g: 'г',
  },
  story: {
    eyebrow: 'Наша історія',
    title: 'Маленька студія, присвячена',
    titleEm: 'одній добрій чашці',
    p1: 'Coffee Studio почалася з простої ідеї: ставитися до кави так, як шеф-кухар ставиться до сезонного продукту. Ми тримаємо коротке меню, часто змінюємо зерно для фільтра й приділяємо час деталям, завдяки яким чашку запам’ятовують.',
    p2: 'Наша зала створена для того, щоб затриматися: м’яке світло, натуральне дерево й багато простору між столами. Забігайте на швидке еспресо біля бару або вмощуйтеся з пуровером і книжкою.',
    since: 'Від',
    mainAlt: 'Кавовий бар із підвісними лампами та полицями із зерном',
    detailAlt: 'Мелена кава, зерна та лате на дерев’яних дошках',
    pillars: [
      { title: 'Ретельний відбір', text: 'Невеликі лоти зерна з прозорим походженням — щосезону обираємо за чистоту й солодкість.' },
      { title: 'Світле обсмаження', text: 'Профілі, що розкривають характер зерна: фрукти, квіти й медова солодкість.' },
      { title: 'Подаємо без поспіху', text: 'Налаштовуємо рецепт упродовж дня й ніколи не віддаємо чашку нашвидкуруч.' },
    ],
  },
  featured: {
    eyebrow: 'Рекомендовані напої',
    title: 'Авторські',
    titleEm: 'напої',
    lead: 'Чотири чашки, що визначають нашу студію: створені біля бару й відшліфовані за багато ранків.',
  },
  gallery: {
    eyebrow: 'Галерея',
    title: 'Миті в',
    titleEm: 'студії',
    lead: 'Атмосферні фото для ілюстрації. Натисніть на будь-яке зображення, щоб збільшити.',
    enlarge: (alt: string) => `Збільшити зображення: ${alt}`,
    position: (i: number, n: number) => `Зображення ${i} з ${n}`,
    close: 'Закрити',
    prev: 'Попереднє зображення',
    next: 'Наступне зображення',
  },
  reviews: {
    eyebrow: 'Відгуки гостей',
    title: 'Теплі',
    titleEm: 'слова',
    pill: 'Демовміст',
    note: 'Це відгуки-заглушки, написані для цього шаблону, — а не відгуки реальних клієнтів.',
    stars: (r: number) => `Оцінка: ${r} з 5`,
  },
  visit: {
    eyebrow: 'Адреса та години роботи',
    title: 'Завітайте до',
    titleEm: 'студії',
    address: 'Адреса',
    pill: 'Демоадреса',
    line1: 'вул. Прикладна, 00',
    line2: 'Ваше місто, Україна',
    note: 'Адреса-заглушка — замініть її на реальну перед запуском.',
    hours: 'Години роботи',
    today: 'Сьогодні',
    mapAria: 'Ілюстративна карта — не реальне розташування',
    mapLabel: 'Ілюстративна карта · демо',
  },
  contact: {
    eyebrow: 'Контакти',
    title: 'Напишіть',
    titleEm: 'нам',
    lead: 'Приватні заходи, гуртові поставки зерна, майстер-класи для бариста чи просто питання про сьогоднішній фільтр — ми будемо раді вашому листу.',
    email: 'Ел. пошта',
    phone: 'Телефон',
    social: 'Соцмережі',
    placeholderNote: 'Наведені вище контакти — заглушки для демоверсії.',
    demoPill: 'Демоформа',
    demoIntro: 'Ця форма лише перевіряє введені дані — повідомлення нікуди не надсилається.',
    name: 'Ім’я',
    topic: 'Тема',
    message: 'Повідомлення',
    namePh: 'Як до вас звертатися?',
    emailPh: 'name@example.com',
    messagePh: 'Розкажіть, чим ми можемо допомогти…',
    topics: ['Загальне питання', 'Приватний захід', 'Гуртове зерно', 'Майстер-клас для бариста'],
    submit: 'Перевірити форму (демо)',
    errName: 'Будь ласка, вкажіть ваше ім’я.',
    errEmail: 'Будь ласка, вкажіть коректну електронну адресу.',
    errMessage: 'Повідомлення має містити щонайменше 10 символів.',
    errSummary: 'Будь ласка, виправте позначені поля.',
    successTitle: 'Форму заповнено правильно',
    successText: 'Це демонстрація, тому повідомлення не надіслано і ніде не збережено. Щоб підключити справжнє надсилання, потрібен сервер або сервіс форм.',
    again: 'Заповнити ще раз',
  },
  footer: {
    tagline: 'Спешелті-кава, сезонні авторські напої та зала, де хочеться затриматися.',
    nav: 'Навігація у футері',
    explore: 'Розділи',
    visit: 'Відвідати',
    hours: 'Адреса та години роботи',
    reviews: 'Відгуки гостей',
    newsletter: 'Розсилка',
    newsletterText: 'Нові сорти та події — раз на місяць.',
    newsletterDemo: 'Демо: адреси не зберігаються.',
    emailLabel: 'Електронна адреса',
    emailPh: 'Ваша електронна адреса',
    subscribe: 'Підписатися (демо)',
    thanks: 'Дякуємо! Це демо — адресу не збережено.',
    rights: 'Демонстраційний сайт — дані закладу та відгуки є заглушками.',
    photos: 'Фото з',
  },
  image: {
    fallback: 'Фото недоступне',
  },
};

export type Dict = typeof uk;

const en: Dict = {
  meta: {
    title: 'COFFEE STUDIO — specialty coffee',
    description: 'COFFEE STUDIO — specialty coffee, slow mornings and seasonal signature drinks. Demo website.',
  },
  skip: 'Skip to content',
  nav: {
    menu: 'Menu',
    story: 'Our Story',
    featured: 'Signatures',
    gallery: 'Gallery',
    visit: 'Visit',
    contact: 'Contact',
    findUs: 'Find us',
    home: 'Coffee Studio — back to top',
    primary: 'Primary navigation',
    mobile: 'Mobile navigation',
    open: 'Open menu',
    close: 'Close menu',
    foot: 'Open daily · Demo website',
    language: 'Site language',
  },
  hero: {
    eyebrow: 'Specialty coffee · Est. 2026',
    line1: 'Slow coffee',
    line2: 'for',
    line2em: 'unhurried',
    line3: 'mornings.',
    lead: 'Seasonal beans, careful hands and a quiet room filled with warm light. Coffee Studio is a place to taste slowly and stay a little longer.',
    ctaMenu: 'Explore the menu',
    ctaStory: 'Our story',
    cardLabel: 'Drink of the season',
    cardName: 'Studio Cappuccino',
    cardNote: 'Double espresso, velvet milk and rosetta latte art.',
    cardLink: 'On the menu',
    photoAlt: 'Cappuccino with rosetta latte art in a ceramic cup',
    badge: 'COFFEE STUDIO · SPECIALTY COFFEE · EST. 2026 ·',
    stats: [
      { dt: 'Origins this season', dd: '06' },
      { dt: 'Hours of cold brew steep', dd: '18' },
      { dt: 'Pastries baked daily', dd: 'In-house' },
    ],
    scroll: 'Scroll to menu',
  },
  menu: {
    eyebrow: 'The Menu',
    title: 'Brewed with',
    titleEm: 'intention',
    lead: 'Prices in Ukrainian hryvnia (₴). Oat, almond and lactose-free milk at no extra charge.',
    filterLabel: 'Filter menu by category',
    showing: (n: number) => `Showing ${n} ${n === 1 ? 'item' : 'items'}`,
    volume: 'Volume',
    weight: 'Weight',
    ml: 'ml',
    g: 'g',
  },
  story: {
    eyebrow: 'Our Story',
    title: 'A small studio devoted to',
    titleEm: 'one good cup',
    p1: 'Coffee Studio began with a simple idea: treat coffee the way a chef treats a seasonal ingredient. We keep the menu short, change our filter origins often and spend our time on the details that make a cup memorable.',
    p2: 'The room is designed for lingering — soft light, natural wood and plenty of space between tables. Come for a quick espresso at the bar, or settle in with a pour-over and a book.',
    since: 'Since',
    mainAlt: 'Coffee bar with pendant lights and shelves of beans',
    detailAlt: 'Ground coffee, beans and a latte on wooden boards',
    pillars: [
      { title: 'Sourced with care', text: 'Small-lot, traceable beans chosen each season for clarity and sweetness.' },
      { title: 'Roasted lightly', text: 'Profiles that let origin speak — fruit, florals and honeyed sweetness.' },
      { title: 'Served slowly', text: 'Every cup is dialled in through the day, never rushed out of the bar.' },
    ],
  },
  featured: {
    eyebrow: 'Featured Drinks',
    title: 'House',
    titleEm: 'signatures',
    lead: 'Four cups that define the studio — crafted at the bar, refined over many mornings.',
  },
  gallery: {
    eyebrow: 'Gallery',
    title: 'Moments at the',
    titleEm: 'studio',
    lead: 'Atmosphere photography for illustration. Tap any image to enlarge.',
    enlarge: (alt: string) => `Enlarge image: ${alt}`,
    position: (i: number, n: number) => `Image ${i} of ${n}`,
    close: 'Close',
    prev: 'Previous image',
    next: 'Next image',
  },
  reviews: {
    eyebrow: 'Guest Notes',
    title: 'Kind',
    titleEm: 'words',
    pill: 'Demo content',
    note: 'These are placeholder reviews written for this template — not testimonials from real customers.',
    stars: (r: number) => `Rated ${r} out of 5`,
  },
  visit: {
    eyebrow: 'Location & Hours',
    title: 'Come visit the',
    titleEm: 'studio',
    address: 'Address',
    pill: 'Demo address',
    line1: '00 Sample Street',
    line2: 'Your City, Ukraine',
    note: 'Placeholder location — replace with your real address before launch.',
    hours: 'Opening hours',
    today: 'Today',
    mapAria: 'Illustrative map — not a real location',
    mapLabel: 'Illustrative map · demo',
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Say',
    titleEm: 'hello',
    lead: 'Private events, wholesale beans, barista workshops or simply a question about today’s filter — we would love to hear from you.',
    email: 'Email',
    phone: 'Phone',
    social: 'Social',
    placeholderNote: 'The contact details above are placeholders for this demo.',
    demoPill: 'Demo form',
    demoIntro: 'This form only validates what you type — no message is sent anywhere.',
    name: 'Name',
    topic: 'Topic',
    message: 'Message',
    namePh: 'What should we call you?',
    emailPh: 'name@example.com',
    messagePh: 'Tell us how we can help…',
    topics: ['General question', 'Private event', 'Wholesale beans', 'Barista workshop'],
    submit: 'Check form (demo)',
    errName: 'Please enter your name.',
    errEmail: 'Please enter a valid email address.',
    errMessage: 'Message should be at least 10 characters.',
    errSummary: 'Please correct the highlighted fields.',
    successTitle: 'Form filled in correctly',
    successText: 'This is a demo, so your message was not sent or stored anywhere. Real delivery needs a server or a form service.',
    again: 'Fill in again',
  },
  footer: {
    tagline: 'Specialty coffee, seasonal signatures and a room made for lingering.',
    nav: 'Footer navigation',
    explore: 'Explore',
    visit: 'Visit',
    hours: 'Location & hours',
    reviews: 'Guest notes',
    newsletter: 'Newsletter',
    newsletterText: 'New origins and events, once a month.',
    newsletterDemo: 'Demo: addresses are not stored.',
    emailLabel: 'Email address',
    emailPh: 'Your email address',
    subscribe: 'Subscribe (demo)',
    thanks: 'Thank you! This is a demo — no address was stored.',
    rights: 'Demo website — business details and reviews are placeholders.',
    photos: 'Photography from',
  },
  image: {
    fallback: 'Photo unavailable',
  },
};

const dictionaries: Record<Lang, Dict> = { uk, en };

function readStoredLang(): Lang {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === 'en' || v === 'uk' ? v : 'uk';
  } catch {
    return 'uk';
  }
}

interface I18nValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
  /** Picks the current-language string from a localized value. */
  l: (value: Localized) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  // Перший рендер завжди українською — він збігається з попередньо згенерованим HTML.
  // Збережений вибір відновлюємо одразу після гідратації.
  const [lang, setLangState] = useState<Lang>('uk');

  useEffect(() => {
    const stored = readStoredLang();
    if (stored !== 'uk') setLangState(stored);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — the choice simply isn't remembered */
    }
  }, []);

  useEffect(() => {
    const t = dictionaries[lang];
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
  }, [lang]);

  const value = useMemo<I18nValue>(
    () => ({ lang, setLang, t: dictionaries[lang], l: (v) => v[lang] }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
