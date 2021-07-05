/**
 * Required External Modules
 */
 import express from 'express';
 import { json, urlencoded } from  'body-parser';
 import { NodeRouter } from './NodeRouter';
 import mongoose from 'mongoose';

 /**
  * App Variables
  */
 const app = express();
 const router =  NodeRouter();
 mongoose.connect("mongodb://127.0.0.1:27017/grocerydb", { useNewUrlParser: true });
 const db = mongoose.connection;

 db.on('connected', () => {
   console.log('Db connected');
 });


 db.on('error', (err) => {
  console.log('connection error:', err);
});
/**
  *  App Configuration
  */
 // app.use(cors);
 app.use(json());
 app.use(urlencoded({ extended: false }));
 app.use('/api', router);
 
 
 /**
  * Server Activation
  */
 const PORT: Number = 7000;
 app.listen(PORT,() =>{
     console.log(`app is listening on Port: ${PORT}`);
 })