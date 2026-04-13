import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const FinishRide = (props) => {

  const navigate = useNavigate();

  async function endRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      {
        rideId: props.ride._id, // ✅ correct format
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (response.status === 200) {
      // props.setFinishRidePanel(false);
      // props.setRidePopupPanel(false);
      navigate("/captain-home");
    }
  }

  return (
    <div>
      <h5
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
        className="p-1 text-center w-[93%] absolute top-0"
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">Finish this ride</h3>

      <div className="flex items-center justify-between mt-4 p-3 border-2 p-4 bg-yellow-300 rounded-lg">
        <div className="flex items-center gap-3  ">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://t4.ftcdn.net/jpg/16/90/93/63/360_F_1690936360_j3C0S6h9mMYDVmezy3EOHkPakUZmjfxw.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium ">
            {props.ride?.user?.fullname?.firstname || "User"}
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

        <div className="mt-10 w-full ">
          <button
            onClick={endRide}
            className="w-full flex justify-center text-lg mt-5 bg-green-600 text-white rounded-lg font-semibold p-3"
          >
            Finish Ride
          </button>

          {/* <p className="text-red-500 mt-10 text-xs">Click on Finish ride button if you completed the payment</p> */}
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
