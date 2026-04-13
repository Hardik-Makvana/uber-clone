import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopup = (props) => {
  const [otp, setotp] = useState("");
  const navigate = useNavigate();

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  // };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!props.ride?._id) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        {
          params: {
            rideId: props.ride._id,
            otp: otp,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      
      if (response.status === 200) {
        props.setConfirmRidePopupPanel(false);
        props.setRidePopupPanel(false);
        navigate("/captain-riding", { state: { ride: props.ride } });
      }

    } catch (error) {
      console.error(error.response?.data);
    }
  };

  return (
    <div>
      {/* <h5
        onClick={() => {
          props.setRidePopupPanel(false);
        }}
        className="p-1 text-center w-[93%] absolute top-0"
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i>
      </h5> */}

      <button
        onClick={() => props.setRidePopupPanel(false)}
        className="absolute top-3 right-3 text-xl"
      >
        ✖
      </button>

      <h3 className="text-2xl font-semibold mb-5">
        Confrim this ride to start
      </h3>

      <div className="flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg">
        <div className="flex items-center gap-3  ">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://t4.ftcdn.net/jpg/16/90/93/63/360_F_1690936360_j3C0S6h9mMYDVmezy3EOHkPakUZmjfxw.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium capitalize">
            {props.ride?.user?.fullname?.firstname}{" "}
            {props.ride?.user?.fullname?.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className=" w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-3   ">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-base -mt-1 text-gray-600">
                {props.ride?.pickup}{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-3 ">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-base -mt-1 text-gray-600">
                {props.ride?.destination}{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3    ">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-base -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full ">
          <form onSubmit={submitHandler}>
            <input
              onChange={(e) => {
                setotp(e.target.value);
              }}
              value={otp}
              type="text"
              className="bg-[#eee] px-6 py-4 font-mono text-base rounded-lg w-full mt-3"
              placeholder="Enter OTP"
            />
            <button
              // to="/captain-riding"
              onClick={() => {
                props.setConfirmRidePopupPanel(false);
                props.setRidePopupPanel(false);
              }}
              className="w-full text-lg flex justify-center mt-5 bg-green-600 text-white rounded-lg font-semibold p-3"
            >
              Confirm
            </button>

            <button
              onClick={() => {
                props.setConfirmRidePopupPanel(false);
                props.setRidePopupPanel(false);
              }}
              className="w-full mt-1 text-lg bg-red-600 text-white rounded-lg font-semibold p-3"
            >
              Cancel
            </button>

            {/* <button
              type="submit"
              className="w-full text-lg flex justify-center mt-5 bg-green-600 text-white rounded-lg font-semibold p-3"
            >
              Confirm
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopup;
