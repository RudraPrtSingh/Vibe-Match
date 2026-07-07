export default function GenreFilter({ buckets, activeGenres, onToggle, onClear }) {
  return (
    <section className="panel genre-filter" aria-label="Genre filter">
      <span className="panel-label">Genres</span>
      <div className="chip-row">
        <button className={`chip${activeGenres.size === 0 ? " active" : ""}`} type="button" onClick={onClear}>
          All
        </button>
        {buckets.map((bucket) => (
          <button
            key={bucket}
            className={`chip${activeGenres.has(bucket) ? " active" : ""}`}
            type="button"
            onClick={() => onToggle(bucket)}
          >
            {bucket}
          </button>
        ))}
      </div>
    </section>
  );
}
