export type TProductStatus = 'active' | 'closed';

// Интерфейс описание карточки
export interface ICardProduct {
	id: string; // id
	category: string; // категория товара
	image: string; // картинка
	description: string; // описание товара
	title: string; // название товара
	price: number | null; // цена
}

// Адрес доставки товара
export interface IOrderForm {
	payment: string; // способ оплаты (при получении/онлайн)
	address: string; // адресс
}

// Контактные данные
export interface IContactsForm {
	email: string; // email
	phone: string; // телефон
}

export interface IContacts extends IContactsForm {
	itemsContact: string[];
}

export interface ICardItem extends ICardProduct {
	buttonText: string;
	itemCountProducts: string | number;
}

// Список товаров
export interface IOrder extends IOrderForm, IContactsForm {
	items: string[];
	total: number | string;
}

