import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext()

export const AppContextProvider = (props)=>{

    axios.defaults.withCredentials = true;

    // const backendUrl = import.meta.env.REACT_APP_BACKEND_URL
    const [isLoggedin, setIsLoggdin] = useState(false)
    const [userData, setUserData] = useState(false)

    const backendUrl = process.env.REACT_APP_BACKEND_URL;
     console.log("Backend URL:", backendUrl);

    // const getUserData = async ()=>{
    //     try{
    //         const {data} = await axios.get(backendUrl + '/api/user/data')
    //         data.success ? setUserData(data.userData) : toast.error(data.message)
    //     } catch (error) {
    //         toast.error(data.message)
    //     }
    // }


    const getAuthState = async ()=>{
        try{
            const {data} = await axios.get(backendUrl + '/api/user/is-auth')
            if(data.success){
                setIsLoggdin(true)
                getUserData()
            }
        } catch (error){
            toast.error(error.message)
        }
    }

    const getUserData = async () => {
        try {
          const { data } = await axios.get(backendUrl + '/api/user/data');
          if (data.success) {
            setUserData(data.userData);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.error(error);
          // if (error.response && error.response.data && error.response.data.message) {
          //   toast.error(error.response.data.message);
          // } else {
          //   toast.error("Failed to fetch user data!");
          // }
        }
      };
      

      useEffect( ()=>{
        getAuthState();
      },[])

    const value = {
        backendUrl,
        isLoggedin, setIsLoggdin,
        userData, setUserData,
        getUserData
    }
    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}