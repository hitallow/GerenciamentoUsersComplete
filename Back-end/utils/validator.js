module.exports = {
    user : (app, request, response)=>{
        request.assert("name", "O nome é obrigatório").notEmpty();
        request.assert("email", "O e-mail é obrigatório").notEmpty();
        request.assert("e-mail",'O email deve ser válido').isEmail();
        let error = request.validationErrors();
        if(error){
            app.utils.error.send(error, request, response);
            return false;
        }
        return true;
    }
}