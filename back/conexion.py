import sqlite3

class Conexion:
    def __init__(self, sql_query, parameter=[]):
        self.conexion = sqlite3.connect('bbdd_peliculas.db')
        self.conexion.row_factory = sqlite3.Row
        self.cur = self.conexion.cursor()
        self.res = self.cur.execute(sql_query, parameter)