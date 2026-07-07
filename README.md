# 🎵 Vibe Match

> **Dial in a feeling. Get songs that match it.**

Vibe Match is an interactive music discovery tool that recommends songs based on your current mood. Adjust sliders for energy, mood, danceability, texture, and tempo — and instantly see the top tracks that match your vibe.

🔗 **[Try it live →](https://RudraPrtSingh.github.io/Vibe-Match)**

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎛️ **Vibe Sliders** | Fine-tune 5 dimensions — Energy, Mood, Danceability, Texture & Tempo |
| 🎯 **Smart Matching** | Euclidean distance algorithm scores every song against your vibe |
| 🎭 **Mood Presets** | One-click presets like *Rainy Day*, *Workout Hype*, *Heartbreak* & more |
| 🎲 **Surprise Me** | Random vibe generator for unexpected discoveries |
| 🏷️ **Genre Filters** | Filter by Pop, Rock, Hip-Hop, Electronic, Classical, and more |
| 📊 **Compare Panel** | See how a song's attributes stack up against your vibe settings |
| 🎧 **Built-in Player** | Preview tracks with auto-queue to the next best match |

---

## 🛠️ Tech Stack

- **React 18** — Component-based UI
- **Vite 5** — Lightning-fast dev server & build tool
- **Vanilla CSS** — Custom design system with glassmorphism & micro-animations
- **gh-pages** — Automated GitHub Pages deployment

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/RudraPrtSingh/Vibe-Match.git
cd Vibe-Match

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be running at `http://localhost:5173`.

### Build & Deploy

```bash
# Production build
npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

## 🎼 How the Matching Works

Each song in the dataset has audio feature values for:

| Dimension | Range | Low ← → High |
|-----------|-------|---------------|
| Energy | 0 – 100 | Chill → Intense |
| Mood (Valence) | 0 – 100 | Melancholy → Euphoric |
| Danceability | 0 – 100 | Sit still → Move |
| Texture (Acousticness) | 0 – 100 | Electronic → Acoustic |
| Tempo | 60 – 200 BPM | Slow → Fast |

The app normalizes your slider values and each song's attributes, computes the **Euclidean distance** in 5D space, and converts it to a **0–100 match score**. The closer the song is to your vibe, the higher the score.

---

## 📁 Project Structure

```
Vibe-Match/
├── index.html              # Entry HTML
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite configuration
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Main app component
    ├── styles.css          # Global styles & design system
    ├── components/
    │   ├── ComparePanel.jsx    # Song vs. vibe comparison
    │   ├── GenreFilter.jsx     # Genre filter chips
    │   ├── Icons.jsx           # SVG icon components
    │   ├── PlayerBar.jsx       # Audio player bar
    │   ├── PresetRow.jsx       # Mood preset buttons
    │   ├── SongCard.jsx        # Individual song card
    │   ├── SongList.jsx        # Ranked song grid
    │   └── VibeControls.jsx    # Slider controls
    ├── context/
    │   └── PlayerContext.jsx   # Audio playback state
    ├── data/
    │   └── songs.json          # Song dataset with audio features
    └── lib/
        └── matching.js         # Scoring algorithm & presets
```

---

## 🤝 Contributing

1. Fork the repo
2. Create your branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ and 🎵 by <a href="https://github.com/RudraPrtSingh">Rudra Pratap Singh</a>
</p>
