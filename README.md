<p align="center"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></p>

<p align="center"><img src="https://www.pinclipart.com/picdir/big/91-918525_react-logos-download-green-tree-logo-tree-logo.png" width="300" alt="react Logo"></p>
<br/>
<p align="center"><img src="https://iili.io/JBkUArl.md.png" width="400" alt="tailwind Logo"></p>
<br/>


# Форма Обратной Связи на Laravel, React и Tailwind

## О проекте

Этот проект создан с целью предоставить простую и удобную форму обратной связи для пользователей. Используя Laravel в качестве серверной части приложения, React для создания динамического пользовательского интерфейса, Tailwind CSS для стилизации, MySQL для хранения данных в базе.

## Основные функции

- Регистрация и Аутентификация: Пользователи могут регистрироваться, а затем входить в систему для отправки обратной связи.
- Форма Обратной Связи: Пользователи могут отправлять свои отзывы, комментарии или вопросы через удобную форму.
- Валидация и Защита: Предусмотрена проверка введенной информации и защита от нежелательных запросов.
- Хранение данных: Все данные сохраняются безопасно для последующей обработки и анализа.

## Установка

Скопируйте данный проект к себе на компьютер с помощью команды
```
git clone https://github.com/duaves/feedbackform.git
```
Переименуйте .env.example в .env, и измените значения данных полей
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
Установите зависимости
```
composer install
```
А также
```
npm install
```
Сгенерируйте уникальный ключ для приложения
```
php artisan key:generate
```
Инициализируйте миграции
```
php artisan migrate
```

Запустите сиды
```
**Запуск всех сидов**
php artisan db:seed
**Запуск сидов с обнулением данных в БД**
php artisan migrate:fresh --seed
```

Запустите vite сервер
```
npm run dev
```

-Запустите встроенный сервер для разработки
```
php artisan serve
```
-Почту и пароль для менеджера можно узнать в database/seeds/UserSeeder.php
