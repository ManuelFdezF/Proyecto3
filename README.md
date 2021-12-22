# Proyecto3
CrossfitAPP

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

Una vez dentro se encontrará con los siguientes apartados:
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
