import { useEffect, useState } from 'react';
import '../Styles/Taskcard.css'
import TagComponent from './TagComponent';
import User from '../assets/Images/user.png';
import { useNavigate } from 'react-router-dom';

function TaskCard(props){

    const navigate = useNavigate();

    function handleCardClick(){
        navigate(`/edittask/${props.data.id}`)
    }

    return(
        <div className="taskcard-container" onClick={handleCardClick}>
            <div className='d-flex justify-content-between'>
                <div className='col-9'>
                    <span className='task-card-title'>{props.data.title}</span>
                </div>
                <div className='d-flex justify-content-end '>
                    {/* {props.data.imageUrl === null ?
                        <div className='img-alternative-card d-flex justify-content-center align-items-center' title={props.data.assignee}>
                            <span>{props.data.shortName}</span>
                        </div>
                        :
                        <img src={props.data.imageUrl} title={props.data.assignee} className='profile-image-card me-1'/>
                    } */}
                    <div className='img-alternative-card d-flex justify-content-center align-items-center' title={props.data.assignee}>
                        <span>{props.data.shortName}</span>
                    </div>
                </div>
            </div>

            <div className='d-flex justify-content-between mt-3'>
                <div className='col-10'>
                    <div className='d-flex'>
                        <TagComponent data = {{value:props.data.activity_Type, class:'tag-activity-type'}} />
                        <TagComponent data = {{value:props.data.current_Status, class:`tag-container tag-container-${String(props.data.current_Status).replace(/\s/g, '')}`}} />
                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                {
                    props.data.priority === 'Critical' ?
                    <span className='priority-task' style={{color:'red'}} title='Critical'><i class='bx bxs-chevrons-up'></i></span>
                    :null
                }
                {
                    props.data.priority === 'High' ?
                    <span className='priority-task' style={{color:'orange'}} title='High'><i class='bx bxs-chevron-up'></i></span>
                    :null
                }  
                {
                    props.data.priority === 'Medium' ?
                    <span className='priority-task' style={{color:'blue'}} title='Medium'><i class='bx bx-transfer-alt'></i></span>
                    :null
                } 
                {
                    props.data.priority === 'Low' ?
                    <span className='priority-task' style={{color:'rgb(71, 196, 71)'}} title='Low'><i class='bx bxs-chevron-down'></i></span>
                    :null
                }  
                </div>
            </div>

            <div className='mt-2 d-flex '>
                <div className='col-4 d-flex align-items-center'>
                    <span className='me-1'><i class='bx bx-calendar-week' style={{marginTop:'4px'}}></i></span>
                    <span className='taskcard-time'>{props.data.target_Date}</span>
                </div>
                <div className='col-4 d-flex align-items-center'>
                    <span className='me-1'><i class='bx bx-time' style={{marginTop:'5px'}}></i></span>
                    <span className='taskcard-time'>{props.data.target_Time}</span>
                </div>
                {
                    props.data.current_Status === 'In Progress' ?
                    <div className='col-4 d-flex align-items-center'>
                        <span className='me-1'><i class='bx bx-timer' style={{fontSize:'20px', marginTop:'4px'}}></i></span>
                        <span className='taskcard-time'>{props.data.days_Utilized}</span>
                    </div>
                    :
                    null
                }
                
            </div>
            
        </div>
    )
}

export default TaskCard;