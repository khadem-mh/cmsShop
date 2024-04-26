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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
