import '../Styles/NewTask.css';
import Navbar from '../Components/Navbar';
import ActionButton from '../Components/ActionButton';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../env/constants';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function NewTask(){

    const navigate = useNavigate();

    const button_data = [{name:'Add Task', icon:'bx bx-plus-circle me-2', class:'', url:'action'}];

    const [employees, setEmployees] = useState([]);
    const [taskType, setTaskType] = useState([]);
    const [activityType, setActivityType] = useState([]);
    const [taskFrequency, setTaskFrequency] = useState([]);
    const [priority, setPriority] = useState([]);

    const taskTypeRef = useRef();
    const taskNameRef = useRef();
    const stakeholderRef = useRef();
    const objectiveRef = useRef();
    const activityTypeRef = useRef();
    const taskFrequencyRef = useRef();
    const assigneeRef = useRef();
    const reporterRef = useRef();
    const targetDateRef = useRef();

    const [taskTypeValue, setTaskTypeValue] = useState('')
    const [taskName, setTaskName] = useState('')
    const [stakeholder, setStakeHolder] = useState('')
    const [objective, setObjective] = useState('')
    const [activityTypeValue, setActivityTypeValue] = useState('')
    const [taskFrequencyValue, setTaskFrequencyValue] = useState('')
    const [priorityValue, setPriorityValue] = useState('');
    const [assigneeValue, setAssigneeValue] = useState('')
    const [reporterValue, setReporterValue] = useState('')
    const [createdDate, setCreatedDate] = useState('')
    const [lastModifiedDate, setLastModifiedDate] = useState('')
    const [targetDate, setTargetDate] = useState('')
    const [status, setStatus] = useState('Todo')
    const[taskJobType, setTaskJobType] = useState([])
    const[taskJobTypeValue, setTaskJobTypeValue] = useState('')

    function fetchTaskType(){
        axios.get(BASE_URL+'tasktype').then((response) =>{
            setTaskType(response.data)
            setTaskTypeValue(response.data[0].id);
        }).catch((error) =>{
            console.log(error)
        })
    }

    function fetchActivityType(){
        axios.get(BASE_URL+'activitytype').then((response) =>{
            setActivityType(response.data)
            setActivityTypeValue(response.data[0].id);
        }).catch((error) =>{
            console.log(error)
        })
    }

    function fetchTaskFrequency(){
        axios.get(BASE_URL+'taskfrequency').then((response) =>{
            setTaskFrequency(response.data)
            setTaskFrequencyValue(response.data[0].id);
        }).catch((error) =>{
            console.log(error)
        })
    }

    function fetchTaskJobType(){
        axios.get(BASE_URL+'taskjobtype').then((response) =>{
            setTaskJobType(response.data)
            setTaskJobTypeValue(response.data[0].id);
        }).catch((error) =>{
            console.log(error)
        })
    }

    function fetchEmployees(){
        var data = {
            "jwt": localStorage.getItem('session'),
            "processName": "Create"
        }

        axios.post(BASE_URL+'employees', data).then((response) =>{
            setEmployees(response.data)
            setAssigneeValue(response.data[0].id);
            setReporterValue(response.data[0].id);
        }).catch((error) =>{
            console.log(error)
        })
    }

    function fetchPriority(){
        axios.get(BASE_URL+'priority').then((response) =>{
            setPriority(response.data)
            setPriorityValue(response.data[0].id)
        }).catch((error) =>{
            console.log(error)
        })
    }

    const date = new Date();
    date.setDate(date.getDate());
    const defaultDate = date.toLocaleDateString('en-CA');

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

    function addTaskClicked(){
        const data = {
            "task_Type": taskTypeValue,
            "task_Name": taskName,
            "stakeholder": stakeholder,
            "define_Objective": objective,
            "activity_Type": activityTypeValue,
            "task_Job_Type": taskJobTypeValue,
            "task_Frequency": taskFrequencyValue,
            "priority": priorityValue,
            "task_Assigned_to": assigneeValue,
            "task_Reporter": reporterValue,
            "created_Date": formattedDate,
            "last_Modified_Date": formattedDate,
            "target_Dt": formattedDate,
            "current_Status": status
        }

        axios.post(BASE_URL+'task/add',data).then(response => {
            toast.success("Successfully created task", {theme: 'colored'});
        }).finally(
            navigate('/homepage')
        )
        .catch(error => {
            toast.error("Error while creating task", {theme: 'colored'});
        });
    }


    useEffect(() => {
        fetchTaskType();
        fetchActivityType();
        fetchTaskFrequency();
        fetchEmployees();
        fetchPriority();
        fetchTaskJobType();
    },[]);

    return(
        <div className='background-layer'>
            <Navbar />
            <div className='container mt-4'>
                <span className='mt-5 task-title'>Add New Task</span>
                <div className='col-12 d-flex mt-2'>
                    <div className='col-8 pe-5' style={{borderRight:'1px solid #d3d3d3'}}>
                        <div className='d-flex flex-column col-3 mt-3'>
                            <label className='label-custom'>Type of task</label>
                            <select name='task-type' id='task-type' className='dropdown-container' onChange={(event)=>{setTaskTypeValue(event.target.value)}} ref={taskTypeRef}>
                            {
                                taskType.map((type, count) =>{
                                    return(
                                        <option value={type.id}>{type.name}</option>
                                    )
                                })
                            }
                            </select>
                        </div>
                        <div className='d-flex justify-content-between mt-4'>
                            <div className='d-flex flex-column col-7 '>
                                <label className='label-custom'>Task Name</label>
                                <input type='text' className='input-text-field' placeholder='Task Name' onChange={(event)=>{setTaskName(event.target.value)}} ref={taskNameRef}/>
                            </div>
                            <div className='d-flex flex-column col-4'>
                                <label className='label-custom'>Stakeholder</label>
                                <input type='text' className='input-text-field' placeholder='Stakeholder' onChange={(event)=>{setStakeHolder(event.target.value)}} ref={stakeholderRef}/>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between mt-4'>
                            <div className='d-flex flex-column col-12'>
                                <label className='label-custom'>Objective</label>
                                <textarea type='text' className='input-text-field-remark mt-2' placeholder='Objective' onChange={(event)=>{setObjective(event.target.value)}} ref={objectiveRef}/>
                            </div>
                        </div>
                        <div className='mt-5 d-flex justify-content-end'>
                            {
                                button_data.map((data, count) =>{
                                    return(
                                        <ActionButton data={data} onClick={addTaskClicked}/>
                                    )
                                })
                            }
                            
                        </div>
                    </div>
                    <div className='col-4'>
                        <span className='task-side-head ms-4'>Task Details</span>
                        <div className='d-flex col-11 ms-5 mt-2'>
                            <div className='col-4'>
                                <label className='label-custom'>Activity Type:</label>
                            </div>
                            <div className='col-6'>
                                <select name='activity-type' id='activity-type' className='dropdown-small ms-2' onChange={(event)=>{setActivityTypeValue(event.target.value)}} ref={activityTypeRef}>
                                {
                                    activityType.map((activity, count) =>{
                                        return(
                                            <option value={activity.id}>{activity.activity}</option>
                                        )
                                    })
                                }
                                </select>
                            </div>
                        </div>
                        <div className='d-flex col-11 ms-5'>
                            <div className='col-4'>
                                <label className='label-custom'>Task Job type:</label>
                            </div>
                            <div className='col-6'>
                                <select name='taskjobtype' id='taskjobtype-dropdown' className='dropdown-small ms-2' onChange={(event)=>setTaskJobTypeValue(event.target.value)}>
                                {
                                    taskJobType.map((type, count) =>{
                                        return(
                                            <option value={type.id}>{type.taskJob}</option>
                                        )
                                    })
                                }
                                </select>
                            </div>
                        </div>
                        <div className='d-flex col-11 ms-5'>
                            <div className='col-4'>
                                <label className='label-custom'>Task Frequency:</label>
                            </div>
                            <div className='col-6'>
                                <select name='task-type' id='task-type' className='dropdown-small ms-2' onChange={(event)=>{setTaskFrequencyValue(event.target.value)}} ref={taskFrequencyRef}>
                                {
                                    taskFrequency.map((frequency, count) =>{
                                        return(
                                            <option value={frequency.id}>{frequency.frequency}</option>
                                        )
                                    })
                                }
                                </select>
                            </div>
                        </div>
                        <div className='d-flex col-11 ms-5'>
                            <div className='col-4'>
                                <label className='label-custom'>Status:</label>
                            </div>
                            <div className='col-6'>
                                <select name='task-status' id='task-status' className='dropdown-small ms-2' onChange={(event)=>{setStatus(event.target.value)}} ref={taskFrequencyRef}>
                                    <option value='Todo' selected>Todo</option>
                                    <option value='In Progress'>In Progress</option>
                                    <option value='On Hold'>On Hold</option>
                                    <option value='QC Verification'>QC Verification</option>
                                    <option value='Completed'>Completed</option>
                                </select>
                            </div>
                        </div>
                        <div className='d-flex col-11 ms-5 mb-3'>
                            <div className='col-4'>
                                <label className='label-custom'>Priority:</label>
                            </div>
                            <div className='col-6'>
                                <select name='task-type' id='task-type' className='dropdown-small ms-2' onChange={(event)=>{setPriorityValue(event.target.value)}} ref={taskFrequencyRef}>
                                {
                                    priority.map((priority, count) =>{
                                        return(
                                            <option value={priority.id}>{priority.priority}</option>
                                        )
                                    })
                                }
                                </select>
                            </div>
                        </div>
                        <span className='task-side-head ms-4 mt-5'>People</span>
                        <div className='d-flex col-11 ms-5 mt-2'>
                            <div className='col-4'>
                                <label className='label-custom'>Assignee:</label>
                            </div>
                            <div className='col-6'>
                                <select name='task-type' id='task-type' className='dropdown-small ms-2' onChange={(event)=>{setAssigneeValue(event.target.value)}} ref={assigneeRef}>
                                {
                                    employees.map((employee, count) =>{
                                        return(
                                            <option value={employee.id}>{employee.name}</option>
                                        )
                                    })
                                }
                                </select>
                            </div>
                        </div>
                        <div className='d-flex col-11 ms-5 mb-3'>
                            <div className='col-4'>
                                <label className='label-custom'>Reporter:</label>
                            </div>
                            <div className='col-6'>
                                <select name='task-type' id='task-type' className='dropdown-small ms-2' onChange={(event)=>{setReporterValue(event.target.value)}} ref={reporterRef}>
                                {
                                    employees.map((employee, count) =>{
                                        return(
                                            <option value={employee.id}>{employee.name}</option>
                                        )
                                    })
                                }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default NewTask;