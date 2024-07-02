import { Form } from './common/Form';
import { IOrderForm, IContactsForm } from '../types';
import { EventEmitter, IEvents } from './base/events';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';

export interface IActions {
	onClick: (event: MouseEvent) => void;
}

export class Order extends Form<IOrderForm> {
   private _cashBtn: HTMLButtonElement;
   private _cardBtn: HTMLButtonElement;

   constructor(container: HTMLFormElement, events: IEvents, actions?: IActions) {
      super(container, events);

      this._cardBtn = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
      this._cashBtn = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
      this._cardBtn.classList.add('button_alt-active');

      if (actions?.onClick) {
         this._cardBtn.addEventListener('click', actions.onClick);
         this._cashBtn.addEventListener('click', actions.onClick);
      }
   }

   public set address(value: string) {
      const addressInput = this.container.elements.namedItem('address') as HTMLInputElement;
      if (addressInput) {
         addressInput.value = value;
      }
   }

   set phone(value: string) {
      (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
   }

   public paymentMethod(value: HTMLElement) {
      this._cardBtn.classList.toggle('button_alt-active');
      this._cashBtn.classList.toggle('button_alt-active');
   }

   set email(value: string) {
      (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
   }
}

// Оформление заказа
export interface ISuccess {
	id: string; // Идентификатор завершенного заказа
	total: number; // Цена заказа (Итог)
}

export interface ISuccessActions {
	onClick: () => void;
}

export class Success extends Component<ISuccess> {
	protected _close: HTMLElement;
   protected _total: HTMLElement;

	constructor(container: HTMLElement, actions?: ISuccessActions) {
		super(container);

		this._close = ensureElement<HTMLElement>('.order-success__close', this.container);
      this._total = ensureElement<HTMLElement>('.order-success__description', this.container);

		if (actions?.onClick) {
			this._close.addEventListener('click', actions.onClick);
		}
	}
   set total(total: string | number) {
		this.setText(this._total, `Списано ${total} синапсов`);
	}
}


export class FormContacts extends Form<IContactsForm> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

   set phone(value: string) {
      (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
   }

	set email(value: string) {
      (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
   }
}


