import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CAMERA_ANATOMY_PARTS } from '../../data/cameraAnatomy';
import { CameraPartAnatomy } from '../../types';
import { sounds } from '../../services/soundEffects';
import { 
  Eye, 
  Layers, 
  Maximize2, 
  RotateCcw, 
  Sliders, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  CheckCircle2, 
  Compass,
  Zap,
  Camera
} from 'lucide-react';

interface Camera3DSceneProps {
  onSelectPart?: (part: CameraPartAnatomy) => void;
  selectedPartId?: string | null;
  onOpenViewfinder?: () => void;
}

export const Camera3DScene: React.FC<Camera3DSceneProps> = ({
  onSelectPart,
  selectedPartId,
  onOpenViewfinder
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  // Exploded & visual states
  const [explodedFactor, setExplodedFactor] = useState<number>(0);
  const [isCutaway, setIsCutaway] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [currentPreset, setCurrentPreset] = useState<string>('perspective');
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<CameraPartAnatomy | null>(null);

  // References to animated 3D parts
  const partsRefs = useRef<{
    lensFrontGroup: THREE.Group;
    lensMidGroup: THREE.Group;
    apertureIrisGroup: THREE.Group;
    mirrorGroup: THREE.Group;
    sensorGroup: THREE.Group;
    pentaprismGroup: THREE.Group;
    rearLcdGroup: THREE.Group;
    casingGroup: THREE.Group;
    shutterButtonMesh: THREE.Mesh;
    materials: THREE.Material[];
  } | null>(null);

  // Target exploded value for silky smooth dampening
  const targetExplodeRef = useRef<number>(0);
  targetExplodeRef.current = explodedFactor;

  // Selected part highlighting
  useEffect(() => {
    if (selectedPartId) {
      const part = CAMERA_ANATOMY_PARTS.find(p => p.id === selectedPartId);
      if (part) {
        setActiveHotspot(part);
      }
    }
  }, [selectedPartId]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL guard
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF5F2EB);
    scene.fog = new THREE.Fog(0xF5F2EB, 8, 22);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(3.8, 2.4, 4.6);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 4. Studio Environment Lighting (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Key Light, Rim Light, Fill Light
    const keyLight = new THREE.DirectionalLight(0xfff7e6, 2.4);
    keyLight.position.set(5, 7, 5);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdbeafe, 1.2);
    fillLight.position.set(-4, 3, -3);
    scene.add(fillLight);

    const hemiLight = new THREE.HemisphereLight(0xfffbeb, 0xe2e8f0, 0.7);
    scene.add(hemiLight);

    // Ground contact shadow disc
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(30, 30, 36, 0.35)');
    grad.addColorStop(0.5, 'rgba(30, 30, 36, 0.12)');
    grad.addColorStop(1, 'rgba(30, 30, 36, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    const shadowTex = new THREE.CanvasTexture(canvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.02;
    scene.add(shadowMesh);

    // 5. Build Procedural Realistic DSLR Camera Model
    const cameraRig = new THREE.Group();
    cameraRig.position.y = -0.2;
    scene.add(cameraRig);

    // Materials list for cleanup
    const materials: THREE.Material[] = [];

    // Body Texture (Subtle leatherette/polycarbonate grip)
    const gripCanvas = document.createElement('canvas');
    gripCanvas.width = 128;
    gripCanvas.height = 128;
    const gctx = gripCanvas.getContext('2d')!;
    gctx.fillStyle = '#1c1c1f';
    gctx.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 400; i++) {
      gctx.fillStyle = Math.random() > 0.5 ? '#28282c' : '#141416';
      gctx.fillRect(Math.random() * 128, Math.random() * 128, 2, 2);
    }
    const gripTex = new THREE.CanvasTexture(gripCanvas);
    gripTex.wrapS = THREE.RepeatWrapping;
    gripTex.wrapT = THREE.RepeatWrapping;
    gripTex.repeat.set(4, 4);
    gripTex.colorSpace = THREE.SRGBColorSpace;

    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x1e1e22,
      roughness: 0.75,
      metalness: 0.15,
      map: gripTex
    });
    materials.push(bodyMat);

    const metalChassisMat = new THREE.MeshStandardMaterial({
      color: 0x2a2a30,
      roughness: 0.35,
      metalness: 0.85
    });
    materials.push(metalChassisMat);

    const chromeRingMat = new THREE.MeshStandardMaterial({
      color: 0xd6d6df,
      roughness: 0.15,
      metalness: 0.95
    });
    materials.push(chromeRingMat);

    const redAccentMat = new THREE.MeshStandardMaterial({
      color: 0xd92525,
      roughness: 0.3,
      metalness: 0.5
    });
    materials.push(redAccentMat);

    // Optical Glass Multi-Coated Material
    const opticalGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x99ddff,
      transmission: isSoftwareGl ? 0 : 0.92,
      opacity: isSoftwareGl ? 0.4 : 1,
      transparent: true,
      roughness: 0.05,
      ior: 1.55,
      thickness: 1.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05
    });
    materials.push(opticalGlassMat);

    // Sensor Bayer CFA filter texture
    const sensorCanvas = document.createElement('canvas');
    sensorCanvas.width = 64;
    sensorCanvas.height = 64;
    const sctx = sensorCanvas.getContext('2d')!;
    for (let x = 0; x < 64; x += 4) {
      for (let y = 0; y < 64; y += 4) {
        sctx.fillStyle = ((x + y) / 4) % 2 === 0 ? '#10b981' : (x % 8 === 0 ? '#ef4444' : '#3b82f6');
        sctx.fillRect(x, y, 4, 4);
      }
    }
    const sensorTex = new THREE.CanvasTexture(sensorCanvas);
    sensorTex.colorSpace = THREE.SRGBColorSpace;
    const sensorMat = new THREE.MeshStandardMaterial({
      map: sensorTex,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x064e3b,
      emissiveIntensity: 0.3
    });
    materials.push(sensorMat);

    // LCD Screen texture
    const lcdCanvas = document.createElement('canvas');
    lcdCanvas.width = 256;
    lcdCanvas.height = 180;
    const lctx = lcdCanvas.getContext('2d')!;
    lctx.fillStyle = '#0f172a';
    lctx.fillRect(0, 0, 256, 180);
    lctx.fillStyle = '#10b981';
    lctx.font = 'bold 20px monospace';
    lctx.fillText('P  1/250  F2.8', 20, 45);
    lctx.fillStyle = '#94a3b8';
    lctx.font = '14px monospace';
    lctx.fillText('ISO 400   RAW+L', 20, 80);
    lctx.fillText('[ -2..-1..■..+1..+2 ]', 20, 115);
    lctx.fillText('PLAINLY AR CAM [999]', 20, 150);
    const lcdTex = new THREE.CanvasTexture(lcdCanvas);
    lcdTex.colorSpace = THREE.SRGBColorSpace;
    const lcdMat = new THREE.MeshBasicMaterial({ map: lcdTex });
    materials.push(lcdMat);

    // --- SUB-GROUPS FOR EXPLODED SEPARATION ---
    const casingGroup = new THREE.Group();
    const lensFrontGroup = new THREE.Group();
    const lensMidGroup = new THREE.Group();
    const apertureIrisGroup = new THREE.Group();
    const mirrorGroup = new THREE.Group();
    const sensorGroup = new THREE.Group();
    const pentaprismGroup = new THREE.Group();
    const rearLcdGroup = new THREE.Group();

    cameraRig.add(casingGroup);
    cameraRig.add(lensFrontGroup);
    cameraRig.add(lensMidGroup);
    cameraRig.add(apertureIrisGroup);
    cameraRig.add(mirrorGroup);
    cameraRig.add(sensorGroup);
    cameraRig.add(pentaprismGroup);
    cameraRig.add(rearLcdGroup);

    // 1. Camera Body Main Hull
    const mainBodyGeo = new THREE.BoxGeometry(2.4, 1.6, 1.2);
    const mainBody = new THREE.Mesh(mainBodyGeo, bodyMat);
    mainBody.castShadow = true;
    mainBody.receiveShadow = true;
    casingGroup.add(mainBody);

    // Right hand grip ergonomically contoured
    const gripGeo = new THREE.CylinderGeometry(0.48, 0.52, 1.6, 24);
    const gripMesh = new THREE.Mesh(gripGeo, bodyMat);
    gripMesh.position.set(1.2, 0, 0.25);
    gripMesh.scale.set(1.2, 1, 0.85);
    gripMesh.castShadow = true;
    casingGroup.add(gripMesh);

    // Red luxury accent line (like Canon L-lens / pro EOS ring)
    const redStripeGeo = new THREE.TorusGeometry(0.68, 0.02, 16, 48);
    const redStripe = new THREE.Mesh(redStripeGeo, redAccentMat);
    redStripe.position.set(0, 0.05, 1.8);
    lensFrontGroup.add(redStripe);

    // Metal Lens Mount Ring on camera front
    const mountRingGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.15, 36);
    const mountRing = new THREE.Mesh(mountRingGeo, chromeRingMat);
    mountRing.rotation.x = Math.PI / 2;
    mountRing.position.set(0, 0.05, 0.65);
    casingGroup.add(mountRing);

    // 2. Lens Elements (Outer Barrel & Front Glass)
    const outerBarrelGeo = new THREE.CylinderGeometry(0.7, 0.68, 0.9, 36);
    const outerBarrel = new THREE.Mesh(outerBarrelGeo, metalChassisMat);
    outerBarrel.rotation.x = Math.PI / 2;
    outerBarrel.position.set(0, 0.05, 1.25);
    outerBarrel.castShadow = true;
    lensMidGroup.add(outerBarrel);

    // Focus ring ribbed rubber
    const focusRingGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.35, 36);
    const focusRing = new THREE.Mesh(focusRingGeo, bodyMat);
    focusRing.rotation.x = Math.PI / 2;
    focusRing.position.set(0, 0.05, 1.35);
    lensMidGroup.add(focusRing);

    // Front Glass Element (Bulging curved lens)
    const frontLensGeo = new THREE.SphereGeometry(0.65, 32, 16, 0, Math.PI * 2, 0, Math.PI / 3);
    const frontLens = new THREE.Mesh(frontLensGeo, opticalGlassMat);
    frontLens.position.set(0, 0.05, 1.85);
    frontLens.rotation.x = -Math.PI / 2;
    lensFrontGroup.add(frontLens);

    // Front Lens retaining bezel
    const frontBezelGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.25, 36, 1, true);
    const frontBezel = new THREE.Mesh(frontBezelGeo, metalChassisMat);
    frontBezel.rotation.x = Math.PI / 2;
    frontBezel.position.set(0, 0.05, 1.78);
    lensFrontGroup.add(frontBezel);

    // Internal glass element 2 (Concave doublet)
    const midLensGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.1, 24);
    const midLens = new THREE.Mesh(midLensGeo, opticalGlassMat);
    midLens.rotation.x = Math.PI / 2;
    midLens.position.set(0, 0.05, 1.05);
    lensMidGroup.add(midLens);

    // 3. Aperture Iris Blades Group
    const apertureHousingGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.08, 24);
    const apertureHousing = new THREE.Mesh(apertureHousingGeo, metalChassisMat);
    apertureHousing.rotation.x = Math.PI / 2;
    apertureHousing.position.set(0, 0.05, 0.88);
    apertureIrisGroup.add(apertureHousing);

    // 8 overlapping aperture blades
    for (let b = 0; b < 8; b++) {
      const bladeAngle = (b / 8) * Math.PI * 2;
      const bladeGeo = new THREE.BoxGeometry(0.25, 0.01, 0.12);
      const bladeMat = new THREE.MeshStandardMaterial({ color: 0x151515, metalness: 0.9, roughness: 0.3 });
      materials.push(bladeMat);
      const bladeMesh = new THREE.Mesh(bladeGeo, bladeMat);
      bladeMesh.position.set(
        Math.cos(bladeAngle) * 0.22,
        0.05 + Math.sin(bladeAngle) * 0.22,
        0.88
      );
      bladeMesh.rotation.z = bladeAngle + 0.4;
      apertureIrisGroup.add(bladeMesh);
    }

    // 4. Reflex Mirror inside sensor cavity (45 degree angled mirror)
    const mirrorPlateGeo = new THREE.BoxGeometry(0.85, 0.03, 0.95);
    const mirrorMat = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      roughness: 0.05,
      metalness: 0.98
    });
    materials.push(mirrorMat);
    const mirrorMesh = new THREE.Mesh(mirrorPlateGeo, mirrorMat);
    mirrorMesh.position.set(0, 0.05, 0.25);
    mirrorMesh.rotation.x = Math.PI / 4; // 45 degrees
    mirrorGroup.add(mirrorMesh);

    // 5. CMOS Digital Sensor Assembly
    const sensorBoardGeo = new THREE.BoxGeometry(1.2, 0.9, 0.08);
    const sensorBoardMat = new THREE.MeshStandardMaterial({ color: 0x134e4a, metalness: 0.4 });
    materials.push(sensorBoardMat);
    const sensorBoard = new THREE.Mesh(sensorBoardGeo, sensorBoardMat);
    sensorBoard.position.set(0, 0.05, -0.35);
    sensorGroup.add(sensorBoard);

    const sensorActiveGeo = new THREE.PlaneGeometry(0.95, 0.65);
    const sensorActiveMesh = new THREE.Mesh(sensorActiveGeo, sensorMat);
    sensorActiveMesh.position.set(0, 0.05, -0.3);
    sensorGroup.add(sensorActiveMesh);

    // 6. Pentaprism Housing & Optical Viewfinder (Top)
    const prismGeo = new THREE.CylinderGeometry(0.45, 0.75, 0.65, 4);
    const prismMesh = new THREE.Mesh(prismGeo, bodyMat);
    prismMesh.position.set(0, 1.05, -0.05);
    prismMesh.rotation.y = Math.PI / 4;
    pentaprismGroup.add(prismMesh);

    // Viewfinder Eyepiece on back of prism
    const eyecupGeo = new THREE.TorusGeometry(0.22, 0.06, 16, 24);
    const eyecupMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
    materials.push(eyecupMat);
    const eyecupMesh = new THREE.Mesh(eyecupGeo, eyecupMat);
    eyecupMesh.position.set(0, 1.05, -0.55);
    pentaprismGroup.add(eyecupMesh);

    // Eyepiece glass
    const eyeGlassGeo = new THREE.CircleGeometry(0.2, 24);
    const eyeGlassMesh = new THREE.Mesh(eyeGlassGeo, opticalGlassMat);
    eyeGlassMesh.position.set(0, 1.05, -0.54);
    pentaprismGroup.add(eyeGlassMesh);

    // Flash Hot Shoe on top of pentaprism
    const hotShoeGeo = new THREE.BoxGeometry(0.38, 0.08, 0.45);
    const hotShoeMesh = new THREE.Mesh(hotShoeGeo, chromeRingMat);
    hotShoeMesh.position.set(0, 1.4, -0.1);
    pentaprismGroup.add(hotShoeMesh);

    // 7. Shutter Release Button & Dials on Top Right
    const shutterBezelGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.1, 24);
    const shutterBezel = new THREE.Mesh(shutterBezelGeo, chromeRingMat);
    shutterBezel.position.set(0.95, 0.88, 0.28);
    casingGroup.add(shutterBezel);

    const shutterBtnGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.12, 24);
    const shutterBtn = new THREE.Mesh(shutterBtnGeo, chromeRingMat);
    shutterBtn.position.set(0.95, 0.92, 0.28);
    casingGroup.add(shutterBtn);

    // Mode Dial on Top Left
    const modeDialGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.2, 32);
    const modeDial = new THREE.Mesh(modeDialGeo, metalChassisMat);
    modeDial.position.set(-0.85, 0.92, -0.15);
    casingGroup.add(modeDial);

    // Main Control Dial behind shutter
    const mainDialGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.12, 24);
    const mainDial = new THREE.Mesh(mainDialGeo, metalChassisMat);
    mainDial.rotation.z = Math.PI / 2;
    mainDial.position.set(0.85, 0.86, 0.05);
    casingGroup.add(mainDial);

    // 8. Rear LCD Screen & Back Buttons
    const lcdScreenGeo = new THREE.PlaneGeometry(1.6, 1.1);
    const lcdScreen = new THREE.Mesh(lcdScreenGeo, lcdMat);
    lcdScreen.rotation.y = Math.PI;
    lcdScreen.position.set(-0.15, 0, -0.62);
    rearLcdGroup.add(lcdScreen);

    // D-Pad navigation circle on back
    const dpadGeo = new THREE.TorusGeometry(0.22, 0.05, 16, 24);
    const dpad = new THREE.Mesh(dpadGeo, metalChassisMat);
    dpad.position.set(0.85, -0.1, -0.62);
    rearLcdGroup.add(dpad);

    // Save refs for animation loop
    partsRefs.current = {
      lensFrontGroup,
      lensMidGroup,
      apertureIrisGroup,
      mirrorGroup,
      sensorGroup,
      pentaprismGroup,
      rearLcdGroup,
      casingGroup,
      shutterButtonMesh: shutterBtn,
      materials
    };

    // 6. Interactive Hotspots Markers (3D Billboards)
    const hotspotsGroup = new THREE.Group();
    scene.add(hotspotsGroup);

    CAMERA_ANATOMY_PARTS.forEach(part => {
      const pinCanvas = document.createElement('canvas');
      pinCanvas.width = 64;
      pinCanvas.height = 64;
      const pctx = pinCanvas.getContext('2d')!;
      pctx.beginPath();
      pctx.arc(32, 32, 26, 0, Math.PI * 2);
      pctx.fillStyle = '#6C5CE7';
      pctx.fill();
      pctx.lineWidth = 4;
      pctx.strokeStyle = '#FFFFFF';
      pctx.stroke();

      pctx.beginPath();
      pctx.arc(32, 32, 8, 0, Math.PI * 2);
      pctx.fillStyle = '#FFFFFF';
      pctx.fill();

      const pinTex = new THREE.CanvasTexture(pinCanvas);
      pinTex.colorSpace = THREE.SRGBColorSpace;
      const spriteMat = new THREE.SpriteMaterial({
        map: pinTex,
        depthTest: false,
        transparent: true,
        opacity: 0.9
      });
      materials.push(spriteMat);
      const sprite = new THREE.Sprite(spriteMat);
      sprite.position.set(...part.position3D);
      sprite.scale.set(0.32, 0.32, 0.32);
      sprite.userData = { part };
      hotspotsGroup.add(sprite);
    });

    // 7. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.08;
    controls.minDistance = 2.2;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 2 + 0.15;
    controlsRef.current = controls;

    // Raycaster for clicking hotspots
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(hotspotsGroup.children);
      if (intersects.length > 0) {
        const clickedSprite = intersects[0].object as THREE.Sprite;
        const part = clickedSprite.userData.part as CameraPartAnatomy;
        if (part) {
          sounds.playDialTick();
          setActiveHotspot(part);
          if (onSelectPart) onSelectPart(part);
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    let isUserDragging = false;
    controls.addEventListener('start', () => { isUserDragging = true; });
    controls.addEventListener('end', () => { isUserDragging = false; });

    // 8. Animation & Render Loop
    let animationFrameId = 0;
    let clock = new THREE.Clock();
    let currentExplode = 0;

    const renderLoop = () => {
      const delta = clock.getDelta();

      // Smooth damp exploded separation
      currentExplode = THREE.MathUtils.damp(currentExplode, targetExplodeRef.current, 6.5, delta);

      if (partsRefs.current) {
        const {
          lensFrontGroup,
          lensMidGroup,
          apertureIrisGroup,
          mirrorGroup,
          sensorGroup,
          pentaprismGroup,
          rearLcdGroup
        } = partsRefs.current;

        // Spread elements outward along Z and Y
        lensFrontGroup.position.z = currentExplode * 1.8;
        lensMidGroup.position.z = currentExplode * 1.1;
        apertureIrisGroup.position.z = currentExplode * 0.7;
        mirrorGroup.position.z = currentExplode * 0.35;
        sensorGroup.position.z = -currentExplode * 0.85;
        rearLcdGroup.position.z = -currentExplode * 1.4;
        pentaprismGroup.position.y = currentExplode * 0.9;
      }

      // Slow elegant turntable rotation if enabled and user isn't dragging
      if (isRotating && !isUserDragging) {
        cameraRig.rotation.y += 0.0035;
      }

      controls.update();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      controls.dispose();
      materials.forEach(m => m.dispose());
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Set cutaway / X-Ray material transparency
  useEffect(() => {
    if (!partsRefs.current) return;
    const { casingGroup } = partsRefs.current;
    casingGroup.traverse(child => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(m => {
            m.transparent = isCutaway;
            m.opacity = isCutaway ? 0.28 : 1.0;
          });
        } else if (mesh.material) {
          mesh.material.transparent = isCutaway;
          mesh.material.opacity = isCutaway ? 0.28 : 1.0;
        }
      }
    });
  }, [isCutaway]);

  // View Presets
  const setCameraView = useCallback((preset: 'perspective' | 'front' | 'top' | 'rear' | 'cutaway') => {
    if (!cameraRef.current || !controlsRef.current) return;
    sounds.playDialTick();
    setCurrentPreset(preset);

    const camera = cameraRef.current;
    const controls = controlsRef.current;

    switch (preset) {
      case 'front':
        camera.position.set(0, 0, 5.2);
        controls.target.set(0, 0, 0);
        break;
      case 'top':
        camera.position.set(0, 5.5, 0.01);
        controls.target.set(0, 0, 0);
        break;
      case 'rear':
        camera.position.set(0, 0, -5.2);
        controls.target.set(0, 0, 0);
        break;
      case 'cutaway':
        camera.position.set(3.4, 1.2, 2.8);
        controls.target.set(0, 0, 0);
        setIsCutaway(true);
        setExplodedFactor(0.45);
        break;
      case 'perspective':
      default:
        camera.position.set(3.8, 2.4, 4.6);
        controls.target.set(0, 0, 0);
        break;
    }
  }, []);

  return (
    <div className="relative w-full h-[620px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#F5F2EB] to-[#ECE7DC] border-2 border-[#E5DFD3] shadow-sm select-none">
      {/* 3D Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left: Title Badge & Exploded View status */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <div className="bg-[#FAF7F0]/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#E2DDD3] shadow-sm flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#5E4DB2] text-white flex items-center justify-center font-bold text-sm shadow-sm">
            3D
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm text-[#1E1E24] leading-tight">
              Virtual DSLR Anatomical Inspector
            </h3>
            <p className="text-xs text-[#6B6B78] flex items-center gap-1">
              <span>Interactive 12-part optical model</span>
              <span>•</span>
              <span className="text-[#5E4DB2] font-semibold">Hold & rotate</span>
            </p>
          </div>
        </div>

        {/* Quick hint badge */}
        <div className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-[#E2DDD3] text-xs text-[#52525B] flex items-center gap-1.5 max-w-fit shadow-xs">
          <Compass className="w-3.5 h-3.5 text-[#5E4DB2]" />
          <span>Click colored pins to inspect internal mechanisms</span>
        </div>
      </div>

      {/* Top Right: "Take a Camera / Hold it in AR" CTA Button with Clickable DSLR Thumbnail */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <div
          onClick={() => {
            sounds.playShutterClick();
            if (onOpenViewfinder) onOpenViewfinder();
          }}
          className="bg-[#18181E]/95 backdrop-blur-md hover:bg-black text-white p-2 sm:px-3 sm:py-2 rounded-2xl border-2 border-zinc-700 hover:border-amber-400 shadow-lg transition-all flex items-center gap-2.5 cursor-pointer group active:scale-95"
          title="Click to hold this camera and shoot in AR!"
        >
          <img 
            src="/public/assets/aistudio/images_18a9a6c5.jpg" 
            alt="Clickable DSLR" 
            className="w-9 h-7 object-contain group-hover:scale-110 transition-transform drop-shadow"
          />
          <div className="text-left hidden sm:block">
            <span className="font-heading font-black text-xs text-white block group-hover:text-amber-300 transition-colors">
              Hold This DSLR (AR) →
            </span>
            <span className="text-[10px] text-zinc-400 font-mono block">
              Snap People in Real-Time
            </span>
          </div>
        </div>
      </div>

      {/* Selected Hotspot Detail Card (Floating Overlay) */}
      {activeHotspot && (
        <div className="absolute top-20 right-4 z-10 w-80 bg-[#FAF7F0]/95 backdrop-blur-md rounded-2xl p-4 border border-[#DCD5C5] shadow-lg animate-in fade-in slide-in-from-right-4 duration-200">
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#5E4DB2]/10 text-[#5E4DB2]">
                {activeHotspot.category}
              </span>
              <h4 className="font-heading font-bold text-base text-[#1E1E24] mt-1">
                {activeHotspot.name}
              </h4>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-[#888894] hover:text-[#1E1E24] p-1 rounded-lg hover:bg-[#EFEAE0]"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2.5 text-xs text-[#3F3F46]">
            <div className="bg-[#F0ECE1] p-2.5 rounded-xl border border-[#E2DDD3]">
              <span className="font-bold text-[#5E4DB2] block mb-0.5">In plain English:</span>
              <p className="leading-relaxed">{activeHotspot.plainEnglishDesc}</p>
            </div>

            <div>
              <span className="font-semibold text-[#1E1E24] block mb-0.5">How it works inside:</span>
              <p className="text-[#64748B] leading-relaxed">{activeHotspot.howItWorks}</p>
            </div>

            <div>
              <span className="font-semibold text-[#1E1E24] block mb-0.5">How to adjust it:</span>
              <p className="text-[#64748B] leading-relaxed">{activeHotspot.howToUseIt}</p>
            </div>
          </div>
        </div>
      )}

      {/* THREE.JS CONSTITUTION MANDATED COLLAPSIBLE BOTTOM DOCK (Zero Viewport Occlusion) */}
      <div 
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-[760px] transition-all duration-300 ease-out ${
          isDockCollapsed ? 'translate-y-[calc(100%-42px)]' : 'translate-y-0'
        }`}
      >
        {/* Collapse Toggle Tab */}
        <div className="flex justify-center mb-1">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="bg-[#FAF7F0] hover:bg-white text-[#52525B] px-4 py-1 rounded-full border border-[#DCD5C5] text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-[#5E4DB2]" />
                <span>Show Camera Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-[#5E4DB2]" />
                <span>Hide Controls (Zen View)</span>
              </>
            )}
          </button>
        </div>

        {/* Unified Bottom Control Glassmorphic Bar */}
        <div className="bg-[#FAF7F0]/95 backdrop-blur-md rounded-2xl p-3.5 border border-[#DCD5C5] shadow-lg flex flex-col sm:flex-row items-center gap-4 justify-between">
          
          {/* Exploded View Separation Slider */}
          <div className="flex items-center gap-3 w-full sm:w-64">
            <Layers className="w-4 h-4 text-[#5E4DB2] shrink-0" />
            <div className="w-full">
              <div className="flex justify-between items-center text-[11px] font-semibold text-[#3F3F46] mb-1">
                <span>Explode Parts</span>
                <span className="font-mono text-[#5E4DB2]">{Math.round(explodedFactor * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={explodedFactor}
                onChange={e => {
                  sounds.playDialTick();
                  setExplodedFactor(parseFloat(e.target.value));
                }}
                className="w-full h-1.5 bg-[#E4DFD5] rounded-lg appearance-none cursor-pointer accent-[#5E4DB2]"
              />
            </div>
          </div>

          {/* Quick Perspective Views */}
          <div className="flex items-center gap-1 bg-[#EBE5D8] p-1 rounded-xl">
            {(['perspective', 'front', 'top', 'rear', 'cutaway'] as const).map(preset => (
              <button
                key={preset}
                onClick={() => setCameraView(preset)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                  currentPreset === preset
                    ? 'bg-white text-[#1E1E24] shadow-xs'
                    : 'text-[#6B6B78] hover:text-[#1E1E24]'
                }`}
              >
                {preset === 'cutaway' ? 'X-Ray' : preset}
              </button>
            ))}
          </div>

          {/* Feature Toggles: Turntable & X-Ray Casing */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playDialTick();
                setIsCutaway(!isCutaway);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                isCutaway
                  ? 'bg-[#5E4DB2] text-white border-[#5E4DB2]'
                  : 'bg-white text-[#3F3F46] border-[#DCD5C5] hover:bg-[#F2ECE1]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>See Inside</span>
            </button>

            <button
              onClick={() => {
                sounds.playDialTick();
                setIsRotating(!isRotating);
              }}
              className={`p-1.5 rounded-xl text-xs border transition-all ${
                isRotating
                  ? 'bg-white text-[#5E4DB2] border-[#5E4DB2]'
                  : 'bg-white text-[#888894] border-[#DCD5C5]'
              }`}
              title="Auto-rotate turntable"
            >
              <RotateCcw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
