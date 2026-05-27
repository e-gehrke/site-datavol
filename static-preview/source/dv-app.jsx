/* DATA.VOL App pages (logged-in product surface) */

/* ─── App shell with sidebar + ticker + header ─── */
const AppShell = ({ route, navigate, children, crumbs = [], openLogin }) => {
  const ticker = window.useTicker();
  const tickerItems = [...ticker, ...ticker];
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add('app-dark');
    return () => document.body.classList.remove('app-dark');
  }, []);

  return (
    <div className="app-shell">
      <div className="ticker-bar">
        <div className="ticker-track">
          {tickerItems.map((t, i) => (
            <span key={i} className="ticker-item">
              <span className="symbol-label">{t.sym}</span>
              <span className="value">{t.v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}{t.suffix || ''}</span>
              {t.d !== 0 && <span className={'delta ' + (t.d > 0 ? 'up' : 'down')}>{t.d > 0 ? '+' : ''}{t.d.toFixed(2)}%</span>}
            </span>
          ))}
        </div>
      </div>

      <div className="app-header">
        <button onClick={() => setSidebarOpen(o => !o)} aria-label="Menu" style={{ display: 'none' }} className="mobile-toggle-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 7h18 M3 12h18 M3 17h18" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
        <window.Lockup size={28} fontSize={22} dot="lime" />
        <div className="crumb" style={{ marginLeft: 8 }}>
          {crumbs.map((c, i) => (
            <React.Fragment key={i}>
              <span className="sep">/</span>
              <span className={i === crumbs.length - 1 ? 'current' : ''}>{c}</span>
            </React.Fragment>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
          <span className="label-sm" style={{ color: 'var(--cinza)' }}>25 mai 2026 · 14:42 BRT</span>
          <button className="btn-sm btn btn-quiet" style={{ color: 'var(--cinza)', borderColor: 'var(--rule-dark-strong)' }}>
            Notif · 3
          </button>
          <button onClick={() => navigate('/')} className="btn-sm btn btn-quiet" style={{ color: 'var(--cinza)', borderColor: 'var(--rule-dark-strong)' }}>
            Sair
          </button>
        </div>
        <style>{`@media (max-width: 980px) { .mobile-toggle-btn { display: flex !important; align-items: center; justify-content: center; width: 36px; height: 36px; color: var(--off); } }`}</style>
      </div>

      <div className="app-body">
        <aside className={'sidebar' + (sidebarOpen ? ' open' : '')}>
          {window.APP_NAV.map((group, gi) => (
            <div key={gi} className="sidebar-section">
              <h6>{group.group}</h6>
              {group.items.map(item => (
                <a key={item.route} href={'#' + item.route} className={'sidebar-item' + (route === item.route ? ' active' : '')}>
                  {item.label}
                  {item.beta && <span className="badge" style={{ background: 'rgba(246, 183, 60, .15)', color: 'var(--warn)' }}>BETA</span>}
                  {item.soon && <span className="badge" style={{ background: 'rgba(166,166,166,.12)', color: 'var(--cinza)' }}>EM BREVE</span>}
                </a>
              ))}
            </div>
          ))}
        </aside>

        <main className="app-main">
          {children}
        </main>
      </div>
    </div>
  );
};

/* ─── Dashboard ─── */
const DashboardPage = () => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
      <div>
        <p className="label" style={{ color: 'var(--lime)', marginBottom: 8 }}>Painel</p>
        <h1 className="display-md" style={{ color: 'var(--off)' }}>Dashboard</h1>
      </div>
      <p className="label-sm" style={{ color: 'var(--cinza)' }}>Última atualização · 25/mai 14:42:18</p>
    </div>

    <div className="kpi-row" style={{ marginBottom: 24 }}>
      {[
        { l: 'USD/BRL spot',     v: '5,1820', d: '+0,34% hoje',          up: true },
        { l: 'DI 1Y',            v: '11,18%', d: '+4 bps',               up: true },
        { l: 'Forward 12M',      v: '5,5180', d: 'carrego 6,49% a.a.',   dim: true },
        { l: 'Consultas / mês',  v: '124',    d: 'limite ∞',             dim: true },
        { l: 'Sessão atual',     v: '00:38',  d: 'desde 14:04',          dim: true },
      ].map((k, i) => (
        <div key={i} className="kpi">
          <div className="kpi-label">{k.l}</div>
          <div className="kpi-value">{k.v}</div>
          <div className={'kpi-delta' + (k.dim ? '' : k.up ? ' up' : ' down')}>{k.d}</div>
        </div>
      ))}
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }} className="dash-grid">
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Curva dólar forward · USD/BRL</span>
          <a href="#/curva" className="btn-link">Abrir ferramenta →</a>
        </div>
        <window.HeroChart />
        <p className="label-sm" style={{ color: 'var(--cinza-3)', marginTop: 16 }}>
          Referência DATA.VOL em lime · cotação típica de banco em tracejado · spread anotado em 12M
        </p>
      </div>

      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Atividade recente</span>
          <a href="#/historico" className="btn-link">Histórico →</a>
        </div>
        <div>
          {[
            { t: '14:38', a: 'Comparador',    e: 'USD/BRL 6M banco 5,392 vs ref 5,362 · spread 30 bps' },
            { t: '14:21', a: 'Curva forward', e: 'Curva exportada (PDF) USD/BRL 36M' },
            { t: '13:54', a: 'Curva juros',   e: 'Vertices DI futuro recalculados (auto)' },
            { t: 'ontem', a: 'Comparador',    e: 'EUR/BRL 3M banco 5,712 vs ref 5,696' },
            { t: 'ontem', a: 'Curva forward', e: 'USD/BRL 12M consulta · 5,518' },
            { t: '23 mai', a: 'Biblioteca',   e: 'Definição "carrego cambial" consultada' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '52px 96px 1fr', gap: 12, padding: '11px 0', borderBottom: i === 5 ? 'none' : '1px solid var(--rule-dark)', alignItems: 'baseline' }}>
              <span className="label-sm" style={{ color: 'var(--cinza-3)' }}>{row.t}</span>
              <span className="label-sm" style={{ color: 'var(--lime)' }}>{row.a}</span>
              <span style={{ fontSize: 12.5, color: 'var(--off)', fontFamily: 'var(--mono)' }}>{row.e}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    <style>{`@media (max-width: 1100px) { .dash-grid { grid-template-columns: 1fr !important; } }`}</style>

    {/* Quick access tools */}
    <div style={{ marginTop: 24 }}>
      <div className="seclabel" style={{ color: 'var(--cinza)' }}>Ferramentas</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
        {[
          { t: 'Curva forward', s: 'USD/BRL · 36M', r: '/curva', live: true },
          { t: 'Curva de juros', s: 'DI · Pré · Cupom', r: '/juros', beta: true },
          { t: 'Comparador',    s: 'Banco × referência', r: '/comparador', beta: true },
          { t: 'NDF',           s: 'Non-deliverable',    r: '/ndf', soon: true },
          { t: 'Swaps',         s: 'DI × Pré · USD',     r: '/swaps', soon: true },
          { t: 'Biblioteca',    s: 'Glossário',          r: '/biblioteca', live: true },
        ].map((tool, i) => (
          <a key={i} href={'#' + tool.r} className="panel" style={{ padding: 18, display: 'block', transition: 'border-color .15s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <p style={{ fontFamily: 'var(--display)', fontSize: 22, color: 'var(--off)' }}>{tool.t}</p>
              <span className={'pill' + (tool.live ? ' live' : tool.beta ? ' beta' : ' soon')}>
                {tool.live ? 'Live' : tool.beta ? 'Beta' : 'Em breve'}
              </span>
            </div>
            <p className="label-sm" style={{ color: 'var(--cinza)' }}>{tool.s}</p>
          </a>
        ))}
      </div>
    </div>
  </div>
);

/* ─── Forward curve chart full size ─── */
const ForwardCurveChart = ({ showBank = true }) => {
  const W = 900, H = 420;
  const PAD = { l: 70, r: 30, t: 32, b: 50 };
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;

  const data = window.FORWARD_DATA;
  const xMax = 36;
  const yMin = 5.10, yMax = 6.30;
  const xs = (m) => PAD.l + (m / xMax) * innerW;
  const ys = (v) => PAD.t + innerH - ((v - yMin) / (yMax - yMin)) * innerH;

  const refPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xs(d.m).toFixed(1)} ${ys(d.ref).toFixed(1)}`).join(' ');
  const bankPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xs(d.m).toFixed(1)} ${ys(d.bank).toFixed(1)}`).join(' ');

  const yTicks = [5.1, 5.3, 5.5, 5.7, 5.9, 6.1, 6.3];
  const xTicks = [0, 1, 3, 6, 9, 12, 18, 24, 36];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
      {/* gridlines */}
      {yTicks.map(t => (
        <line key={'y'+t} x1={PAD.l} y1={ys(t)} x2={W - PAD.r} y2={ys(t)} stroke="rgba(166,166,166,.1)" strokeDasharray="2 4" />
      ))}
      {xTicks.map(t => (
        <line key={'x'+t} x1={xs(t)} y1={PAD.t} x2={xs(t)} y2={H - PAD.b} stroke="rgba(166,166,166,.07)" />
      ))}
      {/* axes */}
      <line x1={PAD.l} y1={H - PAD.b} x2={W - PAD.r} y2={H - PAD.b} stroke="rgba(166,166,166,.4)" />
      <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={H - PAD.b} stroke="rgba(166,166,166,.4)" />
      {/* y-axis title */}
      <text x={PAD.l - 50} y={PAD.t + innerH / 2} fill="#A6A6A6" fontFamily="IBM Plex Mono" fontSize="9" letterSpacing="2" transform={`rotate(-90, ${PAD.l - 50}, ${PAD.t + innerH/2})`}>BRL / USD</text>
      {/* y labels */}
      {yTicks.map(t => (
        <text key={'yl'+t} x={PAD.l - 10} y={ys(t)+3} textAnchor="end" fill="#A6A6A6" fontFamily="IBM Plex Mono" fontSize="10">{t.toFixed(2)}</text>
      ))}
      {/* x labels */}
      {xTicks.map(t => (
        <text key={'xl'+t} x={xs(t)} y={H - PAD.b + 18} textAnchor="middle" fill="#A6A6A6" fontFamily="IBM Plex Mono" fontSize="10" letterSpacing="1">
          {t === 0 ? 'SPOT' : t + 'M'}
        </text>
      ))}
      <text x={(PAD.l + W - PAD.r) / 2} y={H - 12} textAnchor="middle" fill="#5d5d5d" fontFamily="IBM Plex Mono" fontSize="9" letterSpacing="2">VENCIMENTO</text>

      {/* bank curve (dashed) */}
      {showBank && <path d={bankPath} fill="none" stroke="#A6A6A6" strokeWidth="1.5" strokeDasharray="5 4" />}
      {/* ref curve (lime) */}
      <path d={refPath} fill="none" stroke="#C6FF4D" strokeWidth="2.2" />

      {/* fill between curves (lighter spread visualization) */}
      {showBank && (
        <path
          d={refPath + ' ' + data.slice().reverse().map(d => `L ${xs(d.m).toFixed(1)} ${ys(d.bank).toFixed(1)}`).join(' ') + ' Z'}
          fill="rgba(255, 107, 107, .08)"
        />
      )}

      {/* ref points */}
      {data.map(d => (
        <g key={d.vert}>
          <circle cx={xs(d.m)} cy={ys(d.ref)} r="3.5" fill="#C6FF4D" />
          {showBank && d.m > 0 && <circle cx={xs(d.m)} cy={ys(d.bank)} r="2.5" fill="#A6A6A6" />}
        </g>
      ))}

      {/* annotations on 12M */}
      <g>
        <line x1={xs(12)} y1={ys(5.518)} x2={xs(12)} y2={ys(5.560)} stroke="#ff6b6b" strokeWidth="1.5" />
        <line x1={xs(12) - 4} y1={ys(5.560)} x2={xs(12) + 4} y2={ys(5.560)} stroke="#ff6b6b" strokeWidth="1" />
        <line x1={xs(12) - 4} y1={ys(5.518)} x2={xs(12) + 4} y2={ys(5.518)} stroke="#ff6b6b" strokeWidth="1" />
        <rect x={xs(12) + 10} y={ys(5.54) - 10} width="100" height="20" fill="#080A0B" stroke="rgba(255,107,107,.4)" />
        <text x={xs(12) + 16} y={ys(5.54)+4} fill="#ff6b6b" fontFamily="IBM Plex Mono" fontSize="10" letterSpacing="1">SPREAD 76 BPS</text>
      </g>

      {/* hovers simple labels for 6M */}
      <g>
        <rect x={xs(6) - 32} y={ys(5.362) - 26} width="64" height="18" fill="#080A0B" stroke="rgba(198,255,77,.4)" />
        <text x={xs(6)} y={ys(5.362) - 13} textAnchor="middle" fill="#C6FF4D" fontFamily="IBM Plex Mono" fontSize="10" letterSpacing="1">5,362</text>
      </g>
      <g>
        <rect x={xs(24) - 32} y={ys(5.793) - 26} width="64" height="18" fill="#080A0B" stroke="rgba(198,255,77,.4)" />
        <text x={xs(24)} y={ys(5.793) - 13} textAnchor="middle" fill="#C6FF4D" fontFamily="IBM Plex Mono" fontSize="10" letterSpacing="1">5,793</text>
      </g>
    </svg>
  );
};

/* ─── CURVA DÓLAR FORWARD flagship tool ─── */
const CurvaForwardPage = () => {
  const [par, setPar] = useState('USD/BRL');
  const [date, setDate] = useState('25/05/2026');
  const [showBank, setShowBank] = useState(true);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
        <div>
          <p className="label" style={{ color: 'var(--lime)', marginBottom: 8 }}>Curva forward</p>
          <h1 className="display-md" style={{ color: 'var(--off)' }}>USD/BRL</h1>
          <p className="label-sm" style={{ color: 'var(--cinza)', marginTop: 8 }}>
            Curva calculada a partir de DI futuro × taxa internacional · vertices até 36 meses
          </p>
        </div>
        <span className="pill live">Atualizada agora</span>
      </div>

      {/* Inputs row */}
      <div className="panel tight" style={{ marginBottom: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto auto', gap: 16, alignItems: 'end' }} className="inputs-grid">
          <div>
            <label className="label-input on-dark">Par</label>
            <select value={par} onChange={e => setPar(e.target.value)} className="input on-dark">
              <option>USD/BRL</option>
              <option>EUR/BRL</option>
              <option>GBP/BRL</option>
              <option>JPY/BRL</option>
            </select>
          </div>
          <div>
            <label className="label-input on-dark">Data de referência</label>
            <input type="text" value={date} onChange={e => setDate(e.target.value)} className="input on-dark" />
          </div>
          <div>
            <label className="label-input on-dark">Curva base</label>
            <select className="input on-dark">
              <option>DI futuro × CME (auto)</option>
              <option>BMF × CME</option>
              <option>Manual</option>
            </select>
          </div>
          <button className="btn btn-lime">Recalcular</button>
          <button className="btn btn-quiet" style={{ color: 'var(--cinza)' }}>Exportar</button>
        </div>
        <style>{`@media (max-width: 880px) { .inputs-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
      </div>

      {/* KPI row */}
      <div className="kpi-row" style={{ marginBottom: 20 }}>
        {[
          { l: 'Spot',          v: '5,1820', d: '+0,34% hoje',                up: true },
          { l: 'Carrego 12M',   v: '6,49%',  d: 'a.a. · base DU',             dim: true },
          { l: 'Ref. DATA.VOL 12M', v: '5,5180', d: '↑ +0,336 vs spot',         dim: true },
          { l: 'Banco típico 12M',  v: '5,5600', d: '+76 bps vs ref',          down: true },
          { l: 'Próximo update', v: '00:18', d: 'min',                        dim: true },
        ].map((k, i) => (
          <div key={i} className="kpi">
            <div className="kpi-label">{k.l}</div>
            <div className="kpi-value">{k.v}</div>
            <div className={'kpi-delta' + (k.dim ? '' : k.up ? ' up' : ' down')}>{k.d}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="chart" style={{ background: 'var(--black-2)', marginBottom: 20 }}>
        <span className="chart-title">USD/BRL · forward curve · ref. 25 mai 2026</span>
        <div className="chart-legend">
          <span className="item"><span className="swatch" style={{ background: 'var(--lime)' }}></span>DATA.VOL</span>
          <span className="item"><span className="swatch dashed"></span>Banco típico</span>
          <button onClick={() => setShowBank(b => !b)} className="label-sm" style={{ color: 'var(--cinza)', cursor: 'pointer', marginLeft: 14, textTransform: 'uppercase' }}>
            {showBank ? '[ esconder banco ]' : '[ mostrar banco ]'}
          </button>
        </div>
        <ForwardCurveChart showBank={showBank} />
      </div>

      {/* Table of maturities */}
      <div className="panel" style={{ padding: 0, marginBottom: 20 }}>
        <div className="panel-header" style={{ padding: '14px 22px' }}>
          <span className="panel-title">Tabela de vencimentos</span>
          <span className="panel-sub">9 vértices · BRL/USD · ref 25/05/2026</span>
        </div>
        <table className="dtable">
          <thead>
            <tr>
              <th>Vencimento</th>
              <th>Dias úteis</th>
              <th>Ref. DATA.VOL</th>
              <th>Carrego (a.a.)</th>
              <th>Banco típico</th>
              <th>Spread</th>
              <th>Custo embutido</th>
              <th>Δ vs spot</th>
            </tr>
          </thead>
          <tbody>
            {window.FORWARD_DATA.map((d, i) => {
              const spread = d.bank - d.ref;
              const bps = Math.round(spread / d.ref * 10000);
              const carrego = i === 0 ? 0 : ((d.ref / 5.182 - 1) * 360 / d.du) * 100;
              const deltaSpot = d.ref - 5.182;
              return (
                <tr key={d.vert}>
                  <td className="bold">{d.vert}</td>
                  <td className="dim">{d.du}</td>
                  <td className="bold" style={{ color: 'var(--lime)' }}>{d.ref.toFixed(4).replace('.', ',')}</td>
                  <td>{i === 0 ? ',' : carrego.toFixed(2).replace('.', ',') + '%'}</td>
                  <td>{i === 0 ? ',' : d.bank.toFixed(4).replace('.', ',')}</td>
                  <td className={i === 0 ? 'dim' : 'down'}>{i === 0 ? ',' : '+' + bps + ' bps'}</td>
                  <td className={i === 0 ? 'dim' : 'down'}>{i === 0 ? ',' : 'R$ ' + spread.toFixed(4).replace('.', ',') + '/USD'}</td>
                  <td className={i === 0 ? 'dim' : 'up'}>{i === 0 ? ',' : '+' + deltaSpot.toFixed(4).replace('.', ',')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Comparator */}
      <div style={{ marginBottom: 20 }}>
        <div className="seclabel lime">Comparador rápido</div>
        <div className="comparator">
          <div className="comparator-cell ref">
            <p className="label-sm" style={{ color: 'var(--lime)', marginBottom: 8 }}>Referência DATA.VOL · 12M</p>
            <p className="mono" style={{ fontSize: 42, lineHeight: 1, color: 'var(--off)', marginBottom: 8 }}>5,5180</p>
            <p className="label-sm" style={{ color: 'var(--cinza)' }}>Carrego 6,49% a.a. · spot 5,182 + 0,336</p>
          </div>
          <div className="comparator-vs">VS</div>
          <div className="comparator-cell">
            <p className="label-sm" style={{ color: 'var(--cinza)', marginBottom: 8 }}>Cotação do banco · 12M</p>
            <p className="mono" style={{ fontSize: 42, lineHeight: 1, color: 'var(--down)', marginBottom: 8 }}>5,5600</p>
            <p className="label-sm" style={{ color: 'var(--down)' }}>+76 bps · custo embutido R$ 0,042/USD</p>
          </div>
        </div>
        <p className="label-sm" style={{ color: 'var(--cinza-3)', marginTop: 12, lineHeight: 1.6 }}>
          Em um contrato de USD 500.000, o spread implícito do banco representa <span style={{ color: 'var(--down)' }}>R$ 21.000</span> de custo adicional vs. a referência calculada.
        </p>
      </div>

      {/* Methodology */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Premissas e metodologia</span>
          <a href="#/biblioteca" className="btn-link">Biblioteca →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }} className="meth-grid">
          <div>
            <p className="label-sm" style={{ color: 'var(--cinza)', marginBottom: 10 }}>Fórmula base</p>
            <p className="mono" style={{ fontSize: 14, padding: '12px 16px', background: 'var(--black)', border: '1px solid var(--rule-dark)', color: 'var(--off)', borderRadius: 3 }}>
              F<sub>t</sub> = S<sub>0</sub> × (1 + i<sub>BRL</sub>)<sup>t/360</sup> / (1 + i<sub>USD</sub>)<sup>t/360</sup>
            </p>
            <p style={{ fontSize: 12, color: 'var(--cinza)', marginTop: 12, lineHeight: 1.7 }}>
              Cobertura de paridade descoberta de juros. Sem ajuste para risco-país explícito; o prêmio é absorvido na curva DI doméstica.
            </p>
          </div>
          <div>
            <p className="label-sm" style={{ color: 'var(--cinza)', marginBottom: 10 }}>Insumos</p>
            <ul style={{ listStyle: 'none', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--off)', lineHeight: 1.9 }}>
              <li>· <span style={{ color: 'var(--cinza)' }}>S₀</span> spot BM&F PTAX consultado às 14:30 BRT</li>
              <li>· <span style={{ color: 'var(--cinza)' }}>i<sub>BRL</sub></span> curva DI futuro pré (B3) interpolada</li>
              <li>· <span style={{ color: 'var(--cinza)' }}>i<sub>USD</sub></span> CME SOFR + cupom cambial implícito</li>
              <li>· Cotação banco típica: spread médio de 3 dealers</li>
              <li>· Atualização: incremental a cada 60s · full a cada 15min</li>
            </ul>
          </div>
        </div>
        <style>{`@media (max-width: 720px) { .meth-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>

      <p className="mono" style={{ fontSize: 11, color: 'var(--cinza-3)', lineHeight: 1.7, marginTop: 26, maxWidth: '92ch' }}>
        Os valores apresentados são estimativas baseadas em dados e premissas informadas. Não constituem recomendação individual de investimento, hedge ou contratação de produto financeiro. Decisões devem considerar contexto da empresa, política de risco e assessoria habilitada.
      </p>
    </div>
  );
};

/* ─── Comparador (input form for bank quote vs reference) ─── */
const ComparadorPage = () => {
  const [bankPrice, setBankPrice] = useState('5,5600');
  const [usdAmount, setUsdAmount] = useState('500000');
  const refPrice = 5.5180;
  const bp = parseFloat(bankPrice.replace(',', '.')) || refPrice;
  const usd = parseFloat(usdAmount.replace(/\D/g, '')) || 0;
  const spread = bp - refPrice;
  const bps = Math.round(spread / refPrice * 10000);
  const cost = usd * spread;

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <p className="label" style={{ color: 'var(--lime)', marginBottom: 8 }}>Comparador</p>
        <h1 className="display-md" style={{ color: 'var(--off)' }}>Banco × referência</h1>
        <p className="label-sm" style={{ color: 'var(--cinza)', marginTop: 8 }}>
          Cole a cotação que o banco enviou. Compare com a referência calculada e veja o custo implícito.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 24 }} className="cmp-grid">
        {/* Inputs */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Cotação a comparar</span>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label className="label-input on-dark">Par</label>
            <select className="input on-dark">
              <option>USD/BRL</option>
              <option>EUR/BRL</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="label-input on-dark">Vencimento</label>
            <select className="input on-dark" defaultValue="12M">
              <option>1M</option><option>3M</option><option>6M</option>
              <option>12M</option><option>24M</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="label-input on-dark">Cotação do banco · BRL/USD</label>
            <input className="input on-dark" value={bankPrice} onChange={e => setBankPrice(e.target.value)} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label className="label-input on-dark">Notional · USD</label>
            <input className="input on-dark" value={usdAmount} onChange={e => setUsdAmount(e.target.value)} />
          </div>

          <button className="btn btn-lime" style={{ width: '100%', justifyContent: 'center' }}>Calcular →</button>
        </div>

        {/* Result */}
        <div>
          <div className="comparator" style={{ marginBottom: 16 }}>
            <div className="comparator-cell ref">
              <p className="label-sm" style={{ color: 'var(--lime)', marginBottom: 8 }}>Referência DATA.VOL · 12M</p>
              <p className="mono" style={{ fontSize: 42, lineHeight: 1, color: 'var(--off)', marginBottom: 8 }}>{refPrice.toFixed(4).replace('.', ',')}</p>
              <p className="label-sm" style={{ color: 'var(--cinza)' }}>Carrego 6,49% a.a.</p>
            </div>
            <div className="comparator-vs">VS</div>
            <div className="comparator-cell">
              <p className="label-sm" style={{ color: 'var(--cinza)', marginBottom: 8 }}>Banco</p>
              <p className="mono" style={{ fontSize: 42, lineHeight: 1, color: spread > 0 ? 'var(--down)' : 'var(--up)', marginBottom: 8 }}>
                {bp.toFixed(4).replace('.', ',')}
              </p>
              <p className="label-sm" style={{ color: spread > 0 ? 'var(--down)' : 'var(--up)' }}>
                {spread > 0 ? '+' : ''}{bps} bps vs referência
              </p>
            </div>
          </div>

          <div className="panel" style={{ background: 'var(--black)' }}>
            <div className="panel-header">
              <span className="panel-title">Impacto no contrato</span>
              <span className="panel-sub">USD {usd.toLocaleString('pt-BR')} · vencimento 12M</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
              {[
                { l: 'Spread',         v: bps + ' bps',                            color: spread > 0 ? 'var(--down)' : 'var(--up)' },
                { l: 'Δ por USD',      v: 'R$ ' + spread.toFixed(4).replace('.', ','), color: spread > 0 ? 'var(--down)' : 'var(--up)' },
                { l: 'Custo total',    v: 'R$ ' + Math.abs(cost).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), color: spread > 0 ? 'var(--down)' : 'var(--up)' },
                { l: 'BRL no banco',   v: 'R$ ' + (bp * usd).toLocaleString('pt-BR', { maximumFractionDigits: 0 }),    color: 'var(--off)' },
                { l: 'BRL na ref',     v: 'R$ ' + (refPrice * usd).toLocaleString('pt-BR', { maximumFractionDigits: 0 }), color: 'var(--off)' },
              ].map((k, i) => (
                <div key={i}>
                  <p className="label-sm" style={{ color: 'var(--cinza-3)', marginBottom: 6 }}>{k.l}</p>
                  <p className="mono" style={{ fontSize: 20, color: k.color }}>{k.v}</p>
                </div>
              ))}
            </div>
            <p className="mono" style={{ fontSize: 11, color: 'var(--cinza-3)', marginTop: 18, lineHeight: 1.6 }}>
              Cálculo informativo. Compare com o que o banco está cobrando, mas considere prazo de liquidação, garantias, IOF e contexto contratual.
            </p>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 960px) { .cmp-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};

/* ─── Curva de juros beta, with mini chart placeholder ─── */
const JurosPage = () => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
      <div>
        <p className="label" style={{ color: 'var(--lime)', marginBottom: 8 }}>Curvas de juros</p>
        <h1 className="display-md" style={{ color: 'var(--off)' }}>DI futuro · Pré · Cupom</h1>
      </div>
      <span className="pill beta">Beta</span>
    </div>

    <div className="kpi-row" style={{ marginBottom: 20 }}>
      {[
        { l: 'DI 1Y',  v: '11,18%', d: '+4 bps',   up: true },
        { l: 'DI 2Y',  v: '11,72%', d: '+2 bps',   up: true },
        { l: 'DI 5Y',  v: '12,84%', d: '-2 bps',   down: true },
        { l: 'CDI',    v: '10,40%', d: 'estável',  dim: true },
        { l: 'Inclinação 1×5', v: '+166 bps', d: 'estrutura normal', dim: true },
      ].map((k, i) => (
        <div key={i} className="kpi">
          <div className="kpi-label">{k.l}</div>
          <div className="kpi-value">{k.v}</div>
          <div className={'kpi-delta' + (k.dim ? '' : k.up ? ' up' : ' down')}>{k.d}</div>
        </div>
      ))}
    </div>

    <div className="panel" style={{ padding: 0 }}>
      <div className="panel-header" style={{ padding: '14px 22px' }}>
        <span className="panel-title">Vértices DI futuro</span>
        <span className="panel-sub">B3 · interpolação linear · 25/05/2026</span>
      </div>
      <table className="dtable">
        <thead>
          <tr>
            <th>Vencimento</th>
            <th>Dias úteis</th>
            <th>Taxa nominal</th>
            <th>Taxa exponencial</th>
            <th>PU</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {[
            { v: 'JAN26', du: 154, tn: '10,85%', te: '10,89%', pu: '95.412,18', vol: 'R$ 142 bi' },
            { v: 'JUL26', du: 280, tn: '11,18%', te: '11,24%', pu: '92.108,76', vol: 'R$ 98 bi' },
            { v: 'JAN27', du: 406, tn: '11,42%', te: '11,49%', pu: '88.842,32', vol: 'R$ 76 bi' },
            { v: 'JAN28', du: 658, tn: '11,72%', te: '11,82%', pu: '80.218,44', vol: 'R$ 52 bi' },
            { v: 'JAN29', du: 911, tn: '12,18%', te: '12,32%', pu: '72.418,12', vol: 'R$ 31 bi' },
            { v: 'JAN31', du: 1416, tn: '12,84%', te: '13,06%', pu: '58.842,90', vol: 'R$ 14 bi' },
          ].map((r, i) => (
            <tr key={i}>
              <td className="bold">{r.v}</td>
              <td className="dim">{r.du}</td>
              <td style={{ color: 'var(--lime)' }} className="bold">{r.tn}</td>
              <td>{r.te}</td>
              <td>{r.pu}</td>
              <td className="dim">{r.vol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* ─── Generic "in progress" template for NDF / Swaps ─── */
const ToolStubPage = ({ title, sub, bullets, placeholderTable }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
      <div>
        <p className="label" style={{ color: 'var(--lime)', marginBottom: 8 }}>Instrumento</p>
        <h1 className="display-md" style={{ color: 'var(--off)' }}>{title}</h1>
        <p className="label-sm" style={{ color: 'var(--cinza)', marginTop: 8 }}>{sub}</p>
      </div>
      <span className="pill soon">Em desenvolvimento</span>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="stub-grid">
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">O que essa ferramenta vai responder</span>
        </div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {bullets.map((b, i) => (
            <li key={i} style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: 12, alignItems: 'baseline', fontSize: 13, color: 'var(--off)', lineHeight: 1.55 }}>
              <span className="label-sm" style={{ color: 'var(--lime)' }}>{String(i+1).padStart(2,'0')}</span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div className="panel" style={{ padding: 0 }}>
        <div className="panel-header" style={{ padding: '14px 22px' }}>
          <span className="panel-title">Saída prevista</span>
          <span className="panel-sub">mock</span>
        </div>
        {placeholderTable}
      </div>
    </div>

    <div className="panel" style={{ marginTop: 24, background: 'transparent', borderStyle: 'dashed' }}>
      <p className="label" style={{ color: 'var(--cinza)', marginBottom: 12 }}>Cronograma</p>
      <p style={{ fontSize: 14, color: 'var(--off)', lineHeight: 1.6, marginBottom: 16, maxWidth: '64ch' }}>
        Esta ferramenta está sendo desenvolvida com base em casos reais de clientes da mesa DATA.VOL. Membros podem solicitar prioridade ou enviar casos de uso.
      </p>
      <a href="mailto:mesa@datavol.com" className="btn-link">Enviar caso de uso →</a>
    </div>
    <style>{`@media (max-width: 880px) { .stub-grid { grid-template-columns: 1fr !important; } }`}</style>
  </div>
);

const NDFPage = () => (
  <ToolStubPage
    title="NDF" sub="Non-deliverable forward · contratos cambiais sem entrega física"
    bullets={[
      'Qual é o prêmio implícito de NDF para um vencimento específico?',
      'A taxa cotada pelo banco é coerente com a curva de mercado?',
      'Qual o custo de carregamento de NDF vs forward com entrega?',
      'Qual o impacto fiscal e contábil estimado do contrato?',
    ]}
    placeholderTable={
      <table className="dtable">
        <thead><tr><th>Vencimento</th><th>NDF teórica</th><th>Spread vs banco</th><th>Custo carrego</th></tr></thead>
        <tbody>
          {['1M','3M','6M','12M','24M'].map((v, i) => (
            <tr key={v}>
              <td className="bold">{v}</td>
              <td className="dim">,</td>
              <td className="dim">,</td>
              <td className="dim">,</td>
            </tr>
          ))}
        </tbody>
      </table>
    }
  />
);

const SwapsPage = () => (
  <ToolStubPage
    title="Swaps" sub="DI × Pré, USD × CDI, hedge accounting (IFRS 9)"
    bullets={[
      'Qual é o valor de mercado atual do swap (MTM)?',
      'Qual o resultado financeiro acumulado no contrato?',
      'A efetividade do hedge está dentro do range (80%-125%)?',
      'Qual o impacto contábil em hedge designado vs não designado?',
    ]}
    placeholderTable={
      <table className="dtable">
        <thead><tr><th>Trade</th><th>Tipo</th><th>Vencimento</th><th>MTM</th></tr></thead>
        <tbody>
          {[1,2,3,4,5].map(i => (
            <tr key={i}><td className="bold">SWP-{(2000+i).toString()}</td><td className="dim">,</td><td className="dim">,</td><td className="dim">,</td></tr>
          ))}
        </tbody>
      </table>
    }
  />
);

/* ─── Biblioteca técnica ─── */
const BibliotecaPage = () => {
  const [q, setQ] = useState('');
  const entries = [
    { term: 'Carrego cambial', desc: 'Diferença implícita entre taxa BRL e taxa USD que compõe o forward. Reflete custo de oportunidade do capital em uma moeda vs outra.' },
    { term: 'Curva forward',   desc: 'Conjunto de preços futuros derivados via paridade de juros. Cada vértice representa um vencimento específico.' },
    { term: 'NDF',              desc: 'Non-Deliverable Forward. Contrato cambial sem entrega física da moeda; liquida pela diferença de taxa.' },
    { term: 'Spread bancário',  desc: 'Diferença entre a cotação que o banco oferece e a referência teórica calculada. Inclui margem do dealer, custo de balanço e prêmio de risco.' },
    { term: 'DI futuro',        desc: 'Contrato futuro de taxa DI negociado na B3. Vetor de leitura da curva de juros doméstica.' },
    { term: 'Cupom cambial',    desc: 'Taxa de juros em USD aplicada a operações no Brasil. Reflete custo de financiamento em dólar localmente.' },
    { term: 'Hedge accounting', desc: 'Tratamento contábil que permite alinhar resultado de hedge e objeto coberto. IFRS 9 exige documentação e teste de efetividade.' },
    { term: 'MTM',              desc: 'Marcação a mercado. Valor presente que o contrato teria se fosse liquidado hoje, dadas as condições atuais de mercado.' },
    { term: 'PTAX',             desc: 'Cotação de referência do BCB, média ponderada das operações do dia. Usada para liquidação de contratos NDF e ajustes contábeis.' },
    { term: 'Basis swap',       desc: 'Swap entre duas taxas flutuantes. Útil para arbitrar diferenças entre indexadores.' },
  ];
  const filtered = entries.filter(e =>
    e.term.toLowerCase().includes(q.toLowerCase()) ||
    e.desc.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <p className="label" style={{ color: 'var(--lime)', marginBottom: 8 }}>Suporte</p>
        <h1 className="display-md" style={{ color: 'var(--off)' }}>Biblioteca técnica</h1>
        <p className="label-sm" style={{ color: 'var(--cinza)', marginTop: 8 }}>
          Glossário curto. Definições objetivas e fórmulas mínimas. Sem aula longa.
        </p>
      </div>

      <input
        value={q} onChange={e => setQ(e.target.value)}
        placeholder="Buscar termo…"
        className="input on-dark"
        style={{ maxWidth: 360, marginBottom: 20 }}
      />

      <div className="panel" style={{ padding: 0 }}>
        {filtered.length === 0 && <p style={{ padding: 32, color: 'var(--cinza)', fontSize: 13 }}>Nenhum termo encontrado.</p>}
        {filtered.map((e, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 28, padding: '22px 26px', borderBottom: i === filtered.length - 1 ? 'none' : '1px solid var(--rule-dark)' }}>
            <p style={{ fontFamily: 'var(--display)', fontSize: 22, color: 'var(--lime)' }}>{e.term}</p>
            <p style={{ fontSize: 14, color: 'var(--off)', lineHeight: 1.6 }}>{e.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Histórico ─── */
const HistoricoPage = () => {
  const rows = [
    { d: '25/05 14:38', tool: 'Comparador',    inputs: 'USD/BRL · 6M · banco 5,392', result: 'spread +30 bps · custo R$ 15k em USD 500k', tag: 'comparador' },
    { d: '25/05 14:21', tool: 'Curva forward', inputs: 'USD/BRL · 36M · ref 25/mai', result: 'exportado PDF · 9 vértices',                tag: 'curva' },
    { d: '25/05 13:54', tool: 'Curva juros',   inputs: 'DI futuro · JAN26→JAN31',     result: '6 vértices recalculados (auto)',           tag: 'juros' },
    { d: '24/05 17:08', tool: 'Comparador',    inputs: 'EUR/BRL · 3M · banco 5,712', result: 'spread +28 bps · custo R$ 4k em EUR 100k', tag: 'comparador' },
    { d: '24/05 11:42', tool: 'Curva forward', inputs: 'USD/BRL · 12M',               result: 'consulta · ref 5,518',                     tag: 'curva' },
    { d: '23/05 16:30', tool: 'Biblioteca',    inputs: 'carrego cambial',             result: 'definição consultada',                     tag: 'biblio' },
    { d: '23/05 09:14', tool: 'Curva forward', inputs: 'USD/BRL · 24M',               result: 'consulta · ref 5,793 · spread banco +52', tag: 'curva' },
    { d: '22/05 18:02', tool: 'Comparador',    inputs: 'USD/BRL · 12M · banco 5,584', result: 'spread +66 bps · custo R$ 33k em USD 500k', tag: 'comparador' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
        <div>
          <p className="label" style={{ color: 'var(--lime)', marginBottom: 8 }}>Histórico</p>
          <h1 className="display-md" style={{ color: 'var(--off)' }}>Consultas</h1>
          <p className="label-sm" style={{ color: 'var(--cinza)', marginTop: 8 }}>
            Tudo que foi consultado, calculado ou exportado · auditabilidade completa
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-quiet btn-sm" style={{ color: 'var(--cinza)' }}>Filtrar</button>
          <button className="btn btn-quiet btn-sm" style={{ color: 'var(--cinza)' }}>Exportar CSV</button>
        </div>
      </div>

      <div className="panel" style={{ padding: 0 }}>
        <table className="dtable">
          <thead>
            <tr>
              <th>Data / hora</th>
              <th>Ferramenta</th>
              <th>Parâmetros</th>
              <th>Resultado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td className="dim mono">{r.d}</td>
                <td className="bold" style={{ color: 'var(--lime)' }}>{r.tool}</td>
                <td>{r.inputs}</td>
                <td className="dim">{r.result}</td>
                <td className="right"><a className="btn-link" style={{ fontSize: 10 }} href={'#/' + r.tag}>Abrir →</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ─── Assinatura ─── */
const AssinaturaPage = () => (
  <div>
    <div style={{ marginBottom: 22 }}>
      <p className="label" style={{ color: 'var(--lime)', marginBottom: 8 }}>Conta</p>
      <h1 className="display-md" style={{ color: 'var(--off)' }}>Assinatura</h1>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }} className="sub-grid">
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Plano atual</span>
          <span className="pill live">Ativo</span>
        </div>
        <h2 className="display-md" style={{ color: 'var(--off)', marginBottom: 6 }}>Mesa</h2>
        <p style={{ fontSize: 14, color: 'var(--cinza)', marginBottom: 22 }}>
          Acesso completo · até 3 usuários · cobrança trimestral
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, border: '1px solid var(--rule-dark)' }}>
          <div style={{ padding: 18, borderRight: '1px solid var(--rule-dark)' }}>
            <p className="label-sm" style={{ color: 'var(--cinza-3)', marginBottom: 6 }}>Mensalidade</p>
            <p className="mono" style={{ fontSize: 24, color: 'var(--off)' }}>R$ 480</p>
          </div>
          <div style={{ padding: 18, borderRight: '1px solid var(--rule-dark)' }}>
            <p className="label-sm" style={{ color: 'var(--cinza-3)', marginBottom: 6 }}>Próximo ciclo</p>
            <p className="mono" style={{ fontSize: 24, color: 'var(--off)' }}>15/jul/26</p>
          </div>
          <div style={{ padding: 18 }}>
            <p className="label-sm" style={{ color: 'var(--cinza-3)', marginBottom: 6 }}>Valor previsto</p>
            <p className="mono" style={{ fontSize: 24, color: 'var(--lime)' }}>R$ 1.440</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
          <button className="btn btn-quiet" style={{ color: 'var(--off)', borderColor: 'var(--rule-dark-strong)' }}>Faturas</button>
          <button className="btn btn-quiet" style={{ color: 'var(--off)', borderColor: 'var(--rule-dark-strong)' }}>Método de pagamento</button>
          <button className="btn btn-quiet" style={{ color: 'var(--down)', borderColor: 'rgba(255,107,107,.3)' }}>Cancelar</button>
        </div>
      </div>

      <div className="panel" style={{ background: 'transparent', borderStyle: 'dashed' }}>
        <p className="label" style={{ color: 'var(--cinza)', marginBottom: 14 }}>Upgrade corporativo</p>
        <p className="lead-sm" style={{ color: 'var(--off)', marginBottom: 18 }}>
          Acima de 3 usuários, dados via API ou cobertura sob medida.
        </p>
        <p style={{ fontSize: 13, color: 'var(--cinza)', lineHeight: 1.6, marginBottom: 20 }}>
          Conversamos com a empresa antes de tabelar.
        </p>
        <a href="mailto:mesa@datavol.com" className="btn-link">mesa@datavol.com →</a>
      </div>
    </div>

    <div className="panel" style={{ marginTop: 24 }}>
      <div className="panel-header">
        <span className="panel-title">Uso este ciclo</span>
        <span className="panel-sub">desde 15/abr · 41 dias</span>
      </div>
      <div className="kpi-row" style={{ border: 'none', background: 'transparent' }}>
        {[
          { l: 'Consultas',     v: '124',  d: 'ilimitado' },
          { l: 'Exportações',   v: '08',   d: 'ilimitado' },
          { l: 'Usuários',      v: '02/3', d: '1 vaga aberta' },
          { l: 'API requests',  v: '0',    d: 'não incluído' },
        ].map((k, i) => (
          <div key={i} className="kpi" style={{ borderRight: '1px solid var(--rule-dark)', borderBottom: 'none' }}>
            <div className="kpi-label">{k.l}</div>
            <div className="kpi-value">{k.v}</div>
            <div className="kpi-delta">{k.d}</div>
          </div>
        ))}
      </div>
    </div>

    <style>{`@media (max-width: 980px) { .sub-grid { grid-template-columns: 1fr !important; } }`}</style>
  </div>
);

/* ─── Admin pages ─── */
const AdminPage = ({ navigate }) => {
  const [tab, setTab] = useState('overview');
  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <p className="label" style={{ color: 'var(--lime)', marginBottom: 8 }}>Admin</p>
        <h1 className="display-md" style={{ color: 'var(--off)' }}>Painel de administração</h1>
      </div>

      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--rule-dark)', marginBottom: 22 }}>
        {[
          { k: 'overview', l: 'Visão geral' },
          { k: 'members',  l: 'Membros' },
          { k: 'system',   l: 'Sistema' },
        ].map(t => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className="label"
            style={{
              padding: '12px 18px',
              color: tab === t.k ? 'var(--lime)' : 'var(--cinza)',
              borderBottom: '2px solid',
              borderColor: tab === t.k ? 'var(--lime)' : 'transparent',
              transform: 'translateY(1px)',
            }}
          >{t.l}</button>
        ))}
      </div>

      {tab === 'overview' && (
        <>
          <div className="kpi-row" style={{ marginBottom: 22 }}>
            {[
              { l: 'Assinantes ativos',   v: '47',  d: '+5 esta semana', up: true },
              { l: 'MRR',                 v: 'R$ 22.560', d: '+R$ 2.400',     up: true },
              { l: 'Sessões / 30d',       v: '1.218', d: '+8%',           up: true },
              { l: 'Consultas / 30d',     v: '4.842', d: 'média 103/usr', dim: true },
              { l: 'Churn 30d',           v: '2,1%',  d: '-0,4 p.p.',    up: true },
            ].map((k, i) => (
              <div key={i} className="kpi">
                <div className="kpi-label">{k.l}</div>
                <div className="kpi-value">{k.v}</div>
                <div className={'kpi-delta' + (k.dim ? '' : k.up ? ' up' : ' down')}>{k.d}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 22 }} className="adm-grid">
            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">Atividade do sistema</span>
                <span className="panel-sub">últimas 24h</span>
              </div>
              <div>
                {[
                  { t: '14:32', a: 'sistema',           e: 'Novo membro convidado: m.silva@cambio.com.br' },
                  { t: '12:08', a: 'e.gehrke',          e: 'Permissão alterada → admin' },
                  { t: '09:14', a: 'sistema',           e: 'Atualização de curvas: DI futuro + CME (auto)' },
                  { t: '08:55', a: 'sistema',           e: 'Backup Supabase concluído (4,2 GB)' },
                  { t: 'ontem', a: 'sistema',           e: 'Vol Letter Nº 003 enviada (283 destinatários)' },
                  { t: 'ontem', a: 'e.gehrke',          e: 'Ferramenta publicada: Comparador (beta)' },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 130px 1fr', gap: 14, padding: '12px 0', borderBottom: i === 5 ? 'none' : '1px solid var(--rule-dark)', alignItems: 'baseline' }}>
                    <span className="label-sm" style={{ color: 'var(--cinza-3)' }}>{row.t}</span>
                    <span className="label-sm" style={{ color: 'var(--lime)' }}>{row.a}</span>
                    <span style={{ fontSize: 12.5, color: 'var(--off)' }}>{row.e}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="panel" style={{ marginBottom: 16 }}>
                <div className="panel-header">
                  <span className="panel-title">Saúde dos dados</span>
                </div>
                {[
                  { l: 'DI futuro (B3)',      v: 'OK',   age: 'há 28s' },
                  { l: 'PTAX (BCB)',          v: 'OK',   age: 'há 1m' },
                  { l: 'CME SOFR',            v: 'OK',   age: 'há 3m' },
                  { l: 'Cupom cambial',       v: 'lag',  age: 'há 22m', warn: true },
                  { l: 'Backup diário',       v: 'OK',   age: 'esta noite' },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i === 4 ? 'none' : '1px solid var(--rule-dark)', fontSize: 13 }}>
                    <span style={{ color: 'var(--off)' }}>{r.l}</span>
                    <span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span className="label-sm" style={{ color: 'var(--cinza-3)' }}>{r.age}</span>
                      <span className="label-sm" style={{ color: r.warn ? 'var(--warn)' : 'var(--lime)' }}>● {r.v}</span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="panel" style={{ background: 'transparent', borderStyle: 'dashed' }}>
                <p className="label" style={{ color: 'var(--cinza)', marginBottom: 10 }}>Próximo deploy</p>
                <p className="mono" style={{ fontSize: 14, color: 'var(--off)', marginBottom: 6 }}>v2.1 · 28/05/2026</p>
                <p style={{ fontSize: 12, color: 'var(--cinza)', lineHeight: 1.6 }}>
                  NDF v1 e refinamento do comparador.
                </p>
              </div>
            </div>
          </div>
          <style>{`@media (max-width: 980px) { .adm-grid { grid-template-columns: 1fr !important; } }`}</style>
        </>
      )}

      {tab === 'members' && <AdminMembersTab />}

      {tab === 'system' && (
        <div className="panel">
          <div className="panel-header"><span className="panel-title">Sistema</span></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
            <div>
              <p className="label-sm" style={{ color: 'var(--cinza)', marginBottom: 8 }}>Versão</p>
              <p className="mono" style={{ color: 'var(--off)', marginBottom: 18 }}>v2.0.4 · build 412</p>
              <p className="label-sm" style={{ color: 'var(--cinza)', marginBottom: 8 }}>Ambiente</p>
              <p className="mono" style={{ color: 'var(--off)', marginBottom: 18 }}>production · vercel us-east</p>
              <p className="label-sm" style={{ color: 'var(--cinza)', marginBottom: 8 }}>Backend</p>
              <p className="mono" style={{ color: 'var(--off)' }}>supabase · postgres 16 · RLS ON</p>
            </div>
            <div>
              <p className="label-sm" style={{ color: 'var(--cinza)', marginBottom: 8 }}>Uptime 30d</p>
              <p className="mono" style={{ color: 'var(--lime)', marginBottom: 18 }}>99,94%</p>
              <p className="label-sm" style={{ color: 'var(--cinza)', marginBottom: 8 }}>Última manutenção</p>
              <p className="mono" style={{ color: 'var(--off)', marginBottom: 18 }}>21/mai · 06:14 BRT · 3m22s</p>
              <p className="label-sm" style={{ color: 'var(--cinza)', marginBottom: 8 }}>Próxima janela</p>
              <p className="mono" style={{ color: 'var(--off)' }}>28/mai · 03:00 BRT · estimada 5min</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminMembersTab = () => {
  const [q, setQ] = useState('');
  const members = [
    { id: 1, name: 'Eduardo Gehrke',        email: 'e.gehrke@datavol.com',          role: 'admin',     since: '12/03/2026', co: 'Volatis',          status: 'ativo' },
    { id: 2, name: 'Mateus Silva',          email: 'm.silva@cambio.com.br',         role: 'membro',    since: '24/04/2026', co: 'Câmbio Verde',     status: 'ativo' },
    { id: 3, name: 'Bruna Costa',           email: 'bruna@bcindustria.com.br',      role: 'membro',    since: '15/04/2026', co: 'BC Indústria',     status: 'ativo' },
    { id: 4, name: 'Pedro Almeida',         email: 'pedro@almeidaexports.com',      role: 'membro',    since: '02/04/2026', co: 'Almeida Exports',  status: 'ativo' },
    { id: 5, name: 'Ana Mendes',            email: 'ana@mendescapital.com.br',      role: 'membro',    since: '28/03/2026', co: 'Mendes Capital',   status: 'inativo' },
    { id: 6, name: 'Rafael Lopes',          email: 'r.lopes@tradingdesk.com.br',    role: 'membro',    since: '20/03/2026', co: 'Trading Desk',     status: 'ativo' },
    { id: 7, name: 'Júlia Tavares',         email: 'julia@tavarespartners.com',     role: 'membro',    since: '18/03/2026', co: 'Tavares Partners', status: 'ativo' },
    { id: 8, name: 'Felipe Souza',          email: 'felipe@souzacommodities.com',   role: 'membro',    since: '14/03/2026', co: 'Souza Commodities',status: 'ativo' },
  ];
  const filtered = members.filter(m => [m.name, m.email, m.co].join(' ').toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar nome, email ou empresa…" className="input on-dark" style={{ maxWidth: 360 }} />
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-quiet btn-sm" style={{ color: 'var(--cinza)' }}>Exportar CSV</button>
          <button className="btn btn-lime btn-sm">Convidar membro</button>
        </div>
      </div>
      <div className="panel" style={{ padding: 0 }}>
        <table className="dtable">
          <thead>
            <tr>
              <th>Nome</th><th>Email</th><th>Empresa</th><th>Papel</th><th>Desde</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(m => (
              <tr key={m.id}>
                <td className="bold">{m.name}</td>
                <td className="dim mono" style={{ fontSize: 11.5 }}>{m.email}</td>
                <td>{m.co}</td>
                <td>
                  <span className="pill" style={{ background: m.role === 'admin' ? 'var(--azul)' : 'transparent', color: m.role === 'admin' ? 'var(--off)' : 'var(--cinza)', borderColor: m.role === 'admin' ? 'var(--azul)' : 'var(--rule-dark-strong)' }}>
                    {m.role}
                  </span>
                </td>
                <td className="dim mono">{m.since}</td>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--mono)', fontSize: 11, color: m.status === 'ativo' ? 'var(--lime)' : 'var(--cinza)' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: m.status === 'ativo' ? 'var(--lime)' : 'var(--cinza)' }} />
                    {m.status}
                  </span>
                </td>
                <td className="right"><a className="btn-link" style={{ fontSize: 10 }} href="#">Editar →</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Object.assign(window, {
  AppShell, DashboardPage, CurvaForwardPage, JurosPage, ComparadorPage,
  NDFPage, SwapsPage, BibliotecaPage, HistoricoPage, AssinaturaPage, AdminPage, ForwardCurveChart
});
