import React, { useState } from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
// import { composeWithDevTools } from 'redux-devtools-extension'

import productsReducer from "./store/reducers/products";
import cartReducer from './store/reducers/cart'
import ordersReducer from './store/reducers/orders'
import ShopNavigation from "./navigation/ShopNavigation";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const appError = error => {
  console.warn(error)
}

 function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={appError}
      />
    );
  }
  return (
    <Provider store={store}>
      <ShopNavigation />
    </Provider>
  );
}

export default App;