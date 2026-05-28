export function SiteFooter() {
  return (
    <footer id="contact" className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="text-sm font-semibold">ComplianceTwin</div>

          <div className="flex flex-col gap-2 text-sm text-black/70 md:flex-row md:items-center md:gap-6">
            <a className="underline" href="mailto:hello@compliancetwin.co">
              hello@compliancetwin.co
            </a>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <a className="underline" href="tel:+358413122219">
                +358413122219
              </a>
              <a className="underline" href="tel:+16504427281">
                +16504427281
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:flex-row md:items-center md:gap-4">
            <a
              className="ct-btn-secondary"
              href="https://calendly.com/sanna-toropainen/compliancetwin-demo-call"
              target="_blank"
              rel="noreferrer"
            >
              Book 15min demo
            </a>
            <div className="text-xs text-black/55">
              © {new Date().getFullYear()} ComplianceTwin
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

