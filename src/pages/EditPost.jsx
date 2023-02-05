import Loading from "../components/Loading";
import usePostDetails from "../hooks/use-post-details";
import {Form, Button} from 'react-bootstrap';
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { editPost } from "../state/postSlice";
import { useNavigate } from "react-router-dom";
import { clearRecord } from "../state/postSlice";
import withGuard from "../util/withGuard"

const EditPost = () => {
    const {loading, error, record} = usePostDetails();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editPost({id: record.id, title: title, description}))
        .unwrap()
        .then(() => navigate("/"))
        .catch((error) => console.log(error));;
    }

    useEffect(() => {
        if (record) {
            // console.log('render')
            setTitle(record?.title);
            setDescription(record?.description);
            
        }
    }, [record])

    useEffect(() => {
        return () => {
            dispatch(clearRecord());
        }
    }, [dispatch])

    console.log(title);
    return (
        <Loading loading={loading} error={error}>
            <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Desription</Form.Label>
                <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)}/>
            </Form.Group>
            <Loading loading={loading} error={error} >
                <Button variant="primary" type='submit'>Submit</Button>
            </Loading>
            </Form>

        </Loading>
    )
}

export default withGuard(EditPost);