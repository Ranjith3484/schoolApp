import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, StatusBar, TextInput, Dimensions, Alert, Modal, ActivityIndicator, ToastAndroid, FlatList }
    from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { RadioButton, TouchableRipple, List } from 'react-native-paper';

class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Loading: false,
            ExamLength: "",
            expanded: 0
        }
    }

    componentDidMount() {
        this.webCall();
    }

    webCall = () => {
        this.setState({
            Loading: false
        })
    }

    render() {
        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;
        const data = Array.from({ length: 30 });
        const data1 = Array.from({ length: 7 });
        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                {/* header starts */}
                <View style={styles.bar}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack(null);
                        }}
                        style={{ flex: 0.1 }}
                    >
                        <Icon name="chevron-left" size={25} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>List</Text>
                    <View style={{ flex: 0.1 }}></View>
                </View>
                {/* header ends */}

                <View style={{ flex: 1, marginTop: 5 }}>
                    {/* renders list of exam dates,api containing all exam dates */}
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) =>
                            <View>
                                <TouchableOpacity
                                    key={index} style={styles.row}
                                    onPress={() => {

                                    }}
                                >
                                    <View style={{ flex: 0.2 }}>
                                        <View style={{
                                            backgroundColor: 'red', marginHorizontal: 20,
                                            elevation: 2, borderTopRightRadius: 10, borderTopLeftRadius: 10, paddingVertical: 1
                                        }}>
                                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 10, fontWeight: 'bold' }}>JAN</Text>
                                        </View>
                                        <View style={{
                                            backgroundColor: 'white', marginHorizontal: 20,
                                            elevation: 2, borderBottomRightRadius: 10, borderBottomLeftRadius: 10
                                        }}>
                                            <Text style={{
                                                color: 'black', textAlign: 'center', fontSize: 15, fontWeight: 'bold',
                                                paddingVertical: 4
                                            }}>
                                                {index}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 0.6, flexDirection: 'column' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{
                                                color: 'black', textAlign: 'center', fontSize: 15,
                                                paddingVertical: 3
                                            }}>Total Exams are {index}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 0.2 }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (this.state.expanded === index) {
                                                    // this is called to close the expandee area,by setting a string or number that not present in this index
                                                    this.setState({
                                                        expanded: "r"
                                                    })
                                                } else {
                                                    this.setState({
                                                        expanded: index
                                                    })
                                                }
                                                //call the api like==> exams in that date
                                            }}
                                        >
                                            <Icon name={this.state.expanded === index ? "chevron-up" : "chevron-down"}
                                                size={25}
                                                style={{ textAlign: "center" }}
                                                color="rgba(255,0,0,0.5)" />
                                        </TouchableOpacity>
                                    </View>

                                </TouchableOpacity>
                                {/* here the expanded view of the exams on the particular date comes here */}
                                <View style={{ backgroundColor: 'white', paddingHorizontal: 10 }}>
                                    {
                                        this.state.expanded === index ?
                                            <FlatList
                                                data={data1}
                                                keyExtractor={(item, index) => index}
                                                renderItem={({ item, index }) =>
                                                    <View style={{
                                                        flexDirection: "row", paddingBottom: 10,
                                                        backgroundColor: 'white', marginVertical: 5,
                                                        borderBottomColor: 'rgba(255,0,0,0.5)', borderBottomWidth: 0.5
                                                    }}>
                                                        <View style={{ flex: 0.2 }}>
                                                            <Text style={{ color: 'black', textAlign: 'center', fontSize: 15, paddingVertical: 3 }}>Science</Text>
                                                        </View>
                                                        <View style={{ flex: 0.7, flexDirection: 'column' }}>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Text style={{ color: 'black', textAlign: 'center', fontSize: 15, paddingVertical: 3 }}>Part Test</Text>
                                                                <Text style={{ color: 'black', textAlign: 'center', fontSize: 15, paddingVertical: 3, marginLeft: 10 }}>{index}</Text>
                                                            </View>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Text style={{ color: 'grey', textAlign: 'center' }}>{index} hrs paper, {index} break</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ flex: 0.1 }}>
                                                            <Icon name="chevron-right"
                                                                onPress={() => {
                                                                    this.props.navigation.navigate('TestDetail', {
                                                                        Item: index,
                                                                    })
                                                                }}
                                                                size={25}
                                                                style={{ textAlign: "center" }}
                                                                color="rgba(255,0,0,0.5)" />
                                                        </View>
                                                    </View>
                                                }
                                            />
                                            :
                                            null
                                    }
                                </View>
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
            </View>
        );
    }
}

export default ListView;

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
    row: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10
    },

})