import React, { Component } from 'react';
import { View, Text, Dimensions, StatusBar, StyleSheet, TouchableOpacity, ScrollView, Alert, Button, ImageBackground } from 'react-native';
import LoginComp from './loginComp';
import RegisterComp from './registerComp';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-community/google-signin';
import { Modal } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

class AccountHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Type: "Login",
            Sending: false,
            AccountCard: true
        };
    }

    componentDidMount() {
        // this._bootstrapAsync();

        GoogleSignin.configure({
            scopes: ['email'],
            webClientId: "1094616563757-1dc628ao746fq37e09m828oiuqvjje22.apps.googleusercontent.com",
            offlineAccess: true
        });
    }

    _bootstrapAsync = async () => {

        const type = await AsyncStorage.getItem('loggedIn');

        this.props.navigation.navigate(type == 'true' ? 'HomeDrawer' : 'GoogleLogin');

    };

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({
                Sending: !this.state.Sending
            })
            console.log(userInfo);
        } catch (error) {
            console.log(JSON.stringify(error))
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                Alert.alert('Sign In Cancelled!!');
                console.log(error);
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                Alert.alert('In progress!');
                console.log(error);
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                Alert.alert('Google play services not available!');
                console.log(error);
            } else {
                // some other error happened
                Alert.alert('Try later');
                console.log(error);
            }
        }

    }

    render() {
        const windowHeight = Dimensions.get('window').height;
        const windowWidth = Dimensions.get('window').width;

        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />


                <ImageBackground
                    source={require('../../assets/login.jpg')}
                    style={{ flex: 0.5, }}
                />

                <View style={{ flex: 0.5, backgroundColor: 'white' }}>

                </View>
                <Modal
                    visible={true}
                >
                    <Animatable.View
                    animation="fadeInUpBig"
                    >
                        <ScrollView>
                    <View style={{
                        marginTop: windowHeight/3, backgroundColor: 'white',
                        elevation: 3, marginHorizontal: 20, borderRadius: 20,
                    }}>
                        <View style={{
                            flexDirection: 'row', paddingTop: 15,
                            justifyContent: "space-evenly", marginHorizontal: 15
                        }}>
                            <TouchableOpacity style={{ height: 30 }}
                                onPress={() => {
                                    this.setState({ Type: "Login" })
                                }}
                            >
                                <Text style={{
                                    fontSize: 17, textAlign: 'center',
                                    color: this.state.Type === 'Login' ? 'black' : "grey",
                                    borderBottomColor: 'red',
                                    borderBottomWidth: this.state.Type === 'Login' ? 1.5 : 0,
                                }}>LOGIN</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ height: 30 }}
                                onPress={() => {
                                    this.setState({ Type: "SignUp" })
                                }}
                            >
                                <Text style={{
                                    fontSize: 17, textAlign: 'center',
                                    color: this.state.Type === 'SignUp' ? 'black' : "grey",
                                    borderBottomColor: 'red',
                                    borderBottomWidth: this.state.Type === 'SignUp' ? 1.5 : 0,
                                }}>SIGNUP</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            {
                                this.state.Type === 'Login' ?
                                    <LoginComp navigation={this.props.navigation} /> : <RegisterComp />
                            }
                        </View>
                    </View>

                    {
                        this.state.Type === 'Login' ?
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end', marginRight: 10, marginTop: 20
                            }}>
                                <Text style={{
                                    fontSize: 13, color: 'white',fontWeight:"bold"
                                }}
                                    onPress={() => {
                                        this.props.navigation.navigate("ResetScreen")
                                    }}
                                >Forgot password...?</Text>
                            </View>
                            :
                            null
                    }



                    {/*google login button render in bottom */}
                    <View style={{ justifyContent: 'flex-end' }}>

                        {/* or tag */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50, justifyContent: 'center' }}>
                            <View style={{ flex: 0.4, borderWidth: 0.5, borderColor: 'white' }}></View>
                            <Text
                                style={{ color: 'white', paddingLeft: 5, fontWeight: 'bold', fontSize: 13, marginHorizontal: 5 }}>
                                OR
                            </Text>
                            <View style={{ flex: 0.4, borderWidth: 0.5, borderColor: 'white' }}></View>
                        </View>
                        {/* social login */}
                        <TouchableOpacity style={{
                            flexDirection: 'row', justifyContent: 'center',
                            backgroundColor: "red", marginHorizontal: 30, borderRadius: 20,
                            marginVertical: 20
                        }}
                            onPress={() => {
                                this.signIn();
                            }}
                        >
                            <Icon
                                name='google'
                                size={24}
                                color='white'
                                style={{ paddingVertical: 8, marginRight: 10 }}
                            />
                            <Text style={{ textAlign: 'center', color: 'white', textAlignVertical: 'center' }}>Google</Text>
                        </TouchableOpacity>
                    </View>
                    </ScrollView>
                    </Animatable.View>
                </Modal>
            </View>
        );
    }
}

export default AccountHeader;

const windowWidth = Dimensions.get('window').width;
const margin = StatusBar.currentHeight
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})