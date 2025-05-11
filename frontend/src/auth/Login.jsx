import { useState } from 'react'; // React hook for managing component state
import { useNavigate } from 'react-router-dom'; // For navigation between pages
import axios from 'axios'; // HTTP client for API requests
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'; // Icons for UI

const Login = () => {
  // State to store form input values
  const [formData, setFormData] = useState({ email: '', password: '' });

  // State to toggle password visibility
  const [showPass, setShowPass] = useState(false);

  // State to handle loading status during API call
  const [isLoading, setIsLoading] = useState(false);

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Handle input change and update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const { email, password } = formData;

    // Simple form validation
    if (!email || !password) {
      alert('Both email and password are required.');
      return;
    }

    setIsLoading(true); // Show loading indicator

    try {
      // Make POST request to login API with form data
      const response = await axios.post('http://localhost:3000/api/users/login', formData);

      // Store user status in localStorage (can be used for conditional rendering or routing)
      localStorage.setItem('status', response.data.user.status);

      alert('Login successful');

      // Redirect user to dashboard
      navigate('/dashboard');
    } catch (error) {
      // Log and display error message from backend
      console.error('Login error:', error);
      alert(error.response?.data?.message || 'Login failed.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-500">
      <form
        onSubmit={handleLogin} // Bind form submit to login function
        className="bg-white shadow-lg rounded-xl px-8 py-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Login</h2>

        {/* Email input field with icon */}
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

        {/* Password input field with visibility toggle */}
        <div className="relative mb-4">
          <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
          <input
            type={showPass ? 'text' : 'password'} // Toggle between text/password
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 pr-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)} // Toggle password visibility
            className="absolute right-3 top-3.5 text-gray-400"
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Submit login button */}
        <button
          type="submit"
          disabled={isLoading} // Disable while loading
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-all duration-200"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        {/* Register redirect text */}
        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <span
            className="text-indigo-600 cursor-pointer hover:underline"
            onClick={() => navigate('/register')} // Navigate to registration page
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
