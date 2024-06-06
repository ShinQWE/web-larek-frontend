import { ElementCreator,  ElementAttrs} from './html';

// Типизировать настройки не обязательно, но это поможет вам не забыть,
// какие настройки есть и какие значения они могут принимать.
// Также это позволит не приводить типы в каждом файле, где используются настройки.
export interface Settings {
	// views settings
	cardSelector: string;
	cardSettings: {
      categoryType: ElementAttrs;
		text: string;
		image: string;
      suptitleSinaps: string;
	};
	basketTemplate: string;
	basketSettings: {
		activeItemClass: string;
		itemClass: string;
	};
	// modals settings
	modalCardTemplate: string;
	modalCardSettings: {
      categoryType: ElementAttrs;
		text: string;
      supText: string;
		image: string;
      suptitleSinaps: string;
      buyBtn: string;
	};
   basketModal: {
		headerTitle: string;
      preText: string | number;
		text: string;
      sinaps: string;
      basket: string;
      suptitleSinaps: string;
      buyBtn: string;
	};
	paymentModal: {
      headerTitle: string;
      totalLabel: string;
		nextLabel: string;
		nextSettings: ElementCreator;
      paymentMethod: boolean;
	};
	emailModal: {
		headerTitle: string;
		emailLabel: string;
      phoneLabel: string;
		nextSettings: ElementCreator;
	};
   successModal: {
		title: string;
		description: string;
		action: string;
	};

	// model settings
	appState: {
		formatCurrency: (value: number) => string;
		storageKey: string;
	};
}
