# Corporación CoHe

Landing page corporativa para la venta e integración de soluciones forenses digitales en El Salvador. Incluye una escena de laboratorio en Three.js, portafolio de soluciones, sección de partners, biblioteca de videos y contacto comercial.

## Ejecutar localmente

Requisitos: Node.js 22 o superior y Git. El proyecto utiliza pnpm 10.15.1.

```sh
git clone https://github.com/ceshstreet/Cohe.git
cd Cohe
npx --yes pnpm@10.15.1 install --frozen-lockfile
npx --yes pnpm@10.15.1 dev
```

Abrir http://127.0.0.1:5220/. Si ese puerto está ocupado:

```sh
npx --yes pnpm@10.15.1 dev --port 5223
```

## Verificar y compilar

```sh
npx --yes pnpm@10.15.1 test
npx --yes pnpm@10.15.1 build
```

La compilación produce `dist/`. Compartir o publicar esa carpeta completa mediante un servidor web; abrir `index.html` con doble clic no es compatible con la configuración actual.

Para revisar la compilación:

```sh
npx --yes pnpm@10.15.1 preview
```

La configuración actual supone que el sitio se publica en la raíz del dominio. Para publicarlo bajo una ruta como `/Cohe/`, configurar primero el `base` de Vite y volver a compilar.

## Archivos principales

- `src/App.tsx`: contenido comercial, escena 3D, videos y formulario.
- `src/index.css`: estilos y diseño adaptable.
- `index.html`: título, descripción e icono del sitio.
- `production/test-forensics.cjs`: comprobaciones del sitio.
- `.github/workflows/ci.yml`: pruebas y compilación en Linux y Windows.

React 18, TypeScript, Vite, Three.js y Lucide. El sitio actual no requiere un backend.

## Funciones pendientes de producción

- El correo `ventas@corporacioncohe.sv` y el teléfono `+503 0000 0000` son datos provisionales que deben confirmarse.
- El formulario prepara una solicitud mediante `mailto:`; requiere un cliente de correo y no envía ni almacena solicitudes en un servidor.
- Los videos seleccionados se previsualizan únicamente en la sesión del navegador. No se suben a un servidor ni quedan publicados para otros visitantes.
- Los nombres y logos reales de los partners todavía deben incorporarse.

## Origen y licencia

Este proyecto se adaptó de [VEYRA de Amir Mušić](https://github.com/amirmushichge/veyra-interactive-car), publicado bajo MIT. Se conservan [LICENSE](LICENSE), [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) y el historial de origen.

Las guías de `docs/`, los archivos del reproductor anterior y `reference-manifest.json` corresponden al proyecto VEYRA original. `verify:reference` compara con esa versión y no es una comprobación de aceptación del sitio adaptado de CoHe.
