import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, StatusBar, TextInput, Dimensions, Alert, Modal, ActivityIndicator, ToastAndroid }
    from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableRipple } from 'react-native-paper';
import Icon1 from 'react-native-vector-icons/FontAwesome';
// import Api from '../api';

class Profile extends Component {

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
                            this.props.navigation.navigate("Home");
                        }}
                        style={{ flex: 0.1 }}
                    >
                        <Icon name="chevron-left" size={25} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Profile</Text>
                    <TouchableOpacity
                        onPress={() => {

                        }}
                        style={{ flex: 0.1 }}
                    >
                        <Icon name="edit-3" size={23} color="black" />
                    </TouchableOpacity>
                </View>
                {/* header ends */}

                {/* content starts */}
                <View style={{ flex: 1, margin: 15 }}>
                    <View style={{flex:1,flexDirection:'row'}}>
                         <View style={{flex:0.4}}>

                         </View>
                         <View style={{flex:0.6}}>
                              <Text>hi</Text>
                         </View>
                    </View>
                </View>
                {/* content starts */}
                <Modal transparent={true} animationType={"slide"}
                    visible={this.state.Sending}>
                    <ActivityIndicator color="red" size="large"
                        style={{ flex: 1, justifyContent: 'center' }} />
                </Modal>
            </View>
        );
    }
}

export default Profile;

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
        flex: 0.8,
        textAlign: 'center'
    },
})