console.log("javascript")
const URL_BASE ='http://127.0.0.1:8000'

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

//



