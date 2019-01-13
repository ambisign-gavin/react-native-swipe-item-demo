/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    UIManager,
    LayoutAnimation
} from 'react-native';
import SwipeButtonCustom from './src/swipeButton';

type Props = {};

type States = {
    swipes: Array<number>
}

export default class App extends Component<Props, States> {

    constructor(props: Props) {
        super(props);
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        let swipes: Array<number> = [];
        for (let i = 0; i < 10; i++) {
            swipes.push(i);
        }
        this.state = {
            swipes
        };
    }

    _removeItem(value: number) {
        let {
            swipes
        } = this.state;
        let removeIndex = swipes.findIndex((arrayValue) => arrayValue === value);
        swipes.splice(removeIndex, 1);

        this.setState({
            swipes
        });

        LayoutAnimation.configureNext({
            duration: 300,
            create: {
                type: LayoutAnimation.Types.linear,      
                property: LayoutAnimation.Properties.opacity
            },
            update: {
                type: LayoutAnimation.Types.linear,      
                property: LayoutAnimation.Properties.opacity
            }
        });
    }

    render() {

        return (
            <View style={[StyleSheet.absoluteFill, styles.container]}>
                <View
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <FlatList
                        style={{
                            flex: 1
                        }}
                        contentContainerStyle={{
                            width: '100%',
                            marginVertical: 10,
                        }}
                        data={this.state.swipes}
                        keyExtractor={(item: number, index: number) => item + ''}
                        renderItem={({item}) => <SwipeButtonCustom value={item} onDelete={(v) => this._removeItem(v)} />}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#faf9f9',
        paddingTop: 40,
    }
});