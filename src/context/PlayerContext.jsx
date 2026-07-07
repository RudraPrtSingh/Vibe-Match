import { createContext, useCallback, useContext, useRef, useState } from "react";

const PlayerContext = createContext(null);

export function PlayerProvider({ songs, children }) {
  const audioRef = useRef(null);
  const [playingId, setPlayingId] = useState(null);
  const [playingSong, setPlayingSong] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [queuedNextId, setQueuedNextId] = useState(null);
  const [volume, setVolumeState] = useState(70);

  const playSong = useCallback((song) => {
    const audio = audioRef.current;
    if (!audio || !song.preview_url) return;
    audio.pause();
    audio.src = song.preview_url;
    audio.currentTime = 0;
    setPlayingId(song.id);
    setPlayingSong(song);
    audio.play();
  }, []);

  const togglePlay = useCallback(
    (song) => {
      const audio = audioRef.current;
      if (!audio) return;
      if (playingId === song.id) {
        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
        }
      } else {
        playSong(song);
      }
    },
    [playingId, playSong]
  );

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || playingId == null) return;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [playingId]);

  const seekTo = useCallback((time) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
  }, []);

  const setVolume = useCallback((v) => {
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v / 100;
  }, []);

  const handlePlay = useCallback(() => setIsPaused(false), []);
  const handlePause = useCallback(() => setIsPaused(true), []);

  const handleEnded = useCallback(() => {
    setPlayingId(null);
    setPlayingSong(null);
    setQueuedNextId((currentQueuedId) => {
      const nextSong = currentQueuedId != null ? songs.find((s) => s.id === currentQueuedId) : null;
      if (nextSong) playSong(nextSong);
      return null;
    });
  }, [songs, playSong]);

  const value = {
    audioRef,
    playingId,
    playingSong,
    isPaused,
    queuedNextId,
    setQueuedNextId,
    volume,
    playSong,
    togglePlay,
    togglePlayPause,
    seekTo,
    setVolume,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio ref={audioRef} preload="none" onPlay={handlePlay} onPause={handlePause} onEnded={handleEnded} />
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within a PlayerProvider");
  return ctx;
}
