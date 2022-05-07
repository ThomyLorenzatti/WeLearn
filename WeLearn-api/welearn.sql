-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : dim. 08 mai 2022 à 00:43
-- Version du serveur : 8.0.29-0ubuntu0.22.04.2
-- Version de PHP : 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `welearn`
--

-- --------------------------------------------------------

--
-- Structure de la table `formation`
--

CREATE TABLE `formation` (
  `name` text NOT NULL,
  `wallet_creator` text NOT NULL,
  `id` int UNSIGNED NOT NULL,
  `nft_contract` text NOT NULL,
  `ntt_contract` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `formation`
--

INSERT INTO `formation` (`name`, `wallet_creator`, `id`, `nft_contract`, `ntt_contract`) VALUES
('name', '0x4DD57e16B788759565C818299B4197F22d757E18', 4, 'oui', 'oui'),
('Certificate', '0x4DD57e16B788759565C818299B4197F22d757E18', 5, 'oui', 'oui'),
('Certificate', '0x4DD57e16B788759565C818299B4197F22d757E18', 6, 'oui', 'oui'),
('Certificate', '0x4DD57e16B788759565C818299B4197F22d757E18', 7, 'oui', 'oui'),
('Certificate', '0x4DD57e16B788759565C818299B4197F22d757E18', 8, 'oui', 'oui'),
('Certificate', '0x4DD57e16B788759565C818299B4197F22d757E18', 9, 'oui', 'oui'),
('Certificate', '0x4DD57e16B788759565C818299B4197F22d757E18', 10, 'oui', 'oui'),
('Certificate', '0x4DD57e16B788759565C818299B4197F22d757E18', 11, 'oui', 'oui'),
('Certificate', '0x4DD57e16B788759565C818299B4197F22d757E18', 12, 'oui', 'oui');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `formation`
--
ALTER TABLE `formation`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `formation`
--
ALTER TABLE `formation`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
