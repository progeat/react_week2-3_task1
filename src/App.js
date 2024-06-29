import { useState } from 'react';
import Moment from 'react-moment';
import styles from './app.module.css';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');
	const [isValueVaild, setIsValueVaild] = useState(false);
	const errorMessage = `Введенное значение должно содержать минимум 3 символа`;

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение').trim();

		if (promptValue.length < 3) {
			setError(errorMessage);
			setIsValueVaild(false);
		} else {
			setValue(promptValue);
			setError('');
			setIsValueVaild(true);
		}
	};

	const onAddButtonClick = () => {
		setList((updatedList) => [...updatedList, { id: Date.now(), value }]);
		setValue('');
		setError('');
		setIsValueVaild(false);
	};

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={styles['current-value']}>{value}</output>"
			</p>
			{error && <div className={styles.error}>{error}</div>}
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					onClick={onAddButtonClick}
					disabled={!isValueVaild}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{!list.length && (
					<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				)}
				<ul className={styles.list}>
					{!!list.length &&
						list.map((item) => (
							<li className={styles['list-item']} key={item.id}>
								{`${item.value} `}(
								<Moment format="DD.MM.YYYY HH:MM:SS">{item.id}</Moment>)
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};
