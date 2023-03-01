"use strict";
import { AuthenticationException } from '@adonisjs/auth/build/standalone';
import Perfil from 'App/Models/Perfil';



class Admin {
  async handle({ auth }, next) {
    const user = await auth.user;
    const perfil = await Perfil.findBy("id_usuario", user.id);

    if (!perfil || perfil.descripcion_perfil !== "Admin")
        throw new AuthenticationException(
            'Necesitas ser Admin para acceder a esta ruta',
            'E_UNAUTHORIZED_ACCESS',
        )

    await next();
  }
}

module.exports = Admin;