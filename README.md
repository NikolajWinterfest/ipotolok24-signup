## О проекте

<div>
  <img src="/ipotolok24/ipotolok24-signup.png" title="Полоток 24" alt="Полоток 24" />&nbsp;
</div>

### Цель проекта:

Реализовать форму регистрации юридического лица с валидацией и интеграцией с Dadata.ru API.

### Задачи проекта:

#### Frontend:

Создать страницу регистрации юридического лица с полями:
– Имя контактного лица
– Email
– Пароль
– Телефон
– ИНН

Интеграция с Dadata.ru:
– Автозаполнение данных компании при вводе ИНН
– Показ индикатора загрузки во время запроса
– Обработка ошибок (неверный ИНН, проблемы с сетью)

Валидация:
– Проверка всех полей на стороне клиента
– Понятные сообщения об ошибках
– еактивация кнопки отправки при наличии ошибок

Отправка формы:
– Логирование данных в консоли при успешной валидации
– Показ уведомления об успешной отправке
– Обработка ошибок при отправке

UX/UI:
– Дебаунс запросов к Dadata
– Адаптивная верстка
– Чистый и читаемый интерфейс

## Технологии

<div>
  <img src="https://github.com/NikolajWinterfest/NikolajWinterfest/blob/master/assets/icons/React.svg" title="react" alt="react" width="40" height="40"/>&nbsp;
  <img src="https://github.com/NikolajWinterfest/NikolajWinterfest/blob/master/assets/icons/Vite.svg" title="vite" alt="vite" width="40" height="40"/>&nbsp;
  <img src="https://github.com/NikolajWinterfest/NikolajWinterfest/blob/master/assets/icons/TypeScript.svg" title="typescript" alt="typescript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/NikolajWinterfest/NikolajWinterfest/blob/master/assets/icons/HTML.svg" title="html5" alt="html5" width="40" height="40"/>&nbsp;
  <img src="https://github.com/NikolajWinterfest/NikolajWinterfest/blob/master/assets/icons/CSS.svg" title="css3" alt="css3" width="40" height="40"/>&nbsp;
  <img src="https://github.com/NikolajWinterfest/NikolajWinterfest/blob/master/assets/icons/Git.svg" title="git" alt="git" width="40" height="40"/>&nbsp;
</div>

## Запуск проекта

### Склонировать проект на ваш компьютер с Github с помощью команды:

```
gh repo clone NikolajWinterfest/ipotolok24-signup
```

### Установить зависимости с помощью команды

```
npm install
```

### Запустить проект с помощью команды

```
npm run dev
```

### Собрать проект с помощью команды

```
npm run build
```
