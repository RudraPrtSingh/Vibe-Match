import { usePlayer } from "../context/PlayerContext.jsx";
import { IconPlay, IconPause } from "./Icons.jsx";

export default function SongCard({ song, score, isSelected, onCompare }) {
  const { playingId, isPaused, togglePlay } = usePlayer();
  const isPlaying = playingId === song.id && !isPaused;
  const hasPreview = Boolean(song.preview_url);

  return (
    <article className={`song-card${isSelected ? " active" : ""}`}>
      <button
        className={`play-btn${isPlaying ? " playing" : ""}`}
        type="button"
        disabled={!hasPreview}
        title={hasPreview ? undefined : "Preview unavailable"}
        onClick={() => togglePlay(song)}
        aria-label={`${isPlaying ? "Pause" : "Play"} ${song.title}`}
      >
        {isPlaying ? <IconPause /> : <IconPlay />}
      </button>

      <div className="song-info">
        <h3>{song.title}</h3>
        <p>
          {song.artist} · <span className="genre-tag">{song.genre}</span>
        </p>
      </div>

      <div className="match-score">
        <div className="match-percent">{Math.max(0, score)}%</div>
        <div className="match-label">vibe match</div>
      </div>

      <button className="compare-btn" type="button" onClick={() => onCompare(song.id)}>
        Compare
      </button>
    </article>
  );
}
