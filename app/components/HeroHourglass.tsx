const FRAME_COUNT = 12;

export function HeroHourglass() {
  return (
    <div
      className="ct-hourglassHero shrink-0"
      tabIndex={0}
      role="img"
      aria-label="Hourglass with falling sand"
    >
      <div className="ct-hourglassViewport">
        <div
          className="ct-hourglass ct-hourglassFilmstrip"
          data-frames={FRAME_COUNT}
          aria-hidden
        />
      </div>
    </div>
  );
}
