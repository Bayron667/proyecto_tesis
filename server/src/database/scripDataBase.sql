CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    genero VARCHAR(50),
    correo VARCHAR(255) UNIQUE NOT NULL,
    clave VARCHAR(255) NOT NULL,
    fecha_registro DATETIME NOT NULL,
    estado VARCHAR(50) NOT NULL,
    foto VARCHAR(255),usuarios
    pregunta_seguridad VARCHAR(255),
    respuesta_seguridad VARCHAR(255),
    usuario_verificado BOOLEAN DEFAULT FALSE
);

CREATE TABLE chat (
    id_chat INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    fecha DATETIME NOT NULL
);

CREATE TABLE mensajes_chat (
    id_mensaje_chat INT AUTO_INCREMENT PRIMARY KEY,
    id_chat INT,
    id_usuario INT,
    contenido TEXT NOT NULL,
    fecha DATETIME NOT NULL,
    FOREIGN KEY (id_chat) REFERENCES chat(id_chat),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE preguntas (
    id_preguntas INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    area VARCHAR(255) NOT NULL,
    tema VARCHAR(255) NOT NULL,
    contenido TEXT NOT NULL,
    fecha DATETIME NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE respuestas (
    id_respuesta INT AUTO_INCREMENT PRIMARY KEY,
    id_pregunta INT,
    id_usuario INT,
    contenido TEXT NOT NULL,
    fecha DATETIME NOT NULL,
    FOREIGN KEY (id_pregunta) REFERENCES preguntas(id_preguntas),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE documentos (
    id_documento INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    materia VARCHAR(255),
    tema VARCHAR(255),
    titulo VARCHAR(255),
    formato VARCHAR(50),
    tipo_contenido VARCHAR(50),
    archivo LONGBLOB,
    fecha DATETIME NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE amistades (
    id_amistad INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id_1 INT,
    usuario_id_2 INT,
    fecha_amistad DATETIME NOT NULL,
    mensaje_solicitud VARCHAR(1000),
    estado VARCHAR(50) NOT NULL,
    FOREIGN KEY (usuario_id_1) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (usuario_id_2) REFERENCES usuarios(id_usuario)
);

CREATE TABLE mensajes_usuarios (
    id_mensaje_usuario INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id_emisor INT,
    usuario_id_receptor INT,
    contenido TEXT NOT NULL,
    fecha_envio DATETIME NOT NULL,
    leido BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (usuario_id_emisor) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (usuario_id_receptor) REFERENCES usuarios(id_usuario)
);

CREATE TABLE valoracion (
    id_valoracion INT AUTO_INCREMENT PRIMARY KEY,
    id_elemento_evaluado INT,
    id_usuario INT,
    comentarios TEXT,
    puntuacion INT NOT NULL,
    fecha DATETIME NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- datos de prueba ---

INSERT INTO usuarios (nombre, genero, correo, clave, fecha_registro, estado, foto, pregunta_seguridad, respuesta_seguridad, usuario_verificado)
VALUES 
('Juan Pérez', 'Masculino', 'juan.perez@example.com', 'hashedpassword1', '2024-08-20 08:30:00', 'Activo', 'juan.png', '¿Nombre de tu primer perro?', 'Firulais', TRUE),
('María Gómez', 'Femenino', 'maria.gomez@example.com', 'hashedpassword2', '2024-08-21 09:15:00', 'Activo', 'maria.jpg', '¿Ciudad de nacimiento?', 'Bogotá', FALSE),
('Carlos Ruiz', 'Masculino', 'carlos.ruiz@example.com', 'hashedpassword3', '2024-08-21 14:45:00', 'Activo', NULL, '¿Nombre de tu escuela primaria?', 'San José', TRUE),
('Ana Torres', 'Femenino', 'ana.torres@example.com', 'hashedpassword4', '2024-08-22 10:20:00', 'Activo', 'ana.png', '¿Nombre de tu mejor amigo?', 'Lucía', FALSE),
('Laura Mendoza', 'Femenino', 'laura.mendoza@example.com', 'hashedpassword5', '2024-08-23 16:50:00', 'Activo', NULL, '¿Nombre de tu primer maestro?', 'Miguel', TRUE);

INSERT INTO chat (nombre, fecha)
VALUES 
('Estudio de Matemáticas', '2024-08-21 15:30:00'),
('Proyecto de Física', '2024-08-22 17:45:00'),
('Amigos de la Facultad', '2024-08-22 18:00:00'),
('Dudas sobre Programación', '2024-08-23 10:00:00'),
('Grupo de Estudio Historia', '2024-08-23 11:15:00');

INSERT INTO mensajes_chat (id_chat, id_usuario, contenido, fecha)
VALUES 
(1, 1, '¿Alguien puede explicar la ecuación cuadrática?', '2024-08-21 15:35:00'),
(1, 2, 'Claro, puedo ayudarte con eso.', '2024-08-21 15:37:00'),
(2, 3, '¿Quién tiene el informe preliminar?', '2024-08-22 17:50:00'),
(3, 4, '¿Vamos al cine después de estudiar?', '2024-08-22 18:05:00'),
(4, 5, 'Tengo una duda sobre arrays en JavaScript.', '2024-08-23 10:10:00');

INSERT INTO preguntas (id_usuario, area, tema, contenido, fecha)
VALUES 
(1, 'Matemáticas', 'Álgebra', '¿Cómo se resuelve una ecuación cuadrática?', '2024-08-21 16:00:00'),
(2, 'Programación', 'JavaScript', '¿Qué es un closure en JavaScript?', '2024-08-22 11:30:00'),
(3, 'Física', 'Dinámica', '¿Cuál es la segunda ley de Newton?', '2024-08-22 18:30:00'),
(4, 'Historia', 'Revolución Francesa', '¿Qué fue el "Reinado del Terror"?', '2024-08-23 12:00:00'),
(5, 'Química', 'Enlace Químico', '¿Qué es un enlace covalente?', '2024-08-23 14:00:00');

INSERT INTO respuestas (id_pregunta, id_usuario, contenido, fecha)
VALUES 
(1, 3, 'Una ecuación cuadrática se resuelve con la fórmula: (-b ± √(b²-4ac)) / 2a.', '2024-08-21 16:10:00'),
(2, 1, 'Un closure es una función que recuerda su contexto léxico.', '2024-08-22 11:45:00'),
(3, 2, 'Es la fuerza que actúa sobre un objeto es igual a su masa por su aceleración.', '2024-08-22 18:45:00'),
(4, 5, 'El Reinado del Terror fue un período de represión durante la Revolución Francesa.', '2024-08-23 12:15:00'),
(5, 4, 'Un enlace covalente es cuando dos átomos comparten electrones.', '2024-08-23 14:15:00');
