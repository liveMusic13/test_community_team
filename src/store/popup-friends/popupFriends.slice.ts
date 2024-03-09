import { createSlice } from '@reduxjs/toolkit';
import { IPopupFriends } from '../../types/popupFriends.types';

const initialState: IPopupFriends = {
	isViewPopup: false,
	idGroup: null,
};

export const popupFriends = createSlice({
	name: 'popupFriends',
	initialState,
	reducers: {
		isPopup: (state, { payload }) => {
			state.isViewPopup = payload.status;
			state.idGroup = payload.id;
		},
	},
});

export const { actions, reducer } = popupFriends;
