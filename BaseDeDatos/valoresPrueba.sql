INSERT INTO `avatars` (`avatar_id`, `avatar`) VALUES
(1, 'default-image.png'),
(2, 'default-image.png'),
(3, 'default-image.png'),
(4, 'default-image.png'),
(5, 'default-image.png');

INSERT INTO `products` (`product_id`, `product_name`, `description`, `price`, `product_category_id`, `show_product`) VALUES
(1, 'Producto 1', 'Descripcion Producto 1', '1000.00', NULL, 1),
(2, 'Producto 2', 'Descripcion Producto 2', '2000.00', NULL, 1),
(3, 'Producto 3', 'Descripcion Producto 3', '3000.00', NULL, 1),
(4, 'Producto 4', 'Descripcion Producto 4', '4000.00', NULL, 1),
(5, 'Producto 5', 'Descripcion Producto 5', '5000.00', NULL, 1);

INSERT INTO `product_images` (`product_image_id`, `image`, `product_id`) VALUES
(1, 'producto_1.png', 1),
(2, 'producto_2.png', 2),
(3, 'producto_3.png', 3),
(4, 'producto_4.png', 4),
(5, 'producto_5.png', 5);

INSERT INTO `user_category` (`user_category_id`, `category`) VALUES
(1, 'Client'),
(2, 'Admin'),

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `password`, `user_category_id`, `avatar_id`) VALUES
(1, 'Lorena', 'Grammatico', 'loregrammatico@gmail.co', '123456', 1, 1),
(2, 'Sabrina', 'Basoa', 'sbasoa@gmail.com', '123456', 1, 2),
(3, 'David', 'Gil', 'davidgil.gnz@gmail.com', '165463543654', 1, 3),
(4, 'Gabriel', 'Alvarez', 'galvarez@gmail.com', 'fdÃ±ghkjsdflbnkj', 1, 3),
(5, 'Mariano', 'Uceda', 'marianouceda@gmail.com', 'asldkfghklsdfagh', 1, 5);

INSERT INTO `product_category` (`product_category_id`, `category`) VALUES
(1, 'Agenda'),
(2, 'Cuadernillo'),
(3, 'Cuaderno');
(4, 'Anotador');
(5, 'Álbum');
(6, 'Planner');
(7, 'Imantado');
(8, 'Libreta');
(9, 'Otro');