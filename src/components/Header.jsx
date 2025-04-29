import React, { useContext } from 'react'
import { AppContent } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'




export default function Header() {
  
  const navigate = useNavigate()

  const {userData} = useContext(AppContent)

  return (

    <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        // padding: '40px',
      textAlign: 'center',
        backgroundColor: 'rgb(0, 10, 29)', // light gray background
      }}>
      <div>
        
       
         <img 
        src="/govt-logo1.jpg" 
        alt="Government Logo" 
        style={{
          width: '150px',
          height: 'auto',
          backgroundSize: 'cover',
          // marginBottom: '30px',
          objectFit: 'contain',
          backgroundColor: 'transparent'
        }} 
      />

        {/* Heading */}
        <h1 style={{color: 'white',
            Blob: '10px'
        }}>
          Hey {userData ? userData.name : ' 👋'}
        </h1>

        {/* Description */}
        <p style={{color: 'white',
            Blob: '10px'}}>
        "Take a quick tour and see how easily you can secure and share your documents with your family."
        </p>

        {/* Button */}
        <button onClick={()=>navigate('/login')}
            style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '16px',
            }}>
          Get Started
        </button>
      </div>
    </div>
  )
}
