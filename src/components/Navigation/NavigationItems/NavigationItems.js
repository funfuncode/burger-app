import React, { Component } from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => {

      let authBlock = <NavigationItem link="/auth">Authenticate</NavigationItem>;

      if(props.auth){
         authBlock = <NavigationItem link="/logout">Log out</NavigationItem>
      }
      return (
         <ul className={classes.NavigationItems}>
            <NavigationItem exact link="/">BurgerBuilder</NavigationItem>
            { props.auth ? <NavigationItem link="/orders">Orders</NavigationItem> : null }
            {authBlock}
         </ul>
      );
}



export default navigationItems;
