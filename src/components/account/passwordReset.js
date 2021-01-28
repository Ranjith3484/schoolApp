import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, StatusBar, TextInput, Dimensions, Alert, Modal, ActivityIndicator, ToastAndroid }
    from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableRipple } from 'react-native-paper';
import Icon1 from 'react-native-vector-icons/FontAwesome';
// import Api from '../api';

class PasswordReset extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Sending: false,
            Slide: true,
            Email: "",
            showOTP: false,
            showPassword: false,
            OTP: "",
            Password: "",
            ConfirmPassword: "",
            securePassword: true
        };
    }

    // requestOTP = async () => {
    //     var mailformat = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

    //     if (this.state.Email === "") {
    //         Alert.alert("Email is required!");
    //     } else if (!this.state.Email.match(mailformat)) {
    //         Alert.alert("Enter a valid email!");
    //     }
    //     else {
    //         this.setState({
    //             Sending: true
    //         })
    //         fetch(Api + '/request/otp/for/password/reset',
    //             {
    //                 method: 'PUT',
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     email: await this.state.Email,
    //                 })

    //             })
    //             .then((response) => response.json())
    //             .then((responseData) => {
    //                 if (responseData.message === 'OTP sended') {
    //                     Alert.alert('Enter the OTP' + responseData.OTP);
    //                     this.setState({
    //                         showOTP: true,
    //                         Sending: false
    //                     })
    //                 } else {
    //                     Alert.alert(responseData.message);
    //                     this.setState({
    //                         Sending: false
    //                     })
    //                 }
    //             })
    //             .catch((error) => {
    //                 Alert.alert('No Internet / Server may be down');
    //                 this.setState({
    //                     Sending: false
    //                 })
    //             })

    //     }
    // }

    // verifyOTP = async () => {
    //     if (this.state.OTP === "") {
    //         Alert.alert("OTP is required!");
    //     }
    //     else {
    //         this.setState({
    //             Sending: true
    //         })
    //         fetch(Api + '/user/verify/otp',
    //             {
    //                 method: 'POST',
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     email: await this.state.Email,
    //                     otp: await this.state.OTP,
    //                 })

    //             })
    //             .then((response) => response.json())
    //             .then((responseData) => {
    //                 if (responseData.message === 'OTP Matched') {
    //                     Alert.alert('Enter your password');
    //                     this.setState({
    //                         showPassword: true,
    //                         Sending: false
    //                     })
    //                 } else {
    //                     Alert.alert(responseData.message);
    //                     this.setState({
    //                         Sending: false
    //                     })
    //                 }
    //             })
    //             .catch((error) => {
    //                 Alert.alert('No Internet / Server may be down');
    //                 this.setState({
    //                     Sending: false
    //                 })
    //             })

    //     }
    // }

    // changePassword = async () => {
    //     if (this.state.Password === "") {
    //         Alert.alert("Password cannot be empty!");
    //     } else if (this.state.Password === this.state.ConfirmPassword) {
    //         this.setState({
    //             Sending: true
    //         })
    //         fetch(Api + '/user/update/password',
    //             {
    //                 method: 'PUT',
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     email: await this.state.Email,
    //                     otp: await this.state.OTP,
    //                     password: await this.state.Password
    //                 })

    //             })
    //             .then((response) => response.json())
    //             .then((responseData) => {
    //                 if (responseData.message === 'Successfully Registered') {
    //                     Alert.alert('Password changed!');
    //                     this.clearInput();
    //                     this.setState({
    //                         showPassword: false,
    //                         showOTP: false,
    //                         Sending: false,
    //                         Email: "",
    //                         OTP: "",
    //                         Password: "",
    //                         ConfirmPassword: ""
    //                     })
    //                     this.props.navigation.navigate("GoogleLogin");
    //                 } else {
    //                     Alert.alert(responseData.message);
    //                     this.setState({
    //                         Sending: false
    //                     })
    //                 }
    //             })

    //     } else {
    //         Alert.alert("Passwords doesn't match");
    //     }
    // }

    clearInput = () => {
        this._textInput1.setNativeProps({ text: '' });
        this._textInput2.setNativeProps({ text: '' });
        this._textInput3.setNativeProps({ text: '' });
        this._textInput4.setNativeProps({ text: '' });
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                {/* header starts */}
                <View style={styles.bar}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("AccountHeader");
                        }}
                        style={{flex:0.2}}
                    >
                        <Icon name="chevron-left" size={25} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Change Password</Text>
                    <View style={{flex:0.2}}></View>
                </View>
                {/* header ends */}

                <View style={{ flex: 1, marginHorizontal: 20 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center", borderRadius: 100,
                            borderColor: 'red', borderWidth: 1,
                            marginTop: 20
                        }}
                    >
                        <View style={{ flex: 0.02 }}></View>
                        <View style={{ flex: 0.08 }}>
                            <Icon
                                name='mail'
                                size={24}
                                color='red'
                            />
                        </View>
                        <View style={{ flex: 0.84 }}>
                            <TextInput
                                style={{
                                    paddingLeft: 10, color: 'grey'
                                }}
                                selectionColor='red'
                                placeholder='Email'
                                editable={!this.state.showOTP}
                                ref={component => this._textInput1 = component}
                                onChangeText={(Email) => this.setState({ Email })}
                            />
                        </View>
                        <View style={{ flex: 0.06 }}></View>
                    </View>

                    {this.state.showOTP ?

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                borderColor: 'red', borderWidth: 1, borderRadius: 100,
                                marginTop: 20
                            }}
                        >
                            <View style={{ flex: 0.02 }}></View>
                            <View style={{ flex: 0.08 }}>
                                <Icon1
                                    name='key'
                                    size={24}
                                    color='red'
                                />
                            </View>
                            <View style={{ flex: 0.84 }}>
                                <TextInput
                                    style={{
                                        paddingLeft: 10, color: 'grey'
                                    }}
                                    selectionColor='red'
                                    editable={!this.state.showPassword}
                                    keyboardType="numeric"
                                    maxLength={6}
                                    placeholder='OTP'
                                    ref={component => this._textInput2 = component}
                                    onChangeText={(OTP) => this.setState({ OTP })}
                                />
                            </View>
                            <View style={{ flex: 0.06 }}></View>
                        </View>
                        :
                        null
                    }

                    {
                        this.state.showPassword ?
                            <View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        borderColor: 'red', borderWidth: 1, borderRadius: 100,
                                        marginTop: 20
                                    }}
                                >
                                    <View style={{ flex: 0.02 }}></View>
                                    <View style={{ flex: 0.08 }}>
                                        <Icon1
                                            name='key'
                                            size={24}
                                            color='red'
                                        />
                                    </View>
                                    <View style={{ flex: 0.8 }}>
                                        <TextInput
                                            style={{
                                                paddingLeft: 10, color: 'grey'
                                            }}
                                            selectionColor='red'
                                            secureTextEntry={this.state.securePassword}
                                            placeholder='Password'
                                            ref={component => this._textInput3 = component}
                                            onChangeText={(Password) => this.setState({ Password })}
                                        />
                                    </View>
                                    <View style={{ flex: 0.08 }}>
                                        {this.state.securePassword ?
                                            <Icon1
                                                name='eye-slash'
                                                size={20}
                                                onPress={() => this.setState({ securePassword: false })}
                                                color='red'
                                            />
                                            :
                                            <Icon1
                                                name='eye'
                                                size={20}
                                                onPress={() => this.setState({ securePassword: true })}
                                                color='red'
                                            />
                                        }
                                    </View>
                                    <View style={{ flex: 0.02 }}></View>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        borderColor: 'red', borderWidth: 1, borderRadius: 100,
                                        marginTop: 20
                                    }}
                                >
                                    <View style={{ flex: 0.02 }}></View>
                                    <View style={{ flex: 0.08 }}>
                                        <Icon1
                                            name='key'
                                            size={24}
                                            color='red'
                                        />
                                    </View>
                                    <View style={{ flex: 0.8 }}>
                                        <TextInput
                                            style={{
                                                paddingLeft: 10, color: 'grey'
                                            }}
                                            selectionColor='red'
                                            secureTextEntry={this.state.securePassword}
                                            placeholder='Re-enter Password'
                                            ref={component => this._textInput4 = component}
                                            onChangeText={(ConfirmPassword) => this.setState({ ConfirmPassword })}
                                        />
                                    </View>
                                    <View style={{ flex: 0.08 }}>
                                        {this.state.securePassword ?
                                            <Icon1
                                                name='eye-slash'
                                                size={20}
                                                onPress={() => this.setState({ securePassword: false })}
                                                color='red'
                                            />
                                            :
                                            <Icon1
                                                name='eye'
                                                size={20}
                                                onPress={() => this.setState({ securePassword: true })}
                                                color='red'
                                            />
                                        }
                                    </View>
                                    <View style={{ flex: 0.02 }}></View>
                                </View>
                            </View>
                            : null
                    }

                </View>

                {
                    this.state.showPassword ?
                        <TouchableRipple
                            rippleColor="rgba(0, 0, 0, .32)"
                            style={{
                                backgroundColor: "red", marginHorizontal: 5, marginBottom: 10,
                                borderRadius: 100,
                            }}
                            onPress={() => {
                                this.state.Sending ?
                                    null : this.changePassword()
                            }}
                        >

                            {
                                this.state.Sending ?
                                    <ActivityIndicator color="white" style={{ paddingVertical: 8 }} />
                                    :
                                    <Text
                                        style={{
                                            fontSize: 15, color: 'white', fontWeight: 'bold',
                                            paddingVertical: 8, textAlign: 'center',
                                        }}>
                                        Change Password
                            </Text>
                            }
                        </TouchableRipple>
                        :
                        this.state.showOTP ?
                            <TouchableRipple
                                rippleColor="rgba(0, 0, 0, .32)"
                                style={{
                                    backgroundColor: "red", marginHorizontal: 5, marginBottom: 10,
                                    borderRadius: 100,
                                }}
                                onPress={() => {
                                    this.state.Sending ?
                                        null : this.verifyOTP()
                                }}
                            >

                                {
                                    this.state.Sending ?
                                        <ActivityIndicator color="white" style={{ paddingVertical: 8 }} />
                                        :
                                        <Text
                                            style={{
                                                fontSize: 15, color: 'white', fontWeight: 'bold',
                                                paddingVertical: 8, textAlign: 'center',
                                            }}>
                                            Verify
                        </Text>
                                }
                            </TouchableRipple>
                            :
                            <TouchableRipple
                                rippleColor="rgba(0, 0, 0, .32)"
                                style={{
                                    backgroundColor: "red", marginHorizontal: 5, marginBottom: 10,
                                    borderRadius: 100,
                                }}
                                onPress={() => {
                                    this.state.Sending ?
                                        null : this.requestOTP()
                                }}
                            >

                                {
                                    this.state.Sending ?
                                        <ActivityIndicator color="white" style={{ paddingVertical: 8 }} />
                                        :
                                        <Text
                                            style={{
                                                fontSize: 15, color: 'white', fontWeight: 'bold',
                                                paddingVertical: 8, textAlign: 'center',
                                            }}>
                                            Request OTP
                            </Text>
                                }
                            </TouchableRipple>
                }
                <Modal transparent={true} animationType={"slide"}
                    visible={this.state.Sending}>
                    <ActivityIndicator color="red" size="large"
                        style={{ flex: 1, justifyContent: 'center' }} />
                </Modal>
            </View>
        );
    }
}

export default PasswordReset;

const windowHeight = Dimensions.get('window').height;
const margin = StatusBar.currentHeight;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7'
    },
    bar: {
        marginTop: margin + 15,
        flexDirection: 'row',
        marginLeft: 15,
        alignContent: 'center',
        alignItems: 'center'
    },
    title: {
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: 17,
        flex:0.6,
        textAlign: 'center'
    },
})