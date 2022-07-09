
const userValidation = (schema) => async(req,res,next)=>{

const body = req.body;
try {
    await schema.validate(body)
 console.log('Ingreso exitoso')
    next()
    
} catch (error) {
    const errorName = error.name
    const errorDescription = error.errors
    console.log('error de validacion')
    return res.render('login.ejs',{message:` ${error.errors}`,error:true})
}

}

module.exports = userValidation ;