import Select, { components } from 'react-select'

import { toyService } from '../services/toy.service'


import PropTypes from "prop-types"

function ToyLables({ onLabels, filterBy }) {

    const options = toyService.getLabels().map(label => {
        return {
            value: label.toLowerCase(),
            label: label
        }
    })

    return (
        <div className='toy-sort' style={{ width: '200px' }}>
            <Select
                options={options}
                value={filterBy.lables}
                onChange={onLabels}
                placeholder="Labels" 
                isMulti={true}
            />
        </div>
    )
}

ToyLables.propTypes = {
    onLabels: PropTypes.func.isRequired,
    filterBy: PropTypes.object.isRequired
}

export {ToyLables}