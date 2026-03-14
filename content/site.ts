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
    { href: '/annual-event', label: 'Annual Event' },
    { href: '/gallery', label: 'Gallery' },
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

export const galleryMoments = [
  "Annual women's gathering",
  'Holiday inspiration evenings',
  'Community support moments',
  'Celebrations and shared memories',
];

export const teamMembers = [
  {
    id: '001',
    name: 'Nurit Sarycheva',
    role: 'Head and organizer of the organization',
    image: '/001.jpg',
  },
  {
    id: '002',
    name: 'Leya Yekhilov',
    role: 'Team member',
    image: '/002.jpg',
  },
  {
    id: '003',
    name: 'Malki Shkolnik',
    role: 'Team member',
    image: '/003.jpg',
  },
  {
    id: '004',
    name: 'Rivka Sidorov',
    role: 'Team member',
    image: '/004.jpg',
  },
  {
    id: '005',
    name: 'Miryam Ilyaev',
    role: 'Team member',
    image: '/005.jpg',
  },
];
