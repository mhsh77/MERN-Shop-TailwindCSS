const dotenv = require('dotenv');
//Setting up config file
dotenv.config({path: 'backend/config/config.env'})
const app = require('./app');
const connectDatabase = require('./config/database')



//handle uncuaght expections
process.on('uncaughtException', err =>{
    console.log(`ERROR: ${err.message}`);
    console.log(`Server Shutting down due to uncaughtException`);
    server.close(() =>{
        process.exit(1)
    })
})




//Connecting to DB
connectDatabase();

const server= app.listen(process.env.PORT,()=>{
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})
// handling unhandeld prodmises
process.on('unhandledRejection', err =>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandeld Promise rejection');
    server.close(() =>{
        process.exit(1)
    }) 
})
