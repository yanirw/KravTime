import React, { useState } from "react";
import { Button } from "../ui/button";
import { Info, X } from "lucide-react";

/**
 * Guide display component
 * Shows app usage guide as a full overlay
 */
export function GuideDisplay() {
  const [showGuide, setShowGuide] = useState(false);
  
  return (
    <>
      <div className="fixed top-2 right-2 z-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowGuide(true)}
          className="text-gray-400 hover:text-white hover:bg-white/10 p-1 h-8 w-8"
          aria-label="Show app guide"
        >
          <Info className="w-4 h-4" />
        </Button>
      </div>
      
      {showGuide && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl border border-gray-600 shadow-2xl max-w-md w-full mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-krav-accent">KravTime Guide</h2>
              <Button
                variant="ghost"
                onClick={() => setShowGuide(false)}
                className="text-gray-400 hover:text-white p-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Content */}
            <div className="p-6 space-y-6">
              
              {/* Three Ways Section */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <span className="mr-2">🎯</span>
                  Three Ways to Set Values
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-krav-accent rounded flex items-center justify-center text-black font-bold text-sm">1</div>
                    <div>
                      <div className="text-gray-300"><strong>Buttons:</strong> Click preset values like "2:00" or "3"</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-krav-success rounded flex items-center justify-center text-white font-bold text-sm">2</div>
                    <div>
                      <div className="text-gray-300"><strong>Sliders:</strong> Drag to adjust values smoothly</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-krav-rest rounded flex items-center justify-center text-white font-bold text-sm">3</div>
                    <div>
                      <div className="text-gray-300 mb-1"><strong>Manual Input:</strong> Click the colored numbers to type directly</div>
                      <div className="text-xs text-gray-400">
                        Click: <span className="text-krav-accent">"3 rounds"</span>, <span className="text-krav-success">"2:00 per round"</span>, or <span className="text-krav-rest">"0:30 between rounds"</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Input Examples */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">
                  ⌨️ How to Type Numbers
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="space-y-1">
                    <div className="text-gray-400">Type:</div>
                    <code className="block bg-gray-700 px-2 py-1 rounded text-white">1000</code>
                    <code className="block bg-gray-700 px-2 py-1 rounded text-white">230</code>
                    <code className="block bg-gray-700 px-2 py-1 rounded text-white">90</code>
                    <code className="block bg-gray-700 px-2 py-1 rounded text-white">45</code>
                  </div>
                  <div className="space-y-1">
                    <div className="text-gray-400">Result:</div>
                    <div className="bg-gray-600 px-2 py-1 rounded text-white">10:00</div>
                    <div className="bg-gray-600 px-2 py-1 rounded text-white">2:30</div>
                    <div className="bg-gray-600 px-2 py-1 rounded text-white">1:30</div>
                    <div className="bg-gray-600 px-2 py-1 rounded text-white">0:45</div>
                  </div>
                </div>
              </div>
              
            </div>
            
            {/* Footer */}
            <div className="p-4 bg-gray-800/50 rounded-b-2xl">
              <Button
                onClick={() => setShowGuide(false)}
                className="w-full bg-krav-accent hover:bg-krav-accent-bright text-black font-semibold"
              >
                Got it! Let's train 🥊
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 