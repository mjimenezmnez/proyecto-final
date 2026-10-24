# 🎬💖 ChismeCine - Proyecto Final 

**ChismeCine** es una aplicación web para buscar películas, consultar sus detalles y compartir opiniones mediante comentarios.

El proyecto está inspirado en los antiguos juegos de chicas de páginas como **juegosdechicas.com**. Quería recuperar esa estética más divertida y nostálgica, con tonos rosas, corazones, estrellas y elementos decorativos, adaptándola a una aplicación relacionada con el cine.

## ✨ Funcionalidades

- 🔎 Buscar películas por título y año.
- 🪪 Buscar películas mediante su ID de IMDb.
- 🎞️ Consultar la ficha de una película: póster, título, año, género, actores y descripción.
- 💬 Publicar comentarios y consultar los de otros usuarios.
- 💾 Guardar los comentarios en una base de datos SQLite.

## 🛠️ Tecnologías

- **Frontend:** HTML, CSS, JavaScript, Tailwind CSS y DaisyUI.
- **Backend:** Python siguiendo el patrón MVC y Framework FastAPI.
- **Base de datos:** SQLite.
- **API externa:** [OMDb API](https://www.omdbapi.com/).

## 📁 Estructura del proyecto

```text
proyecto-final/
├── back/
│   ├── main.py
│   ├── controller.py
│   ├── consultas.py
│   ├── conexion.py
│   ├── query_bbdd.sql
│   ├── requests_omdbapi.py
│   └── bbdd_peliculas.db
├── front/
│   ├── css/style.css
│   ├── js/app.js
│   └── index.html
├── .env.example
├── .gitignore
├── requirements.txt
└── readme.md
```

## 🚀 Instalación y ejecución

### 1. Descargar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
cd proyecto-final
```

Sustituye `URL_DEL_REPOSITORIO` por la dirección de tu repositorio de GitHub.

### 2. Crear y activar el entorno virtual

Puede ser con: `python`, `python3` o `py`.

**macOS / Linux**

```bash
python3 -m venv entorno
source entorno/bin/activate
```

**Windows (CMD)**

```bat
py -m venv entorno
entorno\Scripts\activate.bat
```

**Windows (PowerShell)**

```powershell
py -m venv entorno
.\entorno\Scripts\Activate.ps1
```

### 3. Instalar las dependencias

Con el entorno virtual activado:

```bash
python -m pip install -r requirements.txt
```

### 4. Configurar la API de OMDb

Es necesario disponer de una clave de OMDb API para buscar películas.

En la carpeta raíz del proyecto, cambia el nombre de `.env.expample` a `.env` y sigue los pasos del propio documento.

**macOS / Linux**

```bash
cp .env.example .env
```

**Windows (CMD o PowerShell)**

```bat
copy .env.example .env
```

Abrir el archivo `.env` y añadir una clave válida:

```text
API_KEY='tu_apikey'
```

Sustituir `TU_CLAVE_DE_OMDB` por la clave personal. Si no se dispone de una, se puede solicitar desde [OMDb API](https://www.omdbapi.com/).

El archivo `.env` contiene información privada y no debe subirse a GitHub. `.env.example` se incluye como plantilla sin ninguna clave real.

### 5. Iniciar el backend

Desde la carpeta raíz:

```bash
cd back
fastapi dev main.py
```

La API estará disponible en http://127.0.0.1:8000 y su documentación interactiva en http://127.0.0.1:8000/docs.

### 6. Abrir el frontend

Abre el archivo frontend/index.html en tu navegador web.

El backend debe estar funcionando para utilizar las búsquedas y los comentarios.

---

**Proyecto final de Keepcoding · 2026**