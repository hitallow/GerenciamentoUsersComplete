module.exports = {
    send: (error , request , response , code = 400)=>{
        console.log(`Error : ${error}`);
        response.status(code).json({
            error
        });

    }
}