import { FC } from 'react';
import { IFriendsProps } from '../../types/props.types';
import styles from './Friends.module.scss';

const Friends: FC<IFriendsProps> = ({ friends }) => {
	return (
		<div className={styles.wrapper_friends}>
			{friends?.map(friend => {
				return (
					<div key={Math.random()} className={styles.block__friend}>
						<p>{friend.first_name}</p>
						<p>{friend.last_name}</p>
					</div>
				);
			})}
		</div>
	);
};

export default Friends;
