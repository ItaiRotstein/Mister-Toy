import {Component} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import moment from 'moment';

import { toyService } from "../services/toy.service"
import { removeToy } from '../store/actions/toy.action'

class _ToyDetails extends Component {

    state = {
        toy: null
    }

    componentDidMount() {
        const { toyId } = this.props.match.params
        toyService.getById(toyId)
            .then(toy => {
                if (!toy) this.onGoBack()
                this.setState({ toy }, () => console.log(toy))
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

    render() {
        const { toy } = this.state
        if (!toy) return <div>Loading toy...</div>
        const inStockClass = (toy.inStock) ? 'in' : 'out'
        return (
            <section>
                <section className="toy-details">
                    <img src={toy.imgUrl} />
                    <div className="details-container">
                        <h3>{toy.name}</h3>
                        <p>Price: <span>{toy.price}</span></p>
                        <p>Labels: <span>{toy.labels}</span></p>
                        <p>In-Stock: <span className={inStockClass}></span></p>
                        <p>Created at: {moment(toy.createdAt).format("MMM Do YY")}</p>
                        <div className="flex space-between">
                            <Link className="btn-warning-small" onClick={() => this.onRemoveToy(toy._id)}>x</Link>
                            <Link className="btn-small" to={`/toy/edit/${toy._id}`}>Edit</Link>
                            <Link className="btn-small" onClick={this.onGoBack}>←</Link>
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
}

export const ToyDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ToyDetails)