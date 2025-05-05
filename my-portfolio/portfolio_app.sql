-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 05, 2025 at 05:40 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `portfolio_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(16) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `created`) VALUES
(1, 'Automatic', '2546', '2025-04-20 04:15:40');

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `portfolio_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `img`, `portfolio_id`) VALUES
(10, 'uploads\\1746079950795.png', 75),
(11, 'uploads\\1746079950823.png', 75),
(12, 'uploads\\1746079950874.png', 75);

-- --------------------------------------------------------

--
-- Table structure for table `portfolio`
--

CREATE TABLE `portfolio` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `contents` text NOT NULL,
  `event_location` text DEFAULT NULL,
  `event_date` datetime DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `portfolio_type_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `portfolio`
--

INSERT INTO `portfolio` (`id`, `title`, `contents`, `event_location`, `event_date`, `thumbnail`, `portfolio_type_id`, `created`) VALUES
(1, 'B.Eng. Computer Engineering - Rajamangala University of Technology Tanyaburi', 'GPAX 3.96', '', '2026-01-01 00:00:00', NULL, 6, '2025-04-19 13:13:10'),
(2, 'High Voc. Cert. Computer Software Dev. - Thai-Austrian Technical College', 'GPAX 4.00', '', '2024-01-01 00:00:00', NULL, 6, '2025-04-19 13:13:10'),
(3, 'Voc. Cert. Infomation Technology - Thai-Austrian Technical College', 'GPAX 3.92', '', '2022-01-01 00:00:00', NULL, 6, '2025-04-19 13:13:10'),
(4, 'Junior High School - Pattanavechsuksa School', 'GPAX 3.86', '', '2018-01-01 00:00:00', NULL, 6, '2025-04-19 13:13:10'),
(5, 'Primary School - Pattanavechsuksa School', 'GPAX 3.70', '', '2015-01-01 00:00:00', NULL, 6, '2025-04-19 13:13:10'),
(21, 'HTML', '', '', NULL, NULL, 1, '2025-04-27 03:18:38'),
(22, 'CSS', '', '', NULL, NULL, 1, '2025-04-27 03:22:22'),
(23, 'PHP', '', '', NULL, NULL, 1, '2025-04-27 03:22:28'),
(24, 'SQL', '', '', NULL, NULL, 1, '2025-04-27 03:22:36'),
(25, 'C', '', '', NULL, NULL, 1, '2025-04-27 03:22:41'),
(26, 'Python', '', '', NULL, NULL, 1, '2025-04-27 03:22:48'),
(27, 'React JS', '', '', NULL, NULL, 1, '2025-04-27 03:22:56'),
(28, 'Angular', '', '', NULL, NULL, 1, '2025-04-27 03:23:00'),
(29, 'Flutter', '', '', NULL, NULL, 1, '2025-04-27 03:23:07'),
(30, 'Git', '', '', NULL, NULL, 1, '2025-04-27 03:23:13'),
(31, 'Figma', '', '', NULL, NULL, 1, '2025-04-27 03:23:20'),
(32, 'Third Runner-up in the National Skills Competition for Network Technology, 31st Edition.', 'Collaborated on a website development project, contributing to the frontend and backend using basic languages like HTML, PHP, CSS, SQL while my partner focused on the network infrastructure.', 'Rayong Techical College', '2022-07-31 10:00:00', NULL, 3, '2025-04-27 03:28:43'),
(33, 'SOFTWARE DEVELOPER - TECHINVENT CO., LTD.', 'Work and learn on main projects using ReactJS, Angular, Flutter, and more', 'Bangkok Thailand', '2023-10-15 17:00:00', NULL, 4, '2025-04-27 03:33:35'),
(35, 'Won 1st place in the At the regional level: Eastern Region and Bangkok Skills Competition for Network Technology', 'Collaborated on a website development project, contributing to the frontend and backend using basic languages like HTML, PHP, CSS, SQL while my partner focused on the network infrastructure.', 'Rayong Technical College', '2022-10-31 10:00:00', NULL, 3, '2025-04-27 04:05:57'),
(36, 'ASIA STEEL TRANSPORT (1999) CO., LTD.', 'Gain hands-on experience in website development using WordPress, perform data analysis with MS Excel, conduct web application testing, generate reports, and engage in additional related tasks.', 'Rayong Thailand', '2021-09-16 17:00:00', NULL, 4, '2025-04-27 04:12:40'),
(37, 'Final Year Project for (Diploma, Software Development)', 'Developed a student internship system for Thai-Austrian Technical College using HTML, CSS, JavaScript, PHP, Bootstrap 5, and SQL.', 'Thai-Austrian Technical College', '2023-12-30 00:00:00', 'uploads/1746071190581.jpg', 2, '2025-04-27 04:18:11'),
(38, 'Retail Shop Team Project', 'Utilized HTML, CSS, JavaScript, PHP, Bootstrap 5, and SQL to develop a web application for a retail shop.', 'Thai-Austrian Technical College', '2023-11-30 10:00:00', NULL, 2, '2025-04-27 04:20:23'),
(39, 'Final Year Project (Vocational Certificate, Software Development)', 'Developed an internship and company website for the IT and Computer Technology Department at Thai-Austrian Technical College.', 'Thai-Austrian Technical College', '2021-11-30 17:00:00', NULL, 2, '2025-04-27 04:26:20'),
(53, 'พิธีกร งานเปิดบ้านวิชาการ Master of Ceremonies (MC) for the Thai-Austrian Tech Open House 2022', '', 'Thai-Austrian Technical College', '2022-11-30 17:00:00', NULL, 5, '2025-04-28 04:18:45'),
(54, 'Representative presenting information about the Digital Industry Department during the Sattahip Model visit led by Dr. Thanakorn Wangboonkongchana.', 'ตัวแทนนำเสนอข้อมูลแผนกอุตสาหกรรมดิจิทัล ในพิธีเยี่ยมชมสัตหีบโมเดล โดย ดร.ธนะกร วังบุญคงชนะ', 'Thai-Austrian Technical College', '2023-11-30 00:00:00', NULL, 5, '2025-04-28 04:22:48'),
(55, 'Presented the exhibition \"Lifelong Human Capacity Development and the Production and Development of Highly Skilled Vocational Manpower.\"', 'นำเสนอนิทรรศการ \"การพัฒนาศักยภาพคนตลอดช่วงชีวิต การผลิตและพัฒนากำลังคนอาชีวศึกษาสมรรถะสูง\"', 'Thai-Austrian Technical College', '2023-11-30 17:00:00', NULL, 5, '2025-04-28 04:26:34'),
(56, 'Represented and presented information about the Computer Department in English during the visit by the Ambassador of Austria.', 'ตัวแทนนำเสนอ นำเสนอข้อมูลแผนกคอมพิวเตอร์เป็นภาษาอังกฤษ ในพิธีเยี่ยมชมโดยฑูตจากประเทศออสเตรีย', 'Thai-Austrian Technical College', '2022-12-31 00:00:00', NULL, 5, '2025-04-28 04:33:09'),
(57, 'Conducted a guidance session on academic pathways for lower secondary school students.', 'แนะแนวและให้ความรู้การศึกษาต่อ แก่น้อง ๆ นักเรียนระดับมัธยมต้น', 'Sattahip School', '2021-12-31 17:00:00', NULL, 5, '2025-04-28 04:35:57'),
(58, 'Vice President of the Computer Department and Cheerleading Captain', 'รองประธานแผนกคอมพิวเตอร์ และประธานเชียร์', 'Thai-Austrian Technical College', '2021-12-31 17:00:00', NULL, 5, '2025-04-28 04:36:59'),
(59, 'First Runner-up Award in the English Public Speaking Contest, Vocational Education Level, Chonburi Province', 'รางวัลรองชนะเลิศอันดับ 1 English Public Speaking Contest ระดับอาชีวศึกษาจังหวัด จังหวัดชลบุรี', 'Pattaya Technical College', '2020-12-22 00:00:00', NULL, 3, '2025-04-28 04:45:18'),
(60, 'Winner of the English Public Speaking Contest, School Level, Sattahip Technical College', 'รางวัลชนะเลิศ English Public Speaking Contest ระดับสถานศึกษา วิทยาลัยเทคนิคสัตหีบ', 'Thai-Austrian Technical College', '2020-12-08 17:00:00', NULL, 3, '2025-04-28 04:47:33'),
(61, '1st Runner-Up of the English Demonstration Contest, Vocational Education Level, Chonburi Province', 'รางวัลรองชนะเลิศอันดับ 1 English Demonstration Contest ระดับอาชีวศึกษา จังหวัดชลบุรี', 'Pattaya Technical College', '2021-12-14 17:00:00', NULL, 3, '2025-04-28 04:49:48'),
(62, 'Winner of the English Public Speaking Contest, School Level, Thai-Austrian Technical College', 'รางวัลชนะเลิศ การแข่งขันทักษะการประกวดพูดในที่สาธารณะเป็นภาษาอังกฤษ', 'Thai-Austrian Technical College', '2021-11-30 17:00:00', NULL, 3, '2025-04-28 04:52:52'),
(63, 'Scored 690 out of 990 on the Test of English for International Communication (TOEIC)', '', 'Thai-Austrian Technical College', '2023-09-17 17:00:00', NULL, 3, '2025-04-28 04:54:03'),
(64, 'Demonstrates excellent leadership qualities and military demeanor, Thai Reserve Officer Training Corps Student in the Third Year', 'มีความเป็นผู้นำ และมีลักษณะท่าทางทหารดีเยี่ยม หลักสูตรนักศึกษาวิชาทหารชั้นปีที่ 3', 'โรงเรียนต่อสู้อากาศยานและรักษาฝั่ง', '2023-01-14 17:00:00', NULL, 3, '2025-04-28 05:00:13'),
(75, 'new2', 'dadwdw', 'dwadawdw', '2025-04-30 17:00:00', 'uploads\\1746079950774.png', 2, '2025-05-01 06:12:31');

-- --------------------------------------------------------

--
-- Table structure for table `portfolio_type`
--

CREATE TABLE `portfolio_type` (
  `id` int(11) NOT NULL,
  `title` varchar(30) NOT NULL,
  `descriptions` varchar(60) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `portfolio_type`
--

INSERT INTO `portfolio_type` (`id`, `title`, `descriptions`, `created`) VALUES
(1, 'skills', '', '2025-04-19 13:13:09'),
(2, 'projects', '', '2025-04-19 13:13:09'),
(3, 'achievements', '', '2025-04-19 13:13:09'),
(4, 'internships', '', '2025-04-19 13:13:09'),
(5, 'activities', 'academic activities', '2025-04-19 13:13:09'),
(6, 'educations', '', '2025-04-19 13:13:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `portfolio_id` (`portfolio_id`);

--
-- Indexes for table `portfolio`
--
ALTER TABLE `portfolio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `portfolio_type_id` (`portfolio_type_id`);

--
-- Indexes for table `portfolio_type`
--
ALTER TABLE `portfolio_type`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `portfolio`
--
ALTER TABLE `portfolio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `portfolio_type`
--
ALTER TABLE `portfolio_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `gallery`
--
ALTER TABLE `gallery`
  ADD CONSTRAINT `gallery_ibfk_1` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolio` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `portfolio`
--
ALTER TABLE `portfolio`
  ADD CONSTRAINT `portfolio_ibfk_1` FOREIGN KEY (`portfolio_type_id`) REFERENCES `portfolio_type` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
