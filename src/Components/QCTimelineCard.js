
function QCTimelineCard(props){
    return(
        <div className="d-flex col-11 mt-2">
            <div className="col-1 d-flex justify-content-center align-items-center">
                <span style={{fontSize:"1.2rem"}}><i class={props.data.className}></i></span>
            </div>
            <div className="col-10">
                <span className="label-custom">{props.data.detail}</span>
            </div> 
        </div>
    )
}

export default QCTimelineCard;