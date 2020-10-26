import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import SearchScreen from '../app/screens/SearchScreen';
import ResultScreen from '../app/screens/ResultScreen';
import DetailedResultScreen from '../app/screens/DetailedResultScreen';

const screens = {
    Search: {
        screen: SearchScreen,
    },
    Results: {
        screen: ResultScreen,
    },
    Details: {
        screen: DetailedResultScreen,
    }
};

const SearchStack = createStackNavigator(screens);

export default createAppContainer(SearchStack);