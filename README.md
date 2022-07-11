# Valentin_Ruggieri_Authorization_And_Authentication

## Funcionamiento

![Video de funcionamiento de la App](https://media.giphy.com/media/EA5gWo2cq9cOybAz5H/giphy.gif)

## Inicio
En este desaio partiremos del anterior desafio basico de inicio y registro de sesiones para poder migrar a otra herramienta la cual sera passport que mediante sus funcionalidades, junto con el encriptaminento de las claves, nos daran una aplicacion web mas segura.

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
La tienda no tendra funcionalidad por que no es el objetivo del desafio, pero constara de una navbar con la cual tendremos interaccion
### Navbar de tienda
La navbar tendra la informacion del usuario creado y tambien dos botones de redireccionamiento:
#### Boton de log out
Redireccionara a una ruta la cual borrara los datos del usuario que se encuentran en la session excepto la cookie que servira como enlace para volver a iniciar la secion mediante el vinculo de ella con el usuario.
#### Boton de eliminar usuario
Redireccionara a una ruta la cual eliminara el usuario de la base de datos como asi tambien la sesion


## Validaciones
- Mediante yup y un middleware vamos a tener la validacion de los datos que ingresemos en el formularion antes de que nos redireccione a la tienda
- Tambien tendremos otro middleware que verificara los permisos y si la sesion todavia esta activa, de lo contrario redirigira al login
- Los esquemas nos brindaran mas seguridad a la hora de enviar los datos como asi tambien tendremos las coookies firmadas
- Mediante passport manejaremos los inicios y registros del usuario brinndando una serie de condiconales que permitira evitar errores a la hora de utilizar la app web
- Utilizando bcrypt podremos enviar una contrasena encriptada hacia la base de datos cuando se registra un usuario, de esta manera aumentado la seguridad y minimizando los riesgos, las clave encriptadas luego mediante metodos sera comparada a la hora de iniciar sesion para poder evaluar si pertenece al usuario anteriormente registrado

 ## Herraminetas y su uso en la app
 
  - Css y Bootstrap para poder realizar el maquetado, diseno y animaciones de nuestro proyecto
  - Mongoose para las consultas con la base de datos MongoDB atlas
  - Faker js para poder generar un mock de productos aleatorios
  - Connect-mongo para crear la session del usuario
  - Yup para el esquemna de validaciones del formulario
  - Dotenv para poder utilizar las claves guardadas en .env
  - Passport para manejar los inicios y registro de sesiones
  - Bcrypt para poder encriptar las contrasenas del usuario
  
 

## Tecnologías
- Node Js
- Express Js
- EJS
- Bootstrap
- Css
- Faker js
- Mongoose
- MongoDB Atlas
- Connect-mongo
- Yup
- Passport-local
- Bcrypt
