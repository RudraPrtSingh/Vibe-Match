import { memo } from "react";
import { DIMENSIONS } from "../lib/matching.js";

function VibeControls({ vibe, onChange, onSurprise }) {
  return (
    <section className="panel controls" aria-label="Vibe controls">
      <div className="controls-head">
        <span className="panel-label">Your vibe</span>
        <button className="ghost-btn" type="button" onClick={onSurprise}>
          Surprise me
        </button>
      </div>

      {DIMENSIONS.map((dim) => (
        <div className="slider-row" key={dim.key}>
          <div className="slider-top">
            <label htmlFor={dim.key}>{dim.label}</label>
            <span className="slider-value">{dim.format(vibe[dim.key])}</span>
          </div>
          <input
            type="range"
            id={dim.key}
            min={dim.min}
            max={dim.max}
            value={vibe[dim.key]}
            onChange={(e) => onChange(dim.key, Number(e.target.value))}
          />
          <div className="slider-ends">
            <span>{dim.lowLabel}</span>
            <span>{dim.highLabel}</span>
          </div>
        </div>
      ))}
    </section>
  );
}

export default memo(VibeControls);
