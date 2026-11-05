import React, { useState } from 'react';
import { UNIVERSITY_CATALOG, UniversityCourse } from '../../data/universityCatalog';
import { sounds } from '../../services/soundEffects';
import { 
  Search, 
  Filter, 
  Star, 
  Users, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Camera, 
  Sliders, 
  Shield, 
  Code, 
  Heart, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  Laptop,
  Check
} from 'lucide-react';

interface AllAccessCatalogProps {
  onSelectCourse: (course: UniversityCourse) => void;
  onLaunchPracticeRoom: (type: 'camera' | 'photoshop' | 'security' | 'coding' | 'habits') => void;
}

export const AllAccessCatalog: React.FC<AllAccessCatalogProps> = ({
  onSelectCourse,
  onLaunchPracticeRoom
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPartner, setSelectedPartner] = useState<string>('All');
  const [enrolledCourses, setEnrolledCourses] = useState<Record<string, boolean>>({
    'course-photo-mastery': true,
    'course-photoshop-pro': true
  });

  const categories = ['All', 'Photography & Film', 'Photoshop & Retouching', 'Cybersecurity', 'AI & Tech', 'Business & Life'];
  const partners = ['All', 'California Institute of the Arts', 'National Film & Cinematic Arts Institute', 'Editorial Arts Institute', 'Stanford Online Initiative', 'Global Security Consortium', 'IBM Skills Network', 'Yale University Institute'];

  const filteredCourses = UNIVERSITY_CATALOG.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.plainEnglishSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.partner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesPartner = selectedPartner === 'All' || c.partner === selectedPartner;
    return matchesSearch && matchesCat && matchesPartner;
  });

  const handleEnroll = (courseId: string) => {
    sounds.playSuccessChime();
    setEnrolledCourses(prev => ({ ...prev, [courseId]: true }));
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner: All-Access University Catalog */}
      <div className="bg-[#FAF7F0] p-6 sm:p-8 rounded-3xl border-2 border-[#E2DDD3] shadow-sm relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-widest text-[#5E4DB2] uppercase bg-[#5E4DB2]/10 px-3 py-1 rounded-full">
              GLOBAL OPEN UNIVERSITY REPOSITORY
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>Unlimited Free Access Included</span>
            </span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#1E1E24] tracking-tight">
            World-Class University Specializations & Certificates
          </h2>

          <p className="text-sm text-[#52525B] leading-relaxed">
            Gain job-ready credentials from premier institutions. Every single lecture is distilled into plain, zero-jargon English, backed by 24/7 dedicated AI Teachers and interactive practice rooms where you build real projects.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-[#1E1E24]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>7,000+ Free Learning Paths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Dedicated AI Teacher Mentors</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Interactive Hands-On Practice Rooms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Category Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { sounds.playDialTick(); setSelectedCategory(cat); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#5E4DB2] text-white shadow-xs'
                  : 'bg-white text-[#52525B] hover:bg-[#F0ECE1] border border-[#E2DDD3]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#888894] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search specializations..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white pl-10 pr-4 py-2 rounded-2xl border border-[#DCD5C5] text-xs text-[#1E1E24] placeholder:text-[#888894] focus:outline-hidden focus:border-[#5E4DB2]"
          />
        </div>

      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => {
          const isEnrolled = !!enrolledCourses[course.id];

          return (
            <div
              key={course.id}
              className="bg-white rounded-3xl p-6 border-2 border-[#E5DFD3] shadow-card-hover flex flex-col justify-between group"
            >
              <div className="space-y-3">
                
                {/* Institution Banner */}
                <div className="flex items-center justify-between">
                  <span 
                    className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-md text-white tracking-wider"
                    style={{ backgroundColor: course.partnerBadgeColor }}
                  >
                    {course.partnerLogoText}
                  </span>

                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{course.rating}</span>
                    <span className="text-zinc-400 font-normal">({course.enrolledLearners})</span>
                  </div>
                </div>

                {/* Course Title */}
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block">
                    {course.specialization}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-[#1E1E24] group-hover:text-[#5E4DB2] transition-colors leading-snug mt-0.5">
                    {course.title}
                  </h3>
                </div>

                {/* Plain English Summary */}
                <div className="bg-[#FAF7F0] p-3 rounded-2xl border border-[#E2DDD3] text-xs text-[#3F3F46]">
                  <strong className="text-[#5E4DB2] font-bold block mb-0.5">In plain English:</strong>
                  <p className="line-clamp-2 leading-relaxed">{course.plainEnglishSummary}</p>
                </div>

                {/* AI Teacher Avatar & Name */}
                <div className="flex items-center justify-between pt-1 border-t border-zinc-100">
                  <div className="flex items-center gap-2">
                    <img
                      src={course.aiTeacher.avatar}
                      alt={course.aiTeacher.name}
                      className="w-7 h-7 rounded-full object-cover border border-zinc-200"
                    />
                    <div>
                      <span className="text-xs font-bold text-[#1E1E24] block leading-none">
                        {course.aiTeacher.name}
                      </span>
                      <span className="text-[10px] text-zinc-500">AI Teacher Mentor</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold text-zinc-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{course.duration.split(' ')[0]} {course.duration.split(' ')[1]}</span>
                  </span>
                </div>

                {/* Practice Room Feature Badge */}
                <div className="bg-indigo-50/70 p-2.5 rounded-xl border border-indigo-100 text-xs flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-indigo-600 text-white shrink-0">
                    {course.practiceRoom.type === 'camera' ? <Camera className="w-3.5 h-3.5" /> :
                     course.practiceRoom.type === 'photoshop' ? <Sliders className="w-3.5 h-3.5" /> :
                     course.practiceRoom.type === 'security' ? <Shield className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
                  </span>
                  <div className="truncate">
                    <span className="text-[10px] text-indigo-700 font-bold block uppercase leading-none">Practice Room</span>
                    <span className="text-zinc-800 font-semibold truncate text-[11px]">{course.practiceRoom.name}</span>
                  </div>
                </div>

              </div>

              {/* Bottom Card Actions */}
              <div className="pt-4 mt-4 border-t border-[#EAE5D9] space-y-2">
                <button
                  onClick={() => {
                    sounds.playDialTick();
                    onSelectCourse(course);
                  }}
                  className="w-full py-2.5 px-4 bg-[#5E4DB2] hover:bg-[#4E3EA1] active:scale-98 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Ask AI Teacher in Plain English →</span>
                </button>

                <div className="flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      sounds.playShutterClick();
                      onLaunchPracticeRoom(course.practiceRoom.type);
                    }}
                    className="text-[#5E4DB2] hover:underline font-bold text-[11px]"
                  >
                    Open Practice Room ↗
                  </button>

                  <span className="text-[11px] text-zinc-500">
                    Partner: <strong className="text-zinc-800">{course.partnerLogoText}</strong>
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
