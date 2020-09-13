CREATE SCHEMA `enrollmentsystem_db` ;


CREATE TABLE `enrollmentsystem_db`.`adminaccounts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `middlename` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  
  
  CREATE TABLE `enrollmentsystem_db`.`studentaccounts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `middlename` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  
  
  CREATE TABLE `enrollmentsystem_db`.`courses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `coursecode` VARCHAR(45) NOT NULL,
  `coursedescription` VARCHAR(100) NOT NULL,
  `date` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));


CREATE TABLE `enrollmentsystem_db`.`sections` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `section` VARCHAR(45) NOT NULL,
  `course` VARCHAR(45) NOT NULL,
  `date` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  
  
  CREATE TABLE `enrollmentsystem_db`.`students` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `middlename` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `age` VARCHAR(45) NOT NULL,
  `birthdate` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `course` VARCHAR(45) NOT NULL,
  `section` VARCHAR(45) NOT NULL,
  `date` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `enrollmentsystem_db`.`newsfeed` (
  `fullname` VARCHAR(100) NOT NULL,
  `post` VARCHAR(1000) NULL);


