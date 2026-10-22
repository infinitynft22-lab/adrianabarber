import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  X,
  List,
  Clock,
  Scissors,
  Check,
  MapPin,
  InstagramLogo,
  TiktokLogo,
  YoutubeLogo,
  Copy,
  CalendarBlank,
  Crown,
  House,
  Images,
} from "@phosphor-icons/react";
import products from "./data/products.json";
import { services, gallery, business, extras } from "./data/business";

const nav = [
  ["home", "Inicio"],
  ["services", "Servicios"],
  ["products", "Productos"],
  ["gallery", "Galería"],
  ["about", "Adriana Barber"],
  ["reviews", "Opiniones"],
  ["location", "Ubicación"],
];
const categories = [
  ["all", "Todos"],
  ["tools", "Máquinas y herramientas"],
  ["styling", "Fijación y estilo"],
  ["beard", "Barba"],
  ["skin", "Piel y afeitado"],
];
function Logo({ large = false }) {
  return (
    <a
      href="#home"
      className={`brand ${large ? "brand-large" : ""}`}
      aria-label="ADRIANA BARBER · Inicio"
    >
      <img src="/assets/adriana-barber-logo.png" alt="ADRIANA BARBER" />
    </a>
  );
}
function Button({ children, href, onClick, outline = false, className = "" }) {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      onClick={onClick}
      className={`button ${outline ? "outline" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
function Title({ eyebrow, children, description }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{children}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
function Modal({ children, onClose, className = "", label }) {
  const ref = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    ref.current.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-label={label}
      className={className}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <button
        className="icon-button close"
        aria-label="Cerrar"
        onClick={onClose}
      >
        <X size={23} />
      </button>
      {children}
    </dialog>
  );
}
function Booking({ service, onClose }) {
  const [request, setRequest] = useState(null),
    [copied, setCopied] = useState(false),
    [draft, setDraft] = useState(null);
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Santo_Domingo",
  });
  const message = request
    ? `Hola Adriana, soy ${request.name}. Quisiera consultar disponibilidad para ${request.service} el ${request.date}, ${request.period.toLowerCase()}.${request.notes ? " " + request.notes : ""}`
    : "";
  return (
    <Modal
      label="Consulta tu cita"
      onClose={onClose}
      className="booking-dialog"
    >
      {request ? (
        <>
          <div className="success">
            <Check size={28} />
          </div>
          <p className="eyebrow">TU PRÓXIMO LOOK</p>
          <h2>
            Tu solicitud,
            <br />
            <em>preparada.</em>
          </h2>
          <p className="dialog-description">
            Todavía no se ha enviado ni confirmado una cita. El estudio debe
            confirmar horario y precio.
          </p>
          <div className="request">
            <p>
              <Scissors />
              {request.service}
            </p>
            <p>
              <CalendarBlank />
              {request.date} · {request.period}
            </p>
            <p>{request.name}</p>
          </div>
          <p className="message">{message}</p>
          {business.whatsapp ? (
            <Button
              href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`}
            >
              Continuar en WhatsApp <ArrowUpRight />
            </Button>
          ) : (
            <>
              <Button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(message);
                    setCopied(true);
                  } catch {
                    setCopied(false);
                  }
                }}
              >
                <Copy />
                {copied ? "Solicitud copiada" : "Copiar solicitud"}
              </Button>
              <p className="note">
                El canal de reservas se habilitará cuando el estudio confirme su
                contacto.
              </p>
            </>
          )}
          <button className="text-button" onClick={() => setRequest(null)}>
            <ArrowLeft /> Editar solicitud
          </button>
        </>
      ) : (
        <>
          <p className="eyebrow">ADRIANA BARBER · BARBER STUDIO</p>
          <h2>
            Tu próximo corte
            <br />
            <em>empieza aquí.</em>
          </h2>
          <p className="dialog-description">
            Elige tu servicio y la fecha que prefieres. Prepara tu consulta de
            disponibilidad.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const next = Object.fromEntries(new FormData(e.currentTarget));
              setDraft(next);
              setCopied(false);
              setRequest(next);
            }}
          >
            <label>
              Servicio
              <select
                name="service"
                defaultValue={draft?.service || service || services[0].name}
              >
                {[...services, ...extras].map((s) => (
                  <option key={s.name}>{s.name}</option>
                ))}
              </select>
            </label>
            <div className="form-row">
              <label>
                Fecha preferida
                <input
                  name="date"
                  type="date"
                  min={today}
                  defaultValue={draft?.date}
                  required
                />
              </label>
              <label>
                Preferencia
                <select name="period" defaultValue={draft?.period}>
                  <option>Por la mañana</option>
                  <option>Por la tarde</option>
                  <option>Sin preferencia</option>
                </select>
              </label>
            </div>
            <label>
              Tu nombre
              <input
                name="name"
                defaultValue={draft?.name}
                autoComplete="name"
                placeholder="¿Cómo te llamas?"
                maxLength={80}
                required
              />
            </label>
            <label>
              Notas (opcional)
              <textarea
                name="notes"
                defaultValue={draft?.notes}
                placeholder="Cuéntanos qué look tienes en mente…"
                rows={2}
                maxLength={500}
              />
            </label>
            <Button>
              Preparar solicitud <ArrowUpRight />
            </Button>
            <p className="note">
              Consulta sin pago. Disponibilidad y precio por confirmar con el
              estudio.
            </p>
          </form>
        </>
      )}
    </Modal>
  );
}
function Product({ p }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={p.image} alt={p.name} loading="lazy" />
      </div>
      <div className="product-copy">
        <p className="eyebrow">{p.brand}</p>
        <h3>{p.name}</h3>
        <p>{p.description}</p>
      </div>
      <div className="product-footer">
        <span>Consultar precio</span>
        <a href={p.url} target="_blank" rel="noopener noreferrer">
          Ver en Amazon <ArrowUpRight />
        </a>
      </div>
    </article>
  );
}
function Catalog({ onClose }) {
  const [category, setCategory] = useState("all"),
    [search, setSearch] = useState("");
  const filtered = products.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      `${p.name} ${p.brand}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <Modal
      label="Catálogo de productos"
      onClose={onClose}
      className="catalog-dialog"
    >
      <Logo />
      <Title
        eyebrow="EL EQUIPO DETRÁS DEL ESTILO"
        description="Herramientas y cuidado personal. Consulta los precios actualizados directamente en Amazon."
      >
        Los esenciales.
        <br />
        <em>Sin atajos.</em>
      </Title>
      <input
        className="catalog-search"
        aria-label="Buscar productos"
        placeholder="Buscar producto o marca…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="filters">
        {categories.map(([id, label]) => (
          <button
            key={id}
            aria-pressed={category === id}
            onClick={() => setCategory(id)}
          >
            {label}
          </button>
        ))}
      </div>
      {filtered.length ? (
        <div className="product-grid">
          {filtered.map((p) => (
            <Product key={p.id} p={p} />
          ))}
        </div>
      ) : (
        <p className="empty">
          No encontramos productos. Prueba otra búsqueda o categoría.
        </p>
      )}
      <p className="reference-note">
        Selección ilustrativa de la web de referencia. Las compras se realizan
        en Amazon.
      </p>
    </Modal>
  );
}
function Lightbox({ index, onClose }) {
  const [current, setCurrent] = useState(index);
  function move(n) {
    setCurrent((c) => (c + n + gallery.length) % gallery.length);
  }
  return (
    <Modal label="Fotografía ampliada" className="lightbox" onClose={onClose}>
      <div
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") move(-1);
          if (e.key === "ArrowRight") move(1);
        }}
      >
        <img src={gallery[current].image} alt={gallery[current].alt} />
        <div className="lightbox-controls">
          <button
            className="icon-button"
            onClick={() => move(-1)}
            aria-label="Fotografía anterior"
          >
            <ArrowLeft />
          </button>
          <p>
            {gallery[current].alt}
            <small>
              {current + 1} / {gallery.length} · Modelo ilustrativo · Pexels
            </small>
          </p>
          <button
            className="icon-button"
            onClick={() => move(1)}
            aria-label="Fotografía siguiente"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </Modal>
  );
}
export function App() {
  const [menu, setMenu] = useState(false),
    [active, setActive] = useState("home"),
    [booking, setBooking] = useState(null),
    [catalog, setCatalog] = useState(false),
    [filter, setFilter] = useState("all"),
    [lightbox, setLightbox] = useState(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    document
      .querySelectorAll("main>section[id]")
      .forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    function close(e) {
      if (e.key === "Escape") setMenu(false);
    }
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>
      <header>
        <div className="shell header-inner">
          <Logo />
          <nav aria-label="Navegación principal" className={menu ? "open" : ""}>
            {nav.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
                onClick={() => setMenu(false)}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <Button onClick={() => setBooking("")} className="header-book">
              Reservar <ArrowUpRight />
            </Button>
            <button
              className="icon-button menu-toggle"
              aria-label={menu ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </header>
      <main id="main">
        <section id="home" className="hero">
          <img
            className="hero-background"
            src="/assets/studio-hero.png"
            alt="Interior ilustrativo de barbería con sillones negros e iluminación azul"
            fetchPriority="high"
          />
          <div className="hero-overlay" />
          <div className="shell">
            <p className="hero-kicker">ADRIANA BARBER · BARBER STUDIO</p>
            <h1>
              Precisión.
              <br />
              Detalle.
              <br />
              <em className="hero-brand">ADRIANA BARBER.</em>
            </h1>
            <p className="hero-lede">
              Barbería con carácter. Un estilo que habla de ti.
              <br />
              Tu próximo look, en manos de ADRIANA BARBER.
            </p>
            <div className="hero-actions">
              <Button onClick={() => setBooking("")}>
                Reserva tu corte <ArrowUpRight />
              </Button>
              <Button href="#services" outline>
                Ver servicios <ArrowDown />
              </Button>
            </div>
            <div className="hero-proof">
              <Scissors size={24} />
              <p>
                EL DETALLE
                <br />
                <strong>HACE LA DIFERENCIA.</strong>
              </p>
              <p>
                TU ESTILO.
                <br />
                <strong>TU FIRMA.</strong>
              </p>
            </div>
          </div>
          <div className="shell hero-footnote">
            <span>ADRIANA BARBER</span>
            <span>PRECISIÓN EN CADA DETALLE.</span>
            <a href="#services">
              Desliza para descubrir <ArrowDown />
            </a>
          </div>
        </section>
        <section id="services" className="services-section section-space">
          <div className="shell">
            <Title
              eyebrow="NUESTROS SERVICIOS"
              description="CORTES CON PRECISIÓN. CONFIANZA QUE SE NOTA."
            >
              El acabado es <em>la firma.</em>
            </Title>
            <div className="service-grid">
              {services.map((s, i) => (
                <article
                  className={`service-card ${i === 3 ? "vip" : ""}`}
                  key={s.name}
                >
                  <div className="service-image">
                    <img src={s.image} alt={s.alt} loading="lazy" />
                    {i === 3 && (
                      <span className="vip-badge">
                        <Crown weight="fill" /> EXPERIENCIA VIP
                      </span>
                    )}
                  </div>
                  <div className="service-body">
                    <h3>{s.name}</h3>
                    <p>{s.description}</p>
                    <div className="service-meta">
                      <span>
                        <Clock size={15} />
                        {s.duration}
                      </span>
                      <strong>{s.price || "Consultar"}</strong>
                    </div>
                    <button
                      className="service-book"
                      onClick={() => setBooking(s.name)}
                    >
                      RESERVAR <ArrowUpRight />
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <p className="signature">UN BUEN CORTE. OTRA ACTITUD.</p>
            <p className="reference-note">
              Servicios y duración ilustrativos. Modelos de banco de imágenes;
              tarifas por confirmar.
            </p>
          </div>
        </section>
        <section id="products" className="products-section section-space">
          <div className="shell">
            <Title
              eyebrow="ESENCIALES DE BARBERÍA"
              description="Herramientas profesionales y cuidado personal para llevar el acabado más allá del estudio."
            >
              Las herramientas
              <br />
              detrás de la <em>precisión.</em>
            </Title>
            <div className="center-action">
              <Button outline onClick={() => setCatalog(true)}>
                VER CATÁLOGO COMPLETO <ArrowUpRight />
              </Button>
            </div>
            <div className="product-grid">
              {products.slice(0, 4).map((p) => (
                <Product p={p} key={p.id} />
              ))}
            </div>
            <p className="reference-note">
              Catálogo de referencia. Precios y disponibilidad sujetos a Amazon.
            </p>
          </div>
        </section>
        <section className="extra-section section-space">
          <div className="shell split">
            <div>
              <p className="eyebrow">MÁS OPCIONES PARA TU ESTILO</p>
              <h2>
                Tu tiempo.
                <br />
                Tu estilo.
                <br />
                <em>Tu momento.</em>
              </h2>
              <p className="description">
                Opciones especiales para una experiencia a tu medida. Consulta
                disponibilidad con el estudio.
              </p>
            </div>
            <div className="extra-list">
              {extras.map((s, i) => (
                <button key={s.name} onClick={() => setBooking(s.name)}>
                  <span className="number">0{i + 1}</span>
                  <span>
                    {s.name}
                    <small>{s.description}</small>
                  </span>
                  <ArrowUpRight size={22} />
                </button>
              ))}
            </div>
          </div>
        </section>
        <section id="gallery" className="gallery-section section-space">
          <div className="shell">
            <Title
              eyebrow="INSPIRACIÓN PARA TU ESTILO"
              description="Cada ángulo cuenta. Cada detalle tiene intención."
            >
              De cerca.
              <br />
              <em>Aún mejor.</em>
            </Title>
            <div className="filters">
              {[
                ["all", "Todo"],
                ["fade", "Fades"],
                ["beard", "Barbas"],
                ["design", "Diseños"],
                ["color", "Color"],
                ["kids", "Niños"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  aria-pressed={filter === id}
                  onClick={() => setFilter(id)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="gallery-grid">
              {gallery.map(
                (g, i) =>
                  (filter === "all" || g.categories.includes(filter)) && (
                    <button
                      className="gallery-item"
                      key={g.image}
                      aria-label={`Ampliar: ${g.alt}`}
                      onClick={() => setLightbox(i)}
                    >
                      <img src={g.image} alt={g.alt} loading="lazy" />
                      <span>
                        {g.label}
                        <ArrowUpRight />
                      </span>
                    </button>
                  ),
              )}
            </div>
            <p className="reference-note">
              Modelos e imágenes de inspiración de Pexels. No representan trabajos
              realizados por ADRIANA BARBER.
            </p>
          </div>
        </section>
        <section id="about" className="about-section">
          <div className="about-visual">
            <img
              src="/assets/studio-hero.png"
              alt="Ambiente ilustrativo de barbería"
              loading="lazy"
            />
            <img
              className="about-logo"
              src="/assets/adriana-barber-logo.png"
              alt="ADRIANA BARBER"
            />
          </div>
          <div className="about-copy">
            <p className="eyebrow">ADRIANA BARBER · BARBER STUDIO</p>
            <h2>
              Una silla.
              <br />
              Tu estilo.
              <br />
              <em>Otro nivel.</em>
            </h2>
            <p>
              Un espacio para cuidar tu imagen, definir tu estilo y dedicar
              tiempo a los detalles que hacen la diferencia.
            </p>
            <p>
              Desde un fade limpio hasta una barba bien definida, todo empieza
              contigo.
            </p>
            <Button outline onClick={() => setBooking("")}>
              Conoce tu próximo look <ArrowUpRight />
            </Button>
          </div>
        </section>
        <section id="reviews" className="reviews-section section-space">
          <div className="shell">
            <Title
              eyebrow="LA EXPERIENCIA"
              description="Un buen corte se ve. Una buena experiencia se recuerda."
            >
              La confianza
              <br />
              también se <em>nota.</em>
            </Title>
            <div className="review-grid">
              {[
                [
                  "Precisión.",
                  "Líneas limpias, atención al detalle y un acabado cuidado.",
                ],
                ["Estilo.", "Una propuesta que acompaña tu personalidad."],
                [
                  "Experiencia.",
                  "Tiempo para ti, desde la primera consulta hasta el último detalle.",
                ],
              ].map(([title, copy]) => (
                <article className="review-card" key={title}>
                  <span>“</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
            <p className="reference-note">
              Espacio preparado para incorporar reseñas verificadas del estudio.
            </p>
          </div>
        </section>
        <section id="location" className="location-section section-space">
          <div className="shell split">
            <div>
              <p className="eyebrow">TU PRÓXIMA VISITA</p>
              <h2>
                Nos vemos
                <br />
                <em>en la silla.</em>
              </h2>
              <p className="description">Haz espacio para tu próximo look.</p>
              <Button onClick={() => setBooking("")}>
                Consulta tu cita <ArrowUpRight />
              </Button>
            </div>
            <div className="location-details">
              {[
                [
                  MapPin,
                  "Encuentra el estudio",
                  business.address || "La dirección se publicará próximamente.",
                ],
                [
                  Clock,
                  "Horario de atención",
                  business.hours || "Consulta el horario al coordinar tu cita.",
                ],
                [
                  CalendarBlank,
                  "Atención con cita",
                  "La disponibilidad se confirma directamente con el estudio.",
                ],
              ].map(([Icon, title, text]) => (
                <div key={title}>
                  <Icon size={24} />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="social-section">
          <div className="shell split">
            <div>
              <h2>
                Sigue
                <br />
                <em>el estilo.</em>
              </h2>
              <p className="description">
                Más cortes. Más detalles. Más inspiración.
              </p>
            </div>
            <div className="social-links">
              {[
                [YoutubeLogo, "YouTube", "youtube"],
                [TiktokLogo, "TikTok", "tiktok"],
                [InstagramLogo, "Instagram", "instagram"],
              ].map(([Icon, name, key]) => {
                const Tag = business.socials[key] ? "a" : "div";
                return (
                  <Tag
                    key={key}
                    href={business.socials[key] || undefined}
                    target={business.socials[key] ? "_blank" : undefined}
                    rel="noopener noreferrer"
                  >
                    <Icon size={32} />
                    <strong>{name}</strong>
                    <span>
                      {business.socials[key] ? "Ver perfil" : "Próximamente"}
                    </span>
                  </Tag>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="shell footer-main">
          <Logo large />
          <p>PRECISIÓN. DETALLE. ADRIANA BARBER.</p>
          <Button onClick={() => setBooking("")}>
            Tu próximo corte <ArrowUpRight />
          </Button>
        </div>
        <div className="shell footer-bottom">
          <span>
            © {new Date().getFullYear()} ADRIANA BARBER.
          </span>
          <a href="#home">
            VOLVER ARRIBA <ArrowUpRight />
          </a>
        </div>
      </footer>
      <nav className="mobile-dock" aria-label="Navegación móvil">
        <a href="#home" aria-current={active === "home" ? "page" : undefined}>
          <House size={21} weight={active === "home" ? "fill" : "regular"} />
          <span>Inicio</span>
        </a>
        <a href="#services" aria-current={active === "services" ? "page" : undefined}>
          <Scissors size={21} weight={active === "services" ? "fill" : "regular"} />
          <span>Servicios</span>
        </a>
        <a href="#gallery" aria-current={active === "gallery" ? "page" : undefined}>
          <Images size={21} weight={active === "gallery" ? "fill" : "regular"} />
          <span>Galería</span>
        </a>
        <button type="button" onClick={() => setBooking("")}>
          <CalendarBlank size={21} weight="fill" />
          <span>Reservar</span>
        </button>
      </nav>
      {booking !== null && (
        <Booking service={booking} onClose={() => setBooking(null)} />
      )}
      {catalog && <Catalog onClose={() => setCatalog(false)} />}
      {lightbox !== null && (
        <Lightbox index={lightbox} onClose={() => setLightbox(null)} />
      )}
    </>
  );
}
