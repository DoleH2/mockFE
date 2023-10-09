import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Guard = ({ condition, children }) => {
    const navigate = useNavigate();
    const changeRouter = (path, data) => {
        navigate(path, { state: data });
    };
    const [display, setDisplay] = useState(false);
    useEffect(() => {
        const accessToken = localStorage.accessToken;
        let role = null;
        if (accessToken) {
            const userInfor = JSON.parse(localStorage.userInfor);
            if (userInfor.exp > new Date().getMilliseconds()) {
                role = userInfor.role === '[ROLE_ADMIN]' ?
                    1 :
                    userInfor.role === '[ROLE_STAFF]' ?
                        2 :
                        3;
            }
        }
        if (condition.includes(role)) {
            setDisplay(true);
        } else if (!condition.includes(role) && role === 2) {
            changeRouter("/error");
        } else {
            changeRouter("/");
        }
    }, [display])

    return(
        <>
            {display && children}
        </>
    );

}

export default Guard;