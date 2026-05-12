// PLACEHOLDER — replace all values before launch
export const WEDDING_CONFIG = {
  coupleNames: 'René & Alex',
  weddingDate: new Date('2026-09-12T16:00:00'),
  venueName: 'The Grand Estate',
  milestones: [
    { id: '1', icon: 'heart' as const, date: 'Summer 2021', title: 'How We Met', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { id: '2', icon: 'star' as const, date: 'Autumn 2021', title: 'Our First Date', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
    { id: '3', icon: 'ring' as const, date: 'Spring 2024', title: 'The Proposal', description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
    { id: '4', icon: 'calendar' as const, date: 'Present Day', title: 'Planning Our Day', description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
  ],
  events: [
    { type: 'ceremony' as const, time: '4:00 PM', venue: 'The Grand Estate Chapel', address: '123 Garden Lane, City, ST 00000', mapsUrl: 'https://maps.google.com' },
    { type: 'reception' as const, time: '6:00 PM', venue: 'The Grand Estate Ballroom', address: '123 Garden Lane, City, ST 00000', mapsUrl: 'https://maps.google.com' },
  ],
  dressCode: {
    style: 'Garden Formal',
    columns: [
      { label: 'Him', style: 'A tailored suit or blazer in earth tones. Tie optional. Please avoid casual wear.', iconSvg: '' },
      { label: 'Her', style: 'A cocktail dress, elegant jumpsuit, or formal separates. Garden-friendly footwear recommended.', iconSvg: '' },
    ] as [{ label: string; style: string; iconSvg: string }, { label: string; style: string; iconSvg: string }],
  },
  gallery: [
    { id: '1', alt: 'René and Alex — photo placeholder', caption: 'A moment to remember' },
    { id: '2', alt: 'René and Alex — photo placeholder', caption: 'Together always' },
    { id: '3', alt: 'René and Alex — photo placeholder', caption: 'Our favourite place' },
    { id: '4', alt: 'René and Alex — photo placeholder', caption: 'The beginning of forever' },
    { id: '5', alt: 'René and Alex — photo placeholder', caption: 'Love in every frame' },
    { id: '6', alt: 'René and Alex — photo placeholder', caption: 'Just the two of us' },
  ],
  emailjs: {
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY',
  },
  registryUrl: '#',
} as const
