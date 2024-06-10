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

// Интерфейс, описывающий содержимое корзины
export interface IBasket {
	items: HTMLElement[]; // элементы представляющие товары в корзине
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

export interface AppData {
	clearBasket(): void; 
// очистить корзину
	getBasketList(): []; 
// получить список корзины
	toggleBasketList(): void; 
// удалить или добавить товар в список корзины
	setCatalog(): void; 
// установить список товаров
	getTotal(): number; 
// получить общую сумму заказа
	setOrderField(): void; 
// отслеживать изменения полей заказа
	setContactsField(): void; 
// отслеживать изменения полей контактной информации
}