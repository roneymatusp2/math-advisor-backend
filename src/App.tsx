// src/App.tsx
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import QuestionnaireForm from './components/QuestionnaireForm';
import SampleProblems from './components/SampleProblems'; // Import
import Results from './components/Results';

type FlowState = 'landing' | 'questionnaire' | 'samples' | 'results';

function App() {
    const [currentState, setCurrentState] = useState<FlowState>('landing');
    const [questionnaireAnswers, setQuestionnaireAnswers] = useState<Record<string, string>>({});
    const [sampleAnswers, setSampleAnswers] = useState<Record<string, string>>({});

    const handleStart = () => {
        setCurrentState('questionnaire');
    };

    const handleQuestionnaireComplete = (answers: Record<string, string>) => {
        setQuestionnaireAnswers(answers);
        setCurrentState('samples'); // Go to samples after questionnaire
    };

    const handleSamplesComplete = (answers: Record<string, string>) => {
        setSampleAnswers(answers);
        setCurrentState('results'); // Go to results after samples
    };

    const handleSamplesSkip = () => {
        setSampleAnswers({}); // IMPORTANT: Clear sample answers if skipped
        setCurrentState('results'); // Allow skipping samples
    };

    const handleReset = () => {
        setQuestionnaireAnswers({});
        setSampleAnswers({});
        setCurrentState('landing');
    };

    const renderContent = () => {
        switch (currentState) {
            case 'landing':
                return <LandingPage onStart={handleStart} />;
            case 'questionnaire':
                return <QuestionnaireForm onSubmit={handleQuestionnaireComplete} />;
            case 'samples':
                return (
                    <SampleProblems
                        onComplete={handleSamplesComplete} // Pass callbacks
                        onSkip={handleSamplesSkip}
                    />
                );
            case 'results':
                return (
                    <Results
                        answers={questionnaireAnswers}
                        sampleAnswers={sampleAnswers} // Pass sample answers
                        onReset={handleReset}
                    />
                );
            default:
                return <div>Invalid state.</div>;
        }
    };

    return <div className="min-h-screen">{renderContent()}</div>;
}

export default App;