import {jwtDecode} from "jwt-decode";

const authenticate = async () => {
  try {
    const accessToken = localStorage.getItem('access');

    if (!accessToken) {
      localStorage.clear(); // Clear entire local storage if access token is not available
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
        localStorage.clear();  // Clear entire local storage if refresh token is not available
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
        localStorage.setItem('access', access);

        // Decode JWT and store user information
        const decodedData = jwtDecode(access);

        if (decodedData) {
          console.log("decoded data", decodedData);
          localStorage.setItem("userId", decodedData.user_id);
          localStorage.setItem("userName", decodedData.user_name);
          localStorage.setItem("userType", decodedData.user_type)
          localStorage.setItem("userImage",decodedData.image)
        }

        return true;
      }

      if (refreshResponse.status === 401) {
        localStorage.clear();  // Clear entire local storage if refresh token is invalid
        return false;
      }
    }

    // Decode JWT and store user information (in case access token is still valid)
    const decodedData = jwtDecode(accessToken);

    if (decodedData) {
      // console.log("decoded data", decodedData);
      localStorage.setItem("userId", decodedData.user_id);
      localStorage.setItem("userName", decodedData.user_name);
      localStorage.setItem("userType", decodedData.user_type)
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
