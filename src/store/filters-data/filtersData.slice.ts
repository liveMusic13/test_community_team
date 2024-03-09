import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IGroupsSlice } from '../../types/slice.types';

const initialState: IGroupsSlice = {
	groups: {
		all: true,
		open: true,
		close: true,
	},
	friends: true,
	isAllColors: true,
	selectedColors: {},
};

export const filtersData = createSlice({
	name: 'filtersData',
	initialState,
	reducers: {
		toggleGroup: (
			state,
			action: PayloadAction<keyof IGroupsSlice['groups']>
		) => {
			state.groups[action.payload] = !state.groups[action.payload];

			if (action.payload === 'all' && !state.groups[action.payload]) {
				state.groups.open = false;
				state.groups.close = false;
				state.friends = false;
				state.isAllColors = false;
				for (const color in state.selectedColors) {
					state.selectedColors[color] = false;
				}
			}
		},

		toggleFriends: (state, { payload }) => {
			state.friends = !state.friends;
		},
		toggleAvatarColors: (state, { payload }) => {
			state.isAllColors = !state.isAllColors;
			if (state.isAllColors) {
				for (const color in state.selectedColors) {
					state.selectedColors[color] = true;
				}
			} else {
				for (const color in state.selectedColors) {
					state.selectedColors[color] = false;
				}
			}
		},
		addSelectedColors: (state, { payload }) => {
			state.selectedColors = payload;
		},
		toggleTargetColor: (state, { payload }) => {
			state.selectedColors[payload] = !state.selectedColors[payload];

			if (state.selectedColors[payload]) {
				state.groups.all = true;
			}

			if (Object.values(state.selectedColors).every(value => value)) {
				state.isAllColors = true;
			} else {
				state.isAllColors = false;
			}

			if (
				!state.groups.open &&
				!state.groups.close &&
				!state.friends &&
				!state.isAllColors &&
				!Object.values(state.selectedColors).some(value => value)
			) {
				state.groups.all = false;
			}
		},
	},
});

export const { actions, reducer } = filtersData;
