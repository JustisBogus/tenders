import React, { Component } from 'react';
import Main from './Components/Main';
import NewTender from './Components/Tender/NewTender';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { Route } from 'react-router-dom';

const store = configureStore();

const Redux = (
  <Provider store={store}>
    <Route path="/" exact component={Main}/>
    <Route path="/newtender" component={NewTender}/>
  </Provider>
)

class App extends Component {
     
    componentDidMount() {
      document.body.style.background = "#eee";
    }

    render() {
        return (
            <div>
                {Redux}
            </div>
        );
    }
}

export default App;