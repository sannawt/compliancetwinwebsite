import { QaPlayground } from "./components/QaPlayground";

export default function Home() {
  const features = [
    {
      title: "Instant applicability scan",
      description:
        "Provide your product specifications and get an instant record on applicable EU–US regulations with authoritative sources and an auditable reasoning trace.",
      imageSrc: "/features/feature-instant-scan.svg",
      imageAlt: "Instant applicability scan illustration",
    },
    {
      title: "Keep a live monitoring record",
      description:
        "Monitor regulatory updates with a structured legal database connected to logic representations of EU–US regulations and supporting evidence.",
      imageSrc: "/features/feature-live-monitoring.svg",
      imageAlt: "Live monitoring record illustration",
      badge: "Case study: EU AI Act + Omnibus",
    },
    {
      title: "Turn records into workflows",
      description:
        "Turn the record into actionable workflows for obligation mapping and evidence gathering to support your product compliance.",
      imageSrc: "/features/feature-workflows.svg",
      imageAlt: "Actionable workflows illustration",
    },
  ] as const;

  return (
    <div id="home" className="ct-wallpaper">
      <main className="mx-auto w-full max-w-6xl px-4 py-10">
        <section className="win-panel overflow-hidden">
          <div className="win-titlebar flex items-center justify-between px-4 py-2">
            <div className="text-sm font-semibold tracking-tight">
              ComplianceTwin.exe
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-[3px] bg-white/80" />
              <div className="h-3 w-3 rounded-[3px] bg-white/55" />
              <div className="h-3 w-3 rounded-[3px] bg-white/35" />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 p-6">
            {/* Left pane */}
            <div className="col-span-12 flex flex-col justify-center gap-5 md:col-span-6">
              <div className="flex items-start gap-4">
                <div className="win-icon mt-1">
                  {/* Rotating hourglass (old-school) */}
                  <img
                    src="/hero/hourglass.png"
                    alt="Hourglass"
                    width={34}
                    height={34}
                    className="ct-hourglass"
                  />
                </div>
                <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                  Wait, which laws apply to my product?
                </h1>
              </div>
              <p className="max-w-xl text-lg leading-7 text-black/75">
                Don’t wait. Get your answer in seconds.
              </p>

              <div className="mt-2 flex flex-wrap gap-3">
                <a href="/qa" className="win-nav-btn">
                  Try the QA playground
                </a>
                <a href="#features" className="win-nav-btn">
                  See features
                </a>
              </div>

              <div className="mt-4 rounded-md border border-black/10 bg-[color:var(--ct-sand-100)]/70 p-4 text-sm text-black/70">
                Desktop layout is optimized first: split hero left/right, Windows
                feel, sand + pixels.
              </div>
            </div>

            {/* Right pane placeholder (feature cards come next todo) */}
            <div className="col-span-12 md:col-span-6">
              <div className="grid grid-cols-1 gap-3">
                {features.map((f) => (
                  <div key={f.title} className="win-panel overflow-hidden">
                    <div className="flex items-start gap-3 p-4">
                      <div className="shrink-0 overflow-hidden rounded-md border border-black/10 bg-white/50">
                        <img
                          src={f.imageSrc}
                          alt={f.imageAlt}
                          width={84}
                          height={84}
                          className="h-[84px] w-[84px]"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="text-sm font-semibold">
                            {f.title}
                          </div>
                          {"badge" in f && f.badge ? (
                            <span className="rounded-md border border-black/10 bg-[color:var(--ct-sand-100)] px-2 py-0.5 text-[11px] font-semibold text-black/70">
                              {f.badge}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm leading-6 text-black/75">
                          {f.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto mt-10 w-full max-w-6xl">
          <div className="win-panel p-6">
            <div className="text-lg font-semibold">Features</div>
            <div className="mt-1 text-sm text-black/70">
              Three capabilities that turn regulations into an auditable,
              actionable compliance record.
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
              {features.map((f) => (
                <div key={`bottom-${f.title}`} className="win-panel p-4">
                  <div className="flex items-center gap-3">
                    <div className="overflow-hidden rounded-md border border-black/10 bg-white/50">
                      <img
                        src={f.imageSrc}
                        alt={f.imageAlt}
                        width={64}
                        height={64}
                        className="h-16 w-16"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold">{f.title}</div>
                      {"badge" in f && f.badge ? (
                        <div className="mt-1 text-[11px] font-semibold text-black/60">
                          {f.badge}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-black/75">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="team" className="mx-auto mt-10 w-full max-w-6xl">
          <div className="win-panel p-6">
            <div className="text-lg font-semibold">Team</div>
            <div className="mt-1 text-sm text-black/70">
              Placeholder for team content.
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto mt-10 w-full max-w-6xl pb-10">
          <div className="win-panel p-6">
            <div className="text-lg font-semibold">Contact</div>
            <div className="mt-1 text-sm text-black/70">
              Email: hello@compliancetwin.co
            </div>
          </div>
        </section>

        <section id="qa" className="mx-auto mt-10 w-full max-w-6xl pb-10">
          <QaPlayground compact />
        </section>
      </main>
    </div>
  );
}
