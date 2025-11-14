export type ContentBlockType = 'text' | 'quiz' | 'reflection' | 'exercise:breathing';

export interface TextBlock {
  type: 'text';
  id: string;
  title: string;
  content: string;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizBlock {
  type: 'quiz';
  id: string;
  title: string;
  question: string;
  options: QuizOption[];
  correctAnswerId: string;
  rationale: string;
}

export interface PracticeTimerBlock {
  type: 'exercise:breathing';
  id: string;
  title: string;
  durationSeconds: number;
  instructions: string;
}

export interface ReflectionBlock {
  type: 'reflection';
  id: string;
  title: string;
  prompt: string;
  minCharacters: number;
}

export type LessonContentBlock = TextBlock | QuizBlock | PracticeTimerBlock | ReflectionBlock;

export interface Lesson {
  id: string;
  name: string;
  title: string;
  content: LessonContentBlock[];
}

// --- MOCK DATA FOR TESTING ---

const MOCK_LESSON_CONTENT: LessonContentBlock[] = [
  // 1. Text Block: Introduction
  {
    type: 'text',
    id: 'intro',
    title: 'Introduction to Stress',
    content: 'Stress is your body’s reaction to a challenge or demand. In short bursts, stress can be helpful, urging you to perform well. However, chronic stress can have detrimental effects on both your physical and mental health. This lesson will teach you how to recognize and manage it.',
  },
  // 2. Quiz Block: Check Understanding
  {
    type: 'quiz',
    id: 'quiz-1',
    title: 'Quick Check: What is Stress?',
    question: 'The fight-or-flight response is primarily regulated by which system?',
    options: [
      { id: 'a', text: 'The Central Nervous System' },
      { id: 'b', text: 'The Parasympathetic Nervous System (Rest and Digest)' },
      { id: 'c', text: 'The Sympathetic Nervous System (Action)' },
      { id: 'd', text: 'The Endocrine System' },
    ],
    correctAnswerId: 'c',
    rationale: 'The Sympathetic Nervous System is responsible for triggering the "fight or flight" response, mobilizing the body for action during perceived threats.',
  },
  // 3. Breathing Exercise Block: Practice
  {
    type: 'exercise:breathing',
    id: 'breathing-1',
    title: 'Box Breathing Exercise',
    durationSeconds: 15, // Shortened for quick testing
    instructions: 'Follow the rhythm: Inhale for 4, Hold for 4, Exhale for 4, Hold for 4. Repeat until the timer finishes.',
  },
  // 4. Reflection Block: Application
  {
    type: 'reflection',
    id: 'reflection-1',
    title: 'Daily Reflection',
    prompt: 'What is one specific stressor you faced today, and how did the Box Breathing technique help you feel differently about it? Write about the physical sensations you noticed before and after the exercise.',
    minCharacters: 50,
  },
  // 5. Final Text Block: Conclusion
  {
    type: 'text',
    id: 'conclusion',
    title: 'Lesson Complete!',
    content: 'Congratulations! You have taken the first step toward managing your stress. Consistent practice of these techniques is key. Click "Finish Lesson" to complete your progress.',
  },
];

export const MOCK_LESSON: Lesson = {
    id: 'lesson-1-stress-mgmt',
    name: 'stress-101',
    title: 'Stress Management 101: Foundations',
    content: MOCK_LESSON_CONTENT,
};