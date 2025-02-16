// src/data/questions.ts

export const questions = [
  // Section A: Career & Future Path (5 questions)
  {
    id: 'question1',
    type: 'career',
    text: 'Which academic fields are you most drawn to?',
    options: [
      { value: 'A', label: 'Science, Engineering, Architecture, Mathematics' },
      { value: 'B', label: 'Journalism, Public Relations, History, Philosophy' },
      { value: 'C', label: 'Business, Economics, Accounting, Finance' },
      { value: 'D', label: 'Arts, Design, Literature, Creative Writing' },
      { value: 'E', label: 'Skip this question.' },
    ],
  },
  {
    id: 'question2',
    type: 'career',
    text: 'Which career path most closely aligns with your goals?',
    options: [
      { value: 'A', label: 'Engineering, Architecture, Physics' },
      { value: 'B', label: 'Media, Law, Public Policy' },
      { value: 'C', label: 'Business, Finance, Data Science' },
      { value: 'D', label: 'Arts, Design, Creative Industries' },
      { value: 'E', label: 'Skip this question.' },
    ],
  },
  {
    id: 'question3',
    type: 'career',
    text: 'What role do you see mathematics playing in your future studies or career?',
    options: [
      { value: 'A', label: 'A major role – advanced mathematics regularly' },
      { value: 'B', label: 'A supporting role – mathematics, but not the main focus' },
      { value: 'C', label: 'A minor role – some applied mathematics, but not theoretical' },
      { value: 'D', label: "Very little – mathematics not extensively" },
      { value: 'E', label: 'Skip this question.' },
    ],
  },
  {
    id: 'question4',
    type: 'career',
    text: 'What is your main reason for choosing a mathematics course in the IB?',
    options: [
      { value: 'A', label: 'Essential for my future university program (e.g., engineering)' },
      { value: 'B', label: 'I enjoy mathematics and want to explore it deeply' },
      { value: 'C', label: 'Required for my IB diploma or as a general prerequisite' },
      { value: 'D', label: 'Teacher/parent expectations' },
      { value: 'E', label: 'Skip this question.' },
    ],
  },
  {
    id: 'question5',
    type: 'career',
    text: 'What general direction are you considering for your university studies?',
    options: [
      { value: 'A', label: 'A technical/scientific field (engineering, computer science)' },
      { value: 'B', label: 'A social sciences or humanities field (law, psychology)' },
      { value: 'C', label: 'A business or finance-related field (economics, management)' },
      { value: 'D', label: 'A creative or design-oriented field (architecture, arts)' },
      { value: 'E', label: 'Skip this question.' },
    ],
  },

  // Section B: Interest & Enjoyment (5 questions)
  {
    id: 'question6',
    type: 'interest',
    text: 'How would you describe your general attitude toward math?',
    options: [
      { value: 'A', label: 'I find math fascinating and often do extra math activities' },
      { value: 'B', label: 'I like math if I can see a practical use for it' },
      { value: 'C', label: "It's necessary; I don't dislike it, but I'm not excited" },
      { value: 'D', label: 'I find math challenging and do it mainly because I have to' },
      { value: 'E', label: 'Skip this question.' },
    ],
  },
  {
    id: 'question7',
    type: 'interest',
    text: 'When learning a new concept, which approach sounds more appealing?',
    options: [
      { value: 'A', label: 'Exploring the proofs/theory behind it (the "why")' },
      { value: 'B', label: 'Seeing how to apply it in real-world situations (the "how")' },
      { value: 'C', label: 'Learning just enough steps to solve the problems' },
      { value: 'D', label: "I'm not sure; I tend to just follow instructions" },
      { value: 'E', label: 'Skip this question.' },
    ],
  },
  {
    id: 'question8',
    type: 'interest',
    text: 'Which type of problem do you find more rewarding to solve?',
    options: [
      { value: 'A', label: "A puzzle with an elegant, purely mathematical solution" },
      { value: 'B', label: 'A challenge where you use data to model a situation' },
      { value: 'C', label: "I don't strongly prefer one type over the other" },
      { value: 'D', label: 'Problems with straightforward methods' },
      { value: 'E', label: 'Skip this question.' },
    ],
  },
  {
    id: 'question9',
    type: 'interest',
    text: 'In your previous math classes, what did you most enjoy?',
    options: [
      { value: 'A', label: 'Algebraic derivations, proofs, or advanced problem sets' },
      { value: 'B', label: 'Projects involving data analysis' },
      { value: 'C', label: 'Clear explanations followed by practice exercises' },
      { value: 'D', label: "I didn't particularly enjoy any specific aspect" },
      { value: 'E', label: 'Skip this question.' },
    ],
  },
  {
    id: 'question10',
    type: 'interest',
    text: 'When a teacher briefly explains a tricky concept, how do you usually react?',
    options: [
      { value: 'A', label: 'I want to investigate it more deeply—maybe see a formal proof' },
      { value: 'B', label: 'I want to see examples of its use in everyday life' },
      { value: 'C', label: 'I want a straightforward procedure to follow' },
      { value: 'D', label: 'I usually move on once the basics are clear' },
      { value: 'E', label: 'Skip this question.' },
    ],
  },

  // Section C: Skills & Confidence (5 questions)
  {
    id: 'question11',
    type: 'skill',
    text: 'How comfortable are you with algebraic manipulation?',
    options: [
      { value: 'A', label: 'Very comfortable; algebra is one of my strengths' },
      { value: 'B', label: 'Adequate, but I prefer seeing how algebra is used in problems' },
      { value: 'C', label: 'I sometimes struggle with complex algebraic steps' },
      { value: 'D', label: 'I find algebra quite difficult or uninteresting' },
      { value: 'E', label: 'Skip this question.' },
    ],
  },
  {
    id: 'question12',
    type: 'skill',
    text: 'What about your comfort with calculus (derivatives, integrals)?',
    options: [
      { value: 'A', label: "I'm very interested in learning deeper calculus" },
      { value: 'B', label: "I can handle it if it's tied to practical applications" },
      { value: 'C', label: 'I find it challenging and might need significant support' },
      { value: 'D', label: 'I have minimal interest in calculus' },
      { value: 'E', label: 'Skip this question.' },
    ],
  },
  {
    id: 'question13',
    type: 'skill',
    text: 'Statistics and probability: how do you feel about analyzing data?',
    options: [
      { value: 'A', label: "I can do it, but I'm more drawn to abstract math" },
      { value: 'B', label: 'I enjoy working with data and seeing its real-life contexts' },
      { value: 'C', label: "I'm okay with basic statistics but don't want it as the focus" },
      { value: 'D', label: 'I find statistical analysis easier than algebra' },
      { value: 'E', label: 'Skip this question.' },
    ],
  },
  {
    id: 'question14',
    type: 'skill',
    text: 'Calculator and technology use: which statement best describes you?',
    options: [
      { value: 'A', label: "I'm comfortable working without a calculator for extended periods" },
      { value: 'B', label: "I'm happiest when I can use technology to handle calculations" },
      { value: 'C', label: "I don't mind calculators but can do simpler tasks by hand" },
      { value: 'D', label: "I rely heavily on a calculator" },
      { value: 'E', label: 'Skip this question.' },
    ],
  },
  {
    id: 'question15',
    type: 'skill',
    text: 'When facing a difficult math problem, how do you usually proceed?',
    options: [
      { value: 'A', label: 'I enjoy tackling it creatively, trying multiple methods' },
      { value: 'B', label: 'I look for a real-life angle or context to make sense of it' },
      { value: 'C', label: 'I prefer looking up similar worked examples first' },
      { value: 'D', label: "I quickly seek help" },
      { value: 'E', label: 'Skip this question.' },
    ],
  },

  // Section D: Learning Style (5 questions)
  {
    id: 'question16',
    type: 'learning',
    text: 'Which classroom scenario sounds most enjoyable to you?',
    options: [
      { value: 'A', label: 'Working individually on challenging theoretical problems' },
      { value: 'B', label: 'Doing a group-based investigation with real data' },
      { value: 'C', label: 'Practicing examples to master a method' },
      { value: 'D', label: 'A mix, but nothing too in-depth or abstract' },
      { value: 'E', label: 'Skip this question.' },
    ],
  },
  {
    id: 'question17',
    type: 'learning',
    text: "Imagine a 10-hour math project. What's your reaction?",
    options: [
      { value: 'A', label: "I'm excited to dive into something theoretical" },
      { value: 'B', label: "I'd choose a project with real-world data" },
      { value: 'C', label: "I'm nervous; I prefer short exercises" },
      { value: 'D', label: "I'd pick the simplest topic" },
      { value: 'E', label: 'Skip this question.' },
    ],
  },
  {
    id: 'question18',
    type: 'learning',
    text: 'Do you enjoy interpreting graphs, charts, or statistical reports?',
    options: [
      { value: 'A', label: "They're fine, but I prefer symbolic work" },
      { value: 'B', label: 'Yes, I like connecting math to real data' },
      { value: 'C', label: "Occasionally, but I'm not passionate about it" },
      { value: 'D', label: "I'd rather do computations than interpret graphs" },
      { value: 'E', label: 'Skip this question.' },
    ],
  },
  {
    id: 'question19',
    type: 'learning',
    text: 'What do you typically find easier?',
    options: [
      { value: 'A', label: 'Manipulating symbolic expressions or proving a concept' },
      { value: 'B', label: 'Evaluating a real situation and applying formulas' },
      { value: 'C', label: 'Neither is especially easy, but I try my best' },
      { value: 'D', label: 'Math feels difficult overall' },
      { value: 'E', label: 'Skip this question.' },
    ],
  },
  {
    id: 'question20',
    type: 'learning',
    text: 'If you had to explain a math concept, would you...',
    options: [
      { value: 'A', label: 'Show the theoretical underpinnings or a proof' },
      { value: 'B', label: 'Provide real-world examples or data' },
      { value: 'C', label: 'Demonstrate the basic procedural steps' },
      { value: 'D', label: "Suggest they ask the teacher" },
      { value: 'E', label: 'Skip this question.' },
    ],
  },

  // Section E: Future Goals (5 questions)
  {
    id: 'question21',
    type: 'future',
    text: 'Why might you consider (or avoid) a Higher Level (HL) math course?',
    options: [
      { value: 'A', label: 'I love math and want the challenge' },
      { value: 'B', label: 'It strengthens my university application' },
      { value: 'C', label: 'I feel pressured by parents or teachers' },
      { value: 'D', label: "I'm leaning SL; I don't want to dedicate too many hours" },
      { value: 'E', label: 'Skip this question.' },
    ],
  },
  {
    id: 'question22',
    type: 'future',
    text: 'How important is math in your future academic or career path?',
    options: [
      { value: 'A', label: "I'm aiming for engineering or other math-intensive fields" },
      { value: 'B', label: 'Business or science fields that benefit from strong math' },
      { value: 'C', label: "Not very important: a field that doesn't rely on math" },
      { value: 'D', label: "I'm unsure, but want to keep options open" },
      { value: 'E', label: 'Skip this question.' },
    ],
  },
  {
    id: 'question23',
    type: 'future',
    text: 'Have you checked if your universities require a specific math course?',
    options: [
      { value: 'A', label: 'Yes, they require or strongly prefer AA HL' },
      { value: 'B', label: 'Yes, they require math HL, but AA or AI is acceptable' },
      { value: 'C', label: 'They only require math SL' },
      { value: 'D', label: "I'm not sure or no particular requirement" },
      { value: 'E', label: 'Skip this question.' },
    ],
  },
  {
    id: 'question24',
    type: 'future',
    text: 'How much do external opinions influence your choice?',
    options: [
      { value: 'A', label: "A lot: if a teacher advises a course, I'll follow it" },
      { value: 'B', label: 'They matter, but I consider my own feelings most' },
      { value: 'C', label: "Somewhat; I worry about what peers say, but it's not only factor" },
      { value: 'D', label: 'Very little: I make the decision independently' },
      { value: 'E', label: 'Skip this question.' },
    ],
  },
  {
    id: 'question25',
    type: 'future',
    text: 'If your teacher suggests HL but you prefer SL, what would you do?',
    options: [
      { value: 'A', label: "Follow the teacher's advice and go for HL" },
      { value: 'B', label: "Consider it carefully but choose SL if I truly want" },
      { value: 'C', label: 'Seek a second opinion from a counselor' },
      { value: 'D', label: 'Stick with SL; I trust my preference' },
      { value: 'E', label: 'Skip this question.' },
    ],
  },
];