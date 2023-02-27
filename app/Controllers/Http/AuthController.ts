import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {

    public async register ({request, response, auth}: HttpContextContract) { 
        const dataUsuario = request.only([
        'no_identificacion', 'tipo_identificacion', 'nombres', 'apellidos', 'email', 'direccion', 
        'barrio', 'municipio', 'departamento', 'password','perfil'
        ])
        try {
            const codigoUsuario = dataUsuario.no_identificacion;
            const usuarioExistente: Number = await this.getValidarUsuarioExistente(codigoUsuario) 
            if (usuarioExistente === 0) {
            const user = new User();
            user.no_identificacion = dataUsuario.no_identificacion;
            user.tipo_identificacion = dataUsuario.tipo_identificacion;
            user.nombres = dataUsuario.nombres;
            user.apellidos = dataUsuario.apellidos;
            user.email = dataUsuario.email;
            user.direccion = dataUsuario.direccion;
            user.barrio = dataUsuario.barrio;
            user.municipio = dataUsuario.municipio;
            user.departamento = dataUsuario.departamento;
            user.password = dataUsuario.password;
            user.perfil = dataUsuario.perfil;
            await user.save();
            const token = await auth.use('api').login(user, {
                expiresIn: "10 days"
            })
            return{
                token,
                "msg": "Usuario registrado correctamente"
            }
            } else {
            response.status(400).json({"msg": "Error, el usuario ya se encuentra registrado"})
            }
        } catch(e){
            console.log(e)
            response.status(500).json({"msg":"Error en el servidor !!"})
        }
    }

    private async getValidarUsuarioExistente(no_identificacion: Number): Promise<Number>{
        const total = await User.query().where({"no_identificacion": no_identificacion}).count('*').from('users');
        return parseInt(total[0]["count"]);
    }

    public async login({auth, request, response}: HttpContextContract){
        const email = request.input("email");
        const password = request.input("password");
        try {
            const token = await auth.use('api').attempt(email, password, {
                expiresIn: "60 mins"
            });
            return{
                token,
                "msg": "Login exitoso"
            } 
        } catch (e){
            console.log(e);
            response.unauthorized("Credenciales invalidas")
        }
    }
}
