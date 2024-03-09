import { IUser } from './mockData.types';

export interface IFriendsProps {
	friends: IUser[] | undefined;
}

export interface IDataCheckboxGroup {
	id: number;
	name: string;
}

export interface ICheckboxProps {
	checkbox?: IDataCheckboxGroup;
	color?: string;
}

export interface IPropsFilter {
	nameData: IDataCheckboxGroup[];
}
