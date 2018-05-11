import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import configureStore from 'redux-mock-store'
import App from './App';

Enzyme.configure({adapter: new Adapter()});


describe('Main component', () => {

  const initialState = {
    trips: {
      tripList: [],
      collection: []
    }
  };

  const mockStore = configureStore();
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<App store={store}/>)
  });

  test('+++ render the connected(SMART) component', () => {
    expect(container.length).toEqual(1)
  });

});
