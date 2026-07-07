import { useEffect, useRef, useState } from "react";
import { usePlayer } from "../context/PlayerContext.jsx";
import { IconPlay, IconPause } from "./Icons.jsx";

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function PlayerBar({ queuedNextSong }) {
  const { audioRef, playingSong, isPaused, togglePlayPause, seekTo, volume, setVolume } = usePlayer();

  // currentTime/duration live here, not in App state — timeupdate fires many
  // times a second, and lifting it higher would re-render the vibe sliders
  // on every tick. Keeping it local scopes the churn to just this bar.
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const seekingRef = useRef(false);

  // Reset the displayed progress the instant the playing song changes, so the
  // bar never flashes the previous track's position/duration while the new
  // audio is still loading (the source of the old "slider glitch").
  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    seekingRef.current = false;
  }, [playingSong?.id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (seekingRef.current) return;
      setCurrentTime(audio.currentTime);
    };
    const onDuration = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onDuration);
    audio.addEventListener("durationchange", onDuration);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onDuration);
      audio.removeEventListener("durationchange", onDuration);
    };
  }, [audioRef]);

  if (!playingSong) return null;

  const progressValue = duration ? (currentTime / duration) * 1000 : 0;

  const handleSeekInput = (e) => {
    seekingRef.current = true;
    if (duration) {
      setCurrentTime((Number(e.target.value) / 1000) * duration);
    }
  };

  const commitSeek = (e) => {
    if (duration) {
      seekTo((Number(e.target.value) / 1000) * duration);
    }
    seekingRef.current = false;
  };

  return (
    <div className="player-bar">
      <div className="player-info">
        {playingSong.artwork_url && <img className="player-artwork" src={playingSong.artwork_url} alt="" />}
        <div className="player-text">
          <div className="player-title">{playingSong.title}</div>
          <div className="player-artist">{playingSong.artist}</div>
          {queuedNextSong && (
            <div className="player-upnext">
              Up next: <strong>{queuedNextSong.title}</strong> — {queuedNextSong.artist}
            </div>
          )}
        </div>
      </div>

      <div className="player-transport">
        <button className="player-toggle-btn" type="button" onClick={togglePlayPause} aria-label={isPaused ? "Play" : "Pause"}>
          {isPaused ? <IconPlay /> : <IconPause />}
        </button>
        <span className="player-time">{formatTime(currentTime)}</span>
        <input
          type="range"
          className="player-progress"
          min="0"
          max="1000"
          value={progressValue}
          onChange={handleSeekInput}
          onMouseUp={commitSeek}
          onTouchEnd={commitSeek}
          onKeyUp={commitSeek}
          aria-label="Seek"
        />
        <span className="player-time">{formatTime(duration)}</span>
      </div>

      <div className="player-volume">
        <span className="player-volume-icon">Vol</span>
        <input
          type="range"
          className="player-volume-slider"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          aria-label="Volume"
        />
      </div>
    </div>
  );
}
