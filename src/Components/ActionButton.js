import { useNavigate } from 'react-router-dom';
import '../Styles/HomePage.css';

function ActionButton(props){

    var className = `action-button-container d-flex align-items-center justify-content-center ${props.data.class}`

    const navigate = useNavigate();

    function NavigateButtonClick(){
        if(props.data.url === 'clear'){

        }
        else if(props.data.url == 'action'){
            props.onClick();
        }
        else{
            navigate(props.data.url)
        }
    }

    return (
        <div className={className} onClick={NavigateButtonClick}>
            <span className='action-button-icon'><i class={props.data.icon}></i></span>
            <span style={{userSelect:"none"}}>{props.data.name}</span>
        </div>
    )
}

export default ActionButton;