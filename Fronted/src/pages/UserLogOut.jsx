
import React from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";


const UserLogOut = () => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate()

    const responce =  axios.get(
      `${import.meta.env.VITE_BASE_URL}/users/logout`,
      {
        headers : {
            Authorization : `Bearer ${token}`
        }
      }
    ).then((responce) => {
        if(responce.status === 200 ){
            localStorage.removeItem('token');
            navigate('/login')
        }
    })

  return (
    <div>
     Logging out...
    </div>
  )
}

export default UserLogOut



// import React, { useEffect, useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { UserDataContext } from "../context/UserContext";

// const UserLogOut = () => {
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const { setUser } = useContext(UserDataContext);

//   useEffect(() => {
//     const logout = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_BASE_URL}/users/logout`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.status === 200) {
//           localStorage.removeItem("token"); // remove token
//           setUser(null);                    // clear context
//           navigate("/login");              // redirect
//         }
//       } catch (err) {
//         console.log(err);
//         // fallback logout
//         localStorage.removeItem("token");
//         setUser(null);
//         navigate("/login");
//       }
//     };

//     logout();
//   }, []);

//   return <div>Logging out...</div>;
// };

// export default UserLogOut;

