import {
	Contacts,
	ILarekAPI,
	Movie,
} from './LarekApi';


// Форматированные данные карты для отображения в корзине
export type CardDescription = {
	id: string;
	title: string;
	sinaps: string;
	price: string;
};

// Какие модальные окна у нас есть
export enum AppStateModals {
	card = 'modal:card',
	basket = 'modal:basket',
	payment = 'modal:payment',
	email = 'modal:email',
	none = 'modal:none',
}

// Какие изменения состояния приложения могут происходить
export enum AppStateChanges {
	modal = 'change:modal',
	modalMessage = 'change:modalMessage',
	basket = 'change:basket',
	order = 'change:order',
}

// Модель данных приложения
export interface AppState {
	// Загружаемые с сервера данные
	movies: Map<string, Movie>;

	// Заполняемые пользователем данные
	selectedMovie: Movie | null;
	basket: Map<string, CardDescription>;
	basketTotal: number;
	contacts: Contacts;

	// Состояние интерфейса
	openedModal: AppStateModals;
	isOrderReady: boolean;
	modalMessage: string | null;
	isError: boolean;

	// Действия с API
	loadMovies(): Promise<void>;
	loadSchedule(id: string): Promise<void>;

	// Пользовательские действия
	selectMovie(id: string): void;
	selectSession(id: string): void;
	fillContacts(contacts: Partial<Contacts>): void;
	isValidContacts(): boolean;

	// Методы для работы с модальными окнами
	openModal(modal: AppStateModals): void;
	setMessage(message: string | null, isError: boolean): void;
}

// Настройки модели данных
export interface AppStateSettings {
	formatCurrency: (value: number) => string;
	// Функция, которая будет вызываться при изменении состояния
	onChange: (changed: AppStateChanges) => void;
}


// Конструктор модели данных
export interface AppStateConstructor {
	new (api: ILarekAPI, settings: AppStateSettings): AppState;
}
