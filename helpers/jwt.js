const jwt = require('jsonwebtoken')

const generateJWT =( uid, name )=>{

    return new Promise((res, rej)=>{

        const payload = { uid, name }

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token)=>{

            if( err ){
                console.log(err)
                rej('no se puede generar el token')
            }

            res( token )
        })
    })
}

module.exports={
    generateJWT
}