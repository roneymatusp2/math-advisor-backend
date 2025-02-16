// src/components/QuestionnaireForm.tsx
import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  BookOpen,
  BrainCircuit,
  Calculator,
  School,
  GraduationCap,
  AlertCircle,
} from 'lucide-react';
import { questions } from '../data/questions';
import { shuffleArray } from '../utils/shuffle'; // Import

interface QuestionnaireFormProps {
  onSubmit: (answers: Record<string, string>) => void;
}

function QuestionnaireForm({ onSubmit }: QuestionnaireFormProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showValidation, setShowValidation] = useState(false);
  const [shuffledSections, setShuffledSections] = useState<any[]>([]); // Holds shuffled sections

  // Define sections *before* useEffect, filtering questions correctly
  const sections = [
    {
      title: 'Career & Future Path',
      icon: GraduationCap,
      description: "Let's start by understanding your academic and career aspirations",
      questions: questions.filter(q => q.type === 'career'),
      color: 'from-purple-500 to-indigo-600',
    },
    {
      title: 'Interest & Enjoyment',
      icon: BookOpen,
      description: 'Tell us about your relationship with mathematics',
      questions: questions.filter(q => q.type === 'interest'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Skills & Confidence',
      icon: Calculator,
      description: 'Assess your mathematical abilities and comfort level',
      questions: questions.filter(q => q.type === 'skill'),
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Learning Style',
      icon: BrainCircuit,
      description: 'How do you prefer to learn and engage with mathematics?',
      questions: questions.filter(q => q.type === 'learning'),
      color: 'from-orange-500 to-amber-500',
    },
    {
      title: 'Future Goals',
      icon: School,
      description: 'Your aspirations and plans for higher education',
      questions: questions.filter(q => q.type === 'future'),
      color: 'from-rose-500 to-pink-500',
    },
    {
      title: 'Basic Problems',
      icon: School,
      description: 'Basic Problems',
      questions: questions.filter(q => q.type === 'basic'), //  BASIC PROBLEMS
      color: 'from-rose-500 to-pink-500',
    },
  ];

  useEffect(() => {
    // 1. Shuffle the sections
    const shuffled = shuffleArray([...sections]);

    // 2. Shuffle questions WITHIN each section
    shuffled.forEach((section) => {
      section.questions = shuffleArray([...section.questions]);

      // 3. Shuffle OPTIONS within each question
      section.questions.forEach((question: any) => {
        question.options = shuffleArray([...question.options]);
      });
    });

    setShuffledSections(shuffled);
  }, []); // Empty dependency array: runs only once on mount

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setShowValidation(false);
  };

  // Use useMemo to avoid unnecessary recalculations
  const currentQuestions = useMemo(() => {
    if (shuffledSections.length === 0) {
      return []; // Return empty array while loading
    }
    return shuffledSections[currentSection]?.questions || [];
  }, [shuffledSections, currentSection]);

  const isLastSection = currentSection === shuffledSections.length - 1;
  const isFirstSection = currentSection === 0;

  // Check if current section is fully answered
  const isCurrentSectionComplete = currentQuestions.every((q: any) => answers[q.id]);

  // Overall progress (total questions = 25 + 2 basic = 27)
  const totalQuestions = 27;
  const answeredQuestions = Object.keys(answers).length;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  // Check if all Qs are answered (including basic questions)
  const isFormComplete = useMemo(() => {
    return questions.every((q) => answers[q.id]);
  }, [answers, questions]);

  const handleNext = () => {
    if (isLastSection) {
      if (!isFormComplete) {
        setShowValidation(true);
        return;
      }
      onSubmit(answers);
    } else {
      setCurrentSection((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentSection((prev) => prev - 1);
  };

  const CurrentIcon = useMemo(() => {
    if (shuffledSections.length === 0) {
      return null; // Or a placeholder icon
    }
    return shuffledSections[currentSection]?.icon || null;
  }, [shuffledSections, currentSection]);


  // Identify unanswered sections for validation
  const unansweredSections = useMemo(() => {
    return sections
        .map((section, index) => {
          const unanswered = section.questions.filter((q) => !answers[q.id]);
          return { index, title: section.title, count: unanswered.length };
        })
        .filter((s) => s.count > 0);
  }, [sections, answers]);

  if (shuffledSections.length === 0) {
    return <div>Loading...</div>; // Or a more elaborate loading indicator
  }

  return (
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              {CurrentIcon && <CurrentIcon className="h-8 w-8 text-school-navy" />}
              <div>
                <h2 className="text-2xl font-bold text-school-navy">
                  {shuffledSections[currentSection]?.title}
                </h2>
                <p className="text-school-navy/70">{shuffledSections[currentSection]?.description}</p>
              </div>
            </div>
            <div className="text-right">
                        <span className="text-school-navy/70 font-medium block">
                            Section {currentSection + 1} of {shuffledSections.length}
                        </span>
              <span className="text-school-navy/60 text-sm">
                            {answeredQuestions} of {totalQuestions} questions answered
                        </span>
            </div>
          </div>

          {/* Section navigation */}
          <div className="flex space-x-2 mb-4">
            {shuffledSections.map((section, index) => {
              const Icon = section.icon;
              const complete = section.questions.every((q) => answers[q.id]);
              return (
                  <button
                      key={index}
                      onClick={() => setCurrentSection(index)}
                      className={`flex-1 p-2 rounded-lg transition-all ${
                          currentSection === index
                              ? 'bg-gradient-to-r ' + section.color + ' text-white shadow-lg scale-105'
                              : complete
                                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium hidden md:inline">{section.title}</span>
                    </div>
                  </button>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
                className={`h-2 transition-all duration-300 bg-gradient-to-r ${shuffledSections[currentSection]?.color}`}
                style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Validation if incomplete */}
          {showValidation && !isFormComplete && (
              <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Please complete all questions before submitting
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p className="font-medium">Sections with unanswered questions:</p>
                      <ul className="mt-1 list-disc list-inside">
                        {unansweredSections.map((s) => (
                            <li key={s.index}>
                              {s.title} ({s.count} question{s.count > 1 ? 's' : ''} remaining)
                            </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
          )}
        </div>

        {/* Questions in the current section */}
        <div className="space-y-6">
          {currentQuestions.map((question: any, qIndex: number) => (
              <div
                  key={question.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
              >
                <div className={`h-1 bg-gradient-to-r ${shuffledSections[currentSection]?.color}`} />
                <div className="p-6">
                  <p className="text-lg font-medium text-school-navy mb-4">
                    {qIndex + 1}. {question.text}
                  </p>
                  <div className="space-y-3">
                    {question.options.map((option: any) => (
                        <label
                            key={option.value}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                answers[question.id] === option.value
                                    ? `border-transparent bg-gradient-to-r ${shuffledSections[currentSection]?.color} text-white`
                                    : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                        >
                          <input
                              type="radio"
                              name={question.id}
                              value={option.value}
                              checked={answers[question.id] === option.value}
                              onChange={() => handleAnswer(question.id, option.value)}
                              className="h-4 w-4 text-white border-white focus:ring-offset-0 focus:ring-0"
                          />
                          <span className="ml-3">{option.label}</span>
                        </label>
                    ))}
                  </div>
                </div>
              </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          {!isFirstSection && (
              <button
                  onClick={handlePrevious}
                  className="inline-flex items-center px-6 py-3 border-2 border-school-navy text-base font-medium rounded-lg text-school-navy hover:bg-school-navy/5 transition-colors"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Previous Section
              </button>
          )}
          <div className="flex-1" />
          <button
              onClick={handleNext}
              disabled={!isCurrentSectionComplete}
              className={`inline-flex items-center px-6 py-3 border-2 text-base font-medium rounded-lg transition-all ${
                  isCurrentSectionComplete
                      ? `bg-gradient-to-r ${shuffledSections[currentSection]?.color} text-white border-transparent hover:opacity-90`
                      : 'border-gray-300 bg-gray-300 text-white cursor-not-allowed'
              }`}
          >
            {isLastSection ? (
                <>
                  Submit Questionnaire
                  <CheckCircle className="ml-2 h-5 w-5" />
                </>
            ) : (
                <>
                  Next Section
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
            )}
          </button>
        </div>
      </div>
  );
}

export default QuestionnaireForm;