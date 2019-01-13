// @flow
import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import unstared from './file/icon/unstared.png';
import rubbish from './file/icon/rubbish.png';
import ViewOverflow from 'react-native-view-overflow';
import stared from './file/icon/stared.png';
import { SwipeItem, SwipeButtonsContainer } from 'react-native-swipe-item';

type Props = {
    dafaultStared?: boolean,
    onDelete: (id: number, swipeButton: SwipeButton) => mixed,
    id: number,
    text: string,
    onSwipeInitial: (swipeButton: SwipeButton) => void,
    oButtonsShowed: (swipeButton: SwipeButton) => void,
}

type States = {
    stared: boolean,
}

export default class SwipeButton extends React.Component<Props, States> {

    _swipeItem: ?SwipeItem;

    state = {
        stared: this.props.dafaultStared || false,
    }

    _handlePressStar() {
        this.setState({
            stared: !this.state.stared
        });
    }

    _renderLeftButtons(): JSX.Element {

        return (
            <SwipeButtonsContainer
                style={{
                    alignSelf: 'center',
                    aspectRatio: 1,
                    flexDirection: 'column',
                    padding: 10,
                }}
                
            >
                <TouchableOpacity
                    onPress={() => this._handlePressStar()}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={this.state.stared? stared: unstared}
                        style={{
                            width: 30,
                            height: 30,
                        }}
                    />
                </TouchableOpacity>
            </SwipeButtonsContainer>
        );
    }

    close() {
        this._swipeItem && this._swipeItem.close();
    }

    _renderRightButtons(): JSX.Element {
        const {
            onDelete,
            id,
        } = this.props;

        return (
            <SwipeButtonsContainer
                style={{
                    alignSelf: 'center',
                    height: '100%',
                    aspectRatio: 1,
                    flexDirection: 'column',
                    padding: 5,
                }}
            >
                <TouchableOpacity
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#db2d43',
                        borderRadius: 5,
                    }}
                    onPress={() => onDelete(id, this)}
                >
                    <Image
                        source={rubbish}
                        style={{
                            width: 50,
                            height: 50,
                        }}
                    />
                </TouchableOpacity>
            </SwipeButtonsContainer>
        );
    }

    render() {
        const {
            text,
            onSwipeInitial,
            oButtonsShowed,
        } = this.props;

        return (
            <SwipeItem
                ref={(item) => this._swipeItem = item}
                style={styles.button}
                swipeContainerStyle={styles.swipeContentContainerStyle}
                leftButtons={this._renderLeftButtons()}
                rightButtons={this._renderRightButtons()}
                containerView={ViewOverflow}
                onSwipeInitial={() => onSwipeInitial(this)}
                onLeftButtonsShowed={() => oButtonsShowed(this)}
                onRightButtonsShowed={() => oButtonsShowed(this)}
                onMovedToOrigin={() => console.log('onMovedToOrigin')}
            >
                <Text>
                    {text}
                </Text>
            </SwipeItem>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: '80%',
        height: 100,
        alignSelf: 'center',
        marginVertical: 5,
    },
    swipeContentContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderColor: '#e3e3e3',
        borderWidth: 1,
    }
});