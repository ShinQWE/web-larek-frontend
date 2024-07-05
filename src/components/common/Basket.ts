import { Component } from '../base/Component';
import {
	cloneTemplate,
	createElement,
	ensureElement,
	} from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { ICardProduct } from '../../types';



// Интерфейс, описывающий содержимое корзины
export interface IBasketView {
	items: HTMLElement[];
	total: number | string;
	selected: string[];
}

export class Basket extends Component<IBasketView> {
	protected _list: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;
   protected _buttonDelete: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._price = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector('.basket__button');
      this._buttonDelete = this.container.querySelector('.basket__item-delete');

		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('order:open');
			});
		}
      else if (this._buttonDelete) {
			this._buttonDelete.addEventListener('click', () => {
				events.emit('item:toggle');
			});
		}

		this.items = [];
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
         this.setDisabled(this._button, true);
		}
	}

	set selected(items: ICardProduct[]) {
		if (items.length) {
			this.setDisabled(this._button, false);
		} else {
			this.setDisabled(this._button, true);
		}
	}

	set total(total: number) {
		this.setText(this._price, `${total} синапсов`);
	}
}
