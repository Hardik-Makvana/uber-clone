import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclesPanel from "../components/VehiclesPanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [activeField, setActiveField] = useState("pickup");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const vehiclesPanelRef = useRef(null);
  const confirmRidePanelef = useRef(null);
  const vechileFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclesPanel, setVehiclesPanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehiclesFound, setVehiclesFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();
  // const { sendMessage, receiveMessage } = useContext(SocketContext);

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  // socket.on("ride-confirmed", (ride) => {
  //   setVehiclesFound(false);
  //   setVehiclesFound(true);
  //   setRide(ride);
  // });

  socket.on("ride-confirmed", (ride) => {
  setRide(ride);

  // show "Looking for driver" first
  setVehiclesFound(true);

  // after some time → switch to OTP panel
  setTimeout(() => {
    setVehiclesFound(false);      // ❗ CLOSE this
    setWaitingForDriver(true);    // ❗ OPEN this
  }, 1000); // 2 sec delay
});

  socket.on('ride-started', ride => {
    console.log("ride")
    setWaitingForDriver(false)
    navigate('/riding', { state: { ride } }) // ✅ correct one
})

  useEffect(() => {
    socket.on("ride-started", (ride) => {
      
      console.log("🔥 ride-started:", ride);
      setWaitingForDriver(false);
      navigate("/riding");
    });

    return () => {
      socket.off("ride-started");
    };
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const searchText = activeField === "pickup" ? pickup : destination;

    if (searchText.trim().length < 3) {
      setSuggestions([]);
      setIsLoadingSuggestions(false);
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setIsLoadingSuggestions(true);

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: searchText },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoadingSuggestions(false);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [pickup, destination, activeField]);

  const handleSuggestionSelect = (suggestionText) => {
    const nextPickup = activeField === "pickup" ? suggestionText : pickup;
    const nextDestination =
      activeField === "destination" ? suggestionText : destination;

    if (activeField === "pickup") {
      setPickup(suggestionText);
    } else {
      setDestination(suggestionText);
    }

    setSuggestions([]);
    // setPanelOpen(false);

    if (nextPickup.trim() && nextDestination.trim()) {
      // setVehiclesPanel(true);
    }
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
          duration: 0.4,
          ease: "power2.out",
          // opacity:1
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
          // opacity:0
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen],
  );

  useGSAP(
    function () {
      if (vehiclesPanel) {
        gsap.to(vehiclesPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclesPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclesPanel],
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel],
  );

  useGSAP(
    function () {
      if (vehiclesFound) {
        gsap.to(vechileFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vechileFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclesFound],
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver],
  );

  async function findTrip() {
    try {
      setVehiclesPanel(true);
      setPanelOpen(false);

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log(response.data);

      setFare(response.data); // ✅ THIS LINE IS MISSING
    } catch (error) {
      console.error(error);
    }
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    console.log(response.data);
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />

      <div className="h-screen w-screen">
        {/* <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        /> */}
        <LiveTracking/>
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 top-6 right-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-[25px] font-semibold">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[45%] bg-gray-700 rounded-full left-10"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                setActiveField("pickup");
                setPanelOpen(true);
              }}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setActiveField("destination");
                setPanelOpen(true);
              }}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>

          <button
            onClick={findTrip}
            className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
          >
            Find Trip
          </button>
        </div>

        <div ref={panelRef} className="bg-white h-0 overflow-hidden">
          <LocationSearchPanel
            suggestions={suggestions}
            isLoadingSuggestions={isLoadingSuggestions}
            activeField={activeField}
            onSuggestionSelect={handleSuggestionSelect}
            setVehiclesPanel={setVehiclesPanel}
            setPanelOpen={setPanelOpen}
          />
        </div>
      </div>

      <div
        ref={vehiclesPanelRef}
        // className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
        className="fixed w-full z-10 bottom-0 bg-white px-3 p-4 rounded-t-2xl"
        // className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 p-4 overflow-hidden rounded-t-2xl"
      >
        <VehiclesPanel
          selectVehicle={setVehicleType}
          setVehiclesPanel={setVehiclesPanel}
          setConfirmRidePanel={setConfirmRidePanel}
          fare={fare}
        />
      </div>

      <div
        ref={confirmRidePanelef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
        <ConfirmRide
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
          setVehiclesPanel={setVehiclesPanel}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclesFound={setVehiclesFound}
        />
      </div>

      <div
        ref={vechileFoundRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclesFound={setVehiclesFound}
        />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0  bg-white px-3 py-6 pt-12"
      >
        <WaitingForDriver
          waitingForDriver={waitingForDriver}
          ride={ride}
          setWaitingForDriver={setWaitingForDriver}
          setVehiclesFound={setVehiclesFound}
        />
      </div>
    </div>
  );
};

export default Home;
