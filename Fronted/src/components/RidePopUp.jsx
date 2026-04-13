import React from "react";

const RidePopUp = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setRidePopupPanel(false)
        }}
        className="p-1 text-center w-[93%] absolute top-0"
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">New Ride Available</h3>

        <div className="flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg">
            <div className="flex items-center gap-3  ">
                <img className="h-12 w-12 rounded-full object-cover" src="https://t4.ftcdn.net/jpg/16/90/93/63/360_F_1690936360_j3C0S6h9mMYDVmezy3EOHkPakUZmjfxw.jpg" alt="" />
                <h2 className="text-lg font-medium ">{props.ride?.user.fullname.firstname + " " +props.ride?.user.fullname.lastname }</h2>
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

       <div className="flex mt-5 w-full items-center justify-between">
         <button
          onClick={() => {
            props.setRidePopupPanel(false);
          }}
          className=" mt-1 bg-gray-300 text-gray-700 rounded-lg font-semibold p-3 px-10"
        >
          Ignore
        </button>
         <button
          onClick={() => {
            props.setConfirmRidePopupPanel(true)
            props.confirmRide();
          }}
          className=" bg-green-600 text-white rounded-lg font-semibold p-3 px-10"
        >
          Accept 
        </button>

       
       </div>
      </div>
    </div>
  );
};

export default RidePopUp;
