const express = require ('express')
const router = express.Router()
const UsersModel = require('../models/users')

// routing endpoint main user
router.get('/', async(req, res) => {
    const users = await UsersModel.findAll()
    res.status(200).json({
        data: users,
        metadata:"Test user endpoint"
    })
})

// post
router.post('/', async(req,res)=>{
    const {nip, nama, password} = req.body

    const users = await UsersModel.create({
        nip, nama, password
    })
    res.status(200).json({
        data: users,
        metadata:"Test post endpoint"
    })
})

// put
router.put('/', async(req,res)=>{
    const {nip, nama, password, passwordBaru} = req.body

    const userData = await UsersModel.findOne({
        where: {nip: nip}
    })

    console.log(userData)

    if (userData.password === password){
        const users = await UsersModel.update({
            nama, password: passwordBaru
        },{
            where: {nip: nip}
        })

        res.json({
            userData
        })
    } else{
        
    res.json({
        error:"data invalid"
    })
    }
})

module.exports = router 