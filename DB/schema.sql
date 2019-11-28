CREATE DATABASE burger_db;

USE burger_db;

CREATE TABLE burgers (
    PRIMARY KEY (id),
    burger_name VARCHAR(50) NOT NULL,
    devoured BOOLEAN DEFAULT false,
    id INT AUTO_INCREMENT NOT NULL 
);

