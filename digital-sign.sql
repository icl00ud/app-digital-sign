# ************************************************************
# Antares - SQL Client
# Version 0.7.23
# 
# https://antares-sql.app/
# https://github.com/antares-sql/antares
# 
# Host: localhost (MySQL Community Server - GPL 8.3.0)
# Database: digital-sign
# Generation time: 2024-04-19T21:08:23-03:00
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table TBLDigitalSign
# ------------------------------------------------------------

DROP TABLE IF EXISTS `TBLDigitalSign`;

CREATE TABLE `TBLDigitalSign` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `id_user_signed` int NOT NULL COMMENT 'id do usuário que assinou o documento',
  `id_expense` tinyint NOT NULL COMMENT 'id da despesa',
  `dt_creation` datetime NOT NULL,
  `sign` tinyint NOT NULL COMMENT 'armazenamento da assinatura digital',
  PRIMARY KEY (`id`),
  KEY `id_expense fkey` (`id_expense`),
  KEY `FK_CMJ0` (`id_user_signed`),
  CONSTRAINT `id_expense fkey` FOREIGN KEY (`id_expense`) REFERENCES `TBLExpense` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `user signed` FOREIGN KEY (`id_user_signed`) REFERENCES `TBLUser` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Tabela de assinaturas digitais';





# Dump of table TBLExpense
# ------------------------------------------------------------

DROP TABLE IF EXISTS `TBLExpense`;

CREATE TABLE `TBLExpense` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_file` tinyint NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `dt_creation` datetime NOT NULL,
  `value` decimal(10,2) NOT NULL,
  `status` enum('Pendente','Aprovado','Rejeitado') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_file` (`id_file`),
  KEY `FK_TMME` (`id_user`),
  CONSTRAINT `id_file` FOREIGN KEY (`id_file`) REFERENCES `TBLExpenseReceipts` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `user foreign key` FOREIGN KEY (`id_user`) REFERENCES `TBLUser` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Tabela de despesas';





# Dump of table TBLExpenseReceipts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `TBLExpenseReceipts`;

CREATE TABLE `TBLExpenseReceipts` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `file` blob NOT NULL,
  `file_extension` enum('pdf','png') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Tabela que contém os recibos dos gastos';





# Dump of table TBLRole
# ------------------------------------------------------------

DROP TABLE IF EXISTS `TBLRole`;

CREATE TABLE `TBLRole` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `name` enum('Funcionário','Gerente','Diretor') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `TBLRole` WRITE;
/*!40000 ALTER TABLE `TBLRole` DISABLE KEYS */;

INSERT INTO `TBLRole` (`id`, `name`) VALUES
	(1, "Funcionário"),
	(2, "Gerente"),
	(3, "Diretor");

/*!40000 ALTER TABLE `TBLRole` ENABLE KEYS */;
UNLOCK TABLES;



# Dump of table TBLUser
# ------------------------------------------------------------

DROP TABLE IF EXISTS `TBLUser`;

CREATE TABLE `TBLUser` (
  `id` int NOT NULL,
  `id_role` tinyint NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_role` (`id_role`),
  CONSTRAINT `id_role` FOREIGN KEY (`id_role`) REFERENCES `TBLRole` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Tabela de usuarios';





# Dump of views
# ------------------------------------------------------------

# Creating temporary tables to overcome VIEW dependency errors


/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

# Dump completed on 2024-04-19T21:08:23-03:00
