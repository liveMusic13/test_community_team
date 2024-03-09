export interface IGroupsSlice {
	groups: {
		all: boolean;
		open: boolean;
		close: boolean;
	};
	friends: boolean;
	isAllColors: boolean;
	selectedColors: Record<string, boolean>;
}
