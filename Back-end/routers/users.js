
const NeDB = require('nedb');

let db = new NeDB({
    filename: "users.db",
    autoload: true

});

// exporto todo meu documento para poder ser utilizado por outros arquivos JS
module.exports = app => {

    const route = app.route("/users");
    // rota do tipo get
    route.get((request, response) => {
        db.find({}).sort({ name: 1 }).exec((error, users) => {
            if (error) {
                app.utils.error.send(error, request, response);
            } else {
                response.status(200);
                response.json({
                    users
                });
            }

        });;
    });

    // exemplo de rota post
    route.post((request, response) => {
        
        if(!app.utils.validator.user(app, request, response)) {
            return false;
        }
        /*
             faz o insert do objeto JSON passado como primeiro parametro, o segundo parametro 
            é uma função CALLBACK, que recebe o erro (caso haja) e o 
            objeto inserido no banco de dados (caso tenha sido inserido)
         */
        db.insert(request.body, (error, user) => {
            if (error) {
                app.utils.error.send(error, request, response);
            } else {
                response.status(200).json(user);
            }

        });
    });
    const routeAdmin = app.route("users/admin");
    // rota do tipo get
    routeAdmin.get((request, response) => {
        response.statusCode = 200;
        response.setHeader('Content-type', 'application/json');
        response.json({
            admin: [{
                name: "Admin",
                email: 'email@admin.com',
                id: 2

            }]
        })
    });

    // rotas recebendo id como parametro
    const routeId = app.route('/users/:id');
    routeId.get((request, response) => {
        db.findOne({ _id: request.params.id }).exec((error, user) => {
            if (error) {
                app.utils.error.send(error, request, response);
            } else {
                response.status(200).json(
                    { user }
                );
            }
        });
    });

    // rota de alteração de dados
    routeId.put((request, response) => {
        db.update({ _id: request.params.id }, request.body, error => {
            if (error) {
                app.utils.error.send(error, request, response);
            } else {
                response.status(200).json(
                    Object.assign(request.params, request.body)
                );
            }
        });
    });
    routeId.delete((request, response) => {
        db.remove({ _id: request.params.id }, {}, error => {
            if (error) {
                app.util.error.send(error, request, response);
            } else {
                response.status(200).json({
                    id: request.params.id
                });
            }
        });

    });


};