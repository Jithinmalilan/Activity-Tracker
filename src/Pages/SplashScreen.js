import Logo from '../assets/Images/logo.png';
import Loader from '../assets/Gif/loader.gif';
import '../Styles/SplashScreen.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

function SplashScreen(){

    const navigate = useNavigate();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if(localStorage.getItem('session') == undefined)
            {
                navigate('/login');
                
            }
            else{
                navigate('/homepage');
            } 
        }, 2000)
    },[]);

    return(
        <div className='login-page'>
            <div className='d-flex justify-content-center logo-image'>
                <img src={Logo} width='300' height='300'/>
            </div>
            <div className='d-flex justify-content-center mt-2'>
                <img src={Loader} width='75' height='75'/>
            </div>
        </div>
    )
}

export default SplashScreen;