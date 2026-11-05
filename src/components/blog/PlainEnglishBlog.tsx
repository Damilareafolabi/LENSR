import React, { useState } from 'react';
import { BlogPost } from '../../types';
import { INITIAL_BLOG_POSTS, generateTrendingArticle } from '../../data/blogPosts';
import { sounds } from '../../services/soundEffects';
import confetti from 'canvas-confetti';
import { 
  BookOpen, 
  Clock, 
  Heart, 
  Share2, 
  Sparkles, 
  Tag, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Sliders, 
  Eye, 
  Globe, 
  Plus, 
  Check,
  TrendingUp,
  X
} from 'lucide-react';

interface PlainEnglishBlogProps {
  onOpenPractice?: (target: string) => void;
}

export const PlainEnglishBlog: React.FC<PlainEnglishBlogProps> = ({
  onOpenPractice
}) => {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [userLiked, setUserLiked] = useState<Record<string, boolean>>({});

  // Interactive In-Article Mini Aperture Bokeh Widget state
  const [interactiveAperture, setInteractiveAperture] = useState<number>(1.8);

  // Auto Blog Generator modal
  const [showGeneratorModal, setShowGeneratorModal] = useState<boolean>(false);
  const [genTopic, setGenTopic] = useState<string>('');
  const [genCategory, setGenCategory] = useState<string>('Photography');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // SEO Schema Preview modal
  const [showSeoModal, setShowSeoModal] = useState<boolean>(false);

  const handleLike = (postId: string) => {
    sounds.playDialTick();
    const hasLiked = !!userLiked[postId];
    setUserLiked(prev => ({ ...prev, [postId]: !hasLiked }));
    setLikes(prev => ({
      ...prev,
      [postId]: (prev[postId] || 0) + (hasLiked ? -1 : 1)
    }));
  };

  const handleGeneratePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!genTopic) return;
    setIsGenerating(true);

    setTimeout(() => {
      const newPost = generateTrendingArticle(genTopic, genCategory);
      setPosts(prev => [newPost, ...prev]);
      setIsGenerating(false);
      setShowGeneratorModal(false);
      setGenTopic('');
      sounds.playSuccessChime();
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    }, 1200);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.plainEnglishSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const allTags = ['All', 'Photography', 'Cybersecurity', 'Cinematography', 'Composition', 'Zero Gear Budget'];

  return (
    <div className="space-y-6">
      
      {/* Blog Hero Header */}
      <div className="bg-[#FAF7F0] p-6 sm:p-8 rounded-3xl border-2 border-[#E2DDD3] shadow-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-widest text-[#5E4DB2] uppercase bg-[#5E4DB2]/10 px-3 py-1 rounded-full">
              PLAINLY INSIGHTS & VIRAL GUIDES
            </span>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>SEO Organic Traffic Engine</span>
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#1E1E24]">
            Practical Learning Guides That Make Sense
          </h2>

          <p className="text-sm text-[#52525B] leading-relaxed">
            Every article is crafted in plain English with actionable checklists and zero academic fluff. Designed to rank on Google and provide immediate real-world value.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => { sounds.playDialTick(); setShowGeneratorModal(true); }}
            className="px-4 py-2.5 bg-[#5E4DB2] hover:bg-[#4E3EA1] text-white font-bold text-xs rounded-2xl shadow-sm flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>⚡ Auto-Generate New Trending Guide</span>
          </button>

          <button
            onClick={() => { sounds.playDialTick(); setShowSeoModal(true); }}
            className="px-4 py-2.5 bg-white hover:bg-[#F2ECE1] text-[#3F3F46] border border-[#DCD5C5] font-semibold text-xs rounded-2xl shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Globe className="w-4 h-4 text-[#5E4DB2]" />
            <span>SEO SERP & Schema Preview</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => { sounds.playDialTick(); setSelectedTag(tag); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedTag === tag
                  ? 'bg-[#5E4DB2] text-white shadow-xs'
                  : 'bg-white text-[#52525B] hover:bg-[#F0ECE1] border border-[#E2DDD3]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#888894] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search guides..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white pl-10 pr-4 py-2 rounded-2xl border border-[#DCD5C5] text-xs text-[#1E1E24] placeholder:text-[#888894] focus:outline-hidden focus:border-[#5E4DB2]"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map(post => {
          const postLikes = (likes[post.id] || 0) + post.likesCount;
          const isLiked = !!userLiked[post.id];

          return (
            <article
              key={post.id}
              className="bg-white rounded-3xl p-6 border-2 border-[#E5DFD3] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-[#6B6B78]">
                  <span className="font-extrabold text-[#5E4DB2] bg-[#5E4DB2]/10 px-2.5 py-0.5 rounded-lg">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 
                  onClick={() => { sounds.playDialTick(); setActivePost(post); }}
                  className="font-heading font-bold text-xl text-[#1E1E24] hover:text-[#5E4DB2] cursor-pointer transition-colors leading-snug"
                >
                  {post.title}
                </h3>

                <p className="text-xs text-[#52525B] leading-relaxed">
                  {post.subtitle}
                </p>

                {/* Plain English Highlight box */}
                <div className="bg-[#FAF7F0] p-3 rounded-2xl border border-[#E2DDD3] text-xs text-[#3F3F46]">
                  <strong className="text-[#5E4DB2] block mb-0.5 font-bold">In plain English:</strong>
                  <p className="line-clamp-2 leading-relaxed">{post.plainEnglishSummary}</p>
                </div>

                {/* Author row */}
                <div className="flex items-center gap-2.5 pt-1">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-7 h-7 rounded-full object-cover border border-zinc-200"
                  />
                  <div>
                    <span className="font-bold text-xs text-[#1E1E24] block leading-none">
                      {post.author.name}
                    </span>
                    <span className="text-[10px] text-[#6B6B78]">{post.author.role}</span>
                  </div>
                </div>

              </div>

              {/* Bottom Actions */}
              <div className="pt-4 mt-4 border-t border-[#EAE5D9] flex items-center justify-between">
                <button
                  onClick={() => { sounds.playDialTick(); setActivePost(post); }}
                  className="text-xs font-bold text-[#5E4DB2] hover:text-[#4E3EA1] flex items-center gap-1 cursor-pointer"
                >
                  <span>Read full guide & practice</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-3 text-xs text-[#6B6B78]">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1 hover:text-rose-500 transition-colors ${
                      isLiked ? 'text-rose-500 font-bold' : ''
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500' : ''}`} />
                    <span>{postLikes}</span>
                  </button>

                  <span className="flex items-center gap-1 text-[11px]">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{post.viewsCount.toLocaleString()}</span>
                  </span>
                </div>
              </div>

            </article>
          );
        })}
      </div>

      {/* FULL ARTICLE MODAL WITH EMBEDDED INTERACTIVE WIDGETS */}
      {activePost && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-[#FAF7F0] text-[#1E1E24] w-full max-w-3xl max-h-[92vh] rounded-3xl border-2 border-[#DCD5C5] shadow-2xl flex flex-col overflow-hidden relative">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#E2DDD3] flex items-center justify-between bg-[#F4EFE4]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5E4DB2] bg-[#5E4DB2]/10 px-2.5 py-0.5 rounded-lg">
                  {activePost.category}
                </span>
                <span className="text-xs text-[#6B6B78]">{activePost.readTime}</span>
              </div>

              <button
                onClick={() => setActivePost(null)}
                className="p-1.5 text-zinc-500 hover:text-zinc-900 rounded-full hover:bg-zinc-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#1E1E24] leading-tight">
                  {activePost.title}
                </h2>
                <p className="text-sm text-[#52525B] mt-2">
                  {activePost.subtitle}
                </p>

                {/* Author Bar */}
                <div className="flex items-center gap-3 mt-4 pt-3 border-t border-[#E5DFD3]">
                  <img
                    src={activePost.author.avatar}
                    alt={activePost.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-zinc-300"
                  />
                  <div>
                    <span className="font-bold text-sm text-[#1E1E24] block">
                      {activePost.author.name}
                    </span>
                    <span className="text-xs text-[#6B6B78]">{activePost.author.role} • {activePost.date}</span>
                  </div>
                </div>
              </div>

              {/* Plain English Summary Callout */}
              <div className="bg-[#FAF7F0] p-4 rounded-2xl border-2 border-[#5E4DB2]/30 shadow-xs">
                <span className="text-xs font-bold text-[#5E4DB2] uppercase tracking-wider block mb-1">
                  Plain English TL;DR:
                </span>
                <p className="text-sm text-[#3F3F46] leading-relaxed">
                  {activePost.plainEnglishSummary}
                </p>
              </div>

              {/* EMBEDDED INTERACTIVE WIDGET (Directly inside the article) */}
              {activePost.category === 'Photography' && (
                <div className="bg-white p-5 rounded-2xl border-2 border-[#DCD5C5] shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider text-[#5E4DB2] flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Interactive In-Article Bokeh Experiment</span>
                    </span>
                    <span className="font-mono text-xs font-bold text-[#1E1E24]">f/{interactiveAperture}</span>
                  </div>

                  <p className="text-xs text-[#6B6B78]">
                    Drag the aperture slider below to see how opening the iris blurs the background lights:
                  </p>

                  <div className="relative h-28 rounded-xl overflow-hidden bg-gradient-to-r from-amber-600 to-indigo-900 p-3 flex items-center justify-between">
                    {/* Background blurry lights */}
                    <div className="absolute inset-0 flex justify-around items-center opacity-70">
                      <div 
                        className="w-16 h-16 rounded-full bg-yellow-300 transition-all duration-200"
                        style={{ filter: `blur(${Math.max(0, (5 - interactiveAperture * 0.3) * 6)}px)` }}
                      />
                      <div 
                        className="w-20 h-20 rounded-full bg-rose-400 transition-all duration-200"
                        style={{ filter: `blur(${Math.max(0, (5 - interactiveAperture * 0.3) * 8)}px)` }}
                      />
                      <div 
                        className="w-14 h-14 rounded-full bg-cyan-300 transition-all duration-200"
                        style={{ filter: `blur(${Math.max(0, (5 - interactiveAperture * 0.3) * 5)}px)` }}
                      />
                    </div>

                    {/* Sharp Foreground Subject (Silhouette) */}
                    <div className="relative z-10 bg-white/90 px-3 py-1.5 rounded-lg text-xs font-bold text-[#1E1E24] shadow-md">
                      Subject (Always in focus)
                    </div>

                    <div className="relative z-10 text-[11px] font-semibold text-white bg-black/60 px-2.5 py-1 rounded-lg">
                      Background: {interactiveAperture <= 2.8 ? 'Dreamy Creamy Bokeh ✨' : 'Sharp & Distracting'}
                    </div>
                  </div>

                  <input
                    type="range"
                    min="1.4"
                    max="16"
                    step="0.4"
                    value={interactiveAperture}
                    onChange={e => {
                      sounds.playDialTick();
                      setInteractiveAperture(parseFloat(e.target.value));
                    }}
                    className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#5E4DB2]"
                  />
                </div>
              )}

              {/* Main Content Formatted */}
              <div className="prose prose-sm max-w-none text-[#3F3F46] leading-relaxed space-y-4">
                {activePost.content.split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={pIdx} className="font-heading font-bold text-lg text-[#1E1E24] pt-2">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('#### ')) {
                    return (
                      <h4 key={pIdx} className="font-bold text-sm text-[#1E1E24] pt-1">
                        {paragraph.replace('#### ', '')}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('---')) {
                    return <hr key={pIdx} className="border-[#E5DFD3] my-4" />;
                  }
                  return <p key={pIdx}>{paragraph}</p>;
                })}
              </div>

              {/* Actionable Takeaways Checklist */}
              <div className="bg-[#FAF7F0] p-5 rounded-2xl border-2 border-emerald-500/30 shadow-xs space-y-2.5">
                <span className="font-heading font-bold text-sm text-[#1E1E24] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>3 Actionable Things You Can Do in 5 Minutes:</span>
                </span>
                <ul className="space-y-1.5 text-xs text-[#3F3F46]">
                  {activePost.actionableTakeaways.map((tip, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[#E2DDD3] bg-[#F4EFE4] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleLike(activePost.id)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#DCD5C5] text-xs font-bold text-[#1E1E24] flex items-center gap-1.5 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                >
                  <Heart className={`w-3.5 h-3.5 ${userLiked[activePost.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{((likes[activePost.id] || 0) + activePost.likesCount)} Likes</span>
                </button>
              </div>

              <button
                onClick={() => {
                  sounds.playShutterClick();
                  setActivePost(null);
                  if (onOpenPractice) onOpenPractice(activePost.category.toLowerCase());
                }}
                className="px-5 py-2.5 bg-[#5E4DB2] hover:bg-[#4E3EA1] text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Launch Interactive Practice Studio →</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* AUTO BLOG GENERATOR MODAL */}
      {showGeneratorModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF7F0] text-[#1E1E24] w-full max-w-md rounded-3xl p-6 border-2 border-[#DCD5C5] shadow-2xl relative">
            <button
              onClick={() => setShowGeneratorModal(false)}
              className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-900 rounded-full hover:bg-zinc-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#5E4DB2]" />
              <h3 className="font-heading font-bold text-lg text-[#1E1E24]">
                ⚡ Auto-Generate Trending SEO Guide
              </h3>
            </div>
            
            <p className="text-xs text-[#52525B] mb-4">
              Enter any skill or concept you want explained in plain English. Plainly's curriculum synthesizer will automatically produce a search-optimized guide with practical steps.
            </p>

            <form onSubmit={handleGeneratePost} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#3F3F46] mb-1">
                  Article Category:
                </label>
                <select
                  value={genCategory}
                  onChange={e => setGenCategory(e.target.value)}
                  className="w-full bg-white px-3 py-2 rounded-xl border border-[#DCD5C5] text-xs text-[#1E1E24] focus:outline-hidden focus:border-[#5E4DB2]"
                >
                  <option value="Photography">Photography</option>
                  <option value="Cinematography">Cinematography</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="AI & Coding">AI & Coding</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3F3F46] mb-1">
                  Target Topic / Search Keyword:
                </label>
                <input
                  type="text"
                  placeholder="e.g. How Shutter Speed Freezes Raindrops"
                  value={genTopic}
                  onChange={e => setGenTopic(e.target.value)}
                  className="w-full bg-white px-3 py-2 rounded-xl border border-[#DCD5C5] text-xs text-[#1E1E24] focus:outline-hidden focus:border-[#5E4DB2]"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-2.5 bg-[#5E4DB2] hover:bg-[#4E3EA1] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      <span>Writing Plain-English Guide...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Generate & Publish to Plainly Blog →</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SEO SERP & SCHEMA PREVIEW MODAL */}
      {showSeoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-[#1E1E24] w-full max-w-xl rounded-3xl p-6 border-2 border-zinc-200 shadow-2xl relative">
            <button
              onClick={() => setShowSeoModal(false)}
              className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-900 rounded-full hover:bg-zinc-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-5 h-5 text-blue-600" />
              <h3 className="font-heading font-bold text-lg text-zinc-900">
                Search Engine Card & JSON-LD Preview
              </h3>
            </div>

            <p className="text-xs text-zinc-500 mb-4">
              Here is how Plainly educational articles appear on Google Search and social media share cards to attract thousands of organic learners.
            </p>

            {/* Google SERP Snippet Preview */}
            <div className="bg-white p-4 rounded-xl border border-zinc-300 shadow-sm space-y-1 mb-4 font-sans">
              <div className="flex items-center gap-1.5 text-xs text-zinc-600">
                <span className="w-4 h-4 rounded-full bg-[#5E4DB2] text-white flex items-center justify-center text-[10px] font-bold">p</span>
                <span>https://plainly.edu › guides › why-you-dont-need-expensive-camera</span>
              </div>
              <h4 className="text-blue-700 hover:underline font-medium text-base cursor-pointer">
                Why You Don't Need a $3,500 Camera to Shoot Pro Photos - Plainly
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Nov 4, 2026 — Learn photography in plain English. Practice framing with our free 3D virtual DSLR and AR composition overlays before buying expensive gear...
              </p>
            </div>

            {/* Schema JSON-LD Code block */}
            <div className="bg-zinc-900 text-zinc-300 p-3 rounded-xl font-mono text-[11px] overflow-x-auto">
              <pre>{`{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Why You Don't Need a $3,500 Camera to Shoot Pro Photos",
  "educationalLevel": "Beginner",
  "inLanguage": "en-US",
  "isAccessibleForFree": true,
  "publisher": {
    "@type": "EducationalOrganization",
    "name": "Plainly"
  }
}`}</pre>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowSeoModal(false)}
                className="px-4 py-2 bg-zinc-900 text-white font-bold rounded-xl text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
