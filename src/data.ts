// Увесь вміст сайту — демонстраційний, для вигаданої кав’ярні.
import type { Localized } from './i18n';

const unsplash = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=72`;

export interface Picture {
  src: string;
  srcSet: string;
}

/** Responsive Unsplash image: a default src plus a width-based srcset. */
const pic = (id: string, widths = [400, 800, 1200]): Picture => ({
  src: unsplash(id, widths[1] ?? widths[0]),
  srcSet: widths.map((w) => `${unsplash(id, w)} ${w}w`).join(', '),
});

/**
 * Головне фото героя зберігається локально (public/images), тож не залежить від CDN.
 * Якщо воно не завантажиться — пробуємо інше фото з Unsplash, далі — намальований капучино.
 */
export const heroPhoto = {
  src: '/images/hero-cappuccino-760.webp',
  srcSet: '/images/hero-cappuccino-560.webp 560w, /images/hero-cappuccino-760.webp 760w, /images/hero-cappuccino-1200.webp 1200w',
  fallbacks: [
    '/images/hero-cappuccino-760.jpg',
    'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=900&h=1125&q=72',
  ],
};

export const images = {
  storyMain: pic('1453614512568-c4024d13c247', [500, 900, 1300]),
  storyDetail: pic('1497935586351-b67a49e012bf', [300, 600]),
};

export type Category = 'espresso' | 'filter' | 'cold' | 'signature' | 'pastry';

export const categories: { id: Category | 'all'; label: Localized }[] = [
  { id: 'all', label: { uk: 'Усе', en: 'All' } },
  { id: 'espresso', label: { uk: 'Еспресо', en: 'Espresso' } },
  { id: 'filter', label: { uk: 'Фільтр', en: 'Filter' } },
  { id: 'cold', label: { uk: 'Холодні', en: 'Cold' } },
  { id: 'signature', label: { uk: 'Авторські', en: 'Signature' } },
  { id: 'pastry', label: { uk: 'Випічка', en: 'Pastry' } },
];

export interface MenuItem {
  id: string;
  name: Localized;
  description: Localized;
  price: number;
  /** Volume in ml for drinks, weight in g for pastry. */
  amount: number;
  unit: 'ml' | 'g';
  category: Category;
  tag?: Localized;
  image: Picture;
}

const menuPic = (id: string) => pic(id, [360, 480, 640, 900]);

export const menu: MenuItem[] = [
  {
    id: 'espresso',
    name: { uk: 'Еспресо', en: 'Espresso' },
    description: { uk: 'Сезонний бленд закладу з нотами шоколаду та червоних ягід.', en: 'Seasonal house blend with notes of chocolate and red berries.' },
    price: 65, amount: 30, unit: 'ml', category: 'espresso',
    image: menuPic('1510707577719-ae7c14805e3a'),
  },
  {
    id: 'americano',
    name: { uk: 'Американо', en: 'Americano' },
    description: { uk: 'Подвійний шот, подовжений гарячою фільтрованою водою.', en: 'A double shot lengthened with hot filtered water.' },
    price: 75, amount: 250, unit: 'ml', category: 'espresso',
    image: menuPic('1551030173-122aabc4489c'),
  },
  {
    id: 'cortado',
    name: { uk: 'Кортадо', en: 'Cortado' },
    description: { uk: 'Еспресо і шовковисте спінене молоко порівну.', en: 'Equal parts espresso and silky steamed milk.' },
    price: 85, amount: 120, unit: 'ml', category: 'espresso',
    image: menuPic('1514066558159-fc8c737ef259'),
  },
  {
    id: 'flat-white',
    name: { uk: 'Флет вайт', en: 'Flat White' },
    description: { uk: 'Подвійне рістрето під тонкою оксамитовою мікропінкою.', en: 'Double ristretto under a thin layer of velvet microfoam.' },
    price: 95, amount: 180, unit: 'ml', category: 'espresso',
    tag: { uk: 'Хіт продажів', en: 'Bestseller' },
    image: menuPic('1497636577773-f1231844b336'),
  },
  {
    id: 'cappuccino',
    name: { uk: 'Капучино', en: 'Cappuccino' },
    description: { uk: 'Класичний баланс еспресо, молока та пінки.', en: 'The classic balance of espresso, milk and foam.' },
    price: 90, amount: 250, unit: 'ml', category: 'espresso',
    image: menuPic('1506372023823-741c83b836fe'),
  },
  {
    id: 'latte',
    name: { uk: 'Лате', en: 'Latte' },
    description: { uk: 'М’який і вершковий, на будь-якому молоці.', en: 'Mellow and creamy, made with any milk you like.' },
    price: 95, amount: 350, unit: 'ml', category: 'espresso',
    image: menuPic('1495774856032-8b90bbb32b32'),
  },
  {
    id: 'v60',
    name: { uk: 'Пуровер V60', en: 'V60 Pour Over' },
    description: { uk: 'Моносорт, який заварюємо вручну під замовлення.', en: 'A single origin, hand-poured to order.' },
    price: 120, amount: 300, unit: 'ml', category: 'filter',
    tag: { uk: 'Зерно змінюється', en: 'Rotating origin' },
    image: menuPic('1545665225-b23b99e4d45e'),
  },
  {
    id: 'chemex',
    name: { uk: 'Кемекс на двох', en: 'Chemex for Two' },
    description: { uk: 'Чистий, яскравий смак — саме для того, щоб поділитися.', en: 'Clean and bright — made for sharing.' },
    price: 190, amount: 600, unit: 'ml', category: 'filter',
    image: menuPic('1504627298434-2119d6928e93'),
  },
  {
    id: 'batch-brew',
    name: { uk: 'Батч-брю', en: 'Batch Brew' },
    description: { uk: 'Фільтр-кава дня, готова за кілька секунд.', en: 'Today’s filter coffee, ready in seconds.' },
    price: 70, amount: 300, unit: 'ml', category: 'filter',
    image: menuPic('1497515114629-f71d768fd07c'),
  },
  {
    id: 'cold-brew-cream',
    name: { uk: 'Колд брю з вершками', en: 'Cold Brew with Cream' },
    description: { uk: 'Настоюємо 18 годин і доливаємо холодні вершки просто перед подачею.', en: 'Steeped for 18 hours and topped with cold cream right before serving.' },
    price: 110, amount: 350, unit: 'ml', category: 'cold',
    image: menuPic('1592663527359-cf6642f54cff'),
  },
  {
    id: 'espresso-tonic',
    name: { uk: 'Еспресо-тонік', en: 'Espresso Tonic' },
    description: { uk: 'Подвійний шот на тоніку з льодом і апельсиновою цедрою.', en: 'A double shot over tonic and ice with orange zest.' },
    price: 115, amount: 300, unit: 'ml', category: 'cold',
    tag: { uk: 'Вибір літа', en: 'Summer pick' },
    image: menuPic('1517959105821-eaf2591984ca'),
  },
  {
    id: 'iced-latte',
    name: { uk: 'Айс-лате', en: 'Iced Latte' },
    description: { uk: 'Еспресо, холодне молоко й багато льоду.', en: 'Espresso, cold milk and plenty of ice.' },
    price: 105, amount: 400, unit: 'ml', category: 'cold',
    image: menuPic('1527156231393-7023794f363c'),
  },
  {
    id: 'lavender-raf',
    name: { uk: 'Лавандовий раф', en: 'Lavender Raf' },
    description: { uk: 'Вершки, еспресо та домашній лавандовий сироп.', en: 'Cream, espresso and house-made lavender syrup.' },
    price: 130, amount: 300, unit: 'ml', category: 'signature',
    tag: { uk: 'Улюбленець гостей', en: 'Guest favourite' },
    image: menuPic('1595434091143-b375ced5fe5c'),
  },
  {
    id: 'honey-latte',
    name: { uk: 'Лате з медом і корицею', en: 'Honey Cinnamon Latte' },
    description: { uk: 'Мед із польових квітів, цейлонська кориця, вівсяне молоко.', en: 'Wildflower honey, Ceylon cinnamon and oat milk.' },
    price: 125, amount: 350, unit: 'ml', category: 'signature',
    image: menuPic('1534687941688-651ccaafbff8'),
  },
  {
    id: 'caramel-cortado',
    name: { uk: 'Кортадо із солоною карамеллю', en: 'Salted Caramel Cortado' },
    description: { uk: 'Карамель повільного уварювання і дрібка морської солі.', en: 'Slow-cooked caramel and a pinch of sea salt.' },
    price: 115, amount: 150, unit: 'ml', category: 'signature',
    image: menuPic('1525480122447-64809d765ec4'),
  },
  {
    id: 'croissant',
    name: { uk: 'Вершковий круасан', en: 'Butter Croissant' },
    description: { uk: 'Листкове тісто власного виробництва, випікаємо щоранку.', en: 'Laminated in-house and baked every morning.' },
    price: 85, amount: 80, unit: 'g', category: 'pastry',
    image: menuPic('1555507036-ab1f4038808a'),
  },
  {
    id: 'cinnamon-roll',
    name: { uk: 'Булочка з корицею', en: 'Cinnamon Roll' },
    description: { uk: 'Здобне тісто, вершкове масло й цейлонська кориця.', en: 'Enriched dough, butter and Ceylon cinnamon.' },
    price: 90, amount: 110, unit: 'g', category: 'pastry',
    image: menuPic('1509365465985-25d11c17e812'),
  },
  {
    id: 'cheesecake',
    name: { uk: 'Чізкейк Нью-Йорк', en: 'New York Cheesecake' },
    description: { uk: 'Ніжний вершковий сир на пісочній основі зі свіжими ягодами.', en: 'Silky cream cheese on a buttery crust with fresh berries.' },
    price: 145, amount: 150, unit: 'g', category: 'pastry',
    image: menuPic('1524351199678-941a58a3df50'),
  },
];

export interface Featured {
  name: Localized;
  note: Localized;
  price: number;
  image: Picture;
}

const featuredPic = (id: string) => pic(id, [400, 700, 1000]);

export const featured: Featured[] = [
  {
    name: { uk: 'Флет вайт від Studio', en: 'Studio Flat White' },
    note: { uk: 'Оксамитова мікропінка на подвійному рістрето з нашого сезонного бленду.', en: 'Velvet microfoam over a double ristretto of our seasonal blend.' },
    price: 95, image: featuredPic('1541167760496-1628856ab772'),
  },
  {
    name: { uk: 'Неспішний пуровер', en: 'Slow Pour Over' },
    note: { uk: 'Моносорт, що змінюється з сезоном, — заварюємо вручну просто біля бару.', en: 'A rotating single origin, brewed by hand at the bar.' },
    price: 120, image: featuredPic('1442512595331-e89e73853f31'),
  },
  {
    name: { uk: 'Мармуровий айс-лате', en: 'Marble Iced Latte' },
    note: { uk: 'Холодне молоко, а еспресо — наостанок, для ідеального візерунка.', en: 'Cold milk first, espresso poured last for the perfect swirl.' },
    price: 105, image: featuredPic('1517701604599-bb29b565090c'),
  },
  {
    name: { uk: 'Колд брю з льодом', en: 'Cold Brew on Ice' },
    note: { uk: 'Настоюємо вісімнадцять годин і додаємо краплю вершків.', en: 'Steeped for eighteen hours, finished with a splash of cream.' },
    price: 105, image: featuredPic('1461023058943-07fcbe16d735'),
  },
];

export interface GalleryImage {
  image: Picture;
  large: string;
  alt: Localized;
  span?: 'tall' | 'wide';
}

const galleryPic = (id: string, span?: 'tall' | 'wide') => ({
  image: pic(id, span === 'wide' ? [600, 1000, 1400] : [400, 700, 1000]),
  large: unsplash(id, 1800),
  span,
});

export const gallery: GalleryImage[] = [
  { ...galleryPic('1501339847302-ac426a4a7cbb', 'tall'), alt: { uk: 'Світна вивіска кав’ярні та підвісні лампи над баром', en: 'Glowing café sign and pendant lamps above a coffee bar' } },
  { ...galleryPic('1511920170033-f8396924c348'), alt: { uk: 'Холдери з кавовими зернами, меленою кавою та лате', en: 'Portafilters with whole beans, ground coffee and a latte' } },
  { ...galleryPic('1554118811-1e0d58224f24', 'wide'), alt: { uk: 'Світлий інтер’єр кав’ярні з рослинами та ротанговими кріслами', en: 'Bright café interior with plants and rattan chairs' } },
  { ...galleryPic('1572442388796-11668a67e53d'), alt: { uk: 'Латте-арт «розетта», вигляд згори', en: 'Rosetta latte art seen from above' } },
  { ...galleryPic('1498804103079-a6351b050096', 'tall'), alt: { uk: 'Коло з кавових чашок на круглому дерев’яному столі', en: 'A circle of coffee cups on a round wooden table' } },
  { ...galleryPic('1447933601403-0c6688de566e'), alt: { uk: 'Свіжообсмажені кавові зерна крупним планом', en: 'Close-up of freshly roasted coffee beans' } },
  { ...galleryPic('1509042239860-f550ce710b93'), alt: { uk: 'Чашки з латте-артом серед зелених рослин', en: 'Latte art cups among green plants' } },
  { ...galleryPic('1495474472287-4d71bcdd2085', 'wide'), alt: { uk: 'Друзі цокаються чашками кави', en: 'Friends toasting with coffee cups' } },
];

export interface Review {
  quote: Localized;
  name: Localized;
  rating: number;
}

// Відгуки-заглушки — не від реальних клієнтів.
export const reviews: Review[] = [
  {
    quote: {
      uk: 'Флет вайт — саме такий, як я хочу щоранку: збалансований, шовковистий і зовсім не гіркий. А в залі достатньо тихо, щоб справді почитати.',
      en: 'The flat white is exactly what I hope for every morning — balanced, silky and never bitter. The room is calm enough to actually read.',
    },
    name: { uk: 'Гість-приклад А', en: 'Sample Guest A' },
    rating: 5,
  },
  {
    quote: {
      uk: 'Чудове меню пуроверів — нове зерно кожні кілька тижнів. Бариста розповідають про кожне без зайвого пафосу.',
      en: 'Lovely pour-over menu with a new origin every few weeks. The baristas explain each one without being fussy about it.',
    },
    name: { uk: 'Гість-приклад Б', en: 'Sample Guest B' },
    rating: 5,
  },
  {
    quote: {
      uk: 'Булочка з корицею і кортадо — тепер мій вихідний ритуал. Тепле світло, гарна музика, просторі столи.',
      en: 'A cinnamon roll and a cortado is now my weekend ritual. Warm light, good music, generous tables.',
    },
    name: { uk: 'Гість-приклад В', en: 'Sample Guest C' },
    rating: 4,
  },
];

export const reviewDetail: Localized = { uk: 'Демовідгук', en: 'Demo review' };

export const hours: { days: Localized; time: string }[] = [
  { days: { uk: 'Понеділок – п’ятниця', en: 'Monday – Friday' }, time: '07:30 – 21:00' },
  { days: { uk: 'Субота', en: 'Saturday' }, time: '08:30 – 22:00' },
  { days: { uk: 'Неділя', en: 'Sunday' }, time: '09:00 – 20:00' },
];

export const formatUAH = (value: number) => `${value} ₴`;
