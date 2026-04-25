import React, { useState, useContext } from "react";
import { FaFacebookF, FaApple, FaXTwitter } from "react-icons/fa6";
import signupImg from "../assets/authImg.png";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name.trim().length < 2) return Swal.fire("Error", "Name must be at least 2 characters.", "error");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return Swal.fire("Error", "Please enter a valid email address.", "error");
    if (formData.password.length < 6) return Swal.fire("Error", "Password must be at least 6 characters.", "error");
    if (formData.password !== formData.confirmPassword) return Swal.fire("Error", "Passwords do not match!", "error");
    try {
      await register({ name: formData.name, email: formData.email, password: formData.password });
      Swal.fire("Success!", "Account created successfully!", "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error", err.response?.data?.msg || "Something went wrong", "error");
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-full bg-transparent border border-teal-200 focus:border-teal-400 outline-none text-sm text-gray-800 placeholder-gray-400";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex max-w-5xl w-full">
        {/* Left - Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Open your account</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-500 hover:text-teal-600 font-medium">Sign in</Link>
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className={inputClass} required />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className={inputClass} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className={inputClass} required />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className={inputClass} required />
            <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-full transition font-semibold">
              Create Account
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
          <img src={signupImg} alt="Signup" className="w-full h-full object-cover rounded-xl" />
          <Link to="/" className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-teal-500 font-bold shadow">✕</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
