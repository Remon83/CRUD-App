import { useEffect } from "react";
import { fetchPost } from "../state/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const usePostDetails = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {loading, error, record} = useSelector(state => state.posts);
    
    useEffect(() => {
        dispatch(fetchPost(id))
    },[dispatch, id])

    return {loading, error, record}
}

export default usePostDetails