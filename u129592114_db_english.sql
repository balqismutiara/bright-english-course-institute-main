-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 02, 2026 at 06:49 AM
-- Server version: 11.8.8-MariaDB-log
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u129592114_db_english`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `role` varchar(50) DEFAULT 'student',
  `created_at` datetime DEFAULT current_timestamp(),
  `teacher_id` int(11) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `student_id`, `username`, `password`, `role`, `created_at`, `teacher_id`, `admin_id`) VALUES
(1, 1, 'harun_aadish', '$2b$10$9nlC2IKIej7pj5iVkXMGQuTbVeWsyHWrDj/skIgSa9nSoS.ThaMuy', 'student', '2026-03-11 17:30:44', 0, 0),
(2, 0, 'teacher01', '$2b$10$cY3/PkRVu1NGZSNh4BxRBedUzsJ8KMZ.2WRa4wKe6OhmCV7DxtI5K', 'teacher', '2026-03-11 17:52:42', 1, 0),
(3, 0, 'administrator', '$2b$10$K0/7Vg8h3W8cpPx3jfaMg.pRO8z9MzTQhne.cAOcq6a/6yy.bVnM6', 'admin', '2026-03-11 20:44:46', 0, 1),
(4, 0, 'valentino_aris', 'V@lent130105', 'admin', '2026-08-01 08:21:09', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `phone` varchar(50) NOT NULL DEFAULT '',
  `position` varchar(255) NOT NULL DEFAULT '',
  `bio` text DEFAULT NULL,
  `photo_url` text DEFAULT NULL,
  `is_profile_complete` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `phone`, `position`, `bio`, `photo_url`, `is_profile_complete`, `created_at`) VALUES
(0, 'Dummy', 'Dumy', '', '', NULL, NULL, 0, '2026-08-01 08:17:55'),
(1, 'Administrator Utama', 'admin@becpalopo.com', '081234567890', 'System Administrator', 'Mengelola sistem Bright English Institute', '', 0, '2026-03-11 20:38:53');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `student_name` varchar(255) NOT NULL,
  `reading` int(11) NOT NULL DEFAULT 0,
  `writing` int(11) NOT NULL DEFAULT 0,
  `speaking` int(11) NOT NULL DEFAULT 0,
  `listening` int(11) NOT NULL DEFAULT 0,
  `attendance` int(11) NOT NULL DEFAULT 0,
  `feedback` varchar(2000) NOT NULL DEFAULT '',
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `student_id`, `student_name`, `reading`, `writing`, `speaking`, `listening`, `attendance`, `feedback`, `updated_at`) VALUES
(1, 1, 'Harun Aadish', 78, 82, 80, 76, 92, 'Perkembangan sangat baik. Pertahankan konsistensi belajar dan tingkatkan latihan speaking.', '2026-03-11 19:38:15');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `birth_date` varchar(50) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `parent_name` varchar(255) DEFAULT NULL,
  `parent_phone` varchar(50) DEFAULT NULL,
  `level` varchar(100) DEFAULT NULL,
  `schedule` varchar(255) DEFAULT NULL,
  `time_slot` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `email`, `phone`, `birth_date`, `age`, `address`, `parent_name`, `parent_phone`, `level`, `schedule`, `time_slot`, `created_at`) VALUES
(0, 'Dummy', 'dummy', 'dummy', 'dummy', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-08-01 08:15:53'),
(1, 'Harun Aadish', 'harunaadish@gmail.com', '085200436647', '2020-08-27', 5, 'NHP', 'Valentino Aris', '085299436647', 'Kids', 'Senin, Selasa, Rabu', '10.45 - 12.15', '2026-03-11 17:30:44');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `phone` varchar(50) NOT NULL DEFAULT '',
  `specialization` varchar(255) NOT NULL DEFAULT '',
  `bio` text DEFAULT NULL,
  `photo_url` varchar(2048) NOT NULL DEFAULT '',
  `is_profile_complete` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `name`, `email`, `phone`, `specialization`, `bio`, `photo_url`, `is_profile_complete`, `created_at`) VALUES
(0, 'dummy', 'dummy', 'dummy', 'dummy', 'dummy', '', 0, '2026-08-01 08:16:38'),
(1, 'Ms. Dian', 'admin@becpalopo.com', '085299125697', 'bahasa inggris', 'guru bahasa inggris', '', 0, '2026-08-01 07:58:06'),
(2, 'Ms. Triana', 'admin@becpalopo.com', '08523456789', 'Bahasa Inggris', 'Bahasa Inggris', '', 0, '2026-08-01 07:59:06'),
(3, 'Ms. Atika', 'admin@becpalopo.com', '08523456789', 'Bahasa Inggris', 'Bahasa Inggris', '', 0, '2026-08-01 07:59:42'),
(4, 'Ms. Resky', 'admin@becpalopo.com', '08523456789', 'bahasa inggris', 'bahasa inggris', '', 0, '2026-08-01 08:00:26'),
(5, 'Ms. Amel', 'admin@becpalopo.com', '08523456789', 'bahasa inggris', 'bahasa inggris', '', 0, '2026-08-01 08:00:59'),
(6, 'Ms. Nurmi', 'admin@becpalopo.com', '08523456789', 'bahasa inggris', 'bahasa inggris', '', 0, '2026-08-01 08:01:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `accounts_username_key` (`username`),
  ADD KEY `accounts_student_id_index` (`student_id`),
  ADD KEY `accounts_teacher_id_index` (`teacher_id`),
  ADD KEY `accounts_admin_id_index` (`admin_id`);

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reports_student_id_index` (`student_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `accounts_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`),
  ADD CONSTRAINT `accounts_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
  ADD CONSTRAINT `accounts_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`);

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
