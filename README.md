# backend-kkw


## yarn install

```
yarn install
```

## .env 생성

```
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

## server start
```
yarn start
```

## mysql

> 데이터 베이스 및 사용자 테이블 생성.
```
CREATE DATABASE IF NOT EXISTS kkwbackend;

grant all privileges on kkwbackend.* to 'kkw'@'%' identified by '1212';
grant all privileges on kkwbackend.* to 'kkw'@localhost identified by '1212';

flush privileges;

USE kkwbackend;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_uuid` varchar(50) NOT NULL DEFAULT '' COMMENT '사용자 uuid',
  `user_level` varchar(3) NOT NULL DEFAULT '000' COMMENT '사용자 레벨',
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `nickname` varchar(50) NOT NULL DEFAULT '' COMMENT '사용자 닉네임',
  `password` varchar(255) NOT NULL,
  `active` enum('Y','N') NOT NULL DEFAULT 'Y' COMMENT '사용자 상태',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_user_uuid_unique` (`user_uuid`),
  KEY `users_user_email_foreign` (`email`)
) ENGINE=InnoDB;
```

## 기본 API


### 사용자 생성.

```
method: POST

http://localhost:3000/users
{
    "email" : "test@test.com",
    "name":"test",
    "nickname" : "test_nick_name",
    "password": "1212"
}
```

### 사용자 로그인.

```
method: POST
http://localhost:3000/login
{
    "email" : "test@test.com",
    "password": "1212"
}
```

### 사용자 삭제.
```
method: DELETE
http://localhost:3000/users/2
{
    "email" : "test@test.com",
    "password": "1212"
}
```


