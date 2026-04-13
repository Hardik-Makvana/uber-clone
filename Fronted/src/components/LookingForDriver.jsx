import React from "react";

const LookingForDriver = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setVehiclesFound(false)
        }}
        className="p-1 text-center w-[93%] absolute top-0"
      >
        {/* <i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i> */}
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Looking for a Driver</h3>

      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          className="h-50"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqftJr62o__QbhZuubo8UplH_I4OHvUbAcWw&s"
          alt=""
        />

        <div className=" w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-3   ">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-base -mt-1 text-gray-600">
                {props.pickup}{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-3 ">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-base -mt-1 text-gray-600">
               {props.destination}{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3    ">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.fare[props.vehicleType]}</h3>
              <p className="text-base -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
