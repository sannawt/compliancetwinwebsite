export default function Home() {
  return (
    <div id="home" className="ct-wallpaper">
      <main className="mx-auto w-full max-w-6xl px-4 py-28 md:py-36">
        <section aria-label="Hero">
          <div className="flex flex-col items-start gap-10 md:flex-row md:items-center md:gap-14">
            <img
              src="/hero/hourglass.png"
              alt="Hourglass"
              width={160}
              height={160}
              className="ct-hourglass ct-hourglassHero"
            />
            <div className="max-w-3xl">
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
                  Book 15min demo
                </a>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Features" className="mt-24 md:mt-28">
          <div className="flex flex-col gap-14">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
              <img
                src="/features/instant-applicability.png"
                alt="Instant applicability analysis screenshot"
                className="h-[220px] w-full object-cover md:h-[240px] md:w-[380px]"
              />
              <div className="max-w-2xl">
                <div className="text-xl font-semibold tracking-tight md:text-2xl">
                  Instant applicability analysis
                </div>
                <p className="mt-3 text-base leading-7 text-black/65 md:text-lg md:leading-8">
                  Upload your product specifications and get instant record on
                  what EU and US technology laws apply to your product.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
              <img
                src="/features/feature-live-monitoring.svg"
                alt="Live monitoring record illustration"
                className="h-[220px] w-full object-cover md:h-[240px] md:w-[380px]"
              />
              <div className="max-w-2xl">
                <div className="text-xl font-semibold tracking-tight md:text-2xl">
                  Live monitoring record
                </div>
                <p className="mt-3 text-base leading-7 text-black/65 md:text-lg md:leading-8">
                  Keep a live record for monitoring regulatory updates with the
                  help of a structured legal database connected to logic
                  representations of EU–US regulations and supporting evidence.
                </p>
                <div className="mt-3 text-xs font-semibold text-black/55">
                  Case study: EU AI Act + Omnibus
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
              <img
                src="/features/feature-workflows.svg"
                alt="Actionable workflows illustration"
                className="h-[220px] w-full object-cover md:h-[240px] md:w-[380px]"
              />
              <div className="max-w-2xl">
                <div className="text-xl font-semibold tracking-tight md:text-2xl">
                  Actionable workflows
                </div>
                <p className="mt-3 text-base leading-7 text-black/65 md:text-lg md:leading-8">
                  Turn the record into actionable workflows for obligation
                  mapping and evidence gathering to support your product
                  compliance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="team" aria-label="Team" className="mt-24 md:mt-32">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Team
            </h2>
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
              <a
                className="text-base font-semibold text-black/80 underline"
                href="https://www.linkedin.com/in/sannawongtoropainen/"
                target="_blank"
                rel="noreferrer"
              >
                Sanna Toropainen
              </a>
              <a
                className="text-base font-semibold text-black/80 underline"
                href="https://www.linkedin.com/in/dennywong/"
                target="_blank"
                rel="noreferrer"
              >
                Denny Wong
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
