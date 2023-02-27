import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'

export default class BooksController {

    public async store({request}: HttpContextContract){
        try{
            const title = request.input('title');
            const author = request.input('author');
            const editorial = request.input('editorial');
            const no_de_paginas = request.input('no_de_paginas');
            const id_usuario = request.input('id_usuario');

            const book = new Book();
            book.title = title;
            book.author = author;
            book.editorial = editorial;
            book.no_de_paginas = no_de_paginas;
            book.id_usuario = id_usuario;
            await book.save();

            return{
                "Libro": book,
                "msg": "Registro ingresado correctamente",
                "estado": 200
            }
        }catch (error){
            console.log(error)
            return{
                "msg": "No se pudo ingresar el registro",
                "estado": 401
            }
        }
    }

    public async index(){
        const books = await Book.query();
        return books;
    }

    public async show({params}: HttpContextContract){
        try{
            const book = await Book.find(params.id);
            if (book){
                return book;
            }else{
                return{
                    "msg": "Registro no existe",
                    "estado": 404
                }
            }
        }catch (error){
            console.log(error)
        }
    }

    public async update({request, params}: HttpContextContract){
        const book = await Book.find(params.id);
        if (book){
            book.title = request.input('title');
            book.author = request.input('author');
            if (await book.save()){
                return{
                    "msg": "Registro actualizado correctamente",
                    book
                }
            
            }else{
                return{
                    "msg": "No se pudo actualizar",
                    "estado": 401
                }
            }
        }else {
            return{
                "msg": "Registro no encontrado",
                "estado": 401
            }
        }
    }

    public async eliminarLibro({params}: HttpContextContract){
        await Book.query().where("id", params.id).delete()
        return{
            "msg": "Libro eliminado correctamente",
            "estado": 200
        }
    }
}
