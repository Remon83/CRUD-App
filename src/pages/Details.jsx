import Loading from "../components/Loading";
import usePostDetails from "../hooks/use-post-details";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearRecord } from "../state/postSlice";

const Details = () => {
    const {loading, error, record} = usePostDetails();
    const dispatch = useDispatch();
    // console.log(record); 

    useEffect(() => {
        return () => {
            dispatch(clearRecord());
        }
    }, [dispatch])

    return (
        <div>
            <Loading loading={loading} error={error}>
                <p>Title: {record?.title}</p>
                <p>Description: {record?.description}</p>
            </Loading>
        </div>
    )
}

export default Details;