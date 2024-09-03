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
-- Table structure for table `planned_expenses`
--

DROP TABLE IF EXISTS `planned_expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `planned_expenses` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `payment_date` date DEFAULT NULL,
  `payment_method` enum('CARD','CASH','BANK_TRANSFER','PAYPAL','BLIK','OTHER') DEFAULT NULL,
  `priority` int DEFAULT NULL,
  `status` enum('PAID','PAYABLE') DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `set_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2wk9cxsgtfne96147pudta6ov` (`set_id`),
  CONSTRAINT `FK2wk9cxsgtfne96147pudta6ov` FOREIGN KEY (`set_id`) REFERENCES `set_of_planned_expenses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planned_expenses`
--

LOCK TABLES `planned_expenses` WRITE;
/*!40000 ALTER TABLE `planned_expenses` DISABLE KEYS */;
INSERT INTO `planned_expenses` VALUES (1,350,'Bikepacking equipment','Panniers','2024-09-27','BLIK',5,'PAID','admin',1),(2,280,'Bike packing equipment','Bike rack','2024-09-27','BLIK',5,'PAID','admin',1),(3,219,'Hiking knife','Knife','2024-09-26','BLIK',3,'PAID','admin',1),(4,45,'Trunk pullers','Pullers','2024-08-22','BLIK',2,'PAID','admin',1),(5,350,'Tent for bike tour','Tent','2024-08-27','CARD',5,'PAID','admin',1),(6,400,'Sleeping bags','Sleeping bags','2024-08-20','CARD',4,'PAID','admin',1),(7,100,'Hammocks','Hammocks','2024-08-20','CARD',1,'PAID','admin',1),(8,30,'Cartouche','Cartouche','2024-08-26','BLIK',3,'PAID','admin',1),(9,79,'Cartridge burner','Cartridge burner','2024-08-20','BLIK',3,'PAID','admin',1),(10,169,'Meniscus','Meniscus','2024-08-20','BLIK',4,'PAID','admin',1);
/*!40000 ALTER TABLE `planned_expenses` ENABLE KEYS */;
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
