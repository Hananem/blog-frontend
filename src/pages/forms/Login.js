import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  // Form Submit Handler
  const formSubmitHandler = (e) => {
      e.preventDefault();
      if(email.trim() === "") return toast.error("Email is required");
      if(password.trim() === "") return toast.error("Password is required");

     console.log({ email, password });
     dispatch(loginUser({email, password}))
  }

  return (
   <section className="min-h-screen flex items-center justify-center ">
 <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-black">Login</h2>
      <form onSubmit={formSubmitHandler} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 ">Login</button>
        <div className="mt-4 text-sm">
            Did you forget your password?{" "}
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password
            </Link>
          </div>
      </form>
    </div>
   </section>
  );
};

export default Login;