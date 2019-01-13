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

export type ItemInfo = {|
    id: number, 
    name: string
|}

type States = {
    itemInfos: Array<ItemInfo>
}

export default class App extends Component<Props, States> {

    constructor(props: Props) {
        super(props);
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

        let itemInfos: Array<ItemInfo> = [];
        for (let i = 0; i < 10; i++) {
            itemInfos.push({
                id: i,
                name: `Swipe item ${i}`,
            });
        }

        this.state = {
            itemInfos
        };
    }

    _removeItem(id: number) {
        let {
            itemInfos
        } = this.state;

        let removeIndex = itemInfos.findIndex((itemInfo) => itemInfo.id === id);
        itemInfos.splice(removeIndex, 1);

        this.setState({
            itemInfos
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

    _renderFlatListItem(itemInfo: ItemInfo): JSX.Element {
        return (
            <SwipeButtonCustom 
                text={itemInfo.name} 
                id={itemInfo.id} 
                onDelete={(v) => this._removeItem(v)} 
            />
        );
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
                        data={this.state.itemInfos}
                        keyExtractor={(item: ItemInfo, index: number) => item.id + ''}
                        renderItem={({item}) => this._renderFlatListItem(item)}
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