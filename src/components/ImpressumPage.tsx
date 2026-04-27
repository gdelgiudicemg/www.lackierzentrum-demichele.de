const ImpressumPage = () => {
  return (
    <main className="pt-[calc(var(--nav-h,96px)+2rem)] pb-[calc(5rem+2cm)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8">Impressum</h1>

          <div className="space-y-10 text-gray-200">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Angaben gemäß § 5 TMG</h2>
              <div className="text-lg leading-relaxed text-gray-200">
                <p>Lackierzentrum De Michele</p>
                <p>Einzelunternehmen</p>
                <p>Inhaber: Daniele De Michele</p>
                <p>Ludwig-Lutz-Straße 29</p>
                <p>73479 Ellwangen (Jagst)</p>
                <p>Deutschland</p>
              </div>
            </section>

            <div className="h-px bg-white/15" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Kontakt</h2>
              <div className="text-lg leading-relaxed text-gray-200">
                <p>
                  Telefon:{' '}
                  <a
                    href="tel:079619509370"
                    className="text-white hover:text-brand-gold transition-colors"
                  >
                    07961 / 950 9370
                  </a>
                </p>
                <p>
                  E-Mail:{' '}
                  <a
                    href="mailto:info@lackierzentrum-demichele.de"
                    className="text-white hover:text-brand-gold transition-colors"
                  >
                    info@lackierzentrum-demichele.de
                  </a>
                </p>
              </div>
            </section>

            <div className="h-px bg-white/15" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Tätigkeit</h2>
              <p className="text-lg leading-relaxed text-gray-200">
                Fahrzeuglackierung sowie Ausführung von Lackierarbeiten und Behebung von
                Lackschäden im Rahmen des Fahrzeuglackierer-Handwerks.
              </p>
            </section>

            <div className="h-px bg-white/15" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz
              </h2>
              <p className="text-lg leading-relaxed text-gray-200">
                Die Umsatzsteuer-Identifikationsnummer wurde beantragt und wird nach Erteilung
                unverzüglich hier ergänzt.
              </p>
            </section>

            <div className="h-px bg-white/15" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Aufsichtsbehörde</h2>
              <p className="text-lg leading-relaxed text-gray-200">Handwerkskammer Ulm</p>
            </section>

            <div className="h-px bg-white/15" />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                Verbraucherstreitbeilegung / Universalschlichtungsstelle
              </h2>
              <p className="text-lg leading-relaxed text-gray-200">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ImpressumPage;
