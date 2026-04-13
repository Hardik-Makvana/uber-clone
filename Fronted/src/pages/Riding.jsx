import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {}; // Retrieve ride data
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
  socket.on("ride-ended", () => {
    navigate("/home");
  });

  return () => {
    socket.off("ride-ended");
  };
}, [socket, navigate]);

  return (
    <div className="h-screen flex flex-col">
      <Link
        to="/home"
        className="fixed  h-10 right-2 top-2 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <i className="text-lg font-medium ri-home-5-fill"></i>
      </Link>
      <div className="h-1/2  -mb-4">
        <LiveTracking/>
      </div>

      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-35"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqftJr62o__QbhZuubo8UplH_I4OHvUbAcWw&s"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">
              {ride?.captain?.fullname?.firstname}
            </h2>

            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {ride?.captain?.vehicle?.plate}
            </h4>
            <p>Maruti Suzuki Alto</p>
          </div>
        </div>

        <div className="flex gap-2 justify-between flex-col items-center">
          <div className=" w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-3 ">
              <i className="ri-map-pin-user-fill"></i>
              <div>
                <h3 className="text-lg font-medium">562/11-A</h3>
                <p className="text-base -mt-1 text-gray-600">
                  {ride?.destination}{" "}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3    ">
              <i className="ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
                <p className="text-base -mt-1 text-gray-600">Cash Cash</p>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full mt-5 bg-green-600 text-white rounded-lg font-semibold p-2">
          Make a Payment{" "}
        </button>
      </div>
    </div>
  );
};

export default Riding;
