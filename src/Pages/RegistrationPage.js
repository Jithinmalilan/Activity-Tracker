import { useEffect, useState } from "react";
import Logo from '../assets/Images/logo-crop.png';
import ActionButton from "../Components/ActionButton";
import { BASE_URL } from "../env/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";

function RegistrationPage(){

    const navigate = useNavigate();

    const[employeeID, setEmployeeID] = useState('');
    const[name, setName] = useState('');
    const[designation, setDesignation] = useState('');
    const[department, setDepartment] = useState('');
    const[team, setTeam] = useState('');
    const[reportTo, setReportTo] = useState('');

    const[employeeList, setEmployeeList] = useState([]);

    const button_data = [{name:'Register', icon:'bx bxs-lock-alt me-2', class:'', url:'action'}];

    function fetchLoginRole(){
        axios.post(BASE_URL+'employees',{"jwt": localStorage.getItem('session')}).then((response) =>{
            setEmployeeList(response.data)
        }).catch((error) =>{
            console.log(error)
        })
    }

    useEffect(() => {
        fetchLoginRole();
    },[]);

    function HandleRegisterClick(){
        if(name.length <= 0){
            toast.error("Enter an Employee ID", {theme: "colored"});
        }
        else if(employeeID.length <= 0){
            toast.error("Enter a Password", {theme: "colored"});
        }
        else if(designation.length <= 0){
            toast.error("Enter a Designation", {theme: "colored"});
        }
        else if(department.length <= 0){
            toast.error("Enter a Department", {theme: "colored"});
        }
        else if(team.length <= 0){
            toast.error("Select a Team", {theme: "colored"});
        }
        else if(reportTo.length <= 0){
            toast.error("Select Reporting Manager", {theme: "colored"});
        }
        else
        {
            var data = {
                "name": name,
                "empid": employeeID,
                "designation": designation,
                "dept": department,
                "team": team,
                "reportTo": reportTo
            }

            axios.post(BASE_URL+'employees/register',data).then(response => {
                if(response.data.result === true)
                {
                    setEmployeeID('');
                    setName('');
                    setDesignation('');
                    setDepartment('');
                    var dropdown1 = document.getElementById('user-team')
                    dropdown1.selectedIndex = 0;
                    var dropdown2 = document.getElementById('report-to')
                    dropdown2.selectedIndex = 0;
                    toast.success("Successfully created user", {theme: "colored"});
                }
            })
            .catch(error => {
                console.error('Error:', error.message);
                toast.error("Error Occured", {theme: "colored"});
            });
        }
    }

    function HandleHomeButtonClick(){
        navigate('/homepage');
    }

    return(
        <div className="col-12">
            <Navbar />
            <div className="d-flex registration-page">
                <div className="d-flex align-items-center col-7 registration-page-image-container flex-column">
                    <img src={Logo} width='300'/>
                    <span className='login-title mt-3'>Activity Tracker</span>
                </div>
                <div className="d-flex col-4 flex-column">
                    <span className='registration-text'>Registration</span>
                    <div className='mt-4 d-flex flex-column'>
                        <label className='login-label'>Employee Name</label>
                        <input className='col-10 login-input' type='text' value={name} onChange={(event) => {setName(event.target.value)}}/>
                    </div>
                    <div className="d-flex justify-content-between col-10">
                        <div className='mt-3 d-flex flex-column col-5'>
                            <label className='login-label'>Employee ID</label>
                            <input className='col-12 login-input' type='text' value={employeeID} onChange={(event) => {setEmployeeID(event.target.value)}}/>
                        </div>
                        <div className='mt-3 d-flex flex-column col-5'>
                            <label className='login-label'>Designation</label>
                            <input className='col-12 login-input' type='text' value={designation} onChange={(event) => {setDesignation(event.target.value)}}/>
                        </div>
                    </div>
                    
                    <div className="d-flex justify-content-between col-10">
                        <div className='mt-3 d-flex flex-column col-5'>
                            <label className='login-label'>Department</label>
                            <input className='col-12 login-input' type='text' value={department} onChange={(event) => {setDepartment(event.target.value)}}/>
                        </div>
                        <div className='mt-3 d-flex flex-column col-5'>
                            <label className='login-label'>Team</label>
                            <select name='user-team' id='user-team' className='col-12 registration-dropdown' defaultValue={team} onChange={(event)=>{setTeam(event.target.value)}}>
                                <option value='' selected>Select Team</option>
                                <option value='MIS'>MIS</option>
                                <option value='QC'>QC</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className='mt-3 d-flex flex-column'>
                        <label className='login-label'>Reports To</label>
                        <select name='report-to' id='report-to' className='col-10 registration-dropdown' defaultValue={reportTo} onChange={(event)=>{setReportTo(event.target.value)}}>
                        <option value='0'>Select Reporting Manager</option>
                        {
                            employeeList.map((emp, count) =>{
                                return(
                                    <option value={emp.id}>{emp.name}</option>
                                )
                            })
                        }
                        </select>
                    </div>
                    <div className='mt-5 d-flex col-10 align-items-center justify-content-end'>
                        {button_data.map((data,count)=>{
                            return(
                                <ActionButton data={data} onClick={HandleRegisterClick}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrationPage;