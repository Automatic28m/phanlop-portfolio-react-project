-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: phanlop-mysql-phanlop-portfolio.k.aivencloud.com    Database: defaultdb
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (3,'Automatic28m','$2b$10$PPYFED1D7cbjGIt8bLs/ROZk0d3yO390dnYp8EEyn/c74ezqtNcRO','2025-05-24 15:24:40');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gallery` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `portfolio_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `portfolio_id` (`portfolio_id`)
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery`
--

LOCK TABLES `gallery` WRITE;
/*!40000 ALTER TABLE `gallery` DISABLE KEYS */;
INSERT INTO `gallery` VALUES (10,'uploads\\1746079950795.png',75),(11,'uploads\\1746079950823.png',75),(12,'uploads\\1746079950874.png',75),(18,'uploads/1748169780478.jpeg',77),(19,'uploads/1748169780555.jpeg',77),(20,'uploads/1748169780627.jpeg',77),(29,'uploads/1748170175095.jpeg',81),(30,'uploads/1748170273267.jpg',84),(32,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748188363/portfolio_galleries/test_gallery_1_1748188361182.jpg',86),(33,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748238614/portfolio_galleries/gallery_1_1748238611962.png',85),(34,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748238673/portfolio_galleries/gallery_1_1748238671362.jpg',76),(35,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748238673/portfolio_galleries/gallery_2_1748238671362.jpg',76),(36,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748238673/portfolio_galleries/gallery_3_1748238671362.jpg',76),(37,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748238673/portfolio_galleries/gallery_4_1748238671362.jpg',76),(38,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748238672/portfolio_galleries/gallery_5_1748238671362.jpg',76),(39,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748238695/portfolio_galleries/gallery_1_1748238694192.jpg',55),(40,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748238741/portfolio_galleries/gallery_1_1748238739515.jpg',54),(41,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748238741/portfolio_galleries/gallery_2_1748238739515.jpg',54),(42,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748238741/portfolio_galleries/gallery_3_1748238739515.jpg',54),(43,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748238789/portfolio_galleries/gallery_1_1748238787563.jpg',56),(44,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748238789/portfolio_galleries/gallery_2_1748238787563.jpg',56),(45,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748238928/portfolio_galleries/gallery_1_1748238925865.jpg',57),(46,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748238928/portfolio_galleries/gallery_2_1748238925865.jpg',57),(47,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748238928/portfolio_galleries/gallery_3_1748238925865.jpg',57),(48,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748238927/portfolio_galleries/gallery_4_1748238925865.jpg',57),(49,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748238927/portfolio_galleries/gallery_5_1748238925865.jpg',57),(50,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748238998/portfolio_galleries/gallery_1_1748238996532.jpg',78),(51,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748238998/portfolio_galleries/gallery_2_1748238996532.jpg',78),(52,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748238998/portfolio_galleries/gallery_3_1748238996532.jpg',78),(53,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748238998/portfolio_galleries/gallery_4_1748238996532.jpg',78),(54,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748238998/portfolio_galleries/gallery_5_1748238996532.jpg',78),(55,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748238998/portfolio_galleries/gallery_6_1748238996532.jpg',78),(56,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748238998/portfolio_galleries/gallery_7_1748238996532.jpg',78),(57,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239094/portfolio_galleries/gallery_1_1748239091962.jpg',53),(58,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239094/portfolio_galleries/gallery_2_1748239091962.jpg',53),(59,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239093/portfolio_galleries/gallery_3_1748239091962.jpg',53),(60,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239094/portfolio_galleries/gallery_4_1748239091962.jpg',53),(61,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239094/portfolio_galleries/gallery_5_1748239091962.jpg',53),(62,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239205/portfolio_galleries/gallery_1_1748239203577.jpg',35),(63,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239205/portfolio_galleries/gallery_2_1748239203577.jpg',35),(64,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239205/portfolio_galleries/gallery_3_1748239203577.jpg',35),(65,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239205/portfolio_galleries/gallery_4_1748239203577.jpg',35),(66,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239206/portfolio_galleries/gallery_5_1748239203577.jpg',35),(67,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239205/portfolio_galleries/gallery_6_1748239203577.jpg',35),(68,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239332/portfolio_galleries/gallery_1_1748239329708.jpg',32),(69,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239331/portfolio_galleries/gallery_2_1748239329708.jpg',32),(70,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239331/portfolio_galleries/gallery_3_1748239329708.jpg',32),(71,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239332/portfolio_galleries/gallery_4_1748239329708.jpg',32),(72,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239332/portfolio_galleries/gallery_5_1748239329708.jpg',32),(73,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239332/portfolio_galleries/gallery_6_1748239329708.jpg',32),(74,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239332/portfolio_galleries/gallery_7_1748239329708.jpg',32),(75,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239332/portfolio_galleries/gallery_8_1748239329708.jpg',32),(76,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239332/portfolio_galleries/gallery_9_1748239329708.jpg',32),(77,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239483/portfolio_galleries/gallery_1_1748239481364.jpg',64),(78,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239483/portfolio_galleries/gallery_2_1748239481364.jpg',64),(79,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239483/portfolio_galleries/gallery_3_1748239481364.jpg',64),(80,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239483/portfolio_galleries/gallery_4_1748239481364.jpg',64),(81,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239483/portfolio_galleries/gallery_5_1748239481364.jpg',64),(82,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239483/portfolio_galleries/gallery_6_1748239481364.jpg',64),(83,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239482/portfolio_galleries/gallery_7_1748239481364.jpg',64),(84,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239483/portfolio_galleries/gallery_8_1748239481364.jpg',64),(85,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748239483/portfolio_galleries/gallery_9_1748239481364.jpg',64),(86,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748327503/portfolio_galleries/gallery_1_1748327501553.jpg',33),(87,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748327503/portfolio_galleries/gallery_2_1748327501553.jpg',33),(88,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748327504/portfolio_galleries/gallery_3_1748327501553.jpg',33),(89,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748327503/portfolio_galleries/gallery_4_1748327501553.jpg',33),(90,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748333081/portfolio_galleries/gallery_1_1748333076941.png',87),(91,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748333082/portfolio_galleries/gallery_2_1748333076941.png',87),(92,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748333082/portfolio_galleries/gallery_3_1748333076941.png',87),(93,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748333082/portfolio_galleries/gallery_4_1748333076941.png',87),(94,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748333083/portfolio_galleries/gallery_5_1748333076941.png',87),(95,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748333081/portfolio_galleries/gallery_6_1748333076941.png',87),(96,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748333082/portfolio_galleries/gallery_7_1748333076941.png',87),(97,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748333082/portfolio_galleries/gallery_8_1748333076941.png',87),(98,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748333082/portfolio_galleries/gallery_9_1748333076941.png',87),(99,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748355101/portfolio_galleries/gallery_1_1748355097559.png',88),(100,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748355101/portfolio_galleries/gallery_2_1748355097559.png',88),(101,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748355724/portfolio_galleries/gallery_1_1748355721167.png',89),(102,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748412218/portfolio_galleries/gallery_1_1748412216892.png',37),(103,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748412218/portfolio_galleries/gallery_2_1748412216892.png',37),(104,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748412218/portfolio_galleries/gallery_3_1748412216892.png',37),(105,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748412218/portfolio_galleries/gallery_4_1748412216892.png',37),(106,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748412218/portfolio_galleries/gallery_5_1748412216892.png',37),(107,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748412757/portfolio_galleries/gallery_1_1748412754592.png',90),(108,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748412757/portfolio_galleries/gallery_2_1748412754592.png',90),(109,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748412757/portfolio_galleries/gallery_3_1748412754592.png',90),(110,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748412757/portfolio_galleries/gallery_4_1748412754592.png',90),(111,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748412757/portfolio_galleries/gallery_5_1748412754592.png',90),(112,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748412757/portfolio_galleries/gallery_6_1748412754592.png',90),(115,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748414927/portfolio_galleries/gallery_1_1748414925056.jpg',92),(116,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748414927/portfolio_galleries/gallery_2_1748414925056.jpg',92),(117,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748414927/portfolio_galleries/gallery_3_1748414925056.jpg',92),(118,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748414927/portfolio_galleries/gallery_4_1748414925056.jpg',92),(119,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748414927/portfolio_galleries/gallery_5_1748414925056.jpg',92),(120,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748414927/portfolio_galleries/gallery_6_1748414925056.jpg',92),(121,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748415029/portfolio_galleries/gallery_1_1748415026753.jpg',93),(122,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748415029/portfolio_galleries/gallery_2_1748415026753.jpg',93),(123,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748415029/portfolio_galleries/gallery_3_1748415026753.jpg',93),(124,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748415028/portfolio_galleries/gallery_4_1748415026753.jpg',93),(125,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748415028/portfolio_galleries/gallery_5_1748415026753.jpg',93),(126,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748415029/portfolio_galleries/gallery_6_1748415026753.jpg',93),(127,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748415028/portfolio_galleries/gallery_7_1748415026753.jpg',93),(128,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748415029/portfolio_galleries/gallery_8_1748415026753.jpg',93),(129,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748415054/portfolio_galleries/gallery_1_1748415053122.jpg',93),(130,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748415149/portfolio_galleries/gallery_1_1748415146557.jpg',93),(131,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748415149/portfolio_galleries/gallery_2_1748415146557.jpg',93),(132,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748415149/portfolio_galleries/gallery_3_1748415146557.jpg',93),(133,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748531123/portfolio_galleries/gallery_1_1748531122430.png',36),(134,'https://res.cloudinary.com/dwnwhonj6/image/upload/v1748531124/portfolio_galleries/gallery_2_1748531122430.jpg',36);
/*!40000 ALTER TABLE `gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portfolio`
--

DROP TABLE IF EXISTS `portfolio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portfolio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `contents` text COLLATE utf8mb4_general_ci NOT NULL,
  `event_location` text COLLATE utf8mb4_general_ci,
  `event_date` datetime DEFAULT NULL,
  `thumbnail` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `portfolio_type_id` int DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `portfolio_type_id` (`portfolio_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolio`
--

LOCK TABLES `portfolio` WRITE;
/*!40000 ALTER TABLE `portfolio` DISABLE KEYS */;
INSERT INTO `portfolio` VALUES (1,'B.Eng. Computer Engineering - Rajamangala University of Technology Tanyaburi (Currently)','GPAX 3.96','RMUTT','2026-01-01 00:00:00',NULL,6,'2025-04-19 13:13:10'),(2,'High Voc. Cert. Computer Software Dev. - Thai-Austrian Technical College','GPAX 4.00','','2024-01-01 00:00:00',NULL,6,'2025-04-19 13:13:10'),(3,'Voc. Cert. Infomation Technology - Thai-Austrian Technical College','GPAX 3.92','','2022-01-01 00:00:00',NULL,6,'2025-04-19 13:13:10'),(4,'Junior High School - Pattanavechsuksa School','GPAX 3.86','','2018-01-01 00:00:00',NULL,6,'2025-04-19 13:13:10'),(5,'Primary School - Pattanavechsuksa School','GPAX 3.70','','2015-01-01 00:00:00',NULL,6,'2025-04-19 13:13:10'),(21,'HTML','','',NULL,NULL,1,'2025-04-27 03:18:38'),(22,'CSS','','',NULL,NULL,1,'2025-04-27 03:22:22'),(23,'PHP','','',NULL,NULL,1,'2025-04-27 03:22:28'),(24,'SQL','','',NULL,NULL,1,'2025-04-27 03:22:36'),(25,'C','','',NULL,NULL,1,'2025-04-27 03:22:41'),(26,'Python','','',NULL,NULL,1,'2025-04-27 03:22:48'),(27,'React.js','','RMUTT','2025-05-28 00:00:00',NULL,1,'2025-04-27 03:22:56'),(28,'Angular','','',NULL,NULL,1,'2025-04-27 03:23:00'),(29,'Flutter','','',NULL,NULL,1,'2025-04-27 03:23:07'),(30,'Git','','',NULL,NULL,1,'2025-04-27 03:23:13'),(31,'Figma','','',NULL,NULL,1,'2025-04-27 03:23:20'),(32,'Third Runner-up in the National Skills Competition for Network Technology, 31st Edition.','Collaborated on a website development project, contributing to the frontend and backend using basic languages like HTML, PHP, CSS, SQL while my partner focused on the network infrastructure.','Rayong Techical College','2022-07-31 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748188477/portfolio_thumbnails/third_runner-up_in_the_national_skills_competition_for_network_technology%2C_31st_edition._thumbnail_1748188476072.jpg',3,'2025-04-27 03:28:43'),(33,'SOFTWARE DEVELOPER - TECHINVENT CO., LTD.','Fully 4 months of working and learning on main projects using ReactJS, Angular, Flutter, and more','Bangkok, Thailand','2023-10-15 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748531031/portfolio_thumbnails/thumbnail_1748531030670.jpg',4,'2025-04-27 03:33:35'),(35,'Won 1st place in the At the regional level: Eastern Region and Bangkok Skills Competition for Network Technology','Collaborated on a website development project, contributing to the frontend and backend using basic languages like HTML, PHP, CSS, SQL while my partner focused on the network infrastructure.','Rayong Technical College','2022-10-31 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748188498/portfolio_thumbnails/won_1st_place_in_the_at_the_regional_level:_eastern_region_and_bangkok_skills_competition_for_network_technology_thumbnail_1748188496222.jpg',3,'2025-04-27 04:05:57'),(36,'ASIA STEEL TRANSPORT (1999) CO., LTD.','Gain hands-on experience in website development using WordPress, perform data analysis with MS Excel, conduct web application testing, generate reports, and engage in additional related tasks.','Rayong Thailand','2021-09-16 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748531017/portfolio_thumbnails/thumbnail_1748531016058.jpg',4,'2025-04-27 04:12:40'),(37,'Final Year Project for (Diploma, Software Development)','Developed a student internship system for Thai-Austrian Technical College using HTML, CSS, JavaScript, PHP, Bootstrap 5, and SQL.','Thai-Austrian Technical College','2023-12-30 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748411677/portfolio_thumbnails/thumbnail_1748411675363.png',2,'2025-04-27 04:18:11'),(38,'Retail Shop Team Project','Utilized HTML, CSS, JavaScript, PHP, Bootstrap 5, and SQL to develop a web application for a retail shop.','Thai-Austrian Technical College','2023-11-30 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748188422/portfolio_thumbnails/retail_shop_team_project_thumbnail_1748188421366.jpg',2,'2025-04-27 04:20:23'),(39,'Final Year Project (Vocational Certificate, Software Development)','Developed an internship and company website for the IT and Computer Technology Department at Thai-Austrian Technical College.','Thai-Austrian Technical College','2021-11-30 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748188437/portfolio_thumbnails/final_year_project_%28vocational_certificate%2C_software_development%29_thumbnail_1748188436123.jpg',2,'2025-04-27 04:26:20'),(53,'Master of Ceremonies (MC) for the Thai-Austrian Tech Open House 2022','พิธีกร งานเปิดบ้านวิชาการ Thai-Austrian Tech Open House 2022','Thai-Austrian Technical College','2022-11-30 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748529336/portfolio_thumbnails/thumbnail_1748529334393.jpg',5,'2025-04-28 04:18:45'),(54,'Representative presenting information about the Digital Industry Department during the Sattahip Model visit led by Dr. Thanakorn Wangboonkongchana.','ตัวแทนนำเสนอข้อมูลแผนกอุตสาหกรรมดิจิทัล ในพิธีเยี่ยมชมสัตหีบโมเดล โดย ดร.ธนะกร วังบุญคงชนะ','Thai-Austrian Technical College','2023-11-30 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748189603/portfolio_thumbnails/54_thumbnail_1748189601907.jpg',5,'2025-04-28 04:22:48'),(55,'Presented the exhibition \"Lifelong Human Capacity Development and the Production and Development of Highly Skilled Vocational Manpower.\"','นำเสนอนิทรรศการ \"การพัฒนาศักยภาพคนตลอดช่วงชีวิต การผลิตและพัฒนากำลังคนอาชีวศึกษาสมรรถะสูง\"','Thai-Austrian Technical College','2023-11-30 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748189621/portfolio_thumbnails/55_thumbnail_1748189620246.jpg',5,'2025-04-28 04:26:34'),(56,'Represented and presented information about the Computer Department in English during the visit by the Ambassador of Austria.','ตัวแทนนำเสนอ นำเสนอข้อมูลแผนกคอมพิวเตอร์เป็นภาษาอังกฤษ ในพิธีเยี่ยมชมโดยฑูตจากประเทศออสเตรีย','Thai-Austrian Technical College','2022-12-31 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748189639/portfolio_thumbnails/56_thumbnail_1748189638410.jpg',5,'2025-04-28 04:33:09'),(57,'Conducted a guidance session on academic pathways for lower secondary school students.','แนะแนวและให้ความรู้การศึกษาต่อ แก่น้อง ๆ นักเรียนระดับมัธยมต้น','Sattahip School','2021-12-31 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748189671/portfolio_thumbnails/57_thumbnail_1748189668711.jpg',5,'2025-04-28 04:35:57'),(58,'Vice President of the Computer Department and Cheerleading Captain','รองประธานแผนกคอมพิวเตอร์ และประธานเชียร์','Thai-Austrian Technical College','2021-12-31 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748529891/portfolio_thumbnails/thumbnail_1748529889969.jpg',5,'2025-04-28 04:36:59'),(59,'First Runner-up Award in the English Public Speaking Contest, Vocational Education Level, Chonburi Province','รางวัลรองชนะเลิศอันดับ 1 English Public Speaking Contest ระดับอาชีวศึกษาจังหวัด จังหวัดชลบุรี','Pattaya Technical College','2020-12-22 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748188552/portfolio_thumbnails/first_runner-up_award_in_the_english_public_speaking_contest%2C_vocational_education_level%2C_chonburi_province_thumbnail_1748188548805.png',3,'2025-04-28 04:45:18'),(60,'Winner of the English Public Speaking Contest, School Level, Sattahip Technical College','รางวัลชนะเลิศ English Public Speaking Contest ระดับสถานศึกษา วิทยาลัยเทคนิคสัตหีบ','Thai-Austrian Technical College','2020-12-08 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748188588/portfolio_thumbnails/winner_of_the_english_public_speaking_contest%2C_school_level%2C_sattahip_technical_college_thumbnail_1748188585101.png',3,'2025-04-28 04:47:33'),(61,'1st Runner-Up of the English Demonstration Contest, Vocational Education Level, Chonburi Province','รางวัลรองชนะเลิศอันดับ 1 English Demonstration Contest ระดับอาชีวศึกษา จังหวัดชลบุรี','Pattaya Technical College','2021-12-14 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748188625/portfolio_thumbnails/1st_runner-up_of_the_english_demonstration_contest%2C_vocational_education_level%2C_chonburi_province_thumbnail_1748188622901.png',3,'2025-04-28 04:49:48'),(62,'Winner of the English Public Speaking Contest, School Level, Thai-Austrian Technical College','รางวัลชนะเลิศ การแข่งขันทักษะการประกวดพูดในที่สาธารณะเป็นภาษาอังกฤษ','Thai-Austrian Technical College','2021-11-30 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748188674/portfolio_thumbnails/winner_of_the_english_public_speaking_contest%2C_school_level%2C_thai-austrian_technical_college_thumbnail_1748188672502.png',3,'2025-04-28 04:52:52'),(63,'Scored 690 out of 990 on the Test of English for International Communication (TOEIC)','','Thai-Austrian Technical College','2023-09-17 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748190678/portfolio_thumbnails/63_thumbnail_1748190676837.jpg',3,'2025-04-28 04:54:03'),(64,'Demonstrates excellent leadership qualities and military demeanor, Thai Reserve Officer Training Corps Student in the Third Year','มีความเป็นผู้นำ และมีลักษณะท่าทางทหารดีเยี่ยม หลักสูตรนักศึกษาวิชาทหารชั้นปีที่ 3','โรงเรียนต่อสู้อากาศยานและรักษาฝั่ง','2023-01-14 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748190873/portfolio_thumbnails/64_thumbnail_1748190871893.jpg',3,'2025-04-28 05:00:13'),(76,'Master of Ceremonies for the Wai Khru Ceremony for the Academic Year 2023','พิธีกรในพิธีไหว้ครู ปีการศึกษา 2566','Thai-Austrian Technical College','2023-06-07 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748189901/portfolio_thumbnails/76_thumbnail_1748189899388.jpg',5,'2025-05-25 10:39:09'),(77,'Provided academic guidance and introduced the department to visiting students during the Thai-Austrian Tech Open House 2022','เป็นผู้แนะแนวให้ความรู้แผนกวิชา ให้กับน้องๆที่เข้ามาดูงานเปิดบ้านวิชาการ Thai-Austrian Tech Open House 2022\r\n','Thai-Austrian Technical College','2022-11-22 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748189930/portfolio_thumbnails/77_thumbnail_1748189928849.jpg',5,'2025-05-25 10:43:00'),(78,'Attended a training program titled \'No Smoking, Less Risk, Say No to Drugs\' aimed at promoting healthy, drug-free lifestyles.','เข้าร่วมการอบรม โครงการ ไม่สูบ ลดเสี่ยง เลี่ยงยาเสพติด','Thai-Austrian Technical College','2022-10-28 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748189968/portfolio_thumbnails/78_thumbnail_1748189966422.jpg',5,'2025-05-25 10:45:28'),(79,'Awarded First Place in the TikTok Video Competition under the \'No Smoking, Less Risk, Say No to Drugs\' Project.','รางวัลชนะเลิศ ประกวดคลิปวิดีโอ TikTok โครงการไม่สูบ ลดเสี่ยง เลี่ยงยาเสพติด','Thai-Austrian Technical College','2022-10-28 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748188829/portfolio_thumbnails/awarded_first_place_in_the_tiktok_video_competition_under_the_%27no_smoking%2C_less_risk%2C_say_no_to_drugs%27_project._thumbnail_1748188828081.jpg',3,'2025-05-25 10:47:36'),(80,'Awarded Second Place in the English Public Speaking Competition on the theme \'Start-up in the New Normal','รางวัลรองชนะเลิศ การแข่งขันทักษะพูดภาษาอังกฤษ ในหัวข้อ Start-up in the new normal','Thai-Austrian Technical College','2022-10-25 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748190727/portfolio_thumbnails/80_thumbnail_1748190726294.jpg',3,'2025-05-25 10:49:17'),(82,'Served as the Master of Ceremonies for the Wai Khru Ceremony in the academic year 2022.','เป็นพิธีกร กิจกรรม พิธีไหว้ครู 2565','Thai-Austrian Technical College','2022-06-17 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748189852/portfolio_thumbnails/82_thumbnail_1748189850667.jpg',5,'2025-05-25 10:50:52'),(85,'Received the Bronze Award (Consolation Prize) in the Young Inventors Contest at the Vocational Education Level, Chonburi Province, held at the Science-Based Technology Vocational College (Chonburi). Took the role of English presenter for the invention','รางวัลชมเชย ระดับเหรียญทองแดง การประกวดสิ่งประดิษฐ์ของคนรุ่นใหม่ ระดับอาชีวศึกษาจังหวัดชลบุรี ณ วิทยาลัยอาชีวศึกษาเทคโนโลยีฐานวิทยาศาสตร์(ชลบุรี) ซึ่งได้รับหน้าที่ผู้บรรยายสิ่งประดิษฐ์เป็นภาษาอังกฤษ','Science-Based Technology Vocational College (Chonburi)','2021-03-22 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748189488/portfolio_thumbnails/85_thumbnail_1748189486496.png',3,'2025-05-25 10:53:44'),(87,'Pollanwser.org app','Project Description:\r\nDeveloped a full-stack poll web application using React.js, Java Spring Boot, and Tailwind CSS to enhance practical development skills.\r\n\r\nKey Features:\r\n- User Authentication with JWT (JSON Web Token) for secure login and registration\r\n- CRUD operations for both Polls and Users\r\n- Frontend: Built with React.js, styled using Tailwind CSS for a responsive UI\r\n- Backend: Implemented with Java Spring Boot, exposing RESTful APIs\r\n- Secure authentication flow including token-based access control','Bangkok, Thailand','2023-10-14 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748333201/portfolio_thumbnails/thumbnail_1748333198700.png',2,'2025-05-27 08:04:44'),(88,'Flutter News App','A news application that fetches data from an API and includes a bookmark system to save articles, demonstrating state management in Flutter.\r\n\r\nSee my project here:\r\nhttps://github.com/Automatic28m/flutter-app-demos/tree/main/news_app','Bangkok, Thailand','2024-01-29 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748533272/portfolio_thumbnails/thumbnail_1748533270993.png',2,'2025-05-27 14:11:42'),(89,'Flutter Space Shooter mobile game','A simple 2D game built in Flutter, demonstrating game development concepts and animations.\r\n\r\nTo see demo in my Github\r\nhttps://github.com/Automatic28m/flutter-app-demos/tree/main/space_shooter','Bangkok, Thailand','2024-01-29 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748355722/portfolio_thumbnails/thumbnail_1748355721167.png',2,'2025-05-27 14:22:04'),(90,'Angular Online Poll App','A simple yet functional polling/voting application built with Angular. This project demonstrates the use of forms, event handling, and state management. It interacts with a backend service developed using Java Spring Boot via API calls. The user interface is styled with Tailwind CSS and DaisyUI, providing a clean and modern look.','Bangkok, Thailand','2024-01-29 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748412756/portfolio_thumbnails/thumbnail_1748412754592.jpg',2,'2025-05-28 06:12:38'),(92,'Winner of RMUTT Engineering Freshy Boy 2024','Awarded first place in the Engineering Freshy Boy 2024 contest at Rajamangala University of Technology Thanyaburi (RMUTT). This competition recognizes outstanding new students in the Faculty of Engineering based on criteria such as personality, confidence, communication skills, and overall performance during university activities. Winning this title reflects both leadership potential and a strong presence within the student community.','RMUTT','2027-07-26 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748449312/portfolio_thumbnails/thumbnail_1748449310571.jpg',5,'2025-05-28 06:44:07'),(93,'1st Runner-up, RMUTT Freshy Boy 2024','Achieved first runner-up in the RMUTT Freshy Boy 2024 contest at the university level. This competition celebrates outstanding first-year students across all faculties at Rajamangala University of Technology Thanyaburi (RMUTT), with a focus on personality, confidence, public speaking, and campus involvement. Being awarded this position reflects strong interpersonal skills and active participation in university life.','RMUTT','2024-08-16 00:00:00','https://res.cloudinary.com/dwnwhonj6/image/upload/v1748414800/portfolio_thumbnails/thumbnail_1748414798683.jpg',5,'2025-05-28 06:46:41'),(94,'Node.js','','','2025-05-28 00:00:00',NULL,1,'2025-05-29 14:24:50'),(95,'Express.js','','','2025-05-28 00:00:00',NULL,1,'2025-05-29 14:25:29');
/*!40000 ALTER TABLE `portfolio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portfolio_skill_types`
--

DROP TABLE IF EXISTS `portfolio_skill_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portfolio_skill_types` (
  `portfolio_id` int NOT NULL,
  `skill_type_id` int NOT NULL,
  PRIMARY KEY (`portfolio_id`,`skill_type_id`),
  KEY `skill_type_id` (`skill_type_id`),
  CONSTRAINT `portfolio_skill_types_ibfk_1` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolio` (`id`) ON DELETE CASCADE,
  CONSTRAINT `portfolio_skill_types_ibfk_2` FOREIGN KEY (`skill_type_id`) REFERENCES `skill_type` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolio_skill_types`
--

LOCK TABLES `portfolio_skill_types` WRITE;
/*!40000 ALTER TABLE `portfolio_skill_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `portfolio_skill_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portfolio_type`
--

DROP TABLE IF EXISTS `portfolio_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portfolio_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `descriptions` varchar(60) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolio_type`
--

LOCK TABLES `portfolio_type` WRITE;
/*!40000 ALTER TABLE `portfolio_type` DISABLE KEYS */;
INSERT INTO `portfolio_type` VALUES (1,'skills','','2025-04-19 13:13:09'),(2,'projects','','2025-04-19 13:13:09'),(3,'achievements','','2025-04-19 13:13:09'),(4,'internships','','2025-04-19 13:13:09'),(5,'activities','academic activities','2025-04-19 13:13:09'),(6,'educations','','2025-04-19 13:13:09');
/*!40000 ALTER TABLE `portfolio_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill_type`
--

DROP TABLE IF EXISTS `skill_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `color` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill_type`
--

LOCK TABLES `skill_type` WRITE;
/*!40000 ALTER TABLE `skill_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `skill_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'defaultdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-30 10:23:14
