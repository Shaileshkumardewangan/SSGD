import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext.jsx";
import axios from 'axios';
import {toast} from 'react-toastify';

export default function Login() {

  const navigate = useNavigate();

  const {backendUrl, setIsLoggedin, getUserData} = useContext(AppContent)

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // const onSubmitHandler = async (e)=>{
  //   try{
  //     e.preventDefault()

  //     axios.defaults.withCredentials = true

  //     if(state === 'Sign Up'){
  //      const {data} = await axios.post(backendUrl + '/api/auth/register', {name,
  //        email, password})
          

  //         if(data.success){
  //           setIsLoggedin(true)
  //           navigate('/')
  //         }else{
  //           toast.error(data.message)
  //         }
  //     }else{
  //       const {data} = await axios.post(backendUrl + '/api/auth/login', {email, password})

  //         if(data.success){
  //           setIsLoggedin(true)
  //           navigate('/')
  //         }else{
  //           toast.error(data.message)
  //         }
  //     }
  //   } catch(error){
  //     // toast.error(data.message)
  //   }
  // }



  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
  
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/auth/register', {
          name,
          email,
          password
        });
  
        if (data.success) {
          setIsLoggedin(true);
          getUserData()
          navigate('/');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/auth/login', {
          email,
          password
        });
  
        if (data.success) {
          setIsLoggedin(true);
          getUserData()
          navigate('/');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong!|| Invaild password");
      }
    }
  };
  



  return (
    

    // <div style={styles.page}>
    //   <div style={styles.card}>
    //     <h2 style={styles.heading}>{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>
    //     <p style={styles.subheading}>
    //       {state === 'Sign Up' ? 'Create your account' : 'Login to your account'}
    //     </p>

    //     <form onSubmit={onSubmitHandler} style={styles.form}>
    //       {state === 'Sign Up' && (
    //         <input onClickonChange={e => setName(e.target.value)} 
    //         value={name} 
    //       style={styles.input} type="text" placeholder="Full Name" required />)}
          

    //       <input  onChange={e => setEmail(e.target.value)} value={email}
    //       style={styles.input} type="email" placeholder="Email id" required />

    //       <input  onChange={e => setPassword(e.target.value)} value={password}
    //       style={styles.input} type="password" placeholder="Password" required />

    //       <a onClick={()=>navigate('/reset-password')} style={styles.forgot}>Forgot password?</a>

    //       <button type="submit" style={styles.button}>
    //         {state}
    //       </button>
    //     </form>

    //     <p style={styles.toggleText}>
    //       {state === 'Sign Up' ? "Already have an account?" : "Don't have an account?"}
    //       <span
    //         onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
    //         style={styles.link}
    //       >
    //         {state === 'Sign Up' ? ' Login here' : ' Sign up'}
    //       </span>
    //     </p>
    //   </div>
    // </div>


    <div style={styles.page}>
  <div style={styles.card}>
    <h2 style={styles.heading}>
      {state === 'Sign Up' ? 'Create Account' : 'Login'}
    </h2>
    <p style={styles.subheading}>
      {state === 'Sign Up' ? 'Create your account' : 'Login to your account'}
    </p>

    <form onSubmit={onSubmitHandler} style={styles.form}>
      {state === 'Sign Up' && (
        <input
          onChange={e => setName(e.target.value)}
          value={name}
          style={styles.input}
          type="text"
          placeholder="Full Name"
          required
        />
      )}

      <input
        onChange={e => setEmail(e.target.value)}
        value={email}
        style={styles.input}
        type="email"
        placeholder="Email id"
        required
      />

      <input
        onChange={e => setPassword(e.target.value)}
        value={password}
        style={styles.input}
        type="password"
        placeholder="Password"
        required
      />

      <p onClick={() => navigate('/reset-password')} style={styles.forgot}>
        Forgot password?
      </p>

      <button type="submit" style={styles.button}>
        {state}
      </button>
    </form>

    <p style={styles.toggleText}>
      {state === 'Sign Up' ? "Already have an account?" : "Don't have an account?"}
      <span
        onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
        style={styles.link}
      >
        {state === 'Sign Up' ? ' Login here' : ' Sign up'}
      </span>
    </p>
  </div>
</div>

  );
};

// 🎨 Inline style object
const styles = {
  page: {
    height: '100vh',
    background: 'linear-gradient(to bottom right, #c084fc, #818cf8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#1e293b',
    padding: '40px',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    textAlign: 'center',
  },
  heading: {
    color: '#fff',
    fontSize: '26px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  subheading: {
    color: '#cbd5e1',
    marginBottom: '30px',
    fontSize: '14px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    padding: '12px 16px',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#334155',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
  },
  forgot: {
    textAlign: 'right',
    fontSize: '13px',
    color: '#7dd3fc',
    textDecoration: 'none',
    marginTop: '5px',
    marginBottom: '15px',
    cursor: 'pointer',
  },
  button: {
    padding: '12px',
    background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  toggleText: {
    marginTop: '20px',
    color: '#cbd5e1',
    fontSize: '14px',
  },
  link: {
    color: '#7dd3fc',
    marginLeft: '6px',
    cursor: 'pointer',
    textDecoration: 'underline',
  },

}
