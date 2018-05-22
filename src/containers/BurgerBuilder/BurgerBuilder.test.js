import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure( { adapter: new Adapter() } );

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
    });

    test('should not render <BuildControls /> if ingredientss are not passed', () => {
        expect(wrapper.find(BuildControls)).toHaveLength(0);
    });

    test('should render <BuildControls /> if ingredients are passed', () => {
        wrapper.setProps({ingredients: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
});
