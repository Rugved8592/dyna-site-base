import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // 1. Create or get stored user_id
    let userId = localStorage.getItem('user_id');
    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem('user_id', userId);
    }

    // 2. Determine time of day
    const hour = new Date().getHours();
    let greet = '';
    if (hour < 12) greet = 'Good Morning ☀️';
    else if (hour < 18) greet = 'Good Afternoon 🌤️';
    else greet = 'Good Evening 🌙';

    setGreeting(greet);

    // 3. Log visit to Supabase
    supabase.from('visits').insert([
      {
        page: 'home',
        user_id: userId,
        extra: { hour: hour }
      }
    ]);
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>{greeting}, Welcome to Dyna-site 👋</h1>
      <p>This site changes based on your time, visits, and actions.</p>
    </div>
  );
}
