import React from "react";
import { connect } from "react-redux";
import Select from 'react-select'

import { toyService } from "../services/toy.service"
import { saveToy, loadToys } from '../store/actions/toy.action'

class _ToyEdit extends React.Component {

    state = {
        toy: null,
        labels: toyService.getLabels()
    }

    componentDidMount() {
        const { toyId } = this.props.match.params
        if (!toyId) {
            this.setState({ toy: toyService.getEmptyToy() })
            return
        }
        toyService.getById(toyId)
            .then(toy => {
                if (!toy) this.onGoBack()
                this.setState({ toy })
            })
    }

    onGoBack = () => {
        this.props.history.goBack();
    }

    onHandleChange = ({ target }) => {
        const field = target.name
        this.setState({ toy: { ...this.state.toy, [field]: target.value } })
    }

    onHandleSubmit = (ev) => {
        ev.preventDefault()
    }

    onToggleCheckBox = ({ target: { value, checked } }) => {
        let labels = [...this.state.toy.labels]
        if (checked) labels.push(value)
        else labels = labels.filter(label => label !== value)

        this.setState((prevState) => ({ toy: { ...prevState.toy, labels } }))
    }

    onSaveToy = (ev) => {
        ev.preventDefault()
        const toyToSave = { ...this.state.toy }
        toyService.save(toyToSave)
            .then(() => {
                this.onGoBack()
            })
    }

    onStock = ({ value }) => {
        this.setState(({ toy: { ...this.state.toy, inStock: value } }))
    }

    render() {
        const { toy, labels } = this.state
        if (!toy) return <div>Loading...</div>
        const options = [
            { value: true, label: 'In Stock' },
            { value: false, label: 'Out Of Stock' }
        ]
        const defaultIdx = options.findIndex(o => o.value === toy.inStock)
        return (
            <section className="toy-edit flex justify-center">
                <form onSubmit={this.onSaveToy}>
                    <ul className="toy-edit-list clean-list flex column">
                        <li className="toy-edit-item">
                            <label htmlFor="toy-title"><h3>Name</h3></label>
                            <input type="text" name="name" value={toy.name} id="toy-title" onChange={this.onHandleChange} required />
                        </li>
                        <li className="toy-edit-item">
                            <label htmlFor="toy-price"><h3>Price</h3></label>
                            <input name="price" type="number" id='toy-price' onChange={this.onHandleChange} value={toy.price} />
                        </li>
                        <li>
                            <Select options={options} onChange={this.onStock} defaultValue={options[defaultIdx]} placeholder="Stock" />
                        </li>
                        <li>
                            <ul className="clean-list">
                                {labels.map((label, idx) => {
                                    return (
                                        <li key={idx}>
                                            <label className="checkbox-container" htmlFor={label}>{label}
                                                <input type="checkbox" id={label} onChange={this.onToggleCheckBox} value={label} checked={toy.labels.includes(label)} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                        <li>
                            <div className="flex space-between">
                                <button className="btn-small">Save</button>
                                <button className="btn-small" onClick={this.onGoBack}>←</button>
                            </div>
                        </li>
                    </ul>
                </form>
            </section>
        )
    }

}

const mapStateToProps = (storeState) => {
    return {}
}

const mapDispatchToProps = {
    saveToy,
    loadToys,
}

export const ToyEdit = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ToyEdit)