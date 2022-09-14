# Desafio Testeando nuestra API

## Inicio
En este desaio realizaremos la tercer entrega del proyecto final en el cual tendremos registros mediante passport, mensajeria con nodemailer y twilio, 
profiling con artillery, loggers con log4js, activacion de cluster y deploy en heroku.
Ademas tambien conjunto al desafio de arquitectura por capas el cual sera realizado en este mismo, refactorizaremos todo el codigo y dividiremos en capas
para mejorar el entendimiento del mismo y cada parte funcional.
Ademas utilizaremos DTOs para transportar la informacion y modificarla al realizar las consultas con la base de datos de MongoDB.

## Test
### Routes:
- /store
- /cart
- /home
- /logIn
- /logOut
- /signIn
- /account
### Testing By:
- Axios
- Mocha
- Chai
- Supertest

## DAOs
La utlizamos para heredar en cada tipo de clase todas las funciones nativas de la base de datos que sea seleccionada, tiene relacion directa con los methodos que se utilizan normalmente en para conectar directamente con la base de datos.
La aplicamos en:
- Carts
- Products
- Sessions
- Users

## Patron Factory
Se encarga de la creacion de las classes para cada tipo y dependiendo de una variable de entornoi para utilizar una u otra base de datos, por defecto se crea en mongoDB.
La aplicamos en:
- Carts
- Products
- Sessions
- Users

## Patron Repository
Es donde guardamos las funciones para consulktar directamente con la base de datos, una capa antes de la de persistencia.
Lo aplicamos en:
- Carts
- Products
- Sessions
- Users

## DTOs
Determina la composicion de los datos para cada tipo de esquema.
Lo aplicamos en:
- Carts
- Products
- Sessions
- Users

## Arquitectura por capas
- Database
- Controllers
- Services
- Routes
- Server

## Formularios

### Formulario de registro 
- Permite registrar un usuario y asiganar sus datos a la sesion
- Valida que el usuario no este ya creado, de estarlo no enviara el formulario y mostrara un mensaje
- En caso de ingresar datos no validos o que correspondan a los requeridos por el esquema el formulario no se enviara y mostrara un mensaje

### Formulario de inicio de sesion
- Permite poder reingresar a la tienda en caso de ya haber creado un usuario
- Este mismo mediante el email y password valida que en la base de datos se encuentre ese usuario, de lo contrario moctrara un mensaje
- Si la sesion expira esta misma devolvera al home por lo que la unica forma de poder volver a ingresar es mediante el inicio de sesion

## Tienda
Dentro de la tienda tendremos las opciones:
- Como administrador de agregar, eliminar o editar productos
- Como cliente de agregar productos al carrito, eliminarlos y finalizar la compra

### Navbar de tienda
La navbar tendra los botones de redireccionamiento:
#### Boton de log out
Redireccionara a una ruta la cual borrara los datos del usuario que se encuentran en la session excepto la cookie que servira como enlace para volver a iniciar la secion mediante el vinculo de ella con el usuario.
#### Boton de eliminar usuario
Redireccionara a una ruta la cual eliminara el usuario de la base de datos como asi tambien la sesion
#### Boton de Account
Redireccionara a la cuenta del perfil con su informacion

## Validaciones
- Mediante yup y un middleware vamos a tener la validacion de los datos que ingresemos en el formularion antes de que nos redireccione a la tienda
- Tambien tendremos otro middleware que verificara los permisos y si la sesion todavia esta activa, de lo contrario redirigira al login
- Los esquemas nos brindaran mas seguridad a la hora de enviar los datos como asi tambien tendremos las coookies firmadas
- Mediante passport manejaremos los inicios y registros del usuario brinndando una serie de condiconales que permitira evitar errores a la hora de utilizar la app web
- Utilizando bcrypt podremos enviar una contrasena encriptada hacia la base de datos cuando se registra un usuario, de esta manera aumentado la seguridad y minimizando los riesgos, las clave encriptadas luego mediante metodos sera comparada a la hora de iniciar sesion para poder evaluar si pertenece al usuario anteriormente registrado



## Tecnologías
- Node Js
- Express Js
- EJS
- Bootstrap
- Css
- Mongoose
- MongoDB Atlas
- Connect-mongo
- Yup
- Passport-local
- Bcrypt
- Artillery
- Log4s
- Cluster
- Heroku
- Twilio
- Nodemailer

