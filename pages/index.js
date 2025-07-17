import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // <-- correct path

export default function Home() {
  const [greeting, setGreeting] = useState('Hello 👋');

  useEffect(() => {
    // Only run in the browser (avoids SSR hydration issues)
    if (typeof window === 'undefined') return;

    // Persist a simple anonymous user id
    let userId = window.localStorage.getItem('user_id');
    if (!userId) {
      userId = (crypto?.randomUUID?.() || Math.random().toString(36).slice(2));
      window.localStorage.setItem('user_id', userId);
    }

    // Time-based greeting
    const hour = new Date().getHours();
    const greet =
      hour < 12 ? 'Good Morning ☀️' :
      hour < 18 ? 'Good Afternoon 🌤️' :
      'Good Evening 🌙';
    setGreeting(greet);

    // Log visit to Supabase
    supabase
      .from('visits')
      .insert([{ page: 'home', user_id: userId, extra: { hour } }])
      .then(({ data, error }) => {
        if (error) {
          console.error('❌ Supabase insert error:', error);
        } else {
          console.log('✅ Visit logged to Supabase:', data);
        }
      });
  }, []);

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>{greeting}, Welcome to Dyna-site 👋</h1>
      <p>This site adapts to your journey — powered by Dyna-sites.</p>
    </main>
  );
}
