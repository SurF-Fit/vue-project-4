<template>
  <footer>
    <div class="footer-wrapper">
      <div class="footer-section">
        <h3>О нас</h3>
        <p>Мы - ваш надежный партнер в мире покупок. У нас вы найдете широкий ассортимент товаров по доступным ценам.</p>
      </div>
      <div class="footer-section">
        <h3>Контакты</h3>
        <p>Email: support@prosto-kupi.com</p>
        <p>Телефон: +7 (123) 456-78-90</p>
      </div>
      <div class="footer-section">
        <h3>Социальные сети</h3>
        <ul class="social-links">
          <li><a href="https://facebook.com" target="_blank">Facebook</a></li>
          <li><a href="https://instagram.com" target="_blank">Instagram</a></li>
          <li><a href="https://twitter.com" target="_blank">Twitter</a></li>
          <li><a href="https://vk.com" target="_blank">VK</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Полезные ссылки</h3>
        <ul>
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/products">Каталог товаров</router-link></li>
          <li><router-link to="/register">Регистрация</router-link></li>
          <li><router-link to="/login">Авторизация</router-link></li>
          <li><router-link to="/basket">Корзина</router-link></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 Просто купи. Все права защищены.</p>
    </div>
  </footer>
</template>

<style>
.footer-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #f8f8f8;
}

.footer-section {
  flex: 1;
  margin: 0 10px;
}

.footer-section h3 {
  margin-bottom: 10px;
}

.social-links {
  list-style-type: none;
  padding: 0;
}

.social-links li {
  margin: 5px 0;
}

.footer-bottom {
  text-align: center;
  padding: 10px 0;
  background-color: #e0e0e0;
}

li {
  list-style: none;
}

a{
  color: black;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
  color: #474747;
}
</style>

<script>
export default {
  name: 'footerList',
};
</script>
