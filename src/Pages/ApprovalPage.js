import { useEffect, useState } from "react";
import ApprovalCard from "../Components/ApprovalCard";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { BASE_URL } from "../env/constants";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function ApprovalPage(){

    const[approvalLoginList, setApprovalLoginList] = useState([]);
    const[approvalTaskList, setApprovalTaskList] = useState([]);

    function fetchApprovalLogin(){
        var data = {
            "jwt": localStorage.getItem('session')
        }
        axios.post(BASE_URL+'approvallogin', data)
        .then((res) => {
           setApprovalLoginList(res.data); 
        })
        .catch((err) =>{
            toast.error("Error occured while fetching data", {theme: "colored"})
        })
    }

    function fetchApprovalTasks(){
        var data = {
            "jwt": localStorage.getItem('session')
        }
        axios.post(BASE_URL+'approvaltasks', data)
        .then((res) => {
            setApprovalTaskList(res.data);
        })
        .catch((err) =>{
            toast.error("Error occured while fetching data", {theme: "colored"})
        })
    }

    useEffect(() => {
        fetchApprovalLogin();
        fetchApprovalTasks();
    },[]);

    return(
        <div className="background-layer">
            <Navbar />
            <div className='home-page-task-text'>
                <span>Password Change Approvals</span>
            </div>
            <div className='task-card-grid'>
            {
                approvalLoginList.map((approval, count) =>{
                    return(
                        <ApprovalCard data={approval}/>
                    )
                })
            }
            </div>

            <div className='home-page-task-text'>
                <span>Task Approvals</span>
            </div>
            <div className='task-card-grid'>
            {
                approvalTaskList.map((approval, count) =>{
                    return(
                        <ApprovalCard data={approval}/>
                    )
                })
            }
            </div>
        </div>
    )
}

export default ApprovalPage;