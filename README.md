<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"><img src="https://www.pinclipart.com/picdir/big/91-918525_react-logos-download-green-tree-logo-tree-logo.png" width="400" alt="Laravel Logo"></a></p>


# Laravel React Feedbackform project


## Установка

-Скопируйте данный проект к себе на компьютер с помощью команды
```
git clone https://github.com/duaves/feedbackform.git
```
-Переименуйте .env.example в .env, и измените значения данных полей
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=feedbackform
DB_USERNAME=root
DB_PASSWORD="пароль от базы данных"

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME="email адрес"
MAIL_PASSWORD="пароль от email адреса"
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="email адрес"
MAIL_FROM_NAME=feedbackform

NOCAPTCHA_SITEKEY="ключ сайта (от reCAPTCHA)"
NOCAPTCHA_SECRET="секретный ключ (от reCAPTCHA)"
```
-Установите зависимости
```
composer install
```
-А также
```
npm install
```
-Сгенерируйте уникальный ключ для приложения
```
php artisan key:generate
```
-Инициализируйте миграции
```
php artisan migrate
```

-Запустите сиды
```
**Запуск всех сидов**
php artisan db:seed
**Запуск сидов с обнулением данных в БД**
php artisan migrate:fresh --seed
```

-Запустите vite сервер
```
npm run dev
```

-Запустите встроенный сервер для разработки
```
php artisan serve
```
