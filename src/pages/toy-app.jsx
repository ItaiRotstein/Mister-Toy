import { Component } from "react";
import { connect } from "react-redux";
import Select from 'react-select'

import { loadToys, removeToy, filterToy } from '../store/actions/toy.action'
import { ToyList } from '../cmps/toy-list'
import { ToySort } from '../cmps/toy-sort'
import { ToyLables } from '../cmps/toy-lables'
import { ToyInStock } from '../cmps/toy-instock'

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
            .then(() => { })
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

    onInStock = ({ value }) => {
        let { filterBy } = this.props
        filterBy = { ...filterBy, inStock: value }
        this.props.filterToy(filterBy)
    }

    render() {
        const { toys, filterBy } = this.props
        return (
            <main className="toy-app main-layout">
                <div className="app-controls flex space-between align-center">
                    <ToyLables filterBy={filterBy} onLabels={this.onLabels} />
                    <ToyInStock onInStock={this.onInStock}/>
                    <ToySort onSort={this.onSort} />
                </div>
                <ToyList toys={toys} onRemoveToy={this.onRemoveToy} onGoToDetails={this.onGoToDetails} />
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
}

export const ToyApp = connect(mapStateToProps, mapDispatchToProps)(_ToyApp)