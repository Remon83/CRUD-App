import {
    Button,
    ButtonGroup,
} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom"

const PostListItem = ({data, loading, error, deleteRecord, isLoggedIn}) => {
    const navigate = useNavigate();
    const deleteHandler = (item) => {
        if (window.confirm(`Do you really want to delete ${item.title}?`)) {
            deleteRecord(item.id)            
        }
    }
    const record = data.map((el, idx) => {
        return (
            <tr key={el.id}>
                    <td>#{++idx}</td>
                    <td>
                        <Link to={`post/${el.id}`}>{el.title}</Link></td>
                    <td>
                        <ButtonGroup aria-label="Basic example">
                            <Button variant="success" onClick={() => navigate(`post/${el.id}/edit`)}>Edit</Button>
                            <Button variant="danger" onClick={() => deleteHandler(el)} disabled={isLoggedIn}>Delete</Button>
                        </ButtonGroup>
                    </td>
                </tr>
        )
    })
    return (
        <>
            {record}
        </>
    )
}

export default PostListItem