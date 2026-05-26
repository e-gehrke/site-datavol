/* DATA.VOL Router + tweaks */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "grain": 80,
  "displayFont": "bebas",
  "density": "regular",
  "tickerSpeed": "medium"
}/*EDITMODE-END*/;

const App = () => {
  const { route, navigate } = window.useRoute();
  const [tw, setTweak] = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    window.openLogin = () => setLoginOpen(true);
    return () => { delete window.openLogin; };
  }, []);

  // Apply tweaks to root vars + classes
  useEffect(() => {
    const grain = tw.grain || 80;
    document.documentElement.style.setProperty('--grain-opacity', (grain / 100 * 0.22).toFixed(3));
    document.documentElement.style.setProperty('--paper-opacity', (grain / 100 * 0.07).toFixed(3));

    document.body.classList.remove('density-compact', 'density-airy');
    if (tw.density === 'compact') document.body.classList.add('density-compact');
    if (tw.density === 'airy') document.body.classList.add('density-airy');

    document.body.classList.remove('font-archivo', 'font-anton');
    if (tw.displayFont === 'archivo') document.body.classList.add('font-archivo');
    if (tw.displayFont === 'anton') document.body.classList.add('font-anton');
  }, [tw]);

  const openLogin = () => setLoginOpen(true);

  // Public landing
  if (route === '/' || route === '') {
    return (
      <>
        <window.PublicHeader openLogin={openLogin} />
        <window.PublicLanding openLogin={openLogin} />
        {loginOpen && <window.LoginModal onClose={() => setLoginOpen(false)} navigate={navigate} />}
        <TweaksWrapper tw={tw} setTweak={setTweak} />
      </>
    );
  }

  // App routes use AppShell
  const appRoutes = {
    '/dashboard':   { crumbs: ['Painel', 'Dashboard'],         comp: <window.DashboardPage /> },
    '/curva':       { crumbs: ['Curvas', 'Dólar forward'],     comp: <window.CurvaForwardPage /> },
    '/juros':       { crumbs: ['Curvas', 'Juros'],             comp: <window.JurosPage /> },
    '/ndf':         { crumbs: ['Instrumentos', 'NDF'],         comp: <window.NDFPage /> },
    '/swaps':       { crumbs: ['Instrumentos', 'Swaps'],       comp: <window.SwapsPage /> },
    '/comparador':  { crumbs: ['Instrumentos', 'Comparador'],  comp: <window.ComparadorPage /> },
    '/biblioteca':  { crumbs: ['Suporte', 'Biblioteca'],       comp: <window.BibliotecaPage /> },
    '/historico':   { crumbs: ['Suporte', 'Histórico'],        comp: <window.HistoricoPage /> },
    '/assinatura':  { crumbs: ['Conta', 'Assinatura'],         comp: <window.AssinaturaPage /> },
    '/admin':       { crumbs: ['Conta', 'Admin'],              comp: <window.AdminPage navigate={navigate} /> },
  };

  const r = appRoutes[route];
  if (r) {
    return (
      <>
        <window.AppShell route={route} navigate={navigate} crumbs={r.crumbs} openLogin={openLogin}>
          {r.comp}
        </window.AppShell>
        {loginOpen && <window.LoginModal onClose={() => setLoginOpen(false)} navigate={navigate} />}
        <TweaksWrapper tw={tw} setTweak={setTweak} />
      </>
    );
  }

  // 404
  return (
    <>
      <window.PublicHeader openLogin={openLogin} />
      <div style={{ background: 'var(--black)', color: 'var(--off)', padding: '120px 0', minHeight: '60vh' }}>
        <div className="wrap-wide" style={{ textAlign: 'center' }}>
          <p className="label" style={{ color: 'var(--lime)', marginBottom: 16 }}>404 · Endpoint inexistente</p>
          <h1 className="display-lg" style={{ color: 'var(--off)' }}>Rota não encontrada.</h1>
          <p className="lead" style={{ color: 'var(--cinza)', marginTop: 24, margin: '24px auto 0' }}>
            O caminho que você acessou não existe ou foi movido.
          </p>
          <a href="#/" className="btn btn-lime" style={{ marginTop: 32 }}>← Voltar para landing</a>
        </div>
      </div>
      {loginOpen && <window.LoginModal onClose={() => setLoginOpen(false)} navigate={navigate} />}
      <TweaksWrapper tw={tw} setTweak={setTweak} />
    </>
  );
};

const TweaksWrapper = ({ tw, setTweak }) => {
  if (!window.TweaksPanel) return null;
  return (
    <window.TweaksPanel title="Tweaks · DATA.VOL">
      <window.TweakSection label="Textura editorial">
        <window.TweakSlider
          label="Intensidade do grão"
          value={tw.grain || 80}
          min={0} max={100} step={5}
          onChange={(v) => setTweak('grain', v)}
          unit="%"
        />
      </window.TweakSection>

      <window.TweakSection label="Tipografia">
        <window.TweakSelect
          label="Display font"
          value={tw.displayFont || 'bebas'}
          options={[
            { value: 'bebas', label: 'Bebas Neue (oficial)' },
            { value: 'archivo', label: 'Archivo Black' },
            { value: 'anton', label: 'Anton' },
          ]}
          onChange={(v) => setTweak('displayFont', v)}
        />
      </window.TweakSection>

      <window.TweakSection label="Densidade">
        <window.TweakRadio
          label="Espaçamento"
          value={tw.density || 'regular'}
          options={[
            { value: 'compact', label: 'Compacto' },
            { value: 'regular', label: 'Regular' },
            { value: 'airy', label: 'Aerado' },
          ]}
          onChange={(v) => setTweak('density', v)}
        />
      </window.TweakSection>
    </window.TweaksPanel>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
