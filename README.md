# Agenda de Turnos De Servicios

Ver 1.5.0

Este es un sistema de gestión de turnos desarrollado para trabajar junto al ERP de Tango Gestion de Axoft, que permite a los usuarios gestionar turnos de manera eficiente.
Proyecto que centraliza la toma de turnos de los diversos servicios de las unidades de negocio.

## PRODUCTO:

- Agenda de uso compartido desarrollada enteramente WEB para el uso de las diferentes áreas de la empresa, a la cual se podrá acceder para consultar y/o tomar turnos referentes a:
- Uso de salas funerarias para velación.
- Uso de Salas y Cámaras para depósito.
- Servicios Parques.
- Ceremonias en los parques. 
- Retiros por parte del centro operativo.
- Apertura para otras entidades a definir.

## USUARIOS:

- Contact Centers, Directores Funerarios, Intendentes de Parques, asesores funerarios, administrativas parques, Personal de los centros operativos, Operaciones, Atención al Cliente.

## Particularidades

- Un turno es la conjunción establecida entre un Servicio específico brindado en una unidad de negocio  determinada durante un periodo de tiempo establecido a un cliente en particular.
- Cada Turno posee campos detalle a determinar en el binomio unidad de negocio - servicio, por ejemplo:
	- Sala Velatorio - Velación.
		- Relación con Presupuesto CRM.
		- Servicios Auxiliares a Prestar.
	- Servicios Parques – Cremación:
		- Relación con Pedido de Servicio CRM.
	- Parcelas – Inhumación:
		- Código de Parcela.
		- Ubicación en parcela
- Cada Turno tiene la posibilidad dependiendo de la unidad de negocio y el servicio, de indicarle Servicios Adicionales en cada turno.
	- Velatorio:
		- Cafetería.
		- Personal Auxiliar.
	- Cremación:
		- Con responso.
		- Capilla.
		- Misa con música.
- Los turnos poseen reglas particulares que surgen de la relación Unidad de Negocio -  Servicio.
- Cada campo o dato dentro del turno posee una regla de verificación que se aplica al momento de guardar o modificar el turno.
- Cada Turno posee estados seleccionables determinables en reglas y por unidad de negocio - servicio.
- Existe una lógica de ejecución de los turno programable.
- Cada turno posee dos actores, un iniciador y un autorizador, pudiendo ser el mismo dependiendo del servicio y la unidad de negocio. Por ejemplo, Principal puede reservar salas en Malabia, siendo el primero el iniciador y el segundo el autorizador. En caso que Malabia deba reservar turno en sus salas, ambos roles se unen.
- Cada turno posee un tiempo de validez determinable en cada uno de los estados.
- Los diferentes cambios de estados envían correos para mejorar el flujo de datos, pudiéndose agregar correos con copias especiales a determinados estados, por ejemplo, un turno confirmado que envíe una copia al clúster o el DF en particular.


## Características

- Gestión de usuarios con diferentes roles y permisos.
- Gestión de turnos: creación, modificación y eliminación.
- Visualización de turnos en un calendario.
- Notificaciones automáticas por correo electrónico.
- Interfaz de usuario simple e intuitiva.
  
## Tecnologías utilizadas

- **Backend**: Laravel 8.x (PHP)
- **Frontend**: React 17.x (JavaScript)
- **Base de datos**: MySQL
- **Autenticación**: JWT (JSON Web Token)
- **Estilos**: Bootstrap

## Requisitos previos

Antes de comenzar, asegúrate de tener lo siguiente instalado:

- **PHP 7.4 o superior**
- **Composer**
- **Node.js y npm**
- **MySQL**

## Instalación

### Backend (Laravel)

1. Clona este repositorio:
   git clone https://github.com/jgomezbau/Agenda-de-Turnos-JDP.git
2. Dirígete al directorio del proyecto:
	cd Agenda-de-Turnos-JDP/src
3. Instala las dependencias de PHP:
	composer install
4. Copia el archivo .env.example y renómbralo a .env:
	cp .env.example .env
5. Configura las variables de entorno en el archivo .env, como la base de datos, el servidor de correo, etc.
6. Genera una clave de aplicación:
	php artisan key:generate
7.Crea la base de datos en MySQL y migra las tablas:
	php artisan migrate
8. Opcional: Pueblar la base de datos con datos de prueba (seeders):
	php artisan db:seed
9.Inicia el servidor de desarrollo de Laravel:
	php artisan serve

### Frontend (React)

1. Dirígete a la carpeta de React dentro del proyecto:
	cd frontend
2. Instala las dependencias de JavaScript:
	npm install
3. Inicia el servidor de desarrollo de React:
	npm start

## Uso

1. Accede a la aplicación en tu navegador visitando http://localhost:8000 para el backend (Laravel) y http://localhost:3000 para el frontend (React).
2. Inicia sesión con las credenciales de administrador o crea una cuenta si es necesario.
3. Gestiona los turnos, clientes y usuarios desde el panel de administración.
4. la selección del entorno de Desarrollo o Produccion se realiza en el archivo .env, alli debe indicarse la IP correspondiente que luego sera cargada como constante dentro del sistema al momento de la ejecución.

## Tests

1. Para ejecutar los tests del backend (Laravel), utiliza el siguiente comando:
	php artisan test
2. Para ejecutar los tests del frontend (React), utiliza:
	npm test

## Contribuciones

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Realiza un fork de este repositorio.
2. Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
3. Realiza tus cambios y haz un commit (git commit -am 'Añadir nueva funcionalidad').
4. Envía tus cambios a la rama (git push origin feature/nueva-funcionalidad).
5. Abre un pull request para revisar tu aporte.

## Licencia

Este proyecto está licenciado bajo la MIT License. """

Save to a file
with open("/mnt/data/README.md", "w") as file: file.write(readme_content)


