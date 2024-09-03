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
-- Table structure for table `recurring_expense`
--

DROP TABLE IF EXISTS `recurring_expense`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recurring_expense` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` double DEFAULT NULL,
  `date` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `expense_frequency` enum('WEEKLY','MONTHLY','BIMONTHLY','YEARLY') DEFAULT NULL,
  `expense_name` varchar(255) DEFAULT NULL,
  `expense_type` enum('SUBSCRIPTION','HOUSE','CHARGES','FOOD','TRANSPORT','HEALTH','EDUCATION','ENTERTAINMENT','OTHER') DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recurring_expense`
--

LOCK TABLES `recurring_expense` WRITE;
/*!40000 ALTER TABLE `recurring_expense` DISABLE KEYS */;
INSERT INTO `recurring_expense` VALUES (1,2000,'2024-09-01','Monthly rent for owner','MONTHLY','Rent','HOUSE','admin'),(2,700,'2024-09-10','Fees for the housing community','MONTHLY','Chargers','HOUSE','admin'),(3,2000,'2024-09-01','Monthly food expenses','MONTHLY','Monthly food','FOOD','admin'),(4,1500,'2024-11-14','yearly Car insurance','YEARLY','Car insurance','TRANSPORT','admin'),(5,100,'2024-08-26','Weekly food to work','WEEKLY','Food to work','FOOD','admin'),(6,85,'2024-08-26','Monthly Telephone Subscription','MONTHLY','Telephone subscription','SUBSCRIPTION','admin');
/*!40000 ALTER TABLE `recurring_expense` ENABLE KEYS */;
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
