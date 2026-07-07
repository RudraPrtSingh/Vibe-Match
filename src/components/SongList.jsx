import SongCard from "./SongCard.jsx";

export default function SongList({ ranked, selectedSongId, onCompare }) {
  if (ranked.length === 0) {
    return <div className="empty-state">No songs match this filter. Try clearing a genre.</div>;
  }

  return (
    <div className="song-list">
      {ranked.map(({ song, score }) => (
        <SongCard key={song.id} song={song} score={score} isSelected={song.id === selectedSongId} onCompare={onCompare} />
      ))}
    </div>
  );
}
