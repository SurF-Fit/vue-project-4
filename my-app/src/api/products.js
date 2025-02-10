import axios from 'axios';

const API_URL = 'http://lifestealer86.ru/api-shop/products'; // Ваш API

export const getProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.data; // Возвращаем данные
    } catch (error) {
        console.error('Ошибка при загрузке продуктов:', error);
        throw error;
    }
};