
// Importa la clase Sequelize desde el paquete 'sequelize'
import { Sequelize } from 'sequelize';

// Crea una nueva instancia de Sequelize para conectarse a la base de datos
const sequelize = new Sequelize('Ecommerce', 'root', 'petshop', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
});

// Exporta la instancia 'sequelize' para que pueda ser utilizada en otros archivos
export default sequelize; // Exporta la instancia 'sequelize' para que pueda ser utilizada en otros archivos
