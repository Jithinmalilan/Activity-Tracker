import { useState, useEffect } from 'react';
import Logo from '../assets/Images/logo-crop.png';
import ActionButton from '../Components/ActionButton';
import '../Styles/LoginPage.css';
import { BASE_URL } from '../env/constants';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function LoginPage(){

    const button_data = [{name:'Login', icon:'bx bxs-lock-alt me-2', class:'col-6', url:'action'}];

    const[employeeID, setEmployeeID] = useState('');
    const[password, setPassword] = useState('');

    const navigate = useNavigate();

    function HandleForgotClick(){
        navigate('/forgotpassword');
    }

    function HandleLoginClick(){
        if(employeeID.trim().length <= 0)
        {
            toast.error("Enter an Employee ID",{theme:'colored'});
        }
        else if(password.trim().length <= 0)
        {
            toast.error("Enter password to login",{theme:'colored'});
        }
        else
        {
            var data = {
                "empID": employeeID.trim(),
                "password": password.trim()
            }
            axios.post(BASE_URL+'login',data).then(response => {
                if(response.data.result === "Employee is currently blocked. Contact your supervisor")
                {
                    toast.error(response.data.result,{theme:'colored'})
                }
                else if(response.data.result === "Employee ID not exists")
                {
                    toast.error(response.data.result,{theme:'colored'})
                }
                else if(response.data.result === "Invalid Credentials")
                {
                    toast.error(response.data.result,{theme:'colored'})
                }
                else if(response.data.result === "Authentication Error. Check entered password")
                {
                    toast.error(response.data.result,{theme:'colored'})
                }
                else
                {
                    //Cookies.set('session', response.data.result, { secure: true, expires: 7 }); 
                    localStorage.setItem('session', response.data.result)   
                    toast.success("Successfully Logged In",{theme:'colored'})      
                    navigate('/homepage');
                }
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
        }
    }

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.keyCode === 13 || event.key === 'Enter' || event.code === 'Enter') {
                //HandleLoginClick()
            }
        };
        document.addEventListener('keydown', handleKeyPress);
    
        return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };
      }, []);

    return(
        <div className="d-flex col-12 login-page">
            <div className="d-flex align-items-center col-7 login-page-image-container flex-column">
                <img src={Logo} width='300'/>
                <span className='login-title mt-3'>Activity Tracker</span>
            </div>
            <div className="d-flex col-4 flex-column">
                <span className='login-text'>Login</span>
                <div className='mt-4 d-flex flex-column'>
                    <label className='login-label'>Employee ID</label>
                    <input className='col-10 login-input' type='text' onChange={(event) => {setEmployeeID(event.target.value)}}/>
                </div>
                <div className='mt-3 d-flex flex-column'>
                    <label className='login-label'>Password</label>
                    <input className='col-10 login-input' type='password' onChange={(event) => {setPassword(event.target.value)}}/>
                </div>
                <div className='mt-4 d-flex col-10 align-items-center justify-content-between'>
                    <span className='login-forgot' onClick={HandleForgotClick}>Forgot Password</span>
                    {button_data.map((data,count)=>{
                        return(
                            <ActionButton data={data} onClick={HandleLoginClick}/>
                        )
                    })}
                </div>
            </div>
            
        </div>
    );
}

export default LoginPage;