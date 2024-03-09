import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mockData } from '../../data';
import {
	actions as popupFriendsAction,
	actions as popupFriendsActions,
} from '../../store/popup-friends/popupFriends.slice';
import { RootState } from '../../store/store';
import { IGroup } from '../../types/mockData.types';
import Friends from '../friends/Friends';
import styles from './Group.module.scss';

const Group: FC<IGroup> = props => {
	const dispatch = useDispatch();
	const popupFriends = useSelector((state: RootState) => state.popupFriends);

	return (
		<div
			className={styles.wrapper_group}
			style={props.avatar_color ? { borderColor: props.avatar_color } : {}}
		>
			<h2 className={styles.title}>Название группы: {props.name}</h2>
			{props.avatar_color && (
				<div
					className={styles.avatar}
					style={{ backgroundColor: props.avatar_color }}
				></div>
			)}
			<p className={styles.subscribe}>Подписчики: {props.members_count}</p>
			<p className={styles.open_or_close_group}>
				{props.closed ? 'Закрытая' : 'Открытая'} группа
			</p>
			{props.friends && (
				<button
					onClick={() =>
						dispatch(popupFriendsAction.isPopup({ status: true, id: props.id }))
					}
				>
					Количество друзей в группе: {props.friends.length}
				</button>
			)}
			{popupFriends.isViewPopup && popupFriends.idGroup === props.id && (
				<div className={styles.friend_in_group}>
					<button onClick={() => dispatch(popupFriendsActions.isPopup(false))}>
						Скрыть
					</button>
					<h2>Друзья</h2>
					{mockData
						.filter(group => group.id === popupFriends.idGroup)
						.map(group => {
							return <Friends key={group.id} friends={group.friends} />;
						})}
				</div>
			)}
		</div>
	);
};

export default Group;
