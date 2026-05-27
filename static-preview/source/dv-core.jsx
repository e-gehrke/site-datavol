/* DATA.VOL Symbol component (do brandbook, exato) */

const { useState, useEffect, useRef, useMemo } = React;

const Symbol = ({ variant = 'principal', size = 40, raw = false }) => {
  const configs = {
    principal: { bg: '#3B5A67', arrow: '#F2EDE0', radius: 16 },
    azul:      { bg: '#3B5A67', arrow: '#F2EDE0', radius: 16 },
    dark:      { bg: '#111111', arrow: '#F2EDE0', radius: 16 },
    lime:      { bg: '#111111', arrow: '#C6FF4D', radius: 16 },
    light:     { bg: '#F2EDE0', arrow: '#111111', radius: 16 },
    favicon:   { bg: '#111111', arrow: '#F2EDE0', radius: 50 },
    outline:   { bg: 'transparent', arrow: '#3B5A67', stroke: '#3B5A67', radius: 16 },
    raw:       { bg: 'transparent', arrow: '#F2EDE0', radius: 0 },
  };
  const c = configs[raw ? 'raw' : variant];
  const useTexture = size >= 48;
  const fid = 'sg-' + Math.abs(Math.round(size * 7919 + (variant.charCodeAt(0) || 0))).toString(36);
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-label="DATA.VOL" role="img" style={{ display: 'block' }}>
      {useTexture && (
        <defs>
          <filter id={fid} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="2" seed="7" />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.1 1.15" />
            <feComposite in="SourceGraphic" in2="result" operator="in" />
          </filter>
        </defs>
      )}
      {!raw && (variant === 'outline' ? (
        <rect x="6" y="6" width="88" height="88" rx={c.radius} fill="none" stroke={c.stroke} strokeWidth="4" />
      ) : (
        <rect x="5" y="5" width="90" height="90" rx={c.radius} fill={c.bg} />
      ))}
      <g filter={useTexture ? `url(#${fid})` : undefined}>
        {/* L-stub + V + diagonal to arrow tip closer to brandbook proportions */}
        <path d="M12 50 L36 50 L56 84 L82 22" stroke={c.arrow} strokeWidth="14" strokeLinejoin="miter" strokeLinecap="butt" fill="none" />
        {/* Bold arrowhead pointing up-right */}
        <polygon points="94,8 70,16 84,32" fill={c.arrow} />
      </g>
    </svg>
  );
};

const Lockup = ({ size = 30, fontSize = 26, dot = 'lime' }) => (
  <a href="#/" className="lockup">
    <Symbol variant={dot === 'lime' ? 'lime' : 'principal'} size={size} />
    <span className="word" style={{ fontSize }}>
      DATA<span className="dot" style={{ color: dot === 'lime' ? 'var(--lime)' : 'var(--azul)' }}>.</span>VOL
    </span>
  </a>
);

/* ─── Hash router ─── */
const useRoute = () => {
  const getRoute = () => window.location.hash.replace(/^#/, '') || '/';
  const [route, setRoute] = useState(getRoute());
  useEffect(() => {
    const onHash = () => {
      setRoute(getRoute());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const navigate = (to) => { window.location.hash = to; };
  return { route, navigate };
};

/* ─── Live ticker fake live FX data ─── */
const useTicker = () => {
  const base = useMemo(() => ([
    { sym: 'USD/BRL',  v: 5.182, d: 0.34 },
    { sym: 'EUR/BRL',  v: 5.612, d: -0.12 },
    { sym: 'DI 1Y',    v: 11.18, d: 0.04, suffix: '%' },
    { sym: 'DI 3Y',    v: 12.42, d: -0.02, suffix: '%' },
    { sym: 'CDI',      v: 10.40, d: 0, suffix: '%' },
    { sym: 'DOL JUN26',v: 5.215, d: 0.28 },
    { sym: 'DOL SET26',v: 5.273, d: 0.41 },
    { sym: 'DOL DEZ26',v: 5.362, d: 0.52 },
    { sym: 'DOL JUN27',v: 5.518, d: 0.71 },
    { sym: 'DDI JUL26',v: 6.85,  d: 0.08, suffix: '%' },
    { sym: 'IBOV',     v: 142385, d: 0.62, suffix: '' },
    { sym: 'EWZ',      v: 28.42, d: 0.18 },
  ]), []);
  return base;
};

/* ─── Forward curve data (mock, realistic) ─── */
const FORWARD_DATA = [
  { vert: 'SPOT',   m: 0,    ref: 5.182, bank: 5.182, du: 0 },
  { vert: '1M',     m: 1,    ref: 5.215, bank: 5.226, du: 21 },
  { vert: '3M',     m: 3,    ref: 5.273, bank: 5.291, du: 63 },
  { vert: '6M',     m: 6,    ref: 5.362, bank: 5.388, du: 126 },
  { vert: '9M',     m: 9,    ref: 5.448, bank: 5.485, du: 189 },
  { vert: '12M',    m: 12,   ref: 5.518, bank: 5.560, du: 252 },
  { vert: '18M',    m: 18,   ref: 5.658, bank: 5.715, du: 378 },
  { vert: '24M',    m: 24,   ref: 5.793, bank: 5.870, du: 504 },
  { vert: '36M',    m: 36,   ref: 6.094, bank: 6.215, du: 756 },
];

/* ─── App navigation map ─── */
const APP_NAV = [
  { group: 'Painel', items: [
    { route: '/dashboard',   label: 'Dashboard',           hint: 'Overview',         live: true },
  ] },
  { group: 'Curvas', items: [
    { route: '/curva',       label: 'Dólar forward',       hint: 'USD/BRL',          live: true },
    { route: '/juros',       label: 'Curva de juros',      hint: 'DI · pré',         beta: true },
  ] },
  { group: 'Instrumentos', items: [
    { route: '/ndf',         label: 'NDF',                 hint: 'Non-deliverable',  soon: true },
    { route: '/swaps',       label: 'Swaps',               hint: 'DI × Pré · USD',   soon: true },
    { route: '/comparador',  label: 'Comparador',          hint: 'Banco × ref.',     beta: true },
  ] },
  { group: 'Suporte', items: [
    { route: '/biblioteca',  label: 'Biblioteca',          hint: 'Glossário curto',  live: true },
    { route: '/historico',   label: 'Histórico',           hint: 'Consultas',        live: true },
  ] },
  { group: 'Conta', items: [
    { route: '/assinatura',  label: 'Assinatura',          hint: 'Plano · fatura',   live: true },
    { route: '/admin',       label: 'Admin',               hint: 'Membros',          live: true },
  ] },
];

/* ─── Login modal ─── */
const LoginModal = ({ onClose, navigate }) => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prevOv = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOv;
    };
  }, [onClose]);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    setTimeout(() => {
      if (email === 'admin@datavol.com' && pwd === 'admin') {
        onClose();
        navigate('/admin');
      } else if (email && pwd.length >= 3) {
        onClose();
        navigate('/dashboard');
      } else {
        setError('Credenciais inválidas.');
      }
      setLoading(false);
    }, 450);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: 820 }}>
        {/* Left visual */}
        <div style={{
          background: 'var(--black)',
          color: 'var(--off)',
          padding: '36px 32px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          minHeight: 420,
          backgroundImage:
            'linear-gradient(rgba(166,166,166,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(166,166,166,.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}>
          <p className="label" style={{ color: 'var(--cinza)' }}>Acesso restrito</p>
          <div>
            <Symbol variant="lime" size={72} />
            <h2 className="display-md" style={{ marginTop: 22, maxWidth: '14ch' }}>
              O usuário<br/>entende o preço.
            </h2>
            <p style={{ fontSize: 13, color: 'var(--cinza)', lineHeight: 1.55, marginTop: 12, maxWidth: '34ch' }}>
              Acesso por assinatura. Cálculo de curvas, comparativos e leitura de preço para tesouraria.
            </p>
          </div>
          <p className="label-sm" style={{ color: 'var(--cinza-3)' }}>volatis.com.br</p>
        </div>

        {/* Right form */}
        <div style={{ background: 'var(--off)', padding: '40px 36px', display: 'flex', alignItems: 'center', position: 'relative' }}>
          <button onClick={onClose} aria-label="Fechar" style={{
            position: 'absolute', top: 14, right: 14,
            width: 32, height: 32, borderRadius: 3,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--grafite)',
          }}>
            <svg width="14" height="14" viewBox="0 0 16 16">
              <path d="M3 3 L13 13 M13 3 L3 13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          <div style={{ width: '100%', maxWidth: 320 }}>
            <p className="label" style={{ color: 'var(--azul)', marginBottom: 8 }}>Entrar</p>
            <h1 className="display-sm" style={{ marginBottom: 6, fontSize: 36 }}>Acesso por convite.</h1>
            <p style={{ fontSize: 13, color: 'var(--cinza-3)', marginBottom: 24, lineHeight: 1.55 }}>
              DATA.VOL não possui cadastro aberto.
            </p>
            <form onSubmit={submit}>
              <div style={{ marginBottom: 16 }}>
                <label className="label-input">Email</label>
                <input type="email" required value={email} autoFocus onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" className="input" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="label-input">Senha</label>
                <input type="password" required value={pwd} onChange={e => setPwd(e.target.value)} placeholder="••••••••" className="input" />
              </div>
              {error && <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#b04848', marginBottom: 12, letterSpacing: 1 }}>⚠ {error}</p>}
              <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px 20px', opacity: loading ? .6 : 1 }}>
                {loading ? 'Validando…' : 'Entrar →'}
              </button>
            </form>
            <div style={{ marginTop: 20, paddingTop: 14, borderTop: '1px solid var(--rule)' }}>
              <p className="label-sm" style={{ color: 'var(--cinza-3)', marginBottom: 6 }}>Demo</p>
              <p className="mono" style={{ fontSize: 11, color: 'var(--cinza-3)', lineHeight: 1.7 }}>
                admin@datavol.com / admin → admin<br/>
                qualquer@email.com / 123 → dashboard
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 720px) { .modal { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};

Object.assign(window, { Symbol, Lockup, useRoute, useTicker, FORWARD_DATA, APP_NAV, LoginModal });
