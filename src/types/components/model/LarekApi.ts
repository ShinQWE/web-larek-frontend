export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

export interface Movie {
	id: string;
   categoryType: string;
	title: string;
	image: string;
	sinaps: string;
}

export interface Contacts {
	email: string;
	phone: string;
}

export interface ILarekAPI {
	getCards: () => Promise<Movie[]>;
}
