from fastapi import FastAPI 
from back.consultas import *
from pydantic import BaseModel
from requests_omdbapi import MovieApi
import datetime

today = datetime.date.today()

app = FastAPI()
movie_api = MovieApi()

@app.get("/search/films",tags=['Movies'])
def index(title:str, year:int = None):
    return movie_api.get_title_year(title, year)

@app.get("/search/films/{imbd_id}", tags=['Movie'])
def search_film(imbd_id:str):
    return movie_api.get_title_id(imbd_id)

@app.get("/search/films/{imbd_id}/comment", tags=['Comments'])
def search_comment(film_id):
    return select_by_film_id(film_id)

@app.post("/search/films/comment", tags=['Comments'])
def post_comment():
    pass

