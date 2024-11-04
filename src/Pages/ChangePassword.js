import { useEffect, useState } from "react";
import Logo from '../assets/Images/logo-crop.png';
import ActionButton from "../Components/ActionButton";
import { BASE_URL } from "../env/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Navbar from "../Components/Navbar";

function ChangePassword(){

    const navigate = useNavigate();

    const[employeeID, setEmployeeID] = useState('');
    const[password, setPassword] = useState('');
    const[repassword, setRePassword] = useState('');

    const button_data = [{name:'Reset Password', icon:'bx bx-reset me-2', class:'', url:'action'}];

    function HandleChangeButtonClick(){

        if(employeeID.length <= 0){
            toast.error('Enter an Employee ID', {theme:'colored'})
        }
        else if(password.length <= 0){
            toast.error('Enter a Password', {theme:'colored'})
        }
        else if(repassword.length <= 0){
            toast.error('Please enter confirm password', {theme:'colored'})
        }
        else if(password.trim() !== repassword.trim()){
            toast.error('Please check entered password and confirm password', {theme:'colored'})
        }
        else{
            var data = {
                "empID": employeeID,
                "password": password,
                "jwt": localStorage.getItem('session')
            }

            axios.post(BASE_URL+'forgotpassword',data).then(response => {
                if(response.data.result === true)
                {
                    setEmployeeID('');
                    setPassword('');
                    setRePassword('');
                    toast.success('Password successfully changed', {theme:'colored'})
                }
            }).finally(res =>{
                navigate('/homepage');
            })

        }
    }

    return(
        <div className="col-12">
            <Navbar />
            <div className="d-flex registration-page">
                <div className="d-flex align-items-center col-7 registration-page-image-container flex-column">
                    <img src={Logo} width='300'/>
                    <span className='login-title mt-3'>Activity Tracker</span>
                </div>
                <div className="d-flex col-4 flex-column mt-5">
                    <span className='registration-text'>Change Password</span>
                    <div className='mt-4 d-flex flex-column'>
                        <label className='login-label'>Employee ID</label>
                        <input className='col-10 login-input' type='text' value={employeeID} onChange={(event) => {setEmployeeID(event.target.value)}}/>
                    </div>
                    <div className='mt-3 d-flex flex-column'>
                        <label className='login-label'>Password</label>
                        <input className='col-10 login-input' type='password' value={password} onChange={(event) => {setPassword(event.target.value)}}/>
                    </div>
                    <div className='mt-3 d-flex flex-column'>
                        <label className='login-label'>Confirm Password</label>
                        <input className='col-10 login-input' type='password' value={repassword} onChange={(event) => {setRePassword(event.target.value)}}/>
                    </div>
                    <div className='mt-5 d-flex col-10 align-items-center justify-content-end'>
                        {button_data.map((data,count)=>{
                            return(
                                <ActionButton data={data} onClick={HandleChangeButtonClick}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;