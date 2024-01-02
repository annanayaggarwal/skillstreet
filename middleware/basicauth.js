const basicAuth = require('basic-auth');

const basicAuthMiddleware = (req, res, next) => {
  const user = basicAuth(req);

  if (!user || user.name !== 'yourUsername' || user.pass !== 'yourPassword') {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    next();
  }
};

module.exports = basicAuthMiddleware;
