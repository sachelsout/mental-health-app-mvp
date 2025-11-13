// utils/consent.ts

export interface ConsentData {
  accepted: boolean;
  timestamp: string;
  version: string;
}

const CONSENT_STORAGE_KEY = 'care_campus_consent';
const CURRENT_CONSENT_VERSION = '1.0';

/**
 * Check if user has given consent
 */
export function hasUserConsent(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const consentData = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!consentData) return false;
    
    const parsed: ConsentData = JSON.parse(consentData);
    return parsed.accepted === true && parsed.version === CURRENT_CONSENT_VERSION;
  } catch (error) {
    console.error('Error checking consent:', error);
    return false;
  }
}

/**
 * Store user consent
 */
export function storeConsent(): void {
  if (typeof window === 'undefined') return;
  
  const consentData: ConsentData = {
    accepted: true,
    timestamp: new Date().toISOString(),
    version: CURRENT_CONSENT_VERSION
  };
  
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentData));
}

/**
 * Clear user consent (for testing or revocation)
 */
export function clearConsent(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CONSENT_STORAGE_KEY);
}

/**
 * Get consent data
 */
export function getConsentData(): ConsentData | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const consentData = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!consentData) return null;
    return JSON.parse(consentData);
  } catch (error) {
    console.error('Error getting consent data:', error);
    return null;
  }
}

/**
 * Crisis resources data
 */
export const CRISIS_RESOURCES = [
  {
    name: '988 Suicide & Crisis Lifeline',
    contact: '988',
    type: 'call_text',
    description: 'Call or text 988 for immediate crisis support',
    link: 'tel:988'
  },
  {
    name: 'Crisis Text Line',
    contact: 'Text HOME to 741741',
    type: 'text',
    description: 'Text-based crisis support',
    link: 'sms:741741'
  },
  {
    name: 'Emergency Services',
    contact: '911',
    type: 'call',
    description: 'For immediate life-threatening emergencies',
    link: 'tel:911'
  },
  {
    name: 'SAMHSA National Helpline',
    contact: '1-800-662-4357',
    type: 'call',
    description: 'Substance abuse and mental health services',
    link: 'tel:1-800-662-4357'
  }
];