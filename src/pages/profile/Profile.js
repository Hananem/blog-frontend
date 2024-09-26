import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
import swal from "sweetalert";
import UpdateProfileModal from "./UpdateProfileModal";
import { FaCamera, FaUserEdit } from 'react-icons/fa';
import {
    deleteProfile,
    getUserProfile,
    uploadProfilePhoto,
  } from "../../redux/apiCalls/profileApiCall";
  import PostItem from "../../components/posts/PostItem";
  import { Oval } from "react-loader-spinner";
  import { logoutUser } from "../../redux/apiCalls/authApiCall";

  
const Profile = () => {
    const dispatch = useDispatch();
  const { profile,loading,isProfileDeleted } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  const [file, setFile] = useState(null);
  const [updateProfile, setUpdateProfile] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo(0, 0);
  }, [id]);

  const navigate = useNavigate();
  useEffect(() => {
    if(isProfileDeleted) {
      navigate("/");
    }
  }, [navigate, isProfileDeleted]);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("ther is no file!");

    const formData = new FormData();
    formData.append("image", file);

    dispatch(uploadProfilePhoto(formData));
  };

  // Delete Account Handler
  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover profile!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(user?._id));
        dispatch(logoutUser());
      }
    });
  };

  if(loading) {
    return (
    <div className="profile-loader">
      <Oval
        height={120}
        width={120}
        color="#000"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="grey"
        strokeWidth={3}
        strokeWidthSecondary={3}
        />
    </div>
  )}
    return(
<section className="p-6 bg-white text-black">
  <div className="mb-6 flex flex-col items-center">
    <div className="relative mb-4">
      <img
        src={file ? URL.createObjectURL(file) : profile?.profilePhoto?.url}
        alt=""
        className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full object-cover shadow-lg"
      />
      {user?._id === profile?._id && (
        <form onSubmit={formSubmitHandler} className="mt-2 flex flex-col items-center">
          <abbr title="Choose profile photo" className="cursor-pointer">
            <label htmlFor="file" className="text-xl cursor-pointer text-black hover:text-gray-700 transition-colors">
              <FaCamera />
            </label>
          </abbr>
          <input
            style={{ display: "none" }}
            type="file"
            name="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors" type="submit">
            Upload
          </button>
        </form>
      )}
    </div>
    <h1 className="text-2xl md:text-3xl font-semibold text-center">{profile?.username}</h1>
    <p className="text-gray-700 mt-2 text-center">{profile?.bio}</p>
    <div className="mt-4 text-center">
      <strong>Date Joined: </strong>
      <span>{new Date(profile?.createdAt).toDateString()}</span>
    </div>
    {user?._id === profile?._id && (
      <button
        onClick={() => setUpdateProfile(true)}
        className="mt-4 px-4 py-2 bg-black text-white rounded flex items-center hover:bg-gray-800 transition-colors"
      >
        <FaUserEdit className="mr-2" />
        Update Profile
      </button>
    )}
  </div>
  <div className="mt-6">
    <h2 className="text-xl md:text-2xl font-semibold mb-4">{profile?.username}'s Posts</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {profile?.posts?.map((post) => (
        <PostItem
          key={post._id}
          post={post}
          username={profile?.username}
          userId={profile?._id}
        />
      ))}
    </div>
  </div>
  {user?._id === profile?._id && (
    <button
      onClick={deleteAccountHandler}
      className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
    >
      Delete Your Account
    </button>
  )}
  {updateProfile && (
    <UpdateProfileModal
      profile={profile}
      setUpdateProfile={setUpdateProfile}
    />
  )}
</section>
    )
}

export default Profile