// Central catalog: genres, moods, instruments + demo tracks.
// Demo audio URLs are public sample files so the player works end-to-end
// before the AI backend is live. They get replaced by generated audio.

export const GENRES = [
  'Lo-fi', 'Hip-Hop', 'EDM', 'Progressive House', 'Pop', 'Rock',
  'Classical', 'Jazz', 'Afrobeat', 'Indian', 'Cinematic', 'Ambient',
];

export const MOODS = [
  'Energetic', 'Chill', 'Melancholic', 'Euphoric', 'Dark', 'Romantic', 'Epic', 'Groovy',
];

export const INSTRUMENTS = [
  'Synth', 'Piano', 'Bass', 'Drums', 'Guitar', 'Strings', 'Flute', 'Sitar', 'Pads', 'Vocals',
];

const SAMPLE = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-';

export const MOCK_TRACKS = [
  {
    id: 't-night-drive', title: 'Night Drive', genre: 'Progressive House',
    mood: 'Energetic', bpm: 128, duration: 60, likes: 214, plays: 1830,
    creator: 'abhijeet', isPublic: true, favorite: true, createdAt: '2026-09-20',
    prompt: 'Futuristic night-drive track with a powerful drop and atmospheric intro.',
    audioUrl: `${SAMPLE}1.mp3`, seed: 11,
  },
  {
    id: 't-lofi-rain', title: 'Lo-fi Rain', genre: 'Lo-fi',
    mood: 'Chill', bpm: 74, duration: 45, likes: 186, plays: 2410,
    creator: 'meera.wav', isPublic: true, favorite: true, createdAt: '2026-09-18',
    prompt: 'Rainy window study beats, dusty piano and soft vinyl crackle.',
    audioUrl: `${SAMPLE}2.mp3`, seed: 27,
  },
  {
    id: 't-afro-house', title: 'Lagos Nights', genre: 'Afrobeat',
    mood: 'Groovy', bpm: 112, duration: 60, likes: 158, plays: 1204,
    creator: 'dj_tunde', isPublic: true, favorite: false, createdAt: '2026-09-15',
    prompt: 'Afrobeat groove with log drums, shakers and warm brass stabs.',
    audioUrl: `${SAMPLE}3.mp3`, seed: 42,
  },
  {
    id: 't-cinematic', title: 'Cinematic Intro', genre: 'Cinematic',
    mood: 'Epic', bpm: 90, duration: 30, likes: 97, plays: 860,
    creator: 'abhijeet', isPublic: false, favorite: false, createdAt: '2026-09-12',
    prompt: 'Short epic trailer intro, taiko hits and rising strings.',
    audioUrl: `${SAMPLE}4.mp3`, seed: 63,
  },
  {
    id: 't-raga-dawn', title: 'Raga Dawn', genre: 'Indian',
    mood: 'Melancholic', bpm: 80, duration: 60, likes: 143, plays: 975,
    creator: 'meera.wav', isPublic: true, favorite: false, createdAt: '2026-09-10',
    prompt: 'Morning raga on sitar with tanpura drone and soft tabla.',
    audioUrl: `${SAMPLE}5.mp3`, seed: 88,
  },
  {
    id: 't-neon-sakura', title: 'Neon Sakura', genre: 'Ambient',
    mood: 'Romantic', bpm: 70, duration: 45, likes: 121, plays: 1102,
    creator: 'kenji_loops', isPublic: true, favorite: false, createdAt: '2026-09-08',
    prompt: 'Ambient koto pads floating over city-night field recordings.',
    audioUrl: `${SAMPLE}6.mp3`, seed: 104,
  },
];

export const PRICING_TIERS = [
  {
    name: 'Starter', credits: 100, price: 'Free',
    blurb: 'Try the studio. Enough for your first 5 tracks.',
    features: ['5 AI generations', 'MP3 downloads', 'Public sharing', 'Community discovery'],
  },
  {
    name: 'Creator', credits: 600, price: '₹499',
    blurb: 'For YouTubers and editors shipping every week.',
    features: ['30 AI generations', 'Prompt enhancement', 'Remix Studio access', 'Priority queue', 'WAV downloads'],
    highlight: true,
  },
  {
    name: 'Studio', credits: 2000, price: '₹1,499',
    blurb: 'For producers and teams with serious output.',
    features: ['100 AI generations', 'Everything in Creator', 'Commercial license', 'Stems download (soon)', 'Team seats (soon)'],
  },
];
