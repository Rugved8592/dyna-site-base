import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Generate or fetch stored user_id
    let userId = localStorage.getItem('user_id');
    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem('user_id', userId);
    }

    // Get time of day
    const hour = new Date().getHours();
    const greet = hour < 12 ? 'Good Morning ☀️'
                : hour < 18 ? 'Good Afternoon 🌤️'
                : 'Good Evening 🌙';
    setGreeting(greet);

    // Log visit to Supabase
    supabase.from('visits').insert([
      {
        page: 'home',
        user_id: userId,
        extra: { hour: hour }
      }
    ]).then(({ error }) => {
      if (error) {
        console.error('Supabase insert error:', error.message);
      } else {
        console.log('Visit logged to Supabase ✅');
      }
    });
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>{greeting}, Welcome to Dyna-site 👋</h1>
      <p>This site changes based on your time, visits, and actions.</p>
    </div>
  );
}
