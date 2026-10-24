SELECT * FROM comentarios;
SELECT persona, comentario FROM comentarios WHERE id_pelicula="tt10907336" ORDER BY fecha DESC;
INSERT INTO comentarios (id_pelicula, persona,comentario,fecha) VALUES (?,?,?,?);