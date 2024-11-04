import axios from "axios";
import Navbar from "../Components/Navbar";
import "../Styles/DailyTaskUpdate.css";
import { BASE_URL } from "../env/constants";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import ActionButton from "../Components/ActionButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function DailyTaskUpdate() {

    const[tasks, setTasks] = useState([]);
    const[selectedTasks, setSelectedTasks] = useState([]);
    const[morningPlan, setMorningPlan] = useState("");
    const[eveningUpdate, setEveningUpdate] = useState("");

    const [isNextDay, setIsNextDay] = useState(false);

    const[updateButtonClicked, setUpdateButtonClicked] = useState(false)

    const navigate = useNavigate();

    const button_data = [{name:'Morning Plan', icon:'bx bx-cloud-upload me-2', class:'me-4', url:'action', type:'Morning'}, {name:'Evening update', icon:'bx bx-cloud-upload me-2', class:'', url:'action', type:'Evening'}];

    function fetchDailyTasks(value){

        var data = {
            "jwt": localStorage.getItem('session'),
            "type": value
        }

        axios.post(BASE_URL+'dailytask',data)
        .then((res) =>{
            setSelectedTasks(res.data);
        })
        .catch((err) =>{
            console.log(err);
        })
    }

    function fetchAllTasks(){
        axios.post(BASE_URL+'task/alltasks',{"jwt":localStorage.getItem('session')})
        .then((res) =>{
            setTasks(res.data);
            fetchDailyTasks("");
        })
        .catch((err) =>{
            console.log(err);
        })
    }

    function HandleUpdateButtonClick(data){
        if(data === "Morning"){
            navigate('/dailyupdate/morning')
        }
        else{
            navigate('/dailyupdate/evening')
        }
    }

    function AddbuttonClicked(info){

        if(morningPlan === ""){
            toast.error("Enter morning plan", {theme: 'colored'})
            return;
        }

        var data = {
            "task_ID": info.id,
            "assignee": info.task_Assigned_to,
            "morning_Plan": morningPlan,
            "evening_Update": eveningUpdate,
            "isNextDay": isNextDay === true ? true : false
        }

        axios.post(BASE_URL+'dailytask/add', data)
        .then((res) =>{
            if(res.data.result === false)
            {
                toast.error("Error occured on adding to Daily Task", {theme: 'colored'})
            }
            else{
                toast.success("Successfully added to Daily Task", {theme: 'colored'});
            } 
            window.location.reload();
        })
        .catch((err) =>{
            console.log(err);
        })
    }

    function UpdateButtonClicked(info){
        var data = {
            "task_ID": info.task_Id,
            "assignee": info.task_Assigned_to,
            "morning_Plan": morningPlan === "" ? info.morning_Plan : morningPlan,
            "evening_Update": eveningUpdate === ""? info.evening_Update : eveningUpdate,
            "isNextDay": isNextDay === true ? true : false
        }

        axios.post(BASE_URL+'dailytask/update', data)
        .then((res) =>{
            if(res.data.result === false)
            {
                toast.error("Error occured on updating Daily Task", {theme: 'colored'})
            }
            else{
                toast.success("Successfully updated Daily Task", {theme: 'colored'});
            } 
            window.location.reload();
        })
        .catch((err) =>{
            console.log(err);
        })
    }

    function DeleteButtonClicked(info){
        
        var data = {
            "task_ID": info.task_Id,
            "assignee": info.task_Assigned_to,
            "morning_Plan": morningPlan === "" ? info.morning_Plan : morningPlan,
            "evening_Update": eveningUpdate === ""? info.evening_Update : eveningUpdate,
            "isNextDay": isNextDay === true ? true : false
        }

        axios.post(BASE_URL+'dailytask/delete', data)
        .then((res) =>{
            if(res.data.result === false)
            {
                toast.error("Error occured on deleting Daily Task", {theme: 'colored'});
                window.location.reload();
            }
            else{
                toast.success("Successfully deleted from Daily Task", {theme: 'colored'});
            } 
            window.location.reload();
        })
        .catch((err) =>{
            console.log(err);
        })
    }

    const tableRows = () => {
        return (
          <tbody>
            {tasks.map((task, count) => 
                {
                    const isIdPresent = selectedTasks.some(sItem => sItem.task_Id === task.id);
                    const  dailyData = selectedTasks.find(item2 => item2.task_Id === task.id);
                    return isIdPresent ? 
                    (
                        <tr className="table-data">
                            <td className="col-sl ps-3">{count+1}</td>
                            <td className="col-name">{task.task_Name}</td>
                            <td className="col-cs">{task.current_Stat}</td>
                            <td className="col-cs">{task.in_Progress_Date == null ? `${String(new Date(task.created_Date).getDate()).padStart(2, '0')}-${String(new Date(task.created_Date).getMonth()+1).padStart(2, '0')}-${new Date(task.created_Date).getFullYear()}`: `${String(new Date(task.in_Progress_Date).getDate()).padStart(2, '0')}-${String(new Date(task.in_Progress_Date).getMonth()+1).padStart(2, '0')}-${new Date(task.in_Progress_Date).getFullYear()}`}</td>
                            <td className="col-name">{updateButtonClicked === false ? <input type="text" className="col-11 tb-input-text" defaultValue={dailyData.morning_Plan} disabled/> : <input type="text" className="col-11 tb-input-text" placeholder="Morning Plan" defaultValue={dailyData.morning_Plan} onChange={(event) => setMorningPlan(event.target.value)}/> }</td>
                            <td className="col-name">{isNextDay === true ? <input type="text" className="col-11 tb-input-text" defaultValue="" placeholder="Evening Update" disabled/> :  updateButtonClicked === false ? <input type="text" className="col-11 tb-input-text" defaultValue={dailyData.evening_Update === "" ? "" : dailyData.evening_Update} placeholder="Evening Update" disabled/> : <input type="text" className="col-11 tb-input-text" placeholder="Evening Update" onChange={(event) => setEveningUpdate(event.target.value)}/>}</td>
                            <td className="col-ac">
                                <div className="d-flex justify-content-center">
                                    {updateButtonClicked === false ?<span className="tb-icons me-3" onClick={()=>{setUpdateButtonClicked(true)}}><i class='bx bxs-pencil'></i></span> : <span className="tb-icons me-3" onClick={()=>{setUpdateButtonClicked(false)}}><i class='bx bx-x'></i></span>}
                                    <span className="tb-icons me-3" onClick={()=>{DeleteButtonClicked(dailyData)}}><i class='bx bxs-trash' ></i></span>
                                    <span className="tb-icons" onClick={()=>{UpdateButtonClicked(dailyData)}}><i class='bx bx-right-arrow-circle'></i></span>
                                </div>
                            </td>
                        </tr>
                    ) 
                    : 
                    (
                        <tr className="table-data">
                            <td className="col-sl ps-3">{count+1}</td>
                            <td className="col-name">{task.task_Name}</td>
                            <td className="col-cs">{task.current_Stat}</td>
                            <td className="col-cs">{task.in_Progress_Date == null ? `${String(new Date(task.created_Date).getDate()).padStart(2, '0')}-${String(new Date(task.created_Date).getMonth()+1).padStart(2, '0')}-${new Date(task.created_Date).getFullYear()}`: `${String(new Date(task.in_Progress_Date).getDate()).padStart(2, '0')}-${String(new Date(task.in_Progress_Date).getMonth()+1).padStart(2, '0')}-${new Date(task.in_Progress_Date).getFullYear()}`}</td>
                            <td className="col-name">{new Date().getHours() < 14 || isNextDay === true ? <input type="text" className="col-11 tb-input-text" placeholder="Morning Plan" onChange={(event) => setMorningPlan(event.target.value)}/> : <input type="text" className="col-11 tb-input-text" value={task.morning_Plan} disabled/>}</td>
                            <td className="col-name">{isNextDay === true ? <input type="text" className="col-11 tb-input-text" defaultValue="" placeholder="Evening Update" disabled/> : new Date().getHours() < 11 || new Date().getHours() > 20 ? <input type="text" className="col-11 tb-input-text" placeholder="Evening Update" disabled/> : <input type="text" className="col-11 tb-input-text" placeholder="Evening Update" onChange={(event) => setEveningUpdate(event.target.value)}/>}</td>
                            <td className="col-ac">
                                <div className="d-flex justify-content-center">
                                    <span className="tb-icons me-3" onClick={()=>{AddbuttonClicked(task)}}><i class='bx bx-plus-circle'></i></span>
                                </div>
                            </td>
                        </tr>
                    );
                })
            }
          </tbody>
        );
    };

    const handleCheckboxChange = (event) => {
        setIsNextDay(event.target.checked);
        if(event.target.checked === true){
            fetchDailyTasks("NextDay");
        }
        else{
            fetchDailyTasks("")
        }
      };

    useEffect(() => {
        fetchAllTasks();
    }, []);


    return(
        <div>
            <Navbar />
            <div className='home-page-task-text'>
                <span>Select Today's task</span>
            </div>
            <div className="ms-5 me-5 mt-5 d-flex justify-content-center">
                <div className="d-flex justify-content-end align-items-center col-11">
                    <div className="d-flex">
                        <span className="me-2">Next day update :</span>
                        <label className="switch me-4">
                            <input type="checkbox" checked={isNextDay} onChange={handleCheckboxChange}/>
                            <span className="slider round"></span>
                        </label>
                    </div>
                    {
                        button_data.map((data, count) =>{
                            return(
                                <ActionButton data={data} onClick={()=>HandleUpdateButtonClick(data.type)}/>
                            )
                        })
                    }
                </div>
            </div>
            
            <div className="ms-5 me-5 mt-5 d-flex justify-content-center">
                <table className="col-11">
                    <tr className="table-head">
                        <th className="col-sl ps-3">Sl no</th>
                        <th className="col-name">Task Name</th>
                        <th className="col-cs">Current Status</th>
                        <th className="col-cs">Task Date</th>
                        <th className="col-name">Morning Plan</th>
                        <th className="col-name">Evening Update</th>
                        <th className="col-ac">Action</th>
                    </tr>
                    {
                        tableRows()
                    }

                </table>
            </div>
        </div>
    )
}

export default DailyTaskUpdate;