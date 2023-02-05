import PostsList from "../components/PostsList";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { fetchPosts, deletePost } from "../state/postSlice";
import Loading from "../components/Loading";


const Index = () => {
    const {records, loading, error} = useSelector(state => state.posts);
    const {isLoggedIn} = useSelector(state => state.auth)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])
    const deleteRecord = useCallback((id) => dispatch(deletePost(id)), [dispatch]);
    return (
        
        <Loading loading={loading} error={error}>
            <PostsList data = {records} deleteRecord={deleteRecord} isLoggedIn={isLoggedIn}/>
        </Loading>
    )
};

export default Index