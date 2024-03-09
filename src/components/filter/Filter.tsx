import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IPropsFilter } from '../../types/props.types';
import Checkbox from '../checkbox/Checkbox';
import styles from './Filter.module.scss';

const Filter: FC<IPropsFilter> = ({ nameData }) => {
	const { selectedColors } = useSelector(
		(state: RootState) => state.filtersData
	);

	useEffect(() => {
		console.log(Object.keys(selectedColors));
	}, [selectedColors]);

	return (
		<div className={styles.filter}>
			<h2>Фильтры</h2>
			{nameData.map(checkbox => (
				<Checkbox key={checkbox.id} checkbox={checkbox} />
			))}
			{Object.keys(selectedColors)?.map(color => {
				return <Checkbox key={Math.random()} color={color} />;
			})}
		</div>
	);
};

export default Filter;
