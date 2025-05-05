CREATE DATABASE portfolio_app;
USE portfolio_app;

CREATE TABLE portfolio_type (
    id integer PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    descriptions VARCHAR(60) NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE portfolio (
    id integer PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    contents TEXT NOT NULL,
    event_location TEXT NULL,
    event_date DATETIME NULL,
    thumbnail VARCHAR(255) NULL,
    portfolio_type_id integer,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (portfolio_type_id) REFERENCES portfolio_type(id)
);

CREATE TABLE gallery (
    id integer PRIMARY KEY AUTO_INCREMENT,
    img VARCHAR(255) NULL,
    portfolio_id integer NOT NULL,
    FOREIGN KEY (portfolio_id) REFERENCES portfolio(id) ON DELETE CASCADE
)

INSERT INTO portfolio_type (title,descriptions)
VALUES
('skills',''),
('projects',''),
('achievements',''),
('internships',''),
('activities','academic activities'),
('educations','');

INSERT INTO portfolio (title, contents, event_location, event_date, portfolio_type_id)
VALUES
('B.Eng. Computer Engineering - Rajamangala University of Technology Tanyaburi','GPAX 3.96','','2026-01-01','6'),
('High Voc. Cert. Computer Software Dev. - Thai-Austrian Technical College','GPAX 4.00','','2024-01-01','6'),
('Voc. Cert. Infomation Technology - Thai-Austrian Technical College','GPAX 3.92','','2022-01-01','6'),
('Junior High School - Pattanavechsuksa School','GPAX 3.86','','2018-01-01','6'),
('Primary School - Pattanavechsuksa School','GPAX 3.70','','2015-01-01','6')

CREATE TABLE admin (
    id integer AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(16) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO admin (username, password)
VALUES
('Automatic','2546')

