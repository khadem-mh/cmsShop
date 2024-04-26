-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 17, 2024 at 02:13 PM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sabzlearn_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
CREATE TABLE IF NOT EXISTS `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `lastname` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `username` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `task` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `img` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `isMainAdmin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_persian_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `firstname`, `lastname`, `username`, `password`, `task`, `img`, `isMainAdmin`) VALUES
(1, 'محمدامین', 'سعیدی راد', 'amin_saeedi', 'react2020', 'برنامه نویس فول استک', 'img/saeedi.png', 0),
(2, 'قدیر', 'یلمه', 'q_yolme', 'q_909012_yolme', 'برنامه نویس پایتون', 'img/yolme.jpg', 0),
(3, 'ساسان', 'مقدس', 'sasan_mqds', 'sa_ds12', 'دیجیتال مارکتر', 'img/sassan.jpg', 0),
(4, 'سید محمدحسین', 'خادم المهدی', 'khadem13359', 'smkh1214', 'برنامه نویس فرانت اند', 'img/khadem.jpeg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_persian_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `title`) VALUES
(1, 'گوشی'),
(2, 'لپتاپ'),
(3, 'عمومی');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `body` text CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `date` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `hour` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `userID` int NOT NULL,
  `productID` int NOT NULL,
  `reply` text CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `isReply` int NOT NULL DEFAULT '0',
  `isAccept` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `productID` (`productID`),
  KEY `userID` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_persian_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `body`, `date`, `hour`, `userID`, `productID`, `reply`, `isReply`, `isAccept`) VALUES
(4, 'سلام دوره ری اکت پشتیبانیش خیلی خوب است \nخیلی ممنون', '1/02/2024', '09:05', 2, 11, 'خواهش میکنم امیدوارم موفق باشید', 1, 1),
(6, 'سلام اقای خادم موس خیلی خوبی بود', '02/02/2024', '12:56', 3, 10, '0', 1, 1),
(7, 'سلام محصول فوق العاده آشغال و بی کیفیت بود واقعا براتون متاسفم همچین محصولی میفروشبد', '03/04/2024', '09:12', 1, 12, 'خواهش\n', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `offs`
--

DROP TABLE IF EXISTS `offs`;
CREATE TABLE IF NOT EXISTS `offs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `percent` int NOT NULL,
  `adminID` int NOT NULL,
  `productID` int NOT NULL,
  `date` text CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `isActive` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `adminID` (`adminID`),
  KEY `productID` (`productID`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_persian_ci;

--
-- Dumping data for table `offs`
--

INSERT INTO `offs` (`id`, `code`, `percent`, `adminID`, `productID`, `date`, `isActive`) VALUES
(12, 'Mh-Khadem1214', 70, 4, 13, '۱۴۰۲/۱۱/۱۷', 0),
(51, 'last-off', 60, 4, 11, '۱۴۰۲/۱۱/۱۷', 1),
(53, 'middle3-1-3', 40, 4, 12, '۱۴۰۲/۱۱/۱۷', 0),
(54, 'ui-89-89', 10, 4, 14, '۱۴۰۲/۱۱/۱۷', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productID` int NOT NULL,
  `userID` int NOT NULL,
  `date` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `hour` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `price` bigint NOT NULL,
  `off` int NOT NULL,
  `sale` bigint NOT NULL,
  `popularity` int NOT NULL,
  `count` bigint NOT NULL,
  `saleCount` bigint NOT NULL,
  `isActive` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `productID` (`productID`) USING BTREE,
  KEY `userID` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_persian_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `productID`, `userID`, `date`, `hour`, `price`, `off`, `sale`, `popularity`, `count`, `saleCount`, `isActive`) VALUES
(1, 12, 3, '1402/11/09', '2:45', 2000000, 0, 27, 89, 2, 2, 1),
(5, 10, 1, '1402/11/22', '03:13', 4000000, 10, 19, 60, 15, 15, 1),
(7, 13, 2, '1402/10/29', '01:05', 7000000, 0, 200, 30, 3, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `price` int NOT NULL,
  `count` int NOT NULL,
  `img` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `popularity` int NOT NULL,
  `sale` int NOT NULL,
  `colors` int NOT NULL,
  `productDesc` text CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `url` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `categoryID` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryID` (`categoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_persian_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `price`, `count`, `img`, `popularity`, `sale`, `colors`, `productDesc`, `url`, `categoryID`) VALUES
(10, 'موس عمودی T-30', 4000000, 19, 'https://th.bing.com/th/id/R.0ab172d96881e227eab48925f60b0ae1?rik=g0CPWPFvTB3qeg&pid=ImgRaw&r=0', 99, 15, 5, '0', '0', 1),
(11, 'کیس گرین', 3000000, 5, 'https://th.bing.com/th/id/R.750d84223b2fdc9ea3b7551e5a345dcb?rik=IjRgrtUN1VjH4w&pid=ImgRaw&r=0', 100, 0, 1, '0', '0', 1),
(12, 'میکروفون رومیزی', 2000000, 27, 'https://th.bing.com/th/id/R.b03299819eaf621882026c727808ea8a?rik=EInhLOQC90DHVg&pid=ImgRaw&r=0', 100, 2, 1, '0', '0', 1),
(13, 'مانیتور 24 LG', 700000, 200, 'https://th.bing.com/th/id/R.999b34ea6c5e761962d682fb4cd609a2?rik=EQqlo4ZBawVB2w&pid=ImgRaw&r=0', 100, 0, 1, '0', '0', 1),
(14, 'مودم TDL-TE ایرانسل', 4000000, 0, 'https://modemmart.com/wp-content/uploads/2022/06/g1-1024x1024.jpg', 100, 8, 1, '0', '0', 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `te`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `te`;
CREATE TABLE IF NOT EXISTS `te` (
);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firsname` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `lastname` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `username` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `phone` bigint NOT NULL,
  `city` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `address` text CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `score` int NOT NULL,
  `buy` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_persian_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firsname`, `lastname`, `username`, `password`, `phone`, `city`, `email`, `address`, `score`, `buy`) VALUES
(1, 'علیرضا', 'حسن زاده', 'alireza_ahmdi19', '19901432', 9129872314, 'تهران', 'alireza@gmail.com', 'تهران - خیابان فلان - کوچه فلان', 98, 9000000),
(2, 'حسین', 'احمدی', 'hosyn_mmdi', 'ho3ein_12', 9921558293, 'تبریز', 'ho3ein@gmail.com', 'تبریز - خیابان فلان - کوچه فلان', 31, 12000000),
(3, 'علی', 'حسینی', 'ali_9001', 'ali190012', 9943287617, 'شیراز', 'ali@gmail.com', 'شیراز - خیابان فلان - کوچه فلان', 28, 8541000),
(7, 'ابوالفضل', 'خادم المهدی', 'abKhadem', '121416', 9031451267, 'مشهد', 'abolfazle@gmail.com', 'خیابان طالقانی احمد اباد ادریس 2', 0, 0),
(16, 'علی', 'کورمی', '@ali', '4545yuyu7', 902345678, 'خراسان رضوی', 'ali@gmail.com', 'خراسان رضوی ...', 0, 0);

-- --------------------------------------------------------

--
-- Structure for view `te`
--
DROP TABLE IF EXISTS `te`;

DROP VIEW IF EXISTS `te`;
CREATE ALGORITHM=MERGE DEFINER=`test`@`%` SQL SECURITY INVOKER VIEW `te`  AS SELECT `comments`.`id` AS `id`, `comments`.`body` AS `body`, `comments`.`date` AS `date`, `comments`.`hour` AS `hour`, `comments`.`userID` AS `userID`, `comments`.`productID` AS `productID`, `comments`.`is-reply` AS `is-reply`, `comments`.`reply-id` AS `reply-id`, `comments`.`isAccept` AS `isAccept` FROM `comments` ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`id`);

--
-- Constraints for table `offs`
--
ALTER TABLE `offs`
  ADD CONSTRAINT `offs_ibfk_1` FOREIGN KEY (`adminID`) REFERENCES `admins` (`id`),
  ADD CONSTRAINT `offs_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
