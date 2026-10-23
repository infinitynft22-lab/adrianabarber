// Only publish approved studio information. Empty contacts never point to another business.
export const business = {
  name: "ADRIANA BARBER",
  whatsapp: "18292916897",
  address: "",
  hours: "",
  socials: { instagram: "", tiktok: "", youtube: "" },
};
export const services = [
  {
    name: "Fade o Taper",
    description:
      "Degradado limpio, contornos definidos y atención a cada detalle.",
    duration: "40 min aprox.",
    price: null,
    image: "/assets/stock/fade-side.jpg",
    alt: "Referencia de degradado con contornos definidos",
  },
  {
    name: "Corte + barba",
    description: "El look completo. Corte, perfilado y definición de barba.",
    duration: "50 min aprox.",
    price: null,
    image: "/assets/stock/beard.jpg",
    alt: "Referencia de corte y barba perfilada",
  },
  {
    name: "Corte para niños",
    description: "Un estilo fresco para los más pequeños, con calma y cuidado.",
    duration: "35 min aprox.",
    price: null,
    image: "/assets/stock/kids-close.jpg",
    alt: "Referencia de corte infantil",
  },
  {
    name: "Experiencia VIP",
    description:
      "Corte, barba, toalla caliente y cuidado facial. Tiempo para ti.",
    duration: "75 min aprox.",
    price: null,
    image: "/assets/stock/vip.jpg",
    alt: "Referencia de tratamiento con toalla caliente",
  },
];
export const extras = [
  {
    name: "Corte en días festivos",
    description: "Consulta las fechas disponibles",
  },
  {
    name: "Cita fuera de horario",
    description: "Un momento que encaje contigo",
  },
  {
    name: "Cita a primera hora",
    description: "Empieza el día con tu mejor look",
  },
  {
    name: "Servicio a domicilio",
    description: "Consulta cobertura y disponibilidad",
  },
  { name: "Color y diseños", description: "Un cambio con personalidad" },
  {
    name: "Cita de última hora",
    description: "Sujeta a disponibilidad del estudio",
  },
];
export const gallery = [
  {
    image: "/assets/stock/fade-side.jpg",
    alt: "Fade lateral y barba definida",
    label: "FADE / BARBA",
    categories: ["fade", "beard"],
  },
  {
    image: "/assets/stock/design.jpg",
    alt: "Diseño geométrico de corte",
    label: "DISEÑO",
    categories: ["design"],
  },
  {
    image: "/assets/stock/fade.jpg",
    alt: "Modelo con barba y corte corto",
    label: "BARBA / CORTE CORTO",
    categories: ["beard"],
  },
  {
    image: "/assets/stock/kids-close.jpg",
    alt: "Corte infantil con contornos limpios",
    label: "NIÑOS",
    categories: ["kids"],
  },
  {
    image: "/assets/stock/color.jpg",
    alt: "Modelo con cabello teñido",
    label: "COLOR",
    categories: ["color"],
  },
  {
    image: "/assets/stock/beard.jpg",
    alt: "Acabado de barba y corte",
    label: "BARBA",
    categories: ["beard"],
  },
  {
    image: "/assets/stock/beard-detail.jpg",
    alt: "Perfilado de barba en barbería",
    label: "ACABADO DE BARBA",
    categories: ["beard"],
  },
];
