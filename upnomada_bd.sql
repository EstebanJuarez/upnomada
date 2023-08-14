-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-08-2023 a las 22:06:56
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `upnomada_bd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE `publicaciones` (
  `id` int(11) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `descripcion` varchar(150) NOT NULL,
  `precio` varchar(150) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `primeraFecha` varchar(150) NOT NULL,
  `ultimaFecha` varchar(150) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `publicaciones`
--

INSERT INTO `publicaciones` (`id`, `titulo`, `descripcion`, `precio`, `imagen`, `primeraFecha`, `ultimaFecha`, `createdAt`, `updatedAt`) VALUES
(74, 'Mexico, Brasil', 'Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción ', '792.08', 'https://content.skyscnr.com/69907554dc47aab9e74edf172e01fb44/GettyImages-516984709.jpg', '', '', '2023-08-02', '2023-08-02'),
(76, 'Mexico, Brasil', 'Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción ', '792.08', 'https://content.skyscnr.com/69907554dc47aab9e74edf172e01fb44/GettyImages-516984709.jpg', '', '', '2023-08-02', '2023-08-02'),
(77, 'Mexico, Brasil', 'descruob', '792.08', 'https://content.skyscnr.com/69907554dc47aab9e74edf172e01fb44/GettyImages-516984709.jpg', '2023-08-08', '2023-08-10', '2023-08-02', '2023-08-06'),
(78, 'Mexico, Brasil', 'Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción ', '792.08', 'https://content.skyscnr.com/69907554dc47aab9e74edf172e01fb44/GettyImages-516984709.jpg', '', '', '2023-08-02', '2023-08-02'),
(82, 'Mexico, Brasil', 'Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción ', '145', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/1920px-Flag_of_Mexico.svg.png', '2023-08-02', '2023-08-04', '2023-08-02', '2023-08-02'),
(85, 'Mexico, Alemania', 'Descripcinnn', '18000', 'https://img.asmedia.epimg.net/resizer/09yDpi0Tu7QBJN8E5J0_fxWb1Do=/1472x828/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/RE46P6TAC5CN3GV7NTIHWI5ZI4.jpg', '2023-08-09', '2023-08-16', '2023-08-06', '2023-08-06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `segmentos`
--

CREATE TABLE `segmentos` (
  `id` int(11) NOT NULL,
  `vuelo_id` int(11) NOT NULL,
  `origen` varchar(150) NOT NULL,
  `destino` varchar(150) NOT NULL,
  `arrival` varchar(150) NOT NULL,
  `departure` varchar(150) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `segmentos`
--

INSERT INTO `segmentos` (`id`, `vuelo_id`, `origen`, `destino`, `arrival`, `departure`, `createdAt`, `updatedAt`) VALUES
(116, 108, 'Mexico City Juarez International', 'Bogota', '2023-08-12 08:00:00', '2023-08-12 02:20:00', '2023-08-02', '2023-08-02'),
(117, 108, 'Bogota', 'Sao Paulo Guarulhos', '2023-08-12 18:20:00', '2023-08-12 10:05:00', '2023-08-02', '2023-08-02'),
(118, 109, 'Sao Paulo Guarulhos', 'Panama City Tocumen International', '2023-08-19 09:43:00', '2023-08-19 04:39:00', '2023-08-02', '2023-08-02'),
(119, 109, 'Panama City Tocumen International', 'Cancun', '2023-08-19 13:35:00', '2023-08-19 10:48:00', '2023-08-02', '2023-08-02'),
(120, 109, 'Cancun', 'Mexico City Juarez International', '2023-08-19 18:35:00', '2023-08-19 17:00:00', '2023-08-02', '2023-08-02'),
(121, 110, 'Sao Paulo Guarulhos', 'Panama City Tocumen International', '2023-08-19 09:43:00', '2023-08-19 04:39:00', '2023-08-02', '2023-08-02'),
(122, 110, 'Cancun', 'Mexico City Juarez International', '2023-08-19 18:35:00', '2023-08-19 17:00:00', '2023-08-02', '2023-08-02'),
(123, 111, 'Mexico City Juarez International', 'Bogota', '2023-08-12 08:00:00', '2023-08-12 02:20:00', '2023-08-02', '2023-08-02'),
(124, 110, 'Panama City Tocumen International', 'Cancun', '2023-08-19 13:35:00', '2023-08-19 10:48:00', '2023-08-02', '2023-08-02'),
(125, 111, 'Bogota', 'Sao Paulo Guarulhos', '2023-08-12 18:20:00', '2023-08-12 10:05:00', '2023-08-02', '2023-08-02'),
(126, 112, 'Mexico City Juarez International', 'Bogota', '2023-08-12 08:00:00', '2023-08-12 02:20:00', '2023-08-02', '2023-08-02'),
(127, 112, 'Bogota', 'Sao Paulo Guarulhos', '2023-08-12 18:20:00', '2023-08-12 10:05:00', '2023-08-02', '2023-08-02'),
(128, 113, 'Sao Paulo Guarulhos', 'Panama City Tocumen International', '2023-08-19 09:43:00', '2023-08-19 04:39:00', '2023-08-02', '2023-08-02'),
(129, 113, 'Panama City Tocumen International', 'Cancun', '2023-08-19 13:35:00', '2023-08-19 10:48:00', '2023-08-02', '2023-08-02'),
(130, 113, 'Cancun', 'Mexico City Juarez International', '2023-08-19 18:35:00', '2023-08-19 17:00:00', '2023-08-02', '2023-08-02'),
(131, 114, 'Mexico City Juarez International', 'Bogota', '2023-08-12 08:00:00', '2023-08-12 02:20:00', '2023-08-02', '2023-08-02'),
(132, 114, 'Bogota', 'Sao Paulo Guarulhos', '2023-08-12 18:20:00', '2023-08-12 10:05:00', '2023-08-02', '2023-08-02'),
(133, 115, 'Sao Paulo Guarulhos', 'Panama City Tocumen International', '2023-08-19 09:43:00', '2023-08-19 04:39:00', '2023-08-02', '2023-08-02'),
(134, 115, 'Panama City Tocumen International', 'Cancun', '2023-08-19 13:35:00', '2023-08-19 10:48:00', '2023-08-02', '2023-08-02'),
(135, 115, 'Cancun', 'Mexico City Juarez International', '2023-08-19 18:35:00', '2023-08-19 17:00:00', '2023-08-02', '2023-08-02'),
(136, 116, 'Mexico City Juarez International', 'Bogota', '2023-08-12 08:00:00', '2023-08-12 02:20:00', '2023-08-02', '2023-08-02'),
(137, 116, 'Bogota', 'Sao Paulo Guarulhos', '2023-08-12 18:20:00', '2023-08-12 10:05:00', '2023-08-02', '2023-08-02'),
(138, 117, 'Sao Paulo Guarulhos', 'Panama City Tocumen International', '2023-08-19 09:43:00', '2023-08-19 04:39:00', '2023-08-02', '2023-08-02'),
(139, 117, 'Panama City Tocumen International', 'Cancun', '2023-08-19 13:35:00', '2023-08-19 10:48:00', '2023-08-02', '2023-08-02'),
(140, 117, 'Cancun', 'Mexico City Juarez International', '2023-08-19 18:35:00', '2023-08-19 17:00:00', '2023-08-02', '2023-08-02'),
(141, 118, 'Mexico City Juarez International', 'Bogota', '2023-08-12 08:00:00', '2023-08-12 02:20:00', '2023-08-02', '2023-08-02'),
(142, 118, 'Bogota', 'Sao Paulo Guarulhos', '2023-08-12 18:20:00', '2023-08-12 10:05:00', '2023-08-02', '2023-08-02'),
(143, 119, 'Panama City Tocumen International', 'Cancun', '2023-08-19 13:35:00', '2023-08-19 10:48:00', '2023-08-02', '2023-08-02'),
(144, 119, 'Sao Paulo Guarulhos', 'Panama City Tocumen International', '2023-08-19 09:43:00', '2023-08-19 04:39:00', '2023-08-02', '2023-08-02'),
(145, 119, 'Cancun', 'Mexico City Juarez International', '2023-08-19 18:35:00', '2023-08-19 17:00:00', '2023-08-02', '2023-08-02'),
(146, 136, 'Bogota', 'Sao Paulo Guarulhos', '2023-08-12 18:20:00', '2023-08-12 10:05:00', '2023-08-08', '2023-08-08'),
(147, 136, 'Mexico City Juarez International', 'Bogota', '2023-08-12 08:00:00', '2023-08-12 02:20:00', '2023-08-08', '2023-08-08'),
(148, 137, 'Mexico City Juarez International', 'Cancun', '2023-09-03 01:25:00', '2023-09-02 22:00:00', '2023-08-08', '2023-08-08'),
(149, 138, 'Mexico City Juarez International', 'Bogota', '2023-08-18 05:05:00', '2023-08-17 23:40:00', '2023-08-08', '2023-08-08'),
(150, 139, 'Mexico City Juarez International', 'Bogota', '2023-08-12 08:00:00', '2023-08-12 02:20:00', '2023-08-08', '2023-08-08'),
(151, 139, 'Bogota', 'Sao Paulo Guarulhos', '2023-08-12 18:20:00', '2023-08-12 10:05:00', '2023-08-08', '2023-08-08'),
(152, 141, 'Mexico City Juarez International', 'Bogota', '2023-08-18 05:05:00', '2023-08-17 23:40:00', '2023-08-08', '2023-08-08'),
(153, 140, 'Mexico City Juarez International', 'Cancun', '2023-09-03 01:25:00', '2023-09-02 22:00:00', '2023-08-08', '2023-08-08'),
(154, 142, 'Mexico City Juarez International', 'Bogota', '2023-08-12 08:00:00', '2023-08-12 02:20:00', '2023-08-08', '2023-08-08'),
(155, 142, 'Bogota', 'Sao Paulo Guarulhos', '2023-08-12 18:20:00', '2023-08-12 10:05:00', '2023-08-08', '2023-08-08'),
(156, 143, 'Mexico City Juarez International', 'Cancun', '2023-09-03 01:25:00', '2023-09-02 22:00:00', '2023-08-08', '2023-08-08'),
(157, 144, 'Mexico City Juarez International', 'Bogota', '2023-08-18 05:05:00', '2023-08-17 23:40:00', '2023-08-08', '2023-08-08'),
(158, 145, 'Mexico City Juarez International', 'Bogota', '2023-08-12 08:00:00', '2023-08-12 02:20:00', '2023-08-08', '2023-08-08'),
(159, 145, 'Bogota', 'Sao Paulo Guarulhos', '2023-08-12 18:20:00', '2023-08-12 10:05:00', '2023-08-08', '2023-08-08'),
(160, 146, 'Mexico City Juarez International', 'Cancun', '2023-09-03 01:25:00', '2023-09-02 22:00:00', '2023-08-08', '2023-08-08'),
(161, 147, 'Mexico City Juarez International', 'Bogota', '2023-08-18 05:05:00', '2023-08-17 23:40:00', '2023-08-08', '2023-08-08'),
(162, 148, 'Mexico City Juarez International', 'Bogota', '2023-08-12 08:00:00', '2023-08-12 02:20:00', '2023-08-08', '2023-08-08'),
(163, 148, 'Bogota', 'Sao Paulo Guarulhos', '2023-08-12 18:20:00', '2023-08-12 10:05:00', '2023-08-08', '2023-08-08'),
(164, 149, 'Mexico City Juarez International', 'Cancun', '2023-09-03 01:25:00', '2023-09-02 22:00:00', '2023-08-08', '2023-08-08'),
(165, 150, 'Mexico City Juarez International', 'Bogota', '2023-08-18 05:05:00', '2023-08-17 23:40:00', '2023-08-08', '2023-08-08'),
(166, 151, 'Bogota', 'Sao Paulo Guarulhos', '2023-08-12 18:20:00', '2023-08-12 10:05:00', '2023-08-09', '2023-08-09'),
(167, 151, 'Mexico City Juarez International', 'Bogota', '2023-08-12 08:00:00', '2023-08-12 02:20:00', '2023-08-09', '2023-08-09'),
(168, 152, 'Mexico City Juarez International', 'Cancun', '2023-09-03 01:25:00', '2023-09-02 22:00:00', '2023-08-09', '2023-08-09'),
(169, 153, 'Mexico City Juarez International', 'Bogota', '2023-08-18 05:05:00', '2023-08-17 23:40:00', '2023-08-09', '2023-08-09'),
(170, 154, 'Bogota', 'Sao Paulo Guarulhos', '2023-08-12 18:20:00', '2023-08-12 10:05:00', '2023-08-09', '2023-08-09'),
(171, 154, 'Mexico City Juarez International', 'Bogota', '2023-08-12 08:00:00', '2023-08-12 02:20:00', '2023-08-09', '2023-08-09'),
(172, 155, 'Mexico City Juarez International', 'Cancun', '2023-09-03 01:25:00', '2023-09-02 22:00:00', '2023-08-09', '2023-08-09'),
(173, 156, 'Mexico City Juarez International', 'Bogota', '2023-08-18 05:05:00', '2023-08-17 23:40:00', '2023-08-09', '2023-08-09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_user` int(11) NOT NULL,
  `nombre_user` varchar(50) NOT NULL,
  `apellido_user` varchar(50) NOT NULL,
  `telefono_user` varchar(150) NOT NULL,
  `password_user` varchar(255) NOT NULL,
  `email_user` varchar(150) NOT NULL,
  `role` varchar(255) NOT NULL,
  `status` varchar(10) NOT NULL,
  `customer_id` varchar(150) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_user`, `nombre_user`, `apellido_user`, `telefono_user`, `password_user`, `email_user`, `role`, `status`, `customer_id`, `createdAt`, `updatedAt`) VALUES
(145, 'steban', 'apellido', '1234567', '$2b$10$66RH6OOnVaTRWC6AGcaNvO6k6NMjUAILYFu8xlnVSgCFcz.q4IPK6', 'asdf@gmail.com', 'viewer', '', '', '2023-08-03', '2023-08-03'),
(148, 'Esteban', 'Juarez', '381', '$2b$10$VVpuePJhA0W8FOd/cYuo8.0oyJfMX0.Vj.VXPaomEFcKnKe2h.wCm', 'esteban.juarez0011@gmail.com', 'viewer', 'active', 'cus_ONvQPdsKig7FgO', '2023-08-03', '2023-08-04'),
(149, 'admin', 'admin', '123', '$2b$10$k65FwzYGpOIm.p0Aoz1gEuKWNG6.MtG0Oj73uK3j8YlsBYZ5EfYzS', 'admin@gmail.com', 'admin', 'active', 'cus_OOKH4SCRP0M2Jw', '2023-08-04', '2023-08-04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vuelos`
--

CREATE TABLE `vuelos` (
  `id` int(11) NOT NULL,
  `publicacion_id` int(11) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `vuelos`
--

INSERT INTO `vuelos` (`id`, `publicacion_id`, `descripcion`, `precio`, `imagen`, `url`, `createdAt`, `updatedAt`) VALUES
(108, 74, 'avin', '404.08', 'https://content.skyscnr.com/69907554dc47aab9e74edf172e01fb44/GettyImages-516984709.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/avin/1/13993.11952.2023-08-11/air/airli/flights?itinerary=flight|-32540|23|13993|2023-08-11T23:20|10069|2023-08-12T05:00|280|OEOB0BRB|O|XS;flight|-32540|185|10069|2023-08-12T07:05|11952|2023-0', '2023-08-02', '2023-08-02'),
(109, 74, 'skyp', '388.00', 'https://content.skyscnr.com/f5ae314cb0988e2a7912645b33b49302/centro-historico-6.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/skyp/1/11952.13993.2023-08-19/air/trava/flights?itinerary=flight|-32407|758|11952|2023-08-19T01:39|15608|2023-08-19T06:43|424|AAAAOZ2S|A|-;flight|-32407|316|15608|2023-08-19T07:48|10803|2023-0', '2023-08-02', '2023-08-02'),
(110, 75, 'skyp', '388.00', 'https://content.skyscnr.com/f5ae314cb0988e2a7912645b33b49302/centro-historico-6.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/skyp/1/11952.13993.2023-08-19/air/trava/flights?itinerary=flight|-32407|758|11952|2023-08-19T01:39|15608|2023-08-19T06:43|424|AAAAOZ2S|A|-;flight|-32407|316|15608|2023-08-19T07:48|10803|2023-0', '2023-08-02', '2023-08-02'),
(111, 75, 'avin', '404.08', 'https://content.skyscnr.com/69907554dc47aab9e74edf172e01fb44/GettyImages-516984709.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/avin/1/13993.11952.2023-08-11/air/airli/flights?itinerary=flight|-32540|23|13993|2023-08-11T23:20|10069|2023-08-12T05:00|280|OEOB0BRB|O|XS;flight|-32540|185|10069|2023-08-12T07:05|11952|2023-0', '2023-08-02', '2023-08-02'),
(112, 76, 'avin', '404.08', 'https://content.skyscnr.com/69907554dc47aab9e74edf172e01fb44/GettyImages-516984709.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/avin/1/13993.11952.2023-08-11/air/airli/flights?itinerary=flight|-32540|23|13993|2023-08-11T23:20|10069|2023-08-12T05:00|280|OEOB0BRB|O|XS;flight|-32540|185|10069|2023-08-12T07:05|11952|2023-0', '2023-08-02', '2023-08-02'),
(113, 76, 'skyp', '388.00', 'https://content.skyscnr.com/f5ae314cb0988e2a7912645b33b49302/centro-historico-6.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/skyp/1/11952.13993.2023-08-19/air/trava/flights?itinerary=flight|-32407|758|11952|2023-08-19T01:39|15608|2023-08-19T06:43|424|AAAAOZ2S|A|-;flight|-32407|316|15608|2023-08-19T07:48|10803|2023-0', '2023-08-02', '2023-08-02'),
(114, 77, 'avin', '404.08', 'https://content.skyscnr.com/69907554dc47aab9e74edf172e01fb44/GettyImages-516984709.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/avin/1/13993.11952.2023-08-11/air/airli/flights?itinerary=flight|-32540|23|13993|2023-08-11T23:20|10069|2023-08-12T05:00|280|OEOB0BRB|O|XS;flight|-32540|185|10069|2023-08-12T07:05|11952|2023-0', '2023-08-02', '2023-08-02'),
(116, 78, 'avin', '404.08', 'https://content.skyscnr.com/69907554dc47aab9e74edf172e01fb44/GettyImages-516984709.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/avin/1/13993.11952.2023-08-11/air/airli/flights?itinerary=flight|-32540|23|13993|2023-08-11T23:20|10069|2023-08-12T05:00|280|OEOB0BRB|O|XS;flight|-32540|185|10069|2023-08-12T07:05|11952|2023-0', '2023-08-02', '2023-08-02'),
(117, 78, 'skyp', '388.00', 'https://content.skyscnr.com/f5ae314cb0988e2a7912645b33b49302/centro-historico-6.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/skyp/1/11952.13993.2023-08-19/air/trava/flights?itinerary=flight|-32407|758|11952|2023-08-19T01:39|15608|2023-08-19T06:43|424|AAAAOZ2S|A|-;flight|-32407|316|15608|2023-08-19T07:48|10803|2023-0', '2023-08-02', '2023-08-02'),
(118, 79, 'avin', '404.08', 'https://content.skyscnr.com/69907554dc47aab9e74edf172e01fb44/GettyImages-516984709.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/avin/1/13993.11952.2023-08-11/air/airli/flights?itinerary=flight|-32540|23|13993|2023-08-11T23:20|10069|2023-08-12T05:00|280|OEOB0BRB|O|XS;flight|-32540|185|10069|2023-08-12T07:05|11952|2023-0', '2023-08-02', '2023-08-02'),
(119, 79, 'skyp', '388.00', 'https://content.skyscnr.com/f5ae314cb0988e2a7912645b33b49302/centro-historico-6.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/skyp/1/11952.13993.2023-08-19/air/trava/flights?itinerary=flight|-32407|758|11952|2023-08-19T01:39|15608|2023-08-19T06:43|424|AAAAOZ2S|A|-;flight|-32407|316|15608|2023-08-19T07:48|10803|2023-0', '2023-08-02', '2023-08-02'),
(120, 81, '', '1500.00', '', 'url', '2023-08-02', '2023-08-02'),
(121, 82, '', '123.00', '', '234', '2023-08-02', '2023-08-02'),
(122, 82, '', '15.00', '', '234', '2023-08-02', '2023-08-02'),
(123, 82, '', '7.00', '', '123', '2023-08-02', '2023-08-02'),
(124, 77, 'descripc', '500.00', '', 'url', '2023-08-06', '2023-08-06'),
(132, 83, '', '18000.00', '', 'url', '2023-08-06', '2023-08-06'),
(133, 84, 'Viaja hasta alemania a un costo bajo', '18000.00', '', 'url', '2023-08-06', '2023-08-06'),
(134, 85, 'Viaja hasta alemania a un costo bajo', '18000.00', '', 'url', '2023-08-06', '2023-08-06'),
(135, 84, 'Viaje hasta oclombia', '5000.00', '', 'utl', '2023-08-06', '2023-08-06'),
(136, 86, 'avin', '404.08', 'https://content.skyscnr.com/69907554dc47aab9e74edf172e01fb44/GettyImages-516984709.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/avin/1/13993.11952.2023-08-11/air/airli/flights?itinerary=flight|-32540|23|13993|2023-08-11T23:20|10069|2023-08-12T05:00|280|OEOB0BRB|O|XS;flight|-32540|185|10069|2023-08-12T07:05|11952|2023-0', '2023-08-08', '2023-08-08'),
(137, 86, 'vbus', '65.85', 'https://content.skyscnr.com/a285b27602cfe17bf3a803e5aea76ab9/GettyImages-181998864.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/vbus/1/13993.10803.2023-09-02/air/airli/flights?itinerary=flight|-31692|1038|13993|2023-09-02T19:00|10803|2023-09-02T22:25|145|CLSO00N|C|-&carriers=-31692&operators=-31692&passengers=1&channel', '2023-08-08', '2023-08-08'),
(138, 86, 'skyp', '201.00', 'https://content.skyscnr.com/91a3af3b70ff1445ab546f2fc37c68e2/gettyimages-530753093.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/skyp/1/13993.10069.2023-08-17/air/trava/flights?itinerary=flight|-31692|192|13993|2023-08-17T20:40|10069|2023-08-18T02:05|265|-|D|-&carriers=-31692&operators=-31692&passengers=1&channel=iphone', '2023-08-08', '2023-08-08'),
(139, 87, 'avin', '404.08', 'https://content.skyscnr.com/69907554dc47aab9e74edf172e01fb44/GettyImages-516984709.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/avin/1/13993.11952.2023-08-11/air/airli/flights?itinerary=flight|-32540|23|13993|2023-08-11T23:20|10069|2023-08-12T05:00|280|OEOB0BRB|O|XS;flight|-32540|185|10069|2023-08-12T07:05|11952|2023-0', '2023-08-08', '2023-08-08'),
(140, 87, 'vbus', '65.85', 'https://content.skyscnr.com/a285b27602cfe17bf3a803e5aea76ab9/GettyImages-181998864.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/vbus/1/13993.10803.2023-09-02/air/airli/flights?itinerary=flight|-31692|1038|13993|2023-09-02T19:00|10803|2023-09-02T22:25|145|CLSO00N|C|-&carriers=-31692&operators=-31692&passengers=1&channel', '2023-08-08', '2023-08-08'),
(141, 87, 'skyp', '201.00', 'https://content.skyscnr.com/91a3af3b70ff1445ab546f2fc37c68e2/gettyimages-530753093.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/skyp/1/13993.10069.2023-08-17/air/trava/flights?itinerary=flight|-31692|192|13993|2023-08-17T20:40|10069|2023-08-18T02:05|265|-|D|-&carriers=-31692&operators=-31692&passengers=1&channel=iphone', '2023-08-08', '2023-08-08'),
(142, 88, 'avin', '404.08', 'https://content.skyscnr.com/69907554dc47aab9e74edf172e01fb44/GettyImages-516984709.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/avin/1/13993.11952.2023-08-11/air/airli/flights?itinerary=flight|-32540|23|13993|2023-08-11T23:20|10069|2023-08-12T05:00|280|OEOB0BRB|O|XS;flight|-32540|185|10069|2023-08-12T07:05|11952|2023-0', '2023-08-08', '2023-08-08'),
(143, 88, 'vbus', '65.85', 'https://content.skyscnr.com/a285b27602cfe17bf3a803e5aea76ab9/GettyImages-181998864.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/vbus/1/13993.10803.2023-09-02/air/airli/flights?itinerary=flight|-31692|1038|13993|2023-09-02T19:00|10803|2023-09-02T22:25|145|CLSO00N|C|-&carriers=-31692&operators=-31692&passengers=1&channel', '2023-08-08', '2023-08-08'),
(144, 88, 'skyp', '201.00', 'https://content.skyscnr.com/91a3af3b70ff1445ab546f2fc37c68e2/gettyimages-530753093.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/skyp/1/13993.10069.2023-08-17/air/trava/flights?itinerary=flight|-31692|192|13993|2023-08-17T20:40|10069|2023-08-18T02:05|265|-|D|-&carriers=-31692&operators=-31692&passengers=1&channel=iphone', '2023-08-08', '2023-08-08'),
(145, 89, 'avin', '404.08', 'https://content.skyscnr.com/69907554dc47aab9e74edf172e01fb44/GettyImages-516984709.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/avin/1/13993.11952.2023-08-11/air/airli/flights?itinerary=flight|-32540|23|13993|2023-08-11T23:20|10069|2023-08-12T05:00|280|OEOB0BRB|O|XS;flight|-32540|185|10069|2023-08-12T07:05|11952|2023-0', '2023-08-08', '2023-08-08'),
(146, 89, 'vbus', '65.85', 'https://content.skyscnr.com/a285b27602cfe17bf3a803e5aea76ab9/GettyImages-181998864.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/vbus/1/13993.10803.2023-09-02/air/airli/flights?itinerary=flight|-31692|1038|13993|2023-09-02T19:00|10803|2023-09-02T22:25|145|CLSO00N|C|-&carriers=-31692&operators=-31692&passengers=1&channel', '2023-08-08', '2023-08-08'),
(147, 89, 'skyp', '201.00', 'https://content.skyscnr.com/91a3af3b70ff1445ab546f2fc37c68e2/gettyimages-530753093.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/skyp/1/13993.10069.2023-08-17/air/trava/flights?itinerary=flight|-31692|192|13993|2023-08-17T20:40|10069|2023-08-18T02:05|265|-|D|-&carriers=-31692&operators=-31692&passengers=1&channel=iphone', '2023-08-08', '2023-08-08'),
(148, 90, 'avin', '404.08', 'https://content.skyscnr.com/69907554dc47aab9e74edf172e01fb44/GettyImages-516984709.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/avin/1/13993.11952.2023-08-11/air/airli/flights?itinerary=flight|-32540|23|13993|2023-08-11T23:20|10069|2023-08-12T05:00|280|OEOB0BRB|O|XS;flight|-32540|185|10069|2023-08-12T07:05|11952|2023-0', '2023-08-08', '2023-08-08'),
(149, 90, 'vbus', '65.85', 'https://content.skyscnr.com/a285b27602cfe17bf3a803e5aea76ab9/GettyImages-181998864.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/vbus/1/13993.10803.2023-09-02/air/airli/flights?itinerary=flight|-31692|1038|13993|2023-09-02T19:00|10803|2023-09-02T22:25|145|CLSO00N|C|-&carriers=-31692&operators=-31692&passengers=1&channel', '2023-08-08', '2023-08-08'),
(150, 90, 'skyp', '201.00', 'https://content.skyscnr.com/91a3af3b70ff1445ab546f2fc37c68e2/gettyimages-530753093.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/skyp/1/13993.10069.2023-08-17/air/trava/flights?itinerary=flight|-31692|192|13993|2023-08-17T20:40|10069|2023-08-18T02:05|265|-|D|-&carriers=-31692&operators=-31692&passengers=1&channel=iphone', '2023-08-08', '2023-08-08'),
(151, 91, 'descrd', '404.08', 'https://content.skyscnr.com/69907554dc47aab9e74edf172e01fb44/GettyImages-516984709.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/avin/1/13993.11952.2023-08-11/air/airli/flights?itinerary=flight|-32540|23|13993|2023-08-11T23:20|10069|2023-08-12T05:00|280|OEOB0BRB|O|XS;flight|-32540|185|10069|2023-08-12T07:05|11952|2023-0', '2023-08-09', '2023-08-09'),
(152, 91, 'asdfasdf', '65.85', 'https://content.skyscnr.com/a285b27602cfe17bf3a803e5aea76ab9/GettyImages-181998864.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/vbus/1/13993.10803.2023-09-02/air/airli/flights?itinerary=flight|-31692|1038|13993|2023-09-02T19:00|10803|2023-09-02T22:25|145|CLSO00N|C|-&carriers=-31692&operators=-31692&passengers=1&channel', '2023-08-09', '2023-08-09'),
(153, 91, 'asdfasfd', '201.00', 'https://content.skyscnr.com/91a3af3b70ff1445ab546f2fc37c68e2/gettyimages-530753093.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/skyp/1/13993.10069.2023-08-17/air/trava/flights?itinerary=flight|-31692|192|13993|2023-08-17T20:40|10069|2023-08-18T02:05|265|-|D|-&carriers=-31692&operators=-31692&passengers=1&channel=iphone', '2023-08-09', '2023-08-09'),
(154, 92, 'descrdasdf', '404.08', 'https://content.skyscnr.com/69907554dc47aab9e74edf172e01fb44/GettyImages-516984709.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/avin/1/13993.11952.2023-08-11/air/airli/flights?itinerary=flight|-32540|23|13993|2023-08-11T23:20|10069|2023-08-12T05:00|280|OEOB0BRB|O|XS;flight|-32540|185|10069|2023-08-12T07:05|11952|2023-0', '2023-08-09', '2023-08-09'),
(155, 92, 'asdfasdf', '65.85', 'https://content.skyscnr.com/a285b27602cfe17bf3a803e5aea76ab9/GettyImages-181998864.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/vbus/1/13993.10803.2023-09-02/air/airli/flights?itinerary=flight|-31692|1038|13993|2023-09-02T19:00|10803|2023-09-02T22:25|145|CLSO00N|C|-&carriers=-31692&operators=-31692&passengers=1&channel', '2023-08-09', '2023-08-09'),
(156, 92, 'asdfasfd', '201.00', 'https://content.skyscnr.com/91a3af3b70ff1445ab546f2fc37c68e2/gettyimages-530753093.jpg', 'https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/skyp/1/13993.10069.2023-08-17/air/trava/flights?itinerary=flight|-31692|192|13993|2023-08-17T20:40|10069|2023-08-18T02:05|265|-|D|-&carriers=-31692&operators=-31692&passengers=1&channel=iphone', '2023-08-09', '2023-08-09');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `segmentos`
--
ALTER TABLE `segmentos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_user`);

--
-- Indices de la tabla `vuelos`
--
ALTER TABLE `vuelos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `segmentos`
--
ALTER TABLE `segmentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;

--
-- AUTO_INCREMENT de la tabla `vuelos`
--
ALTER TABLE `vuelos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
