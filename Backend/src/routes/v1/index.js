const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const doctorRoute = require('./doctor.route');
const consultRoute = require('./consult.route');
const prescriptionRoute = require('./prescription.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/doctors',
    route: doctorRoute,
  },
  {
    path: '/consult',
    route: consultRoute,
  }, {
    path: '/prescription',
    route: prescriptionRoute,
  }, {
    path: '/hospital',
    route: require('./hospital.route'),
  }, {
    path: '/ml',
    route: require('./ml.route'),
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
