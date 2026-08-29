import { images } from './data/images'

// One source of truth for the venue, so the hero, event cards, footer and RSVP
// stamp can never drift apart.
const VENUE_ADDRESS = 'Bramon Wine Estate, Plettenberg Bay'
const VENUE_MAPS_URL = 'https://maps.google.com/?q=Bramon+Wine+Estate+Plettenberg+Bay'

export const WEDDING_CONFIG = {
  // Alexander first, then René. Everything downstream (hero, footer, monogram)
  // splits on the '&', so this is the only place the order is set.
  coupleNames: 'Alexander & René',
  weddingDate: new Date('2027-01-16T15:30:00'),
  venueName: 'Bramon Wine Estate',
  venueLocation: 'Plettenberg Bay, South Africa',
  venueTagline: 'A summer celebration on a Plettenberg Bay wine farm.',
  venueMapsUrl: VENUE_MAPS_URL,

  events: [
    {
      type: 'ceremony' as const,
      time: '3:30 PM',
      arrivalTime: '3:00 PM',
      venue: 'Ceremony — On the lawn',
      address: VENUE_ADDRESS,
      mapsUrl: VENUE_MAPS_URL,
    },
    {
      type: 'reception' as const,
      venue: 'Reception — In the cellar',
      address: VENUE_ADDRESS,
      mapsUrl: VENUE_MAPS_URL,
    },
  ],

  dressCode: {
    style: 'Italian summer wine farm — elegant and warm.',
    columns: [
      {
        label: 'For Him',
        image: images.mensDressCode,
        imageAlt:
          'Illustrated looks for him — linen and lightweight suits in cream, stone, sage and dusty blue',
        style:
          "Think Italian summer wine farm. Lean into an elegant summer look with light tailoring and warm, earthy tones — linen or lightweight suits, breathable fabrics, tailored separates. Soft neutrals, sage or olive greens, stone, dusty blue, slate, light grey, navy, cream. Muted vineyard-inspired shades encouraged. Ties are welcome but not required.",
      },
      {
        label: 'For Her',
        image: images.womensDressCode,
        imageAlt:
          'Illustrated looks for her — long and mid-length dresses in a range of colours',
        style:
          "We'd love to see you dress up with us. We're aiming for a formal feel, so long or mid-length dresses and elegant eveningwear are welcome but not required. Dressy, formal looks are perfect too. A gentle ask — stay away from stilettos, the ceremony is on grass.",
      },
    ] as const,
    avoid: 'Kindly avoid pure white and ivory.',
  },

  // Alt text must stay in step with images.gallery — see the ordering note there.
  gallery: [
    { id: '1', src: images.gallery[0], alt: 'Her hand resting on his shoulder, engagement ring in frame' },
    { id: '2', src: images.gallery[1], alt: 'The proposal — down on one knee on the beach at dusk' },
    { id: '3', src: images.gallery[2], alt: 'A kiss on the forehead in the dunes' },
    { id: '4', src: images.gallery[3], alt: 'Kissing on the shore, hair caught in the wind' },
    { id: '5', src: images.gallery[4], alt: 'Hands held together, the new engagement ring close up' },
    { id: '6', src: images.gallery[5], alt: 'Running down to the sea hand in hand' },
  ],

  rsvpDeadline: 'Monday, 30th November 2026',

  // Banking / honeymoon-fund details. Stored as discrete fragments so the page
  // can assemble them at render time instead of shipping a scrape-friendly
  // string in the HTML. See HoneymoonFundSection for the reveal pattern.
  honeymoonFund: {
    bank: 'FNB',
    accountHolder: 'Rene Pienaar',
    // Split into three groups; concatenated in the browser at click time.
    accountNumberParts: ['6290', '5529', '098'] as const,
    branchCode: '250655',
    accountType: 'FNBy Next Transact',
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
      a: 'Both — the ceremony is outdoors on the lawn at Bramon, and the reception moves indoors to the cellar.',
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
      a: 'Guest arrival is from 3:00 PM. The ceremony begins at 3:30 PM sharp.',
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
  //   {{full_name}}, {{guest_email}}, {{attendance}}, {{dinner_choice}},
  //   {{allergies}}, {{plus_one_name}}, {{plus_one_dinner_choice}},
  //   {{plus_one_allergies}}, {{dietary_notes}}, {{message}}
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
