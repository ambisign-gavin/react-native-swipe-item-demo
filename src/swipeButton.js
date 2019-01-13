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
    onDelete: (value: number) => mixed,
    value: number,
}

type States = {
    stared: boolean,
}

export default class SwipeButtonCustom extends React.Component<Props, States> {

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

    _renderRightButtons(): JSX.Element {
        const {
            onDelete,
            value,
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
                    onPress={() => onDelete(value)}
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
        return (
            <SwipeItem
                style={styles.button}
                swipeContainerStyle={styles.swipeContentContainerStyle}
                leftButtons={this._renderLeftButtons()}
                rightButtons={this._renderRightButtons()}
                containerView={ViewOverflow}
            >
                <Text>
                    Swipe me!
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