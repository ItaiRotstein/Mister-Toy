
import { storageService } from './async-storage.service.js'
// import syncStorageService from './storage.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'toy'
// export const PAGE_SIZE = 4

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getLabels
    // getPageSize,
    // getToysLength,
}

function getLabels(){
    return labels
}


function query(filterBy = { txt: '' }) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regex.test(toy.name))
            }

            if (filterBy.labels.length>0) {
                // console.log('filterBy.labels', filterBy)
                toys = toys.filter(toy => toy.labels.some(label=>filterBy.labels.includes(label.toLowerCase())))
            }

            switch (filterBy.sort) {
                case 'name':
                    toys.sort((a, b) => a.name.localeCompare(b.name))
                    break
                case 'price':
                    toys.sort((a, b) => a.price - b.price)
                    break
                case 'createdAt':
                    toys.sort((a, b) => a.createdAt - b.createdAt)
                    break
            }

            // const startIdx = filterBy.pageIdx * PAGE_SIZE;
            // toys = toys.slice(startIdx, startIdx + PAGE_SIZE)


            return toys
        })

}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
    }
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        createdAt: Date.now(),
        inStock: true,
        imgUrl: require('../assets/img/toy.png')
    }
}

// function getPageSize() {
//     return PAGE_SIZE
// }

// function getToysLength() {
//     return syncStorageService.loadFromStorage(STORAGE_KEY).length
// }

// TEST DATA
// storageService.post(STORAGE_KEY, {
//     _id: 't101',
//     name: 'Talking Doll',
//     price: 123,
//     labels: ['Doll', 'Battery Powered', 'Baby'],
//     createdAt: 1631031801011,
//     inStock: true
// }).then(x => console.log(x))


