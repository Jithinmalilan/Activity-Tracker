
function TagComponent(props){

    var className = `me-2 d-flex justify-content-center align-items-center ${props.data.class}`

    return(
        <div className={className}>
            <span>{props.data.value}</span>
        </div>
    )
}

export default TagComponent;