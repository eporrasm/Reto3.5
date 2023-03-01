"use strict";
import { AuthenticationException } from '@adonisjs/auth/build/standalone';
import Perfil from 'App/Models/Perfil';



class Premium {
  async handle({ auth }, next) {
    const user = await auth.user;
    const perfil = await Perfil.findBy("id_usuario", user.id);

    if (!perfil || perfil.descripcion_perfil !== "Usuario Premium")
        throw new AuthenticationException(
            'Necesitas ser Usuario Premium para acceder a esta ruta',
            'E_UNAUTHORIZED_ACCESS',
        )

    await next();
  }
}

module.exports = Premium;