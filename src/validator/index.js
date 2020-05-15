exports.userSingupValidator = (request, response, next) =>{

    request.check("name", "Nome é obrigatório").notEmpty();
    request.check("email", "O email deve possuir de 3 à 32 caracteres")
            .matches(/.+\@.+\..+/)
            .withMessage("email deve conter @")
            .isLength({
                min:4,
                max:42
            });
    request.check("password", "password é obrigatório").notEmpty();
    request.check("password")
            .isLength({min:6})
            .withMessage("O password deve conter no minimo 6 caracters")
            .matches(/\d/)
            .withMessage("Password deve conter um numero")
        
        const  erros = request.validationErrors();
        if(erros){
            const firstError = erros.map(error => error.msg)[0];
            return response.status(400).json({error: firstError});
        }
        next();
}