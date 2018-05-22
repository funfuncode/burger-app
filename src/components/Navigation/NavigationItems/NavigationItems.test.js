import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItem from './NavigationItem/NavigationItem';
import NavigationItems from './NavigationItems';

configure( { adapter: new Adapter() } );

describe('<NavigationItems/>', () => {
    let wrapper;

    beforeEach( () => {
        wrapper = shallow(<NavigationItems />);
    });

    test('should render two <NavigationItem/> if unauthenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    test('should render three <NavigationItem/> if authenticated', () => {
        wrapper.setProps({auth: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    test('should contain <NavigationItem link="/logout">Log out</NavigationItem> if authenticated', () => {
        wrapper.setProps({auth: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Log out</NavigationItem>)).toEqual(true);
    });
});
