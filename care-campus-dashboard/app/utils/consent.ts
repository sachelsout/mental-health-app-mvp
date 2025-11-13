// app/utils/consent.ts
import { supabase } from '@/lib/supabase';

export interface ConsentData {
  accepted: boolean;
  timestamp: string;
  version: string;
}

const CURRENT_CONSENT_VERSION = '1.0';

/**
 * Generate or retrieve session ID
 */
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
}

/**
 * Check if user has given consent (from sessionStorage for quick check)
 */
export function hasUserConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem('consent_given') === 'true';
}

/**
 * Check consent from Supabase (async verification)
 */
export async function checkConsentInDatabase(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  
  try {
    const sessionId = getSessionId();
    
    const { data, error } = await supabase
      .from('consent_events')
      .select('accepted')
      .eq('session_id', sessionId)
      .eq('accepted', true)
      .order('created_at', { ascending: false })
      .limit(1);
    
    if (error) throw error;
    
    const hasConsent = data && data.length > 0;
    
    // Sync with sessionStorage
    if (hasConsent) {
      sessionStorage.setItem('consent_given', 'true');
    }
    
    return hasConsent;
  } catch (error) {
    console.error('Error checking consent:', error);
    return false;
  }
}

/**
 * Store user consent
 */
export async function storeConsent(): Promise<void> {
  if (typeof window === 'undefined') return;
  
  const sessionId = getSessionId();
  
  await supabase.from('consent_events').insert({
    session_id: sessionId,
    accepted: true,
    version: CURRENT_CONSENT_VERSION,
    user_agent: navigator.userAgent
  });
  
  sessionStorage.setItem('consent_given', 'true');
}

/**
 * Clear user consent (for testing or revocation)
 */
export function clearConsent(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem('consent_given');
  sessionStorage.removeItem('session_id');
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