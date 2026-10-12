from conexion import Conexion
import sqlite3

def format(answer):
    final_list = []
    for row in answer.fetchall():
        final_list.append(dict(row))
    return final_list

def select_by_film_id(film_id:str):
    conexionSelectBy = Conexion('SELECT persona, comentario, fecha FROM comentarios WHERE id_pelicula=? ORDER BY fecha DESC;', [film_id])
    answer = conexionSelectBy.res
    response = format(answer)
    conexionSelectBy.conexion.close()
    return response
  

def insert_new_coment(data):
    try:

        conexionInsert = Conexion('INSERT INTO comentarios (id_pelicula, persona,comentario,fecha) VALUES (?,?,?,?);', data)
        conexionInsert.res
    except sqlite3.Error as error:
        print(error)

    conexionInsert.conexion.close()
    
    

