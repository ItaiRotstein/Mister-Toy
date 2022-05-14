import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"

import { toyService } from "../services/toy.service"
import { removeToy } from '../store/actions/toy.action'

class _ToyDetails extends React.Component {

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

    render() {
        const { toy } = this.state
        if (!toy) return <div>Loading toy...</div>
        const inStockClass = (toy.inStock) ? 'in' : 'out'
        return (
            <section className="toy-details">
                <img src={toy.imgUrl} />
                <div className="details-container">
                    <h3>Details</h3>
                    <h4>{toy.name}</h4>
                    <p>Price: <span>{toy.price}</span></p>
                    <p>Labels: <span>{toy.labels}</span></p>
                    <p>In-Stock: <span className={inStockClass}></span></p>
                    <div className="flex space-between">
                        <Link className="btn-warning-small" onClick={() => this.onRemoveToy(toy._id)}>x</Link>
                        <Link className="btn-small" to={`/toy/edit/${toy._id}`}>Edit</Link>
                        <Link className="btn-small" onClick={this.onGoBack}>←</Link>
                    </div>
                </div>
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