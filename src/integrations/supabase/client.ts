import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dummy.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'dummy-key-for-compatibility'

// Only create client if we have valid URLs
let supabase = null;

try {
  if (supabaseUrl && supabaseKey && supabaseUrl !== 'https://dummy.supabase.co') {
    supabase = createClient(supabaseUrl, supabaseKey);
  } else {
    // Create dummy client for compatibility
    supabase = {
      auth: {
        signUp: () => Promise.resolve({ data: null, error: new Error('Supabase disabled - using AWS') }),
        signIn: () => Promise.resolve({ data: null, error: new Error('Supabase disabled - using AWS') }),
        signOut: () => Promise.resolve({ error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
      },
      from: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => Promise.resolve({ data: null, error: null }),
        delete: () => Promise.resolve({ data: null, error: null })
      })
    };
  }
} catch (error) {
  console.log('Supabase initialization failed, using AWS backend:', error.message);
  // Create minimal dummy client
  supabase = {
    auth: { getSession: () => Promise.resolve({ data: { session: null }, error: null }) },
    from: () => ({ select: () => Promise.resolve({ data: [], error: null }) })
  };
}

export { supabase };
