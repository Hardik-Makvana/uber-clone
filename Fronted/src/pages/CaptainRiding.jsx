import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FinishRide from "../components/FinishRide";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel],
  );

  return (
    <div className="h-screen flex flex-col relative justify-end">
      <div className="fixed p-6 top-0 flex items-center justify-between w-full">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/captain-home"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div
        className="h-1/5 mt-4 p-6 flex items-center justify-between relative bg-yellow-400"
        onClick={() => {
          setFinishRidePanel(true);
        }}
      >
        <h5
          onClick={() => {}}
          className="p-1 text-center w-[95%] absolute top-0"
        >
          <i className="text-3xl text-black-200 ri-arrow-up-wide-line"></i>
        </h5>
        {/* <h4 className="text-xl font-semibold ">4 KM away</h4> */}
        {/* <h4 className="text-xl font-semibold">
          {rideData?.distance
            ? `${rideData.distance} KM away`
            : "Calculating..."}
        </h4> */}
        <h4>
          {rideData?.duration
            ? `${rideData.duration} mins away`
            : "Calculating..."}
        </h4>
        {/* <button className=" bg-green-600 text-white rounded-lg font-semibold p-3 px-10">
          Complete Ride
        </button> */}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setFinishRidePanel(true);
          }}
          className="bg-green-600 text-white rounded-lg font-semibold p-3 px-10"
        >
          Complete Ride
        </button>
      </div>

      <div
        ref={finishRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
      </div>

      <div className="h-screen fixed w-screen top-0 z-[-1] -mb-4">
        {/* <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        /> */}
        <LiveTracking />
      </div>
    </div>
  );
};

export default CaptainRiding;
