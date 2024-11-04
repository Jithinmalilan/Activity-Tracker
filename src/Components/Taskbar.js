import { useState } from 'react';
import '../Styles/HomePage.css'
import ActionButton from './ActionButton';

function Taskbar(props){

    const[onBreak, setOnBreak] = useState(false)

    const[isDayBegin, setIsDayBegin] = useState(false)

    const new_task = {name:'New Task', icon:'bx bx-plus-circle me-2', class:'me-3', url:'/newtask'};

    const break_button = {name:'Add Break', icon:'bx bxs-coffee me-2', class:'me-3', url:'action'};

    const active_button = {name:'Set Active', icon:'bx bx-devices me-2', class:'me-3', url:'action'};

    const day_begin_button = {name:'Day Begin', icon:'bx bx-desktop me-2', class:'me-3', url:'action'};

    const day_end_button = {name:'Day End', icon:'bx bx-run me-2', class:'me-3', url:'action'};

    const HandleBreakButtonClick = () => {
        props.BreakButtonClicked(true);
    }


    return(
        <div className="taskbar-container container d-flex justify-content-end me-3 mt-4">
            <ActionButton data={new_task} />
            {
                onBreak === false ? <ActionButton data={break_button} onClick={()=>HandleBreakButtonClick()}/> : <ActionButton data={active_button} onClick={()=>setOnBreak(false)}/>
            }
            {
                isDayBegin === false ? <ActionButton data={day_end_button} onClick={()=>setIsDayBegin(true)}/> : <ActionButton data={day_begin_button} onClick={()=>setIsDayBegin(false)}/>
            }
        </div>
    )
}

export default Taskbar;

