/* eslint-disable react-hooks/purity */
import React, { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
    }
`;

const fragmentShader = `
    #define PI 3.14159265359
    uniform float u_ratio;
    uniform vec2 u_cursor;
    uniform float u_stop_time;
    uniform float u_clean;
    uniform vec2 u_stop_randomizer;
    uniform sampler2D u_texture;
    varying vec2 vUv;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
        m = m*m; m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
    }

    float get_rose_shape(vec2 _p, float _pet_n, float _angle, float _outline, float _inner) {
        _angle *= 2.;
        _p = vec2(_p.x * cos(_angle) - _p.y * sin(_angle), _p.x * sin(_angle) + _p.y * cos(_angle));
        float a = atan(_p.y, _p.x);
        float ruffles = 0.15 * sin(_pet_n * a + snoise(_p * 10.0));
        float flower_sectoral_shape = pow(abs(sin(a * _pet_n * 0.5)), 1.5) + 0.4 + ruffles;
        vec2 flower_size_range = vec2(0.04, 0.12);
        float size = flower_size_range[0] + u_stop_randomizer[0] * flower_size_range[1];
        size *= _inner;
        float flower_radial_shape = pow(length(_p) / size, 1.8);
        flower_radial_shape -= 0.1 * sin(5. * a);
        flower_radial_shape = max(0.1, flower_radial_shape);
        float grow_time = step(0.1, u_stop_time) * pow(u_stop_time, 0.4);
        float shape = 1.0 - smoothstep(0.0, flower_sectoral_shape, _outline * flower_radial_shape / grow_time);
        return shape * (1.0 - step(1.0, grow_time));
    }

    float get_stem_shape(vec2 _p, vec2 _uv, float _w, float _angle) {
        _w = max(.004, _w);
        float x_offset = _p.y * sin(_angle);
        x_offset *= pow(3. * _uv.y, 2.);
        _p.x -= x_offset;
        float noise_power = 0.4;
        float cursor_horizontal_noise = noise_power * snoise(2. * _uv * u_stop_randomizer[0]);
        cursor_horizontal_noise *= pow(dot(_p.y, _p.y), .6);
        _p.x += cursor_horizontal_noise;
        float left = smoothstep(-_w, 0., _p.x);
        float right = 1. - smoothstep(0., _w, _p.x);
        float stem_shape = left * right;
        float grow_time = 1. - smoothstep(0., .2, u_stop_time);
        float stem_top_mask = smoothstep(0., pow(grow_time, .5), .03 -_p.y);
        return stem_shape * stem_top_mask * (1. - step(.17, u_stop_time));
    }

    void main() {
        vec3 base = texture2D(u_texture, vUv).xyz;
        vec2 uv = vUv; uv.x *= u_ratio;
        vec2 cursor = vUv - u_cursor.xy; cursor.x *= u_ratio;
        vec3 rose_pink = vec3(0.98, 0.4, 0.55);
        vec3 rose_center = vec3(0.8, 0.1, 0.2);
        vec3 stem_color = vec3(0.05, 0.3, 0.1);
        float angle = 0.5 * (u_stop_randomizer[0] - 0.5);
        float stem = get_stem_shape(cursor, uv, 0.003, angle);
        float stem_mask = 1.0 - get_stem_shape(cursor, uv, 0.006, angle);
        float back = get_rose_shape(cursor, 7.0, angle + 0.2, 1.2, 1.0);
        float mid = get_rose_shape(cursor, 5.0, angle - 0.5, 1.4, 0.7);
        float front = get_rose_shape(cursor, 9.0, angle, 1.6, 0.4);
        float flower_mask = (1.0 - back) * (1.0 - mid) * (1.0 - front);
        vec3 color = base * stem_mask * flower_mask;
        color += (stem * stem_color);
        color += (back * rose_pink);
        color += (mid * mix(rose_pink, rose_center, 0.4));
        color += (front * rose_center);
        color *= u_clean;
        gl_FragColor = vec4(color, 1.0);
    }
`;

const JasminePetals = () => {
  const petals = useMemo(
    () =>
      Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        startX: Math.random() * 100, // Start anywhere horizontally
        endXOffset: (Math.random() - 0.5) * 40, // Drift left or right by up to 20vw
        swayAmplitude: 2 + Math.random() * 4,
        delay: Math.random() * 10,
        duration: 7 + Math.random() * 5,
        size: 6 + Math.random() * 8,
        rotationStart: Math.random() * 360,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{
            x: `${petal.startX}vw`,
            y: "-10vh",
            opacity: 0,
            rotate: petal.rotationStart,
            rotateX: 0,
          }}
          animate={{
            y: "110vh",
            x: [
              `${petal.startX}vw`,
              `${petal.startX + petal.swayAmplitude}vw`,
              `${petal.startX + petal.endXOffset}vw`,
            ],
            opacity: [0, 1, 1, 0],
            rotate: petal.rotationStart + 720,
            rotateX: 1080, // Tumbling effect
            rotateY: 360,
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "easeInOut", // Smoother falling feel
          }}
          className="absolute bg-white/80 rounded-full shadow-sm backdrop-blur-[1px]"
          style={{
            width: petal.size,
            height: petal.size * 1.4,
            borderRadius: "100% 10% 100% 10%",
            transformStyle: "preserve-3d", // Improves 3D tumble look
          }}
        />
      ))}
    </div>
  );
};

const FlowerGrower: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({
    x: 0.5,
    y: 0.5,
    clicked: false,
    vanishCanvas: false,
  });

  // Fixed TS Error: added initialValue null
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const sceneShader = new THREE.Scene();
    const sceneBasic = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderTargets = [
      new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight),
      new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight),
    ];

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        u_stop_time: { value: 0 },
        u_stop_randomizer: {
          value: new THREE.Vector2(Math.random(), Math.random()),
        },
        u_cursor: { value: new THREE.Vector2(0.5, 0.5) },
        u_ratio: { value: window.innerWidth / window.innerHeight },
        u_texture: { value: null },
        u_clean: { value: 1.0 },
      },
      vertexShader,
      fragmentShader,
    });

    const basicMaterial = new THREE.MeshBasicMaterial();
    const planeGeo = new THREE.PlaneGeometry(2, 2);
    sceneShader.add(new THREE.Mesh(planeGeo, shaderMaterial));
    sceneBasic.add(new THREE.Mesh(planeGeo, basicMaterial));

    const clock = new THREE.Clock();

    const render = () => {
      shaderMaterial.uniforms.u_clean.value = pointer.current.vanishCanvas
        ? 0
        : 1;
      shaderMaterial.uniforms.u_texture.value = renderTargets[0].texture;

      if (pointer.current.clicked) {
        shaderMaterial.uniforms.u_cursor.value = new THREE.Vector2(
          pointer.current.x,
          1 - pointer.current.y,
        );
        shaderMaterial.uniforms.u_stop_randomizer.value = new THREE.Vector2(
          Math.random(),
          Math.random(),
        );
        shaderMaterial.uniforms.u_stop_time.value = 0;
        pointer.current.clicked = false;
      }

      shaderMaterial.uniforms.u_stop_time.value += clock.getDelta();
      renderer.setRenderTarget(renderTargets[1]);
      renderer.render(sceneShader, camera);
      basicMaterial.map = renderTargets[1].texture;
      renderer.setRenderTarget(null);
      renderer.render(sceneBasic, camera);

      const tmp = renderTargets[0];
      renderTargets[0] = renderTargets[1];
      renderTargets[1] = tmp;

      requestRef.current = requestAnimationFrame(render);
    };

    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderTargets[0].setSize(window.innerWidth, window.innerHeight);
      renderTargets[1].setSize(window.innerWidth, window.innerHeight);
      shaderMaterial.uniforms.u_ratio.value =
        window.innerWidth / window.innerHeight;
    });

    render();
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      renderer.dispose();
    };
  }, []);

  // Fixed ESLint Error: Replaced 'any' with specific React events
  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    let pageX, pageY;
    if ("touches" in e) {
      pageX = e.touches[0].pageX;
      pageY = e.touches[0].pageY;
    } else {
      pageX = e.pageX;
      pageY = e.pageY;
    }
    pointer.current.x = pageX / window.innerWidth;
    pointer.current.y = pageY / window.innerHeight;
    pointer.current.clicked = true;
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-slate-950"
      onClick={handleClick}
      onTouchStart={handleClick}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block cursor-crosshair"
      />

      <JasminePetals />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-white text-xs uppercase tracking-[0.5em] opacity-40 select-none">
          Click to plant a rose
        </h1>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          pointer.current.vanishCanvas = true;
          setTimeout(() => (pointer.current.vanishCanvas = false), 50);
        }}
        className="absolute bottom-10 left-10 text-white/30 text-xs underline hover:text-white transition-colors z-10"
      >
        Clear Garden
      </button>
    </div>
  );
};

export default FlowerGrower;
