import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {

    public async listarUsuarios(){
        const usuarios = await User.query();
        return usuarios;
    }

    public async buscarUsuario({params}: HttpContextContract){
        try{
            const usuario = await User.find(params.id);
            if (usuario){
                return usuario;
            }else{
                return{
                    "msg": "Usuario no existe",
                    "estado": 404
                }
            }
        }catch (error){
            console.log(error)
           return{
                "msg": "Error en el servidor",
                "estado": 500
           }
        }
    }

    public async actualizarUsuario({request, params}: HttpContextContract){
        const usuario = await User.find(params.id);
        if (usuario){
            const dataUsuario = request.only([
                'no_identificacion', 'tipo_identificacion', 'nombres', 'apellidos', 'email', 'direccion', 
                'barrio', 'municipio', 'departamento', 'password','perfil'
                ])

            usuario.merge(dataUsuario);
            
            if (await usuario.save()){
                return{
                    "msg": "Usuario actualizado correctamente",
                    usuario
                }
            
            }else{
                return{
                    "msg": "No se pudo actualizar",
                    "estado": 401
                }
            }
        }else {
            return{
                "msg": "Usuario no existe",
                "estado": 404
            }
        }
    }

    public async eliminarUsuario({params}: HttpContextContract){
        await User.query().where("id", params.id).delete()
        return{
            "msg": "Usuario eliminado correctamente",
            "estado": 200
        }
    }


}
