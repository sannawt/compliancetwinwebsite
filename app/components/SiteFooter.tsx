export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-[color:var(--ct-sand-200)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="win-panel p-5">
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="font-semibold">ComplianceTwin</div>
              <div className="text-black/70">
                Incorporated in Palo Alto and Helsinki
              </div>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-black/80">
              <div>
                <span className="font-semibold">Email:</span>{" "}
                <a className="underline" href="mailto:hello@compliancetwin.co">
                  hello@compliancetwin.co
                </a>
              </div>
              <div>
                <span className="font-semibold">Phone:</span>{" "}
                <a className="underline" href="tel:+15551234567">
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
            <div className="text-xs text-black/60">
              © {new Date().getFullYear()} ComplianceTwin. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

