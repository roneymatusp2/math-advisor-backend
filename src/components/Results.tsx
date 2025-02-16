// Results.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { calculateResults } from '../utils/calculateResults'; // Ajuste o caminho se necessário
import emailService from '../services/EmailService'; // Importa o serviço de email
import {
  Trophy,
  BarChart,
  CheckCircle,
  RotateCcw,
  Mail,
  AlertTriangle,
  XCircle,
} from 'lucide-react';

interface ResultsProps {
  answers: Record<string, string>;
  sampleAnswers: Record<string, string>;
  onReset: () => void;
}

function Results({ answers, sampleAnswers, onReset }: ResultsProps) {
  const [results, setResults] = useState<ReturnType<typeof calculateResults> | null>(null);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false); // Controla a visibilidade do input

  useEffect(() => {
    const calculated = calculateResults(answers, sampleAnswers);
    setResults(calculated);
  }, [answers, sampleAnswers]);

  const handleSendEmail = async () => {
    if (!results) return;

    setSendingEmail(true);
    setEmailError(null); // Limpa erros anteriores

    try {
      await emailService.sendMathResults(email, results);
      setEmailSent(true);
      setShowEmailInput(false); // Esconde o input após o envio
    } catch (error: any) {
      setEmailError(error.message || 'An unexpected error occurred.');
    } finally {
      setSendingEmail(false);
    }
  };

  const isValidEmail = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [email]);

  if (!results) {
    return <div>Loading results...</div>;
  }

  const { course, level, courseConfidence, levelConfidence, overallConfidence, details } = results;

  return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-school-navy mb-6 flex items-center">
            <Trophy className="h-8 w-8 mr-3 text-amber-500" />
            Your IB Math Course Recommendation
          </h1>

          {/* Results Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="p-4 rounded-lg bg-gray-50">
              <h2 className="text-xl font-semibold text-school-navy mb-4">Recommended Course</h2>
              <p className="text-2xl font-bold text-red-600">
                {course === 'AA'
                    ? 'Analysis & Approaches'
                    : course === 'AI'
                        ? 'Applications & Interpretation'
                        : 'AA or AI (Tie)'}
              </p>
              <div className="mt-2 flex items-center">
                <BarChart className="h-5 w-5 mr-2 text-gray-500" />
                <span className="text-gray-600">Confidence: {Math.round(courseConfidence * 100)}%</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-gray-50">
              <h2 className="text-xl font-semibold text-school-navy mb-4">Recommended Level</h2>
              <p className="text-2xl font-bold text-red-600">
                {level === 'HL' ? 'Higher Level' : level === 'SL' ? 'Standard Level' : 'HL or SL (Tie)'}
              </p>
              <div className="mt-2 flex items-center">
                <BarChart className="h-5 w-5 mr-2 text-gray-500" />
                <span className="text-gray-600">Confidence: {Math.round(levelConfidence * 100)}%</span>
              </div>
            </div>
          </div>

          {/* Overall Confidence */}
          <div className="p-4 rounded-lg bg-red-100 border-l-4 border-red-500 mb-8">
            <h2 className="text-xl font-semibold text-red-700 mb-2 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Overall Recommendation Confidence
            </h2>
            <p className="text-lg text-red-600">
              We are {Math.round(overallConfidence * 100)}% confident in this recommendation.
            </p>
          </div>

          {/* Detailed Analysis */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-school-navy mb-4">Detailed Analysis</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-school-navy">Learning Focus:</h3>
                <p className="text-gray-700">{details.focus}</p>
              </div>
              <div>
                <h3 className="font-medium text-school-navy">Learning Style:</h3>
                <p className="text-gray-700">{details.style}</p>
              </div>
              <div>
                <h3 className="font-medium text-school-navy">Recommendations:</h3>
                <p className="text-gray-700">{details.advice}</p>
              </div>
              {details.borderline && (
                  <div className="p-4 rounded-lg bg-yellow-100 border-l-4 border-yellow-500">
                    <p className="text-yellow-700">
                      <strong className="font-medium">Note:</strong> Your results indicate you're on the
                      borderline between levels or courses. Consider discussing these results with your
                      math teacher to make the best choice.
                    </p>
                  </div>
              )}
            </div>
          </div>

          {/* Email Section */}
          <div className="mb-8">
            {!emailSent && (
                <>
                  <h2 className="text-2xl font-semibold text-school-navy mb-4 flex items-center">
                    <Mail className="h-6 w-6 mr-2" />
                    Get Results by Email
                  </h2>
                  {!showEmailInput && (
                      <button
                          onClick={() => setShowEmailInput(true)}
                          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-school-navy hover:bg-school-navy/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-school-navy transition-colors"
                      >
                        Send Results to My Email
                      </button>
                  )}

                  {showEmailInput && (
                      <div className="mt-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-school-navy"
                        />
                        <button
                            onClick={handleSendEmail}
                            disabled={!isValidEmail || sendingEmail}
                            className={`mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                                isValidEmail
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-gray-400 cursor-not-allowed'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors`}
                        >
                          {sendingEmail ? 'Sending...' : 'Send Email'}
                          <CheckCircle className="ml-2 h-5 w-5" />
                        </button>
                        {emailError && (
                            <p className="mt-2 text-red-600 text-sm flex items-center">
                              <XCircle className="h-4 w-4 mr-1" />
                              {emailError}
                            </p>
                        )}
                      </div>
                  )}
                </>
            )}

            {emailSent && (
                <div className="p-4 rounded-lg bg-green-100 border-l-4 border-green-500">
                  <p className="text-green-700 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Email sent successfully!
                  </p>
                </div>
            )}
          </div>

          {/* Reset Button */}
          <button
              onClick={onReset}
              className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Start Over
          </button>
        </div>
      </div>
  );
}

export default Results;