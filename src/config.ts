import { images } from './data/images'

// Replace the placeholder values below with the couple's real details before launch.
export const WEDDING_CONFIG = {
  coupleNames: 'René & Alex',
  weddingDate: new Date('2026-09-12T16:00:00'),
  venueName: 'Maison de Provence',
  venueLocation: 'Stellenbosch, Western Cape',
  venueTagline: 'A century-old estate set among olive groves and vines.',

  milestones: [
    {
      id: '1',
      date: 'Summer 2021',
      title: 'The first meeting',
      description:
        'A serendipitous encounter at a small bookshop on a rainy afternoon — neither of us was looking, and both of us found something.',
    },
    {
      id: '2',
      date: 'Autumn 2021',
      title: 'A quiet beginning',
      description:
        'Long walks, late dinners, the easy kind of conversation that makes time disappear. Two months in, we knew this was different.',
    },
    {
      id: '3',
      date: 'Spring 2024',
      title: 'A question on the coast',
      description:
        'A weekend in Hermanus, a ring tucked into a coat pocket, and a question that had been waiting three years to be asked.',
    },
    {
      id: '4',
      date: 'Today',
      title: 'And now, the day',
      description:
        "We're so glad you'll be there to share it with us — surrounded by the people who shaped the story so far.",
    },
  ],

  events: [
    {
      type: 'ceremony' as const,
      time: '4:00 PM',
      venue: 'The Chapel Lawn',
      address: 'Maison de Provence, Helshoogte Rd, Stellenbosch',
      mapsUrl: 'https://maps.google.com/?q=Stellenbosch',
    },
    {
      type: 'reception' as const,
      time: '6:30 PM',
      venue: 'The Olive Terrace',
      address: 'Maison de Provence, Helshoogte Rd, Stellenbosch',
      mapsUrl: 'https://maps.google.com/?q=Stellenbosch',
    },
  ],

  dressCode: {
    style: 'Garden Formal',
    description:
      'We hope you’ll lean into the palette of the day — earth tones, sage, soft creams, and warm neutrals.',
    columns: [
      {
        label: 'For Him',
        style:
          'A tailored suit or blazer in olive, taupe, stone, or warm grey. Tie optional. Smart shoes — the ceremony is on grass.',
      },
      {
        label: 'For Her',
        style:
          'A long or midi dress, a tailored jumpsuit, or elegant separates. Block heels or flats recommended for the lawn.',
      },
    ] as const,
    palette: ['#3D4A2A', '#7A8A5A', '#C4B59C', '#EFE9D9', '#A89578'] as const,
    avoid: 'Kindly avoid pure white, ivory, and stark black.',
  },

  gallery: [
    { id: '1', src: images.gallery[0], alt: 'Couple at the altar, soft afternoon light' },
    { id: '2', src: images.gallery[1], alt: 'Walking through the vines together' },
    { id: '3', src: images.gallery[2], alt: 'Olive branch detail' },
    { id: '4', src: images.gallery[3], alt: 'Wedding rings on linen' },
    { id: '5', src: images.gallery[4], alt: 'Candid portrait in the garden' },
    { id: '6', src: images.gallery[5], alt: 'Long table dinner under string lights' },
  ],

  rsvpDeadline: 'Friday, 1st August 2026',

  // Optional: set these once you have an EmailJS account.
  // While unset, the form runs in demo mode and just shows the success state.
  emailjs: {
    serviceId: '',
    templateId: '',
    publicKey: '',
  },

  registryUrl: '#',
} as const

export const images_ = images
