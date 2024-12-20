const express = require('express');
// const router = require('./routes/route.js');
const routerUser = require('./routes/routeUser.js');
const routerCompany = require('./routes/routeCompany.js');
const routerImage = require('./routes/routeImage.js');
const routerService = require('./routes/routeService.js');
const routerJob = require('./routes/routeJob.js');
const routerNews = require('./routes/routeNews.js');
const routerCSR = require('./routes/routeCSR.js');
const routerAuth = require('./routes/routeAuth.js');
const routerBanner = require('./routes/routeBanner.js');
const routerContact = require('./routes/routeContact.js');
const routerMission = require('./routes/routeMission.js');
const routerContactForm = require('./routes/routeContactForm.js');
const routerProducts = require('./routes/routeProducts.js');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./data/db.js');

const app = express();

dotenv.config();

app.use(cors({
  origin: 'http://174.16.10.135:5173', // Your frontend app's IP and port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Authenticate all user routes
app.use('/auth', routerAuth);


// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));

//User routes
app.use('/user', routerUser);

//Company routes
app.use('/company', routerCompany);

//Image routes
app.use('/image', routerImage);

//Service routes
app.use('/service', routerService);

//Job routes
app.use('/job', routerJob);

//News routes
app.use('/news', routerNews);

//CSR routes
app.use('/csr', routerCSR);

//Banner routes
app.use('/banner', routerBanner);

//Contact routes
app.use('/contact', routerContact);

//Mission routes
app.use('/mission', routerMission);

//Contact Form routes
app.use('/form', routerContactForm);

//Product routes
app.use('/product', routerProducts);

// app.use('/api', router);

const port = process.env.PORT || 3000;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});3