CREATE TABLE orgs(
    org_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    in_service VARCHAR(255) NOT NULL
)

CREATE TABLE users(
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    org_id INT,
    FOREIGN KEY (org_id) REFERENCES orgs(org_id),
    UNIQUE KEY unique_name (email)
)
