import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
  // Ensure this only runs in the browser
  if (typeof window === 'undefined') return;

  // Generate or get stored user_id
  let userId = localStorage.getItem('user_id');
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('user_id', userId);
  }

  // Time-based greeting
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good Morning ☀️'
              : hour < 18 ? 'Good Afternoon 🌤️'
              : 'Good Evening 🌙';
  setGreeting(greet);

  // Supabase logging
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
      console.log('Visit logged ✅');
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
