
import { storageService } from './async-storage.service.js'
// import syncStorageService from './storage.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'toy'
// export const PAGE_SIZE = 4

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]
const gReviews = [
    {
        title: 'I am in love',
        createdAt: 1651264511453,
        txt: 'Every kid loves coco melon and my kids love them too much. I got this for my toddler but my 5 year old loves it way more. This is the best block toy set I\'ve seen so far. It has all kind of blocks big or small. It includes so many other pieces. It comes with JJ and Ms. Appleberry too which makes it more special because kids are so used to see them on the songs. The blocks are helping my toddler for his development. He stacks them and takes them off. It has the cutest see- saw. My daughter who loves watching tv otherwise, spends time with her brother building this academy and I\'m so so happy. I recommend this to everyone who has kids.'
    },
    {
        title: 'Very cute!',
        createdAt: 1652314511453,
        txt: 'My 2 year old absolutely loves cocomelon and he\'s also always trying to play with his older brother legos but the pieces are too complicated for him still. This set is the perfect way to combine his love for building and his love for Cocomelon. There are plenty of pieces for him to create new things daily and the big blocks are perfect for his little hands. Everything snaps together easily so he doesn\'t get frustrated like he tends to with regular Legos. I love that it includes all of the main characters from the show as well. We have had this set for a couple of weeks now and there hasn\'t been a day that he didn\'t play with it!'
    },
    {
        title: 'Awesome set',
        createdAt: 1652264511453,
        txt: 'This Cocomelon set is awesome. My 4 year old loves to build things and this set comes with a ton of blocks. He has a similar set of blocks from another brand and they are pretty much identical so he is able to use both sets at once and has plenty of blocks for his creations. This one is nice because it comes in a container with a lid, and the lid itself is like a huge foundation piece so it has more than one use. He also likes the little characters that this set comes with and the other items like trees, door, gate, teeter totter, etc. that his other sets dont have. Its been a big hit in our house and I would definitely recommend this toy to anyone with a child that loves to build things.'
    },
    {
        title: 'Deserves more stars',
        createdAt: 1651394511453,
        txt: 'This product is amazing. It encourages my children to use their imagination. It even has a storage box when they are done--because organization and cleaning up is always a problem. The blocks are huge and they fit however you use them, which makes it perfect for younger kids learning to build blocks. The colors make it so bright and cheerful. The top is used as a base to stack the blocks. There are numbers and cute animals. My favorite are the birds. Overall, I highly recommend. Awesome product!'
    },

]
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

function getLabels() {
    return labels
}


function query(filterBy = { txt: '' }) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regex.test(toy.name))
            }

            if (filterBy.labels.length > 0) {
                // console.log('filterBy.labels', filterBy)
                toys = toys.filter(toy => toy.labels.some(label => filterBy.labels.includes(label.toLowerCase())))
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
        .then(toy => ({ ...toy, reviews: gReviews }))
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
        price: '',
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


