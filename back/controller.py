from fastapi import FastAPI 
from back.consultas import *
from pydantic import BaseModel
import datetime

today = datetime.date.today()

app = FastAPI()

@app.get("/busqueda",tags=['Peliculas'])
def index():
    pass

@app.get("/busqueda/pelicula", tags=['Peliculas'])
def search_film():
    pass
