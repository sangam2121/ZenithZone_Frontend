const authenticate = async () => {
  try {
    const accessToken = localStorage.getItem('access');

    if (!accessToken) {
      console.error('No access token available');
      return false; // No access token available
    }

    const accessResponse = await fetch(`${import.meta.env.VITE_AUTH_BASE_URL}/auth/verify/`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (accessResponse.status === 401) {
      const refreshToken = localStorage.getItem('refresh');

      // Check if the refresh token is present
      if (!refreshToken) {
        console.error('No refresh token available');
        return false;
      }

      const refreshResponse = await fetch(`${import.meta.env.VITE_AUTH_BASE_URL}/auth/login/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (refreshResponse.ok) {
        const { access } = await refreshResponse.json();
        console.log('New access token:', access);
        localStorage.setItem('access', access);
        console.log('Access token refreshed successfully');
        return true;
      }

      if (refreshResponse.status === 401) {
        console.error('Failed to refresh access token: Refresh token is invalid');
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error during authentication verification:', error);

    if (error instanceof TypeError) {
      console.error('Network error or other unexpected issue');
    }

    return false;
  }
};

export { authenticate };
