// Default export so the router can lazy-load the admin guard (and with it the
// Supabase client) only when someone opens /admin.
export { AdminGate as default } from './auth';
