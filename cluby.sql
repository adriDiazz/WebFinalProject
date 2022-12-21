-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:8889
-- Tiempo de generación: 14-12-2022 a las 13:24:55
-- Versión del servidor: 5.7.34
-- Versión de PHP: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cluby`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoryclub`
--

CREATE TABLE `categoryclub` (
  `club_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clubs`
--

CREATE TABLE `clubs` (
  `id` int(11) NOT NULL,
  `name` text,
  `description` text,
  `meet` text,
  `hours` text,
  `discord` text,
  `urlBanner` text,
  `creator` text NOT NULL,
  `created_at` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `clubs`
--

INSERT INTO `clubs` (`id`, `name`, `description`, `meet`, `hours`, `discord`, `urlBanner`, `creator`, `created_at`) VALUES
(1, 'Usha Sewing Machine', 'JFIASDJFKLAJSLFKJASDLKFJALSKFJKLASJFLKJSADFKLJSAKLDFJALSKFJLKASJFKLASJFLKASJFFKLASJDFKLJASDLKFJASLKDFJLAKSJDFLKASJDFLKASJFLKAJFLKAJSFLKJASKLFJASLKFJKLDFJKLQSDJFKLASJFKLASJFKLASJFLKASJFKLAJSDLFKJASKLDFJAKLSFJAS', 'ashfsdjkfhajksfjlkshfjkashfjklasdkjfakjfhjkhfjkashfjkahjkfhakjfhajkfhajkshfjkashfjkashjkahfjkahjkfhakjfhajkfhjkahkjahfjkahfjkahfkjahfkjahkjhfasjkfhajks', NULL, 'https://discord.com', 'https://img.freepik.com/vector-gratis/banner-negro-formas-geometricas-amarillas_1017-32327.jpg?w=2000', '', NULL),
(2, 'Club de informatica', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', NULL, 'https://discord.com', 'https://img.freepik.com/vector-gratis/banner-negro-formas-geometricas-amarillas_1017-32327.jpg?w=2000', '', NULL),
(3, 'Club de informatica', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', NULL, 'https://discord.com', 'https://img.freepik.com/vector-gratis/banner-negro-formas-geometricas-amarillas_1017-32327.jpg?w=2000', '1234', '222222'),
(4, 'Club de informatica ', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', NULL, NULL, 'hhttp://discord.com', 'https://img.freepik.com/vector-gratis/banner-negro-formas-geometricas-amarillas_1017-32327.jpg?w=2000', '41Zqfnd5jjbenc8WwFPg96OMb6M2', NULL),
(6, 'welcomerBot', 'dasdasdasd', NULL, NULL, 'hhttp://discord.com', 'https://api.multiavatar.com/4630302.svg', '2Dv70ew7u7UrjxYqWXUN5fAhMYP2', NULL),
(10, 'adrian diaz manzanares', 'danjnjkasdnfjkds', NULL, NULL, 'hhttp://discord.com', 'https://api.multiavatar.com/9379202.svg', '2Dv70ew7u7UrjxYqWXUN5fAhMYP2', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `userclub`
--

CREATE TABLE `userclub` (
  `user_id` varchar(30) DEFAULT NULL,
  `club_id` int(11) DEFAULT NULL,
  `username` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `userclub`
--

INSERT INTO `userclub` (`user_id`, `club_id`, `username`) VALUES
('2Dv70ew7u7UrjxYqWXUN5fAhMYP2', 2, 'lorenzo'),
('2Dv70ew7u7UrjxYqWXUN5fAhMYP2', 10, 'username');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` varchar(30) NOT NULL,
  `username` text,
  `created_at` text,
  `email` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `created_at`, `email`) VALUES
('2Dv70ew7u7UrjxYqWXUN5fAhMYP2', 'zovee', '2022-11-22T12:48:26.724Z', 'creando@gmail.com'),
('GHdu40et1IPPS4vTJ5omG2qV5DM2', 'zovee', '2022-11-22T12:45:32.488Z', 'corder@gmail.com'),
('lmd1vcRfRLMu930V11dBDpEHpB52', 'lololo', '2022-12-03T10:51:48.339Z', 'corredad@gmail.com'),
('MyyklHxk4iZ9EBXZDGZHBHUFQZI2', 'Ulonda', '2022-12-03T11:06:40.254Z', 'gargantola@gmail.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categoryclub`
--
ALTER TABLE `categoryclub`
  ADD KEY `club_id` (`club_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indices de la tabla `clubs`
--
ALTER TABLE `clubs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `userclub`
--
ALTER TABLE `userclub`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `club_id` (`club_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `clubs`
--
ALTER TABLE `clubs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `categoryclub`
--
ALTER TABLE `categoryclub`
  ADD CONSTRAINT `categoryclub_ibfk_1` FOREIGN KEY (`club_id`) REFERENCES `clubs` (`id`),
  ADD CONSTRAINT `categoryclub_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Filtros para la tabla `userclub`
--
ALTER TABLE `userclub`
  ADD CONSTRAINT `userclub_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `userclub_ibfk_2` FOREIGN KEY (`club_id`) REFERENCES `clubs` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
