import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API } from '../config';
/**
 * useLogin hook
 * 
 * The useLogin hook returns an object with two properties: loading and login.
 * The loading property is a boolean that is set to true when the login
 * request is in progress and false when it is complete.
 * The login property is a function that takes an email and a password as
 * arguments and logs the user in to the application. The login function
 * will return false if the email or password is invalid. If the login is
 * successful, it will store the user data in local storage and update the
 * authentication context.
 * 
 * @returns {{loading: boolean, login: (email: string, password: string) => void}}
 */
const useLogin = () => {
  const [loading, setLoading] = useState(false); // loading state
  const { setAuthuser } = useAuthContext(); // authentication context
  const navigate=useNavigate();
  /**
   * Logs the user in to the application.
   * 
   * The login function takes an email and a password as arguments and logs
   * the user in to the application. If the login is successful, it will store
   * the user data in local storage and update the authentication context.
   * If the login fails, it will display an error to the user.
   * 
   * @param {string} email The user's email address
   * @param {string} password The user's password
   */
  const handleInputErrors = (email, password) => {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return false;
    }
    return true;
  };

  const login = async (email, password) => {
    const success = handleInputErrors(email, password);
    if (!success) return;
  
    setLoading(true);
    try {
      const res = await fetch(API.AUTH.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        throw new Error(data.error);
      }
      // Store user data and set authentication context
      localStorage.setItem('gym-user', JSON.stringify(data));
      setAuthuser(data);
      if(data.isAdmin){
        navigate('/');
      } else {
        navigate('/profile-page');
      }
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const loginAsAdmin = async (email, password) => {
    const success = handleInputErrors(email, password);
    if (!success) return;
  
    setLoading(true);
    try {
      const res = await fetch(API.AUTH.LOGIN_ADMIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        throw new Error(data.error);
      }
      // Store user data and set authentication context
      localStorage.setItem('gym-user', JSON.stringify(data));
      setAuthuser(data);
      navigate('/');
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login ,loginAsAdmin};
};

export default useLogin;
