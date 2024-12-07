# Proyecto Docker Networking - API y Cliente
## 🎓 POLITÉCNICO GRANCOLOMBIANO

Este proyecto demuestra cómo configurar y ejecutar dos contenedores de Docker (API y Cliente) que se comunican entre sí usando **Docker Compose** y **redes personalizadas**. Cada servicio es una aplicación Node.js sencilla y se exponen en los puertos 3000 y 4000, respectivamente.



## 📝 Requisitos

- **Docker** y **Docker Compose** instalados en tu sistema.



## 📂 Estructura del Proyecto

docker-networking ├── api │ ├── app.js │ ├── package.json │ └── Dockerfile ├── client │ ├── app.js │ ├── package.json │ └── Dockerfile └── docker-compose.yml


##  🔩 Configuración y Ejecución del Proyecto

### 1. **Clonar el Repositorio**
   git clone https://github.com/tu-usuario/docker-networking.git
   

### 2. **Construir y Levantar los Contenedores**

Ejecuta el siguiente comando en la raíz del proyecto para construir y levantar los contenedores:

  docker-compose up --build

### 3. **Verificar la Comunicación entre Servicios**

✅ Abre tu navegador y visita: http://localhost:4000

✅ Deberías ver el mensaje: Client received message: Hello from API!

