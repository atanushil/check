import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [isLoading, setIsLoading] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();

  const { email, password } = formData;

  if (!email || !password) {
    alert('Both email and password are required.');
    return;
  }

  setIsLoading(true); // Start loading

  try {
    const response = await axios.post('http://localhost:3000/api/users/login', formData);
    const { token, user } = response.data;

    // Store token
    localStorage.setItem('token', token);

    alert('Login successful');
    navigate('/dashboard'); // Change route as needed
  } catch (error) {
    console.error('Login error:', error);
    alert(error.response?.data?.message || 'Login failed.');
  } finally {
    setIsLoading(false); // Stop loading
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-500">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-xl px-8 py-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Login</h2>

        {/* Email */}
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* Password */}
        <div className="relative mb-4">
          <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
          <input
            type={showPass ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 pr-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-3.5 text-gray-400"
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-all duration-200"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <span
            className="text-indigo-600 cursor-pointer hover:underline"
            onClick={() => navigate('/register')}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
