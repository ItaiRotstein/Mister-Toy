import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import moment from 'moment';
import Rating from '@mui/material/Rating';

import { toyService } from "../services/toy.service"
import { removeToy, saveToy } from '../store/actions/toy.action'

class _ToyDetails extends Component {

    state = {
        toy: null
    }

    componentDidMount() {
        const { toyId } = this.props.match.params
        toyService.getById(toyId)
            .then(toy => {
                if (!toy) this.onGoBack()
                this.setState({ toy })
            })
    }

    onRemoveToy = (toyId) => {
        this.props.removeToy(toyId)
            .then(() => {
                this.onGoBack()
            })

    }

    onGoBack = () => {
        this.props.history.push('/toy')
    }

    onSetRating = (value) => {
        this.setState({ toy: { ...this.state.toy, rating: value } }, () =>
            this.props.saveToy(this.state.toy))
    }

    render() {
        const { toy } = this.state
        if (!toy) return <div>Loading toy...</div>
        const inStockClass = (toy.inStock) ? 'in' : 'out'
        return (
            <section className="toy-details">
                <section className="toy-details-main-container">
                    <img src={toy.imgUrl} />
                    <div className="details-container">
                        <h3>{toy.name}</h3>
                        <h4>Price: <span className="regular">{toy.price}</span></h4>
                        <h4>Labels: <span className="regular">{toy.labels}</span></h4>
                        <h4>In-Stock: <span className={inStockClass}></span></h4>
                        <h4>Created at: <span className="regular">{moment(toy.createdAt).format("MMM Do YY")}</span></h4>
                        <Rating
                            name="simple-controlled"
                            value={toy.rating}
                            onChange={(ev, newValue) => {
                                this.onSetRating(newValue);
                            }}
                        />
                        <div className="flex space-between">
                            <button className="btn-warning-small" onClick={() => this.onRemoveToy(toy._id)}>x</button>
                            <Link className="btn-small" to={`/toy/edit/${toy._id}`}>Edit</Link>
                            <button className="btn-small" onClick={this.onGoBack}>←</button>
                        </div>
                    </div>
                </section>
                <ul className="toy-reviews clean-list">
                    {toy.reviews.map((review, idx) => {
                        return (
                            <li key={idx}>
                                <h4>{review.title}</h4>
                                <h5>{moment(review.createdAt).fromNow()}</h5>
                                <p>{review.txt}</p>
                            </li>
                        )
                    })}
                </ul>
            </section>
        )
    }

}

const mapStateToProps = (storeState) => {
    return {}
}

const mapDispatchToProps = {
    removeToy,
    saveToy
}

export const ToyDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ToyDetails)