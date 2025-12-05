;
import { useForm } from 'react-hook-form';
import { Link,} from 'react-router';
import useAuth from '../../../hooks/useAuth';

const Register = () => {

const {register, handleSubmit, formState: { errors }} = useForm()
const {registerUser} = useAuth()


const handleRegistration = (data) =>{
console.log(data)
registerUser(data.email, data.password)
.then(result =>{
  console.log(result.user)
})
.catch(error =>{
  console.log(error)
})
}

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Create an Account</h2>
        <p className="text-gray-500 text-center mt-2">Fill in the form to get started</p>

        <form onSubmit={handleSubmit(handleRegistration)} className="mt-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700">Name</label>
            <input 
              type="text" {...register('text',{required:true})}
              placeholder="Enter your name"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" {...register('email', {required: true})}
           

              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
               {errors.email?.type === 'required' && <span className='text-red-600'>Email is required</span>}
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-gray-700">Photo URL</label>
            <input 
              type="photo" {...register('photo',{required:true})}
              placeholder="Enter your photo URL"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700">Role</label>
            <select 
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="borrower">Borrower</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" {...register('password',{required:true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z]).+$/ })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.password?.type === 'required' && <span className='text-red-600'>Password is required</span>}
            {errors.password?.type === 'minLength' && <span className='text-red-600'>Password must be at least 6 characters long</span>}
            {
            errors.password?.type === 'pattern' && <span className='text-red-600'>Password must contain uppercase and lowercase letters.</span>
            }
            <p className="text-xs text-gray-400 mt-1">
             
            </p>
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
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 font-medium hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
