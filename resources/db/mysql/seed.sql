-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.28 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping data for table ecomm.account: ~0 rows (approximately)
DELETE FROM `account`;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
/*!40000 ALTER TABLE `account` ENABLE KEYS */;

-- Dumping data for table ecomm.attribute: ~0 rows (approximately)
DELETE FROM `attribute`;
/*!40000 ALTER TABLE `attribute` DISABLE KEYS */;
INSERT INTO `attribute` (`id`, `createdAt`, `updatedAt`, `aname`, `atype`, `valueMin`, `valueMax`, `valueEnum`, `required`) VALUES
	(2, '2019-12-08 13:26:46.953063', '2019-12-08 13:26:46.953063', 'size', 'Number', 1, 3, NULL, 0),
	(3, '2019-12-08 13:26:46.965252', '2019-12-08 13:26:46.965252', 'color', 'Options', NULL, NULL, 'red,blue,green', 0),
	(4, '2019-12-08 13:28:15.753192', '2019-12-08 13:28:15.753192', 'sleeve type', 'String', NULL, NULL, NULL, 0);
/*!40000 ALTER TABLE `attribute` ENABLE KEYS */;

-- Dumping data for table ecomm.category: ~3 rows (approximately)
DELETE FROM `category`;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`id`, `createdAt`, `updatedAt`, `name`, `parentId`, `normalizeName`) VALUES
	(1, '2019-12-08 13:19:18.546039', '2019-12-08 13:19:18.546039', 'T Shirt', NULL, ''),
	(2, '2019-12-08 13:19:35.056481', '2019-12-08 13:19:35.056481', 'Mug', NULL, ''),
	(4, '2019-12-08 13:21:14.653143', '2019-12-08 13:21:14.653143', 'Men TT', 1, ''),
	(5, '2019-12-08 13:51:29.448802', '2019-12-08 13:51:29.448802', 'Women TT', 1, 'women tt');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

-- Dumping data for table ecomm.category_attributes_attribute: ~0 rows (approximately)
DELETE FROM `category_attributes_attribute`;
/*!40000 ALTER TABLE `category_attributes_attribute` DISABLE KEYS */;
INSERT INTO `category_attributes_attribute` (`categoryId`, `attributeId`) VALUES
	(1, 2),
	(1, 3),
	(4, 4);
/*!40000 ALTER TABLE `category_attributes_attribute` ENABLE KEYS */;

-- Dumping data for table ecomm.category_closure: ~4 rows (approximately)
DELETE FROM `category_closure`;
/*!40000 ALTER TABLE `category_closure` DISABLE KEYS */;
INSERT INTO `category_closure` (`id_ancestor`, `id_descendant`) VALUES
	(1, 1),
	(1, 4),
	(1, 5),
	(2, 2),
	(4, 4),
	(5, 5);
/*!40000 ALTER TABLE `category_closure` ENABLE KEYS */;

-- Dumping data for table ecomm.product: ~0 rows (approximately)
DELETE FROM `product`;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` (`id`, `createdAt`, `updatedAt`, `name`, `description`, `code`, `categoryId`) VALUES
	(2, '2019-12-08 13:49:41.265335', '2019-12-08 13:49:41.265335', 'test', 'just a test', 'T1', 4);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;

-- Dumping data for table ecomm.product_attribute: ~0 rows (approximately)
DELETE FROM `product_attribute`;
/*!40000 ALTER TABLE `product_attribute` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_attribute` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
