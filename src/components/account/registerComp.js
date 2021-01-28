import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions ,TouchableOpacity, Alert} from 'react-native';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Feather';


class RegisterComp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Sending: false,
            Username:"",
            Email: "",
            Password: "",
            securePassword: true
        };
    }
    render() {
        const windowWidth = Dimensions.get('window').width;
        return (
            <View style={{alignItems:'center'}}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center", marginHorizontal: 10,
                        marginTop: 20, borderColor: 'red', borderWidth: 1, borderRadius: 100
                    }}
                >
                    <View style={{ flex: 0.02 }}></View>
                    <View style={{ flex: 0.08 }}>
                        <Icon
                            name='user'
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
                            placeholder='Username'
                            ref={component => this._textInput1 = component}
                            onChangeText={(Username) => this.setState({ Username })}
                        />
                    </View>
                    <View style={{ flex: 0.06 }}></View>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center", marginHorizontal: 10,
                        marginTop: 20, borderColor: 'red', borderWidth: 1, borderRadius: 100
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
                            ref={component => this._textInput2 = component}
                            onChangeText={(Email) => this.setState({ Email })}
                        />
                    </View>
                    <View style={{ flex: 0.06 }}></View>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center", marginHorizontal: 10,
                        marginTop: 20, borderColor: 'red', borderWidth: 1, borderRadius: 100
                    }}
                >
                    <View style={{ flex: 0.02 }}></View>
                    <View style={{ flex: 0.08 }}>
                        <Icon
                            name='unlock'
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
                            <Icon
                                name='eye-off'
                                size={20}
                                onPress={() => this.setState({ securePassword: false })}
                                color='red'
                            />
                            :
                            <Icon
                                name='eye'
                                size={20}
                                onPress={() => this.setState({ securePassword: true })}
                                color='red'
                            />
                        }
                    </View>
                    <View style={{ flex: 0.02 }}></View>
                </View>

                <TouchableOpacity 
                  style={{marginTop:2,marginBottom:-40,
                    backgroundColor:'white',justifyContent:'center',
                    height:80,width:80,
                    borderRadius:100}}
                    
                    onPress={() => {
                        Alert.alert("hi");
                    }}
                 >
                             <Icon1
                                name="long-arrow-right"
                                onPress={() => {
                                    Alert.alert("hi");
                                }}
                                size={20}
                                style={{textAlign:'center',textAlignVertical:'center',backgroundColor:'red',
                                height:70,width:70, borderRadius:100,marginLeft:5}}
                                color='white'
                            />
                        </TouchableOpacity>

            </View>
        );
    }
}

export default RegisterComp;