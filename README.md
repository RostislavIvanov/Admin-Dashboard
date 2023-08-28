# Тестовое задание админ-панель
## Техническое задание
Стек: React, Redux, JavaScript, React-Bootstrap

Надо сделать 3 модицификации (см. скрин).  
<ol>
  <li>Растянуть блок на всю ширину рабочей области. Блок, который сейчас находится справа, - убрать.</li>
  <li>Пункт Feedback убрать.
В пункт Profile & Actions добавить иконку слева. Иконку взять как в пункте User слева в дереве навигации по страницам.
Между пунктами «Set Status» и «Profile & actions” добавить серую линию – разделитель.</li>
  <li>Отобразить прогноз погоды для Москвы. Данные взять из Яндекс.API. Или взять любой другой источник погоды через API.</li>
</ol>

![Скрин ТЗ](https://github.com/RostislavIvanov/Admin-Dashboard/blob/master/%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%20%D0%A2%D0%97.png?raw=true)

## Разворачивание
1. Склонировать репозиторий
2. Выполнить `npm install` в консоли в корневой директории репозитория
3.  Стартовать проект с помощью `npm start`

## Процесс разработки
1. <strong>Растянуть блок на всю ширину рабочей области. Блок, который сейчас находится справа, - убрать.</strong><br/>
Нашел этот компонент в файле index.js. Чтобы растянуть компонент на всю область, который находится рядом, надо в атрибутах тега `<Col>` изменить значение на 12.
```JavaScript
<Row className="g-3 mb-3">  
	<Col lg={12} xl={12} xxl={12}>  
		<StorageStatus className="h-lg-100" data={storageStatus} />
	</Col>  
	{/*<Col lg={6} xl={5} xxl={4}>*/}  
		{/* <SpaceWarning />*/}  
	{/*</Col>*/}  
</Row>
```
2. <strong>Пункт Feedback убрать.</strong><br/>
С помощью React Dev Tools нашел, компонент, где находится список с Feedback. 
```JavaScript
<Dropdown.Menu className="dropdown-caret dropdown-menu-card dropdown-menu-end">  
	<div className="bg-white rounded-2 py-2 dark__bg-1000">  
		<Dropdown.Item className="fw-bold text-warning" href="#!"> 
			<FontAwesomeIcon icon="crown" className="me-1" />  
			<span>Go Pro</span>  
		</Dropdown.Item>  
		<Dropdown.Divider />  
		<Dropdown.Item href="#!">Set status</Dropdown.Item>  
		<Dropdown.Divider />  
		<Dropdown.Item as={Link} to="/user/profile">  
			<FontAwesomeIcon icon="user" className="me-1" />  
			Profile &amp; account  
		</Dropdown.Item>  
		{/*<Dropdown.Item href="#!">Feedback</Dropdown.Item>*/}  
		<Dropdown.Divider />  
		<Dropdown.Item as={Link} to="/user/settings">  
			Settings  
		</Dropdown.Item>  
		<Dropdown.Item as={Link} to="/authentication/card/logout"> 
			Logout  
		</Dropdown.Item>  
	</div>  
</Dropdown.Menu>
```

3. <strong>Отобразить прогноз погоды для Москвы.</strong></br>
Нашел компонент, где отображается погода.
Сделал пользовательский хук `useFetching`, в котором происходит запрос на сервер с обработкой ошибки и загрузки.
```JavaScript
import { useState } from 'react';  
  
export const useFetching = callback => {  
	const [isLoading, setIsLoading] = useState(false);  
	const [error, setError] = useState('');  
	  
	const fetching = async () => {  
		try {  
			setIsLoading(true);  
			await callback();  
		} catch (error) {  
			setError(error.message);  
		} finally {  
			setIsLoading(false);  
		}  
	};  
	  
	return [fetching, isLoading, error];  
};
```
Добавил этот хук в компонент с погодой, добавил состояние для погоды и, с помощью хука `useEffect`, сделал отображение данных погоды.
```JavaScript
const [weatherVidget, setWeatherVidget] = useState();  
const [fetchWeather, isWeatherLoading, weatherError] = useFetching( 
	async () => {  
		const response = await fetch(		'https://api.openweathermap.org/data/2.5/weather?lat=55.7522&lon=37.6156&appid=92e4bd50d697552d8c6d2bc1f3cf195f'  
	);  
	const data = await response.json();  
	setWeatherVidget(data);  
	}  
);  
  
useEffect(() => {  
	fetchWeather();  
}, []);
```
Затем поменял переменные в нужных местах
