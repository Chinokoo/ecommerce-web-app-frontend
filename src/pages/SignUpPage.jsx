import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeClosed, LoaderCircle, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const SignUpPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="flex flex-col justify-center sm:px-6 lg:px-8">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-3 text-center text-3xl font-extrabold text-zinc-300">
          Create Your Account !
        </h2>
      </motion.div>
      {/* name field */}
      <motion.div
        initial={{ opacity: 0, y: +20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col my-3 bg-stone-900 rounded-md py-8 px-4 sm:mx-auto sm:w-full sm:max-w-md shadow-lg "
      >
        <form className=" flex flex-col" onSubmit={handleSubmit}>
          <label
            htmlFor="name"
            className="text-white text-sm block font-medium"
          >
            Full Name
          </label>
          <div className=" relative rounded-md shadow-sm flex bg-stone-500 px-2 py-2 mb-4">
            <div className=" flex items-center pointer-events-none">
              <User className="h-5 w-5 text-white mr-2 " />
            </div>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter Your Full Name"
              className="placeholder:text-white w-full bg-transparent outline-none focus:bg-transparent [&:-webkit-autofill]:bg-transparent [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_rgb(120_113_108)_inset]"
            />
          </div>
          {/* email field */}
          <label
            htmlFor="email"
            className="text-white text-sm block font-medium pt-5"
          >
            Email Address
          </label>
          <div className=" relative rounded-md shadow-sm flex bg-stone-500 px-2 py-2">
            <div className=" flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-white mr-2 " />
            </div>
            <input
              type="text"
              id="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter Your Email"
              className="placeholder:text-white w-full bg-transparent outline-none [&:-webkit-autofill]:bg-transparent [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_rgb(120_113_108)_inset]"
            />
          </div>
          {/* password field */}
          <label
            htmlFor="password"
            className="text-white text-sm block font-medium pt-5"
          >
            Password
          </label>
          <div className=" relative rounded-md shadow-sm flex bg-stone-500 px-2 py-2">
            <div className=" flex items-center cursor-pointer ">
              {passwordVisible ? (
                <EyeClosed
                  className="h-5 w-5 text-white mr-2 "
                  onClick={() => {
                    setPasswordVisible(!passwordVisible);
                  }}
                />
              ) : (
                <Eye
                  className="h-5 w-5 text-white mr-2 "
                  onClick={() => {
                    setPasswordVisible(!passwordVisible);
                  }}
                />
              )}
            </div>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Enter Your Password"
              className="placeholder:text-white bg-transparent outline-none"
            />
          </div>
          {/* confirm password field */}
          <label
            htmlFor="confirmPassword"
            className="text-white text-sm block font-medium pt-5"
          >
            Confirm Password
          </label>
          <div className=" relative rounded-md shadow-sm flex bg-stone-500 px-2 py-2 mb-4 ">
            <div className=" flex items-center cursor-pointer ">
              {passwordVisible ? (
                <EyeClosed
                  className="h-5 w-5 text-white mr-2 "
                  onClick={() => {
                    setPasswordVisible(!passwordVisible);
                  }}
                />
              ) : (
                <Eye
                  className="h-5 w-5 text-white mr-2 "
                  onClick={() => {
                    setPasswordVisible(!passwordVisible);
                  }}
                />
              )}
            </div>
            <input
              type={passwordVisible ? "text" : "password"}
              id="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="Confirm Your Password"
              className="placeholder:text-white bg-transparent outline-none"
            />
          </div>
          {/* submit button */}
          <button
            type="submit"
            disabled={loading}
            className=" mt-5 w-full flex justify-center items-center bg-stone-300 text-stone-900 hover:bg-stone-800 hover:text-white py-2  transition-all duration-300 ease-in-out rounded-md disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <LoaderCircle className="mr-2 h-5 2-5 animate-spin" />
                <p>loading...</p>
              </>
            ) : (
              <span>Sign Up</span>
            )}
          </button>
        </form>
      </motion.div>
      <div className=" text-center text-sm font-medium">
        <span>Already have an account ? </span>
        <Link to="/login" className="text-stone-200 hover:text-stone-400">
          <span className="underline">Login here</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
