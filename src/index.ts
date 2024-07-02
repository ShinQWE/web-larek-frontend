import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { Page } from './components/Page';
import { AppState, ProductCard } from './components/AppData';
import { Card, paymentType } from './components/Card';
import { cloneTemplate, ensureElement } from './utils/utils';
import { LarekAPI } from './components/Larek';
import { API_URL, CDN_URL } from './utils/constants';
import { Modal } from './components/common/Modal';
import { Basket } from './components/common/Basket';
import { Order, FormContacts, Success } from './components/Order';
import { IContactsForm, IOrder, IOrderForm } from './types';

const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

function onClickForPayment(e: Event) {
	events.emit('payment:change', e.target);
}

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Модель данных
const appData = new AppState({}, events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Переиспользуемые части интерфейса
const basket = new Basket(cloneTemplate(basketTemplate), events);
const contacts = new FormContacts(cloneTemplate(contactsTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events, {
	onClick: onClickForPayment,
});

// Дальше идет бизнес-логика
// Поймали событие, сделали что нужно

// Изменились элементы каталога
events.on('items:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			title: item.title,
			image: item.image,
			category: item.category,
			price: item.price,
		});
	});
});

// Отправлена форма заказа
events.on('contacts:submit', () => {
	api.orderProduct(appData.order)
		.then((result) => {
			appData.clearBasket();
			page.counter = appData.getBasket().length;
			const success = new Success(cloneTemplate(successTemplate), {
				onClick: () => {
					modal.close();
				},
			});
			success.total = result.total;
			modal.render({
				content: success.render({}),
			});
		})
		.catch((err) => {
			console.error(err);
		});
});

// Изменилось состояние валидации формы
events.on('TErrorsOrder:change', (errors: Partial<IOrder>) => {
	const { address } = errors;
	order.valid = !address;
	order.errors = Object.values({ address }).filter((i) => !!i).join('; ');
});

events.on('TErrorsContacts:change', (errors: Partial<IOrder>) => {
	const { email, phone } = errors;
	contacts.valid = !email && !phone;
	contacts.errors = Object.values({ email, phone }).filter((i) => !!i).join('; ');
});

// Изменилось одно из полей формы заказа 
events.on(/^order\..*:change/, (data: { field: keyof IOrderForm; value: string }) => {
	appData.setOrderField(data.field, data.value);
});

events.on(/^contacts\.[^:]*:change/, (data: { field: keyof IContactsForm; value: string }) => {
	appData.setContactField(data.field, data.value);
});

// Открыть форму заказа
events.on('order:open', () => {
	modal.render({
		content: order.render({
			address: '',
			errors: [],
			valid: false,
		}),
	});
});

// Открыть карточку
events.on('card:select', (item: ProductCard) => {
	const card = new Card(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			events.emit('item:toggle', item);
			page.counter = appData.getBasket().length;
			card.buttonText = item.status;
		},
	});
	return modal.render({
		content: card.render({
			title: item.title,
			image: item.image,
			buttonText: item.status,
			description: item.description,
			price: item.price,
			category: item.category,
		}),
	});
});

// Открыть корзину
events.on('basket:open', () => {
	basket.items = appData.getBasket().map((item, index) => {
		const card = new Card(cloneTemplate(cardBasketTemplate), {
			onClick: () => {
				events.emit('item:toggle', item);
			},
		});
		// счетчик
		const cardIndex = index + 1;
		card.index = cardIndex.toString();
		return card.render({
			title: item.title,
			price: item.price,
		});
	});
	page.counter = appData.getBasket().length;
	basket.total = appData.getTotal();
	basket.selected = appData.getBasket();
	appData.order.total = appData.getTotal();
	return modal.render({
		content: basket.render(),
	});
});

// Очистка корзины
events.on('item:toggle', (item: ProductCard) => {
	appData.toggleBasket(item);

	const basketItems = appData.getBasket();
	page.counter = basketItems.length;
});

events.on('basket:changed', (items: ProductCard[]) => {
	basket.items = items.map((item, index) => {
		const card = new Card(cloneTemplate(cardBasketTemplate), {
			onClick: () => {
				events.emit('item:toggle', item);
			},
		});
		const cardIndex = index + 1;
		card.index = cardIndex.toString();
		return card.render({
			title: item.title,
			price: item.price,
		});	
	});
	appData.order.total = appData.getTotal();
	basket.total = appData.getTotal();
	// Код для обновления состояния корзины или
	// выполнения других действий при изменении корзины
});

// тут
// Способ оплаты
events.on('payment:change', (name: HTMLElement) => {
	if (!name.classList.contains('button_alt-active')) {
		order.paymentMethod(name);
		const atributeName = paymentType[name.getAttribute('name')]
		appData.order.payment = atributeName;
	}
});

// Отправка формы доставки
events.on('order:submit', () => {
	modal.render({
		content: contacts.render({
			phone: '',
			email: '',
			valid: false,
			errors: [],
		}),
	});
	const items = appData.basketItem.map(item => item.id);
	appData.order.items = items;
});


// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
	page.locked = false;
});

// Получаем каталог с сервера
api.getProductList()
	.then(appData.setCatalog.bind(appData))
	.catch((err) => {
		console.error(err);
	});
