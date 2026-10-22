# ADRIANA BARBER · Barber Studio

Réplica visual adaptada de la página mostrada en el video de WhatsApp del 19 de octubre de 2026. React 19 + Vite; interfaz en español, logo original blanco con transparencia, tipografías Barlow y DM Mono.

## Referencia y adaptación

La web identificada en el video es [Menor Da Barber Studios](https://menordabarberstudios.com/). Se conserva su composición: navegación superior, portada fotográfica, título en tres líneas, acento azul, cuatro servicios, productos, seis opciones adicionales, galería, presentación, opiniones y ubicación. La secuencia de redes sociales también aparece en el video.

Se usó el archivo `Recurso 1adriana barber.png` sin modificar su diseño ni transparencia. La portada es una imagen ilustrativa generada para este proyecto, sin personas ni marcas de otro negocio. No representa una fotografía real del establecimiento de Adriana.

Las fotografías de modelos, servicios y galería provienen de Pexels y están identificadas como imágenes de inspiración, no como clientes o trabajos realizados por ADRIANA BARBER. Los archivos se sirven localmente desde `public/assets/stock/`; fuentes, autores y licencia están documentados en `src/data/stock-photos.json` y `photo-credits.md`. Se sustituyeron todas las fotografías del negocio del video. El catálogo contiene 18 productos de la referencia; sus enlaces a Amazon no incluyen la etiqueta de afiliado del otro negocio.

## Funcionamiento

- Navegación por secciones y menú móvil con cierre por Escape.
- Catálogo con categorías, búsqueda, resultados vacíos y enlaces externos.
- Galería con filtros y ampliación con anterior/siguiente.
- Consulta de cita con servicio preseleccionado, fecha, preferencia, nombre y notas. Permite preparar, editar y copiar el mensaje.
- Sin base de datos, cobros ni citas confirmadas. El formulario no envía información a terceros automáticamente.

## Datos pendientes

Configurar `src/data/business.js`: WhatsApp internacional verificado, dirección, horario y redes. Confirmar servicios, duraciones y precios. Por defecto, no se inventan contactos, tarifas, disponibilidad ni reseñas. Cuando se configure WhatsApp, el botón de consulta abrirá el mensaje preparado para que el visitante lo envíe.

Los datos introducidos en la consulta permanecen en memoria durante la interacción; no se almacenan en disco ni en un servidor.

## Desarrollo y validación

```sh
npm install
npm run dev -- --host 0.0.0.0 --port 4173 --strictPort
npm run build
npm run test:sites
```

El paquete está preparado para hosting estático y para Sites. `dist/client` contiene el frontend. Los archivos de `worker/`, `.openai/` y `scripts/prepare-sites-build.mjs` forman parte de la plantilla de publicación.

La revisión visual y los recorridos probados se documentan en `design-qa.md`. Las capturas de evidencia permanecen localmente en `.qa/`, excluidas de Git.

Sitio público: https://adrianabarber.vercel.app/. Código: https://github.com/infinitynft22-lab/adrianabarber. El proyecto de Vercel pertenece al equipo `adrianabarber`; la conexión automática con GitHub está pendiente de configuración.
