DROP DATABASE streams_db;

CREATE DATABASE streams_db;

use streams_db;

CREATE TABLE
    root(
        root_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        f_name VARCHAR(70) NOT NULL,
        l_name VARCHAR(70) NOT NULL,
        image VARCHAR(255),
        email VARCHAR(70) NOT NULL UNIQUE,
        password VARCHAR(70) NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        address VARCHAR(255) NOT NULL
    );

INSERT INTO
    root (
        f_name,
        l_name,
        image,
        email,
        password,
        address
    )
VALUES (
        "root",
        "user",
        null,
        "root@email.com",
        "password",
        "location"
    );

CREATE TABLE
    org_types (
        org_code VARCHAR(10) PRIMARY KEY NOT NULL,
        name VARCHAR(20) NOT NULL,
        is_delete TINYINT NOT NULL DEFAULT 0,
        created_by INT,
        updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES root(root_id)
    );

-- ALTER TABLE org_types MODIFY COLUMN is_delete TINYINT DEFAULT 0

INSERT INTO org_types (org_code, name) VALUES ("CCH", "Church");

CREATE TABLE
    roles (
        role_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(20) NOT NULL,
        updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
    );

INSERT INTO roles (name) VALUES ("Admin");

CREATE TABLE
    territory(
        territory_id INT PRIMARY KEY,
        name VARCHAR(70) NOT NULL,
        country_code CHAR(6) NOT NULL,
        in_service TINYINT NOT NULL DEFAULT 1,
        is_delete TINYINT NOT NULL DEFAULT 0,
        state VARCHAR(60) NOT NULL,
        county VARCHAR(60) NOT NULL,
        district VARCHAR(70) NOT NULL,
        zip VARCHAR(20) NOT NULL,
        created_by INT,
        FOREIGN KEY (created_by) REFERENCES root(root_id),
        houses INT NOT NULL DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
    );

CREATE TABLE
    orgs(
        org_id INT PRIMARY KEY AUTO_INCREMENT,
        territory_id INT UNIQUE,
        org_type VARCHAR(10),
        name VARCHAR(70) NOT NULL,
        created_by INT,
        in_service TINYINT DEFAULT 1,
        is_delete TINYINT DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatet_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES root(root_id),
        FOREIGN KEY (territory_id) REFERENCES territory(territory_id),
        FOREIGN KEY (org_type) REFERENCES org_types(org_code)
    );

CREATE TABLE
    users(
        user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        f_name VARCHAR(70) NOT NULL,
        l_name VARCHAR(70) NOT NULL,
        org_id INT,
        email VARCHAR(70) UNIQUE NOT NULL,
        password VARCHAR(70) NOT NULL,
        location VARCHAR(255) NOT NULL,
        in_service TINYINT DEFAULT 1,
        is_delete TINYINT DEFAULT 0,
        role INT,
        approved_by INT NOT NULL,
        gender TINYINT,
        dob DATETIME NOT NULL,
        FOREIGN KEY (role) REFERENCES roles(role_id),
        FOREIGN KEY (org_id) REFERENCES orgs(org_id),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
    );