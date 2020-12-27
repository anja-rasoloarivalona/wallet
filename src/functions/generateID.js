import { v4 as uuid } from 'uuid'
const generateID = () => {
    return uuid().replace(/-/g, '').toUpperCase()
}

export {
    generateID
}