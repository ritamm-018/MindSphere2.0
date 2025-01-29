-- MySQL dump 10.13  Distrib 9.1.0, for Win64 (x86_64)
--
-- Host: localhost    Database: mentalhealthapp
-- ------------------------------------------------------
-- Server version	9.1.0

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
-- Current Database: `mentalhealthapp`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `mentalhealthapp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `mentalhealthapp`;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `doctor_id` int NOT NULL,
  `user_id` int NOT NULL,
  `appointment_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `doctor_id` (`doctor_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE,
  CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `details` text NOT NULL,
  `specialization` varchar(100) DEFAULT NULL,
  `contact` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` VALUES (1,'Dr. Alice Johnson','Experienced psychologist with a focus on cognitive-behavioral therapy.','Psychologist','555-1010'),(2,'Dr. Mark Roberts','Psychiatrist with expertise in managing mental health disorders and prescribing medications.','Psychiatrist','555-2020'),(3,'Dr. Emily Davis','Therapist specializing in family counseling and relationship therapy.','Therapist','555-3030'),(4,'Dr. Sarah Lee','Counselor with a background in addiction therapy and support groups.','Counselor','555-4040'),(5,'Dr. Michael Turner','Clinical psychologist with a focus on trauma and PTSD treatment.','Clinical Psychologist','555-5050');
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emergencynumbers`
--

DROP TABLE IF EXISTS `emergencynumbers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emergencynumbers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `doctor_contact` varchar(15) DEFAULT NULL,
  `other_numbers` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `emergencynumbers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emergencynumbers`
--

LOCK TABLES `emergencynumbers` WRITE;
/*!40000 ALTER TABLE `emergencynumbers` DISABLE KEYS */;
INSERT INTO `emergencynumbers` VALUES (1,1,'555-1234','{\"family\": [\"555-5678\", \"555-8765\"], \"friend\": \"555-4321\"}'),(2,1,'123-456-7890','{\"emergency_contact\": \"111-222-3333\"}'),(3,2,'987-654-3210','{\"emergency_contact\": \"444-555-6666\"}');
/*!40000 ALTER TABLE `emergencynumbers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(100) NOT NULL,
  `event_type` enum('Seminar','Webinar','Get Together') NOT NULL,
  `event_time` datetime NOT NULL,
  `rsvp_users` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Mental Health Awareness Seminar','Seminar','2024-02-05 10:00:00','{\"attendees\": [1, 2]}'),(2,'Mindfulness Webinar','Webinar','2024-02-10 15:00:00','{\"attendees\": [2, 3]}'),(3,'Community Get Together','Get Together','2024-02-15 18:00:00','{\"attendees\": [1, 3]}'),(4,'Mental Health Awareness Webinar','Webinar','2025-02-10 18:00:00','[\"user_1\", \"user_2\", \"user_3\"]'),(5,'Mental Health Seminar','Seminar','2023-10-10 18:00:00','[1, 2]'),(6,'Yoga Webinar','Webinar','2023-10-15 09:00:00','[2]');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercises`
--

DROP TABLE IF EXISTS `exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercises` (
  `id` int NOT NULL AUTO_INCREMENT,
  `exercise_name` varchar(100) NOT NULL,
  `details` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercises`
--

LOCK TABLES `exercises` WRITE;
/*!40000 ALTER TABLE `exercises` DISABLE KEYS */;
INSERT INTO `exercises` VALUES (1,'Deep Breathing','Practice deep breathing for relaxation.'),(2,'Guided Meditation','Follow a guided meditation for mindfulness.'),(3,'Stretching','Simple stretching exercises to release tension.'),(4,'Deep Breathing','A simple breathing exercise to reduce stress.'),(5,'Mindfulness Meditation','A practice that focuses on being present in the moment.'),(6,'Stretching','Simple stretching exercises to release tension.'),(7,'Meditation','A relaxation technique that involves focusing the mind.'),(8,'Deep Breathing','A relaxation technique to reduce stress.'),(9,'Mindfulness Meditation','Practice focusing on the present moment.'),(10,'Meditation','A relaxation technique that involves focusing the mind to achieve mental clarity and relaxation.'),(11,'Yoga','A series of physical postures, breath control, and meditation to enhance flexibility and mental peace.'),(12,'Running','A cardiovascular exercise that involves moving at a fast pace on foot, boosting stamina and endurance.'),(13,'Strength Training','Physical exercises designed to improve strength and build muscle mass using weights or resistance.'),(14,'Breathing Exercises','Techniques focused on controlling breathing patterns to reduce stress and improve relaxation.'),(15,'Meditation','A relaxation technique that involves focusing the mind to achieve mental clarity and relaxation.'),(16,'Yoga','A series of physical postures, breath control, and meditation to enhance flexibility and mental peace.'),(17,'Running','A cardiovascular exercise that involves moving at a fast pace on foot, boosting stamina and endurance.'),(18,'Strength Training','Physical exercises designed to improve strength and build muscle mass using weights or resistance.'),(19,'Breathing Exercises','Techniques focused on controlling breathing patterns to reduce stress and improve relaxation.');
/*!40000 ALTER TABLE `exercises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moodtracker`
--

DROP TABLE IF EXISTS `moodtracker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `moodtracker` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `date` date NOT NULL,
  `mood_logs` json DEFAULT NULL,
  `journal_entry` text,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `moodtracker_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moodtracker`
--

LOCK TABLES `moodtracker` WRITE;
/*!40000 ALTER TABLE `moodtracker` DISABLE KEYS */;
INSERT INTO `moodtracker` VALUES (1,1,'2024-01-01','{\"mood\": \"happy\", \"stress\": \"low\"}','Feeling great today!'),(2,2,'2024-01-02','{\"mood\": \"anxious\", \"stress\": \"high\"}','Had a stressful day.'),(3,3,'2024-01-03','{\"mood\": \"neutral\", \"stress\": \"medium\"}','Nothing special happened.'),(4,1,'2025-01-29','{\"mood\": \"Happy\", \"mood_score\": 8}','Today was a good day, I feel motivated.'),(5,1,'2023-10-01','{\"mood\": \"happy\", \"energy_level\": \"high\"}','Had a great day today!'),(6,2,'2023-10-01','{\"mood\": \"calm\", \"energy_level\": \"medium\"}','Feeling relaxed after yoga.');
/*!40000 ALTER TABLE `moodtracker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `progress`
--

DROP TABLE IF EXISTS `progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `progress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `week_start_date` date NOT NULL,
  `weekly_mood_data` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `progress`
--

LOCK TABLES `progress` WRITE;
/*!40000 ALTER TABLE `progress` DISABLE KEYS */;
INSERT INTO `progress` VALUES (1,1,'2024-01-01','{\"average_mood\": \"happy\", \"stress_level\": \"low\"}'),(2,2,'2024-01-08','{\"average_mood\": \"anxious\", \"stress_level\": \"high\"}'),(3,3,'2024-01-15','{\"average_mood\": \"neutral\", \"stress_level\": \"medium\"}'),(4,1,'2025-01-01','{\"week_1\": {\"mood_avg\": 7.5, \"journals_count\": 3}}'),(5,1,'2023-10-01','{\"mood_data\": [{\"day\": \"Monday\", \"mood\": \"happy\"}, {\"day\": \"Tuesday\", \"mood\": \"excited\"}]}'),(6,2,'2023-10-01','{\"mood_data\": [{\"day\": \"Monday\", \"mood\": \"calm\"}, {\"day\": \"Tuesday\", \"mood\": \"relaxed\"}]}');
/*!40000 ALTER TABLE `progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `profile_info` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'john_doe','hashed_password_1','john@example.com','Mental health enthusiast.','2025-01-29 04:25:13'),(2,'jane_smith','hashed_password_2','jane@example.com','Yoga and meditation lover.','2025-01-29 04:25:13'),(3,'alice_walker','hashed_password_3','alice@example.com','Mindfulness practitioner.','2025-01-29 04:25:13'),(4,'johndoe','hashedpassword123','johndoe@example.com','John Doe?s profile info','2025-01-29 04:38:37'),(17,'johnsmith','$2a$12$KIXs3uDTTU4q.8yX1p3H7eGq8MOxhggZPBbxT2vYXB.dD4MnmK3VG','johnsmith@example.com','John Smith?s profile. Enjoys photography and traveling.','2025-01-29 05:04:20'),(18,'janedoe','$2a$12$5Yt4l6.SG0m2gbh9HjlGbZzL6eBs.2ImDC0/MnD3b5pZz3zOtX9hu','janedoe@example.com','Jane Doe. Avid reader and loves hiking.','2025-01-29 05:04:20'),(19,'michaelb','$2a$12$XP9my6bmeGJj6XBm2gMCyyN.w3f0nOgf2sml6yZjPQpuFdsQJp7Ey','michaelb@example.com','Michael?s profile. Tech enthusiast and gaming lover.','2025-01-29 05:04:20'),(20,'sarahjane','$2a$12$xtvnFsoixpxMZTcmnxTbFJ5U5OgM4pg7f4DhSgaHuyMeC9pcG7fZW','sarahjane@example.com','Sarah Jane. Passionate about fitness and wellness.','2025-01-29 05:04:20'),(21,'william88','$2a$12$5Vj5Xa/xN8z.8lPvX9J4qugtYNhVjclR1YuaKNeO4CeqXsOPQAFPa','william88@example.com','Williamson?s profile. Loves music and exploring new hobbies.','2025-01-29 05:04:20');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-29 15:13:06
