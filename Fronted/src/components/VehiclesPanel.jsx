import React from "react";

const VehiclesPanel = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setVehiclesPanel(false);
        }}
        className="p-1 text-center w-[93%] absolute top-0"
      >
        {/* <i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i> */}
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>

      <div
        onClick={() => {
          props.setVehiclesPanel(false); // 🔥 CLOSE current panel
          props.setConfirmRidePanel(true);
          props.selectVehicle("car");
        }}
        className="flex border-2 border-gray-300 active:border-black mb-3 rounded-xl w-full p-3 items-center justify-between"
      >
        <img
          className="h-20"
          src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Uber_Moto_India1.png"
          alt=""
        />
        <div className=" w-1/2 -ml-2">
          <h4 className="font-medium text-base">
            Moto{" "}
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 Mins away</h5>
          <h5 className="font-normal text-xs text-gray-600">
            Affordable, Motor Cycle rides
          </h5>
        </div>
        <h2 className="text-xl font-semibold">₹{props.fare.moto}</h2>
      </div>

      <div
        onClick={() => {
          props.setVehiclesPanel(false);
          props.setConfirmRidePanel(true);
          props.selectVehicle("moto");
        }}
        className="flex border-2 border-gray-300 active:border-black mb-3 rounded-xl w-full p-3 items-center justify-between"
      >
        <img
          className="h-20"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqftJr62o__QbhZuubo8UplH_I4OHvUbAcWw&s"
          alt=""
        />
        <div className=" w-1/2 ml-2">
          <h4 className="font-medium text-base">
            UberGO{" "}
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 Mins away</h5>
          <h5 className="font-normal text-xs text-gray-600">
            Affordable, compact rides
          </h5>
        </div>
        <h2 className="text-xl font-semibold">₹{props.fare.car}</h2>
      </div>

      <div
        onClick={() => {
          props.setVehiclesPanel(false);
          props.setConfirmRidePanel(true);
          props.selectVehicle("auto");
        }}
        className="flex border-2 border-gray-300 active:border-black mb-3 rounded-xl w-full p-3 items-center justify-between"
      >
        <img
          className="h-20"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaZY2_h59IkBt0R1AN-PWjGkFRBRfV_pTKuA&s"
          alt=""
        />
        <div className=" w-1/2 ml-2">
          <h4 className="font-medium text-base">
            UberAuto{" "}
            <span>
              <i className="ri-user-3-fill"></i>3
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 Mins away</h5>
          <h5 className="font-normal text-xs text-gray-600">
            Affordable, Auto rides
          </h5>
        </div>
        <h2 className="text-xl font-semibold">₹{props.fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclesPanel;
