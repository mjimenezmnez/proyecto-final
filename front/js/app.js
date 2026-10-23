console.log("javascript");
const URL_BASE ='http://127.0.0.1:8000';
let peliculaSeleccionada = '';

// Se crea la tabla con los resultados 
function crearFilasTabla(data){
    let filas = '';
    data.forEach(pelicula => {
        filas += `<tr data-id="${pelicula.imdbID}">
                        <td class="py-4 w-40">
                            <div class="avatar">
                                <div class="h-28 w-22">
                                    <img src="${pelicula.Poster}" alt="Póster"/>
                                </div>
                            </div>
                        </td>
                        <td class="py-6 text-lg font-bold">${pelicula.Title}</td>
                        <td class="py-6 text-sm">${pelicula.Year}</td>
                    
                                </tr>
        `
        
    });

    return filas;

}

// Funcion que busca por titulo y año 
function buscarPorTitulo(){
    const titulo = document.getElementById('titulo').value.trim(); // trim() para que quite espacios y ni haya problemas
    const anio = document.getElementById('anio').value;
    const ctabla = document.getElementById('cuerpo-tabla');
    // Por si no se ecribe nada en titulo 
    if (titulo === ''){
        alert('Escribe el titulo de una peliula');
        return;
    }
    // Url con titulo 
    let urlBusquedaTitulo = `${URL_BASE}/search/films?title=${titulo}`;
    // Url con año si se escribe algo 
    if (anio != ''){
        urlBusquedaTitulo += `&year=${anio}`;

    }

    fetch(urlBusquedaTitulo)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'False' || !data.Search){
                alert('No se han encontrado películas');
                ctabla.innerHTML='';
                return 
            }

            ctabla.innerHTML= crearFilasTabla(data.Search);
            capturarItemTabla();
            limpiarCampos();


        })
        .catch(error => console.log('Error al buscar la películas', error));
}

// Busqueda por id 
function busquedaId(id){
    if (!id){
        id = document.getElementById('titulo').value.trim();
    }

    if (id === ''){
        alert('Escribe el ID de IMDb de la película');
        return;
    }

    const urlBusquedaId = `${URL_BASE}/search/films/${id}`

    fetch(urlBusquedaId)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'False' || !data.imdbID){
                alert('No se ha encontrado la película');
                return;
            }
            mostrarDetallesPelicula(data);
            limpiarCampos();
        })

        .catch(error => console.log('Error al buscar la película:', error));


}

// Muestra las los detalles en la ficha de HTML creada 
function mostrarDetallesPelicula(pelicula){
    document.getElementById('titulo-ficha').textContent = pelicula.Title;
    document.getElementById('anio-ficha').textContent = pelicula.Year;
    document.getElementById('genero').textContent = pelicula.Genre;
    document.getElementById('id_omdb').textContent = pelicula.imdbID;
    document.getElementById('descripcion').textContent = pelicula.Plot;
    document.getElementById('poster-ficha').src = pelicula.Poster;
    document.getElementById('actores').textContent = pelicula.Actors;


    document.getElementById('ficha-pelicula').style.display = 'flex';
}

// Elegir el tipo de busqueda
function buscarPelicula(){
    // Obtine el selector de busqueda del HTML
    const opciones = document.getElementById('opciones');
    // Obtiene la opcion que el usuario elige 
    const opcion = opciones.options[opciones.selectedIndex];

    if (opcion.id === 'opcion-titulo'){
        buscarPorTitulo();
        

    } else if (opcion.id === 'opcion-imdb'){
        busquedaId();
        

    } else {
        alert('Elige como quieres buscar la película');
    }
}

// Capturar la película que se pulsa en la tabla
function capturarItemTabla() {
    const tabla = document.getElementById("tabla-principal");

    for (let i = 1; i < tabla.rows.length; i++) {
        tabla.rows[i].onclick = function () {
            let idOmdb = this.getAttribute("data-id");
            busquedaId(idOmdb);
            mostrarComentarios();
            cargarComentarios(idOmdb);
        };
    }
}
// Activar el botón de búsqueda
const btnBuscar = document.getElementById('btnBuscar');
btnBuscar.addEventListener('click', function() {
    console.log('He pulsado el botón');
    buscarPelicula();
});

// Limpiar campos del formulario de busqueda 
function limpiarCampos(){
    document.getElementById('titulo').value = '';
    document.getElementById('anio').value = '';
}

// Mostrar la sección de comentarios
function mostrarComentarios(){
    document.getElementById('comentarios-publicados').style.display = 'block';
    document.getElementById('lista-comentarios').style.display = 'block';

}

// Conexion con el backend que existen para una pelicula
function cargarComentarios(idOmdb){
    const lista = document.getElementById('lista-comentarios');

    fetch(`${URL_BASE}/search/films/${idOmdb}/comment`)
        .then(response => response.json())
        .then(data => {
            lista.innerHTML = '';

            if(data.length === 0 ){
                lista.innerHTML = 'Todavía no hay comentarios 💗';

            } else {
                data.forEach(comentario => {
                    lista.innerHTML += `
                        <div class="chat chat-start mb-3">

                            <div class="chat-header">
                                <span class="text-sm">${comentario.persona}</span>
                                <time class="text-xs opacity-50">${comentario.fecha}</time>
                            </div>

                            <div class="chat-bubble text-lg bg-base-200">
                                ${comentario.comentario}
                            </div>

                        </div>
                    
                    `;
                })

            }

        })
        .catch(error => console.log('Error al cargar comentarios', error));

}

// Publicar un comentario nuevo 
function publicarComentario(event){
    event.preventDefault();

    const persona = document.getElementById('nombre-comentario').value.trim();
    const comentario = document.getElementById('texto-comentario').value.trim();

    if (persona === '' || comentario === '') {
        alert('Escribe tu nombre y tu comentario');
        return;
    }

    const idOmdb = document.getElementById('id_omdb').textContent;

    const datos = {id_film:idOmdb, person:persona, comment:comentario};

    fetch(`${URL_BASE}/search/films/comment`, {
        method : 'POST',
        headers : { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })

        .then(response => response.json())
        .then(data => {
            if (data.mensaje === 'registro correcto') {
                document.getElementById('form-comentario').reset();
                cargarComentarios(idOmdb);
            
            } else { 
                alert('No se ha podido guardar el comentario');
            }


        })
        .catch(error => console.log('Error al publicar el comentario', error));

}

// Captura el formulario de comentarios y detecta cuando se envia
const formComentario = document.getElementById('form-comentario');
formComentario.addEventListener('submit', publicarComentario);