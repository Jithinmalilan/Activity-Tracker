import axios from "axios";
import { BASE_URL } from '../env/constants';
import { toast } from "react-toastify";

function ApprovalCard (props){

    function HandleApproveButtonClick(id){
        var data= {
            "id": id,
            "isApproved": true
        }
        if(props.data.approvalType == "Login"){
            axios.post(BASE_URL+'approvelogin',{id})
            .then(res => {
                if(res.data.result == true){
                    toast.success("Successfully approved request", {theme: 'colored'});
                    window.location.reload();
                }
                else{
                    toast.error("Error occured on approving request", {theme: 'colored'});
                }
            })
            .catch(err =>{
                toast.error("Error occured on approving request", {theme: 'colored'});
                console.log(err)
            })
        }
        else{
            axios.post(BASE_URL+'approvetask', data)
            .then(res => {
                if(res.data.result == true){
                    toast.success("Successfully approved request", {theme: 'colored'});
                    window.location.reload();
                }
                else{
                    toast.error("Error occured on approving request", {theme: 'colored'});
                }
            })
            .catch(err =>{
                toast.error("Error occured on approving request", {theme: 'colored'});
                console.log(err)
            })
        }
        
    }

    function HandleRejectButtonClick(id){
        var data= {
            "id": id,
            "isApproved": false
        }
        
        axios.post(BASE_URL+'approvetask',data)
        .then(res => {
            if(res.data.result == true){
                toast.success("Successfully approved request", {theme: 'colored'});
                window.location.reload();
            }
            else{
                toast.error("Error occured on approving request", {theme: 'colored'});
            }
        })
        .catch(err =>{
            toast.error("Error occured on approving request", {theme: 'colored'});
            console.log(err)
        })
    }

    return(
        <div className="taskcard-container">
            <div className='d-flex justify-content-between'>
                <div className='col-9'>
                    <span className='task-card-title'>{props.data.title}</span>
                </div>
                <div className='d-flex justify-content-end '>
                    {null === null ?
                        <div className='img-alternative-card d-flex justify-content-center align-items-center' title={props.data.name}>
                            <span>{props.data.shortName}</span>
                        </div>
                        :
                        <img src={props.data.image_URL} title={props.data.name} className='profile-image-card me-1'/>
                    }
                </div>   
            </div>
            <div className="mt-1">
                <span className="login-label">{props.data.description}</span>
            </div>
            <div className="d-flex mt-3 justify-content-end">
                <div className="approve-button-approval-card d-flex align-items-center justify-content-center" onClick={()=>HandleApproveButtonClick(props.data.id)}>
                    <span>Approve</span>
                </div>
                {
                    props.data.approvalType === "Task" ?
                    <div className="reject-button-approval-card d-flex align-items-center justify-content-center ms-3" onClick={()=>HandleRejectButtonClick(props.data.id)}>
                        <span>Reject</span>
                    </div>
                    :null
                }
                
            </div>
        </div>
    )
}

export default ApprovalCard;