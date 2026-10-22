# Revisión visual y funcional

**final result: passed**

Alcance: réplica frontend adaptada a ADRIANA BARBER, con datos comerciales todavía pendientes. Este resultado corresponde a la vista previa local y sus interacciones; no certifica reservas reales, autenticación, base de datos ni despliegue público.

## Referencias y evidencia

- Video original: `C:/Users/TECH-G/Downloads/WhatsApp Video 2026-10-19 at 8.47.36 AM.mp4`.
- Pantallas extraídas: `.reference/frame-66.jpg` (portada), `.reference/frame-9.jpg` (servicios), `.reference/frame-54.jpg` y `.reference/frame-57.jpg` (catálogo).
- Sitio identificado y verificado en navegador: https://menordabarberstudios.com/.
- Fuentes de verdad capturadas: `.qa/reference-hero.png`, `.qa/reference-services.png`.
- Implementación: `.qa/adriana-desktop.png`, `.qa/adriana-services.png`, `.qa/adriana-mobile.png`, `.qa/services-320.png`, `.qa/booking-mobile.png`, `.qa/booking-result.png`, `.qa/catalog.png`.
- Comparaciones conjuntas: `.qa/comparison-hero.jpg`, `.qa/comparison-services.jpg`. Se abrieron con `view_image`, con referencia e implementación en una misma imagen.
- Navegador: Codex in-app browser, mediante CUA. No se utilizó Playwright CLI ni un navegador externo.
- Escritorio: viewport CSS 1280 × 720. Las capturas de ambas páginas devuelven 1265 × 712 píxeles por el área efectiva de captura de la aplicación. Se compararon a la misma dimensión, con escalado uniforme idéntico al generar la hoja conjunta de 2560 × 750. Los DPR informados por las pestañas fueron 1.375 y aproximadamente 1.0; los archivos efectivos tienen igual tamaño. No se compararon los marcos del monitor filmado como si fueran píxeles de la interfaz.
- Responsive: 390 × 844, 320 × 740 y 768 × 1024 CSS px. Sin ancho horizontal excedente en los tres tamaños.

## Comparación y correcciones

### Primera iteración

- **P2, servicios:** título menor que la referencia (61.44 px frente a 81.92 px). Corregido a `clamp(46px, 6.4vw, 86px)`.
- **P2, servicios:** fotografías demasiado altas (248.69 px frente a 210.50 px). Se corrigió la relación de aspecto a 1.3 y la separación de columnas a 26 px. Resultado medido: 210.80 px de alto y 274.05 px de ancho, frente a 210.50 y 274.09 px de la referencia.
- **P2, ambiente:** faltaba el interior fotográfico tenue tras los servicios. Corregido con la portada ilustrativa y las capas oscuras de la misma paleta.
- **P2, ritmo:** ajustes de padding, separación de título/subtítulo y tamaño de nombre del servicio. La fotografía inicia en Y=388.99 en la implementación frente a Y=392.22 en la captura de referencia.

### Segunda iteración

Nueva captura de servicios y hoja conjunta abiertas con `view_image`. Se comprobaron las correcciones anteriores; no quedan P0/P1/P2 accionables dentro del alcance de la adaptación.

### Comprobación adicional a 320 px

- **P2, ancho mínimo:** la barra de desplazamiento vertical de Windows reduce el ancho útil de una ventana de 320 px a 305 px. El `min-width: 320px` del body producía 15 px de desplazamiento horizontal. Se redujo el mínimo del body a 280 px y se comprobó `scrollWidth` contra `clientWidth`, además de `innerWidth`.
- Evidencia posterior: viewport 320 px, `clientWidth=305`, `scrollWidth=305`; no hay desbordamiento. Se recapturó y abrió `.qa/services-320.png` tras la corrección. La captura final de escritorio y su hoja comparativa también se actualizaron. Sin P0/P1/P2 pendientes en la adaptación.

## Cinco superficies obligatorias

1. **Tipografía:** Barlow en títulos, textos y controles; DM Mono en rótulos. Título de portada grande de tres líneas, acento azul en la tercera. Se corrigió el tamaño de servicios con medición directa del navegador.
2. **Espaciado y composición:** cabecera de 88 px, contenedor aproximado de 1180 px, portada a pantalla completa, cuatro columnas en escritorio y dos en móvil, bloques alternos y galería de tres columnas en escritorio. Fotografías de servicios corregidas mediante comparación focalizada.
3. **Colores:** fondo negro azulado, acento `#58b8ff`, botones `#155eef`, bordes sutiles y texto secundario desaturado. Se conserva el contraste oscuro observado en el video.
4. **Imágenes:** logo suministrado con transparencia intacta, fotografías de stock de Pexels para servicios/galería, productos descargados localmente y portada ilustrativa nueva sin personas. Los modelos de stock están identificados en la interfaz y en README.
5. **Texto:** adaptación deliberada al español y a ADRIANA BARBER. No se copiaron calificaciones, reseñas, teléfono, dirección, cuentas sociales ni experiencia profesional del otro negocio. Revisión de portada: los rótulos y las acciones coinciden con la lista de texto implementada; no hay datos comerciales inventados.

## Interacciones probadas

- Navegación de escritorio por secciones y estado activo.
- Menú móvil: abre, navega y se cierra; Escape dispone de controlador.
- Reserva desde portada y desde la segunda tarjeta, con el servicio seleccionado.
- Formulario con fecha futura, nombre y notas; preparación del resumen sin envío externo ni cobro.
- Edición de la consulta: preserva servicio, fecha, preferencia, nombre y notas, comprobados en los valores del DOM.
- Catálogo: 18 productos; búsqueda VIITOVA devuelve un resultado; búsqueda inexistente muestra estado vacío; filtros de piel y fijación muestran sus productos.
- Los enlaces de producto apuntan a Amazon sin etiqueta de afiliado de Menor Da Barber.
- Galería: filtro infantil devuelve una imagen; ampliación y botón siguiente cambian la foto y el contador.
- Recursos: sin imágenes rotas en el recorrido comprobado.
- Consola: sin avisos ni errores durante las pruebas.
- `npm run build`: correcto.
- `npm run test:sites`: cuatro pruebas correctas.

## Desviaciones deliberadas y límites

- Marca ADRIANA BARBER y textos en español. No se añadió selector de idioma porque la adaptación solicitada se preparó en español.
- Portada ilustrativa sin el propietario original; falta una foto real del estudio o de Adriana.
- Galería y servicios utilizan modelos de Pexels por solicitud del usuario. Se muestran como inspiración y no como portafolio de trabajos realizados. Créditos y licencia en `photo-credits.md`.
- Reseñas sustituidas por tres bloques de experiencia hasta disponer de opiniones verificadas; no hay estrellas ni testimonios ficticios.
- Dirección, horario, redes y tarifas no se inventan. Se configuran en `src/data/business.js`.
- El catálogo abre en un diálogo dentro de la misma página. La referencia pública actual usa una página separada. La búsqueda, filtros y enlaces funcionan dentro del prototipo.
- La reserva es una consulta local. No se ha configurado Booksy ni WhatsApp, ni se simula una confirmación o disponibilidad real.
- Evidencias guardadas localmente en carpetas excluidas de Git. No hay publicación externa ni remoto Git configurado.

## Lista de implementación

### Actualización de modelos de internet · 2026-10-19

Por solicitud del usuario, se sustituyeron las ocho fotografías originales del negocio del video por ocho imágenes de Pexels. Se retiraron los archivos anteriores del proyecto activo. Los créditos, enlaces de origen, fecha de descarga y licencia están en `src/data/stock-photos.json` y `photo-credits.md`.

Se inspeccionaron las fotos descargadas antes de colocarlas. Se eligió una toma infantil cercana para evitar un modelo demasiado pequeño en la tarjeta. La galería ahora se presenta como inspiración, sin atribuir esos cortes al estudio. Logo, portada, tipografía, rejillas y colores se conservaron.

Evidencia de navegador: `.qa/stock-services.png` y `.qa/stock-gallery.png`. Los cuatro servicios cargan las imágenes nuevas; el filtro Color devuelve una fotografía y la ampliación muestra el modelo correcto. Sin imágenes rotas, desbordamiento ni errores de consola en el recorrido revisado. `npm run build` correcto. Resultado de esta actualización: passed.

- [x] Comparación visual de portada y servicios con referencia e implementación juntas.
- [x] Correcciones de título, fotografías, fondo y ritmo.
- [x] Responsive y recorridos principales comprobados.
- [x] Build y empaquetado verificados.
- [x] Sustituir fotografías del negocio de referencia por modelos de Pexels, con créditos y licencia documentados.
- [ ] Completar datos comerciales aprobados.
- [ ] Configurar el canal real de reservas y el destino de publicación.
