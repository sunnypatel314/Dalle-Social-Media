import { useState } from "react";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let isButtonDisabled =
    username.length < 4 ||
    hasSpecialCharacters(username) ||
    password !== confirmPassword ||
    !hasSpecialCharacters(password) ||
    email.substring(email.indexOf("@"), email.length - 1).length <= 0 ||
    password.length < 6;

  const handleSignUp = () => {
    console.log(email);
    console.log(password);
  };

  function hasSpecialCharacters(userString) {
    const regex = /[^a-zA-Z0-9]/;
    return regex.test(userString);
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-green-600 min-h-screen flex items-center justify-center">
      <div className="bg-gradient-to-r from-blue-300 to-green-300 p-8 rounded shadow-md w-80">
        <Link
          to={"/"}
          className="mb-2 text-3xl text-blue-700 hover:cursor-pointer hover:text-blue-800"
        >
          <FaHome />
        </Link>
        <h2 className="text-2xl font-semibold mb-4 text-blue-700 text-center">
          Sign Up
        </h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            {(!email.includes("@") ||
              email.substring(email.indexOf("@"), email.length - 1).length ===
                0) &&
            email.length > 0 ? (
              <p className={`text-xs text-red-500`}>
                Must be in proper email format
              </p>
            ) : null}
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              type="email"
              id="email"
              name="email"
              className={`w-full px-3 py-2 border border-blue-400 rounded focus:outline-none focus:border-blue-900 ${
                (!email.includes("@") ||
                  email.substring(email.indexOf("@"), email.length - 1)
                    .length === 0) &&
                email.length > 0
                  ? "border-red-700"
                  : ""
              }`}
              placeholder="Your email address"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            {username.length < 4 && username.length != 0 ? (
              <p className={`text-xs text-red-500`}>
                Username must be atleast 4 characters
              </p>
            ) : null}
            {hasSpecialCharacters(username) ? (
              <p className={`text-xs text-red-500`}>
                Username cannot have any special characters
              </p>
            ) : null}
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              type="text"
              id="username"
              name="username"
              className={`w-full px-3 py-2 border border-blue-400 rounded focus:outline-none focus:border-blue-900 ${
                (username.length < 4 || hasSpecialCharacters(username)) &&
                username.length != 0
                  ? "border-red-700"
                  : ""
              }`}
              placeholder="Your username"
            />
          </div>
          <div className="mb-4">
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className={`block text-sm font-medium text-gray-700`}
              >
                Password
              </label>
              <div className="hover:cursor-pointer">
                {passwordVisible ? (
                  <FaEyeSlash
                    onClick={() => {
                      setPasswordVisible(!passwordVisible);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setPasswordVisible(!passwordVisible);
                    }}
                  />
                )}
              </div>
            </div>
            {!hasSpecialCharacters(password) && password.length > 0 ? (
              <p className={`text-xs text-red-500`}>
                Must include a special character
              </p>
            ) : null}
            {password.length < 6 && password.length > 0 ? (
              <p className={`text-xs text-red-500`}>
                Must be at least 6 characters
              </p>
            ) : null}

            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              className={`w-full px-3 py-2 border border-blue-400 rounded focus:outline-none focus:border-blue-900 ${
                (!hasSpecialCharacters(password) || password.length < 6) &&
                password.length > 0
                  ? "border-red-700"
                  : ""
              }`}
              placeholder="Your password"
            />
          </div>
          <div className="mb-4">
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="hover:cursor-pointer">
                {passwordVisible ? (
                  <FaEyeSlash
                    onClick={() => {
                      setPasswordVisible(!passwordVisible);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setPasswordVisible(!passwordVisible);
                    }}
                  />
                )}
              </div>
            </div>
            {password !== confirmPassword && confirmPassword.length > 0 ? (
              <p className={`text-xs text-red-500`}>Must match your password</p>
            ) : null}
            <input
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              value={confirmPassword}
              type={passwordVisible ? "text" : "password"}
              id="confirmPassword"
              name="password"
              className={`w-full px-3 py-2 border border-blue-400 rounded focus:outline-none focus:border-blue-900 ${
                password !== confirmPassword && confirmPassword.length > 0
                  ? "border-red-700"
                  : ""
              }`}
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            disabled={isButtonDisabled}
            onClick={handleSignUp}
            className={`w-full ${
              isButtonDisabled ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
            } text-white py-2 rounded-md transition duration-300`}
          >
            Sign Up
          </button>
        </form>
        <p className="text-gray-700 text-sm mt-3 text-center">
          Already have an account?{"  "}
          <Link to={"/log-in"} className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
