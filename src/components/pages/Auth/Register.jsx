;
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate,} from 'react-router';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from './SocialLogin';
import { updateProfile } from 'firebase/auth';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegistration = (data) => {
    registerUser(data.email, data.password)
      .then(async (result) => {
        const loggedUser = result.user;

        // Update profile
        await updateProfile(loggedUser, {
          displayName: data.name,
          photoURL: data.photo,
        });

        console.log("User Created:", loggedUser);

        // Redirect after registration
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Create an Account
        </h2>
        <p className="text-gray-500 text-center mt-2">
          Fill in the form to get started
        </p>

        <form onSubmit={handleSubmit(handleRegistration)} className="mt-6 space-y-4">

          {/* Name */}
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter your name"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.name && <span className="text-red-600">Name is required</span>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.email && <span className="text-red-600">Email is required</span>}
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-gray-700">Photo URL</label>
            <input
              type="url"
              {...register("photo", { required: true })}
              placeholder="Enter your photo URL"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.photo && <span className="text-red-600">Photo URL required</span>}
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700">Role</label>
            <select
              {...register("role", { required: true })}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="borrower">Borrower</option>
              <option value="manager">Manager</option>
            </select>
            {errors.role && <span className="text-red-600">Select a role</span>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
              })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.password && (
              <span className="text-red-600">
                Password must be at least 6 characters and include upper & lower case
              </span>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors mt-4"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account?
          <Link state={location.state} to="/login" className="text-green-500 font-medium hover:underline">
            Log In
          </Link>
        </p>

        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;