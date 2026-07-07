export const DIMENSIONS = [
  { key: "energy", label: "Energy", min: 0, max: 100, lowLabel: "Chill", highLabel: "Intense", format: (v) => Math.round(v) },
  { key: "valence", label: "Mood", min: 0, max: 100, lowLabel: "Melancholy", highLabel: "Euphoric", format: (v) => Math.round(v) },
  { key: "danceability", label: "Danceability", min: 0, max: 100, lowLabel: "Sit still", highLabel: "Move", format: (v) => Math.round(v) },
  { key: "acousticness", label: "Texture", min: 0, max: 100, lowLabel: "Electronic", highLabel: "Acoustic", format: (v) => Math.round(v) },
  { key: "tempo", label: "Tempo", min: 60, max: 200, lowLabel: "Slow", highLabel: "Fast", format: (v) => `${Math.round(v)} BPM` },
];

export const PRESETS = [
  { name: "Rainy Day", vibe: { energy: 20, valence: 15, danceability: 20, acousticness: 70, tempo: 70 } },
  { name: "Study / Focus", vibe: { energy: 30, valence: 45, danceability: 25, acousticness: 55, tempo: 80 } },
  { name: "Workout Hype", vibe: { energy: 90, valence: 75, danceability: 85, acousticness: 5, tempo: 150 } },
  { name: "Heartbreak", vibe: { energy: 25, valence: 12, danceability: 20, acousticness: 55, tempo: 75 } },
  { name: "Party Night", vibe: { energy: 85, valence: 85, danceability: 88, acousticness: 8, tempo: 118 } },
  { name: "Golden Hour Drive", vibe: { energy: 60, valence: 70, danceability: 60, acousticness: 20, tempo: 105 } },
];

export const GENRE_BUCKETS = [
  { name: "Pop", test: (g) => /pop/i.test(g) && !/synth|k-pop|dance-pop|punk/i.test(g) },
  { name: "Rock", test: (g) => /rock/i.test(g) && !/punk|folk|indie|garage/i.test(g) },
  { name: "Hip-Hop / R&B", test: (g) => /hip-hop|r&b/i.test(g) },
  { name: "Electronic", test: (g) => /edm|synth|house|disco|electronic/i.test(g) },
  { name: "Folk / Acoustic", test: (g) => /folk|acoustic/i.test(g) },
  { name: "Classical / Jazz", test: (g) => /classical|jazz|piano|bossa/i.test(g) },
  { name: "Metal / Punk", test: (g) => /metal|punk|emo/i.test(g) },
  { name: "Indie / Alt", test: (g) => /indie|alt|garage|bedroom/i.test(g) },
  { name: "World / Latin", test: (g) => /latin|reggae|k-pop|salsa/i.test(g) },
];

export function categorize(genre) {
  const bucket = GENRE_BUCKETS.find((b) => b.test(genre));
  return bucket ? bucket.name : "Other";
}

export function normalize(value, min, max) {
  return ((value - min) / (max - min)) * 100;
}

export function matchScore(userVibe, song) {
  let sumSq = 0;
  for (const dim of DIMENSIONS) {
    const u = normalize(userVibe[dim.key], dim.min, dim.max);
    const s = normalize(song[dim.key], dim.min, dim.max);
    sumSq += (u - s) ** 2;
  }
  const dist = Math.sqrt(sumSq);
  const maxDist = Math.sqrt(DIMENSIONS.length * 100 ** 2);
  return Math.round((1 - dist / maxDist) * 100);
}
