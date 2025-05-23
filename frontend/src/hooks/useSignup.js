import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import { API } from '../config';
/**
 * useSignup hook
 * 
 * The useSignup hook returns an object with two properties: loading and signup.
 * The loading property is a boolean that is set to true when the signup
 * request is in progress and false when it is complete.
 * The signup property is a function that takes an object with the following
 * properties: firstName, lastName, mobileNumber, email and password. The
 * signup function will return false if the input is invalid. If the signup
 * is successful, it will store the user data in local storage and update the
 * authentication context.
 * 
 * @returns {{loading: boolean, signup: (data: {firstName: string, lastName: string, mobileNumber: string, email: string, password: string}) => void}}
 */
const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthuser } = useAuthContext();

  const handleInputErrors = ({ firstName, lastName, mobileNumber, email, password }) => {
    if (!firstName || !lastName || !mobileNumber || !email || !password) {
      toast.error("Please fill in all fields");
      return false;
    }
    if (mobileNumber.length !== 10) {
      toast.error("Please enter a valid mobile number");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const signup = async ({ firstName, lastName, mobileNumber, email, password }) => {
    const success = handleInputErrors({ firstName, lastName, mobileNumber, email, password });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch(API.AUTH.SIGNUP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, mobileNumber, email, password }),
        credentials: "include",
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem('gym-user', JSON.stringify(data));
      setAuthuser(data);
      toast.success("Registration successful!");
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * The signupAfterPayment property is a function that takes an object with the following
   * properties: firstName, lastName, mobileNumber, email, password and type. The
   * signupAfterPayment function will return false if the input is invalid. If the
   * signup is successful, it will store the user data in local storage and update the
   * authentication context.
   *
   * @param {{firstName: string, lastName: string, mobileNumber: string, email: string, password: string, type: string}} data
   * @returns {Promise<void>}
   */
  const signupAfterPayment = async ({ firstName, lastName, mobileNumber, email, password, confirmPassword, address, type }) => {
    const success = handleInputErrors({ firstName, lastName, mobileNumber, email, password });
    if (!success) return;

    setLoading(true);
    try {
      const response = await axios.post(API.AUTH.SIGNUP_AFTER_PAYMENT, {
        firstName, lastName, mobileNumber, email, password, type, address
      });
      if (response.data.message === 'SUCCESS') {
        toast.success("Registration successful!");  
        localStorage.setItem('AuthuserId', JSON.stringify(response.data.AuthuserId));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  return { loading, signup, signupAfterPayment };
};

export default useSignup;
