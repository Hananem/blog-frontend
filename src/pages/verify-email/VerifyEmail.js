import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyEmail } from "../../redux/apiCalls/authApiCall";
import { FaCheckCircle } from "react-icons/fa";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const { isEmailVerified } = useSelector(state => state.auth);

  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(verifyEmail(userId, token));
  }, [userId, token]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      {isEmailVerified ? (
        <>
          <FaCheckCircle className="text-green-500 text-6xl mb-4" />
          <h1 className="text-2xl font-bold mb-4 text-center">
            Your email address has been successfully verified
          </h1>
          <Link to="/login" className="bg-white text-black py-2 px-4 rounded-md hover:bg-gray-200 transition">
            Go To Login Page
          </Link>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4 text-center">Not Found</h1>
        </>
      )}
    </section>
  );
};

export default VerifyEmail;
