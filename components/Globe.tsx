"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { geoEquirectangular, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import land110 from "world-atlas/land-110m.json";
import { cities } from "@/lib/content";

function ll(lat: number, lon: number, r = 1) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const th = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
}

function landDots(step = 1.55) {
  const W = 1440, H = 720;
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const ctx = cv.getContext("2d", { willReadFrequently: true })!;
  const proj = geoEquirectangular().scale(W / (2 * Math.PI)).translate([W / 2, H / 2]);
  const path = geoPath(proj, ctx);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const land = feature(land110 as any, (land110 as any).objects.land);
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  path(land as never);
  ctx.fill();
  const data = ctx.getImageData(0, 0, W, H).data;
  const pts: number[] = [];
  for (let lat = -84; lat <= 84; lat += step) {
    const stepLon = step / Math.max(Math.cos((lat * Math.PI) / 180), 0.12);
    for (let lon = -180; lon < 180; lon += stepLon) {
      const px = Math.floor(((lon + 180) / 360) * W);
      const py = Math.floor(((90 - lat) / 180) * H);
      if (data[(py * W + px) * 4 + 3] > 128) {
        const v = ll(lat, lon, 1.0);
        pts.push(v.x, v.y, v.z);
      }
    }
  }
  return new Float32Array(pts);
}

const dotVert = /* glsl */ `
  attribute float aSeed;
  uniform float uPx;
  varying float vFacing; varying float vSeed;
  void main(){
    vec4 mv = modelViewMatrix * vec4(position,1.0);
    vFacing = normalize(normalMatrix * position).z; vSeed = aSeed;
    gl_PointSize = uPx * (1.5 + aSeed*0.8);
    gl_Position = projectionMatrix * mv;
  }`;
const dotFrag = /* glsl */ `
  uniform vec3 uColor; uniform vec3 uBase;
  varying float vFacing; varying float vSeed;
  void main(){
    vec2 c = gl_PointCoord - 0.5; float d = length(c);
    if(d>0.5) discard;
    float a = smoothstep(0.5,0.18,d);
    float f = smoothstep(-0.05,0.55,vFacing);
    vec3 col = mix(uBase, uColor, smoothstep(0.3,0.9,vFacing + vSeed*0.2));
    gl_FragColor = vec4(col, a*(0.12+0.88*f));
  }`;
const arcVert = /* glsl */ `
  attribute float aProg; attribute float aDelay;
  varying float vProg; varying float vDelay; varying float vFacing;
  void main(){
    vProg = aProg; vDelay = aDelay;
    vFacing = normalize(normalMatrix*position).z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }`;
const arcFrag = /* glsl */ `
  uniform float uTime; uniform vec3 uColor;
  varying float vProg; varying float vDelay; varying float vFacing;
  void main(){
    float t = fract(uTime*0.15 + vDelay);
    float d = vProg - t;
    float head = d<=0.0 ? exp(d*9.0) : 0.0;
    float a = (0.22 + head*0.8) * smoothstep(-0.35,0.25,vFacing + 0.25);
    gl_FragColor = vec4(uColor, a);
  }`;
const markVert = /* glsl */ `
  attribute float aSize; attribute float aSeed;
  uniform float uPx; uniform float uTime;
  varying float vFacing;
  void main(){
    vec4 mv = modelViewMatrix * vec4(position,1.0);
    vFacing = normalize(normalMatrix*position).z;
    float pulse = 1.0 + 0.22*sin(uTime*2.0 + aSeed*6.28);
    gl_PointSize = uPx * aSize * pulse;
    gl_Position = projectionMatrix * mv;
  }`;
const markFrag = /* glsl */ `
  uniform vec3 uColor;
  varying float vFacing;
  void main(){
    vec2 c = gl_PointCoord - 0.5; float d = length(c);
    if(d>0.5) discard;
    float core = smoothstep(0.16,0.12,d);
    float ring = smoothstep(0.035,0.0,abs(d-0.36))*0.6;
    float a = (core + ring) * smoothstep(-0.1,0.3,vFacing);
    gl_FragColor = vec4(uColor, a);
  }`;

export default function Globe({ className, light = false }: { className?: string; light?: boolean }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return;
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
    camera.position.z = 3.7;

    const tilt = new THREE.Group();
    tilt.rotation.x = 0.4;
    tilt.rotation.z = -0.16;
    const spin = new THREE.Group();
    tilt.add(spin);
    scene.add(tilt);

    const uniforms = { uTime: { value: 0 }, uPx: { value: 1 } };
    const forest = new THREE.Color("#025541");
    const gold = new THREE.Color(light ? "#B08A45" : "#E9C877");
    const blend = light ? THREE.NormalBlending : THREE.AdditiveBlending;

    // core sphere
    const coreFrag = light
      ? `varying vec3 vN; void main(){ float l = clamp(dot(vN, normalize(vec3(-0.5,0.6,0.7))),0.0,1.0); gl_FragColor = vec4(mix(vec3(0.925,0.91,0.87), vec3(0.985,0.98,0.96), pow(l,1.2)),1.0);} `
      : `varying vec3 vN; void main(){ float l = clamp(dot(vN, normalize(vec3(-0.5,0.6,0.7))),0.0,1.0); gl_FragColor = vec4(mix(vec3(0.012,0.06,0.045), vec3(0.03,0.2,0.15), pow(l,1.6)),1.0);} `;
    spin.add(new THREE.Mesh(
      new THREE.SphereGeometry(0.985, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader: `varying vec3 vN; void main(){ vN = normalize(normalMatrix*normal); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
        fragmentShader: coreFrag,
      })
    ));

    // land dots
    const pos = landDots();
    const seeds = new Float32Array(pos.length / 3).map(() => Math.random());
    const dg = new THREE.BufferGeometry();
    dg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    dg.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    spin.add(new THREE.Points(dg, new THREE.ShaderMaterial({
      vertexShader: dotVert, fragmentShader: dotFrag, transparent: true, depthWrite: false,
      uniforms: {
        ...uniforms,
        uColor: { value: light ? forest : gold },
        uBase: { value: light ? new THREE.Color("#8fb3a5") : new THREE.Color(0.12, 0.55, 0.42) },
      },
    })));

    // arcs from the Dubai hub
    const hub = cities.find((c) => c.hub)!;
    const p0 = ll(hub.lat, hub.lon);
    const arcMat = new THREE.ShaderMaterial({
      vertexShader: arcVert, fragmentShader: arcFrag, transparent: true, depthWrite: false, blending: blend,
      uniforms: { ...uniforms, uColor: { value: light ? gold : new THREE.Color("#F4D98F") } },
    });
    cities.filter((c) => !c.hub).forEach((c, idx) => {
      const p1 = ll(c.lat, c.lon);
      const ang = p0.angleTo(p1);
      const mid = p0.clone().add(p1).normalize().multiplyScalar(1 + 0.12 + ang * 0.28);
      const pts = new THREE.QuadraticBezierCurve3(p0, mid, p1).getPoints(90);
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      g.setAttribute("aProg", new THREE.BufferAttribute(new Float32Array(pts.map((_, i) => i / 90)), 1));
      g.setAttribute("aDelay", new THREE.BufferAttribute(new Float32Array(pts.length).fill((idx * 0.37) % 1), 1));
      spin.add(new THREE.Line(g, arcMat));
    });

    // city markers
    const mp = new Float32Array(cities.length * 3);
    const ms = new Float32Array(cities.length);
    const mseed = new Float32Array(cities.length);
    cities.forEach((c, i) => {
      const v = ll(c.lat, c.lon, 1.005);
      mp.set([v.x, v.y, v.z], i * 3);
      ms[i] = light ? (c.hub ? 17 : 9) : (c.hub ? 24 : 13);
      mseed[i] = Math.random();
    });
    const mg = new THREE.BufferGeometry();
    mg.setAttribute("position", new THREE.BufferAttribute(mp, 3));
    mg.setAttribute("aSize", new THREE.BufferAttribute(ms, 1));
    mg.setAttribute("aSeed", new THREE.BufferAttribute(mseed, 1));
    spin.add(new THREE.Points(mg, new THREE.ShaderMaterial({
      vertexShader: markVert, fragmentShader: markFrag, transparent: true, depthWrite: false, blending: blend,
      uniforms: { ...uniforms, uColor: { value: gold } },
    })));

    let angle = THREE.MathUtils.degToRad(hub.lon + 90) + 0.5;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const w = el.clientWidth || 1, h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      uniforms.uPx.value = (dpr * Math.min(w, h)) / 560 * 1.5;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; });
    io.observe(el);

    let last = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible) return;
      uniforms.uTime.value += dt;
      if (!reduce) angle += dt * 0.06;
      cur.x += (target.x - cur.x) * 0.05;
      cur.y += (target.y - cur.y) * 0.05;
      spin.rotation.y = angle + cur.x * 0.16;
      tilt.rotation.x = 0.4 + cur.y * 0.08;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      window.removeEventListener("pointermove", onMove);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        (m.material as THREE.Material | undefined)?.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [light]);

  return <div ref={host} className={className} aria-hidden />;
}
