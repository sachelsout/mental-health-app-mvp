'use client';

import { useState } from 'react';

interface ConsentScreenProps {
  onAccept: () => void;
}

export default function ConsentScreen({ onAccept }: ConsentScreenProps) {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (accepted) {
      // Store consent in localStorage
      const consentData = {
        accepted: true,
        timestamp: new Date().toISOString(),
        version: '1.0' // Track consent version for future updates
      };
      localStorage.setItem('care_campus_consent', JSON.stringify(consentData));
      onAccept();
    }
  };

  const handleDecline = () => {
    // Redirect to declined page with resources
    window.location.href = '/declined';
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-zinc-50 mb-4">
              Welcome to Care Campus
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Before you continue, please read and accept our terms
            </p>
          </div>

          {/* Disclaimer Content */}
          <div className="mb-8 space-y-6 max-h-96 overflow-y-auto p-6 bg-zinc-50 dark:bg-zinc-800 rounded-lg border-2 border-zinc-200 dark:border-zinc-700">
            <section>
              <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-3">
                Non-Therapy Disclaimer
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Care Campus is an educational and support resource platform. <strong>This is not therapy or professional mental health treatment.</strong> The content provided, including interactions with Terry the Terp (our AI chatbot), learning modules, and resources, are for informational and educational purposes only.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-3">
                Important Information
              </h2>
              <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                <li>This platform does not replace professional mental health services</li>
                <li>Our AI chatbot is not a licensed therapist or counselor</li>
                <li>Information provided should not be used for diagnosing or treating mental health conditions</li>
                <li>We do not provide emergency or crisis intervention services</li>
                <li>Your responses and interactions may be stored for improving our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-3">
                When to Seek Professional Help
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                If you are experiencing a mental health crisis, please contact a professional immediately. We encourage you to speak with a licensed mental health professional, counselor, or therapist for personalized care.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-3">
                Your Consent
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                By continuing, you acknowledge that you have read and understood this disclaimer. You agree that Care Campus is an educational resource and not a substitute for professional mental health care.
              </p>
            </section>
          </div>

          {/* Crisis Resources */}
          <div className="mb-8 p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-800 rounded-lg">
            <h2 className="text-xl font-semibold text-red-900 dark:text-red-200 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Crisis Resources
            </h2>
            <div className="space-y-3 text-zinc-800 dark:text-zinc-200">
              <div>
                <p className="font-semibold">If you're in crisis or need immediate help:</p>
              </div>
              <div className="space-y-2 ml-4">
                <p>
                  <strong>988 Suicide & Crisis Lifeline:</strong>{' '}
                  <a href="tel:988" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                    Call or text 988
                  </a>
                </p>
                <p>
                  <strong>Crisis Text Line:</strong>{' '}
                  <a href="sms:741741" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                    Text HOME to 741741
                  </a>
                </p>
                <p>
                  <strong>Emergency Services:</strong>{' '}
                  <a href="tel:911" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                    Call 911
                  </a>
                </p>
                <p>
                  <strong>Campus Counseling:</strong>{' '}
                  <span className="text-zinc-700 dark:text-zinc-300">
                    Contact your university's counseling center
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="mb-8">
            <label className="flex items-start cursor-pointer group">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-1 h-5 w-5 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="ml-3 text-zinc-700 dark:text-zinc-300 group-hover:text-black dark:group-hover:text-zinc-50 transition-colors">
                I have read and understood the disclaimer above. I acknowledge that Care Campus is not a substitute for professional mental health care, and I agree to use this platform for educational purposes only.
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAccept}
              disabled={!accepted}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors ${
                accepted
                  ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
                  : 'bg-zinc-300 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-500 cursor-not-allowed'
              }`}
            >
              Accept and Continue
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 px-6 py-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 font-semibold transition-colors"
            >
              Decline
            </button>
          </div>

          {/* Footer Note */}
          <p className="mt-6 text-sm text-center text-zinc-500 dark:text-zinc-500">
            You can review this information anytime in the Resources section
          </p>
        </div>
      </div>
    </div>
  );
}