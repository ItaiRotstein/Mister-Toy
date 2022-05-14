import { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import { loadToys, removeToy, filterToy, setUserMsg } from '../store/actions/toy.action'
import { ToyList } from '../cmps/toy-list'
import { ToySort } from '../cmps/toy-sort'
import { ToyLables } from '../cmps/toy-lables'

class _ToyApp extends Component {

    componentDidMount() {
        this.loadToys()
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.filterBy) !== JSON.stringify(this.props.filterBy)) {
            this.loadToys()
        }
    }

    loadToys = () => {
        this.props.loadToys()
    }

    onRemoveToy = (ev, toyId) => {
        ev.stopPropagation()
        this.props.removeToy(toyId)
            .then(() => {
                setUserMsg({
                    type: 'success', txt: 'Toy Removed Successfully'
                })
            })
    }

    onSort = (sort) => {
        let { filterBy } = this.props
        filterBy = { ...filterBy, sort: sort.value }
        this.props.filterToy(filterBy)
    }

    onLabels = (labels) => {
        labels = labels.map(label => label.value)
        let { filterBy } = this.props
        filterBy = { ...filterBy, labels }
        this.props.filterToy(filterBy)
    }

    onGoToDetails = (toyId) => {
        this.props.history.push(`/toy/${toyId}`)
    }

    render() {

        const { toys, filterBy } = this.props
        return (
            <main className="toy-app main-layout">
                <div className="app-controls flex space-between align-center">
                    <ToyLables filterBy={filterBy} onLabels={this.onLabels} />
                    <Link className="btn" to="/toy/edit">Add Toy ➕</Link>
                    <ToySort onSort={this.onSort} />
                </div>
                <ToyList toys={toys} onRemoveToy={this.onRemoveToy} onGoToDetails={this.onGoToDetails}/>
            </main>
        )
    }
}

function mapStateToProps(storeState) {
    return {
        toys: storeState.toyModule.toys,
        filterBy: storeState.toyModule.filterBy
    }
}
const mapDispatchToProps = {
    loadToys,
    removeToy,
    filterToy,
    setUserMsg
}

export const ToyApp = connect(mapStateToProps, mapDispatchToProps)(_ToyApp)