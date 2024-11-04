import { useState, useEffect } from 'react';
import '../Styles/HomePage.css'
import Logo from '../assets/Images/logo.png';
import User from '../assets/Images/user.png'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { BASE_URL } from '../env/constants';
import axios from 'axios';

function Navbar(){
    
    const [screenDimensions, setDimension] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const detectSize = () =>{
        setDimension({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }

    const [authorization, setAuthorization] = useState(0);
    const [userName, setUserName] = useState("");

    function fetchAuthorization(){
        axios.post(BASE_URL+'authorize',{"jwt":localStorage.getItem('session')}).then(response=>{
            if(response.data.result > 0)
            {
                setAuthorization(parseInt(response.data.result))
            }
        })
        .catch(error =>{
            console.error('Error:', error.message);
        })  
    }

    function fetchUserName(){
        axios.post(BASE_URL+'fetchusername',{"jwt":localStorage.getItem('session')}).then(response=>{
            if(response.data.result != "")
            {
                setUserName("Welcome " + response.data.result)
            }
        })
        .catch(error =>{
            console.error('Error:', error.message);
        })  
    }

    
    useEffect(() => {
        window.addEventListener('resize', detectSize)
        return() =>{
            window.removeEventListener('resize', detectSize)
        }
    }, [screenDimensions]);

    useEffect(() => {
        fetchAuthorization();
        fetchUserName();
    }, []);

    const [openNavbarMenu, setNavbarMenu] = useState(false);

    function ProfileIconClick(){
        setNavbarMenu(!openNavbarMenu)
    }
    
    const navigate = useNavigate();

    function NavigateHome(){
        navigate('/');
    }

    function HandleCreateUser(){
        navigate('/register');
    }

    function HandleCreateLogin(){
        navigate('/loginregister');
    }

    function HandleLogout(){
        axios.post(BASE_URL+'logout',{"jwt":localStorage.getItem('session')}).then(response=>{
            if(response.data.result == true){
                localStorage.removeItem('session');
            }
        })
        .finally(res=>{
            navigate('/login');
        })
        .catch(err=>{
            console.log("Error :", err);
        })
    }

    function HandleChangePassword(){
        navigate('/changepassword');
    }

    function HandleHomeButtonClick(){
        navigate('/homepage');
    }

    return(
        <div className='navbar-container'>
            <div className='d-flex align-items-center'>
                {
                    screenDimensions.width > 1024 ? 
                    <div className='col-6'>
                        <img src={Logo} className='navbar-logo ms-4' onClick={NavigateHome} style={{cursor:'pointer'}}/>
                        <span className='navbar-title' onClick={NavigateHome} style={{cursor:'pointer'}}>Activity Tracker</span>
                    </div>
                    :
                    <div className='col-6' onClick={NavigateHome} style={{cursor:'pointer'}}>
                        <img src={Logo} className='navbar-logo ms-4'/>
                    </div>
                }
                <div className='col-6 d-flex justify-content-end align-items-center'>
                    <span className='me-4 navbar-name'>{userName}</span>
                    <img src={User} className='navbar-profile me-4' style={{'cursor':'pointer'}} onClick={ProfileIconClick}/>
                </div>
            </div>
            {
                openNavbarMenu === true ?
                <div className='d-flex justify-content-end nav-menu me-4 ms-4'>
                    {
                        window.location.href.includes("homepage") == false ?
                        <span className='me-4 nav-links' onClick={HandleHomeButtonClick}>Home</span>
                        :null
                    }
                    {
                        authorization === 1 ?
                        <span className='me-4 nav-links' onClick={HandleCreateUser}>Create User</span>
                        : null
                    }
                    
                    {
                        authorization === 1 ?
                        <span className='me-4 nav-links' onClick={HandleCreateLogin}>Create Login</span>
                        : null
                    }
                    {
                        authorization === 1 || authorization === 2 ?
                        <span className='me-4 nav-links' onClick={()=>{navigate('/approval')}}>Approvals</span>
                        : null
                    }
                    <span className='me-4 nav-links' onClick={()=>navigate('/dailytask')}>Daily Task update</span>
                    <span className='me-4 nav-links' onClick={HandleChangePassword}>Change Password</span>
                    <span className='me-3 nav-links' onClick={HandleLogout}>Logout</span>
                </div>
                :null
            }
             
        </div>
    )
}

export default Navbar;