
-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: welearn
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `formation`
--

DROP TABLE IF EXISTS `formation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formation` (
  `name` text NOT NULL,
  `wallet_creator` text NOT NULL,
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nft_contract` text NOT NULL,
  `ntt_contract` text NOT NULL,
  `price` int NOT NULL DEFAULT '0',
  `content` text NOT NULL,
  `question1` text NOT NULL,
  `question2` text NOT NULL,
  `answer1` text NOT NULL,
  `answer2` text NOT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formation`
--

LOCK TABLES `formation` WRITE;
/*!40000 ALTER TABLE `formation` DISABLE KEYS */;
INSERT INTO `formation` VALUES ('Test 2','0x27d1ce56d9c8fdf5804d102b17531371bc5c81cc',14,'0xb33a3640D1771C8ad51F0783f8E9E67d75bE947a','0x43c79827888e72C02Ef3603447848B4f9291B11d',0,'azer','azer','cvbn','dfgh','fgh'),('Test3','0xfd5a47d1046a38bd578cbc8a9563b34eeb49c3aa',15,'0xD5c33837e38412d13920d5d0ea7D50f2Fe411C8C','0xA5F478f0a493EAf4C6fA06192200EeDe20Cd9322',10,'fsqf','AZ','AZ','AZ','AZ'),('Test3','0xfd5a47d1046a38bd578cbc8a9563b34eeb49c3aa',16,'0xC0284aBa8a1bcD0753f47bb32c55F3b78E902781','0x26F9952a10A5f1A4E72159889466db8CF095C1C6',10,'fsqf','AZ','AZ','AZ','AZ');
/*!40000 ALTER TABLE `formation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-08 10:12:06
