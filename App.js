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
import SwipeButton from './src/swipeButton';

type Props = {};

export type ItemInfo = {|
    id: number, 
    name: string
|}

type States = {
    itemInfos: Array<ItemInfo>
}

export default class App extends Component<Props, States> {

    _showingSwipeButton: ?SwipeButton = null;

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

    _removeItem(id: number, swipeButton: SwipeButton) {
        let {
            itemInfos
        } = this.state;

        if (swipeButton === this._showingSwipeButton) {
            this._showingSwipeButton = null;
        }

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

    _handleSwipeItemButtonsShowed(swipeButton: SwipeButton) {
        this._showingSwipeButton = swipeButton;
    }

    _handleSwipeInitial(swipeButton: SwipeButton) {
        if (swipeButton !== this._showingSwipeButton && this._showingSwipeButton != null) {
            this._showingSwipeButton.close();
            this._showingSwipeButton = null;
        }
    }

    _renderFlatListItem(itemInfo: ItemInfo): JSX.Element {
        return (
            <SwipeButton 
                text={itemInfo.name} 
                id={itemInfo.id} 
                onDelete={(id, button) => this._removeItem(id, button)} 
                onSwipeInitial={(button) => this._handleSwipeInitial(button)}
                oButtonsShowed={(button) => this._handleSwipeItemButtonsShowed(button)}
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