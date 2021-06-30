const Notification = ({props}) => {

    const notificationStyle = {
        fontSize: '2em',
        border: '10px solid transparent',
        borderRadius: '10px',
        backgroundColor: 'lightgrey',
        paddingLeft: '10px'
    }

    if( props.message === '' ){
        return null
    } else {
        return(
            <div style={notificationStyle} className={`notification ${props.task}`}>
                {props.message}
            </div>
        )
    }
}

export default Notification