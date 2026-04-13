import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { useContext } from "react";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, SetUserData] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };

    const responce = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser,
    );

    if (responce.status === 201) {
      const data = responce.data;
      setUser(data.user);
      localStorage.setItem('token' , data.token);
      navigate("/home");
    }

    console.log(newUser);
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  return (
    <div>
      <div className="p-5 h-screen flex flex-col justify-between">
        <div>
          <img
            className="w-26 mb-2 "
            style={{ marginLeft: -15 }}
            src="https://media.ffycdn.net/us/postmates/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC9lZFwvNTUwOVwvNmNmOGVmM2YzMjFkMTA3YThmZGVjNjY1NjJlMmVmMzctMTYyMDM3Nzc0OC5haSJ9:postmates:9KZWqmYNXpeGs6pQy4UCsx5EL3qq29lhFS6e4ZVfQrs?width=2400"
            alt=""
          />

          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h3 className="text-lg font-medium mb-2">What's your name</h3>
            <div className="flex gap-4 mb-6">
              <input
                required
                value={firstName}
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base "
                type="text"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder="First name"
              />

              <input
                required
                value={lastName}
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base "
                type="text"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                placeholder="Last name"
              />
            </div>

            <h3 className="text-lg font-medium mb-2">What's your email</h3>
            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2  w-full  text-lg placeholder:text-base "
              type="email"
              placeholder="email@example.com"
            />

            <h3 className="text-lg font-medium mb-2">Enter Password</h3>

            <input
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2  w-full text-lg placeholder:text-base  "
              type="password"
              placeholder="password"
            />

            <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">
              Create account
            </button>

            <p className="text-center">
              Already have a a ccount?{" "}
              <Link to="/login" className="text-blue-600">
                Login here
              </Link>
            </p>
          </form>
        </div>

        <div>
          <p className="text-[10px] leading-tight ">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline"> Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
