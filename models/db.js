const Sequelize = require('sequelize');

// Conexão com banco
const sequelize = new Sequelize('nome-do-seu-banco','seu-usuario','sua-senha', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}