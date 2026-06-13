async function check() {
  const url = 'https://gugtulhzhkseurxkenen.supabase.co/rest/v1/lead_magnets?select=*';
  const apiKey = 'sb_publishable_hl66asc7v8iy6mPGan5jPA_ajc9VpIi'; // .env.local의 PUBLISHABLE_KEY

  try {
    const res = await fetch(url, {
      headers: {
        'apikey': apiKey,
        'Authorization': `Bearer ${apiKey}`
      }
    });
    
    if (!res.ok) {
      console.error('Fetch failed:', res.status, await res.text());
      return;
    }
    
    const data = await res.json();
    console.log('--- Lead Magnets DB Data ---');
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
}

check();
