import React, { useState } from "react";
import { GuideDisplay } from "./components/Common/VersionDisplay";
import { HomeScreen } from "./components/Home/HomeScreen";
import { TimerScreen } from "./components/Timer/TimerScreen";
import ErrorBoundary from "./components/Common/ErrorBoundary";

/**
 * Main App Component
 * Manages navigation between Home and Timer screens
 */
export default function KravTimeApp() {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home' or 'timer'
  const [timerConfig, setTimerConfig] = useState({
    rounds: 3,
    roundDuration: 120,
    restDuration: 30
  });

  const startTimer = (config) => {
    setTimerConfig(config);
    setCurrentScreen('timer');
  };

  const goHome = () => {
    setCurrentScreen('home');
  };

  return (
    <ErrorBoundary>
      <div className="app-container gradient-dark">
        <GuideDisplay />
        
        {/* Enhanced Global PWA Styles */}
        <style jsx global>{`
          @viewport {
            width=device-width;
            initial-scale=1.0;
            maximum-scale=1.0;
            user-scalable=no;
          }
          
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
            -webkit-user-select: none;
            -webkit-touch-callout: none;
            -webkit-tap-highlight-color: transparent;
          }
          
          .app-container {
            height: 100vh;
            height: 100dvh; /* Dynamic viewport height for mobile */
            width: 100vw;
            overflow: hidden;
            position: fixed;
            top: 0;
            left: 0;
            /* Enhanced background with smooth transitions */
            transition: background 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            /* Ensure proper viewport handling on mobile */
            min-height: -webkit-fill-available;
          }
          
          /* iPhone specific optimizations */
          @supports (-webkit-touch-callout: none) {
            .app-container {
              height: -webkit-fill-available;
            }
          }
          
          /* Prevent pull-to-refresh and enhance scrolling */
          body {
            overscroll-behavior: none;
            scroll-behavior: smooth;
          }
          
          /* Hide scrollbars but keep functionality */
          ::-webkit-scrollbar {
            display: none;
          }
          
          .scroll-container {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          /* Enhanced screen transition animations */
          .screen-enter {
            animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .screen-exit {
            animation: slideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideOut {
            from {
              opacity: 1;
              transform: translateX(0);
            }
            to {
              opacity: 0;
              transform: translateX(-20px);
            }
          }
        `}</style>
        
        <div className="screen-enter">
          {currentScreen === 'home' ? (
            <HomeScreen onStartTimer={startTimer} />
          ) : (
            <TimerScreen 
              config={timerConfig} 
              onGoHome={goHome} 
            />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
} 