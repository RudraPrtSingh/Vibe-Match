import { DIMENSIONS, normalize } from "../lib/matching.js";

export default function ComparePanel({ song, vibe, showTable, onToggleTable, onClose }) {
  return (
    <section className="panel compare-panel" aria-label="Vibe comparison">
      <div className="compare-head">
        <div>
          <span className="panel-label">Vibe comparison</span>
          <h3>
            {song.title} — {song.artist}
          </h3>
        </div>
        <div className="compare-actions">
          <button className="ghost-btn" type="button" onClick={onToggleTable}>
            {showTable ? "View as chart" : "View as table"}
          </button>
          <button className="ghost-btn" type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      {!showTable ? (
        <div className="viz-root">
          <div className="compare-legend">
            <span className="legend-item">
              <span className="legend-swatch you"></span>Your vibe
            </span>
            <span className="legend-item">
              <span className="legend-swatch song"></span>Song
            </span>
          </div>
          <div className="compare-rows">
            {DIMENSIONS.map((dim) => {
              const youPct = normalize(vibe[dim.key], dim.min, dim.max);
              const songPct = normalize(song[dim.key], dim.min, dim.max);
              const left = Math.min(youPct, songPct);
              const width = Math.abs(youPct - songPct);
              return (
                <div className="compare-row" key={dim.key}>
                  <div className="compare-row-label">{dim.label}</div>
                  <div className="compare-track">
                    <div className="compare-baseline"></div>
                    <div className="compare-connector" style={{ left: `${left}%`, width: `${width}%` }}></div>
                    <div
                      className="compare-dot you"
                      style={{ left: `${youPct}%` }}
                      title={`Your vibe: ${dim.format(vibe[dim.key])}`}
                    ></div>
                    <div
                      className="compare-dot song"
                      style={{ left: `${songPct}%` }}
                      title={`${song.title}: ${dim.format(song[dim.key])}`}
                    ></div>
                  </div>
                  <div className="compare-values">
                    {dim.format(vibe[dim.key])} · {dim.format(song[dim.key])}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <table className="compare-table">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Your vibe</th>
              <th>Song</th>
            </tr>
          </thead>
          <tbody>
            {DIMENSIONS.map((dim) => (
              <tr key={dim.key}>
                <td>{dim.label}</td>
                <td>{dim.format(vibe[dim.key])}</td>
                <td>{dim.format(song[dim.key])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
