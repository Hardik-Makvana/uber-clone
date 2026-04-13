import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          localStorage.removeItem("token");  // remove token
          setCaptain(null);                  // clear captain context
          navigate("/captain-login");       // redirect
        }
      } catch (err) {
        console.log(err);

        // fallback logout (important)
        localStorage.removeItem("token");
        setCaptain(null);
        navigate("/captain-login");
      }
    };

    logout();
  }, []);

  return <div>Logging out captain...</div>;
};

export default CaptainLogout;