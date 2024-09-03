-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: wealth_voyage_db
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `expired` bit(1) NOT NULL,
  `revoked` bit(1) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `token_type` enum('BEARER') DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKiblu4cjwvyntq3ugo31klp1c6` (`user_id`),
  CONSTRAINT `FKiblu4cjwvyntq3ugo31klp1c6` FOREIGN KEY (`user_id`) REFERENCES `_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES (1,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjQxNzc5MzcsImV4cCI6MTcyNDE3ODgzN30.iNVN2tRu6mdPOMTOD8AGqlDFZtMYu1k4ZJn-APvL8sE','BEARER',1),(2,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjQxNzg1MTEsImV4cCI6MTcyNDE3OTQxMX0.R2PJuPjU-ttoDF3iLxCbpzUlKJvUPVhSUv3uINNsTrg','BEARER',1),(3,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjQxNzk0NzAsImV4cCI6MTcyNDE4MDM3MH0.y9ykguIH74PmPZUrnJErHzO2tgDZxP9WttB6kzt8HUA','BEARER',1),(4,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjQxODA0MzksImV4cCI6MTcyNDE4MTMzOX0.jQmdVmxNCONbYawuU2PPTW3zUfHqyVKiu4Pc_Vm25sg','BEARER',1),(5,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjQxODE4NTMsImV4cCI6MTcyNDE4Mjc1M30.OYgeZ148CSSThO-zAurQAhdnWkPoJYMZHjleSPM7Dvo','BEARER',1),(6,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjQxODI3MDEsImV4cCI6MTcyNDE4MzYwMX0.OhuqgrHe4GIOnil1p-TboOdXo4g5xFKy_-wivxJqVIg','BEARER',1),(7,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjQxODM0MjIsImV4cCI6MTcyNDE4NDMyMn0.BLYBH3PpWmrItJYBh5793_QFd7-n-Tis0-QRSEtK1W8','BEARER',1),(8,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjQxODQzNjQsImV4cCI6MTcyNDE4NTI2NH0.577Js57_rD7lxOYTl8COf1fczzj9Sv4uIoolXUpnnpM','BEARER',1),(9,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjQxODUwODQsImV4cCI6MTcyNDE4NTk4NH0.jgC-4_qZXEKt-FFKQSw_w4diHNkzmN3z6cZSu5pL_z4','BEARER',1),(10,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjQxODYwMDksImV4cCI6MTcyNDE4NjkwOX0.pbPZBsJ9wrAgFMuXafZ0AfMUhqQoYtFXUmfeUkO2DeM','BEARER',1),(11,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjQxODY3NTcsImV4cCI6MTcyNDE4NzY1N30.mbebFLLtJhwzBAoOi455lvMMzeEjw3ODd_A7b1xQsO4','BEARER',1),(12,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjQxODc0NzgsImV4cCI6MTcyNDE4ODM3OH0.5k8k4J9s4wRhGrXRm-D1af3rajq40Jv3sZ90Z8kkBzY','BEARER',1),(13,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjUzNzUzMDQsImV4cCI6MTcyNTM3NjIwNH0.cUtVX9BPvSnXTDBMkMMiwnUvRETgssZmQkvSfNJZx1A','BEARER',1),(14,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjUzNzU2ODksImV4cCI6MTcyNTM3NjU4OX0.3vFP69Sw-sy3NuG4CiSeGUAGDKjbqKj8adi8jUyI8_c','BEARER',1),(15,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjUzNzY2MzEsImV4cCI6MTcyNTM3NzUzMX0.mNRspo0glaJRhqradyIqRkxpia0pORYaLFGyZHUrnKQ','BEARER',1),(16,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjUzNzY3NjIsImV4cCI6MTcyNTM3NzY2Mn0.DPnDBU3nOFEmRZqyiktekNFfBa80g9itweC-xIub8-s','BEARER',1),(17,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjUzNzgyMTgsImV4cCI6MTcyNTM3OTExOH0.1Ezyv4lID9knFA4SfnIqrbzJshbkRXk-D6YeEym3V_s','BEARER',1),(18,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjUzNzg5MzksImV4cCI6MTcyNTM3OTgzOX0.QhwzwDEzTbS2RxgljMTuhjEUOquq0701_iAdFGqEvKg','BEARER',1),(19,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjUzNzkwODMsImV4cCI6MTcyNTM3OTk4M30.vwqmkVieN2oLPruNMp5r-iFNQ7Jcrf8UeyKs5FLUwq8','BEARER',1),(20,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjUzNzk4MDMsImV4cCI6MTcyNTM4MDcwM30.kJ99juyz4ixvpwi9KE-BZzQqaP6AWoVdHoHWR3Fcv9s','BEARER',1),(21,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjUzODA1MjQsImV4cCI6MTcyNTM4MTQyNH0.Txwzqfx_6cdgDAijc3rYPdxNWwZMJJox5UJUywVJ1oQ','BEARER',1),(22,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjUzODEyNDUsImV4cCI6MTcyNTM4MjE0NX0.0_GB_gF3q29PG1K61MtjJcSI7aDhcdVvvM81L6mA3A0','BEARER',1),(23,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjUzODE5NjYsImV4cCI6MTcyNTM4Mjg2Nn0.IlH2Axa2eO6pO8mqnSM8eyqdpgs9vJygsH-WvNDnpJY','BEARER',1),(24,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjUzODI2ODcsImV4cCI6MTcyNTM4MzU4N30.7HC-otfnd9ONo-pfelF-MC5lE_zEFPQn4vi8ktGzUkE','BEARER',1),(25,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjUzODM0MDgsImV4cCI6MTcyNTM4NDMwOH0.-ZICCaqgom8D_O4B_cFdMl0KgOeiFgQQsyMXNwwUkYw','BEARER',1),(26,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjUzODQxMjksImV4cCI6MTcyNTM4NTAyOX0.XG_VezdAY7zYJNnKEsJjwhG5BbTMKBqoyjs2YnXIunE','BEARER',1),(27,_binary '\0',_binary '\0','eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IkFETUlOIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjUzODQ4NTAsImV4cCI6MTcyNTM4NTc1MH0.dIulDYdtidsO9ILHa-wjutFcQiQFXlE4jnvmCEJdRs8','BEARER',1);
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-03 19:44:42
