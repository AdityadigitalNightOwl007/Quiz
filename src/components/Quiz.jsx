import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, User, CheckCircle2, X } from 'lucide-react';
import Confetti from 'react-confetti';
import BgImg from '../assets/Background.png';
import HouseImg from '../assets/House.png';
import CardBg from '../assets/CardBackground.png';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const questions = [
    {
      id: 1,
      question: "What best describes your role in real estate?",
      options: [
        { id: 'A', label: 'Wholesaler' },
        { id: 'B', label: 'Flipper' },
        { id: 'C', label: 'Land Investor' },
        { id: 'D', label: 'Builder / Developer' },
      ]
    },
    {
      id: 2,
      question: "What is your investment experience level?",
      options: [
        { id: 'A', label: 'Beginner (0-2 deals)' },
        { id: 'B', label: 'Intermediate (3-10 deals)' },
        { id: 'C', label: 'Advanced (11-50 deals)' },
        { id: 'D', label: 'Expert (50+ deals)' }
      ]
    },
    {
      id: 3,
      question: "What is your primary investment goal?",
      options: [
        { id: 'A', label: 'Quick Profits (Wholesale/Flip)' },
        { id: 'B', label: 'Long-term Wealth Building' },
        { id: 'C', label: 'Passive Income Stream' },
        { id: 'D', label: 'Portfolio Diversification' }
      ]
    },
    {
      id: 4,
      question: "What is your preferred investment strategy?",
      options: [
        { id: 'A', label: 'Single Family Homes' },
        { id: 'B', label: 'Multi-Family Properties' },
        { id: 'C', label: 'Commercial Real Estate' },
        { id: 'D', label: 'Land Development' },
      ]
    },
    {
      id: 5,
      question: "What is your typical investment budget range?",
      options: [
        { id: 'A', label: 'Under $50,000' },
        { id: 'B', label: '$50,000 - $200,000' },
        { id: 'C', label: '$200,000 - $500,000' },
        { id: 'D', label: '$500,000 - $1,000,000' },    
      ]
    },
    {
      id: 6,
      question: "How many properties do you plan to acquire this year?",
      options: [
        { id: 'A', label: '1-2 properties' },
        { id: 'B', label: '3-5 properties' },
        { id: 'C', label: '6-10 properties' },
        { id: 'D', label: '10+ properties' }
      ]
    },
    {
      id: 7,
      question: "What is your preferred market type?",
      options: [
        { id: 'A', label: 'Urban/Metropolitan' },
        { id: 'B', label: 'Suburban' },
        { id: 'C', label: 'Rural' },
        { id: 'D', label: 'Mixed/Multiple Markets' }
      ]
    },
    {
      id: 8,
      question: "What is your risk tolerance?",
      options: [
        { id: 'A', label: 'Conservative (Stable, proven markets)' },
        { id: 'B', label: 'Moderate (Balanced risk/reward)' },
        { id: 'C', label: 'Aggressive (High risk, high reward)' },
        { id: 'D', label: 'Very Aggressive (Speculative investments)' }
      ]
    }
  ];

  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  // Set window size for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const card = document.getElementById('quiz-card');
      if (card) {
        const rect = card.getBoundingClientRect();
        setCursorPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-close modal after 5 seconds
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
        setIsCompleted(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  const handleAnswerSelect = (optionId) => {
    setSelectedAnswer(optionId);
    setAnswers({ ...answers, [currentQuestion]: optionId });
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1] || null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || null);
    }
  };

  const handleSubmit = () => {
    console.log('Quiz submitted with answers:', answers);
    setShowModal(true);
  };

  const handleRestart = () => {
    setIsCompleted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers({});
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsCompleted(true);
  };

  if (isCompleted) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{
          backgroundImage: `url(${BgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(1.4)'
        }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/60 via-purple-900/50 to-indigo-900/60"></div>

        {/* Ambient background glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 w-full max-w-3xl">
          <div className="bg-gradient-to-br from-slate-900/80 via-indigo-950/70 to-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-500/30 p-10 md:p-14 text-center animate-scale-in">
            <div className="mb-8 animate-bounce-in">
              <div className="inline-block bg-gradient-to-br from-cyan-400 to-blue-500 p-6 rounded-full mb-6">
                <CheckCircle2 className="w-16 h-16 text-slate-900" strokeWidth={2} />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-6 animate-slide-up">
              Quiz Completed! 🎉
            </h1>
            
            <p className="text-2xl text-white/90 mb-4 animate-slide-up-delay-1">
              Thank you for completing the quiz!
            </p>
            
            <p className="text-lg text-purple-300/70 mb-10 animate-slide-up-delay-2">
              Your responses have been recorded and will help us provide you with the best real estate investment recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay-3">
              <button
                onClick={handleRestart}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-medium hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105 transition-all"
              >
                Take Quiz Again
              </button>
              <button
                className="px-8 py-4 rounded-full bg-slate-800/50 text-white font-medium border-2 border-purple-400/50 hover:bg-slate-800/70 hover:border-purple-400 transition-all"
              >
                View Results
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes bounceIn {
            0% {
              opacity: 0;
              transform: scale(0.3);
            }
            50% {
              opacity: 1;
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-scale-in {
            animation: scaleIn 0.5s ease-out;
          }

          .animate-bounce-in {
            animation: bounceIn 0.8s ease-out;
          }

          .animate-slide-up {
            animation: slideUp 0.6s ease-out 0.2s backwards;
          }

          .animate-slide-up-delay-1 {
            animation: slideUp 0.6s ease-out 0.4s backwards;
          }

          .animate-slide-up-delay-2 {
            animation: slideUp 0.6s ease-out 0.6s backwards;
          }

          .animate-slide-up-delay-3 {
            animation: slideUp 0.6s ease-out 0.8s backwards;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden grid grid-cols-5"
      style={{
        backgroundImage: `url(${BgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(1.4)'

      }}
    >
      {/* Confetti Modal */}
      {showModal && (
        <>
          {/* CONFETTI ON TOP OF EVERYTHING */}
          <div className="fixed inset-0 z-[9999] pointer-events-none">
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              numberOfPieces={350}
              recycle={false}
              gravity={0.3}
              colors={[
                '#22D3EE',
                '#3B82F6',
                '#8B5CF6',
                '#EC4899',
                '#F59E0B',
                '#10B981'
              ]}
            />
          </div>

          {/* BLURRED OVERLAY + MODAL */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[5000] flex items-center justify-center p-4 animate-fade-in">
            <div className="relative bg-gradient-to-br from-slate-900/95 via-indigo-950/95 to-slate-900/95 
              backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-cyan-400/50 
              p-8 md:p-12 max-w-lg w-full text-center animate-modal-pop">

              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Icon */}
              <div className="mb-6 animate-bounce-slow">
                <div className="inline-block bg-gradient-to-br from-cyan-400 to-blue-500 p-5 
                  rounded-full shadow-lg shadow-cyan-500/50">
                  <CheckCircle2 className="w-14 h-14 text-slate-900" strokeWidth={2.5} />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-4xl md:text-5xl font-bold text-transparent 
                bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 
                mb-4 animate-slide-up">
                Congratulations! 🎉
              </h2>

              {/* Description */}
              <p className="text-xl text-white/90 mb-3 animate-slide-up-delay-1">
                Your quiz has been completed!
              </p>

              <p className="text-purple-300/70 mb-6 animate-slide-up-delay-2">
                Thank you for taking the time to share your real estate investment profile with us.
              </p>

              {/* Auto-redirect text */}
              <div className="flex items-center justify-center gap-2 text-cyan-400 animate-slide-up-delay-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                <span className="text-sm">Redirecting in a moment...</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Overlay for better visibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-purple-900/30 to-indigo-900/40"></div>

      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Main Quiz Card */}
      <div className="relative z-10 w-full max-w-5xl col-span-4">
        <div 
          id="quiz-card"
          className="relative rounded-3xl shadow-2xl border border-purple-500/30 overflow-hidden animate-fade-in"
          style={{
            backgroundImage: `url(${CardBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(1.2)'

          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-indigo-950/80 to-transparent"></div>

          {/* Cursor glow effect */}
          {isHovering && (
            <div 
              className="absolute pointer-events-none transition-opacity duration-300 z-20"
              style={{
                left: `${cursorPosition.x}px`,
                top: `${cursorPosition.y}px`,
                transform: 'translate(-50%, -50%)',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, rgba(59, 130, 246, 0.2) 30%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)',
              }}
            />
          )}

          {/* Content Container */}
          <div className="relative z-10 flex flex-col lg:flex-row">
            {/* Left Side - Questions */}
            <div  className="flex-1 p-4 md:p-5 lg:p-6" key={currentQuestion}>
              {/* Icon and Question */}
              <div className="mb-4">
                <div className="flex items-start gap-5 mb-6">
                  <div className="bg-cyan-400/20 p-3.5 rounded-2xl flex-shrink-0 animate-icon-bounce">
                    <User className="w-9 h-9 text-cyan-400" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-3xl w-full font-light text-white leading-tight pt-2 animate-slide-in-right">
                    {questions[currentQuestion].question}
                  </h2>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2 mb-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(option.id)}
                    className={`w-full text-left px-6 py-3.5 rounded-2xl transition-all duration-300 flex items-center justify-between group animate-slide-in-left ${
                      selectedAnswer === option.id
                        ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border-2 border-cyan-400 shadow-lg shadow-cyan-500/30 scale-105'
                        : 'bg-slate-800/40 border-2 border-slate-700/40 hover:border-purple-400/60 hover:bg-slate-800/60 hover:scale-102'
                    }`}
                    style={{
                      animationDelay: `${index * 0.05}s`
                    }}
                  >
                    <span className="text-white font-light text-base md:text-lg">
                      {option.label}
                    </span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                      selectedAnswer === option.id
                        ? 'border-cyan-400 bg-cyan-400'
                        : 'border-slate-600 group-hover:border-purple-400'
                    }`}>
                      <div className={`w-2.5 h-2.5 rounded-full transition-all ${
                        selectedAnswer === option.id ? 'bg-slate-900 scale-100' : 'bg-transparent scale-0'
                      }`}></div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Helper Text */}
              <p className="text-purple-300/50 text-xs md:text-sm mb-8 text-center font-light animate-fade-in-delay">
                Team adapts differently for each role; this helps route you to the right private pool.
              </p>

              {/* Bottom Section */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 animate-slide-up-bottom">
                {/* OK/Submit Button */}
                {currentQuestion === totalQuestions - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedAnswer}
                    className={`px-8 md:px-10 py-3 rounded-full font-medium transition-all flex items-center gap-2 text-sm md:text-base ${
                      selectedAnswer
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105 animate-pulse-glow'
                        : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Submit
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={!selectedAnswer}
                    className={`px-8 md:px-10 py-3 rounded-full font-medium transition-all flex items-center gap-2 text-sm md:text-base ${
                      selectedAnswer
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105'
                        : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    OK
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}

                {/* Progress and Navigation */}
                <div className="flex items-center gap-4 md:gap-5">
                  {/* Progress */}
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 text-lg md:text-xl font-semibold transition-all duration-500">
                      {Math.round(progress)}%
                    </span>
                    <span className="text-purple-300/50 text-xs md:text-sm font-light">Complete</span>
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex gap-2">
                    <button
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all ${
                        currentQuestion === 0
                          ? 'bg-slate-800/30 text-slate-600 cursor-not-allowed'
                          : 'bg-cyan-400 text-slate-900 hover:bg-cyan-300 hover:scale-110 shadow-lg shadow-cyan-500/30'
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentQuestion === totalQuestions - 1}
                      className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all ${
                        currentQuestion === totalQuestions - 1
                          ? 'bg-slate-800/30 text-slate-600 cursor-not-allowed'
                          : 'bg-cyan-400 text-slate-900 hover:bg-cyan-300 hover:scale-110 shadow-lg shadow-cyan-500/30'
                      }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - House Image */}
            <div className="hidden lg:block lg:w-1/2 relative">
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.7) 30%, black 45%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.7) 30%, black 45%)'
                }}
              >
                <img 
                  src={HouseImg} 
                  alt="House" 
                  className="w-full h-full object-cover"
                  style={{
                    // maxHeight: '90%',
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes modalPop {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUpBottom {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes iconBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.5);
          }
          50% {
            box-shadow: 0 0 30px rgba(34, 211, 238, 0.8);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-modal-pop {
          animation: modalPop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .animate-bounce-slow {
          animation: bounceSlow 2s ease-in-out infinite;
        }

        .animate-fade-in-delay {
          animation: fadeIn 0.8s ease-out 0.5s backwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.5s ease-out backwards;
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out 0.2s backwards;
        }

        .animate-slide-up-delay-1 {
          animation: slideUp 0.6s ease-out 0.3s backwards;
        }

        .animate-slide-up-delay-2 {
          animation: slideUp 0.6s ease-out 0.4s backwards;
        }

        .animate-slide-up-delay-3 {
          animation: slideUp 0.6s ease-out 0.5s backwards;
        }

        .animate-slide-up-bottom {
          animation: slideUpBottom 0.6s ease-out 0.3s backwards;
        }

        .animate-icon-bounce {
          animation: iconBounce 2s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }

        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}

export default Quiz;