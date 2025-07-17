// logger.js

// Initialize Supabase client
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Utility: Get scroll depth (in %)
function getScrollDepth() {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  return docHeight === 0 ? 0 : Math.min((scrollTop / docHeight) * 100, 100).toFixed(2);
}

// Utility: Get time spent on page
let timeOnPageStart = Date.now();
function getTimeSpent() {
  return ((Date.now() - timeOnPageStart) / 1000).toFixed(2); // in seconds
}

// Send log to Supabase
async function logVisit(extraData = {}) {
  const logData = {
    pathname: window.location.pathname,
    referrer: document.referrer || 'direct',
    timestamp: new Date().toISOString(),
    user_agent: navigator.userAgent,
    scroll_depth: getScrollDepth(),
    time_spent: getTimeSpent(),
    page_title: document.title,
    ...extraData,
  };

  const { data, error } = await client.from('visits').insert([logData]);
  if (error) {
    console.error('Supabase Log Error:', error);
  } else {
    console.log('Logged to Supabase:', data);
  }
}

// On unload or visibility change, log final state
window.addEventListener('beforeunload', () => logVisit());
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') logVisit();
});

// Optional: Track specific clicks
document.addEventListener('click', (e) => {
  const target = e.target.closest('[data-track]');
  if (target) {
    logVisit({ clicked_element: target.getAttribute('data-track') });
  }
});

