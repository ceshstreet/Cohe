const assert = require('node:assert/strict')
const fs = require('node:fs')

const app = fs.readFileSync('src/App.tsx', 'utf8')
const css = fs.readFileSync('src/index.css', 'utf8')
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))

assert.match(app, /from 'three'/, 'The app should use Three.js for the 3D scene')
assert.match(app, /ShaderMaterial/, 'The scene should include shader-driven forensic visuals')
assert.match(app, /Soluciones forenses digitales para investigar con evidencia\./, 'The hero should match the sales landing direction')
assert.match(app, /Reseller e integrador en El Salvador/, 'The page should localize the offer for El Salvador')
assert.match(app, /Subir videos/, 'The page should include the requested video upload menu')
assert.match(app, /partners/i, 'The page should include partner positioning')
assert.doesNotMatch(app, /VEYRA|Electric vehicle design|exterior-polished/, 'The old automotive presentation should not remain in App')

for (const text of ['Forensia móvil', 'Cómputo forense', 'Respuesta e infraestructura', 'Laboratorio y evidencia']) {
  assert.match(app, new RegExp(text), `Missing solution ${text}`)
}

assert.match(css, /\.hero-canvas/, 'The WebGL hero canvas needs first-class styling')
assert.match(css, /height: 100svh/, 'The layout should fit modern mobile viewports')
assert.match(css, /@media \(max-width: 860px\)/, 'The redesigned interface needs a mobile breakpoint')
assert.equal(pkg.dependencies.three, '0.170.0', 'Three.js should stay pinned')

console.log('PASS: digital forensics reseller landing page, video menu, Three.js hero and responsive shell')
