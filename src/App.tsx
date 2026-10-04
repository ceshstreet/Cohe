import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import * as THREE from 'three'
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  FileVideo,
  GraduationCap,
  HardDrive,
  Laptop,
  Mail,
  Network,
  Phone,
  PlayCircle,
  Scale,
  ShieldCheck,
  Smartphone,
  Upload,
} from 'lucide-react'

type VideoItem = {
  id: string
  title: string
  tag: string
  source?: string
  note: string
}

const solutions = [
  {
    icon: Smartphone,
    title: 'Forensia móvil',
    copy: 'Extracción, preservación y análisis de teléfonos, SIM, mensajería, ubicación y multimedia con flujos defendibles.',
    points: ['Adquisición lógica y avanzada', 'Reportes para fiscalía y auditoría', 'Capacitación para unidades técnicas'],
  },
  {
    icon: Laptop,
    title: 'Cómputo forense',
    copy: 'Triage, imagen forense, recuperación de evidencia, análisis de navegadores, sistema operativo y actividad de usuario.',
    points: ['Workstations de laboratorio', 'Análisis de discos e imágenes', 'Procedimientos de cadena de custodia'],
  },
  {
    icon: Network,
    title: 'Respuesta e infraestructura',
    copy: 'Correlación de endpoints, logs, red y nube para investigar incidentes, accesos no autorizados y fuga de información.',
    points: ['Análisis de endpoints', 'Revisión de eventos y credenciales', 'Soporte para equipos de TI y seguridad'],
  },
  {
    icon: HardDrive,
    title: 'Laboratorio y evidencia',
    copy: 'Hardware, write blockers, estaciones, almacenamiento seguro y acompañamiento para montar o modernizar laboratorios.',
    points: ['Diseño de laboratorio', 'Equipamiento y licencias', 'Soporte local postventa'],
  },
]

const partnerTracks = [
  {
    label: 'Mobile intelligence',
    copy: 'Soluciones para adquisición, revisión y análisis de teléfonos en investigaciones civiles, penales y corporativas.',
  },
  {
    label: 'Digital evidence',
    copy: 'Plataformas de análisis forense para computadoras, medios extraíbles, nube, navegación y artefactos de usuario.',
  },
  {
    label: 'Lab hardware',
    copy: 'Equipos de laboratorio, write blockers, estaciones de trabajo, almacenamiento y accesorios de preservación.',
  },
]

const defaultVideos: VideoItem[] = [
  {
    id: 'intro-mobile',
    title: 'Demo comercial: extracción móvil',
    tag: 'Demo',
    note: 'Espacio para publicar un video corto del flujo de adquisición y revisión de evidencia móvil.',
  },
  {
    id: 'webinar-chain',
    title: 'Webinar: cadena de custodia',
    tag: 'Webinar',
    note: 'Material para explicar preservación, hashing, documentación y buenas prácticas para equipos legales.',
  },
  {
    id: 'case-ir',
    title: 'Caso de uso: incidente corporativo',
    tag: 'Caso',
    note: 'Video de ventas para áreas de TI, cumplimiento y seguridad que necesitan responder a eventos internos.',
  },
]

function App() {
  const [uploadedVideos, setUploadedVideos] = useState<VideoItem[]>([])
  const [leadStatus, setLeadStatus] = useState('')
  const createdUrls = useRef<string[]>([])
  const videos = useMemo(() => [...uploadedVideos, ...defaultVideos], [uploadedVideos])

  useEffect(() => () => {
    createdUrls.current.forEach((url) => URL.revokeObjectURL(url))
  }, [])

  function handleVideoUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []).filter((file) => file.type.startsWith('video/'))
    if (!files.length) return
    const nextVideos = files.map((file, index) => {
      const source = URL.createObjectURL(file)
      createdUrls.current.push(source)
      return {
        id: `${file.name}-${file.lastModified}-${index}`,
        title: file.name.replace(/\.[^.]+$/, ''),
        tag: 'Subido',
        source,
        note: 'Vista previa local. Para publicarlo en producción, súbelo al hosting o al CMS que uses.',
      }
    })
    setUploadedVideos((current) => [...nextVideos, ...current])
    event.target.value = ''
  }

  function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '')
    const organization = String(data.get('organization') ?? '')
    const email = String(data.get('email') ?? '')
    const interest = String(data.get('interest') ?? '')
    const body = [
      `Nombre: ${name}`,
      `Organización: ${organization}`,
      `Correo: ${email}`,
      `Interés: ${interest}`,
    ].join('\n')
    window.location.href = `mailto:ventas@corporacioncohe.sv?subject=${encodeURIComponent('Consulta sobre soluciones forenses')}&body=${encodeURIComponent(body)}`
    setLeadStatus('Se abrió tu cliente de correo con la solicitud preparada.')
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Corporación CoHe inicio">
          Corporación CoHe
        </a>
        <nav aria-label="Principal">
          <a href="#soluciones">Soluciones</a>
          <a href="#partners">Partners</a>
          <a href="#videos">Videos</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <a className="header-action" href="#contacto">
          <CalendarDays size={18} />
          Agendar
        </a>
      </header>

      <section id="inicio" className="hero-section">
        <ForensicHeroScene />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow">Reseller e integrador en El Salvador</p>
          <h1>Soluciones forenses digitales para investigar con evidencia.</h1>
          <p className="hero-copy">
            Ayudamos a instituciones, empresas y equipos legales a adquirir, analizar y presentar evidencia digital con herramientas de partners especializados, soporte local y capacitación en español.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#contacto">
              <CalendarDays size={19} />
              Solicitar diagnóstico
            </a>
            <a className="secondary-action" href="#videos">
              <PlayCircle size={19} />
              Ver recursos
            </a>
          </div>
        </div>
        <div className="hero-proof" aria-label="Capacidades principales">
          <div><span>Mercado</span><strong>El Salvador</strong></div>
          <div><span>Modelo</span><strong>Reseller local</strong></div>
          <div><span>Entrega</span><strong>Licencias, hardware y servicios</strong></div>
          <div><span>Soporte</span><strong>Implementación y formación</strong></div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Perfil comercial">
        <div><ShieldCheck size={24} /><span>Representación de partners forenses</span></div>
        <div><GraduationCap size={24} /><span>Capacitación para analistas y equipos legales</span></div>
        <div><Building2 size={24} /><span>Venta consultiva para sector público y empresa privada</span></div>
        <div><Scale size={24} /><span>Procesos pensados para auditoría y cadena de custodia</span></div>
      </section>

      <section id="soluciones" className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Portafolio</p>
          <h2>Del dispositivo incautado al reporte defendible.</h2>
          <p>Seleccionamos, licenciamos e implementamos tecnología forense según el tipo de evidencia, el volumen de casos y la madurez del laboratorio.</p>
        </div>
        <div className="solution-grid">
          {solutions.map((solution) => {
            const Icon = solution.icon
            return (
              <article className="solution-card" key={solution.title}>
                <Icon size={28} />
                <h3>{solution.title}</h3>
                <p>{solution.copy}</p>
                <ul>
                  {solution.points.map((point) => <li key={point}><CheckCircle2 size={16} />{point}</li>)}
                </ul>
              </article>
            )
          })}
        </div>
      </section>

      <section className="process-section">
        <div>
          <p className="eyebrow">Cómo vendemos</p>
          <h2>Menos caja cerrada, más solución completa.</h2>
        </div>
        <ol className="process-list">
          <li><span>01</span><strong>Diagnóstico técnico</strong><p>Revisamos casos, evidencia, equipos actuales, usuarios y restricciones de compra.</p></li>
          <li><span>02</span><strong>Arquitectura de solución</strong><p>Armamos combinación de licencias, hardware, entrenamiento y soporte.</p></li>
          <li><span>03</span><strong>Implementación local</strong><p>Acompañamos instalación, transferencia de conocimiento y adopción operativa.</p></li>
        </ol>
      </section>

      <section id="partners" className="content-section partners-section">
        <div className="section-heading">
          <p className="eyebrow">Partners</p>
          <h2>Representamos tecnología especializada sin improvisar el proceso.</h2>
          <p>Los nombres y logos de partners pueden colocarse aquí cuando estén aprobados para uso comercial. La estructura ya está preparada para portafolios de extracción móvil, análisis digital y hardware de laboratorio.</p>
        </div>
        <div className="partner-grid">
          {partnerTracks.map((partner) => (
            <article className="partner-card" key={partner.label}>
              <span>{partner.label}</span>
              <p>{partner.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="videos" className="content-section video-section">
        <div className="section-heading">
          <p className="eyebrow">Videos comerciales</p>
          <h2>Biblioteca para demos, webinars y casos de uso.</h2>
          <p>El menú acepta videos locales para preparar la landing. En producción se pueden conectar a un CMS, almacenamiento privado o canal de capacitación.</p>
        </div>
        <label className="upload-control">
          <Upload size={19} />
          Subir videos
          <input type="file" accept="video/*" multiple onChange={handleVideoUpload} />
        </label>
        <div className="video-grid">
          {videos.map((video) => (
            <article className="video-tile" key={video.id}>
              {video.source ? (
                <video controls src={video.source} />
              ) : (
                <div className="video-placeholder" aria-hidden="true">
                  <FileVideo size={34} />
                  <span>{video.tag}</span>
                </div>
              )}
              <div>
                <span>{video.tag}</span>
                <h3>{video.title}</h3>
                <p>{video.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contacto" className="contact-section">
        <div className="contact-copy">
          <p className="eyebrow">Contacto comercial</p>
          <h2>Hablemos de tu laboratorio, unidad o equipo de respuesta.</h2>
          <p>Comparte el tipo de evidencia y el objetivo de compra. Podemos preparar una ruta de solución, demo, capacitación o propuesta para licitación.</p>
          <div className="contact-methods">
            <a href="mailto:ventas@corporacioncohe.sv"><Mail size={18} />ventas@corporacioncohe.sv</a>
            <a href="tel:+50300000000"><Phone size={18} />+503 0000 0000</a>
          </div>
        </div>
        <form className="lead-form" onSubmit={handleLeadSubmit}>
          <label>
            Nombre
            <input name="name" autoComplete="name" required />
          </label>
          <label>
            Organización
            <input name="organization" autoComplete="organization" required />
          </label>
          <label>
            Correo
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Interés principal
            <select name="interest" defaultValue="Mobile forensics">
              <option>Mobile forensics</option>
              <option>Cómputo forense</option>
              <option>Laboratorio y hardware</option>
              <option>Capacitación y soporte</option>
              <option>Respuesta a incidentes</option>
            </select>
          </label>
          <button type="submit"><CalendarDays size={18} />Preparar correo</button>
          {leadStatus && <p role="status">{leadStatus}</p>}
        </form>
      </section>

      <footer className="site-footer">
        <span>Corporación CoHe</span>
        <span>Soluciones forenses digitales para El Salvador.</span>
      </footer>
    </main>
  )
}

function ForensicHeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true })
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x071015, 7, 17)

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60)
    camera.position.set(5.6, 3.8, 6.4)
    camera.lookAt(0, 0.7, 0)

    scene.add(new THREE.AmbientLight(0x9fcbd2, 1.4))
    const key = new THREE.DirectionalLight(0xb9f7ff, 3)
    key.position.set(4, 6, 4)
    scene.add(key)
    const cyan = new THREE.PointLight(0x7cf7d4, 18, 9)
    cyan.position.set(2, 1.8, 2.8)
    scene.add(cyan)
    const amber = new THREE.PointLight(0xffcd6b, 8, 7)
    amber.position.set(-2.8, 1.2, 1.6)
    scene.add(amber)

    const table = new THREE.Mesh(
      new THREE.BoxGeometry(12, 0.14, 7.2),
      new THREE.MeshStandardMaterial({ color: 0x0a1217, roughness: 0.72, metalness: 0.22 }),
    )
    table.position.y = -0.08
    scene.add(table)

    const grid = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 7.2),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { time: { value: 0 }, tint: { value: new THREE.Color(0x7cf7d4) } },
        vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
        fragmentShader: `
          uniform float time;
          uniform vec3 tint;
          varying vec2 vUv;
          float line(vec2 uv, float scale) {
            vec2 g = abs(fract(uv * scale - 0.5) - 0.5) / fwidth(uv * scale);
            return 1.0 - min(min(g.x, g.y), 1.0);
          }
          void main() {
            float gridLine = line(vUv, 12.0) * 0.26 + line(vUv, 36.0) * 0.08;
            float scan = smoothstep(0.08, 0.0, abs(fract(vUv.y * 1.5 + time * 0.08) - 0.5));
            gl_FragColor = vec4(tint, 0.14 + gridLine + scan * 0.1);
          }
        `,
      }),
    )
    grid.rotation.x = -Math.PI / 2
    grid.position.y = 0.006
    scene.add(grid)

    const lab = new THREE.Group()
    lab.add(makeLaptop())
    const phones = makePhones()
    phones.position.set(1.6, 0, 0.85)
    lab.add(phones)
    const server = makeServerStack()
    server.position.set(-2.8, 0, -0.7)
    lab.add(server)
    const evidence = makeEvidenceDrives()
    evidence.position.set(-1.5, 0, 1.6)
    lab.add(evidence)
    scene.add(lab)

    const particles = makeParticles()
    scene.add(particles)

    let width = 1
    let height = 1
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    let pointerX = 0
    let pointerY = 0
    const pointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    }

    const clock = new THREE.Clock()
    let raf = 0
    const render = () => {
      raf = window.requestAnimationFrame(render)
      const elapsed = clock.getElapsedTime()
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ;(grid.material as THREE.ShaderMaterial).uniforms.time.value = elapsed
      if (!reduced) {
        lab.rotation.y = Math.sin(elapsed * 0.25) * 0.05 + pointerX * 0.08
        lab.rotation.x = pointerY * 0.025
        particles.rotation.y += 0.0008
      }
      renderer.render(scene, camera)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', pointer)
    render()

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', pointer)
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          const materials = Array.isArray(object.material) ? object.material : [object.material]
          materials.forEach((material) => material.dispose())
        }
      })
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-canvas" aria-label="Escena 3D de laboratorio forense digital" />
}

function makeLaptop() {
  const group = new THREE.Group()
  const body = new THREE.MeshStandardMaterial({ color: 0x18252d, roughness: 0.45, metalness: 0.65 })
  const dark = new THREE.MeshStandardMaterial({ color: 0x071015, roughness: 0.8, metalness: 0.2 })
  const base = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.14, 1.8), body)
  base.position.set(0, 0.14, 0)
  group.add(base)
  const keyboard = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.03, 0.95), dark)
  keyboard.position.set(0, 0.235, 0.05)
  group.add(keyboard)
  const screenBack = new THREE.Mesh(new THREE.BoxGeometry(2.85, 1.6, 0.07), body)
  screenBack.position.set(0, 1.05, -0.76)
  screenBack.rotation.x = -0.18
  group.add(screenBack)
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(2.5, 1.28),
    new THREE.MeshBasicMaterial({ map: makeScreenTexture('FORENSIC SUITE', ['mobile.img', 'timeline.db', 'hash verified'], '#7cf7d4') }),
  )
  screen.position.set(0, 1.05, -0.715)
  screen.rotation.x = -0.18
  group.add(screen)
  return group
}

function makePhones() {
  const group = new THREE.Group()
  const accents = ['#7cf7d4', '#b7ff4f', '#72a7ff']
  accents.forEach((accent, index) => {
    const phone = new THREE.Group()
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.08, 1.16), new THREE.MeshStandardMaterial({ color: 0x10171e, roughness: 0.3, metalness: 0.75 }))
    phone.add(body)
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 0.9), new THREE.MeshBasicMaterial({ map: makeScreenTexture(`PHONE ${index + 1}`, ['chat', 'gps', 'media'], accent) }))
    screen.rotation.x = -Math.PI / 2
    screen.position.y = 0.046
    phone.add(screen)
    phone.position.set((index - 1) * 0.52, 0.18 + index * 0.02, index % 2 ? -0.15 : 0.22)
    phone.rotation.y = -0.35 + index * 0.3
    group.add(phone)
  })
  return group
}

function makeServerStack() {
  const group = new THREE.Group()
  const mat = new THREE.MeshStandardMaterial({ color: 0x121c25, roughness: 0.45, metalness: 0.65 })
  const glow = new THREE.MeshBasicMaterial({ color: 0x72a7ff, transparent: true, opacity: 0.75 })
  for (let i = 0; i < 5; i += 1) {
    const tray = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.2, 0.75), mat)
    tray.position.y = 0.17 + i * 0.26
    group.add(tray)
    const led = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.035, 0.02), glow)
    led.position.set(0.43, tray.position.y, 0.39)
    group.add(led)
  }
  return group
}

function makeEvidenceDrives() {
  const group = new THREE.Group()
  const mat = new THREE.MeshStandardMaterial({ color: 0x252a2d, roughness: 0.5, metalness: 0.7 })
  for (let i = 0; i < 3; i += 1) {
    const drive = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.18, 0.58), mat)
    drive.position.set(i * 0.5 - 0.5, 0.14 + i * 0.16, 0)
    drive.rotation.y = i * 0.08
    group.add(drive)
  }
  return group
}

function makeParticles() {
  const count = 360
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = THREE.MathUtils.randFloatSpread(10)
    positions[i * 3 + 1] = THREE.MathUtils.randFloat(0.5, 4.2)
    positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(6)
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  return new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0x7cf7d4, size: 0.025, transparent: true, opacity: 0.42, depthWrite: false }))
}

function makeScreenTexture(title: string, rows: string[], accent: string) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 320
  const context = canvas.getContext('2d')
  if (!context) return new THREE.CanvasTexture(canvas)
  context.fillStyle = '#05090d'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.strokeStyle = accent
  context.globalAlpha = 0.24
  for (let y = 18; y < canvas.height; y += 24) {
    context.beginPath()
    context.moveTo(0, y)
    context.lineTo(canvas.width, y)
    context.stroke()
  }
  context.globalAlpha = 1
  context.fillStyle = accent
  context.font = '400 28px monospace'
  context.fillText(title, 26, 52)
  context.font = '400 20px monospace'
  rows.forEach((row, index) => {
    context.fillStyle = index === 0 ? '#f3fff8' : '#b7cbd2'
    context.fillText(`> ${row}`, 28, 112 + index * 42)
  })
  context.fillStyle = '#ffcd6b'
  context.fillText('HASH OK', 28, 286)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

export default App
