import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as filtersData } from './filters-data/filtersData.slice';
import { reducer as popupFriends } from './popup-friends/popupFriends.slice';

const reducers = combineReducers({
	popupFriends: popupFriends,
	filtersData: filtersData,
});

export const store = configureStore({
	reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
