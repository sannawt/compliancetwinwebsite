import { QaPlayground } from "../components/QaPlayground";

export default function QaPage() {
  return (
    <div className="ct-wallpaper">
      <main className="mx-auto w-full max-w-6xl px-4 py-10">
        <section className="win-panel overflow-hidden">
          <div className="win-titlebar flex items-center justify-between px-4 py-2">
            <div className="text-sm font-semibold tracking-tight">QA</div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-[3px] bg-white/80" />
              <div className="h-3 w-3 rounded-[3px] bg-white/55" />
              <div className="h-3 w-3 rounded-[3px] bg-white/35" />
            </div>
          </div>
          <div className="p-6">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-semibold tracking-tight">
                A playful rules + AI preview
              </h1>
              <p className="mt-2 text-sm leading-6 text-black/70">
                This is a small test environment for people to interact with
                structured rules and see an auditable, explainable style of
                output.
              </p>
            </div>
            <div className="mt-6">
              <QaPlayground />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

