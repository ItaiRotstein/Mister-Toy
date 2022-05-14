import { Link } from "react-router-dom"
import moment from 'moment';

export function ToyPreview({ toy, onRemoveToy, onGoToDetails }) {
    return (
        <div className="toy-preview" onClick={() => onGoToDetails(toy._id)}>
            <div className="img-container">
                <img src={toy.imgUrl} />
            </div>
            <div className="details">
                <h4>{toy.name}</h4>
                <p className="price">Price: <span>{toy.price}</span></p>
                <p className="preview-createdAt">Created: <span>{moment(toy.createdAt).fromNow()}</span></p>
                <div className="actions flex space-between">
                    <button className="btn-warning" onClick={(ev) => onRemoveToy(ev, toy._id)}>x</button>
                    <Link onClick={(ev) => ev.stopPropagation()} className="btn" to={`/toy/edit/${toy._id}`}>Edit</Link>
                </div>
            </div>
        </div>
    )
}