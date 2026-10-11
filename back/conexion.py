import sqlite3

class Conexion:
    def __init__(self, sql_query, parameter=[]):
        self.conexion = sqlite3.connect('bbdd_peliculas.bd')
        self.cur = self.con.cursor()
        self.row = sqlite3.Row
        self.res = self.cur.execute(sql_query, parameter)

        