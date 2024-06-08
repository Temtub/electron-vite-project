import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Note: Corrected the import statement for jwt-decode
import { useNavigate } from 'react-router';

export const useCheckSession = () => {
  const navigate = useNavigate();

  const [decodedToken, setDecodedToken] = useState("")

  useEffect(() => {
    const token = localStorage.getItem('token');
    // console.log(token)
    if (token) {
      const decodedToken = jwtDecode(token);
      const tokenExpirationTime = decodedToken.exp * 1000;

      if (tokenExpirationTime <= Date.now()) {
        console.log("Sesion cerrada")
        // Token has expired
        localStorage.removeItem('token'); // Remove the token from local storage
        navigate('/Se ha cerrado sesión automaticamente'); // Redirect to the login page
      } else {
        setDecodedToken(decodedToken)
      }
    } else {
      navigate('/Se ha cerrado sesión automaticamente'); // No token found, redirect to login
    }
  }, []);
  return decodedToken
}

