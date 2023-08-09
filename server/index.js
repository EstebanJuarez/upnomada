import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { login } from './controllers/authController.js';
import roleRoute from "./routes/roleRoutes.js"

import routerFlights from './routes/vuelosRoutes.js'

import routerPublicacion from './routes/publicacionRoutes.js';

import routeUser from './routes/userRoutes.js';

import stripeRoute from './routes/stripeRoute.js';
const app = express();


app.use(cors());
app.use(express.static('uploads'));
app.use(express.urlencoded({ extended: false }));
app.use('/stripe', stripeRoute)
app.use(express.json());

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
  console.log('Tamaño de la solicitud:', req.headers['content-length']);
  next();
});



app.use('/flights', routerFlights)
app.use('/publicaciones', routerPublicacion)

app.use('/user', routeUser)
app.use('/role', roleRoute)
app.post('/login', login);




app.get('/', (req, res) => {

  res.send('Hola mundo');
});

app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});
