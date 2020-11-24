# Api delilah_resto

🔧 Api Delilah Resto Acamica

Tercer Proyecto de la carrera Desarrollo Web Full Stack en Acamica.


⚙️ Procedimiento :

## 1 - Instalación 🔩

Clonar proyecto desde la consola :

⌨️ git clone https://github.com/Leandrouno/delilah_resto 

## 2 - Instalación de dependencias 🔩


⌨️ npm install

## 3 - Crear base de datos 🔩


Importar el Archivo delilah.sql desde el panel de Administracion
Recuerde Editar el archivo configuracion/configuracion.js con los datos de su entorno.

## 4 - Iniciar el servidor 🔩


Abrir el archivo servidor.js desde VisualStudio y ejecutar en terminal :

⌨️ nodemon servidor.js

## 5 - Ya podes Utitlizar el Sistema ! 🔩


📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌


## 6 - Podes ver Algunos endpoint para Postman desde el siguiente link:
https://github.com/Leandrouno/delilah_resto/blob/main/Delilah.postman_collection.json

## 7 Descargate el YAML


## 8 ENDPOINT

localhost:3000/v1

| Metodo |       Enpoint      |           Body	        	|                  Descripcion                           |
|--------|--------------------|-----------------------------|--------------------------------------------------------|
|   GET  | /login             |{usuario,contraseña}		    | Devuelve el Token del Usuario                          |
|   GET  | /usuarios          |{token}						| Devuelve Informacion de todos los usuarios             |
|   GET  | /usuarios          |{usuario ,token}				| Devuelve informacion de un Usuario 					 |
|  POST  | /usuarios          |{ usuario, nombre, apellido, | Crea un Usuario                                        |
|		 |					  |	email, contrasena, telefono,|                                                        |
|		 |					  | domicilio  }          		|					                                     |
|   PUT  | /usuarios          |{ usuario, nombre, apellido, | Modifica un Usuario                   (Solo Admin)     |
|        | 				      |	email, contrasena, telefono,|                                                        |
|		 |					  | domicilio ,token }    		|                                                        |
| DELETE | /usuarios          |{usuario ,token}	        	| Elimina un usuario                    (Solo Admin)     |
|--------|--------------------|-----------------------------|--------------------------------------------------------|
|   GET  | /productos         |                      	    | Devuelve todos los productos                           |
|   GET  | /productos         | {nombre}               	    | Devuelve los productos que contengan la palabra buscada|
|  POST  | /productos         |{ nombre, precio, imagen,    | Crea un Producto                      (Solo Admin)     |
|		 |					  |	descripcion ,token }        |                                                        |
|  PUT   | /productos         |{ id, nombre, precio, imagen,| Modifica un Producto                   (Solo Admin)    |
|		 |					  |	descripcion ,token }        |                                                        |
| DELETE | /productos         |{id ,token}	        	    | Elimina un producto                   (Solo Admin)     |
|--------|--------------------|-----------------------------|--------------------------------------------------------|
|  GET   | /pedidos           |{token}						| Muestra pedidos (si es Admin muestra todos )		     |
|  POST  | /pedidos      	  |{total, id_usuario,          | Crea un Pedido                                         |
|		 |					  | productos[                  |                                                        |
|		 |					  |{id_producto,cantidad,       |                                                        |
|		 |					  | nombre_producto,precio}]    |                                                        |
|		 |				 	  |,token }        				|                                                        |
|  PUT   | /pedidos			  |{ estado , id_pedido, token }| Permite editar el Estado del Pedido   (Solo Admin)     |
| DELETE | /pedidos           |{id ,token}	        	    | Elimina un pedido                     (Solo Admin)     |
|--------|--------------------|-----------------------------|--------------------------------------------------------|


