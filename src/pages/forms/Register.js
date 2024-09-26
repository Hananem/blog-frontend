import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { registerUser } from "../../redux/apiCalls/authApiCall";


const Register = () => {
  const dispatch = useDispatch();
    const { registerMessage } = useSelector(state => state.auth);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 // Form Submit Handler
 const formSubmitHandler = (e) => {
  e.preventDefault();
  if(username.trim() === "") return toast.error("Username is required");
  if(email.trim() === "") return toast.error("Email is required");
  if(password.trim() === "") return toast.error("Password is required");

  dispatch(registerUser({ username, email, password }))
}

const navigate = useNavigate();

if(registerMessage) {
    swal({
        title: registerMessage,
        icon: "success"
    }).then(isOk => {
        if(isOk) {
           navigate("/login");
        }
    })
}

  return (
    <section className="min-h-screen flex items-center justify-center">
    <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-black">Register</h2>
      <form onSubmit={formSubmitHandler} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-black">Name</label>
          <input
            type="text"
            id="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
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
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800">Register</button>
      </form>
    </div>
    </section>
    
  );
};

export default Register