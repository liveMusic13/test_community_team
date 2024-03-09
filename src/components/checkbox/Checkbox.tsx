import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as filtersDataAction } from '../../store/filters-data/filtersData.slice';
import { RootState } from '../../store/store';
import { ICheckboxProps } from '../../types/props.types';

const Checkbox: FC<ICheckboxProps> = ({ checkbox, color }) => {
	const dispatch = useDispatch();
	const filtersData = useSelector((state: RootState) => state.filtersData);

	const targetCheck =
		checkbox?.name === 'Все'
			? 'all'
			: checkbox?.name === 'Открытые'
			? 'open'
			: 'close';

	const checkFilter =
		checkbox?.name === 'Друзья'
			? filtersData.friends
			: checkbox?.name === 'Все цвета'
			? filtersData.isAllColors
			: filtersData.groups[targetCheck];

	return (
		<>
			{color ? (
				<label htmlFor={color}>
					<input
						type='checkbox'
						id={color}
						checked={filtersData.selectedColors[color]}
						onChange={() => {
							dispatch(filtersDataAction.toggleTargetColor(color));
						}}
					/>
					{color}
				</label>
			) : (
				<label htmlFor={checkbox?.id.toString()}>
					<input
						type='checkbox'
						id={checkbox?.id.toString()}
						checked={checkFilter}
						onChange={() => {
							if (checkbox?.name === 'Друзья') {
								dispatch(filtersDataAction.toggleFriends(''));
							} else if (checkbox?.name === 'Все цвета') {
								dispatch(filtersDataAction.toggleAvatarColors(''));
							} else {
								if (checkbox?.name === 'Все') {
									dispatch(filtersDataAction.toggleGroup('all'));
								} else if (checkbox?.name === 'Открытые') {
									dispatch(filtersDataAction.toggleGroup('open'));
								} else {
									dispatch(filtersDataAction.toggleGroup('close'));
								}
							}
						}}
					/>
					{checkbox?.name}
				</label>
			)}
		</>
	);
};

export default Checkbox;
