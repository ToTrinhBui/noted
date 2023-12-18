create database if not exists noted;

create table if not exists `nguoi_dung` (
	`id` varchar(255) NOT NULL primary key,
    `email` varchar(255) not null,
	`password` varchar(255) null
);

create table if not exists `bang_cv` (
	`id` varchar(255) NOT NULL primary key,
    `name` varchar(255) not null,
    `owner_id` varchar(255) not null,
	`background` varchar(255) null,
    `members` varchar(255) null,
    FOREIGN KEY (`owner_id`) REFERENCES `nguoi_dung`(`id`)
);

create table if not exists `danh_sach_cv` (
	`id` varchar(255) NOT NULL primary key,
    `name` varchar(255) not null,
	`background` varchar(255) null,
    `created` varchar (255) not null,
    `bang_id` varchar(255) not null,
    FOREIGN KEY (`bang_id`) REFERENCES `bang_cv`(`id`)
);

create table if not exists `the_cv` (
	`id` varchar(255) NOT NULL primary key,
    `name` varchar(255) not null,
    `bang_id` varchar(255) not null,
    `dsach_id` varchar(255) not null,
    `deadline` varchar(255) null,
    `label` varchar(255) null,
    `description` varchar(255) null,
    `members_task` varchar(255) null,
    `done` boolean null,
     FOREIGN KEY (`bang_id`) REFERENCES `bang_cv`(`id`),
	 FOREIGN KEY (`dsach_id`) REFERENCES `danh_sach_cv`(`id`)
);

INSERT INTO `noted`.`nguoi_dung` (`id`, `email`, `password`) VALUES ('1', 'nguyenvana@gmail.com', '12345');
INSERT INTO `noted`.`nguoi_dung` (`id`, `email`, `password`) VALUES ('2', 'buitotrinh@gmail.com', '12345');

create table if not exists `backgrounds`(
	`id` int primary key auto_increment,
    `link` varchar(255)
);

INSERT INTO `noted`.`backgrounds` (`link`) VALUES ('https://images.unsplash.com/photo-1655679152783-f4d22c72264a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDUwfDMxNzA5OXx8fHx8Mnx8MTY5MDg3MDY2N3w&ixlib=rb-4.0.3');
INSERT INTO `noted`.`backgrounds` (`link`) VALUES ('https://images.unsplash.com/photo-1688920556232-321bd176d0b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDMyfDMxNzA5OXx8fHx8Mnx8MTY5MDg3MDY2N3w&ixlib=rb-4.0.3');
INSERT INTO `noted`.`backgrounds` (`link`) VALUES ('https://images.unsplash.com/photo-1688232542797-c3e762c7e3c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDUzfDMxNzA5OXx8fHx8Mnx8MTY5MDg3MDY2N3w&ixlib=rb-4.0.3');
INSERT INTO `noted`.`backgrounds` (`link`) VALUES ('https://images.unsplash.com/photo-1690184432588-81068877d852?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDV8MzE3MDk5fHx8fHwyfHwxNjkwODcwNjI5fA&ixlib=rb-4.0.3');
INSERT INTO `noted`.`backgrounds` (`link`) VALUES ('https://images.unsplash.com/photo-1690055899078-63be27a01cdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDh8MzE3MDk5fHx8fHwyfHwxNjkwODcwNjI5fA&ixlib=rb-4.0.3');
INSERT INTO `noted`.`backgrounds` (`link`) VALUES ('https://images.unsplash.com/photo-1690184432960-ea288727b9c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDEwfDMxNzA5OXx8fHx8Mnx8MTY5MDg3MDYyOXw&ixlib=rb-4.0.3');
INSERT INTO `noted`.`backgrounds` (`link`) VALUES ('https://images.unsplash.com/photo-1689631857988-a46ee3adf86b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDl8MzE3MDk5fHx8fHwyfHwxNjkwODcwNjI5fA&ixlib=rb-4.0.3');
INSERT INTO `noted`.`backgrounds` (`link`) VALUES ('https://images.unsplash.com/photo-1658457459792-f4dfe37407ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDI2fDMxNzA5OXx8fHx8Mnx8MTY5MDg3MDYyOXw&ixlib=rb-4.0.3');
