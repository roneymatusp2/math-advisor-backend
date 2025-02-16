// src/utils/scoring.ts

export interface RecommendationResult {
  course: 'AA' | 'AI' | 'TIE';
  level: 'HL' | 'SL' | 'TIE';
  courseConfidence: number;     // 0-100 for how strongly user leans to chosen course
  levelConfidence: number;      // 0-100 for how strongly user leans to chosen level
  overallConfidence: number;    // aggregated measure if you want an overall percentage
  details: {
    focus: string;    // descriptive text about the recommended course approach
    style: string;    // descriptive text about the recommended level
    advice: string;   // final advice to show user
    overrides: string[]; // messages if any "override" conditions triggered
    borderline: boolean; // signals if user is borderline in some dimension
  };
}

/**
 * WeightedAnswerEffects indicates how each answer affects scores for AA, AI, HL, and SL.
 * You can assign different weights if some answers are more important or more predictive.
 */
interface WeightedAnswerEffects {
  aa?: number;
  ai?: number;
  hl?: number;
  sl?: number;
}

/**
 * A global map linking possible answer values (e.g. 'aa_hl') to numeric increments.
 * Adjust as needed for fine-tuning.
 */
const ANSWER_WEIGHT_MAP: Record<string, WeightedAnswerEffects> = {
  aa_hl: { aa: 2, hl: 2 },
  aa_sl: { aa: 2, sl: 2 },
  ai_hl: { ai: 2, hl: 2 },
  ai_sl: { ai: 2, sl: 2 },

  // You can add special codes for overrides, e.g.:
  // 'force_hl_university': { /* no direct score, but triggers override */ },
  // 'pure_math_dislike': { /* no direct score, but triggers override */ },
};

/**
 * Checks for special override conditions (like "University requires HL").
 * Returns an array of textual messages describing triggered overrides.
 */
function checkOverrides(answers: Record<string, string>): string[] {
  const triggers: string[] = [];

  // Example 1: If the user has a hypothetical answer "require_hl"
  // we can forcibly push "University requires HL" as an override
  if (Object.values(answers).includes('require_hl')) {
    triggers.push('University requires HL → strong HL override');
  }

  // Example 2: If the user explicitly indicated "I strongly dislike pure math"
  // we might push them away from AA. This is just an example.
  if (Object.values(answers).includes('pure_math_dislike')) {
    triggers.push('User strongly dislikes pure math → AI recommended');
  }

  // Add any additional checks
  return triggers;
}

export function calculateResults(answers: Record<string, string>): RecommendationResult {
  let aaScore = 0;
  let aiScore = 0;
  let hlScore = 0;
  let slScore = 0;

  // 1) Apply Weighted Scoring
  for (const answer of Object.values(answers)) {
    const effects = ANSWER_WEIGHT_MAP[answer];
    if (effects) {
      if (effects.aa) aaScore += effects.aa;
      if (effects.ai) aiScore += effects.ai;
      if (effects.hl) hlScore += effects.hl;
      if (effects.sl) slScore += effects.sl;
    }
  }

  // 2) Check overrides
  const overrides = checkOverrides(answers);

  // 3) Decide Course (AA vs. AI)
  let course: 'AA' | 'AI' | 'TIE';
  if (aaScore > aiScore) {
    course = 'AA';
  } else if (aiScore > aaScore) {
    course = 'AI';
  } else {
    course = 'TIE';
  }

  // 4) Decide Level (HL vs. SL)
  let level: 'HL' | 'SL' | 'TIE';
  if (hlScore > slScore) {
    level = 'HL';
  } else if (slScore > hlScore) {
    level = 'SL';
  } else {
    level = 'TIE';
  }

  // 5) Calculate separate confidences
  // courseConfidence
  const courseTotal = aaScore + aiScore;
  let courseConfidence = 0;
  if (course !== 'TIE' && courseTotal > 0) {
    const gap = course === 'AA' ? (aaScore - aiScore) : (aiScore - aaScore);
    courseConfidence = (gap / courseTotal) * 100;
  } else if (course === 'TIE') {
    courseConfidence = 50; // or 0 if you prefer
  }

  // levelConfidence
  const levelTotal = hlScore + slScore;
  let levelConfidence = 0;
  if (level !== 'TIE' && levelTotal > 0) {
    const gap = level === 'HL' ? (hlScore - slScore) : (slScore - hlScore);
    levelConfidence = (gap / levelTotal) * 100;
  } else if (level === 'TIE') {
    levelConfidence = 50;
  }

  // 6) Handle overrides
  // If "University requires HL" is triggered, forcibly push HL
  // or at least raise the HL confidence to 100 as an example:
  if (overrides.some(msg => msg.includes('requires HL'))) {
    level = 'HL';
    levelConfidence = 100;
  }

  // If there's a "pure math dislike" override, you might push AI. For demonstration:
  if (overrides.some(msg => msg.includes('dislikes pure math'))) {
    course = 'AI';
    courseConfidence = 100;
  }

  // 7) Overall Confidence (average or min or any formula)
  const overallConfidence = (courseConfidence + levelConfidence) / 2;

  // 8) Borderline detection - if tie or confidence is below some threshold
  const borderline =
      course === 'TIE' ||
      level === 'TIE' ||
      courseConfidence < 35 ||
      levelConfidence < 35;

  // 9) Generate final text details
  let focus = '';
  let advice = '';
  if (course === 'AA') {
    focus = 'A more theoretical approach emphasizing algebra, proofs, and rigorous problem-solving.';
    advice = 'Students who enjoy abstract concepts, proofs, or deeper calculus typically lean AA.';
  } else if (course === 'AI') {
    focus = 'A more applied approach focusing on real-world modeling, data analysis, and practical problem-solving.';
    advice = 'Students who prefer real-data projects, technology, and contextual math typically prefer AI.';
  } else {
    // TIE
    focus = 'You show balanced preferences between theoretical and applied mathematics.';
    advice = 'Consider discussing with a counselor or teacher to clarify your math interests.';
  }

  let style = '';
  if (level === 'HL') {
    style = 'Indicates willingness and ability to handle advanced content and heavier workload.';
  } else if (level === 'SL') {
    style = 'A balanced path with moderate depth and workload.';
  } else {
    style = 'You appear equally split between HL and SL. Further discussion recommended.';
  }

  return {
    course,
    level,
    courseConfidence: Math.round(courseConfidence),
    levelConfidence: Math.round(levelConfidence),
    overallConfidence: Math.round(overallConfidence),
    details: {
      focus,
      style,
      advice,
      overrides,
      borderline,
    },
  };
}
