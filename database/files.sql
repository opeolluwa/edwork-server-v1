-- MySQL dump 10.13  Distrib 8.0.26, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: oldshelf_x
-- ------------------------------------------------------
-- Server version	8.0.26-0ubuntu0.20.04.3

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
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `files` (
  `id` int NOT NULL,
  `course_code` varchar(10) NOT NULL,
  `course_title` varchar(200) NOT NULL,
  `type` varchar(20) DEFAULT 'note',
  `uploaded_by` varchar(20) DEFAULT NULL,
  `link_to_file` varchar(255) NOT NULL,
  `favourite` int DEFAULT '0',
  `recent` int DEFAULT '0',
  `date_uploaded` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (1,'ele 305','electrical machines i','question','Drizzle','https://ik.imagekit.io/nethbooks/ele_305_pq-1_2XWDkAw_i-.pdf?updatedAt=1636074743015',0,0,'2021-11-05 01:08:52'),(2,'ele 307','electronic circuit','note','Drizzle','https://ik.imagekit.io/nethbooks/ele_307_leture_note__op_amp_basic_digital__pdf_rru22sqgL.pdf?updatedAt=1636074725570',0,0,'2021-11-05 01:08:52'),(3,'ele 307','engineering mathematics ii','note','Drizzle','https://ik.imagekit.io/nethbooks/ele_342_note_2_I-WApe2mn2.pdf?updatedAt=1636074723596',0,0,'2021-11-05 01:08:52'),(4,'ele 308','electronic circuit ii','note','Drizzle','https://ik.imagekit.io/nethbooks/ee321s3.1_KMc6l-hV-.pdf?updatedAt=1636074710325',0,0,'2021-11-05 01:08:52'),(5,'ele 307','electronic circuit i','question','Drizzle','https://ik.imagekit.io/nethbooks/ele_307_tutorial_questions-2018_BuCCH746a.pdf?updatedAt=1636074708698',0,0,'2021-11-05 01:08:52'),(6,'abe 202','engineering drawing ii','question','Drizzle','https://ik.imagekit.io/nethbooks/ABE_202_pq_pFoELNcTYR.pdf?updatedAt=1623465097923',0,0,'2021-11-05 01:08:52'),(7,'mts 102','calculus and trigonometry','question','Drizzle','https://ik.imagekit.io/nethbooks/2017_MTS_102_marking_guide_1__jtFCVdchP.pdf?updatedAt=1623465097850',0,0,'2021-11-05 01:08:52'),(8,'abe 204','workshop practices','note','Drizzle','https://ik.imagekit.io/nethbooks/ABE_204_safety_in_the_workshop_abFeMOLzi2P.pdf?updatedAt=1623465079138',0,0,'2021-11-05 01:08:52'),(9,'abe 106','elemenrary fluid flow','question','Drizzle','https://ik.imagekit.io/nethbooks/ABE_106_past_question-2016_-_2017_l3MTr8bRlmN.pdf?updatedAt=1623465075102',0,0,'2021-11-05 01:08:52'),(10,'mts 102','calculus and trigonometry','question','Drizzle','https://ik.imagekit.io/nethbooks/2019mts102tq4calculus_5DdaxQFNnNE.pdf?updatedAt=1623465069833',0,0,'2021-11-05 01:08:52'),(11,'mts 102','calculus and trigonometry','question','Drizzle','https://ik.imagekit.io/nethbooks/2019mts102tq3trigonometry_nSWbjl7Glv.pdf?updatedAt=1623465069022',0,0,'2021-11-05 01:08:52'),(12,'mts 102','calculus and trigonometry','question','Drizzle','https://ik.imagekit.io/nethbooks/2019mts102tq2trigonometry_s3lRwKrkOrQ.pdf?updatedAt=1623465068793',0,0,'2021-11-05 01:08:52'),(13,'mts 102','function of real variables and their graphs','note','Drizzle','https://ik.imagekit.io/nethbooks/2019mts102tq_FUNCTION_OF_REAL_VARIABLES_AND_THEIR_GRAPHSSU_ii-qdQEz51Mn.pdf?updatedAt=1623465068211',0,0,'2021-11-05 01:08:52'),(14,'mts 102','calculus and trigonometry','note','Drizzle','https://ik.imagekit.io/nethbooks/2019mts102cat-marking-guide_Syq1HNIQM_T.pdf?updatedAt=1623465067990',0,0,'2021-11-05 01:08:52'),(15,'chm 104','introduction to inorganic chemistry','note','drizzle','https://ik.imagekit.io/nethbooks/474_CHM_104_BeY43zmsg.pdf',0,0,'2021-11-14 01:51:22'),(16,'chm 101','chemical equillibrum','note','drizzle','https://ik.imagekit.io/nethbooks/CHM_101_B_ZGc1eGFdlo.pdf',0,0,'2021-11-14 01:51:22'),(17,'chm 102','chemistry of carboxylic acids','note','drizzle','https://ik.imagekit.io/nethbooks/CHM_1026_ICHEtX7DYx.pdf',0,0,'2021-11-14 01:51:22'),(18,'chm 104','extraction of metals','note','drizzle','https://ik.imagekit.io/nethbooks/chm_104_note_B_.pdf_Watermarked_8nqKbWZOcC.pdf',0,0,'2021-11-14 01:51:22'),(19,'chm 104','hybridization & Shapes of simple Mlmolecules','note','drizzle','https://ik.imagekit.io/nethbooks/CHM__104_-_NUCLEAR-__Dr_Amolegbe_hM7C1SeGAt.pdf',0,0,'2021-11-14 01:51:22'),(20,'chm 102','Chemistry of benzene,alcohols, including phenols, aldehydes,and ketones','note','drizzle','https://ik.imagekit.io/nethbooks/CHM_102_2018_2019_L38PaLWay.pdf',0,0,'2021-11-14 01:51:22'),(21,'chm 104','carbon group element, nuclear chemistry, introduction to transition merals','note','drizzle','https://ik.imagekit.io/nethbooks/CHM_104_INTRO_TO_INORGANIC-1_XF-8Rv0aG.pdf',0,0,'2021-11-14 01:51:22'),(22,'chm 104','principles of extraction of metals','note','drizzle','https://ik.imagekit.io/nethbooks/CHM_104_Extraction_of_Metals-1_XNeJN69r5.pdf',0,0,'2021-11-14 01:51:22'),(23,'mts 101','algebra','question','Drizzle','https://ik.imagekit.io/nethbooks/2018mts101e_SSFEhJuw8.pdf',0,0,'2021-11-14 02:30:31'),(24,'mts 101','algebra','question','Drizzle','https://ik.imagekit.io/nethbooks/2019mts101tq3_l4U1qiRZe.pdf',0,0,'2021-11-14 02:30:31'),(25,'mts 101','algebra','question','Drizzle','https://ik.imagekit.io/nethbooks/2019mts101tq4_-_Copy__1__mlJxapw8Ol.pdf',0,0,'2021-11-14 02:30:31'),(26,'mts 101','algebra','question','Drizzle','https://ik.imagekit.io/nethbooks/2019mts101tq1-1_dlcw471xl.pdf',0,0,'2021-11-14 02:30:31'),(27,'mts 101','algebra','question','Drizzle','https://ik.imagekit.io/nethbooks/2019mts101opencat1_9K22J6ULL.pdf',0,0,'2021-11-14 02:30:31'),(28,'mts 105','binomial theorem,binomial series,binomial expansion and applications','note','Drizzle','https://ik.imagekit.io/nethbooks/475_Mts_105C_lecture_note_Q3_EZm4UtR.pdf',0,0,'2021-11-14 02:30:31'),(29,'mts 211','abstract algebra','note','Drizzle','https://ik.imagekit.io/nethbooks/475_MTS211_A_rAVc8JPm0O.pdf',0,0,'2021-11-14 02:30:31'),(30,'mts 101','quadratic equations','note','Drizzle','https://ik.imagekit.io/nethbooks/475_mts_101A_Mok5oCRKQN.pdf',0,0,'2021-11-14 02:30:31'),(31,'mts 105','sequence and series','note','Drizzle','https://ik.imagekit.io/nethbooks/475_MTS_105_5_Ozso8sZmvx.pdf',0,0,'2021-11-14 02:30:31'),(32,'phs 102','general physics 2','question','Drizzle','https://ik.imagekit.io/nethbooks/phs_102_past_question_Watermarked_hMHYzuYIt.pdf',0,0,'2021-11-14 06:19:15'),(33,'cve 201','risk analysis','note','Drizzle','https://ik.imagekit.io/nethbooks/Cve_201_Last_note_1DR4uFYQR.pdf',0,0,'2021-11-14 06:19:15'),(34,'cve 202','shear force','note','Drizzle','https://ik.imagekit.io/nethbooks/CVE_202_mZf1VAkFU.pdf',0,0,'2021-11-14 06:19:15'),(35,'phs 101','mechanics','note','Drizzle','https://ik.imagekit.io/nethbooks/PHS_101_MECHANICS___THERMODYNAMIC-1_tVt5Z3VYm.pdf',0,0,'2021-11-14 06:19:15'),(36,'cve 202','shear force and bending moment','note','Drizzle','https://ik.imagekit.io/nethbooks/CVE_202-1_YlJlZnNd45.pdf',0,0,'2021-11-14 06:19:15'),(37,'phs 102','electrostatics','note','Drizzle','https://ik.imagekit.io/nethbooks/PHS_102_qgV5crCR6M.pdf',0,0,'2021-11-14 06:19:15'),(38,'phs 101','motion, force, work energy & power. Heat & thermodynamics','note','Drizzle','https://ik.imagekit.io/nethbooks/PHS_101.2_S4nHTB8weg.pdf',0,0,'2021-11-14 06:19:15'),(39,'phs 102','electromagnetism','note','Drizzle','https://ik.imagekit.io/nethbooks/PHS_20102_Jve2Z0Gxb9.pd',0,0,'2021-11-14 06:19:15'),(40,'phs 101','mechanics','note','Drizzle','https://ik.imagekit.io/nethbooks/PHS_101GENERAL_PHYSICS_M6TLEWD3VZ.pdf',0,0,'2021-11-14 06:22:59');
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-03  8:51:40
