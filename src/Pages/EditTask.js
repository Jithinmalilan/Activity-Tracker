import '../Styles/NewTask.css';
import Navbar from '../Components/Navbar';
import ActionButton from '../Components/ActionButton';
import { BASE_URL } from '../env/constants';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../Styles/PriorityDropdown.css';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import CommentComponent from '../Components/CommentComponent';
import QCTimelineCard from '../Components/QCTimelineCard';
import Logo from '../assets/Images/logo.png';
import Loader from '../assets/Gif/loader.gif';

function EditTask(){

    const {taskID} = useParams();

    const taskNameRef = useRef(null);
    const stakeholderRef = useRef(null);
    const objectiveRef = useRef(null);

    const navigate = useNavigate();

    const[isLoading, setIsLoading] = useState(true)

    //Dropdown Values
    const[taskData, setTaskData] = useState({})


    //Editable
    const[taskEditable, setTaskEditable] = useState(false)
    const[stakeholderEditable, setStakeholderEditable] = useState(false)
    const[objectiveEditable, setObjectiveEditable] = useState(false)
    
    //Values
    const[taskNameValue, setTaskNameValue] = useState("");
    const[taskTypeValue, setTaskTypeValue ] = useState("");
    const[stakeholderValue, setStakeholderValue] = useState("");
    const[objectiveValue, setObjectiveValue] = useState("");
    const[activityTypeValue, setActivityTypeValue] = useState("");
    const[taskFrequencyValue, setTaskFrequencyValue] = useState("");
    const[priorityValue, setPriorityValue] = useState("");
    const[taskJobTypeValue, setTaskJobTypeValue] = useState("");
    const[currentStatusValue, setCurrentStatusValue] = useState("");
    const[assigneeValue, setAssigneeValue] = useState("");
    const[createdByValue, setCreatedByValue] = useState("");
    const[documentationRequiredValue, setDocumentationRequiredValue] = useState("");
    const[documentationStatusValue, setDocumentationStatusValue] = useState("");

    const[createdDateValue, setCreatedDateValue] = useState("");
    const[inProgressDateValue, setInProgressDateValue] = useState("")
    const[completedDateValue, setCompletedDateValue] = useState("")
    const[targetDateValue, setTargetDateValue] = useState("")


    const[commentFieldValue, setCommentFieldValue] = useState("");
    const[comments, setComments] = useState([]);
    const[subComments, setSubComments] = useState([]);

    const[qcTaskLog, setQCTaskLog] = useState([]);
    
    //DropDowns
    const[taskType, setTaskType] = useState([])
    const[activityType, setActivityType] = useState([])
    const[taskFrequency, setTaskFrequency] = useState([])
    const[priority, setPriority] = useState([])
    const[documentationStatus, setDocumentationStatus] = useState([])
    
    const[taskJobType, setTaskJobType] = useState([])
    const[assignee, setAssignee] = useState([])


    //Button
    const button_data = [{name:'Update Task', icon:'bx bxs-edit me-2', class:'', url:'action'}];

    function FetchTaskInformation(){
        var data = {
            "id": taskID,
            "jwt": localStorage.getItem('session')
        }

        axios.post(BASE_URL+'task', data).then((response) => {
            if(response.data == "Data issues"){
                toast.error('You are not authorized to view the content', {theme:'colored'});
                if(localStorage.getItem('session') == undefined){
                    navigate('/login')
                }
                else{
                    navigate('/unauthorized')
                }
            }
            else{
                setTaskData(response.data[0])
                response.data.map((task, count) =>{
                    setTaskNameValue(response.data[0].task_Name);
                    setTaskTypeValue(String(response.data[0].task_Type));
                    setStakeholderValue(response.data[0].stakeholder);
                    setObjectiveValue(response.data[0].define_Objective);
                    setActivityTypeValue(response.data[0].activity_Type);
                    setTaskFrequencyValue(response.data[0].task_Frequency);
                    setTaskJobTypeValue(response.data[0].task_Job_Type);
                    setAssigneeValue(response.data[0].task_Assigned_to);
                    setDocumentationRequiredValue(response.data[0].docu_Req);
                    setDocumentationStatusValue(response.data[0].docu_Stat);
                    setCreatedDateValue(parseDateDate(response.data[0].created_Date));
                    setInProgressDateValue(response.data[0].in_Progress_Date);
                    setCompletedDateValue(parseDateDate(response.data[0].completion_Dt));
                    setCurrentStatusValue(response.data[0].current_Stat);
                    setTargetDateValue(response.data[0].target_Dt);
                    setPriorityValue(response.data[0].priority);

                    fetchEmployeeData(response.data[0].task_Reporter)

                    setDropdownValuesDefault(String(response.data[0].task_Type), 'task-type-dropdown');
                    setDropdownValuesDefault(String(response.data[0].activity_Type), 'activity-type-dropdown')
                    setDropdownValuesDefault(String(response.data[0].task_Frequency), 'task-frequency-dropdown')
                    setDropdownValuesDefault(String(response.data[0].priority), 'priority-dropdown')
                    setDropdownValuesDefault(String(response.data[0].task_Job_Type), 'taskjobtype-dropdown')
                    setDropdownValuesDefault(String(response.data[0].current_Stat), 'currentstatus-dropdown')
                    setDropdownValuesDefault(String(response.data[0].task_Assigned_to), 'assignee-dropdown')
                    setDropdownValuesDefault(String(response.data[0].docu_Req), 'documentationreq-dropdown')
                    setDropdownValuesDefault(String(response.data[0].docu_Stat), 'documentationstatus-dropdown')

                })  
            }
        }).finally((task)=>{
                console.log(taskData.task_name)
            }   
        )
        .catch(error => {
            console.error('Error:', error.message);
        });
    }

    function setDropdownValuesDefault(data, id){
        var dropdown = document.getElementById(id);
        for (var i = 0; i < dropdown.options.length; i++) {                      
            if (dropdown.options[i].value === data) {
                dropdown.options[i].selected = true;
                break;
            }
            else{
                dropdown.options[0].selected = true;
            }
        }
    }

    function parseDateDate(date){
        const parsedDate = new Date(date);
        return parsedDate.toISOString().split('T')[0]
    }

    function HandleEdit(data){
        if(data === 'edit task name'){
            setTaskEditable(!taskEditable);
        }
        else if(data === 'cancel task name'){
            setTaskEditable(!taskEditable);
        }
        else if(data === 'update task name'){
            setTaskNameValue(taskNameRef.current.value);
            setTaskEditable(!taskEditable);
        }
        else if(data === 'edit stakeholder'){
            setStakeholderEditable(!stakeholderEditable);
        }
        else if(data === 'cancel stakeholder'){
            setStakeholderEditable(!stakeholderEditable);
        }
        else if(data === 'update stakeholder'){
            setStakeholderValue(stakeholderRef.current.value);
            setStakeholderEditable(!stakeholderEditable);
        }
        else if(data === 'edit objective'){
            setObjectiveEditable(!objectiveEditable);
        }
        else if(data === 'cancel objective'){
            setObjectiveEditable(!objectiveEditable);
        }
        else if(data === 'update objective'){
            setObjectiveValue(objectiveRef.current.value);
            setObjectiveEditable(!objectiveEditable);
        }
    }

    function fetchTaskType(){
        axios.get(BASE_URL+'tasktype').then((response) =>{
            setTaskType(response.data);
        }).catch((error) =>{
            console.log(error)
        })
    }

    function fetchActivityType(){
        axios.get(BASE_URL+'activitytype').then((response) =>{
            setActivityType(response.data)
        }).catch((error) =>{
            console.log(error)
        })
    }

    function fetchTaskFrequency(){
        axios.get(BASE_URL+'taskfrequency').then((response) =>{
            setTaskFrequency(response.data)
        }).catch((error) =>{
            console.log(error)
        })
    }

    function fetchEmployees(){
        var data = {
            "jwt": localStorage.getItem('session'),
            "processName": "Edit",
            "taskID": taskID
        }
        axios.post(BASE_URL+'employees',data).then((response) =>{
            setAssignee(response.data)
        }).catch((error) =>{
            console.log(error)
        })
    }

    function fetchEmployeeData(id){
        axios.get(BASE_URL+'employeedata?id='+id).then((response)=>{
            setCreatedByValue(response.data[0].name)
        })
    }

    function fetchPriority(){
        axios.get(BASE_URL+'priority').then((response) =>{
            setPriority(response.data)
        }).catch((error) =>{
            console.log(error)
        })
    }

    function fetchTaskJobType(){
        axios.get(BASE_URL+'taskjobtype').then((response) =>{
            setTaskJobType(response.data)
        }).catch((error) =>{
            console.log(error)
        })
    }

    function fetchDocumentationStatus(){
        axios.get(BASE_URL+'documentationstatus').then((response) =>{
            setDocumentationStatus(response.data)
        }).catch((error) =>{
            console.log(error)
        })
    }

    function HandleCommentSubmit(){
        if(commentFieldValue.length > 0){
            var data =  {
                "comment": commentFieldValue,
                "jwt": localStorage.getItem('session'),
                "task_ID": taskID,
            }

            axios.post(BASE_URL+'task/comments/add', data).then(res =>{
                toast.success('Comment added successfully', {theme: 'colored'})
                setCommentFieldValue('');
                window.location.reload();
            })
            .catch(err =>{
                console.log(err);
            })
        }
    }

    function fetchTaskComments(){
        var data = {
            "id": taskID,
            "jwt": localStorage.getItem('session')
        }
        axios.post(BASE_URL+'task/comments',data).then(res =>{
            setComments(res.data);
        })
    }

    function fetchTaskSubComments(){
        var data = {
            "id": taskID,
            "jwt": localStorage.getItem('session')
        }
        axios.post(BASE_URL+'task/subcomments',data).then(res =>{
            setSubComments(res.data);
        })
    }

    function fetchQCTaskLog(){
        var data = {
            "id": taskID,
            "jwt": localStorage.getItem('session')
        }
        axios.post(BASE_URL+'task/qcupdate',data).then(res =>{
            setQCTaskLog(res.data);
        })
    }

    useEffect(() => {
        if(localStorage.getItem('session') == undefined){
            navigate('/login');
        }
        else{
            fetchTaskType();
            fetchActivityType();
            fetchTaskFrequency();
            fetchTaskJobType();
            fetchEmployees();
            fetchPriority();
            fetchDocumentationStatus();
            fetchTaskComments();
            fetchTaskSubComments();
            fetchQCTaskLog();
            FetchTaskInformation();

            setIsLoading(false)
        }
        
    },[]);

    function HandleUpdateButtonClick(){
        var data = {
            "id": taskID,
            "task_Name": taskNameValue,
            "stakeholder": stakeholderValue,
            "task_Assigned_to": assigneeValue,
            "activity_Type": activityTypeValue,
            "task_Type": taskTypeValue,
            "task_Frequency": taskFrequencyValue,
            "priority": priorityValue,
            "define_Objective": objectiveValue,
            "target_Dt": targetDateValue,
            "task_Job_Type": taskJobTypeValue,
            "completion_Dt": completedDateValue,
            "docu_Req": documentationRequiredValue,
            "docu_Stat": documentationStatusValue,
            "current_Stat": currentStatusValue,
            "in_Progress_Date": inProgressDateValue,
            "jwt": localStorage.getItem('session')
        }

        axios.post(BASE_URL+'task/update', data)
        .then((res)=>{
            toast.success("Successfully updated the task", {theme:'colored'})
            window.location.reload();
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    const nestedComments = comments.map((level0Comment) => {
        const associatedLevel1Comments = subComments.filter(
          (level1Comment) => level1Comment.reply_ID === level0Comment.id
        );
    
        return (
          <div key={level0Comment.id}>
            <CommentComponent data={level0Comment}/>
            {associatedLevel1Comments.map((level1Comment) => (
                <div className='ms-5'>
                    <CommentComponent key={level1Comment.id} data={level1Comment}/>
                </div>
            ))}
          </div>
        );
    });

    return(
        <div>
        {
            taskNameValue === "" || isLoading === true ?
            <div className='login-page'>
                <div className='d-flex justify-content-center logo-image'>
                    <img src={Logo} width='300' height='300'/>
                </div>
                <div className='d-flex justify-content-center mt-2'>
                    <img src={Loader} width='75' height='75'/>
                </div>
            </div> 
            :
            <div className='background-layer'>
                <Navbar />
                <div className='container mt-4'>
                    <div className='col-12'>
                    {
                        taskEditable === true ? 
                        <div className='d-flex align-items-center'>
                            <input  type='text' className='input-text-field col-10' placeholder='Task Name' defaultValue={taskNameValue} ref={taskNameRef}/>
                            <span onClick={()=>{HandleEdit('update task name')}}><i className='bx bx-check tick-icon ms-5 mt-2'></i></span>
                            <span onClick={()=>{HandleEdit('cancel task name')}}><i className='bx bx-x-circle close-icon ms-4 mt-2'></i></span>
                        </div>
                        :
                        <span className='mt-5 task-title' onClick={()=>{HandleEdit('edit task name')}}>{taskNameValue}</span>
                    }
                    </div>
                    
                    <div className='col-12 d-flex mt-2'>
                        <div className='col-8 pt-2'>
                            <span className='task-side-head mt-5'>Details</span>
                            <div className='d-flex col-11 mt-3'>
                                <div className='col-4'>
                                    <label className='label-custom'>Type of task:</label>
                                </div>
                                <div className='col-6'>
                                    <select name='task-type' id='task-type-dropdown' className='priority-dropdown' onChange={(event)=>setTaskTypeValue(event.target.value)}>
                                        {
                                            taskType.map((task, count) =>{
                                                return(
                                                    <option value={task.id}>{task.name}</option>
                                                );          
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='d-flex col-11 mt-1'>
                                <div className='col-4'>
                                    <label className='label-custom'>Stakeholder:</label>
                                </div>
                                <div className='col-7'>
                                {
                                    stakeholderEditable === true ?
                                    <div className='d-flex align-items-center'>
                                        <input type='text' className='input-text-edit col-8' defaultValue={stakeholderValue} ref={stakeholderRef} />
                                        <span onClick={()=>{HandleEdit('update stakeholder')}}><i className='bx bx-check tick-icon ms-5'></i></span>
                                        <span onClick={()=>{HandleEdit('cancel stakeholder')}}><i className='bx bx-x-circle close-icon ms-4'></i></span>
                                    </div>
                                    :
                                    <span className='edit-text-span' onClick={()=>{HandleEdit('edit stakeholder')}}>{stakeholderValue}</span>
                                }
                                </div>
                            </div>
                            <div className='d-flex col-11 mt-1'>
                                <div className='col-4'>
                                    <label className='label-custom'>Objective:</label>
                                </div>
                                <div className='col-7'>
                                    {
                                        objectiveEditable === true ?
                                        <div>
                                            <textarea type='text' className='input-text-field-remark col-12' placeholder='Objective' defaultValue={objectiveValue} ref={objectiveRef}/>
                                            <div className='d-flex justify-content-end mt-2'>
                                                <span onClick={()=>{HandleEdit('update objective')}}><i className='bx bx-check tick-icon ms-5'></i></span>
                                                <span onClick={()=>{HandleEdit('cancel objective')}}><i className='bx bx-x-circle close-icon ms-4'></i></span>
                                            </div>
                                        </div>
                                        :
                                        <textarea type='text' className='input-text-field-remark-edit col-12' placeholder='Objective' defaultValue={objectiveValue} readOnly onClick={()=>{HandleEdit('edit objective')}}/>
                                    }
                                </div>
                            </div>
                            <div className='d-flex col-11 mt-1'>
                                <div className='col-4'>
                                    <label className='label-custom'>Activity Type:</label>
                                </div>
                                <div className='col-6'>
                                    <div className='d-flex align-items-center'>
                                        <select name='activity-type' id='activity-type-dropdown' className='priority-dropdown' onChange={(event)=>setActivityTypeValue(event.target.value)}>
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
                            </div>
                            <div className='d-flex col-11 mt-1 mb-3'>
                                <div className='col-4'>
                                    <label className='label-custom'>Task Frequency:</label>
                                </div>
                                <div className='col-6'>
                                    <div className='d-flex align-items-center'>
                                        <select name='task-frequency' id='task-frequency-dropdown' className='priority-dropdown' onChange={(event)=>setTaskFrequencyValue(event.target.value)}>
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
                            </div>
                            <span className='task-side-head mt-5'>Documentation</span>
                            <div className='d-flex col-11 mt-3'>
                                <div className='col-4'>
                                    <label className='label-custom'>Documentation Required:</label>
                                </div>
                                <div className='col-6'>
                                    <select name='documentationreq' id='documentationreq-dropdown' className='priority-dropdown' onChange={(event)=>setDocumentationRequiredValue(event.target.value)}>
                                        <option value='true'>Yes</option>
                                        <option value='false'>No</option>
                                    </select>
                                </div>
                            </div>
                            <div className='d-flex col-11 mt-1 mb-5'>
                                <div className='col-4'>
                                    <label className='label-custom'>Documentation Status:</label>
                                </div>
                                <div className='col-6'>
                                    <select name='documentationstatus' id='documentationstatus-dropdown' className='priority-dropdown' onChange={(event)=>setDocumentationStatusValue(event.target.value)}>
                                    {
                                        documentationStatus.map((status, count) =>{
                                            return(
                                                <option value={status.id}>{status.docStatus}</option>
                                            );          
                                        })
                                    }
                                    </select>
                                </div>
                            </div>
                            <div className='mt-3 mb-5'>
                                {
                                    button_data.map((data, count) =>{
                                        return(
                                            <ActionButton data={data} onClick={HandleUpdateButtonClick}/>
                                        )
                                    })
                                }
                                
                            </div>
                            <span className='task-side-head mb-3'>Comments</span>
                            <div className='mt-3 d-flex mb-3'>
                                <textarea type='text' className='input-text-field-comments-box col-10' value={commentFieldValue} placeholder='Comment' onChange={(event)=>{setCommentFieldValue(event.target.value)}}/>
                                <div className='btn-send-comment'>
                                        <span onClick={HandleCommentSubmit}><i class='bx bx-send'></i></span>
                                </div>
                            </div>

                            <div className='mt-5 col-11'>
                            {
                                nestedComments
                            }
                            </div>
                            
                        </div>
                        <div className='col-4'>
                            <span className='task-side-head mt-5 mb-3'>Task Details</span>
                            <div className='d-flex col-11 mt-3'>
                                <div className='col-4'>
                                    <label className='label-custom'>Task Priority:</label>
                                </div>
                                <div className='col-6'>
                                    <div className='d-flex align-items-center'>
                                        <select name='priority' id='priority-dropdown' className='priority-dropdown mt-1' onChange={(event)=>setPriorityValue(event.target.value)}>
                                        {
                                            priority.map((prio, count) =>{
                                                return(
                                                    <option value={prio.id}>{prio.priority}</option>
                                                )
                                            })
                                        }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex col-11 mt-1'>
                                <div className='col-4'>
                                    <label className='label-custom'>Task Job type:</label>
                                </div>
                                <div className='col-6'>
                                    <div className='d-flex align-items-center'>
                                        <select name='taskjobtype' id='taskjobtype-dropdown' className='priority-dropdown mt-1' onChange={(event)=>setTaskJobTypeValue(event.target.value)}>
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
                            </div>
                            <div className='d-flex col-11 mt-1 mb-3'>
                                <div className='col-4'>
                                    <label className='label-custom'>Current Status:</label>
                                </div>
                                <div className='col-6'>
                                    <div className='d-flex align-items-center'>
                                        <select name='currentstatus' id='currentstatus-dropdown' className='priority-dropdown mt-1' onChange={(event)=>setPriorityValue(event.target.value)}>
                                            <option value='To do' selected>To do</option>
                                            <option value='In Progress'>In Progress</option>
                                            <option value='On Hold'>On Hold</option>
                                            <option value='QC Verification'>QC Verification</option>
                                            <option value='Completed'>Completed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <span className='task-side-head mt-5 mb-3'>Peoples</span>
                            <div className='d-flex col-11 mt-2'>
                                <div className='col-4'>
                                    <label className='label-custom'>Assigned To:</label>
                                </div>
                                <div className='col-6'>
                                    <div className='d-flex align-items-center'>
                                        <select name='assignee' id='assignee-dropdown' className='priority-dropdown mt-1' onChange={(event)=>setAssigneeValue(event.target.value)}>
                                        {
                                            assignee.map((assigned, count) =>{
                                                return(
                                                    <option value={assigned.id}>{assigned.name}</option>
                                                )
                                            })
                                        }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex col-11 mt-1 mb-3'>
                                <div className='col-4'>
                                    <label className='label-custom'>Created By:</label>
                                </div>
                                <div className='col-6'>
                                    <div className='d-flex align-items-center'>
                                        <span className='edit-text-span mt-1'>{createdByValue}</span>
                                    </div>
                                </div>
                            </div>
                            <span className='task-side-head mt-5 mb-3'>Timeline</span>
                            <div className='d-flex col-11 mt-2'>
                                <div className='col-4'>
                                    <label className='label-custom'>Created Date:</label>
                                </div>
                                <div className='col-6'>
                                    <input type='text' className='input-text-field-small col-12' placeholder='Created Date' value={createdDateValue} onChange={(event)=>setCreatedDateValue(event.target.value)}/>
                                </div>
                            </div>
                            {
                                currentStatusValue === "In Progress" ?
                                <div className='d-flex col-11 mt-1'>
                                    <div className='col-4'>
                                        <label className='label-custom'>In Progress Date:</label>
                                    </div>
                                    <div className='col-6'>
                                        <input type='datetime-local' className='input-text-field-small col-12' placeholder='In Progress Date' value={inProgressDateValue} onChange={(event)=>setInProgressDateValue(event.target.value)}/> 
                                    </div>
                                </div>
                                : null
                            }
                            {
                                currentStatusValue === "In Progress" ?
                                <div className='d-flex col-11 mt-1'>
                                    <div className='col-4'>
                                        <label className='label-custom'>Target Date:</label>
                                    </div>
                                    <div className='col-6'>
                                        <input type='datetime-local' className='input-text-field-small col-12' placeholder='In Progress Date' value={targetDateValue} onChange={(event)=>setTargetDateValue(event.target.value)}/> 
                                    </div>
                                </div>
                                : null
                            }
                            {
                                currentStatusValue === "Completed" ?
                                <div className='d-flex col-11 mt-1'>
                                    <div className='col-4'>
                                        <label className='label-custom'>Completion Date:</label>
                                    </div>
                                    <div className='col-6'>
                                        <input type='datetime-local' className='input-text-field-small col-12' placeholder='Completion Date' value={completedDateValue} onChange={(event)=>setCompletedDateValue(event.target.value)}/> 
                                    </div>
                                </div>
                                : null
                            }
                            <div className='mt-3'>
                                <span className='task-side-head mb-3'>QC Timeline</span>
                                {
                                    qcTaskLog.map((qctask, count) =>{
                                        return(
                                            <QCTimelineCard data={qctask}/>
                                        )
                                    })
                                }
                            </div>        
                        </div>
                    </div>
                </div> 
            </div>
        }
        </div>
        
    )
}
export default EditTask;