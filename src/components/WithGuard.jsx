// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

const WithGuard = ({children}) => {
    // const navigate = useNavigate();
    const {isLoggedIn} = useSelector(state => state.auth);
    const clonedElement = React.cloneElement(children, {title: 'Hello'})
    // useEffect(() => {
    //     if (isLoggedIn) navigate('/');
    // }, [isLoggedIn, navigate]);

    return (
        !isLoggedIn ? clonedElement : <div>Please Log In first</div>
    )
}

export default WithGuard;