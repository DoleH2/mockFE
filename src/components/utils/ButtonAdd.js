
const ButtonAdd = ({onClick}) => {
    //end chuyen trang
    return (
        <button className="btn btn-primary px-3 d-flex align-items-center justify-content-center" style={{ width: '40px',height:'40px' }} onClick={onClick}><i className="fa-solid fa-plus"></i></button>
    )
}

export default ButtonAdd;