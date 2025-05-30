import React, { useState } from "react";
import { Button } from "../ui/button";
import { Info } from "lucide-react";

/**
 * Version display component
 * Shows app version in a toggleable popup
 */
export function VersionDisplay() {
  const [showVersion, setShowVersion] = useState(false);
  
  return (
    <div className="fixed top-2 right-2 z-50">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowVersion(!showVersion)}
        className="text-gray-400 hover:text-white hover:bg-white/10 p-1 h-8 w-8"
        aria-label="Show version information"
      >
        <Info className="w-4 h-4" />
      </Button>
      {showVersion && (
        <div className="absolute top-10 right-0 bg-black/80 text-white text-xs px-2 py-1 rounded border border-gray-600 whitespace-nowrap">
          KravTime v0.1.4
        </div>
      )}
    </div>
  );
} 