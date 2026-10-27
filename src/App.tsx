import { lazy, Suspense, useState } from "react";

import {
  ArrowDownToLine,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Box,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  CreditCard,
  LayoutDashboard,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Users,
  X,
} from "lucide-react";
import "./App.css";

const RevenueChart = lazy(() => import("./RevenueChart"));

const money = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const orders = [
  {
    id: "#10248",
    name: "Mariana Costa",
    email: "mariana.costa@email.com",
    initials: "MC",
    product: "Fone Bluetooth Studio",
    amount: 349.9,
    status: "Concluído",
    date: "27 out, 2026",
    color: "purple",
  },
  {
    id: "#10247",
    name: "Lucas Oliveira",
    email: "lucas.oliveira@email.com",
    initials: "LO",
    product: "Tênis Urban Essential",
    amount: 289.9,
    status: "Em transporte",
    date: "27 out, 2026",
    color: "blue",
  },
  {
    id: "#10246",
    name: "Ana Beatriz",
    email: "ana.beatriz@email.com",
    initials: "AB",
    product: "Mochila Everyday",
    amount: 189.9,
    status: "Concluído",
    date: "26 out, 2026",
    color: "orange",
  },
  {
    id: "#10245",
    name: "Pedro Santos",
    email: "pedro.santos@email.com",
    initials: "PS",
    product: "Relógio Minimal",
    amount: 459,
    status: "Pendente",
    date: "26 out, 2026",
    color: "green",
  },
  {
    id: "#10244",
    name: "Juliana Almeida",
    email: "juliana.almeida@email.com",
    initials: "JA",
    product: "Camiseta Essential",
    amount: 89.9,
    status: "Concluído",
    date: "25 out, 2026",
    color: "pink",
  },
];
const products = [
  {
    name: "Fone Bluetooth Studio",
    category: "Eletrônicos",
    count: 148,
    price: 349.9,
    emoji: "🎧",
    color: "purple",
  },
  {
    name: "Tênis Urban Essential",
    category: "Moda e acessórios",
    count: 126,
    price: 289.9,
    emoji: "👟",
    color: "orange",
  },
  {
    name: "Mochila Everyday",
    category: "Moda e acessórios",
    count: 94,
    price: 189.9,
    emoji: "🎒",
    color: "green",
  },
];
const daily = [18, 24, 21, 30, 25, 28, 20, 33, 30, 42, 34, 39, 32, 48, 40];
const navigation = [
  { label: "Visão geral", icon: LayoutDashboard },
  { label: "Pedidos", icon: ShoppingCart },
  { label: "Produtos", icon: Package },
  { label: "Clientes", icon: Users },
];
function App() {
  const [page, setPage] = useState("Visão geral");
  const [period, setPeriod] = useState("Este mês");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Todos os status");
  const [menu, setMenu] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [selected, setSelected] = useState<(typeof orders)[number] | null>(
    null,
  );
  const [notice, setNotice] = useState("");
  const factor =
    period === "Últimos 7 dias" ? 0.26 : period === "Últimos 3 meses" ? 2.8 : 1;
  const data = daily.map((v, i) => ({
    day: `${i * 2 + 1} out`,
    atual: v * 100 * factor,
    anterior: (v * 0.65 + (i % 3) * 5) * 100 * factor,
  }));
  const filtered = orders.filter(
    (o) =>
      `${o.name} ${o.id} ${o.product}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (status === "Todos os status" || o.status === status),
  );
  function exportReport() {
    const rows = [
      ["Pedido", "Cliente", "Produto", "Valor", "Status"],
      ...filtered.map((o) => [
        o.id,
        o.name,
        o.product,
        o.amount.toFixed(2),
        o.status,
      ]),
    ];
    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + rows.map((row) => row.join(";")).join("\n")], {
        type: "text/csv;charset=utf-8",
      }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "relatorio-pedidos.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    setNotice("Relatório exportado com sucesso.");
    window.setTimeout(() => setNotice(""), 4000);
  }
  return (
    <div className="app-shell">
      {menu && (
        <button
          className="mobile-backdrop"
          aria-label="Fechar menu"
          onClick={() => setMenu(false)}
        />
      )}
      <aside className={`sidebar ${menu ? "open" : ""}`}>
        <a href="#" className="brand" onClick={() => setPage("Visão geral")}>
          <span className="brand-mark">
            <ShoppingBag size={23} />
          </span>
          nexo<span className="brand-dot">.</span>
        </a>
        <div className="store">
          <span className="store-icon">
            <ShoppingBag size={18} />
          </span>
          <div>
            <strong>Minha loja</strong>
            <small>Plano Professional</small>
          </div>
          <ChevronDown size={15} />
        </div>
        <div className="nav-caption">PRINCIPAL</div>
        <nav>
          {navigation.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={page === label ? "active" : ""}
              onClick={() => {
                setPage(label);
                setMenu(false);
                setSearch("");
              }}
            >
              <Icon size={19} />
              {label}
              {label === "Pedidos" && <span className="nav-count">5</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card">
            <span className="help-symbol">
              <CircleHelp size={20} />
            </span>
            <strong>Um impulso para sua loja</strong>
            <p>Encontre dicas para vender mais e ir além.</p>
            <button
              onClick={() => {
                setPage("Central de ajuda");
                setMenu(false);
              }}
            >
              Explorar dicas <ArrowUpRight size={15} />
            </button>
          </div>
          <button
            className="settings-link"
            onClick={() => {
              setPage("Configurações");
              setMenu(false);
            }}
          >
            <Settings size={19} />
            Configurações
          </button>
          <div className="profile">
            <span className="avatar purple">LP</span>
            <div>
              <strong>Leandro Prado</strong>
              <small>Administrador</small>
            </div>
            <span className="online" />
          </div>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <div className="breadcrumb">
            <button
              className="mobile-toggle icon-button"
              aria-label="Abrir menu"
              onClick={() => setMenu(true)}
            >
              <Menu size={20} />
            </button>
            <span>Painel da loja</span>
            <span className="slash">/</span>
            <strong>{page}</strong>
          </div>
          <div className="top-actions">
            <span className="demo-pill">
              <span />
              Modo demonstração
            </span>
            <button
              className="icon-button notification-button"
              aria-label="Notificações"
              onClick={() => setNotifications(!notifications)}
            >
              <Bell size={20} />
              <i />
            </button>
            <span className="top-divider" />
            <span className="avatar purple small">LP</span>
          </div>
          {notifications && (
            <div className="notification-panel">
              <strong>Você está em dia ✨</strong>
              <p>Os 5 pedidos demonstrativos já estão disponíveis no painel.</p>
            </div>
          )}
        </header>
        <main>
          <section className="page-heading">
            <div>
              <div className="eyebrow">SEU NEGÓCIO, EM PERSPECTIVA</div>
              <h1>{page === "Visão geral" ? "Visão geral da loja" : page}</h1>
              <p>
                {page === "Visão geral"
                  ? "Bem-vindo de volta, Leandro. Vamos acompanhar seus resultados?"
                  : "Tudo o que você precisa, em um só lugar."}
              </p>
            </div>
            <button className="button export" onClick={exportReport}>
              <ArrowDownToLine size={17} />
              Exportar relatório
            </button>
          </section>
          {page === "Visão geral" && (
            <>
              <section className="period-row">
                <div className="live-label">
                  <span />
                  Visão do desempenho{" "}
                  <span className="period-description">• Outubro de 2026</span>
                </div>
                <label className="period-select">
                  <CalendarDays size={16} />
                  <select
                    aria-label="Período"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                  >
                    <option>Este mês</option>
                    <option>Últimos 7 dias</option>
                    <option>Últimos 3 meses</option>
                  </select>
                </label>
              </section>
              <section className="metrics">
                {[
                  {
                    label: "Receita total",
                    value: money(48592.8 * factor),
                    change: "18,6%",
                    icon: CreditCard,
                    positive: true,
                    points: "0,30 12,24 24,28 36,16 48,21 60,8 72,13 84,1",
                  },
                  {
                    label: "Pedidos realizados",
                    value: Math.round(1248 * factor).toLocaleString("pt-BR"),
                    change: "12,8%",
                    icon: ShoppingBag,
                    positive: true,
                    points: "0,30 12,25 24,28 36,15 48,19 60,12 72,17 84,3",
                  },
                  {
                    label: "Ticket médio",
                    value: money(
                      (48592.8 * factor) / Math.round(1248 * factor),
                    ),
                    change: "5,2%",
                    icon: Box,
                    positive: true,
                    points: "0,30 12,23 24,27 36,20 48,23 60,9 72,14 84,4",
                  },
                  {
                    label: "Taxa de conversão",
                    value: "3,42%",
                    change: "0,4%",
                    icon: Users,
                    positive: false,
                    points: "0,5 12,10 24,6 36,20 48,15 60,24 72,20 84,29",
                  },
                ].map((metric) => (
                  <article className="metric card" key={metric.label}>
                    <div className="metric-top">
                      <span>{metric.label}</span>
                      <span className="metric-icon">
                        <metric.icon size={17} />
                      </span>
                    </div>
                    <strong className="metric-value">{metric.value}</strong>
                    <div className="metric-bottom">
                      <div>
                        <span
                          className={
                            metric.positive ? "trend up" : "trend down"
                          }
                        >
                          {metric.positive ? (
                            <ArrowUpRight size={14} />
                          ) : (
                            <ArrowDownRight size={14} />
                          )}
                          {metric.change}
                        </span>
                        <span className="comparison"> vs. mês anterior</span>
                      </div>
                      <svg
                        viewBox="0 0 84 36"
                        className={`sparkline ${metric.positive ? "" : "negative"}`}
                        aria-hidden="true"
                      >
                        <polyline points={metric.points} />
                      </svg>
                    </div>
                  </article>
                ))}
              </section>
              <section className="charts-grid">
                <article className="card revenue-card">
                  <div className="card-heading">
                    <div>
                      <h2>Evolução da receita</h2>
                      <p>Uma visão das suas vendas ao longo do tempo</p>
                    </div>
                    <span className="badge">{period}</span>
                  </div>
                  <div className="chart-summary">
                    <strong>{money(48592.8 * factor)}</strong>
                    <span className="trend up">
                      <ArrowUpRight size={14} />
                      18,6%
                    </span>
                    <span className="chart-legend">
                      <i />
                      Atual <i className="previous" />
                      Anterior
                    </span>
                  </div>
                  <div className="revenue-chart">
                    <Suspense
                      fallback={
                        <div className="chart-loading">Carregando gráfico…</div>
                      }
                    >
                      <RevenueChart data={data} />
                    </Suspense>
                  </div>
                </article>
                <article className="card channels-card">
                  <div className="card-heading">
                    <div>
                      <h2>Origem das vendas</h2>
                      <p>De onde vêm seus clientes</p>
                    </div>
                  </div>
                  <div className="donut">
                    <div>
                      <span>Total de vendas</span>
                      <strong>
                        {Math.round(1248 * factor).toLocaleString("pt-BR")}
                      </strong>
                      <small>neste período</small>
                    </div>
                  </div>
                  <div className="channels">
                    {[
                      { name: "Loja online", value: 58, color: "#7955e7" },
                      { name: "Instagram", value: 24, color: "#af98ef" },
                      { name: "Marketplace", value: 18, color: "#e1d8f9" },
                    ].map((c) => (
                      <div key={c.name}>
                        <span>
                          <i style={{ background: c.color }} />
                          {c.name}
                        </span>
                        <strong>{c.value}%</strong>
                      </div>
                    ))}
                  </div>
                </article>
              </section>
            </>
          )}
          {(page === "Visão geral" || page === "Pedidos") && (
            <section className="card orders-card">
              <div className="card-heading">
                <div>
                  <h2>
                    {page === "Pedidos"
                      ? "Todos os pedidos"
                      : "Pedidos recentes"}{" "}
                    <span className="count-badge">{orders.length}</span>
                  </h2>
                  <p>Acompanhe as últimas movimentações da sua loja</p>
                </div>
                {page === "Visão geral" && (
                  <button
                    className="text-button"
                    onClick={() => setPage("Pedidos")}
                  >
                    Ver todos os pedidos <ArrowRight size={15} />
                  </button>
                )}
              </div>
              <div className="table-filters">
                <label className="search">
                  <Search size={16} />
                  <input
                    aria-label="Buscar pedidos"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar por nome, pedido ou produto..."
                  />
                </label>
                <select
                  className="status-select"
                  aria-label="Filtrar status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option>Todos os status</option>
                  <option>Concluído</option>
                  <option>Em transporte</option>
                  <option>Pendente</option>
                </select>
              </div>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Pedido</th>
                      <th>Cliente</th>
                      <th>Produto</th>
                      <th>Valor</th>
                      <th>Status</th>
                      <th>Data</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((o) => (
                      <tr key={o.id}>
                        <td className="order-id">{o.id}</td>
                        <td>
                          <div className="customer">
                            <span className={`avatar ${o.color}`}>
                              {o.initials}
                            </span>
                            <div>
                              <strong>{o.name}</strong>
                              <small>{o.email}</small>
                            </div>
                          </div>
                        </td>
                        <td>{o.product}</td>
                        <td className="amount">{money(o.amount)}</td>
                        <td>
                          <span
                            className={`status ${o.status === "Concluído" ? "complete" : o.status === "Pendente" ? "pending" : "shipping"}`}
                          >
                            <i />
                            {o.status}
                          </span>
                        </td>
                        <td className="date">{o.date}</td>
                        <td>
                          <button
                            className="icon-button"
                            aria-label={`Detalhes do pedido ${o.id}`}
                            onClick={() => setSelected(o)}
                          >
                            <ArrowUpRight size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <div className="empty-state">
                    Nenhum pedido encontrado. Experimente outra busca ou status.
                  </div>
                )}
              </div>
              <div className="table-footer">
                <span>
                  Mostrando {filtered.length} de {orders.length} pedidos
                </span>
                <span>Dados demonstrativos</span>
              </div>
            </section>
          )}
          {(page === "Visão geral" || page === "Produtos") && (
            <section className="card products-card">
              <div className="card-heading">
                <div>
                  <h2>Produtos mais vendidos</h2>
                  <p>Os favoritos dos seus clientes neste mês</p>
                </div>
                {page === "Visão geral" && (
                  <button
                    className="text-button"
                    onClick={() => setPage("Produtos")}
                  >
                    Ver produtos <ArrowRight size={15} />
                  </button>
                )}
              </div>
              <div className="product-grid">
                {products.map((p, index) => (
                  <article className="product" key={p.name}>
                    <div className={`product-image ${p.color}`}>
                      <span>{p.emoji}</span>
                      <small>0{index + 1}</small>
                    </div>
                    <div>
                      <h3>{p.name}</h3>
                      <p>{p.category}</p>
                      <strong>{money(p.price)}</strong>
                      <span className="product-sales">{p.count} vendidos</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
          {page === "Clientes" && (
            <section className="card">
              <div className="card-heading">
                <div>
                  <h2>Seus clientes</h2>
                  <p>Clientes dos pedidos demonstrativos</p>
                </div>
              </div>
              <div className="client-grid">
                {orders.map((o) => (
                  <article className="client-card" key={o.id}>
                    <span className={`avatar ${o.color}`}>{o.initials}</span>
                    <h3>{o.name}</h3>
                    <p>{o.email}</p>
                    <span>1 pedido · {money(o.amount)}</span>
                  </article>
                ))}
              </div>
            </section>
          )}
          {page === "Configurações" && (
            <section className="card settings-card">
              <h2>Minha loja</h2>
              <p>
                Esta é uma loja demonstrativa. Os dados são fictícios e não há
                integração com pagamentos ou banco de dados.
              </p>
              <dl>
                <dt>Moeda</dt>
                <dd>Real brasileiro (BRL)</dd>
                <dt>Idioma</dt>
                <dd>Português do Brasil</dd>
                <dt>Responsável</dt>
                <dd>Leandro Prado</dd>
              </dl>
            </section>
          )}
          {page === "Central de ajuda" && (
            <section className="card settings-card">
              <h2>Pequenas ações, grandes resultados</h2>
              <h3>Acompanhe seus indicadores</h3>
              <p>
                Compare períodos no painel para entender a evolução da receita e
                dos pedidos.
              </p>
              <h3>Conheça seus produtos favoritos</h3>
              <p>
                Use os produtos mais vendidos para planejar estoque e campanhas.
              </p>
              <h3>Organize seus pedidos</h3>
              <p>
                Filtre pedidos por status e exporte um relatório CSV para
                analisar os dados.
              </p>
            </section>
          )}
          <footer className="page-footer">
            <span>Feito para o próximo passo do seu negócio.</span>
            <span>
              nexo<span className="brand-dot">.</span>{" "}
              <span className="footer-year">© 2026</span>
            </span>
          </footer>
        </main>
      </div>
      {notice && (
        <div className="toast" role="status">
          {notice}
        </div>
      )}
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <section
            className="modal card"
            role="dialog"
            aria-modal="true"
            aria-label="Detalhes do pedido"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Escape") setSelected(null);
            }}
          >
            <button
              autoFocus
              className="icon-button close-modal"
              aria-label="Fechar detalhes"
              onClick={() => setSelected(null)}
            >
              <X size={20} />
            </button>
            <span className="eyebrow">DETALHES DO PEDIDO</span>
            <h2>{selected.id}</h2>
            <p>{selected.name}</p>
            <p>{selected.email}</p>
            <hr />
            <h3>{selected.product}</h3>
            <strong className="modal-amount">{money(selected.amount)}</strong>
            <p>
              {selected.status} · {selected.date}
            </p>
            <small>Pedido fictício para demonstração.</small>
          </section>
        </div>
      )}
    </div>
  );
}
export default App;
