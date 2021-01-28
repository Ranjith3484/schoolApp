import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, Dimensions, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LiveHome from './liveHome';
import PastHome from './pastHome';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import UpcomingHome from './upcomingHome';

class HomeMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Type: "Live",
            menuModal: false,
        }
    }


    menuModal = () => {
        this.setState({
            menuModal: !this.state.menuModal
        })
    }

    onSwipeUp(gestureState) {
        this.setState({ myText: 'You swiped up!' });
    }

    onSwipeDown(gestureState) {
        this.setState({ myText: 'You swiped down!' });
    }

    onSwipeLeft(gestureState) {
        this.setState({ myText: 'You swiped left!' });
    }

    onSwipeRight(gestureState) {
        this.setState({ myText: 'You swiped right!' });
    }

    onSwipe(gestureName, gestureState) {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        this.setState({ gestureName: gestureName });
        switch (gestureName) {
            case SWIPE_UP:
                this.setState({ backgroundColor: 'red' });
                break;
            case SWIPE_DOWN:
                this.setState({ backgroundColor: 'green' });
                break;
            case SWIPE_LEFT:
                this.setState({ backgroundColor: 'blue' });
                break;
            case SWIPE_RIGHT:
                this.setState({ backgroundColor: 'yellow' });
                break;
        }
    }


    render() {
        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };
        return (
            <Provider>
                <View style={styles.container}>
                    <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                    <View style={styles.bar}>
                        <Icon name="bar-chart-2" size={25} color="white"
                            onPress={() => {
                                this.props.navigation.openDrawer();
                            }}
                            style={{ flex: 0.1, textAlign: 'center',transform: [{rotateZ: '90deg'}] }}
                        />
                        <Text style={styles.title}>SchoolApp</Text>
                        <View style={{ flex: 0.1 }}>
                            <Menu
                                visible={this.state.menuModal}
                                onDismiss={() => { this.menuModal() }}
                                style={{ marginTop: StatusBar.currentHeight, marginRight: 10 }}
                                anchor={
                                    <Icon name="more-vertical" size={25} color="white"
                                        onPress={() => {
                                            this.menuModal();
                                        }}
                                        style={{ textAlign: 'right', marginRight: 10 }}
                                    />
                                }>
                                <Menu.Item onPress={() => {  this.menuModal(); this.props.navigation.navigate("ListView") }} title="List" />
                                <Menu.Item onPress={() => {  this.menuModal(); this.props.navigation.navigate("CalendarView") }} title="Calendar" />
                                <Divider />
                                <Menu.Item onPress={() => { }} title="Item 3" />
                            </Menu>

                        </View>
                    </View>
                    {/* view goes from here */}
                    <View style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
                        <View style={{
                            flexDirection: 'row', paddingTop: 15, backgroundColor: 'rgba(255,0,0,0.5)',
                            justifyContent: "space-evenly", paddingHorizontal: 15, paddingBottom: 5
                        }}>
                            <TouchableOpacity style={{ height: 30 }}
                                onPress={() => {
                                    this.setState({ Type: "Past" })
                                }}
                            >
                                <Text style={{
                                    fontSize: 17, textAlign: 'center',
                                    color: this.state.Type === 'Past' ? 'black' : "white",
                                    borderBottomColor: 'red',
                                    borderBottomWidth: this.state.Type === 'Past' ? 1.5 : 0,
                                }}>Past</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ height: 30 }}
                                onPress={() => {
                                    this.setState({ Type: "Live" })
                                }}
                            >
                                <Text style={{
                                    fontSize: 17, textAlign: 'center',
                                    color: this.state.Type === 'Live' ? 'black' : "white",
                                    borderBottomColor: 'red',
                                    borderBottomWidth: this.state.Type === 'Live' ? 1.5 : 0,
                                }}>Live</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ height: 30 }}
                                onPress={() => {
                                    this.setState({ Type: "Upcoming" })
                                }}
                            >
                                <Text style={{
                                    fontSize: 17, textAlign: 'center',
                                    color: this.state.Type === 'Upcoming' ? 'black' : "white",
                                    borderBottomColor: 'red',
                                    borderBottomWidth: this.state.Type === 'Upcoming' ? 1.5 : 0,
                                }}>Upcoming</Text>
                            </TouchableOpacity>
                        </View>
                        <GestureRecognizer
                            onSwipeLeft={() => { 
                                if(this.state.Type === "Live"){
                                    this.setState({ Type: "Upcoming" }) 
                                }else if(this.state.Type === "Past"){
                                    this.setState({ Type: "Live" }) 
                                }else{
                                    this.setState({ Type: "Upcoming" }) 
                                }
                            }}
                            onSwipeRight={() => {
                                if(this.state.Type === "Live"){
                                    this.setState({ Type: "Past" }) 
                                }else if(this.state.Type === "Upcoming"){
                                    this.setState({ Type: "Live" }) 
                                }else{
                                    this.setState({ Type: "Past" }) 
                                }
                             }}
                            config={config}
                            style={{ flex: 1 }}
                        >
                            <View style={{ marginBottom: 0, marginTop: 10 }}>
                                {
                                    this.state.Type === 'Live' ?
                                        <LiveHome navigation={this.props.navigation} />
                                        :
                                        this.state.Type === 'Past' ?
                                            <PastHome navigation={this.props.navigation} />
                                            :
                                            <UpcomingHome navigation={this.props.navigation} />
                                }
                            </View>
                        </GestureRecognizer>
                    </View>
                    {/* footer */}
                    <View>
                        <Text
                            style={{
                                textAlign: 'center', color: 'white', paddingVertical: 10
                            }}
                        >SchoolApp</Text>
                    </View>
                </View>
            </Provider>
        );
    }
}

export default HomeMain;

const margin = StatusBar.currentHeight;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255,0,0,0.5)',
    },
    bar: {
        marginTop: margin + 10,
        flexDirection: 'row',
        marginLeft: 10,
        alignContent: 'center',
        alignItems: 'center',
    },
    title: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        flex: 0.8
    },
});