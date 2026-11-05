import React, { useState } from 'react';
import { ActiveTab, CapturedPhoto, CameraPartAnatomy } from './types';
import { UniversityHub } from './components/university/UniversityHub';
import { AllAccessCatalog } from './components/university/AllAccessCatalog';
import { AITeacherModal } from './components/university/AITeacherModal';
import { Camera3DScene } from './components/camera/Camera3DScene';
import { VirtualARViewfinder } from './components/camera/VirtualARViewfinder';
import { DiagramInspectorModal } from './components/camera/DiagramInspectorModal';
import { PhotoshopEditor } from './components/editor/PhotoshopEditor';
import { CourseDiscovery } from './components/discovery/CourseDiscovery';
import { PlainEnglishBlog } from './components/blog/PlainEnglishBlog';
import { MyLaptop } from './components/dashboard/MyLaptop';
import { SecuritySandbox } from './components/sandboxes/SecuritySandbox';
import { UNIVERSITY_CATALOG, UniversityCourse } from './data/universityCatalog';
import { sounds } from './services/soundEffects';
import confetti from 'canvas-confetti';
import { 
  Camera, 
  Sliders, 
  BookOpen, 
  Globe, 
  Laptop, 
  Sparkles, 
  Smile, 
  Award, 
  Shield, 
  RotateCcw,
  Menu,
  X,
  ChevronRight,
  Eye,
  Layers,
  GraduationCap
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab | 'catalog' | 'security'>('university');
  
  // Camera sub-view: 3D scene vs first-person AR viewfinder
  const [cameraSubMode, setCameraSubMode] = useState<'3d' | 'ar'>('3d');

  // Diagrams modal state
  const [isDiagramsOpen, setIsDiagramsOpen] = useState<boolean>(false);

  // AI Teacher modal state
  const [activeAiCourse, setActiveAiCourse] = useState<UniversityCourse | null>(null);

  // Photos captured & passed to Photoshop
  const [capturedPhotos, setCapturedPhotos] = useState<CapturedPhoto[]>([]);
  const [editorPhotoUrl, setEditorPhotoUrl] = useState<string | undefined>(undefined);

  // Mobile navigation menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Handle Photo Captured in 3D AR Camera
  const handlePhotoCaptured = (photo: CapturedPhoto) => {
    setCapturedPhotos(prev => [photo, ...prev]);
  };

  // Switch to Photoshop with captured or sample photo
  const handleOpenEditorWithPhoto = (photoUrl: string) => {
    setEditorPhotoUrl(photoUrl);
    setActiveTab('editor');
  };

  // Launch Practice Room from Course or Catalog
  const handleLaunchPracticeRoom = (type: 'camera' | 'photoshop' | 'security' | 'coding' | 'habits') => {
    switch (type) {
      case 'camera':
        setActiveTab('camera');
        setCameraSubMode('ar');
        break;
      case 'photoshop':
        setActiveTab('editor');
        break;
      case 'security':
        setActiveTab('security');
        break;
      case 'coding':
      case 'habits':
      default:
        setActiveTab('discovery');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1E1E24] flex flex-col font-sans">
      
      {/* 1. TOP HEADER NAVIGATION (PLAINLY UNIVERSITY STYLE) */}
      <header className="sticky top-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#E8E2D5] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        
        {/* Brand Logo matching attached image: "p. plainly" */}
        <div 
          onClick={() => { sounds.playDialTick(); setActiveTab('university'); }}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded-xl bg-[#5E4DB2] text-white flex items-center justify-center font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
            p.
          </div>
          <span className="font-heading font-black text-2xl tracking-tight text-[#1E1E24]">
            plainly
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 hidden sm:inline-block" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-[#52525B]">
          
          <button
            onClick={() => { sounds.playDialTick(); setActiveTab('university'); }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'university' ? 'bg-[#5E4DB2] text-white shadow-xs' : 'hover:bg-[#EFEAE0] hover:text-[#1E1E24]'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => { sounds.playDialTick(); setActiveTab('catalog'); }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'catalog' ? 'bg-[#5E4DB2] text-white shadow-xs' : 'hover:bg-[#EFEAE0] hover:text-[#1E1E24]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
            <span>All-Access Catalog (AI Teachers)</span>
          </button>

          <button
            onClick={() => { sounds.playShutterClick(); setActiveTab('camera'); }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'camera' ? 'bg-[#5E4DB2] text-white shadow-xs' : 'hover:bg-[#EFEAE0] hover:text-[#1E1E24]'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-yellow-500" />
            <span>Take a Camera (3D AR)</span>
          </button>

          <button
            onClick={() => { sounds.playDialTick(); setActiveTab('editor'); }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'editor' ? 'bg-[#007ACC] text-white shadow-xs' : 'hover:bg-[#EFEAE0] hover:text-[#1E1E24]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-[#007ACC]" />
            <span>Photoshop Studio</span>
          </button>

          <button
            onClick={() => { sounds.playDialTick(); setActiveTab('discovery'); }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'discovery' ? 'bg-[#5E4DB2] text-white shadow-xs' : 'hover:bg-[#EFEAE0] hover:text-[#1E1E24]'
            }`}
          >
            Auto Discovery ↻
          </button>

          <button
            onClick={() => { sounds.playDialTick(); setActiveTab('blog'); }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'blog' ? 'bg-[#5E4DB2] text-white shadow-xs' : 'hover:bg-[#EFEAE0] hover:text-[#1E1E24]'
            }`}
          >
            Guides & Blog
          </button>

          <button
            onClick={() => { sounds.playDialTick(); setActiveTab('laptop'); }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'laptop' ? 'bg-[#5E4DB2] text-white shadow-xs' : 'hover:bg-[#EFEAE0] hover:text-[#1E1E24]'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>My Laptop</span>
          </button>

        </nav>

        {/* Right Action: Quick Take a Camera CTA Button & Avatar */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sounds.playShutterClick();
              setActiveTab('camera');
              setCameraSubMode('ar');
            }}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#5E4DB2] hover:bg-[#4E3EA1] active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-yellow-300" />
            <span>Hold Camera (AR)</span>
          </button>

          <div 
            onClick={() => { sounds.playDialTick(); setActiveTab('laptop'); }}
            className="w-8 h-8 rounded-full bg-[#E5DFD3] border border-[#DCD5C5] flex items-center justify-center text-sm cursor-pointer hover:scale-105 transition-transform"
            title="My Learning Profile"
          >
            😊
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#52525B] hover:bg-[#EFEAE0]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </header>

      {/* MOBILE COLLAPSIBLE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F0] border-b border-[#E8E2D5] px-4 py-3 space-y-2 text-xs font-bold animate-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => { setActiveTab('university'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#EFEAE0]"
          >
            Home (University)
          </button>
          <button
            onClick={() => { setActiveTab('catalog'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#EFEAE0] text-[#5E4DB2]"
          >
            All-Access University Catalog (AI Teachers)
          </button>
          <button
            onClick={() => { setActiveTab('camera'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#EFEAE0]"
          >
            Take a Camera (3D Virtual DSLR & AR)
          </button>
          <button
            onClick={() => { setActiveTab('editor'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#EFEAE0] text-[#007ACC]"
          >
            Photoshop Photography Studio
          </button>
          <button
            onClick={() => { setActiveTab('discovery'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#EFEAE0]"
          >
            Automatic Course Discovery ↻
          </button>
          <button
            onClick={() => { setActiveTab('blog'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#EFEAE0]"
          >
            Plain-English Blog & SEO Guides
          </button>
          <button
            onClick={() => { setActiveTab('laptop'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#EFEAE0]"
          >
            My Laptop & Saved Shots
          </button>
        </div>
      )}

      {/* 2. MAIN ACTIVE VIEW ROUTER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* VIEW 1: UNIVERSITY HOME HUB */}
        {activeTab === 'university' && (
          <UniversityHub
            onOpenVirtualCamera={() => { setActiveTab('camera'); setCameraSubMode('ar'); }}
            onOpenPhotoshop={() => setActiveTab('editor')}
            onOpenDiscovery={() => setActiveTab('discovery')}
            onOpenBlog={() => setActiveTab('blog')}
            onOpenLaptop={() => setActiveTab('laptop')}
          />
        )}

        {/* VIEW 2: ALL-ACCESS UNIVERSITY CATALOG (SPECIALIZATIONS & AI TEACHERS) */}
        {activeTab === 'catalog' && (
          <AllAccessCatalog
            onSelectCourse={course => setActiveAiCourse(course)}
            onLaunchPracticeRoom={handleLaunchPracticeRoom}
          />
        )}

        {/* VIEW 3: VIRTUAL 3D CAMERA & AR VIEWFINDER STUDIO */}
        {activeTab === 'camera' && (
          <div className="space-y-6">
            
            {/* Camera View Switcher Bar */}
            <div className="bg-[#FAF7F0] p-4 rounded-3xl border-2 border-[#E2DDD3] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-[#5E4DB2] uppercase tracking-wider block">
                  Interactive Optical Studio
                </span>
                <h2 className="font-heading font-black text-2xl text-[#1E1E24]">
                  3D Virtual Camera & AR Framing Studio
                </h2>
                <p className="text-xs text-[#52525B]">
                  Inspect the physical cross-section or look through the live lens viewfinder with AR composition guides.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => { sounds.playDialTick(); setCameraSubMode('3d'); }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    cameraSubMode === '3d'
                      ? 'bg-[#5E4DB2] text-white shadow-xs'
                      : 'bg-white text-[#52525B] hover:bg-[#F0ECE1] border border-[#DCD5C5]'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>3D Anatomy & Exploded View</span>
                </button>

                <button
                  onClick={() => { sounds.playShutterClick(); setCameraSubMode('ar'); }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    cameraSubMode === 'ar'
                      ? 'bg-[#5E4DB2] text-white shadow-xs'
                      : 'bg-white text-[#52525B] hover:bg-[#F0ECE1] border border-[#DCD5C5]'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Hold in Hands (AR Viewfinder)</span>
                </button>

                <button
                  onClick={() => { sounds.playDialTick(); setIsDiagramsOpen(true); }}
                  className="px-3 py-2 rounded-xl bg-white hover:bg-[#F0ECE1] border border-[#DCD5C5] text-xs font-bold text-[#1E1E24] flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="View Authentic DSLR Schematics"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#5E4DB2]" />
                  <span className="hidden sm:inline">Schematics</span>
                </button>
              </div>
            </div>

            {/* Sub-mode A: 3D Anatomy Scene */}
            {cameraSubMode === '3d' && (
              <Camera3DScene
                onOpenViewfinder={() => setCameraSubMode('ar')}
              />
            )}

            {/* Sub-mode B: First-Person AR Viewfinder */}
            {cameraSubMode === 'ar' && (
              <VirtualARViewfinder
                onPhotoCaptured={handlePhotoCaptured}
                onExit={() => setCameraSubMode('3d')}
                onOpenInPhotoshop={handleOpenEditorWithPhoto}
              />
            )}

            {/* Bottom Tip for Photoshop Bridge */}
            <div className="bg-white p-4 rounded-2xl border border-[#DCD5C5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-xs">
              <div className="flex items-center gap-2.5">
                <Sliders className="w-5 h-5 text-[#007ACC] shrink-0" />
                <span className="text-[#3F3F46]">
                  Captured photos can be imported directly into our <strong>Photoshop Photography Studio</strong> for frequency separation skin retouching!
                </span>
              </div>

              <button
                onClick={() => setActiveTab('editor')}
                className="px-4 py-2 bg-[#007ACC] hover:bg-[#0062A3] text-white font-bold rounded-xl text-xs whitespace-nowrap transition-colors"
              >
                Open Photoshop Studio →
              </button>
            </div>

          </div>
        )}

        {/* VIEW 4: PHOTOSHOP PHOTOGRAPHY EDITING SUITE */}
        {activeTab === 'editor' && (
          <div className="space-y-4">
            <div className="bg-[#FAF7F0] p-4 rounded-2xl border border-[#E2DDD3] flex items-center justify-between">
              <div>
                <h3 className="font-heading font-black text-xl text-[#1E1E24]">
                  Photoshop Photography Studio & Masterclass Suite
                </h3>
                <p className="text-xs text-[#6B6B78]">
                  Authentic professional editing interface: Frequency Separation, Dodge & Burn, and Vogue Melanin Color Grading.
                </p>
              </div>

              <button
                onClick={() => { setActiveTab('camera'); setCameraSubMode('ar'); }}
                className="px-3.5 py-1.5 bg-[#5E4DB2] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-[#4E3EA1]"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Shoot with 3D Camera</span>
              </button>
            </div>

            <PhotoshopEditor
              initialPhotoUrl={editorPhotoUrl}
              onSaveToLaptop={(editedUrl, title) => {
                sounds.playSuccessChime();
                confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
                setActiveTab('laptop');
              }}
            />
          </div>
        )}

        {/* VIEW 5: AUTOMATIC COURSE DISCOVERY FEED */}
        {activeTab === 'discovery' && (
          <CourseDiscovery
            onPracticeSubject={target => {
              if (target === 'camera') {
                setActiveTab('camera');
                setCameraSubMode('ar');
              } else if (target === 'security-sandbox') {
                setActiveTab('security');
              } else {
                setActiveTab('catalog');
              }
            }}
          />
        )}

        {/* VIEW 6: SEO EDUCATIONAL BLOG */}
        {activeTab === 'blog' && (
          <PlainEnglishBlog
            onOpenPractice={target => {
              if (target.includes('photo') || target.includes('camera') || target.includes('cine')) {
                setActiveTab('camera');
                setCameraSubMode('ar');
              } else {
                setActiveTab('editor');
              }
            }}
          />
        )}

        {/* VIEW 7: MY LAPTOP & SAVED PHOTO ROLL */}
        {activeTab === 'laptop' && (
          <MyLaptop
            capturedPhotos={capturedPhotos}
            onOpenEditorWithPhoto={handleOpenEditorWithPhoto}
            onOpenVirtualCamera={() => { setActiveTab('camera'); setCameraSubMode('ar'); }}
          />
        )}

        {/* VIEW 8: CYBERSECURITY PRACTICE ROOM */}
        {activeTab === 'security' && (
          <SecuritySandbox
            onBackToUniversity={() => setActiveTab('catalog')}
          />
        )}

      </main>

      {/* 3. MODALS: DIAGRAM INSPECTOR & AI TEACHER */}
      <DiagramInspectorModal
        isOpen={isDiagramsOpen}
        onClose={() => setIsDiagramsOpen(false)}
      />

      {activeAiCourse && (
        <AITeacherModal
          course={activeAiCourse}
          isOpen={!!activeAiCourse}
          onClose={() => setActiveAiCourse(null)}
          onLaunchPracticeRoom={handleLaunchPracticeRoom}
        />
      )}

      {/* 4. FOOTER */}
      <footer className="mt-16 bg-[#F4EFE4] border-t border-[#E5DFD3] py-10 px-6 sm:px-12 text-xs text-[#6B6B78]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-heading font-black text-lg text-[#1E1E24]">plainly.</span>
            <span>— The Free Practical Learning University</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <button onClick={() => setActiveTab('camera')} className="hover:text-[#1E1E24]">3D Virtual Camera</button>
            <span>•</span>
            <button onClick={() => setActiveTab('editor')} className="hover:text-[#1E1E24]">Photoshop Studio</button>
            <span>•</span>
            <button onClick={() => setActiveTab('catalog')} className="hover:text-[#1E1E24]">AI Teachers</button>
            <span>•</span>
            <button onClick={() => setActiveTab('discovery')} className="hover:text-[#1E1E24]">Auto Discovery</button>
          </div>

          <p className="text-[11px] text-[#888894]">
            Open education license • Accessible worldwide with zero gear costs
          </p>
        </div>
      </footer>

    </div>
  );
}
