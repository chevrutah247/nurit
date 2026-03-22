import type { Route } from 'next';

export type NavItem = {
  href: Route;
  label: string;
};

export const siteConfig = {
  name: "Russian Junior N'shei Chabad",
  organization: "Russian Junior N'shei Chabad",
  siteUrl: 'https://www.rjnsheichabad.com',
  description:
    "A warm community for Russian-speaking Jewish women. Gatherings, holiday celebrations, learning programs, and mutual support in Brooklyn, NY.",
  navigation: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/team', label: 'Team' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/partners', label: 'Partners' },
    { href: '/sponsors', label: 'Sponsors' },
    { href: '/donate', label: 'Donate' },
    { href: '/contact', label: 'Contact' },
    { href: '/register', label: 'Register' },
  ] satisfies NavItem[],
};

export const services = [
  'Community gatherings and farbrengens',
  'Annual grand celebration',
  'Torah learning programs',
  'Volunteer support and outreach',
];

export const homeHighlights = [
  {
    title: 'Simple registration',
    description:
      'A clear registration path with large fields and one visible main button.',
  },
  {
    title: 'Comfortable reading',
    description:
      'Large type, warm contrast, and calm spacing help visitors use the site with ease.',
  },
  {
    title: 'Community trust',
    description:
      'Clear navigation, real people, and organized information make the website feel reliable.',
  },
];

export const galleryMoments = [
  "Annual women's gathering",
  'Holiday inspiration evenings',
  'Community support moments',
  'Celebrations and shared memories',
];

export const teamMembers = [
  {
    id: '001',
    name: 'Nurit Sarytchev',
    nameRu: 'Нурит Сарычева',
    roleKey: 'lead',
    image: '/001.jpg',
    bio: 'Director of Russian Junior N\'shei Chabad — the organization of Russian-speaking Jewish women of Chabad',
    bioRu: 'Директор еврейской организации русскоговорящих женщин Хабада Russian Junior N\'shei Chabad',
  },
  {
    id: '002',
    name: 'Malky Shkolnik',
    nameRu: 'Малки Школьник',
    roleKey: 'member',
    image: '/003.jpg',
    bio: 'Halacha lecturer. Co-organizer of Mami Meals Layoldes — home meal delivery for new mothers and the sick',
    bioRu: 'Лектор по Галахе. Со-организатор Мами Милс Лайоледес — организация по доставке еды на дом роженицам и больным',
  },
  {
    id: '003',
    name: 'Rivka Sidorov',
    nameRu: 'Ривка Сидоров',
    roleKey: 'member',
    image: '/004.jpg',
    bio: 'Lecturer on Rambam "Sefer HaMitzvos"',
    bioRu: 'Лектор по Рамбаму «Сефер Гамицвойс»',
  },
  {
    id: '004',
    name: 'Leah Levin',
    nameRu: 'Лея Левин',
    roleKey: 'member',
    image: '/002.jpg',
    bio: 'Lecturer on the history of Jews behind the Iron Curtain. Shadchan. Certified lecturer on Taharas HaMishpacha (Family Purity)',
    bioRu: 'Лектор по истории евреев за железным занавесом. Шадхан. Сертифицированный лектор по чистоте еврейской семьи «Тагарас Мишпоха»',
  },
  {
    id: '005',
    name: 'Miriam Ilyayev',
    nameRu: 'Мирьям Ильяев',
    roleKey: 'member',
    image: '/005.jpg',
    bio: 'Co-organizer of Mami Meals Layoldes — home meal delivery for new mothers and the sick',
    bioRu: 'Со-организатор Мами Милс Лайоледес — организация по доставке еды на дом роженицам и больным',
  },
  {
    id: '006',
    name: 'Clara Landsman',
    nameRu: 'Клара Ландсман',
    roleKey: 'member',
    image: '/006.png',
    bio: 'Music director. Founder of the material assistance fund',
    bioRu: 'Музыкальный руководитель. Основатель фонда материальной помощи',
  },
  {
    id: '007',
    name: 'Liel Kuravsky',
    nameRu: 'Лиель Куравски',
    roleKey: 'member',
    image: '/008.png',
    bio: 'Certified lecturer on Taharas HaMishpacha (Family Purity)',
    bioRu: 'Сертифицированный лектор по чистоте еврейской семьи «Тагарас Мишпоха»',
  },
  {
    id: '008',
    name: 'Leah Goldshtein',
    nameRu: 'Лея Гольдштейн',
    roleKey: 'member',
    image: '/1-1-3.jpg',
    bio: 'Lecturer on Pirkei Avos (Ethics of the Fathers)',
    bioRu: 'Лектор по поучениям отцов «Пиркей Овос»',
  },
  {
    id: '009',
    name: 'Chana Komarovsky',
    nameRu: 'Хана Комаровский',
    roleKey: 'member',
    image: '/009.jpg',
    bio: 'Farbrengen designer',
    bioRu: 'Дизайнер фарбренгена',
  },
];
