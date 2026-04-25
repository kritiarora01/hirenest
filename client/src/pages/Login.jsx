import React, { useContext, useState } from "react";
import { FaFacebookF, FaApple, FaXTwitter } from "react-icons/fa6";
import signupImg from "../assets/authImg.png";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "", remember: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email: formData.email, password: formData.password, remember: formData.remember });
      Swal.fire("Success!", "Logged in successfully!", "success");
    } catch (err) {
      Swal.fire("Error", err.response?.data?.msg || "Invalid credentials", "error");
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-full bg-transparent border border-teal-200 focus:border-teal-400 outline-none text-sm text-gray-800 placeholder-gray-400";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex max-w-5xl w-full">
        {/* Left - Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Login to your account</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-teal-500 hover:text-teal-600 font-medium">Sign Up</Link>
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className={inputClass} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className={inputClass} required />

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input type="checkbox" name="remember" id="remember" checked={formData.remember} onChange={handleChange} className="accent-teal-500" />
                <label htmlFor="remember" className="text-sm text-gray-500">Remember me</label>
              </div>
              <Link to="/forgot-password" className="text-sm text-gray-400 hover:text-teal-500">Forgot password?</Link>
            </div>

            <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-full transition font-semibold">
              Login Now
            </button>
          </form>

          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-200" />
            <span className="mx-4 text-gray-400 text-sm">or</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          <div className="flex justify-center space-x-4">
            {[FaFacebookF, FaApple, FaXTwitter].map((Icon, i) => (
              <button key={i} className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 hover:bg-teal-50 hover:text-teal-600 text-gray-600 transition">
                <Icon />
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-6 text-center">
            By joining, you agree to the{" "}
            <span className="text-teal-500 cursor-pointer">Terms of Service</span> and{" "}
            <span className="text-teal-500 cursor-pointer">Privacy Policy</span>
          </p>
        </div>

        {/* Right - Image */}
        <div className="hidden md:block w-1/2 relative m-6 rounded-xl overflow-hidden">
          <img src={signupImg} alt="Login" className="w-full h-full object-cover rounded-xl" />
          <Link to="/" className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-teal-500 font-bold shadow">✕</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
