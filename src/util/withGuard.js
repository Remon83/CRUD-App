import { useSelector } from "react-redux";

const withGuard = (Component) => {
    return (props) => {
        const {isLoggedIn} = useSelector(state => state.auth);
        console.log(props);
        return isLoggedIn ? <Component {...props}/> : <div>Please Log In first</div>;
    }
}

export default withGuard;