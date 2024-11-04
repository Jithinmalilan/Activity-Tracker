import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../env/constants";
import Cookies from "js-cookie";
import html2canvas from 'html2canvas';

function DailyUpdateShare(){

    const {updateType} = useParams();

    const navigate = useNavigate();

    const divRef = useRef(null);

    function getFormattedDate() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const date = new Date();
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const formattedDay = String(day).padStart(2, '0');
        const monthAbbreviation = months[monthIndex];
      
        return `${formattedDay}-${monthAbbreviation}-${year}`;
    }

    
    const title = `Project Tracker: PQM Analytics: ${getFormattedDate()}`;

    const[updateData, setUpdateData] = useState([]);

    function fetchUpdateData(){

        var data = {
            "jwt": localStorage.getItem('session')
        }
        
        axios.post(BASE_URL+'dailytask', data)
        .then((res) =>{
            setUpdateData(res.data);
        })
        .catch((err) =>{
            console.log(err);
        })
    }

    function HandleBackButtonClick(){
        navigate('/dailytask');
    }

    function HandleShareButtonClick(){
        const div = divRef.current;
        console.log(div)
        if(div) {
            html2canvas(div).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                // Create a temporary anchor element
                const downloadLink = document.createElement('a');
                downloadLink.href = imgData;
                downloadLink.download = 'screenshot.png';

                // Trigger a click event on the anchor element
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            });
        }
    }

    useEffect(() => {
        fetchUpdateData();
    }, []);

    return(
        <div>
            <Navbar />
            <div className="d-flex justify-content-center mt-3">
                <div className="col-11 d-flex justify-content-between">
                    <span className="tb-icons" onClick={HandleBackButtonClick}><i class='bx bx-arrow-back' ></i></span>
                    <span className="tb-icons" onClick={HandleShareButtonClick}><i class='bx bxs-share-alt' ></i></span>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <div className="col-11" ref={divRef}>
                    <table className="col-12">
                        {
                            updateType === "morning" ?
                            <tr className="update-head-tr">
                                <th colSpan="5" style={{border:"1px solid #000000"}}>{title}</th>
                            </tr>
                            :
                            <tr className="update-head-tr">
                                <th colSpan="7" style={{border:"1px solid #000000"}}>{title}</th>
                            </tr>
                        }
                        
                        <tr className="update-head-section-tr">
                            <th className="col-update-sl ps-2">SNO</th>
                            <th className="col-update-name ps-2">Project Name</th>
                            <th className="col-update-name ps-2">Actions Planned for the Day</th>
                            <th className="col-update-ac ps-2">Assigned to</th>
                            <th className="col-update-cs ps-2">Proj Open Dt</th>
                            {updateType === "morning" ? null : <th className="col-update-ac ps-2">Status</th>}
                            {updateType === "morning" ? null : <th className="col-update-name ps-2">Remarks</th>}
                        </tr>
                        {
                            updateData.map((data, count) =>{
                                return(
                                    <tr className="update-data-tr">
                                        <td className="col-update-sl ps-2">{count+1}</td>
                                        <td className="col-update-name ps-2">{data.task_Name}</td>
                                        <td className="col-update-name ps-2">{data.morning_Plan}</td>
                                        <td className="col-update-ac ps-2">{data.assignee_Name}</td>
                                        <td className="col-update-cs ps-2">{`${String(new Date(data.in_Progress_Date).getDate()).padStart(2, '0')}-${String(new Date(data.in_Progress_Date).getMonth()+1).padStart(2, '0')}-${new Date(data.in_Progress_Date).getFullYear()}`}</td>
                                        {updateType === "morning" ? null : <td className="col-update-ac ps-2">{data.current_Status}</td>}
                                        {updateType === "morning" ? null : <td className="col-update-name ps-2">{data.evening_Update}</td>}
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DailyUpdateShare;