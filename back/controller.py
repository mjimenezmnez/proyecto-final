from fastapi import FastAPI
from consultas import *
from pydantic import BaseModel
from requests_omdbapi import MovieApi
from fastapi.middleware.cors import CORSMiddleware

import datetime

app = FastAPI()
movie_api = MovieApi()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Permite cualquier origen (dominio)
    allow_credentials=False,  # ¡ATENCIÓN! Debe ser False si usas "*" en origins
    allow_methods=["*"],      # Permite todos los métodos HTTP (GET, POST, PUT, etc.)
    allow_headers=["*"],      # Permite todas las cabeceras HTTP
)

# Clase que contiene lo que el usuario podra añadir 
class Comment(BaseModel):
    id_film:str
    person:str
    comment:str

# Clase que crea la fecha para que el usuario no la pueda modificar 
class CommentBD(Comment):
    date:str

@app.get("/search/films",tags=['Movies'])
def index(title:str, year:int = None):
    return movie_api.get_title_year(title, year)

@app.get("/search/films/{imbd_id}", tags=['Movie'])
def search_film(imbd_id:str):
    return movie_api.get_title_id(imbd_id)

@app.get("/search/films/{film_id}/comment", tags=['Comments'])
def search_comment(film_id):
    return select_by_film_id(film_id)

@app.post("/search/films/comment", tags=['Comments'])
def post_comment(movie:Comment):
    today = datetime.date.today()

    try:
        new_comment = CommentBD(id_film=movie.id_film,
                                person=movie.person,
                                comment=movie.comment,
                                date=str(today))
        
        insert_new_coment([new_comment.id_film,new_comment.person,new_comment.comment,new_comment.date])
        return {'mensaje':'registro correcto'}

    except Exception as ex:
        print('Error al guardar comenrtario:', ex)
        return("error:" "ha fallado el registro")
        