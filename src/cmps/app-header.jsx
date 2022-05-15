import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Component } from 'react'

import { filterToy } from '../store/actions/toy.action'
import { ToyFilter } from './toy-filter'
class _AppHeader extends Component {

    onHandleChange = (ev) => {
        const key = ev.target.name
        const { value } = ev.target
        let { filterBy } = this.props
        filterBy = { ...filterBy, [key]: value }
        this.props.filterToy(filterBy)
    }

    render() {
        const { filterBy } = this.props
        return (
            <header className='app-header'>
                <div className='header-img-container'></div>
                <div className='header-container'>
                    <img className='logo-img' src={require('../assets/img/toy.png')} />
                    <ToyFilter filterBy={filterBy} onHandleChange={this.onHandleChange} />
                    <nav className='flex space-between'>
                        <Link to='/'>Home</Link>
                        <Link to='/about'>About</Link>
                        <Link to='/toy'>Our Toys</Link>
                        <Link to='/toy/edit'>Add Toy</Link>
                    </nav>
                    <h1>Mister Toy</h1>
                </div>
            </header>
        )
    }

}

function mapStateToProps(storeState) {
    return {
        filterBy: storeState.toyModule.filterBy,
    }
}
const mapDispatchToProps = {
    filterToy,
}

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)
