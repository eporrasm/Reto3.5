import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perfil from 'App/Models/Perfil'

export default class PerfilsController {

    public async registrarPerfil({request}: HttpContextContract){
        const descripcion_perfil = request.input('descripcion_perfil');
        const id_usuario = request.input('id_usuario');

        const perfil = new Perfil();
        perfil.descripcion_perfil = descripcion_perfil;
        perfil.id_usuario = id_usuario;

        await perfil.save();

        return{
            "Perfil": perfil,
            "msg": "Perfil ingresado correctamente",
            "estado": 200
        }
    }

    public async listarPerfiles(){
        const perfiles = await Perfil.query();
        return perfiles;
    }

    public async buscarPerfil({params}: HttpContextContract){
        try{
            const perfil = await Perfil.find(params.id);
            if (perfil){
                return perfil;
            }else{
                return{
                    "msg": "Perfil no existe",
                    "estado": 404
                }
            }
        }catch (error){
            console.log(error)
        }
    }

    public async actualizarPerfil({request, params}: HttpContextContract){
        const perfil = await Perfil.find(params.id);
        if (perfil){
            perfil.descripcion_perfil = request.input('descripcion_perfil');
            if (await perfil.save()){
                return{
                    "msg": "Perfil actualizado correctamente",
                    perfil
                }
            
            }else{
                return{
                    "msg": "No se pudo actualizar",
                    "estado": 401
                }
            }
        }else {
            return{
                "msg": "Perfil no existe",
                "estado": 404
            }
        }
    }
    public async eliminarPerfil({params}: HttpContextContract){
        await Perfil.query().where("id", params.id).delete()
        return{
            "msg": "Perfil eliminado correctamente",
            "estado": 200
        }
}
}
