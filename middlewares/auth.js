var jwt = require('jsonwebtoken')

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;

const isLogin = (req, res, next) => {
  if (req.session.user == null || req.session.user == undefined) {
    req.flash('alertMessage', 'Session telah habis silahkan signin kembali!!');
    req.flash('alertStatus', 'danger');
    res.redirect('/admin/signin');
  } else {
    next();
  }
}

module.exports = isLogin;