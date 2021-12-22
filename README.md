# Proyecto3 - CrossFitAPP V1.0
## Descripción

En este proyecto creamos una aplicación para un Box de Crossfit para que sus usuarios puedan reservar las clases diarias, llevar un registro de sus marcas personales, ver WODs famosos y pagar la cuota mensual.

Existirán dos tipos de usuarios. Administrador y usuario cliente. Cada uno de ellos podrá hacer lo siguiente:

 * __Administrador:__
    * *Gestión de usuarios:*
El administrador es el encargado de crear los usuarios clientes. Cuando cree un usuario nuevo, se enviará vía email una invitación al usuario para que entre a la aplicación con las credenciales recibidas comunicándole que modifique la contraseña. 
También puede eliminar cuentas de usuario

    * *Gestiona las clases:* 
Es el encargado de crear el calendario de clases en el que incluirá la fecha, la hora y el número de personas que pueden apuntarse

    * *Gestiona el entreno diario:* 
Crea el entreno diario que se mostrará al usuario cuando vaya a reservar una plaza de la clase.

    * *Gestiona el apartado Marcas Personales:*
Crea los nombres de ejercicios en los cuales el usuario introducirá sus resultados
     

* __Usuario cliente:__
El usuario recibirá vía email una invitación por parte del propietario para que acceda a la aplicación utilizando las credenciales que le llegan y teniendo que cambiar la contraseña una vez entre.

   * *Perfil:*
En el que podrá modificar su nombre, apellido, foto y contraseña. También podrá eliminar su cuenta

   * *Reserva de clases:* 
Se verá el listado de clases del día para elegir la hora que más le convenga, la descripción del entreno del día y el listado (foto) de usuarios que ya estén apuntados (si los hubiera). Habrá un botón de “Reservar” en cada hora.
En caso de que estés apuntado en una clase aparecerá el botón “Borrar” para quitarte de la clase.

   * *Marcas Personales:*
En este apartado el usuario podrá llevar el registro de su progresión en cuando a “pesos”.
Una vez dentro existe un listado de ejercicios introducidos por el usuario administrador en el que entrando en cada uno de ellos podemos añadir tantas veces como queramos: Fecha, repeticiones y peso. 
De esta forma cuando haya datos y entremos en un ejercicio en concreto se verá el listado de las notas que hayamos añadido.

   * *Pagos:*
Para que el usuario cliente pague la mensualidad

   * *Salir:* 
Para “desloguearse” de la aplicación

## Descripción técnica

__Rutas de USUARIO (UserRouter.js)__
* __Usuario Administrador__
   * *Registrar usuario.* “/register” – El Administrador de la aplicación registrará los usuarios introduciendo un nombre, apellido, email y contraseña. Una vez creado, al usuario le llegará un correo electrónico con los datos de acceso.


* __Usuario__ 
   * *Loguear un usuario.* “/login” – Los usuarios se loguearán para acceder a la aplicación introduciendo el email y contraseña que han recibido por email.
   * *Ver perfil de usuario.* “/profile” – Los usuarios pueden ver los datos de su perfil
   * *Modificar perfil de usuario.* “/updateProfile” – Se podrán actualizar los datos del perfil
   * *Subir imagen de perfil.* “/upload” – Se utilizará para subir la foto de perfil de usuario.
   * *Eliminar un usuario.* “/deleteUser” – Los usuarios podrán eliminar su cuenta de la base de datos

__Rutas de WOD (WodsRouter.js)__

* __Usuario Administrador__
   * *Crear un WOD.* “/createWod” – Se crearán entrenos que van en un apartado para que los usuarios puedan consultarlos.
   * *Actualizar WOD.* “/updateWod/:id” – Se podrá actualizar el WOD que se haya pasado su ID por params.
   * *Eliminar un WOD.* “/deleteWod/:id” – Se eliminará el WOD que hayamos pasado su ID por params.

* __Usuario__
   * *Listar WOD.* “/wodsList” – Los usuarios podrán ver todos los wods que estén creados 

__Rutas de CLASES (ClassesRouter.js)__
* __Usuario Administrador__
   * *Crear una clase.* “/createClass” – Se podrá crear una clase indicando la fecha y el entreno de día
   * *Modificar una clase.* “/updateClass/:id” – Se podrá modificar la clase que hayamos indicado por params su ID.
   * *Eliminar una clase.* “/deleteClass/:id” – Se eliminará la clase que hayamos introducido su ID por params

* __Usuario__
   * *Listar Clases con horario.* "/classesList/:id" - Se podrá listar la clase que pasemos su ID por params y veremos los datos de la clase y sus horarios.

__Rutas de Horarios (TimeTableRouter.js)__

* __Usuario Administrador__
   * *Crear un horario.* "/createTime/:dateID" - Se crea un horario para una fecha de clase específica que pasaremos por params y el número de personas que podrán apuntarse a la clase.
   * *Modificar horario.* "/updateTime/:id" - Se modifica el horario o el número de personas de la clase pasando su ID por params.
   * *Eliminar horario.* "/deleteTime/:id" - Se elimina el horario pasado por params.







