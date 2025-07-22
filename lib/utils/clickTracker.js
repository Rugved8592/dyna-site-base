import { supabase } from '../supabaseClient';

export async function logClick(element, page = 'home') {
  const userId = window.localStorage.getItem('user_id');

  if (!userId) return;

  const { data, error } = await supabase
    .from('visits')
    .insert([
      {
        page,
        user_id: userId,
        action: 'click',
        element,
        timestamp: new Date().toISOString(),
      }
    ]);

  if (error) {
    console.error('❌ Error logging click:', error);
  } else {
    console.log('✅ Click logged:', data);
  }
}
