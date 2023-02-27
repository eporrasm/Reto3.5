/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post("/register", "AuthController.register");
  Route.post("/login", "AuthController.login");
  Route.get("/listar", "UsersController.listarUsuarios");
  Route.get("/buscar/:id", "UsersController.buscarUsuario");
  Route.put("/actualizar/:id", "UsersController.actualizarUsuario");
  Route.delete("/eliminar/:id", "UsersController.eliminarUsuario");

  
  Route.post("registrar-perfil", "PerfilsController.registrarPerfil");
  Route.get("listar-perfiles", "PerfilsController.listarPerfiles");
  Route.get("buscar-perfil/:id", "PerfilsController.buscarPerfil");
  Route.put("actualizar-perfil/:id", "PerfilsController.actualizarPerfil");
  Route.delete("eliminar-perfil/:id", "PerfilsController.eliminarPerfil");

  Route.group(() =>{
    Route.get("/books", "BooksController.index");
    Route.get("/books/:id", "BooksController.show");
    Route.put("/books/update/:id", "BooksController.update");
    Route.post("/books", "BooksController.store");
    Route.post("/books/delete/:id", "BooksController.eliminarLibro");
  }).middleware("auth");

}).prefix("api");

