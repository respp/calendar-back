const { response } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { generateJWT } = require('../helpers/jwt')

const createUser = async(req, res = response)=>{

    const { name, email, password } = req.body

    try {
        let user = await User.findOne({ email })

        if( user  ){
            return res.status(400).json({
                ok:false,
                msg:'El usuario ya existe'
            })
        }


        user = new User( req.body )

        //hash
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, bcrypt.genSalt)
    
        await user.save()

        //Generar JWT
        const token = await generateJWT( user.id, user.name )
    
        res.status(201).json({
            ok:true,
            uid:user.id,
            name:user.name,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'por favor hable con el admin'
        })
        
    }

}

const loginUser = async(req, res = response)=>{
    const { email, password } = req.body

    try {
        let user = await User.findOne({ email })

        if( !user  ){
            return res.status(400).json({
                ok:false,
                msg:'el usuario no existe con ese email'
            })
        }

        //Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, user.password )

        if( !validPassword  ){
            return res.status(400).json({
                ok:false,
                msg:'contraseña incorrecta'
            })
        }

        //Generar JWT
        const token = await generateJWT( user.id, user.name )
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'por favor hable con el admin'
        })
    }
}

const renewToken = async(req, res = response)=>{
    const { uid, name } = req

    //generar un nuevo jwt
    const token = await generateJWT(uid, name)
    console.log(token)

    res.json({
        "ok":true,
        token
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}