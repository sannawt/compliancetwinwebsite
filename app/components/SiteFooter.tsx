export function SiteFooter() {
  return (
    <footer id="contact" className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 md:items-start">
          <div className="text-sm font-semibold">ComplianceTwin</div>

          <div id="team" className="flex flex-col gap-2 text-sm">
            <div className="font-semibold text-black/75">Team</div>
            <div className="flex flex-col gap-2 text-black/70">
              <a
                className="font-semibold underline hover:text-black"
                href="https://www.linkedin.com/in/sannawongtoropainen/"
                target="_blank"
                rel="noreferrer"
              >
                Sanna Toropainen
              </a>
              <a
                className="font-semibold underline hover:text-black"
                href="https://www.linkedin.com/in/dennywong/"
                target="_blank"
                rel="noreferrer"
              >
                Denny Wong
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-sm text-black/70">
            <div className="font-semibold text-black/75">Contact</div>
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

          <div className="flex flex-col gap-3">
            <a
              className="ct-btn-secondary w-fit"
              href="https://calendly.com/sanna-toropainen/compliancetwin-demo-call"
              target="_blank"
              rel="noreferrer"
            >
              Book demo
            </a>
          </div>
        </div>

        <div className="mt-8 text-xs text-black/55">
          © {new Date().getFullYear()} ComplianceTwin. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
