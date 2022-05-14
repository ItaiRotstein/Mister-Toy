import { Link } from "react-router-dom"
import moment from 'moment';
import Rating from '@mui/material/Rating';

export function ToyPreview({ toy, onRemoveToy, onGoToDetails }) {
    return (
        <div className="toy-preview" >
            <div className="img-container">
                <img src={toy.imgUrl} onClick={() => onGoToDetails(toy._id)}/>
            </div>
            <div className="details flex column">
                <h4 onClick={() => onGoToDetails(toy._id)}>{toy.name}</h4>
                <p className="preview-price">Price: <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(toy.price)}</span></p>
                <p className="preview-createdAt">Created: <span>{moment(toy.createdAt).fromNow()}</span></p>
                <div className="actions flex space-between">
                    <button className="btn-warning" onClick={(ev) => onRemoveToy(ev, toy._id)}>x</button>
                    <Link to={`/toy/edit/${toy._id}`} onClick={(ev) => ev.stopPropagation()} className="btn">Edit</Link>
                </div>
                <Rating name="read-only" value={toy.rating} readOnly />
            </div>
        </div>
    )
}