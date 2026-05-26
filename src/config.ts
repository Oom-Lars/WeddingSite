import { images } from './data/images'

// Replace the placeholder values below with the couple's real details before launch.
export const WEDDING_CONFIG = {
  coupleNames: 'René & Alex',
  weddingDate: new Date('2026-12-12T16:00:00'),
  venueName: 'The Venue',
  venueLocation: 'Plettenberg Bay, South Africa',
  venueTagline: 'A coastal celebration on the Garden Route.',

  events: [
    {
      type: 'ceremony' as const,
      time: '4:00 PM',
      arrivalTime: '3:30 PM',
      venue: 'Ceremony — Outdoors',
      address: 'Plettenberg Bay, South Africa',
      mapsUrl: 'https://maps.google.com/?q=Plettenberg+Bay',
    },
    {
      type: 'reception' as const,
      time: 'From 6:00 PM',
      venue: 'Reception — Indoors',
      address: 'Plettenberg Bay, South Africa',
      mapsUrl: 'https://maps.google.com/?q=Plettenberg+Bay',
    },
  ],

  dressCode: {
    style: 'Italian summer wine farm — relaxed, elegant, warm.',
    columns: [
      {
        label: 'For Him',
        style:
          "Think Italian summer wine farm. Lean into an elegant summer look with relaxed tailoring and warm, earthy tones — linen or lightweight suits, breathable fabrics, tailored separates. Soft neutrals, sage or olive greens, stone, dusty blue, slate, light grey, navy, cream. Muted vineyard-inspired shades encouraged. Ties are welcome but not required.",
      },
      {
        label: 'For Her',
        style:
          "We'd love to see you dress up with us. We're aiming for a formal feel, so long or mid-length dresses and elegant eveningwear are welcome but not required. Dressy, formal looks are perfect too. A gentle ask — stay away from stilettos, the ceremony is on grass.",
      },
    ] as const,
    palette: ['#3D4A2A', '#7A8A5A', '#C4B59C', '#EFE9D9', '#A89578'] as const,
    avoid: 'Kindly avoid pure white and ivory.',
  },

  gallery: [
    { id: '1', src: images.gallery[0], alt: 'Couple at the altar, soft afternoon light' },
    { id: '2', src: images.gallery[1], alt: 'Walking through the vines together' },
    { id: '3', src: images.gallery[2], alt: 'Olive branch detail' },
    { id: '4', src: images.gallery[3], alt: 'Wedding rings on linen' },
    { id: '5', src: images.gallery[4], alt: 'Candid portrait in the garden' },
    { id: '6', src: images.gallery[5], alt: 'Long table dinner under string lights' },
  ],

  rsvpDeadline: 'Saturday, 31st October 2026',

  // Banking / honeymoon-fund details. Stored as discrete fragments so the page
  // can assemble them at render time instead of shipping a scrape-friendly
  // string in the HTML. See HoneymoonFundSection for the reveal pattern.
  honeymoonFund: {
    bank: 'FNB',
    accountHolder: 'PLACEHOLDER — couple to fill in',
    // Split into three groups; concatenated in the browser at click time.
    accountNumberParts: ['0000', '0000', '00'] as const,
    branchCode: '250655',
    accountType: 'Cheque',
    // Guests should use this reference so the couple knows who the gift is from.
    // Format: {their surname} honeymoon  (e.g. "Smith honeymoon").
    referenceSuffix: 'honeymoon',
  },

  faqs: [
    {
      q: 'Are kids allowed?',
      a: 'No — this one is for the grown-ups. We hope this gives parents a chance to enjoy the evening.',
    },
    {
      q: 'Will it be indoors or outdoors?',
      a: 'The ceremony will be outdoors. The reception will move indoors.',
    },
    {
      q: 'What weather should we expect?',
      a: 'Peak summer weather — average highs between 25°C and 28°C, and nighttime lows around 17°C.',
    },
    {
      q: 'Can I bring a plus one?',
      a: 'Only if you have been personally invited with one. If your invite was addressed to you alone, please RSVP for one — we love you, the venue just has a count.',
    },
    {
      q: 'Is there parking available?',
      a: 'Yes — there will be an allocated parking area at the venue.',
    },
    {
      q: 'Will it be cash bar or open bar?',
      a: 'Ceremony drinks will be on us. The reception is a cash bar.',
    },
    {
      q: 'Is smoking or vaping allowed?',
      a: 'Please not during the ceremony. Smoking areas will be available later in the evening.',
    },
    {
      q: 'When should I arrive?',
      a: 'Guest arrival is from 3:30 PM. The ceremony begins at 4:00 PM sharp.',
    },
  ] as const,

  // A few of the couple's favourites if you're staying in Plett.
  plettFavourites: {
    eat: [
      {
        name: 'Enrico Ristorante',
        href: 'https://share.google/T6LMRdkgZXfqUFBFu',
      },
      {
        name: 'Surf Cafe',
        href: 'https://share.google/emtpHFCyLhoVt8lFR',
      },
    ],
    do: [
      {
        name: 'Ocean Adventures',
        href: 'https://share.google/ie2NFB42OdSvnZJqV',
      },
      {
        name: 'Robberg Nature Reserve',
        href: 'https://share.google/r1asMVh1xw4zrE8zO',
      },
    ],
  } as const,

  // EmailJS settings. While unset, the form runs in demo mode and just shows
  // the success state. To enable real email sending, sign up at emailjs.com,
  // create a service + template, and paste the IDs here.
  //
  // The template should reference these variables:
  //   {{full_name}}, {{guest_email}}, {{attendance}}, {{plus_one_name}},
  //   {{dinner_choice}}, {{plus_one_dinner_choice}}, {{dietary_notes}}, {{message}}
  //
  // Set `to_email` in the EmailJS template (NOT here) so it cannot be
  // changed from the browser — see RSVPSection for details.
  emailjs: {
    serviceId: 'service_xrru5mw',
    templateId: 'template_ybrxqmg',
    publicKey: '5C86uiTcDIahfk-C0',
    // For dev visibility only — the real recipient is hard-set inside the
    // EmailJS template so the address is not exposed in the bundle.
    recipientDisplay: 'bamitchellwork@gmail.com',
  },
} as const

export const images_ = images
