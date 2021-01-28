import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight, TouchableOpacity,Modal,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

class LiveHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Loading: true,
        }
    }

    componentDidMount() {
        this.webCall();
    }

    webCall=()=>{
        this.setState({
            Loading:false
        })
    }

    render() {
        const data = Array.from({ length: 30 });
        return (
            <View>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity
                        key={index} style={styles.row}
                           
                        >
                                <View style={{ flex: 0.2 }}>
                                    <View style={{
                                        backgroundColor: 'red', marginHorizontal: 20, marginTop: 10,
                                        elevation: 2, borderTopRightRadius: 10, borderTopLeftRadius: 10, paddingVertical: 1
                                    }}>
                                        <Text style={{ color: 'white', textAlign: 'center', fontSize:10,fontWeight: 'bold' }}>MON</Text>
                                    </View>
                                    <View style={{
                                        backgroundColor: 'white', marginHorizontal: 20, marginBottom: 10,
                                        elevation: 2, borderBottomRightRadius: 10, borderBottomLeftRadius: 10
                                    }}>
                                        <Text style={{ color: 'black', textAlign: 'center', fontSize:15,fontWeight: 'bold', 
                                         paddingVertical: 4 }}>
                                            {index}</Text>
                                    </View>
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
                        </TouchableOpacity>
                    }


                />
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

export default LiveHome;

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10
    },
})