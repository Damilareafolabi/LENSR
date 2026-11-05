import React, { useState } from 'react';
import { UniversityCourse } from '../../data/universityCatalog';
import { sounds } from '../../services/soundEffects';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Send, 
  BookOpen, 
  CheckCircle2, 
  Smile, 
  ArrowRight, 
  Camera, 
  Sliders, 
  Shield, 
  Code, 
  Heart, 
  HelpCircle, 
  Check, 
  RotateCcw,
  X
} from 'lucide-react';

interface AITeacherModalProps {
  course: UniversityCourse;
  isOpen: boolean;
  onClose: () => void;
  onLaunchPracticeRoom: (type: 'camera' | 'photoshop' | 'security' | 'coding' | 'habits') => void;
}

interface TeacherResponse {
  simpleExplanation: string;
  relatableAnalogy: string;
  practiceRoomTask: string;
  encouragement: string;
}

export const AITeacherModal: React.FC<AITeacherModalProps> = ({
  course,
  isOpen,
  onClose,
  onLaunchPracticeRoom
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>(course.syllabus[0]?.title || 'Core Fundamentals');
  const [userQuery, setUserQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [explanation, setExplanation] = useState<TeacherResponse | null>(null);

  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [isQuizLoading, setIsQuizLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleAskTeacher = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    sounds.playDialTick();
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-teacher/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseTitle: course.title,
          topic: selectedTopic,
          userQuestion: userQuery || `Explain ${selectedTopic} word-for-word in dead simple English with an everyday analogy`,
          teacherName: course.aiTeacher.name,
          subject: course.category
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        setExplanation(json.data);
        sounds.playSuccessChime();
      }
    } catch (err) {
      console.error(err);
      // Fallback
      setExplanation({
        simpleExplanation: `In normal human words: "${selectedTopic}" is about controlling cause and effect so you get predictable, beautiful results every time.`,
        relatableAnalogy: `Think of it like tuning a musical instrument: when the strings are in harmony, playing a song feels effortless and smooth.`,
        practiceRoomTask: `Launch the ${course.practiceRoom.name} and try testing the extremes of each control to see what happens.`,
        encouragement: `You are making wonderful progress! Keep asking questions.`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadQuiz = async () => {
    sounds.playDialTick();
    setIsQuizLoading(true);
    setQuizSubmitted(false);
    setSelectedAnswers({});

    try {
      const res = await fetch('/api/ai-teacher/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: selectedTopic,
          subject: course.category
        })
      });

      const json = await res.json();
      if (json.success && json.data?.questions) {
        setQuizQuestions(json.data.questions);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsQuizLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF7F0] text-[#1E1E24] w-full max-w-4xl max-h-[92vh] rounded-3xl border-2 border-[#DCD5C5] shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E2DDD3] flex items-center justify-between bg-[#F4EFE4]">
          <div className="flex items-center gap-3">
            <img
              src={course.aiTeacher.avatar}
              alt={course.aiTeacher.name}
              className="w-11 h-11 rounded-2xl object-cover border-2 border-[#5E4DB2] shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-lg text-[#1E1E24]">
                  {course.aiTeacher.name}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Online AI Mentor
                </span>
              </div>
              <p className="text-xs text-[#6B6B78]">{course.aiTeacher.title} • {course.partner}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-500 hover:text-zinc-900 rounded-xl hover:bg-zinc-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Greeting Box */}
          <div className="bg-white p-4 rounded-2xl border-2 border-[#E2DDD3] shadow-xs flex items-start gap-3">
            <span className="text-2xl">👋</span>
            <div className="space-y-1 text-xs">
              <strong className="text-[#1E1E24] font-bold block text-sm">
                Message from {course.aiTeacher.name}:
              </strong>
              <p className="text-[#52525B] leading-relaxed">
                "{course.aiTeacher.greeting}"
              </p>
              <p className="text-[#5E4DB2] font-semibold pt-1">
                Teaching Style: {course.aiTeacher.teachingStyle}
              </p>
            </div>
          </div>

          {/* Topic Select & Question Input */}
          <div className="bg-[#F0ECE1] p-5 rounded-2xl border border-[#DCD5C5] space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <label className="text-xs font-bold text-[#1E1E24] uppercase tracking-wider">
                Select Lesson Topic to Break Down:
              </label>

              <select
                value={selectedTopic}
                onChange={e => {
                  setSelectedTopic(e.target.value);
                  setExplanation(null);
                }}
                className="bg-white px-3 py-1.5 rounded-xl border border-[#DCD5C5] text-xs font-semibold text-[#1E1E24] focus:outline-hidden focus:border-[#5E4DB2]"
              >
                {course.syllabus.map(s => (
                  <option key={s.week} value={s.title}>
                    Week {s.week}: {s.title}
                  </option>
                ))}
              </select>
            </div>

            <form onSubmit={handleAskTeacher} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask anything in plain words, e.g. 'Why does aperture blur the background?'"
                value={userQuery}
                onChange={e => setUserQuery(e.target.value)}
                className="flex-1 bg-white px-4 py-2.5 rounded-xl border border-[#DCD5C5] text-xs text-[#1E1E24] placeholder:text-[#888894] focus:outline-hidden focus:border-[#5E4DB2]"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 bg-[#5E4DB2] hover:bg-[#4E3EA1] text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>Thinking...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Explain in Plain English</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* AI Teacher Explanation Output */}
          {explanation && (
            <div className="bg-white p-6 rounded-3xl border-2 border-indigo-200 shadow-sm space-y-4 animate-in fade-in duration-200">
              
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                <h4 className="font-heading font-bold text-base text-[#1E1E24]">
                  Word-for-Word Plain English Breakdown:
                </h4>
              </div>

              {/* 1. Simple explanation */}
              <div className="bg-[#FAF7F0] p-4 rounded-2xl border border-[#E2DDD3]">
                <strong className="text-[#5E4DB2] font-bold text-xs uppercase tracking-wider block mb-1">
                  In Normal Human Words:
                </strong>
                <p className="text-xs sm:text-sm text-[#3F3F46] leading-relaxed">
                  {explanation.simpleExplanation}
                </p>
              </div>

              {/* 2. Relatable Analogy */}
              <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200">
                <strong className="text-amber-900 font-bold text-xs uppercase tracking-wider block mb-1">
                  Everyday Analogy:
                </strong>
                <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                  {explanation.relatableAnalogy}
                </p>
              </div>

              {/* 3. Actionable Task & Practice Room Launch */}
              <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <strong className="text-emerald-900 font-bold text-xs uppercase tracking-wider block mb-0.5">
                    Actionable Practice Task:
                  </strong>
                  <p className="text-xs text-emerald-950">
                    {explanation.practiceRoomTask}
                  </p>
                </div>

                <button
                  onClick={() => {
                    sounds.playShutterClick();
                    onClose();
                    onLaunchPracticeRoom(course.practiceRoom.type);
                  }}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer shadow-xs"
                >
                  <span>Launch Practice Room →</span>
                </button>
              </div>

              <p className="text-xs text-[#6B6B78] italic text-right">
                "{explanation.encouragement}" — {course.aiTeacher.name}
              </p>

            </div>
          )}

          {/* Interactive Plain-English Quiz Section */}
          <div className="bg-[#FAF7F0] p-5 rounded-3xl border-2 border-[#E2DDD3] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-heading font-bold text-sm text-[#1E1E24]">
                  Quick Knowledge Check with AI Teacher
                </h4>
                <p className="text-xs text-[#6B6B78]">
                  Zero trick questions or math equations. Test your intuitive understanding.
                </p>
              </div>

              <button
                onClick={handleLoadQuiz}
                disabled={isQuizLoading}
                className="px-3.5 py-1.5 bg-white hover:bg-[#F2ECE1] border border-[#DCD5C5] text-xs font-bold text-[#5E4DB2] rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                {isQuizLoading ? 'Generating...' : quizQuestions.length > 0 ? 'Regenerate Quiz ↻' : 'Start Quick Quiz ✦'}
              </button>
            </div>

            {quizQuestions.length > 0 && (
              <div className="space-y-4 pt-2">
                {quizQuestions.map((q, qIdx) => {
                  const userAnswer = selectedAnswers[qIdx];
                  const isAnswered = userAnswer !== undefined;
                  const isCorrect = userAnswer === q.correctIndex;

                  return (
                    <div key={qIdx} className="bg-white p-4 rounded-2xl border border-[#DCD5C5] space-y-2.5">
                      <p className="font-bold text-xs text-[#1E1E24]">
                        Q{qIdx + 1}: {q.question}
                      </p>

                      <div className="space-y-1.5">
                        {q.options.map((opt: string, optIdx: number) => {
                          const isOptionSelected = userAnswer === optIdx;
                          let btnStyle = 'bg-[#FAF7F0] text-[#3F3F46] border-[#E2DDD3] hover:bg-[#F0ECE1]';

                          if (quizSubmitted) {
                            if (optIdx === q.correctIndex) {
                              btnStyle = 'bg-emerald-100 text-emerald-900 border-emerald-400 font-bold';
                            } else if (isOptionSelected) {
                              btnStyle = 'bg-rose-100 text-rose-900 border-rose-300';
                            }
                          } else if (isOptionSelected) {
                            btnStyle = 'bg-[#5E4DB2] text-white border-[#5E4DB2] font-semibold';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => {
                                if (!quizSubmitted) {
                                  sounds.playDialTick();
                                  setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
                                }
                              }}
                              className={`w-full text-left px-3.5 py-2 rounded-xl border text-xs transition-all cursor-pointer ${btnStyle}`}
                            >
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <p className={`text-xs p-2.5 rounded-xl ${isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
                          <strong>{isCorrect ? '✓ Correct!' : 'Not quite:'}</strong> {q.whyItIsCorrect}
                        </p>
                      )}
                    </div>
                  );
                })}

                <div className="flex justify-end pt-1">
                  {!quizSubmitted ? (
                    <button
                      onClick={() => {
                        sounds.playSuccessChime();
                        confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
                        setQuizSubmitted(true);
                      }}
                      disabled={Object.keys(selectedAnswers).length < quizQuestions.length}
                      className="px-4 py-2 bg-[#5E4DB2] hover:bg-[#4E3EA1] disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Submit Answers →
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl">
                      Quiz Completed! Great job practicing with {course.aiTeacher.name}.
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#E2DDD3] bg-[#F4EFE4] flex items-center justify-between text-xs text-[#6B6B78]">
          <div className="flex items-center gap-2">
            <span>Specialization: <strong>{course.specialization}</strong></span>
          </div>

          <button
            onClick={() => {
              sounds.playShutterClick();
              onClose();
              onLaunchPracticeRoom(course.practiceRoom.type);
            }}
            className="px-5 py-2 bg-[#5E4DB2] hover:bg-[#4E3EA1] text-white font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Go to {course.practiceRoom.name} →
          </button>
        </div>

      </div>
    </div>
  );
};
