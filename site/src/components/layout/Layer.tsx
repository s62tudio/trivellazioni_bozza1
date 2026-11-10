/**
 * Strato generico per le pagine interne: stessi colori e stesse onde
 * della homepage, scelti per "profondità" (0 = superficie, 6 = nucleo).
 */
export const layerColors = ["#eef1ef", "#ddd2bd", "#c5b69b", "#6f624b", "#3a342c", "#26231f", "#141618"] as const;
export type Level = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const isDark = (level: Level) => level >= 3;

export function Layer({
  level,
  prev,
  id,
  label,
  children,
  className = "",
  innerClassName = "",
}: {
  level: Level;
  /** livello dello strato precedente: disegna l'onda di raccordo */
  prev?: Level;
  id?: string;
  label?: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      style={{ backgroundColor: layerColors[level] }}
      className={`relative overflow-x-clip ${isDark(level) ? "text-white" : "text-ink"} ${className}`}
    >
      {prev !== undefined && (
        <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute -top-px left-0 h-10 w-full sm:h-16" style={{ color: layerColors[prev] }}>
          <path
            fill="currentColor"
            d={
              level % 2
                ? "M0 0H1440V30C1240 70 1080 10 860 40C640 70 470 18 260 46C150 60 70 52 0 40Z"
                : "M0 0H1440V44C1280 20 1120 66 900 38C690 12 520 64 300 34C170 18 80 30 0 50Z"
            }
          />
        </svg>
      )}
      <div className={`mx-auto max-w-[1300px] px-5 sm:px-10 ${prev !== undefined ? "pt-28 sm:pt-36" : "pt-20"} pb-24 sm:pb-32 ${innerClassName}`}>{children}</div>
    </section>
  );
}
