# Marketplace Backend API

## Запуск проекта
Установите зависимости:
```bash
npm install
```
Настройте переменные окружения:

отредактируйте файл ```.env``` в корне проекта под свои настройки бд.

## Запустите сервер:
```bash
npm run start:dev
```

Сервер будет доступен по адресу: ```http://localhost:3000```

## Endpoints

### Аутентификация (Auth)

Регистрация
```POST /auth/signup```

```JSON

{
  "name": "Ivan Ivanov",
  "email": "ivan@example.com",
  "password": "strongpassword123",
  "role": "USER" 
}
```

(Примечание: роль ADMIN дает право создавать товары)

Вход
```POST /auth/signin```

```JSON

{
  "email": "ivan@example.com",
  "password": "strongpassword123"
}
```

### Товары (Products)
Получить все товары
```GET /product```

### Создать товар (Admin Only)
```POST /product```

```JSON

{
  "name": "Игровой монитор 27\"",
  "description": "144Hz, IPS матрица, 1ms отклик.",
  "price": 32000,
  "category": "Electronics",
  "stock": 15
}
```

### Корзина (Cart)
Просмотр корзины
```GET /cart```
Возвращает массив товаров с полной информацией (populate).

### Добавить в корзину
```POST /cart/add```

```JSON

{
  "productId": "ID_ТОВАРА_ИЗ_БАЗЫ",
  "quantity": 2
}
```

### Удалить товар из корзины
```DELETE /cart/:id```
(В :id передается ID товара)

### Заказы (Orders)
Оформить заказ (Checkout)
```POST /order```
Тело запроса: пустое {}. Логика: берет товары из корзины, считает общую сумму, создает заказ и очищает корзину.

### История моих заказов
```GET /order```

### Дополнительно:
реализован полный REST-api для User (только ADMIN может пользоваться данным функционалом)
