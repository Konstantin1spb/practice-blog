import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff';
import { Input, Button, H2 } from '../../components';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { setUser } from '../../actions';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants/role';
import styled from 'styled-components';

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин.')
		.matches(/^\w+$/, 'Неверный логин, допускаются только буквы и цифры.')
		.min(3, 'Слишком короткий логин.')
		.max(15, 'Слишком длинный логин.'),
	password: yup
		.string()
		.required('Пароль не должен быть пустым.')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %.',
		)
		.min(6, 'Слишком короткий пароль.')
		.max(30, 'Слишком длинный пароль.'),
});

const StyledLink = styled(Link)`
	font-size: 18px;
	text-decoration: underline;
	text-align: center;
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 260px;
`;

const ErrorMessage = styled.div`
	color: #000;
	padding: 5px;
	background-color: #fcadad;
`;

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const store = useStore();
	const roleId = useSelector(selectUserRole);

	useEffect(() => {
		let currentWasLogout = store.getState().app.wasLogout;

		return store.subscribe(() => {
			let prevWasLogout = currentWasLogout;
			currentWasLogout = store.getState().app.wasLogout;

			if (currentWasLogout !== prevWasLogout) {
				reset();
			}
		});
	}, [reset, store]);

	const onSubmit = ({ login, password }) => {
		server.authorize(login, password).then(({ error, response }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(response));
			//reset();
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;

	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Авторизация</H2>
			<StyledForm onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин"
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				></Input>
				<Input
					type="password"
					placeholder="Пароль"
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				></Input>
				<Button type="submit" disabled={!!formError}>
					Авторизоваться
				</Button>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<StyledLink to="/register">Регистрация</StyledLink>
			</StyledForm>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
