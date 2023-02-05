import {Form, Button} from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../state/postSlice';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import withGuard from '../util/withGuard';

const AddPost = (props) => {
    console.log(props);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading, error} = useSelector(state => state.posts)

    const submitHandler = (e) => {
        e.preventDefault();
        const id = Math.floor(Math.random() * 500);
        dispatch(addPost({id, title, description}))
        .unwrap()
        .then(() => navigate("/"))
        .catch((error) => console.log(error));
    }
    return (
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
    )
}

export default withGuard(AddPost);