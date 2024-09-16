// utils/jwtDecode.js
export const decodeToken = (token) => {
    try {
      // Split the token to get the payload part
      const base64Payload = token.split('.')[1];
      // Decode the base64 string and parse it to JSON
      const payload = JSON.parse(atob(base64Payload));
      return payload;
    } catch (e) {
      console.error('Failed to decode token:', e);
      return null;
    }
  };
  