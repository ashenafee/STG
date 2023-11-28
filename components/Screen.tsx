import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

function Screen({ children, style }) {
    return(
        <View style={[styles.container, style]}>
            {children}
        </View>
    );
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '$pageBackgroundColor',
        alignItems: 'center',
    },
});

export default Screen;
