import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Home() {
  const [greeting, setGreeting] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // ✅ Ensure it's only running in browser
    if (typeof window === 'undefined') return;

    // ✅ Handle user ID generation safely
    let userId = localStorage.getItem('user_id');
    if (!userId) {
      try {
        userId = self.crypto.randomUUID();
      } catch (e) {
        userId = Math.random().toString(36).substring(2); // fallback
      }
      localStorage.setItem('user_id', userId);
    }

    // ✅ Time-based greeting
    const hour = new Date().getHours();
    const greet = hour < 12 ? 'Good Morning ☀️'
              : hour < 18 ? 'Good Afternoon 🌤️'
              : 'Good Evening 🌙';
    setGreeting(greet);

    // ✅ Send to Supabase
    supabase.from('visits').insert([
      {
        page: 'home',
        user_id: userId,
        extra: { hour: hour }
      }
    ]).then(({ error }) => {
      if (error) {
        console.error('❌ Supabase Error:', error.message);
      } else {
        console.log('✅ Visit logged to Supabase');
      }
    });

  }, [mounted]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>{greeting || 'Hello 👋'}</h1>
      <p>This site adapts to your journey — powered by Dyna-sites.</p>
    </div>
  );
}
