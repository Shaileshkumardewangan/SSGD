// import React, { useContext } from 'react'
// import { AppContent } from '../context/AppContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// export default function EmailVerify() {


//   axios.defaults.withCredentials = true
//   const {backendUrl, isLoggedin, userData, getUserData} = useContext(AppContent)

//   const navigate = useNavigate()

//   const inputRefs = React.useRef([])

//   const handleInput = (e, index)=>{
//     if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
//       inputRefs.current[index + 1].focus();
//     }
//   }
  
//   const handleKeyDown = (e, index) =>{
//     if(e.key === 'Backspace' && e.target.value === '' && index > 0){
//       inputRefs.current[index - 1].focus();
//     }
//   }

//   const handlePaste = (e)=>{
//     const paste = e.clipboardData.getData('text')
//     const pasetArray = paste.split('');
//     pasetArray.forEach((char, index)=>{
//       if(inputRefs.current[index]){
//         inputRefs.current[index].value = char;      
//       }
//     })
//   }

//   const onSubmitHandler = async (e)=>{
//     try{
//       e.preventDefault();
//       const otpArray = inputRefs.current.map(e => e.value)
//       const otp = otpArray.join('')

//       const {data} = await axios.post(backendUrl + '/api/auth/verify-account', {otp})
//       if(data.success){
//         toast.success(data.message)
//         getUserData()
//         navigate('/')
//       }else{
//         toast.error(data.message)
//       }
//     } catch (error){
//       toast.error(error.message)
//     }
//   }

//   return (
//     <div>
//         <form onSubmit={{onSubmitHandler}}>
//           <h1>Email Verify OTP</h1>
//           <p>Enter the 6-digit code sent to your email id.</p>
//           <div onPaste={handlePaste}>
//             {Array(6).fill(0).map((_, index)=>(
//               <input type='text' maxLength='1' key={index} required
//               ref={e => inputRefs.current[index] = e}
//               onInput={(e) => handleInput(e, index)}
//               onKeyDown={(e)=> handleKeyDown(e.index)} />
//             ))}
//           </div>
//           <button>Verify email</button>
//         </form>
//     </div>
//   )
// }









import React, { useContext } from 'react';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function EmailVerify() {
  axios.defaults.withCredentials = true;
  const { backendUrl, getUserData } = useContext(AppContent);

  const navigate = useNavigate();
  const inputRefs = React.useRef([]);

  // Autofocus next input on character input
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Go to previous input on backspace
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle OTP paste
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.slice(0, 6).split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  // Submit OTP
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const otpArray = inputRefs.current.map((input) => input.value);
      const otp = otpArray.join('');

      const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, { otp });
      if (data.success) {
        toast.success(data.message);
        await getUserData(); // update context with user data
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    // <div>
    //   <form onSubmit={onSubmitHandler}>
    //     <h1>Email Verify OTP</h1>
    //     <p>Enter the 6-digit code sent to your email.</p>
    //     <div onPaste={handlePaste} style={{ display: 'flex', gap: '0.5rem' }}>
    //       {Array(6)
    //         .fill(0)
    //         .map((_, index) => (
    //           <input
    //             key={index}
    //             type="text"
    //             maxLength="1"
    //             required
    //             ref={(el) => (inputRefs.current[index] = el)}
    //             onInput={(e) => handleInput(e, index)}
    //             onKeyDown={(e) => handleKeyDown(e, index)}
    //             style={{
    //               width: '2rem',
    //               height: '2rem',
    //               textAlign: 'center',
    //               fontSize: '1.25rem',
    //             }}
    //           />
    //         ))}
    //     </div>
    //     <button type="submit" style={{ marginTop: '1rem' }}>Verify Email</button>
    //   </form>
    // </div>

    
    <div className="otp-container">
      <form onSubmit={onSubmitHandler}>
        <h1>Email Verify OTP</h1>
        <p>Enter the 6-digit code sent to your email.</p>
        <div onPaste={handlePaste} className="otp-inputs">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                required
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                style={{
                  width: '2rem',
                  height: '2rem',
                  textAlign: 'center',
                  fontSize: '1.25rem',
                }}
              />
            ))}
        </div>
        <button type="submit" className="verify-btn">Verify Email</button>
      </form>
    </div>
  );
}


