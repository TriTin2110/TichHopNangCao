let getAll = (req, res) => { 
        res.send('Get All User!')
}

let getByUsername = (req, res) => {
        res.send('Get User By Username!')
}

let insert = (req, res) => {
        res.send('Insert User!')
}

let remove = (req, res) => {
        res.send('Delete User!')
}

let update = (req, res) => {
        res.send('Update User!')
}

export default { getAll, getByUsername, insert, remove, update }