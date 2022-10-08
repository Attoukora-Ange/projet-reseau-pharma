const JWT = require("jsonwebtoken");

const createToken = (payload) => {
  const token = JWT.sign(payload, process.env.JWT_KEY, { expiresIn: 1*24*60*60*1000 });
  return token;
};

const verifieToken = (req, res, next) => {
  const payload = req.cookies.access_token;
  console.log(payload)
  if (!payload) {
    return res.status(500).json( {SESSION_EXPIRE : "Veuillez vous connecté"});
  }
  try {
    const data = JWT.verify(payload, process.env.JWT_KEY);
    req.user = data;
    return next();
  } catch {
    return res.status(403).json({SESSION_EXPIRE : "La session à expirée"});
  }
};

const verifieTokenJWT = (req, res, next) => {
  const payload = req.cookies.access_token;
  if (!payload) {
    console.log('pas token')
    // return res.status(500).json( {SESSION_EXPIRE : "Veuillez vous connecté"});
  }
  try {
    const data = JWT.verify(payload, process.env.JWT_KEY);
    req.user = data;
    return res.status(200).json(req.user._id) ;
  } catch {
    console.log('pas token')
    // return res.status(403).json({SESSION_EXPIRE : "La session à expirée"});
  }
};


module.exports = { createToken, verifieToken, verifieTokenJWT };
