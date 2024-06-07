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