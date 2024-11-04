import { useNavigate } from 'react-router-dom';
import Unauthorized from '../assets/Images/unauthorized.png';

function UnauthorizedPage(){

    const navigate = useNavigate();

    return(
        <div className="login-page">
            <div className="d-flex justify-content-center">
                <img src={Unauthorized} width='500'/>
            </div>
            <div className='d-flex justify-content-center mt-1'>
                <span className='unauth-title'>401: Unauthorized</span>
            </div>
            <div className='d-flex justify-content-center mt-5'>
                <span>You are not authorized to view this content.</span>
            </div>
            <div className='d-flex justify-content-center mt-3'>
                <span className='quick-link' onClick={()=>navigate('/homepage')}>Return Home</span>
            </div>
        </div>
    )
}

export default UnauthorizedPage;