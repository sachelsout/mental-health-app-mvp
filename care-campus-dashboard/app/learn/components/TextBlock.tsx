import { TextBlock } from '@/app/learn/types';

interface TextBlockProps {
  block: TextBlock;
  onComplete: () => void; // Triggered when the user moves to the next block
}

/**
 * Renders simple text content blocks.
 */
export default function TextBlockComponent({ block, onComplete }: TextBlockProps) {
  // Text blocks are 'completed' simply by clicking the main navigation button
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{block.title}</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
        {block.content}
      </p>
      {/* The main page will render the "Next" button, utilizing onComplete */}
    </div>
  );
}