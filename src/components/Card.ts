import { Component } from './base/Component';
import { ICardItem } from '../types/index';
import { ensureElement } from '../utils/utils';

export interface ICardActions {
   onClick: (event: MouseEvent) => void;
}

// Тип категории товара
export const categoryType: { [value: string]: string } = {
	'софт-скил': 'card__category_soft',
	'хард-скил': 'card__category_hard',
   'кнопка': 'card__category_button',
	'дополнительное': 'card__category_additional',
   'другое': 'card__category_other',
};

export const paymentType: { [value: string]: string } = {
	'card': 'online',
	'cash': 'offline',
};


export class Card extends Component<ICardItem> {
	protected _title: HTMLElement;
	protected _image: HTMLImageElement;
	protected _description: HTMLElement;
	protected _button: HTMLButtonElement;
   protected _category: HTMLElement;
   protected _price: HTMLElement;
   protected _buttonText: string;
   protected _index: HTMLElement;

	constructor(
		container: HTMLElement,
		actions?: ICardActions
	) {
		super(container);

		this._title = ensureElement<HTMLElement>(`.card__title`, container);
		this._image = container.querySelector(`.card__image`);
      this._description = container.querySelector(`.card__text`);
      this._button = container.querySelector(`.card__button`);
		this._category = container.querySelector(`.card__category`);
		this._price = container.querySelector(`.card__price`);
		this._index = container.querySelector('.basket__item-index');

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

   get index(): string {
		return this._index.textContent || '';
	}

	set index(value: string | string[]) {
		this.setText(this._index, value);
	}

	set buttonText(status: string) {
		this.setText(this._button, status);
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

   set category(value: string) {
		this.setText(this._category, value);
		this._category.classList.add(categoryType[value]);
	}

   set price(value: null | number) {
		this.setText(this._price, value !== null  ? `${value} синапсов` : 'Бесценно');
      if(this._button && value === null) {
				this.setDisabled(this._button, true); 
		}
	}

	set description(value: string | string[]) {
		this.setText(this._description, value);
	}
   
}

