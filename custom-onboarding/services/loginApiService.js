export async function register(username, password) {
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    return { message: data.message, data: data };
  } catch (error) {
    return { error: error.message };
  }
}

export async function logout() {
  return await fetch('/api/check-login', { method: 'POST' });
}

export async function isLoggedIn() {
  const res = await fetch('/api/check-login');
  const { loggedIn, userId } = await res.json();
  return { loggedIn, userId };
}
