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
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` double DEFAULT NULL,
  `date` date DEFAULT NULL,
  `category` enum('ACCOMMODATION','FOOD','TRANSPORTATION','HEALTHCARE','PERSONAL_CARE','CLOTHING_AND_FOOTWEAR','ENTERTAINMENT','EDUCATION','SAVINGS','DEBT','FIXED_INCOME','SUPPLEMENTARY_INCOME','SINGLE_PAYMENT','SUBSCRIPTION','HOUSE','CHARGES','PLANNED_EXPENSE','OTHER') DEFAULT NULL,
  `transaction_name` varchar(255) DEFAULT NULL,
  `transaction_type` enum('EXPENSE','INCOME') DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `income_id` bigint DEFAULT NULL,
  `loan_id` bigint DEFAULT NULL,
  `planned_expense_id` bigint DEFAULT NULL,
  `recurring_expense_id` bigint DEFAULT NULL,
  `saving_goal_id` bigint DEFAULT NULL,
  `single_expense_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_4tpbalcog10yr6orqms87dr7o` (`planned_expense_id`),
  UNIQUE KEY `UK_ex67y4tossx3gc8p8vaaeuaoq` (`single_expense_id`),
  KEY `FKm0it4vcw684ith758m6xxd7u0` (`income_id`),
  KEY `FKkp2yyh868utly7r7ntwarpn6a` (`loan_id`),
  KEY `FKcciqcf64anb4e781sdyploufw` (`recurring_expense_id`),
  KEY `FKgnsdhpmedrb08yio4cc5kf50k` (`saving_goal_id`),
  CONSTRAINT `FK1vwsjqx65ugkwla5os5vewy8d` FOREIGN KEY (`planned_expense_id`) REFERENCES `planned_expenses` (`id`),
  CONSTRAINT `FKcciqcf64anb4e781sdyploufw` FOREIGN KEY (`recurring_expense_id`) REFERENCES `recurring_expense` (`id`),
  CONSTRAINT `FKgnsdhpmedrb08yio4cc5kf50k` FOREIGN KEY (`saving_goal_id`) REFERENCES `saving_goal` (`id`),
  CONSTRAINT `FKhd3vtds376hmx5nn160e07379` FOREIGN KEY (`single_expense_id`) REFERENCES `single_expense` (`id`),
  CONSTRAINT `FKkp2yyh868utly7r7ntwarpn6a` FOREIGN KEY (`loan_id`) REFERENCES `loan` (`id`),
  CONSTRAINT `FKm0it4vcw684ith758m6xxd7u0` FOREIGN KEY (`income_id`) REFERENCES `income` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (2,3,'2024-08-20','SAVINGS','Savings: House','INCOME','admin',NULL,NULL,NULL,NULL,2,NULL),(3,200,'2024-08-20','SAVINGS','Savings: Bikepacking equipment','INCOME','admin',NULL,NULL,NULL,NULL,3,NULL),(4,6700,'2024-08-01','FIXED_INCOME','Income: Salary','INCOME','admin',1,NULL,NULL,NULL,NULL,NULL),(5,1000,'2024-08-01','SUPPLEMENTARY_INCOME','Income: Bonus','INCOME','admin',2,NULL,NULL,NULL,NULL,NULL),(6,6700,'2024-07-01','FIXED_INCOME','Income: Salary','INCOME','admin',1,NULL,NULL,NULL,NULL,NULL),(7,6700,'2024-06-01','FIXED_INCOME','Income: Salary','INCOME','admin',1,NULL,NULL,NULL,NULL,NULL),(8,6700,'2024-04-01','FIXED_INCOME','Income: Salary','INCOME','admin',1,NULL,NULL,NULL,NULL,NULL),(9,6700,'2024-05-01','FIXED_INCOME','Income: Salary','INCOME','admin',1,NULL,NULL,NULL,NULL,NULL),(10,6700,'2024-03-01','FIXED_INCOME','Income: Salary','INCOME','admin',1,NULL,NULL,NULL,NULL,NULL),(16,100,'2024-04-13','SINGLE_PAYMENT','Income: One hundred zlotys from grandma','INCOME','admin',3,NULL,NULL,NULL,NULL,NULL),(17,1500,'2024-04-15','SINGLE_PAYMENT','Income: Sold bike','INCOME','admin',4,NULL,NULL,NULL,NULL,NULL),(18,45,'2024-08-20','PLANNED_EXPENSE','Pullers','EXPENSE','admin',NULL,NULL,4,NULL,NULL,NULL),(19,100,'2024-08-20','PLANNED_EXPENSE','Hammocks','EXPENSE','admin',NULL,NULL,7,NULL,NULL,NULL),(20,400,'2024-08-20','PLANNED_EXPENSE','Sleeping bags','EXPENSE','admin',NULL,NULL,6,NULL,NULL,NULL),(21,350,'2024-08-20','PLANNED_EXPENSE','Tent','EXPENSE','admin',NULL,NULL,5,NULL,NULL,NULL),(24,79,'2024-08-20','PLANNED_EXPENSE','Cartridge burner','EXPENSE','admin',NULL,NULL,9,NULL,NULL,NULL),(25,30,'2024-08-20','PLANNED_EXPENSE','Cartouche','EXPENSE','admin',NULL,NULL,8,NULL,NULL,NULL),(26,2000,'2024-08-01','HOUSE','Recurring Expense: Rent','EXPENSE','admin',NULL,NULL,NULL,1,NULL,NULL),(27,2000,'2024-07-01','HOUSE','Recurring Expense: Rent','EXPENSE','admin',NULL,NULL,NULL,1,NULL,NULL),(28,2000,'2024-06-01','HOUSE','Recurring Expense: Rent','EXPENSE','admin',NULL,NULL,NULL,1,NULL,NULL),(29,2000,'2024-05-01','HOUSE','Recurring Expense: Rent','EXPENSE','admin',NULL,NULL,NULL,1,NULL,NULL),(30,2000,'2024-04-01','HOUSE','Recurring Expense: Rent','EXPENSE','admin',NULL,NULL,NULL,1,NULL,NULL),(31,2000,'2024-03-01','HOUSE','Recurring Expense: Rent','EXPENSE','admin',NULL,NULL,NULL,1,NULL,NULL),(32,38.9,'2024-08-08','TRANSPORTATION','Single Expense: Taxi','EXPENSE','admin',NULL,NULL,NULL,NULL,NULL,1),(33,300,'2024-07-18','ENTERTAINMENT','Single Expense: Ognisko','EXPENSE','admin',NULL,NULL,NULL,NULL,NULL,2),(34,259,'2024-06-11','ENTERTAINMENT','Single Expense: Pad XBOX','EXPENSE','admin',NULL,NULL,NULL,NULL,NULL,3),(35,120,'2024-04-10','EDUCATION','Single Expense: Book ','EXPENSE','admin',NULL,NULL,NULL,NULL,NULL,4),(36,2000,'2024-03-01','HOUSE','Recurring Expense: Monthly food','EXPENSE','admin',NULL,NULL,NULL,1,NULL,NULL),(37,2000,'2024-04-01','HOUSE','Recurring Expense: Monthly food','EXPENSE','admin',NULL,NULL,NULL,1,NULL,NULL),(38,2000,'2024-05-01','HOUSE','Recurring Expense: Monthly food','EXPENSE','admin',NULL,NULL,NULL,1,NULL,NULL),(39,2000,'2024-06-01','HOUSE','Recurring Expense: Monthly food','EXPENSE','admin',NULL,NULL,NULL,1,NULL,NULL),(40,2000,'2024-07-01','HOUSE','Recurring Expense: Monthly food','EXPENSE','admin',NULL,NULL,NULL,1,NULL,NULL),(41,2000,'2024-08-01','HOUSE','Recurring Expense: Monthly food','EXPENSE','admin',NULL,NULL,NULL,1,NULL,NULL),(42,233.33333333333334,'2024-08-20','DEBT','Keyboard','EXPENSE','admin',NULL,2,NULL,NULL,NULL,NULL),(43,219,'2024-09-03','PLANNED_EXPENSE','Knife','EXPENSE','admin',NULL,NULL,3,NULL,NULL,NULL),(44,169,'2024-09-03','PLANNED_EXPENSE','Meniscus','EXPENSE','admin',NULL,NULL,10,NULL,NULL,NULL),(45,280,'2024-09-03','PLANNED_EXPENSE','Bike rack','EXPENSE','admin',NULL,NULL,2,NULL,NULL,NULL),(47,280,'2024-09-03','DEBT','Bike carrier','EXPENSE','admin',NULL,3,NULL,NULL,NULL,NULL),(48,350,'2024-09-03','PLANNED_EXPENSE','Panniers','EXPENSE','admin',NULL,NULL,1,NULL,NULL,NULL);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
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
