import Navbar from "./components/navbar/Navbar";
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/forms/Login';
import PostsPage from "./pages/posts-page/PostsPage";
import Register from './pages/forms/Register';
import Profile from "./pages/profile/Profile";
import CreatePosts from "./pages/create-post/CreatePost";
import PostDetails from "./pages/post-details/PostDetails";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Home from "./pages/home/Home"
import Category from "./pages/category/Category";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersTable from "./pages/admin/UsersTable";
import PostsTable from "./pages/admin/PostsTable";
import CategoriesTable from "./pages/admin/CategoriesTable";
import CommentsTable from "./pages/admin/CommentsTable";
import Footer from "./components/footer/Footer";
import VerifyEmail from "./pages/verify-email/VerifyEmail";
function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="App">
      <ToastContainer theme="colored" position="top-center" />
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
         <Route
          path="/users/:userId/verify/:token"
          element={!user ? <VerifyEmail /> : <Navigate to="/" />}
        />
      <Route path="/profile/:id" element={<Profile />} />
        <Route path="posts">
          <Route index element={<PostsPage />} />
          <Route
            path="create-post"
            element={user ? <CreatePosts /> : <Navigate to="/" />}
          />
          <Route path="details/:id" element={<PostDetails />} />
          <Route path="categories/:category" element={<Category />} />
        </Route>
        <Route path="admin-dashboard">
          <Route
            index
            element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
          />
          <Route
            path="users-table"
            element={user?.isAdmin ? <UsersTable /> : <Navigate to="/" />}
          />
          <Route
            path="posts-table"
            element={user?.isAdmin ? <PostsTable /> : <Navigate to="/" />}
          />
          <Route
            path="categories-table"
            element={user?.isAdmin ? <CategoriesTable /> : <Navigate to="/" />}
          />
          <Route
            path="comments-table"
            element={user?.isAdmin ? <CommentsTable /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;