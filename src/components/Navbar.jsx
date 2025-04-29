import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function Navbar() {

    const navigate = useNavigate()
    const {userData, backendUrl, setUserData, setIsloggedin} = useContext(AppContent)

    const sendVerificationOtp = async ()=>{
      try{
        axios.defaults.withCredentials = true;

        const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp')

        if(data.success){
          navigate('/email-verify')
          toast.success(data.message)
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    const logout = async ()=>{
      try{
        axios.defaults.withCredentials = true
        const { data } = await axios.post(backendUrl + '/api/auth/logout')
        data.success && setIsloggedin(false)
        data.success && setUserData(false)
        navigate('/')

      } catch (error) {
        toast.error(error.message)
      }
    }

  return (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        padding: '1rem', 
        backgroundColor: 'rgb(10, 20, 60)' 
      }}>

        {userData ?
        <div>
          {userData.name[0].toUpperCase()}
          <div>
            <ul>
              {!userData.isAccountVerified && <li onClick={sendVerificationOtp}>Verify email</li>}
              <li onClick={logout}>Logout</li>
            </ul>
          </div>
        </div> 
        :  <button onClick={()=>navigate('/login')}
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Login
        </button>
        }

       
      </div>
  )
}
