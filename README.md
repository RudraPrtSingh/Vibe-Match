# Vibe Match

**Dial in a feeling. Get songs that match it.**

Vibe Match is an interactive music discovery tool that recommends songs based on your current mood. Adjust sliders for energy, mood, danceability, texture, and tempo — and instantly see the top tracks that match your vibe.

**[Live Demo](https://RudraPrtSingh.github.io/Vibe-Match)**

---

## Features

- **Vibe Sliders** — Fine-tune 5 audio dimensions: Energy, Mood, Danceability, Texture, and Tempo.
- **Smart Matching** — Euclidean distance algorithm scores every song against your vibe in real time.
- **Mood Presets** — One-click presets including Rainy Day, Workout Hype, Heartbreak, Party Night, and more.
- **Surprise Me** — Randomize all sliders to discover unexpected matches.
- **Genre Filters** — Narrow results by Pop, Rock, Hip-Hop, Electronic, Classical, and other genre buckets.
- **Compare Panel** — Inspect how a song's attributes align with your current vibe settings.
- **Built-in Player** — Preview tracks directly in the app with auto-queue to the next best match.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| UI Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Vanilla CSS (custom design system) |
| Deployment | GitHub Pages via gh-pages |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm

### Installation

```bash
git clone https://github.com/RudraPrtSingh/Vibe-Match.git
cd Vibe-Match
npm install
npm run dev
```

The development server starts at `http://localhost:5173`.

### Build and Deploy

```bash
# Production build
npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

## How the Matching Algorithm Works

Each song in the dataset carries normalized audio feature values:

| Dimension | Range | Low | High |
|-----------|-------|-----|------|
| Energy | 0 – 100 | Chill | Intense |
| Mood (Valence) | 0 – 100 | Melancholy | Euphoric |
| Danceability | 0 – 100 | Sit still | Move |
| Texture (Acousticness) | 0 – 100 | Electronic | Acoustic |
| Tempo | 60 – 200 BPM | Slow | Fast |

The algorithm normalizes all slider values and song attributes into a common scale, computes the **Euclidean distance** across the 5-dimensional feature space, and converts the result into a **0–100 match score**. A shorter distance yields a higher score.

---

## Project Structure

```
Vibe-Match/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles.css
    ├── components/
    │   ├── ComparePanel.jsx
    │   ├── GenreFilter.jsx
    │   ├── Icons.jsx
    │   ├── PlayerBar.jsx
    │   ├── PresetRow.jsx
    │   ├── SongCard.jsx
    │   ├── SongList.jsx
    │   └── VibeControls.jsx
    ├── context/
    │   └── PlayerContext.jsx
    ├── data/
    │   └── songs.json
    └── lib/
        └── matching.js
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built by [Rudra Pratap Singh](https://github.com/RudraPrtSingh)
