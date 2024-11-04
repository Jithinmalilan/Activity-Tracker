import { useState } from 'react';
import '../Styles/CommentComponent.css'
import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from '../env/constants';
import { toast } from 'react-toastify';

function CommentComponent (props){

    const[openReplyTextBox, setOpenReplyTextBox] = useState(false);
    const[openEditTextBox, setOpenEditTextBox] = useState(false);
    const[commentFieldValue, setCommentFieldValue] = useState("");
    const[editFieldValue, setEditFieldValue] = useState("");

    function HandleCommentSubmit(){
        if(commentFieldValue.length > 0){
            var data =  {
                "comment": commentFieldValue,
                "jwt": localStorage.getItem('session'),
                "task_ID": props.data.task_ID,
                "reply_ID": props.data.id
            }

            axios.post(BASE_URL+'task/comments/add', data).then(res =>{
                toast.success('Comment added successfully', {theme: 'colored'});
                setCommentFieldValue('');
                setOpenReplyTextBox(!openReplyTextBox);
                window.location.reload();
            })
            .catch(err =>{
                console.log(err);
            })
        }
    }

    function HandleEditSubmit(){
        if(commentFieldValue.length > 0){
            var data =  {
                "id":props.data.id,
                "comment": commentFieldValue,
                "jwt": localStorage.getItem('session'),
            }

            axios.post(BASE_URL+'task/comments/add', data).then(res =>{
                toast.success('Comment edited successfully', {theme: 'colored'});
                setEditFieldValue('');
                setOpenEditTextBox(!openEditTextBox);
                window.location.reload();
            })
            .catch(err =>{
                console.log(err);
            })
        }
    }

    function HandleDeleteClick(){
        axios.delete(BASE_URL+'task/comments/delete?id='+props.data.id).then(res =>{
            toast.success('Successfully removed comment', {theme: 'colored'});
            window.location.reload();
        })
    }

    function HandleReplyClick(){
        setOpenReplyTextBox(!openReplyTextBox);
    }

    function HandleEditClick(){
        setOpenEditTextBox(!openEditTextBox);
        setEditFieldValue(props.data.comment);
    }

    return(
        <div className='col-12'>
            <div className='col-12 d-flex mb-4'>
                <div className='col-1'>
                    {props.data.image_Url === null ?
                        <div className='img-alternative-card d-flex justify-content-center align-items-center' title={props.data.user_Name}>
                            <span style={{marginTop:"-2px"}}>{props.data.short_Name}</span>
                        </div>
                        :
                        <img src={props.data.image_Url} title={props.data.user_Name} className='profile-image-card me-1'/>
                    }
                </div>
                <div className='col-11'>
                    <div className='d-flex'>
                        <span className='label-custom me-4'>{props.data.user_Name}</span>
                        <span className='label-custom' style={{fontSize:"0.7rem", marginTop:"1px", color:"D3D3D3"}}>{props.data.posted_Date}</span>
                    </div>
                    <div className='d-flex comment-text'>
                        <span>{props.data.comment}</span>
                    </div>
                    <div className='d-flex mt-2'>
                        {
                            props.data.reply_ID == null ?
                            <span className='label-custom-button me-3' onClick={HandleReplyClick}>Reply</span>
                            :null
                        }
                        {
                            props.data.is_Comment_Owner == true ?
                            <span className='label-custom-button me-3' onClick={HandleEditClick}>Edit</span> 
                            : null
                        }
                        {
                            props.data.is_Comment_Owner == true ?
                            <span className='label-custom-button me-4' onClick={HandleDeleteClick}>Delete</span>
                            : null
                        }
                        {
                            props.data.is_Updated == true ?
                            <span className='label-custom-static' onClick={HandleDeleteClick}>Edited</span>
                            :null
                        }
                    </div>
                </div>
            </div>
            {
                openReplyTextBox === true ?
                <div className='mt-3 ms-5 d-flex mb-3'>
                    <textarea type='text' className='input-text-field-comments-box col-10' value={commentFieldValue} style={{height:"2.5rem"}} placeholder={`Reply to: ${props.data.user_Name}`} onChange={(event)=>{setCommentFieldValue(event.target.value)}}/>
                    <div className='btn-send-comment'>
                        <span onClick={HandleCommentSubmit}><i class='bx bx-send'></i></span>
                    </div>
                </div>
                : null
            }
            {
                openEditTextBox === true ?
                <div className='mt-3 ms-5 d-flex mb-3'>
                    <textarea type='text' className='input-text-field-comments-box col-10' defaultValue={editFieldValue} style={{height:"2.5rem"}} placeholder={`Reply to: ${props.data.user_Name}`} onChange={(event)=>{setCommentFieldValue(event.target.value)}}/>
                    <div className='btn-send-comment'>
                        <span onClick={HandleEditSubmit}><i class='bx bx-send'></i></span>
                    </div>
                </div>
                : null
            }
        </div>
        
    )
}

export default CommentComponent;