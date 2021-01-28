import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, StatusBar, TextInput, Dimensions, Alert, Modal, ActivityIndicator, ToastAndroid, FlatList }
    from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { RadioButton, TouchableRipple } from 'react-native-paper';

class TestDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Loading: true,
            QuestionLength: "",
            exitAlert: "",
            Category:"",
            answers: []
        }
    }

    componentDidMount() {
        this.webCall();
    }

    webCall = () => {
        fetch("https://opentdb.com/api.php?amount=40&category=21&type=multiple", {
            method: "GET",
            headers: {
                "createdBy": "hi"
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    Loading: false,
                    QuestionLength: responseJson.results.length,
                    Category:responseJson.results[0].category,
                    datas: responseJson.results
                })
            })
            .catch((error) => {
                Alert.alert('No Internet Connection');
                this.setState({
                    Loading: false,
                    serverDown: true
                });
            });
    }



    exitTest = () => {
        Alert.alert(
            "Exit Test",
            "Are you sure want to exit from the test?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Yes", onPress: () => {this.props.navigation.goBack(null);} },
            ],
            { cancelable: false }
          );
    }

    render() {
        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;
        // console.log(this.props.navigation.state.params.Item)
        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                {/* header starts */}
                <View style={styles.bar}>
                    <TouchableOpacity
                        onPress={() => {
                            this.exitTest();
                        }}
                        style={{ flex: 0.2 }}
                    >
                        <Icon name="chevron-left" size={25} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Test Name</Text>
                    <View style={{ flex: 0.2 }}></View>
                </View>
                {/* header ends */}
                <View style={{ flex: 1, margin: 15 }}>
                    {
                        this.state.Loading ?
                            null :
                           <View>
                               <Text style={{ fontSize: 15, fontStyle: "italic", 
                               textAlign: 'center', fontWeight: "bold", marginBottom: 10 }}>
                                 {this.state.Category}</Text>
                                <Text style={{ fontSize: 15, fontStyle: "italic", textAlign: 'center', fontWeight: "bold", marginBottom: 10 }}>
                                Q. No. 1 - {this.state.QuestionLength}</Text>
                            </View>
                    }
                    <FlatList
                        data={this.state.datas}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) =>
                            <View
                                style={{ marginTop: 10, marginRight: 10 }}
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 15 }}>{index + 1}.</Text>
                                    <Text style={{ fontSize: 15, marginLeft: 15 }}>{item.question}</Text>
                                </View>

                                <View style={{ marginLeft: 20 }}>
                                    <RadioButton.Group
                                        onValueChange={value => {
                                            var ans = this.state.answers;
                                            ans[index] = value;
                                            this.setState({
                                                answers: ans,
                                            })
                                        }} value={this.state.answers[index]}
                                    >
                                        <RadioButton.Item color="#ff6666" label={item.correct_answer} value={item.correct_answer} />
                                        <RadioButton.Item color="#ff6666" label={item.incorrect_answers[0]} value={item.incorrect_answers[0]} />
                                        <RadioButton.Item color="#ff6666" label={item.incorrect_answers[1]} value={item.incorrect_answers[1]} />
                                        <RadioButton.Item color="#ff6666" label={item.incorrect_answers[2]} value={item.incorrect_answers[2]} />
                                    </RadioButton.Group>
                                </View>
                                {
                                    index + 1 === this.state.QuestionLength ?
                                        <TouchableRipple
                                            onPress={() => {
                                                Alert.alert("Test has been completed..!");
                                                this.setState({
                                                    answers: []
                                                })
                                            }}
                                            style={{
                                                backgroundColor: 'rgba(255,0,0,0.5)', marginLeft: 10,
                                                borderRadius: 10, marginVertical: 20
                                            }}
                                            rippleColor="rgba(0, 0, 0, .32)"
                                        >
                                            <Text style={{ fontSize: 18, paddingVertical: 10, color: 'white', textAlign: 'center' }}>Submit Test</Text>
                                        </TouchableRipple>
                                        :
                                        null
                                }
                            </View>
                        }
                    />
                </View>
                {/* modal for loading */}
                <Modal
                    visible={this.state.Loading} transparent={true}
                >
                    <ActivityIndicator color="rgba(255,0,0,0.5)" size="large" style={{ flex: 1, alignContent: 'center' }} />
                </Modal>
                {/* confirm alert for exiting this screen */}

            </View>
        );
    }
}

export default TestDetail;

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
        flex: 0.6,
        color: 'black',
        fontSize: 17,
        textAlign: 'center'
    },

})
