import { useEffect, useState } from "react";
import Logo from '../assets/Images/logo-crop.png';
import ActionButton from "../Components/ActionButton";
import { BASE_URL } from "../env/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";

function LoginRegister(){

    const navigate = useNavigate();

    const[employeeID, setEmployeeID] = useState('');
    const[password, setPassword] = useState('');
    const[repassword, setRePassword] = useState('');
    const[loginRoleValue, setLoginRoleValue] = useState('');

    const[loginRole, setLoginRole] = useState([]);

    const button_data = [{name:'Register', icon:'bx bxs-lock-alt me-2', class:'', url:'action'}];

    function fetchLoginRole(){
        axios.get(BASE_URL+'loginrole').then((response) =>{
            setLoginRole(response.data)
        }).catch((error) =>{
            console.log(error)
        })
    }

    useEffect(() => {
        fetchLoginRole();
    },[]);

    function HandleRegisterClick(){
        if(employeeID.length <= 0){
            toast.error("Enter an Employee ID", {theme: "colored"});
        }
        else if(password.length <= 0){
            toast.error("Enter a Password", {theme: "colored"});
        }
        else if(repassword.length <= 0){
            toast.error("Please enter confirm password", {theme: "colored"});
        }
        else if(password.trim() !== repassword.trim()){
            toast.error("Please check entered password and confirm password", {theme: "colored"});
        }
        else if(loginRoleValue === 0)
        {
            toast.error("Select a role for account", {theme: "colored"});
        }
        else
        {
            var data = {
                "empID": employeeID.trim(),
                "password": password.trim(),
                "role": loginRoleValue.trim()
            }

            axios.post(BASE_URL+'login/register',data).then(response => {
                if(response.data.result === true)
                {
                    setEmployeeID('');
                    setPassword('');
                    setRePassword('');
                    var dropdown = document.getElementById('login-role')
                    dropdown.selectedIndex = 0;
                    toast.success("Successfully created user", {theme: "colored"});
                }
            })
            .catch(error => {
                console.error('Error:', error.message);
                toast.error("Error Occured", {theme: "colored"});
            });
        }
    }

    function HandleHomeButtonClick(){
        navigate('/homepage');
    }

    return(
        <div className="col-12">
            <Navbar />
            <div className="d-flex registration-page">
                <div className="d-flex align-items-center col-7 registration-page-image-container flex-column">
                    <img src={Logo} width='300'/>
                    <span className='login-title mt-3'>Activity Tracker</span>
                </div>
                <div className="d-flex col-4 flex-column">
                    <span className='registration-text'>Registration</span>
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
                    <div className='mt-3 d-flex flex-column'>
                        <label className='login-label'>Login Role</label>
                        <select name='login-role' id='login-role' className='col-10 registration-dropdown' defaultValue={loginRoleValue} onChange={(event)=>{setLoginRoleValue(event.target.value)}}>
                        <option value='0'>Select a role</option>
                        {
                            loginRole.map((role, count) =>{
                                return(
                                    <option value={role.id}>{role.role}</option>
                                )
                            })
                        }
                        </select>
                    </div>
                    <div className='mt-5 d-flex col-10 align-items-center justify-content-end'>
                        {button_data.map((data,count)=>{
                            return(
                                <ActionButton data={data} onClick={HandleRegisterClick}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginRegister;