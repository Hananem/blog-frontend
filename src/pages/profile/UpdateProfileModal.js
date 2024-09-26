import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/apiCalls/profileApiCall";
import { FaTimesCircle } from 'react-icons/fa';

const UpdateProfileModal = ({ setUpdateProfile, profile }) =>{
    const dispatch = useDispatch();

    const [username, setUsername] = useState(profile.username);
    const [bio, setBio] = useState(profile.bio);
    const [password, setPassword] = useState("");

    // Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        
        const updatedUser = { username, bio }

        if(password.trim() !== "") {
            updatedUser.password = password;
        }

        dispatch(updateProfile(profile?._id, updatedUser));
        setUpdateProfile(false);
    }
    return(
<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
  <form onSubmit={formSubmitHandler} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-semibold">Update Your Profile</h1>
      <abbr title="Close" className="cursor-pointer text-xl text-gray-600 hover:text-gray-800 transition-colors">
        <FaTimesCircle onClick={() => setUpdateProfile(false)} />
      </abbr>
    </div>
    <input 
      type="text" 
      className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder="Username"
    />
    <input 
      type="text" 
      className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
      value={bio}
      onChange={(e) => setBio(e.target.value)}
      placeholder="Bio"
    />
    <input 
      type="password" 
      className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
    />
    <button 
      type="submit" 
      className="w-full p-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
    >
      Update Profile
    </button>
  </form>
</div>
    )
}
export default UpdateProfileModal