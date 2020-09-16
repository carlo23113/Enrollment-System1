-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: enrollmentsystem_db
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adminaccounts`
--

DROP TABLE IF EXISTS `adminaccounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adminaccounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `middlename` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminaccounts`
--

LOCK TABLES `adminaccounts` WRITE;
/*!40000 ALTER TABLE `adminaccounts` DISABLE KEYS */;
INSERT INTO `adminaccounts` VALUES (1,'admin','admin','Jan Carlo','Sanchez','Espiritu'),(2,'althea','vidal','Althea Mae','Villa','Vidal'),(3,'admin','pass','Carlo','Sanchez','Espiritu'),(4,'althea','vidal','Althea Mae','Villa','Vidal'),(5,'altheaadmin','password','Althea Mae','Villa','Vidal'),(6,'mack','jaygee','Mack Jaygee','Grande','De Los Santos'),(7,'pepito','manaloto','Pepito','Manaloto','Last'),(8,'mack','jaygee','Mack Jaygee','Grande','De Los Santos');
/*!40000 ALTER TABLE `adminaccounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `coursecode` varchar(45) NOT NULL,
  `coursedescription` varchar(100) NOT NULL,
  `date` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (31,'BSIT','Bachelor of Science in Information Technology','2020-9-15'),(32,'BSBA','Bachelor of Science in Business Administration','2020-9-15');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newsfeed`
--

DROP TABLE IF EXISTS `newsfeed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `newsfeed` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(100) NOT NULL,
  `post` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newsfeed`
--

LOCK TABLES `newsfeed` WRITE;
/*!40000 ALTER TABLE `newsfeed` DISABLE KEYS */;
INSERT INTO `newsfeed` VALUES (1,' Jan Carlo Espiritu','Ako si Carlo'),(2,' Jan Carlo Espiritu','haha'),(3,' Althea Mae Vidal','Ako si althea'),(4,' Jan Carlo Espiritu','Hello'),(5,' Jan Carlo Espiritu','What\'s up'),(6,' Jan Carlo Espiritu',''),(7,' Jan Carlo Espiritu',''),(8,' Jan Carlo Espiritu','Ako si Carlo'),(9,' Jan Carlo Espiritu','haha'),(10,' Jan Carlo Espiritu','Hiiiiiiiiiiiii'),(11,' Althea Mae Vidal','Hello'),(12,' Althea Mae Vidal','haha'),(13,'','Hehe'),(14,' Althea Mae Vidal','haha'),(15,' Althea Mae Vidal','haha'),(16,'','hehe'),(17,'','hehe'),(18,'','haha'),(19,' Althea Mae Vidal','Ako si althea'),(20,' Althea Mae Vidal','Ako si althea'),(21,' Althea Mae Vidal','Hello'),(22,' Althea Mae Vidal','hehe'),(23,' Jan Carlo Espiritu','Yes! enrolled na ako hehehe'),(24,' Jan Carlo Espiritu','hahahahahaha'),(25,' Mack Jaygee De Los Santos','Ako si Mack Jaygee'),(26,' Mack Jaygee De Los Santos','yes enrolled na ako'),(27,' Jan Carlo Espiritu','hoy ang ingay minus 5 ka'),(28,' Althea Mae Vidal','ang ingay nyo'),(29,' Pepito Last','Hi'),(30,' Jason Espiritu','hi'),(31,' Jan Carlo Espiritu','sadfasdf'),(32,' Jan Carlo Espiritu','dsafgsdfg'),(33,' Jane Espiritu','yeey'),(34,' Rubinato III','yeeey nakapagregister na ako');
/*!40000 ALTER TABLE `newsfeed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sections`
--

DROP TABLE IF EXISTS `sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `section` varchar(45) NOT NULL,
  `course` varchar(45) NOT NULL,
  `date` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sections`
--

LOCK TABLES `sections` WRITE;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;
INSERT INTO `sections` VALUES (21,'IT101A','BSIT','2020-9-15'),(22,'IT101B','BSIT','2020-9-15'),(23,'BA101A','BSBA','2020-9-15'),(24,'BA102A','BSBA','2020-9-15');
/*!40000 ALTER TABLE `sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_subjects`
--

DROP TABLE IF EXISTS `student_subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_subjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(45) NOT NULL,
  `subject` varchar(45) NOT NULL,
  `course` varchar(45) NOT NULL,
  `section` varchar(45) NOT NULL,
  `day` varchar(45) NOT NULL,
  `start` varchar(45) NOT NULL,
  `finish` varchar(45) NOT NULL,
  `unit` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_subjects`
--

LOCK TABLES `student_subjects` WRITE;
/*!40000 ALTER TABLE `student_subjects` DISABLE KEYS */;
INSERT INTO `student_subjects` VALUES (21,'Jane Sanchez Espiritu','Math','BSIT','IT101A','MON','13:00','13:00',5),(22,'Jane Sanchez Espiritu','PE','BSIT','IT101A','MON','16:00','17:00',5),(23,'Jane Sanchez Espiritu','English','BSIT','IT101A','MON','15:00','16:00',5),(24,'Jane Sanchez Espiritu','Filipino','BSIT','IT101A','MON','17:00','18:00',5),(71,'Rubinato Lubian III','English','BSIT','IT101A','MON','15:00','16:00',5),(72,'Rubinato Lubian III','Science','BSIT','IT101A','MON','13:00','14:00',5),(73,'Rubinato Lubian III','PE','BSIT','IT101A','MON','16:00','17:00',5),(74,'Rubinato Lubian III','Filipino','BSIT','IT101A','TUE','08:00','09:30',5),(75,'Rubinato Lubian III','Algebra','BSIT','IT101A','TUE','09:00','10:00',3),(76,'Rubinato Lubian III','Web Programming','BSIT','IT101A','THUR','13:00','14:00',1),(110,'Jaye Nucum Galang','Science','BSIT','IT101A','MON','13:00','14:00',5),(111,'Jaye Nucum Galang','PE','BSIT','IT101A','MON','16:00','17:00',5),(112,'Jaye Nucum Galang','Filipino','BSIT','IT101A','TUE','08:00','09:30',5),(113,'Jaye Nucum Galang','Language','BSIT','IT101A','MON','22:00','23:00',4),(114,'Jaye Nucum Galang','Subject2','BSIT','IT101A','MON','01:00','01:30',3);
/*!40000 ALTER TABLE `student_subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentaccounts`
--

DROP TABLE IF EXISTS `studentaccounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentaccounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `middlename` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentaccounts`
--

LOCK TABLES `studentaccounts` WRITE;
/*!40000 ALTER TABLE `studentaccounts` DISABLE KEYS */;
INSERT INTO `studentaccounts` VALUES (1,'user','user','Jan Carlo','Sanchez','Espiritu'),(2,'altheastudent','password','Althea Mae','Villa','Vidal');
/*!40000 ALTER TABLE `studentaccounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(45) DEFAULT NULL,
  `firstname` varchar(45) NOT NULL,
  `middlename` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `age` varchar(45) DEFAULT NULL,
  `birthdate` varchar(45) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `course` varchar(45) DEFAULT NULL,
  `section` varchar(45) DEFAULT NULL,
  `date` varchar(45) DEFAULT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `units` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (14,'approved','Mack Jaygee','Grande','De Los Santos','20','2020-09-10','Blk 19 Lot 15 Calamansian st., Maligaya Park Subd., Caloocan CIty','BSIT','IT101A','2020-9-13','mack','jaygee',0),(18,'approved','Jan Carlo','Sanchez','Espiritu','23','1996-10-11','Blk 19 Lot 15 Calamansian st., Maligaya Park Subd., Caloocan CIty','BSIT','IT101A','2020-9-15','user','user',0),(19,'approved','Althea Mae','Villa','Vidal','23','1996-10-11','Blk 19 Lot 15 Calamansian st., Maligaya Park Subd., Caloocan CIty','BSIT',NULL,'2020-9-15','althea','vidal',0),(21,'approved','Jaye','Nucum','Galang','18','1996-10-11','Blk 19 Lot 15 Calamansian st., Maligaya Park Subd., Caloocan CIty','BSIT',NULL,'2020-9-16','jaye','galang',22),(26,'approved','Jane','Sanchez','Espiritu','23','1996-10-11','Blk 19 Lot 15 Calamansian st., Maligaya Park Subd., Caloocan CIty','BSIT',NULL,'2020-9-15','jane','espiritu',0),(28,'approved','Rubinato','Lubian','III','45','1990-10-10','Blk 19 Lot 15 Calamansian st., Maligaya Park Subd., Caloocan CIty','BSIT',NULL,'2020-9-16','rubinato','lubian',0);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject` varchar(45) NOT NULL,
  `course` varchar(45) NOT NULL,
  `section` varchar(45) NOT NULL,
  `unit` int NOT NULL,
  `day` varchar(45) NOT NULL,
  `start` varchar(45) NOT NULL,
  `finish` varchar(45) NOT NULL,
  `schedule` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (24,'Math','BSIT','IT101A',5,'MON','13:00','14:00',NULL),(25,'Science','BSIT','IT101A',5,'MON','13:00','14:00',NULL),(26,'English','BSIT','IT101A',5,'MON','15:00','16:00',NULL),(27,'PE','BSIT','IT101A',5,'MON','16:00','17:00',NULL),(28,'Filipino','BSIT','IT101A',5,'TUE','08:00','09:30',NULL),(29,'Algebra','BSIT','IT101A',3,'TUE','09:00','10:00',NULL),(30,'Hekasi','BSIT','IT101A',5,'TUE','09:00','21:00',NULL),(31,'Language','BSIT','IT101A',4,'MON','22:00','23:00',NULL),(32,'Subject','BSIT','IT101A',1,'MON','03:42','04:42',NULL),(33,'Subject1','BSIT','IT101A',3,'WED','15:27','16:27',NULL),(34,'Subject2','BSIT','IT101A',3,'MON','01:00','01:30',NULL),(35,'Web Programming','BSIT','IT101A',1,'THUR','13:00','14:00',NULL);
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-16 22:15:04
