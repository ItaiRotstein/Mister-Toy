export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

function query(entityType, delay = 200) {
    var entities = JSON.parse(localStorage.getItem(entityType))
    if (!entities) {
        entities = _createToys()
        _save(entityType, entities)
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(entities)
        }, delay)
    })
}


function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}
function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}



function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}


function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function _createToys() {
    const toys = [{
        _id: _makeId(4),
        name: "Funko Pop Tv The Office Collectors Set 1",
        price: 28.90,
        labels: ["Box game", "Art"],
        createdAt: 1652364577453,
        inStock: true,
        imgUrl: 'https://slimages.macysassets.com/is/image/MCY/products/0/optimized/16294340_fpx.tif'
    },
    {
        _id: _makeId(4),
        name: "Barbie Pink Collection Doll",
        price: 85.00,
        labels: ["Doll"],
        createdAt: 1652364511453,
        inStock: true,
        imgUrl: 'https://slimages.macysassets.com/is/image/MCY/products/8/optimized/18775298_fpx.tif'
    },
    {
        _id: _makeId(4),
        name: "The Learning Journey Lift and Learn Abc Puzzle",
        price: 12.99,
        labels: ["Puzzle"],
        createdAt: 1652364511453,
        inStock: true,
        imgUrl: 'https://slimages.macysassets.com/is/image/MCY/products/0/optimized/15163050_fpx.tif'
    },
    {
        _id: _makeId(4),
        name: "My First Baby Boy Doll",
        price: 19.99,
        labels: ["Doll", "baby", ""],
        createdAt: 1652364511453,
        inStock: true,
        imgUrl: 'https://slimages.macysassets.com/is/image/MCY/products/6/optimized/18205436_fpx.tif'
    },
    {
        _id: _makeId(4),
        name: "Mermaid Magic Ariel Doll",
        price: 29.99,
        labels: ["baby", "On wheels"],
        createdAt: 1652314511453,
        inStock: true,
        imgUrl: 'https://slimages.macysassets.com/is/image/MCY/products/4/optimized/18205514_fpx.tif'
    },
    {
        _id: _makeId(4),
        name: "Play-Doh Starter Set",
        price: 8.79,
        labels: ["baby", "Outdoor"],
        createdAt: 1652314511453,
        inStock: true,
        imgUrl: 'https://slimages.macysassets.com/is/image/MCY/products/8/optimized/18680038_fpx.tif'
    }
    ]
    return toys
}
