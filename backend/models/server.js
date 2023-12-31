const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.js');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            authPath:           '/api/auth',
            categoriasPath:     '/api/categorias',
            usuariosPath:       '/api/usuarios',
            productosPath:      '/api/productos',
            rolPath:            '/api/rol',
            pedidosPath:        '/api/pedidos'
        }

        // Conectar a la base de datos MONGODB
        this.connectDB();

        // Middlewares
        this.middlewares();

        //Routing
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        // CORS
        this.app.use(cors());

        // Leer y parsear JSON en BODY
        this.app.use(express.json());

        // PUBLIC DIRECTORY
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.paths.authPath, require('../routes/auth.routes.js'));
        this.app.use(this.paths.usuariosPath, require('../routes/usuario.routes.js'));
        this.app.use(this.paths.categoriasPath, require('../routes/categoria.routes.js'));
        this.app.use(this.paths.productosPath, require('../routes/productos.routes.js'));
        this.app.use(this.paths.rolPath, require('../routes/rol.routes.js'));
        this.app.use(this.paths.pedidosPath, require('../routes/pedido.routes.js'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`SERVER RUNNING ON PORT: ${this.port}`);
        })
    }
}

module.exports = Server;