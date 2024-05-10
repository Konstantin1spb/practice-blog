import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

const Content = styled.div`
	padding: 120px 0;
`;

const H2 = styled.h2`
	text-align: center;
`;

const Header = () => <div>Header</div>;
const Footer = () => <div>Footer</div>;

const Blog = () => {
	return (
		<>
			<Header></Header>
			<Content>
				<H2>Контент</H2>
				<Routes>
					<Route path="/" element={<div>Главная страница</div>}></Route>
					<Route path="/login" element={<div>Авторизация</div>}></Route>
					<Route path="/register" element={<div>Регистрация</div>}></Route>
					<Route path="/users" element={<div>Пользователи</div>}></Route>
					<Route path="/post" element={<div>Новая статья</div>}></Route>
					<Route path="/post/:postId" element={<div>Статья</div>}></Route>
					<Route path="*" element={<div>Ошибка</div>}></Route>
				</Routes>
			</Content>
			<Footer></Footer>
		</>
	);
};

export default Blog;
