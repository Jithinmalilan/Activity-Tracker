import { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import TaskCard from '../Components/TaskCard';
import ActionButton from '../Components/ActionButton';
import '../Styles/HomePage.css';
import '../Styles/Taskcard.css'
import { BASE_URL } from '../env/constants';
import Cookies from 'js-cookie';
import axios from 'axios';
import Break from '../assets/Images/break.png'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function HomePage(){

    const [myTasks, setMyTasks] = useState([]);
    const [reporteeTasks, setReporteeTasks] = useState([]);
    const [authorization, setAuthorization] = useState(0);

    const navigate = useNavigate();

    const[displayPopup, setDisplayPopup] = useState(false)

    const[onBreak, setOnBreak] = useState(false)

    const[breakValue, setBreakValue] = useState("");

    const[category, setCategory] = useState("")

    const[isDayBegin, setIsDayBegin] = useState(false)

    const new_task = {name:'New Task', icon:'bx bx-plus-circle me-2', class:'me-3', url:'/newtask'};

    const break_button = {name:'Add Break', icon:'bx bxs-coffee me-2', class:'me-3', url:'action'};

    const active_button = {name:'Set Active', icon:'bx bx-devices me-2', class:'me-3', url:'action'};

    //const day_begin_button = {name:'Day Begin', icon:'bx bx-desktop me-2', class:'me-3', url:'action'};

    //const day_end_button = {name:'Day End', icon:'bx bx-run me-2', class:'me-3', url:'action'};



    function fetchAuthorization(){
        if(localStorage.getItem('session') == null || localStorage.getItem('session') == undefined)
        {
            navigate('/login');
        }
        else
        {
            axios.post(BASE_URL+'authorize',{"jwt":localStorage.getItem('session')}).then(response=>{
                if(response.data.result > 0)
                {
                    setAuthorization(parseInt(response.data.result))
                }

                fetchUserTasks();
                fetchReporteeTasks();
                fetchBreakStatus();
            })
            .catch(error =>{
                console.error('Error:', error.message);
            })  
        }
    }

    function fetchUserTasks(){
        
        axios.post(BASE_URL+'homepagedata', {"jwt":localStorage.getItem('session')}).then(response=> {
            setMyTasks(response.data);
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
    }

    function SubmitBreakData(){
        var data = {
            "event": breakValue,
            "category": category,
            "jwt": localStorage.getItem('session')
        }
        axios.post(BASE_URL+'setbreakbegin', data).then(response=> {
            console.log(response)
        })
        .catch(error => {
            console.error('Error:', error.message);
            toast.error("Error occured while adding break", {theme: 'colored'});
        });
        setDisplayPopup(false)
    }

    function fetchReporteeTasks(){
        axios.post(BASE_URL+'reporteedata', {"jwt":localStorage.getItem('session')}).then(response=> {
            setReporteeTasks(response.data);
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
    }

    function fetchBreakStatus(){
        axios.post(BASE_URL+'checkbreakstatus', {"jwt":localStorage.getItem('session')}).then(response=> {
            setOnBreak(response.data.result)
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
    }

    function ActiveButtonClick(){
        axios.post(BASE_URL+'setbreakend', {"jwt":localStorage.getItem('session')}).then(response=> {
            if(response.status == 200)
            {
                setOnBreak(false);
            }
            
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
    }

    useEffect(() => {
        fetchAuthorization();
    },[]);

    return(
        <div className='background-layer'>
            <Navbar />
            <div className="taskbar-container container d-flex justify-content-end me-3 mt-4">
                <ActionButton data={new_task} />
                {
                    onBreak === false ? <ActionButton data={break_button} onClick={()=>setDisplayPopup(true)}/> : <ActionButton data={active_button} onClick={ActiveButtonClick}/>
                }
                {/* {
                    isDayBegin === false ? <ActionButton data={day_end_button} onClick={()=>setIsDayBegin(true)}/> : <ActionButton data={day_begin_button} onClick={()=>setIsDayBegin(false)}/>
                } */}
            </div>
            {
                displayPopup === true ?
                <div className='popup-container p-0'>
                    <div className='col-12 d-flex justify-content-end align-items-center pe-3 mt-3' style={{height:"3rem"}}>
                        <span><i class='bx bx-x' style={{fontSize:"26px", cursor:"pointer"}} onClick={()=>setDisplayPopup(false)}></i></span>
                    </div>
                    <div className='mx-5 mt-3 d-flex flex-column'>
                        <span style={{fontWeight:"bold",color:"#0094da"}}>Break Information</span>
                        <textarea className='mt-3' type='text' style={{height:"5rem", outline:"none"}} onChange={(event) => setBreakValue(event.target.value)} placeholder='Enter Break event info'/>
                        <div className='mt-3 d-flex flex-column col-12'>
                            <label className='login-label'>Break Category</label>
                            <select name='break-category' id='break-category' className='col-12 registration-dropdown' defaultValue={category} onChange={(event)=>{setCategory(event.target.value)}}>
                                <option value='' selected>Select a break category</option>
                                <option value='Micro Break'>Micro Break</option>
                                <option value='Rest Break'>Rest Break</option>
                                <option value='Social Break'>Social Break</option>
                                <option value='Meal Break'>Meal Break</option>
                                <option value='Exercise Break'>Exercise Break</option>
                            </select>
                        </div>
                        <div className='d-flex justify-content-center mt-4'>
                            <ActionButton data={{name:'Add Break', icon:'bx bxs-coffee me-2', class:'me-3', url:'action'}} onClick={SubmitBreakData}/>
                        </div>
                    </div>
                </div>
                :
                null
            }
            <div className='home-page-task-text'>
                <span>My Tasks</span>
            </div>
            <div className='d-flex col-12'>
                <div className='d-flex col-8'>
                    <div className='task-card-grid col-12'>
                    {
                        myTasks.map((task, pos) =>{
                            return(
                                <TaskCard data={task}/>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
            
            {
                authorization === 1 || authorization === 2 ?
                <div>
                    <div className='home-page-task-text'>
                        <span>Reportee Task</span>
                    </div>
                    <div className='d-flex col-12'>
                        <div className='d-flex col-8'>
                            <div className='task-card-grid mb-4 col-12'>
                            {
                                reporteeTasks.map((task, pos) =>{
                                    return(
                                        <TaskCard data={task}/>
                                    )
                                })
                            }
                            </div>
                        </div>
                    </div>
                </div>
                :
                null
            }
            

            
        </div>
    )
}

export default HomePage;