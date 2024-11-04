import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import HomePage from './components/Home/HomePage.jsx';

function App() {
    return (
        <Provider store={store}>
            <HomePage />
        </Provider>
    );
}

export default App;
