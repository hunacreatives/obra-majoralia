import { createClient } from '@supabase/supabase-js';

// Obra's own Supabase project. Both values are public (the publishable key
// only reaches what row-level security allows), so they're safe in the bundle.
const URL = import.meta.env.VITE_SUPABASE_URL || 'https://yamuhkpahvztyldtlrrp.supabase.co';
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_mFqKGopucvQGJekHNzM9Dw_6X1h3IAW';

export const supabase = createClient(URL, KEY);

/** Posts a public form (Contact / Careers) to the submit-form edge function. */
export async function submitForm(data: FormData): Promise<{ ok: boolean; error?: string }> {
  try {
    const { error } = await supabase.functions.invoke('submit-form', { body: data });
    if (!error) return { ok: true };
    // A 4xx from the function carries a readable message.
    let message = 'Something went wrong. Please try again.';
    try {
      const body = await (error as { context?: Response }).context?.json();
      if (body?.error) message = body.error;
    } catch { /* keep the default */ }
    return { ok: false, error: message };
  } catch {
    return { ok: false, error: 'Something went wrong. Please try again.' };
  }
}
