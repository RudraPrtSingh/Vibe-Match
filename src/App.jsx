import { useCallback, useEffect, useMemo, useState } from "react";
import songsData from "./data/songs.json";
import { PRESETS, categorize, matchScore } from "./lib/matching.js";
import { PlayerProvider, usePlayer } from "./context/PlayerContext.jsx";
import PresetRow from "./components/PresetRow.jsx";
import VibeControls from "./components/VibeControls.jsx";
import GenreFilter from "./components/GenreFilter.jsx";
import SongList from "./components/SongList.jsx";
import ComparePanel from "./components/ComparePanel.jsx";
import PlayerBar from "./components/PlayerBar.jsx";

const DEFAULT_VIBE = { energy: 50, valence: 50, danceability: 50, acousticness: 50, tempo: 120 };

const GENRE_BUCKETS_LIST = Array.from(new Set(songsData.map((s) => categorize(s.genre))));

function AppInner() {
  const [vibe, setVibe] = useState(DEFAULT_VIBE);
  const [activeGenres, setActiveGenres] = useState(() => new Set());
  const [selectedSongId, setSelectedSongId] = useState(null);
  const [showTable, setShowTable] = useState(false);

  const { playingId, playingSong, queuedNextId, setQueuedNextId } = usePlayer();

  const setVibeKey = useCallback((key, value) => {
    setVibe((prev) => ({ ...prev, [key]: value }));
  }, []);

  const applyPreset = useCallback((preset) => {
    setVibe((prev) => ({ ...prev, ...preset.vibe }));
  }, []);

  const surpriseMe = useCallback(() => {
    setVibe({
      energy: Math.round(Math.random() * 100),
      valence: Math.round(Math.random() * 100),
      danceability: Math.round(Math.random() * 100),
      acousticness: Math.round(Math.random() * 100),
      tempo: Math.round(60 + Math.random() * 140),
    });
  }, []);

  const toggleGenre = useCallback((bucket) => {
    setActiveGenres((prev) => {
      const next = new Set(prev);
      if (next.has(bucket)) {
        next.delete(bucket);
      } else {
        next.add(bucket);
      }
      return next;
    });
  }, []);

  const clearGenres = useCallback(() => setActiveGenres(new Set()), []);

  const filtered = useMemo(() => {
    if (activeGenres.size === 0) return songsData;
    return songsData.filter((song) => activeGenres.has(categorize(song.genre)));
  }, [activeGenres]);

  const ranked = useMemo(() => {
    return filtered
      .map((song) => ({ song, score: matchScore(vibe, song) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [filtered, vibe]);

  // Keep the auto-advance queue pointed at the current top match whenever the
  // vibe (and therefore the ranking) changes, without touching the song that
  // is already playing.
  useEffect(() => {
    if (playingId == null) {
      setQueuedNextId(null);
      return;
    }
    const next = ranked.find((r) => r.song.id !== playingId && r.song.preview_url);
    setQueuedNextId(next ? next.song.id : null);
  }, [ranked, playingId, setQueuedNextId]);

  const queuedNextSong = useMemo(
    () => (queuedNextId != null ? songsData.find((s) => s.id === queuedNextId) : null),
    [queuedNextId]
  );

  const selectedSong = useMemo(
    () => (selectedSongId != null ? songsData.find((s) => s.id === selectedSongId) : null),
    [selectedSongId]
  );

  return (
    <div className={`app${playingSong ? " has-player" : ""}`}>
      <header className="app-header">
        <h1>Vibe Match</h1>
        <p className="subtitle">Dial in a feeling. Get songs that match it.</p>
      </header>

      <PresetRow presets={PRESETS} onSelect={applyPreset} />
      <VibeControls vibe={vibe} onChange={setVibeKey} onSurprise={surpriseMe} />
      <GenreFilter buckets={GENRE_BUCKETS_LIST} activeGenres={activeGenres} onToggle={toggleGenre} onClear={clearGenres} />

      <section className="panel results" aria-label="Matching songs">
        <div className="results-head">
          <span className="panel-label">Top matches</span>
          <span className="results-count">
            {ranked.length} of {filtered.length}
          </span>
        </div>
        <SongList ranked={ranked} selectedSongId={selectedSongId} onCompare={setSelectedSongId} />
      </section>

      {selectedSong && (
        <ComparePanel
          song={selectedSong}
          vibe={vibe}
          showTable={showTable}
          onToggleTable={() => setShowTable((v) => !v)}
          onClose={() => setSelectedSongId(null)}
        />
      )}

      <PlayerBar queuedNextSong={queuedNextSong} />
    </div>
  );
}

export default function App() {
  return (
    <PlayerProvider songs={songsData}>
      <AppInner />
    </PlayerProvider>
  );
}
