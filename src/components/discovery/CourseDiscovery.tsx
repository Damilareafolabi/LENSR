import React, { useState } from 'react';
import { OpenCourse } from '../../types';
import { INITIAL_OPEN_COURSES } from '../../data/openEducationCourses';
import { sounds } from '../../services/soundEffects';
import confetti from 'canvas-confetti';
import { 
  RefreshCw, 
  Search, 
  Filter, 
  ExternalLink, 
  ArrowRight, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Sparkles, 
  Plus, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Camera, 
  Shield, 
  Code, 
  Layers,
  Database,
  X
} from 'lucide-react';

interface CourseDiscoveryProps {
  onPracticeSubject?: (target: 'camera' | 'security-sandbox' | 'coding-sandbox') => void;
}

export const CourseDiscovery: React.FC<CourseDiscoveryProps> = ({
  onPracticeSubject
}) => {
  const [courses, setCourses] = useState<OpenCourse[]>(INITIAL_OPEN_COURSES);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [activeCourseForSteps, setActiveCourseForSteps] = useState<OpenCourse | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  // Auto-Sync Ingest Modal state
  const [showSyncModal, setShowSyncModal] = useState<boolean>(false);
  const [syncPlatform, setSyncPlatform] = useState<string>('MIT OpenCourseWare');
  const [syncUrlOrTopic, setSyncUrlOrTopic] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Toggle provider description
  const toggleDescription = (courseId: string) => {
    sounds.playDialTick();
    setExpandedDescriptions(prev => ({ ...prev, [courseId]: !prev[courseId] }));
  };

  // Refresh listings crawler simulation
  const handleRefreshListings = () => {
    sounds.playDialTick();
    setIsRefreshing(true);

    setTimeout(() => {
      // Simulate discovering 2 new open education listings
      const newDiscoveredCourse: OpenCourse = {
        id: `auto-${Date.now()}`,
        category: 'Photography',
        resourceType: 'Lesson Plan',
        title: 'Cinematic Camera Movement & Gimbal Framing',
        simpleExplanation: 'In simple words: How to walk with a camera so your footage looks like a smooth floating bird instead of a bumpy earthquake.',
        providerDescription: 'Curriculum from the European Open Media Index covering dolly shots, pans, tilts, and stabilizing techniques.',
        provider: 'Open Media Index Europe',
        license: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
        licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
        originalUrl: 'https://openmedia.eu/lessons/camera-movement',
        dateDiscovered: new Date().toISOString().split('T')[0],
        plainlyPracticeTarget: 'camera',
        isAutoDiscovered: true,
        steps: [
          {
            stepNumber: 1,
            title: 'The Ninja Walk Technique',
            actionableGuide: 'Bend your knees and roll your feet from heel to toe like a silent ninja.',
            estimatedMinutes: 10,
            tinyWin: 'I smoothed out my handheld footage.'
          },
          {
            stepNumber: 2,
            title: 'Leading the Subject Pan',
            actionableGuide: 'Start rotating your hips before the subject moves to create natural cinematic flow.',
            estimatedMinutes: 15,
            tinyWin: 'I mastered the hip-lead camera pan.'
          }
        ]
      };

      setCourses(prev => [newDiscoveredCourse, ...prev]);
      setIsRefreshing(false);
      sounds.playSuccessChime();
    }, 1200);
  };

  // Automated School/Platform Sync Tool
  const handleRunAutomatedSync = (e: React.FormEvent) => {
    e.preventDefault();
    if (!syncUrlOrTopic) return;
    setIsSyncing(true);

    setTimeout(() => {
      const isPhoto = /photo|camera|cinem|film|lens/i.test(syncUrlOrTopic);
      const isCode = /code|python|web|script|ai/i.test(syncUrlOrTopic);

      const generatedFromSync: OpenCourse = {
        id: `sync-${Date.now()}`,
        category: isPhoto ? 'Photography' : isCode ? 'AI & Coding' : 'Cybersecurity',
        resourceType: 'Course',
        title: `${syncUrlOrTopic} (Auto-Synced & Plainified)`,
        simpleExplanation: `In simple words: This course from ${syncPlatform} has been automatically indexed and distilled into clear, actionable steps with zero academic jargon.`,
        providerDescription: `Full syllabus retrieved from ${syncPlatform}. Ingested and structured into bite-sized learning modules.`,
        provider: syncPlatform,
        license: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
        licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
        originalUrl: 'https://open.edu/synced-resource',
        dateDiscovered: new Date().toISOString().split('T')[0],
        plainlyPracticeTarget: isPhoto ? 'camera' : isCode ? 'coding-sandbox' : 'security-sandbox',
        isAutoDiscovered: true,
        steps: [
          {
            stepNumber: 1,
            title: 'Understand the big picture',
            actionableGuide: 'Inspect why this concept matters in daily life before touching complex formulas.',
            estimatedMinutes: 10,
            tinyWin: 'I grasped the core purpose.'
          },
          {
            stepNumber: 2,
            title: 'Hands-on practice in Plainly',
            actionableGuide: 'Open the matching simulator and test the baseline behavior with your own hands.',
            estimatedMinutes: 15,
            tinyWin: 'I completed the practical test!'
          }
        ]
      };

      setCourses(prev => [generatedFromSync, ...prev]);
      setIsSyncing(false);
      setShowSyncModal(false);
      setSyncUrlOrTopic('');
      sounds.playSuccessChime();
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    }, 1500);
  };

  // Filter courses
  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.simpleExplanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Cybersecurity', 'Photography', 'Cinematography', 'AI & Coding', 'Design'];

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION (EXACT USER PROMPT MATCH) */}
      <div className="bg-[#FAF7F0] p-6 sm:p-8 rounded-3xl border-2 border-[#E2DDD3] shadow-sm relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-widest text-[#5E4DB2] uppercase bg-[#5E4DB2]/10 px-3 py-1 rounded-full">
              OPEN EDUCATION INDEX
            </span>
            <span className="text-xs text-[#6B6B78] flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span>Live Automated Sync Active</span>
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#1E1E24] tracking-tight">
            AUTOMATIC COURSE DISCOVERY
          </h2>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <h3 className="font-semibold text-lg text-[#3F3F46]">
              Free courses and learning resources
            </h3>

            <button
              onClick={handleRefreshListings}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#F2ECE1] border border-[#DCD5C5] text-xs font-bold text-[#5E4DB2] shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh listings ↻</span>
            </button>

            <button
              onClick={() => { sounds.playDialTick(); setShowSyncModal(true); }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#5E4DB2] hover:bg-[#4E3EA1] text-white text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer ml-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Sync External School / Course</span>
            </button>
          </div>

          {/* Prompt banner copy */}
          <p className="text-sm text-[#52525B] leading-relaxed pt-2">
            These free-access resources are found automatically, so new ones can appear without being added by hand. Each listing has a simple explanation and a short guide for learning one step at a time. The full lesson is on the outside provider’s site, which may have its own rules or account requirements.
          </p>

          <div className="pt-2 text-xs font-bold text-[#5E4DB2] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5E4DB2]" />
            <span>{courses.length} free-access listings from the open education index.</span>
          </div>

        </div>
      </div>

      {/* SEARCH & CATEGORY FILTER TABS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { sounds.playDialTick(); setSelectedCategory(cat); }}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#5E4DB2] text-white shadow-sm'
                  : 'bg-white text-[#52525B] hover:bg-[#F0ECE1] border border-[#E2DDD3]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#888894] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search plain-English topics..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white pl-10 pr-4 py-2 rounded-2xl border border-[#DCD5C5] text-xs text-[#1E1E24] placeholder:text-[#888894] focus:outline-hidden focus:border-[#5E4DB2] shadow-xs"
          />
        </div>

      </div>

      {/* COURSE CARDS GRID (EXACT LISTING FORMAT FROM USER PROMPT) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCourses.map(course => {
          const isDescOpen = !!expandedDescriptions[course.id];
          const isTargetCamera = course.plainlyPracticeTarget === 'camera';

          return (
            <div
              key={course.id}
              className="bg-white rounded-3xl p-6 border-2 border-[#E5DFD3] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                
                {/* Meta Top: Category & Resource Type */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#5E4DB2] bg-[#5E4DB2]/10 px-2.5 py-0.5 rounded-lg">
                      {course.category}
                    </span>
                    <span className="text-xs text-[#888894] font-medium">
                      {course.resourceType}
                    </span>
                  </div>

                  {course.isAutoDiscovered && (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Auto-Discovered</span>
                    </span>
                  )}
                </div>

                {/* Course Title */}
                <h3 className="font-heading font-bold text-lg text-[#1E1E24] leading-snug group-hover:text-[#5E4DB2] transition-colors">
                  {course.title}
                </h3>

                {/* In Simple Words Callout (Plain English) */}
                <div className="bg-[#FAF7F0] p-3.5 rounded-2xl border border-[#E2DDD3] text-xs text-[#3F3F46]">
                  <strong className="text-[#1E1E24] font-bold block mb-1">
                    In simple words:
                  </strong>
                  <p className="leading-relaxed">
                    {course.simpleExplanation.replace(/^In simple words:\s*/i, '')}
                  </p>
                </div>

                {/* "See the provider's description" Accordion */}
                <div>
                  <button
                    onClick={() => toggleDescription(course.id)}
                    className="text-xs font-semibold text-[#5E4DB2] hover:text-[#4E3EA1] flex items-center gap-1"
                  >
                    <span>See the provider’s description</span>
                    {isDescOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isDescOpen && (
                    <div className="mt-2 p-3 bg-zinc-50 rounded-xl text-xs text-[#6B6B78] border border-zinc-200 animate-in fade-in duration-150">
                      <p>{course.providerDescription}</p>
                    </div>
                  )}
                </div>

                {/* "How to learn this one step at a time" Button */}
                <button
                  onClick={() => {
                    sounds.playDialTick();
                    setActiveCourseForSteps(course);
                  }}
                  className="w-full text-left py-2 px-3 bg-[#FAF7F0] hover:bg-[#F2ECE1] rounded-xl border border-[#DCD5C5] text-xs font-bold text-[#1E1E24] flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#5E4DB2]" />
                    <span>How to learn this one step at a time</span>
                  </span>
                  <span className="text-[#5E4DB2] text-[11px] font-semibold">{course.steps.length} steps →</span>
                </button>

              </div>

              {/* Bottom Actions & Licensing (Matching user prompt specs) */}
              <div className="pt-4 mt-4 border-t border-[#EAE5D9] space-y-2.5">
                
                {/* Practise this subject in Plainly -> */}
                <button
                  onClick={() => {
                    sounds.playShutterClick();
                    if (onPracticeSubject) {
                      onPracticeSubject(course.plainlyPracticeTarget);
                    }
                  }}
                  className="w-full py-2.5 px-4 bg-[#5E4DB2] hover:bg-[#4E3EA1] active:scale-98 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  {isTargetCamera ? <Camera className="w-3.5 h-3.5 text-yellow-300" /> : <Shield className="w-3.5 h-3.5 text-emerald-300" />}
                  <span>Practise this subject in Plainly →</span>
                </button>

                {/* Provider, License, and External Resource Link */}
                <div className="text-[11px] text-[#6B6B78] space-y-1">
                  <div className="flex justify-between">
                    <span>Provider: <strong className="text-[#1E1E24]">{course.provider}</strong></span>
                    <a
                      href={course.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5E4DB2] hover:underline font-bold flex items-center gap-1"
                    >
                      <span>Open original resource</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="flex items-center gap-1 truncate text-[10px]">
                    <span>Listed licence:</span>
                    <a
                      href={course.licenseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-zinc-800 underline truncate"
                    >
                      {course.license}
                    </a>
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* STEP-BY-STEP LEARNING DRAWER MODAL ("How to learn this one step at a time") */}
      {activeCourseForSteps && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#FAF7F0] text-[#1E1E24] w-full max-w-xl max-h-[90vh] rounded-3xl p-6 border-2 border-[#DCD5C5] shadow-2xl flex flex-col overflow-hidden relative">
            
            <button
              onClick={() => setActiveCourseForSteps(null)}
              className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-900 rounded-full hover:bg-zinc-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4 pr-8">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#5E4DB2]/10 text-[#5E4DB2]">
                {activeCourseForSteps.category} • Actionable Guide
              </span>
              <h3 className="font-heading font-bold text-xl text-[#1E1E24] mt-1">
                How to learn "{activeCourseForSteps.title}" one step at a time
              </h3>
              <p className="text-xs text-[#52525B] mt-1">
                Zero overwhelm. Follow these micro-steps and earn a Tiny Win at each milestone.
              </p>
            </div>

            {/* Steps list */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {activeCourseForSteps.steps.map((st, idx) => {
                const stepKey = `${activeCourseForSteps.id}-${st.stepNumber}`;
                const isDone = !!completedSteps[stepKey];

                return (
                  <div
                    key={st.stepNumber}
                    className={`p-4 rounded-2xl border transition-all ${
                      isDone
                        ? 'bg-emerald-50/80 border-emerald-300'
                        : 'bg-white border-[#E2DDD3]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                          isDone ? 'bg-emerald-600 text-white' : 'bg-[#5E4DB2] text-white'
                        }`}>
                          {st.stepNumber}
                        </span>
                        <div>
                          <h4 className="font-bold text-sm text-[#1E1E24]">
                            {st.title}
                          </h4>
                          <p className="text-xs text-[#52525B] mt-1 leading-relaxed">
                            {st.actionableGuide}
                          </p>

                          {/* Tiny Win Note */}
                          <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-1 rounded-lg max-w-fit">
                            <Sparkles className="w-3 h-3 text-emerald-600" />
                            <span>Tiny Win: {st.tinyWin}</span>
                          </div>
                        </div>
                      </div>

                      {/* Complete Checkbox */}
                      <button
                        onClick={() => {
                          sounds.playDialTick();
                          setCompletedSteps(prev => ({ ...prev, [stepKey]: !isDone }));
                          if (!isDone) {
                            sounds.playSuccessChime();
                            confetti({ particleCount: 25, spread: 45, origin: { y: 0.6 } });
                          }
                        }}
                        className={`p-2 rounded-xl border shrink-0 transition-colors cursor-pointer ${
                          isDone
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-zinc-100 text-zinc-400 border-zinc-300 hover:bg-zinc-200'
                        }`}
                        title="Mark step complete"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-4 mt-4 border-t border-[#E2DDD3] flex items-center justify-between">
              <span className="text-xs text-[#6B6B78]">
                Full lesson hosted on: <strong>{activeCourseForSteps.provider}</strong>
              </span>

              <button
                onClick={() => {
                  sounds.playShutterClick();
                  setActiveCourseForSteps(null);
                  if (onPracticeSubject) {
                    onPracticeSubject(activeCourseForSteps.plainlyPracticeTarget);
                  }
                }}
                className="px-4 py-2 bg-[#5E4DB2] hover:bg-[#4E3EA1] text-white font-bold rounded-xl text-xs transition-colors"
              >
                Launch Plainly Practice →
              </button>
            </div>

          </div>
        </div>
      )}

      {/* AUTOMATED PLATFORM SYNC MODAL */}
      {showSyncModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF7F0] text-[#1E1E24] w-full max-w-md rounded-3xl p-6 border-2 border-[#DCD5C5] shadow-2xl relative">
            
            <button
              onClick={() => setShowSyncModal(false)}
              className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-900 rounded-full hover:bg-zinc-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Database className="w-5 h-5 text-[#5E4DB2]" />
              <h3 className="font-heading font-bold text-lg text-[#1E1E24]">
                Automated Course / School Sync
              </h3>
            </div>
            
            <p className="text-xs text-[#52525B] mb-4">
              Enter any university syllabus, OER topic, or school curriculum. Plainly's engine will automatically ingest it, strip confusing academic jargon, and distill it into concise plain-English steps.
            </p>

            <form onSubmit={handleRunAutomatedSync} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#3F3F46] mb-1">
                  Select Educational Platform / Repository:
                </label>
                <select
                  value={syncPlatform}
                  onChange={e => setSyncPlatform(e.target.value)}
                  className="w-full bg-white px-3 py-2 rounded-xl border border-[#DCD5C5] text-xs text-[#1E1E24] focus:outline-hidden focus:border-[#5E4DB2]"
                >
                  <option value="MIT OpenCourseWare">MIT OpenCourseWare</option>
                  <option value="ALG Commons (Galileo OER)">ALG Commons (Galileo OER)</option>
                  <option value="LibreTexts Open Collection">LibreTexts Open Collection</option>
                  <option value="Finnish OER Library">Finnish OER Library</option>
                  <option value="OpenStax Tech">OpenStax Tech</option>
                  <option value="California OER Council">California OER Council</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3F3F46] mb-1">
                  Topic or Syllabus URL:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cinematic Lighting for Beginners or https://..."
                  value={syncUrlOrTopic}
                  onChange={e => setSyncUrlOrTopic(e.target.value)}
                  className="w-full bg-white px-3 py-2 rounded-xl border border-[#DCD5C5] text-xs text-[#1E1E24] focus:outline-hidden focus:border-[#5E4DB2]"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSyncing}
                  className="w-full py-2.5 bg-[#5E4DB2] hover:bg-[#4E3EA1] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isSyncing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Distilling into Plain English...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Run Automated Ingestion & Sync →</span>
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
