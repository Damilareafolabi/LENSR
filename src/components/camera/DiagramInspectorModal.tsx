import React, { useState } from 'react';
import { DIAGRAM_REFERENCES } from '../../data/cameraAnatomy';
import { sounds } from '../../services/soundEffects';
import { X, ZoomIn, BookOpen, Layers, CheckCircle } from 'lucide-react';

interface DiagramInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDiagram?: (diagramId: string) => void;
}

export const DiagramInspectorModal: React.FC<DiagramInspectorModalProps> = ({
  isOpen,
  onClose,
  onSelectDiagram
}) => {
  const [selectedDiagramId, setSelectedDiagramId] = useState<string>(DIAGRAM_REFERENCES[0].id);

  if (!isOpen) return null;

  const activeDiagram = DIAGRAM_REFERENCES.find(d => d.id === selectedDiagramId) || DIAGRAM_REFERENCES[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF7F0] text-[#1E1E24] w-full max-w-5xl max-h-[92vh] rounded-3xl border-2 border-[#DCD5C5] shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E2DDD3] flex items-center justify-between bg-[#F4EFE4]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#5E4DB2] text-white flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-[#1E1E24]">
                Authentic DSLR Technical Nomenclature & Anatomy Library
              </h3>
              <p className="text-xs text-[#6B6B78]">
                Real-world reference schematics from classic engineering manuals
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#6B6B78] hover:text-[#1E1E24] hover:bg-[#EAE4D6] rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Sidebar tabs & Main Diagram display */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Navigation: Diagram Selectors */}
          <div className="md:col-span-4 p-4 border-r border-[#E2DDD3] overflow-y-auto space-y-2 bg-[#FAF7F0]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B6B78] px-2 block mb-2">
              Reference Schematics ({DIAGRAM_REFERENCES.length})
            </span>

            {DIAGRAM_REFERENCES.map(diag => {
              const isActive = diag.id === selectedDiagramId;
              return (
                <button
                  key={diag.id}
                  onClick={() => {
                    sounds.playDialTick();
                    setSelectedDiagramId(diag.id);
                    if (onSelectDiagram) onSelectDiagram(diag.id);
                  }}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex gap-3 ${
                    isActive
                      ? 'bg-white border-[#5E4DB2] shadow-sm'
                      : 'border-transparent hover:bg-[#F2ECE1] text-[#4A4A57]'
                  }`}
                >
                  <img
                    src={diag.imageSrc}
                    alt={diag.title}
                    className="w-14 h-14 object-cover rounded-xl border border-zinc-200 bg-white shrink-0"
                  />
                  <div>
                    <h4 className={`text-xs font-bold leading-tight ${isActive ? 'text-[#5E4DB2]' : 'text-[#1E1E24]'}`}>
                      {diag.title}
                    </h4>
                    <p className="text-[11px] text-[#6B6B78] line-clamp-2 mt-1">
                      {diag.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Area: Selected Schematic in High-Resolution Detail */}
          <div className="md:col-span-8 p-6 overflow-y-auto bg-white flex flex-col items-center">
            <div className="w-full max-w-xl">
              <div className="bg-[#FAF7F0] p-3 rounded-2xl border border-[#E2DDD3] shadow-sm mb-4">
                <h4 className="font-heading font-bold text-base text-[#1E1E24]">
                  {activeDiagram.title}
                </h4>
                <p className="text-xs text-[#52525B] mt-1">
                  {activeDiagram.description}
                </p>
              </div>

              {/* Main Image viewer */}
              <div className="rounded-2xl border-2 border-zinc-200 overflow-hidden bg-white shadow-md p-2 flex justify-center">
                <img
                  src={activeDiagram.imageSrc}
                  alt={activeDiagram.title}
                  className="max-h-[460px] w-auto object-contain rounded-xl"
                />
              </div>

              {/* Key Parts Tags */}
              <div className="mt-4">
                <span className="text-xs font-semibold text-[#6B6B78] block mb-2">
                  Key anatomical features identified in this diagram:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeDiagram.keyParts.map(part => (
                    <span
                      key={part}
                      className="px-2.5 py-1 bg-[#F2EDE4] text-[#1E1E24] rounded-lg text-xs font-medium border border-[#E2DDD3] flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-[#5E4DB2]" />
                      <span>{part}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#E2DDD3] bg-[#F4EFE4] flex items-center justify-between text-xs text-[#6B6B78]">
          <span>Source: Open Educational Camera Engineering Archives</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#5E4DB2] hover:bg-[#4E3EA1] text-white font-bold rounded-xl transition-colors"
          >
            Done Inspecting
          </button>
        </div>

      </div>
    </div>
  );
};
