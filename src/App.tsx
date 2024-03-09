import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Filter from './components/filter/Filter';
import { dataGroup } from './components/filter/dataFilters';
import Group from './components/group/Group';
import { mockData } from './data';
import { actions as filtersDataAction } from './store/filters-data/filtersData.slice';
import { RootState } from './store/store';
import { IGroup } from './types/mockData.types';

const App: FC = () => {
	const dispatch = useDispatch();
	const [data, setData] = useState<IGroup[]>([]);
	const { selectedColors } = useSelector(
		(state: RootState) => state.filtersData
	);
	const filtersData = useSelector((state: RootState) => state.filtersData);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setData(mockData);
		}, 1000);

		return () => clearTimeout(timeoutId);
	}, []);

	useEffect(() => {
		const uniqueColors: Record<string, boolean> = {};
		data.forEach(group => {
			if (group.avatar_color) {
				uniqueColors[group.avatar_color] = true;
			}
		});
		// setColors(uniqueColors);
		dispatch(filtersDataAction.addSelectedColors(uniqueColors));
	}, [data]);

	return (
		<div className='wrapper'>
			<div className='content'>
				<h1>Группы</h1>
				{data
					.filter(group => {
						if (!filtersData.groups.all) return false;
						if (
							!filtersData.isAllColors &&
							group.avatar_color &&
							selectedColors[group.avatar_color]
						)
							return true;
						if (!filtersData.isAllColors && !group.avatar_color) return true;
						if (filtersData.groups.open && !group.closed) return true;
						if (filtersData.groups.close && group.closed) return true;
						if (filtersData.isAllColors) return true;
						if (
							filtersData.friends &&
							group.friends &&
							group.friends.length > 0
						)
							return true;
						return false;
					})
					.map(group => (
						<Group key={group.id} {...group} />
					))}
			</div>
			<Filter nameData={dataGroup} />
		</div>
	);
};

export default App;
