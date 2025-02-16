// src/utils/calculateResults.ts

interface QuestionWeights {
    aa: number;
    ai: number;
    hl: number;
    sl: number;
}

interface QuestionConfig {
    id: string;
    type: 'career' | 'interest' | 'skill' | 'learning' | 'future'; // NO sample/basic here
    weights: { [option: string]: QuestionWeights };
}

// Configuration for questions 1-25 (NO sample/basic questions here)
const questionConfig: QuestionConfig[] = [
    // --- Career & Future Path (Q1-Q5) ---
    {
        id: 'question1', type: 'career',
        weights: {
            A: { aa: 3, ai: 0, hl: 2, sl: 0 },
            B: { aa: -1, ai: -1, hl: -2, sl: 2 },
            C: { aa: 0, ai: 3, hl: 1, sl: 1 },
            D: { aa: -2, ai: -1, hl: -3, sl: 3 },
            E: { aa: 0, ai: 0, hl: 0, sl: 0 },
        },
    },
    {
        id: 'question2', type: 'career',
        weights: {
            A: { aa: 3, ai: 0, hl: 2, sl: 0 },
            B: { aa: -1, ai: -1, hl: -1, sl: 1 },
            C: { aa: 0, ai: 3, hl: 2, sl: 0 },
            D: { aa: -2, ai: -2, hl: -2, sl: 2 },
            E: { aa: 0, ai: 0, hl: 0, sl: 0 },
        },
    },
    {
        id: 'question3', type: 'career',
        weights: {
            A: { aa: 2, ai: -2, hl: 2, sl: -1 },
            B: { aa: 0, ai: 0, hl: 0, sl: 1 },
            C: { aa: -2, ai: 3, hl: 1, sl: 1 },
            D: { aa: -1, ai: -1, hl: -2, sl: 2 },
            E: { aa: 0, ai: 0, hl: 0, sl: 0 },
        },
    },
    {
        id: 'question4', type: 'career',
        weights: {
            A: { aa: 2, ai: -1, hl: 3, sl: -2 },
            B: { aa: 1, ai: 1, hl: 2, sl: 0 },
            C: { aa: 0, ai: 0, hl: -1, sl: 1 },
            D: { aa: -1, ai: -1, hl: -2, sl: 2 },
            E: { aa: 0, ai: 0, hl: 0, sl: 0 },
        },
    },
    {
        id: 'question5', type: 'career',
        weights: {
            A: { aa: 3, ai: -1, hl: 2, sl: -1 },
            B: { aa: 1, ai: -1, hl: 0, sl: 1 },
            C: { aa: -1, ai: 3, hl: 1, sl: 1 },
            D: { aa: -2, ai: -1, hl: -2, sl: 2 },
            E: { aa: 0, ai: 0, hl: 0, sl: 0 },
        },
    },

    // --- Interest & Enjoyment (Q6-Q10) ---
    {
        id: 'question6', type: 'interest',
        weights: {
            A: { aa: 3, ai: -1, hl: 2, sl: -1 },
            B: { aa: -1, ai: 3, hl: 1, sl: 1 },
            C: { aa: 1, ai: 1, hl: 0, sl: 1 },
            D: { aa: -2, ai: -2, hl: -1, sl: 2 },
            E: { aa: 0, ai: 0, hl: 0, sl: 0 },
        },
    },
    {
        id: 'question7', type: 'interest',
        weights: {
            A: { aa: 3, ai: -1, hl: 2, sl: -1 },
            B: { aa: -1, ai: 3, hl: 1, sl: 1 },
            C: { aa: 1, ai: 1, hl: 0, sl: 1 },
            D: { aa: -1, ai: -1, hl: -1, sl: 1 },
            E: { aa: 0, ai: 0, hl: 0, sl: 0 },
        },
    },
    {
        id: 'question8', type: 'interest',
        weights: {
            A: { aa: 3, ai: -1, hl: 2, sl: -1 },
            B: { aa: -1, ai: 3, hl: 1, sl: 1 },
            C: { aa: 0, ai: 0, hl: 0, sl: 0 },
            D: { aa: -1, ai: -1, hl: -1, sl: 2 },
            E: { aa: 0, ai: 0, hl: 0, sl: 0 },
        },
    },
    {
        id: 'question9', type: 'interest',
        weights: {
            A: { aa: 3, ai: -1, hl: 2, sl: -1 },
            B: { aa: -1, ai: 3, hl: 1, sl: 1 },
            C: { aa: 1, ai: 1, hl: 0, sl: 1 },
            D: { aa: -2, ai: -2, hl: -1, sl: 2 },
            E: { aa: 0, ai: 0, hl: 0, sl: 0 },
        },
    },
    {
        id: 'question10', type: 'interest',
        weights: {
            A: { aa: 3, ai: -1, hl: 2, sl: -1 },
            B: { aa: -1, ai: 3, hl: 1, sl: 1 },
            C: { aa: 1, ai: 1, hl: 0, sl: 1 },
            D: { aa: -1, ai: -1, hl: -1, sl: 1 },
            E: { aa: 0, ai: 0, hl: 0, sl: 0 },
        },
    },

    // --- Skills & Confidence (Q11-Q15) ---
    {
        id: 'question11', type: 'skill',
        weights: {
            A: { aa: 2, ai: 0, hl: 3, sl: -2 },
            B: { aa: 1, ai: 1, hl: 1, sl: 0 },
            C: { aa: -1, ai: -1, hl: -1, sl: 2 },
            D: { aa: -2, ai: -2, hl: -3, sl: 3 },
            E: { aa: 0, ai: 0, hl: 0, sl: 0 },
        },
    },
    {
        id: 'question12', type: 'skill',
        weights: {
            A: { aa: 1, ai: 0, hl: 3, sl: -2 },
            B: { aa: 0, ai: 1, hl: 1, sl: 0 },
            C: { aa: -1, ai: -1, hl: -2, sl: 2 },
            D: { aa: -2, ai: -1, hl: -3, sl: 3 },
            E: { aa: 0, ai: 0, hl: 0, sl: 0 },
        },
    },
    {
        id: 'question13', type: 'skill',
        weights: {
            A: { aa: 1, ai: -1, hl: 1, sl: 0 },
            B: { aa: -1, ai: 2, hl: 2, sl: -1 },
            C: { aa: 0, ai: 1, hl: 0, sl: 1 },
            D: { aa: 1, ai: 1, hl: 0, sl: 1 },
            E: { aa: 0, ai: 0, hl: 0, sl: 0 },
        },
    },
    {
        id: 'question14', type: 'skill',
        weights: {
            A: { aa: 2, ai: -2, hl: 2, sl: -1 },
            B: { aa: -2, ai: 3, hl: 1, sl: 1 },
            C: { aa: 1, ai: -1, hl: 0, sl: 1 },
            D: { aa: -1, ai: -2, hl: -2, sl: 3 },
            E: { aa: 0, ai: 0, hl: 0, sl: 0 },
        },
    },
    {
        id: 'question15', type: 'skill',
        weights: {
            A: { aa: 2, ai: -1, hl: 3, sl: -2 },
            B: { aa: -1, ai: 2, hl: 1, sl: 0 },
            C: { aa: 1, ai: 1, hl: 0, sl: 1 },
            D: { aa: -2, ai: -2, hl: -2, sl: 2 },
            E: { aa: 0, ai: 0, hl: 0, sl: 0 },
        },
    },

    // --- Learning Style (Q16-Q20) ---
    {
        id: 'question16', type: 'learning',
        weights: {
            A: { aa: 3, ai: -1, hl: 2, sl: -1 },
            B: { aa: -1, ai: 3, hl: 1, sl: 1 },
            C: { aa: 1, ai: 1, hl: 0, sl: 1 },
            D: { aa: -1, ai: -1, hl: -1, sl: 1 },
            E: { aa: 0, ai: 0, hl: 0, sl: 0 },
        },
    },
    {
        id: 'question17', type: 'learning',
        weights: {
            A: { aa: 3, ai: -1, hl: 2, sl: -1 },
            B: { aa: -1, ai: 3, hl: 1, sl: 1 },
            C: { aa: -2, ai: -2, hl: -1, sl: 2 },
            D: { aa: -1, ai: -1, hl: -2, sl: 2 },
            E: { aa: 0, ai: 0, hl: 0, sl: 0 },
        },
    },
    {
        id: 'question18', type: 'learning',
        weights: {
            A: { aa: 1, ai: -1, hl: 0, sl: 1 },
            B: { aa: -1, ai: 3, hl: 2, sl: -1 },
            C: { aa: 0, ai: 1, hl: 0, sl: 1 },
            D: { aa: -1, ai: -1, hl: -1, sl: 2 },
            E: { aa: 0, ai: 0, hl: 0, sl: 0 },
        },
    },
    {
        id: 'question19', type: 'learning',
        weights: {
            A: { aa: 3, ai: -1, hl: 2, sl: -1 },
            B: { aa: -1, ai: 3, hl: 1, sl: 1 },
            C: { aa: 0, ai: 0, hl: 0, sl: 0 },
            D: { aa: -2, ai: -2, hl: -2, sl: 2 },
            E: { aa: 0, ai: 0, hl: 0, sl: 0 },
        },
    },
    {
        id: 'question20', type: 'learning',
        weights: {
            A: { aa: 3, ai: -1, hl: 2, sl: -1 },
            B: { aa: -1, ai: 3, hl: 1, sl: 1 },
            C: { aa: 1, ai: 1, hl: 0, sl: 1 },
            D: { aa: -2, ai: -2, hl: -2, sl: 2 },
            E: { aa: 0, ai: 0, hl: 0, sl: 0 },
        },
    },

    // --- Future Goals (Q21-Q25) ---
    {
        id: 'question21', type: 'future',
        weights: {
            A: { aa: 2, ai: 0, hl: 3, sl: -2 },
            B: { aa: 1, ai: 1, hl: 2, sl: 0 },
            C: { aa: -1, ai: -1, hl: -2, sl: 2 },
            D: { aa: -2, ai: -1, hl: -3, sl: 3 },
            E: { aa: 0, ai: 0, hl: 0, sl: 0 },
        },
    },
    {
        id: 'question22', type: 'future',
        weights: {
            A: { aa: 3, ai: -1, hl: 2, sl: -1 },
            B: { aa: -1, ai: 3, hl: 1, sl: 1 },
            C: { aa: -2, ai: -1, hl: -1, sl: 2 },
            D: { aa: 0, ai: 0, hl: 0, sl: 1 },
            E: { aa: 0, ai: 0, hl: 0, sl: 0 },
        },
    },
    {
        id: 'question23', type: 'future',
        weights: {
            A: { aa: 3, ai: -2, hl: 3, sl: -2 },
            B: { aa: 1, ai: 1, hl: 2, sl: 0 },
            C: { aa: -1, ai: -1, hl: -1, sl: 2 },
            D: { aa: 0, ai: 0, hl: -2, sl: 2 },
            E: { aa: 0, ai: 0, hl: 0, sl: 0 },
        },
    },
    {
        id: 'question24', type: 'future',
        weights: {
            A: { aa: 1, ai: 1, hl: 1, sl: 0 },
            B: { aa: 0, ai: 0, hl: 1, sl: 0 },
            C: { aa: -1, ai: -1, hl: -1, sl: 1 },
            D: { aa: 0, ai: 0, hl: 0, sl: 1 },
            E: { aa: 0, ai: 0, hl: 0, sl: 0 },
        },
    },
    {
        id: 'question25', type: 'future',
        weights: {
            A: { aa: 1, ai: -1, hl: 3, sl: -2 },
            B: { aa: 0, ai: 0, hl: 1, sl: 0 },
            C: { aa: 0, ai: 0, hl: 0, sl: 0 },
            D: { aa: -1, ai: -1, hl: -2, sl: 2 },
            E: { aa: 0, ai: 0, hl: 0, sl: 0 },
        },
    },
];

// --- Sample Problem Correct Answers (Moved Here) ---
const sampleProblemCorrectAnswers: Record<string, string> = {
    question31: 'A', // 82
    question32: 'A', // 18
    question33: 'A', // n=10
    question34: 'A', // (x-1)(x^2 - 5x + 6)
};

// --- Basic Math Correct Answers (Moved Here) ---
const basicMathCorrectAnswers: Record<string, string> = {
    question35: 'B', // 40 cm²
    question36: 'B', // 12.5%
};


// --- Helper Functions ---

function getQuestionConfig(id: string): QuestionConfig | undefined {
    return questionConfig.find((q) => q.id === id);
}

// Calculates the maximum possible score for AA, AI, HL, and SL
function calculateMaxPossibleScores(): { aa: number; ai: number; hl: number; sl: number } {
    let maxAA = 0;
    let maxAI = 0;
    let maxHL = 0;
    let maxSL = 0;

    questionConfig.forEach((q) => {
        // Find the highest weight for each category across all options
        let highestAA = 0;
        let highestAI = 0;
        let highestHL = 0;
        let highestSL = 0;

        Object.values(q.weights).forEach((weights) => {
            highestAA = Math.max(highestAA, weights.aa);
            highestAI = Math.max(highestAI, weights.ai);
            highestHL = Math.max(highestHL, weights.hl);
            highestSL = Math.max(highestSL, weights.sl);
        });

        maxAA += highestAA;
        maxAI += highestAI;
        maxHL += highestHL;
        maxSL += highestSL;
    });

    // Add points for sample and basic questions (maximum 1 point per question)
    maxAA += 6; // 4 sample + 2 basic
    maxAI += 6;
    maxHL += 6;
    maxSL += 6;

    return { aa: maxAA, ai: maxAI, hl: maxHL, sl: maxSL };
}

// --- Main Calculation Function ---

interface Results {
    course: 'AA' | 'AI' | 'Tie';
    level: 'HL' | 'SL' | 'Tie';
    courseConfidence: number;
    levelConfidence: number;
    overallConfidence: number;
    details: {
        focus: string;
        style: string;
        advice: string;
        overrides?: string[];
        borderline?: boolean;
    };
}

export function calculateResults(
    answers: Record<string, string>,  // Answers from QuestionnaireForm (q1-q25)
    sampleAnswers: Record<string, string> // Answers from SampleProblems (q31-q34)
): Results {
    let aaScore = 0;
    let aiScore = 0;
    let hlScore = 0;
    let slScore = 0;

    // --- 1. Process Questionnaire Answers (1-25) ---
    for (const questionId in answers) {
        const config = getQuestionConfig(questionId);
        if (!config) continue; // Skip unknown questions

        const answer = answers[questionId];
        const weights = config.weights[answer];
        if (weights) {
            aaScore += weights.aa;
            aiScore += weights.ai;
            hlScore += weights.hl;
            slScore += weights.sl;
        }
    }

    // --- 2. Process Sample Problem Answers (31-34) ---
    for (const problemId in sampleProblemCorrectAnswers) {
        if (sampleAnswers[problemId] === sampleProblemCorrectAnswers[problemId]) {
            aaScore += 1;
            aiScore += 1;
            hlScore += 1;
            slScore += 1;
        }
    }

    // --- 3. Process Basic Math Answers (35-36) ---
    for (const problemId in basicMathCorrectAnswers) {
        // Assuming answers for basic questions are in the main `answers` object
        if (answers[problemId] === basicMathCorrectAnswers[problemId]) {
            aaScore += 1;
            aiScore += 1;
            hlScore += 1;
            slScore += 1;
        }
    }

    // --- 4. Determine Course Recommendation ---
    let recommendedCourse: 'AA' | 'AI' | 'Tie';
    if (aaScore > aiScore + 2) {
        recommendedCourse = 'AA';
    } else if (aiScore > aaScore + 2) {
        recommendedCourse = 'AI';
    } else {
        recommendedCourse = 'Tie';
    }

    // --- 5. Determine Level Recommendation ---
    let recommendedLevel: 'HL' | 'SL' | 'Tie';
    if (hlScore > slScore + 2) {
        recommendedLevel = 'HL';
    } else if (slScore > hlScore + 2) {
        recommendedLevel = 'SL';
    } else {
        recommendedLevel = 'Tie';
    }

    // --- 6. Calculate Confidence ---
    const maxScores = calculateMaxPossibleScores();
    const courseConfidence = recommendedCourse === 'Tie' ? 0 : (recommendedCourse === 'AA' ? aaScore / maxScores.aa : aiScore / maxScores.ai);
    const levelConfidence = recommendedLevel === 'Tie' ? 0 : (recommendedLevel === 'HL' ? hlScore / maxScores.hl : slScore / maxScores.sl);
    const overallConfidence = (courseConfidence + levelConfidence) / 2;

    // --- 7. Generate Details (Textual Feedback) ---
    const details = {
        focus:
            recommendedCourse === 'AA'
                ? 'Strong emphasis on theoretical mathematical concepts and abstract reasoning.'
                : recommendedCourse === 'AI'
                    ? 'Focus on practical applications of mathematics, using technology to solve real-world problems.'
                    : 'Balanced focus, with potential for both theoretical and applied mathematics.',
        style:
            recommendedCourse === 'AA'
                ? 'Abstract reasoning, formal proofs, and rigorous mathematical arguments.'
                : recommendedCourse === 'AI'
                    ? 'Data analysis, mathematical modeling, statistical techniques, and technology integration.'
                    : 'A mix of theoretical understanding and practical application.',
        advice:
            recommendedCourse === 'AA' && recommendedLevel === 'HL'
                ? 'Prepare for a rigorous and challenging course requiring deep engagement with abstract mathematical principles.  Strong problem-solving skills and a love for theory are essential.'
                : recommendedCourse === 'AA' && recommendedLevel === 'SL'
                    ? 'This course offers a solid foundation in theoretical mathematics, suitable for students who enjoy abstract concepts but prefer a less intense workload.'
                    : recommendedCourse === 'AI' && recommendedLevel === 'HL'
                        ? 'This course focuses on applying mathematical concepts to real-world scenarios, requiring strong analytical skills and comfort with technology.  Be prepared for a challenging and engaging experience.'
                        : recommendedCourse === 'AI' && recommendedLevel === 'SL'
                            ? 'This course provides a practical approach to mathematics, focusing on its applications in various fields.  It is suitable for students who prefer to see the relevance of math in real-world contexts.'
                            : 'Consider your strengths and interests carefully.  Discuss your options with your math teacher or counselor to make the best choice for your academic goals.', // Tie or unclear
        borderline: recommendedCourse === 'Tie' || recommendedLevel === 'Tie',
    };

    return {
        course: recommendedCourse,
        level: recommendedLevel,
        courseConfidence,
        levelConfidence,
        overallConfidence,
        details,
    };
}