require('dotenv').config();
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res
        .status(401)
        .send({ message: 'Authorization required!' });
    }

    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      console.log("token from try", token);
      payload = jwt.verify(token,
        NODE_ENV === 'production' ? JWT_SECRET : 'secret',
        (err, data) => {
          if (err) return reject(err);
          return resolve(data);}

        );

    } catch (err) {
      console.log("auth no");
      return res
        .status(401)
        .send({ message: 'Authorization required!!!'+err.message });
    }

    req.user = payload;
    next();
};