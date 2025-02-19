

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`(
  `users_id` INT NOT NULL  AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) DEFAULT NULL,
  `full_name`  VARCHAR(255) NOT NULL,
  `avatar` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`users_id`),
  UNIQUE KEY `unique_email` (`email`)
)

DROP TABLE IF EXISTS `images`;
CREATE TABLE `images` (
`images_id` int NOT NULL AUTO_INCREMENT,
`title` varchar(255) DEFAULT NULL,
`description` text,
`users_id` int NOT NULL,
`url` varchar(255) NOT NULL,
PRIMARY KEY (`images_id`),
KEY `users_id` (`users_id`),
CONSTRAINT `images_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`users_id`) ON DELETE CASCADE
)

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
`comments_id` int NOT NULL AUTO_INCREMENT,
`content` varchar(255) DEFAULT NULL,
`images_id` int NOT NULL,
`users_id` int NOT NULL,
`created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (`comments_id`),
KEY `users_id` (`users_id`),
KEY `images_id` (`images_id`),
CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`users_id`) ON DELETE CASCADE,
CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`images_id`) REFERENCES `images` (`images_id`) ON DELETE CASCADE
)

DROP TABLE IF EXISTS `saved_image`;
CREATE TABLE `saved_image` (
`saved_image_id` int NOT NULL AUTO_INCREMENT,
`users_id` int NOT NULL,
`images_id` int NOT NULL,
`created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (`saved_image_id`),
CONSTRAINT `saved_image_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`users_id`) ON DELETE CASCADE,
CONSTRAINT `saved_image_ibfk_2` FOREIGN KEY (`images_id`) REFERENCES `images` (`images_id`) ON DELETE CASCADE
)

INSERT INTO `images` (`title`, `description`, `users_id`, `url`) VALUES
('nature images', 'rainy day city', 2, 'https://images.unsplash.com/photo-1739382122846-74e722a6eea4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8'),
('tree and flower images', 'rose', 1, 'https://images.unsplash.com/photo-1739129857889-2d6a4e4a4e64?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D'),
('animal images', 'flamingo', 3, 'https://images.unsplash.com/photo-1739163519731-c29cbcee8d84?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNnx8fGVufDB8fHx8fA%3D%3D'),
('people images', 'boy child', 1, 'https://images.unsplash.com/photo-1739208682228-0a3f71db04de?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHhwODZ8fGVufDB8fHx8fA%3D%3D');

INSERT INTO `users` (`users_id`, `email`, `password`, `full_name`, `avatar`, `created_at`, `updated_at`) VALUES
(1, 'ngocanh@gmail.com', '1234', 'Ngoc Anh', NULL, '2024-12-10 15:32:57', '2024-12-10 15:32:57'),
(2, 'ngocanh2@gmail.com', '1234', 'Ngoc Anh 2', NULL, '2024-12-10 15:32:57', '2024-12-10 15:32:57'),
(3, 'ngocanh3@gmail.com', '1234', 'Ngoc Anh 3', NULL, '2024-12-10 15:32:57', '2024-12-10 15:32:57');
