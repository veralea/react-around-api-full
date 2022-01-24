const allowedCors = [
  'https://veralea.students.nomoreparties.sbs',
  'http://veralea.students.nomoreparties.sbs',
  'https://www.veralea.students.nomoreparties.sbs',
  'http://www.veralea.students.nomoreparties.sbs',
  'http://localhost:3000',
  'http://localhost:3001',

];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.send();
  }
  next();
};