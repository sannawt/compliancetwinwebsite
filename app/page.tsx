import { HeroHourglass } from "./components/HeroHourglass";

export default function Home() {
  return (
    <div id="home" className="ct-wallpaper">
      <main className="mx-auto w-full max-w-6xl px-4 py-28 md:py-36">
        <section aria-label="Hero">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-start md:gap-10 lg:gap-12">
            <HeroHourglass />
            <div className="max-w-3xl md:pt-6 md:pl-10 lg:pl-14 lg:pt-10">
              <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
                Wait, which laws apply to my product?
              </h1>
              <p className="mt-5 text-xl leading-8 text-black/65 md:text-2xl md:leading-9">
                Don&apos;t wait. Get your answer in seconds.
              </p>
              <div className="mt-7">
                <a
                  className="ct-btn-primary"
                  href="https://calendly.com/sanna-toropainen/compliancetwin-demo-call"
                  target="_blank"
                  rel="noreferrer"
                >
                  Book demo
                </a>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Features" className="mt-24 md:mt-28">
          <div className="mb-12 max-w-3xl md:mb-16">
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              ComplianceTwin is a live compliance graph for AI and tech
              products.
            </h2>
            <p className="mt-4 text-base leading-7 text-black/65 md:text-lg md:leading-8">
              Map EU and US regulations to your product, monitor what changes,
              and turn obligations into evidence — in one connected record.
            </p>
          </div>
          <div className="flex flex-col gap-14">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
              <img
                src="/features/instant-applicability.png"
                alt="Instant applicability analysis screenshot"
                className="w-full shrink-0 rounded-2xl border border-black/10 bg-white object-cover shadow-[0_18px_55px_rgba(0,0,0,0.08)] md:w-[460px] md:aspect-video"
              />
              <div className="max-w-2xl">
                <div className="text-xl font-semibold tracking-tight md:text-2xl">
                  Instant applicability analysis
                </div>
                <p className="mt-3 text-base leading-7 text-black/65 md:text-lg md:leading-8">
                  See which EU and US laws apply to your product — instantly.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
              <img
                src="/features/live-monitoring.png"
                alt="Live monitoring record screenshot"
                className="w-full shrink-0 rounded-2xl border border-black/10 bg-white object-cover shadow-[0_18px_55px_rgba(0,0,0,0.08)] md:w-[460px] md:aspect-video"
              />
              <div className="max-w-2xl">
                <div className="text-xl font-semibold tracking-tight md:text-2xl">
                  Live monitoring record
                </div>
                <p className="mt-3 text-base leading-7 text-black/65 md:text-lg md:leading-8">
                  Track regulatory updates and see exactly what changed for
                  your product.
                </p>
                <div className="mt-3 text-xs font-semibold text-black/55">
                  Case study: EU AI Act + Omnibus
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
              <img
                src="/features/workflows.png"
                alt="Actionable workflows screenshot"
                className="w-full shrink-0 rounded-2xl border border-black/10 bg-white object-cover shadow-[0_18px_55px_rgba(0,0,0,0.08)] md:w-[460px] md:aspect-video"
              />
              <div className="max-w-2xl">
                <div className="text-xl font-semibold tracking-tight md:text-2xl">
                  Actionable workflows
                </div>
                <p className="mt-3 text-base leading-7 text-black/65 md:text-lg md:leading-8">
                  Turn obligations into clear tasks and audit-ready evidence.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
