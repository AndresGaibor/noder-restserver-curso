const jwt = require('jsonwebtoken');

// VERIFICAR TOKEN

let checkToken = (req, res, next) => {
   let token = req.get('Authorization');

   jwt.verify(token, process.env.SEED, (err, decoded) => {
      if (err) {
         return res.status(401).json({
            token,
            ok: false,
            error: {
               message: 'Token no valido'
            }
         })
      }

      req.usuario = decoded.usuario;
      next();

   })
}

// Verificar AdminRole

let checkAdminRole = (req, res, next) => {
   let role = req.usuario.role;
      
   if(role === 'ADMIN_ROLE')
      next();
   else
      return res.status(401).json({
         ok: false,
         error: {
            message: 'El usuario no es administrador'
         }
      })
}

module.exports = {
    checkToken, checkAdminRole
}