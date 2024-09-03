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
-- Table structure for table `payment_date`
--

DROP TABLE IF EXISTS `payment_date`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_date` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `payment_date` date DEFAULT NULL,
  `loan_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpu7hvm5ebaa8niyxpd0yjdfpp` (`loan_id`),
  CONSTRAINT `FKpu7hvm5ebaa8niyxpd0yjdfpp` FOREIGN KEY (`loan_id`) REFERENCES `loan` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_date`
--

LOCK TABLES `payment_date` WRITE;
/*!40000 ALTER TABLE `payment_date` DISABLE KEYS */;
INSERT INTO `payment_date` VALUES (1,'2024-05-07',1),(2,'2024-06-07',1),(3,'2024-07-07',1),(4,'2024-08-07',1),(5,'2024-09-07',1),(6,'2024-10-07',1),(7,'2024-11-07',1),(8,'2024-12-07',1),(9,'2025-01-07',1),(10,'2025-02-07',1),(11,'2025-03-07',1),(12,'2025-04-07',1),(13,'2025-05-07',1),(14,'2025-06-07',1),(15,'2025-07-07',1),(16,'2025-08-07',1),(17,'2025-09-07',1),(18,'2025-10-07',1),(19,'2025-11-07',1),(20,'2025-12-07',1),(21,'2026-01-07',1),(22,'2026-02-07',1),(23,'2026-03-07',1),(24,'2026-04-07',1),(25,'2026-05-07',1),(26,'2026-06-07',1),(27,'2024-06-03',2),(28,'2024-07-03',2),(29,'2024-08-03',2),(30,'2024-08-13',3);
/*!40000 ALTER TABLE `payment_date` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-03 19:44:43
