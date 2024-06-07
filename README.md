https://github.com/ShinQWE/web-larek-frontend

# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Web-larek

Данный проект проходится на модуле ООП и Архитектура приложений. 
MVP расшифровывается:
Model (Модель) - часть приложения, которая работает с данными, проводит вычисления и руководит всеми бизнес-процессами.
View (Вид или представление) - часть приложения, показывающая пользователю интерфейс и данные из модели на экране.
Presenter (Представитель)) - часть приложения, которая обеспечивает связь, является посредником между моделью и видом.

## Основные типы данных

```
// Интерфейс главной страницы 
export interface IPage {
	catalogCard: HTMLElement[]; // каталог карт выводимых на сайт
}

// Тип категории товара 
export type CategoryType =
	| 'другое'
	| 'софт-скил'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

// Интерфейс карты товара
export interface ICardProduct {
	id: string; // id
	category: CategoryType; // категория товара
	img: string; // картинка
	description: string; // описание товара
	title: string; // название товара
	price: number | string | null; // цена
}

// Отображение корзины, что в ней находится
export interface IBasket {
	items: HTMLElement[]; // товары в корзине
	selectedId: string[]; // id товарова, которые выбраны
	totalPrice: number | string; // цена всех товаров (синапс)
}

// Адрес доставки
export interface IOrderForm {
	paymentMethod: string; // способ оплаты (при получении/онлайн)
	address: string; // адресс
}

// Контактные данные
export interface IContactsForm {
	email: string; // email
	phone: string; // телефон
}

// Оформление заказа
export interface ISuccess {
	id: string; // Идентификатор завершенного заказа
	total: number | string; // Цена заказа (Итог)
}
```

