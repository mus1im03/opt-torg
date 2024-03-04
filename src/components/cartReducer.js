export const cartReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        // Обработка добавления товара в корзину
        return [...state, action.payload];
      case 'REMOVE_FROM_CART':
        // Обработка удаления товара из корзины
        return state.filter(item => item.id !== action.payload.id);
      // Другие случаи обработки...
      default:
        return state;
    }
  };
  