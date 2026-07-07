export default function PresetRow({ presets, onSelect }) {
  return (
    <section className="panel presets" aria-label="Vibe presets">
      <span className="panel-label">Quick vibes</span>
      <div className="preset-row">
        {presets.map((preset) => (
          <button key={preset.name} className="chip" type="button" onClick={() => onSelect(preset)}>
            {preset.name}
          </button>
        ))}
      </div>
    </section>
  );
}
