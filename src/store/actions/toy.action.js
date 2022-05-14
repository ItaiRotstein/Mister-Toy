import { toyService } from "../../services/toy.service"

import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service'

export function loadToys() { // Action Creator
    return (dispatch, getState) => {
        const filterBy = getState().toyModule.filterBy
        return toyService.query(filterBy)
            .then(toys => {
                const action = {
                    type: 'SET_TOYS',
                    toys
                }
                dispatch(action)
            })
            .catch(err => {
                console.error('Error:', err)
                showErrorMsg('Cannot load toys')
            })
    }
}

export function removeToy(toyId) { // Action Creator
    return dispatch => {
        return toyService.remove(toyId)
            .then(() => {
                dispatch({
                    type: 'REMOVE_TOY',
                    toyId
                })
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                console.error('Error:', err)
                showErrorMsg('Cannot remove toy')
            })
    }
}

export function saveToy(toy) { // Action Creator
    return dispatch => {
        const actionType = (toy._id) ? 'SAVE_TOY' : 'ADD_TOY'
        return toyService.save(toy)
            .then(savedToy => {
                dispatch({ type: actionType, toy: savedToy })
                showSuccessMsg('Toy saved')
            })
            .catch(err => {
                console.error('Error:', err)
                showErrorMsg('Cannot save toy')
            })
    }
}

export function filterToy(filterBy) {
    return dispatch => {
        return Promise.resolve(
            dispatch({ type: 'SET_FILTERBY', filterBy })    
        )
    }
}

export function setRating(value) {
    return dispatch => {
        return Promise.resolve(
            dispatch({ type: 'SET_RATING', value })    
        )
    }
}