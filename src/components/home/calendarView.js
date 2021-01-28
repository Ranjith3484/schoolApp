import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, StatusBar, Picker, Dimensions, Alert, ScrollView, ActivityIndicator, ToastAndroid }
    from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/FontAwesome';

class CalendarView extends Component {
    constructor(props) {
        super(props);
        var d = new Date();

        var first = d.getDate() - d.getDay(); // First day is the day of the month - the day of the week
        // var last = first + 6; // last day is the first day + 6

        var firstday = new Date(d.setDate(first)).toUTCString();
        // var lastday = new Date(d.setDate(last)).toUTCString();
        var lastday = (new Date(d.getTime(first) + 6 * 24 * 60 * 60 * 1000)).toUTCString();
        var Week = firstday.slice(5, 11) + "-" + lastday.slice(5, 11);
        this.state = {
            Loading: true,
            expanded: 0,
            Type: "Days",
            TotalStep: "",
            TotalDistance: "",
            TodayDate: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0, 10),
            GetDate: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0, 10),
            GetWeek: Week,
            GetMonth: new Date().toUTCString().slice(8, 11),
            DayIndex: "",
            WeekIndex: "",
            MonthIndex: new Date().toUTCString().slice(8, 11),
        }
    }

    componentDidMount() {
        this.webCall();
        this.webCall1();
        this.webCall2(this.state.GetDate);
    }

    //getting days till now
    webCall = async () => {
        fetch("https://zakpro-api.pinesphere.com/get/user/stepper/days", {
            method: "GET",
            headers: {
                "id": "ranjith@pine.com"
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    datas: responseJson,
                    // setting itemindex for highlighting the last date, like today was the last date
                    DayIndex: responseJson.length - 1,
                    Loading: false
                })
            })
            .catch((error) => {
                Alert.alert("No internet / Server may be down");
                this.setState({
                    Loading: false
                })
            });
    }

    //getting weeks till now
    webCall1 = async () => {
        fetch("https://zakpro-api.pinesphere.com/get/user/stepper/weeks", {
            method: "GET",
            headers: {
                "id": "ranjith@pine.com"
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    datas1: responseJson,
                    WeekIndex: responseJson.length - 1,
                    Loading: false
                })
            })
            .catch((error) => {
                Alert.alert("No internet / Server may be down");
                this.setState({
                    Loading: false
                })
            });
    }

    //getting details for days
    webCall2 = async (item) => {
        fetch("https://zakpro-api.pinesphere.com/get/user/stepper/details/today", {
            method: "GET",
            headers: {
                "id": "ranjith@pine.com",
                "date": item
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    TotalStep: parseInt(responseJson[0].Step12am) + parseInt(responseJson[0].Step06am)
                        + parseInt(responseJson[0].Step12pm) + parseInt(responseJson[0].Step06pm),
                    TotalDistance: parseInt(responseJson[0].Distance12am) + parseInt(responseJson[0].Distance06am)
                        + parseInt(responseJson[0].Distance12pm) + parseInt(responseJson[0].Distance06pm),
                    Loading: false
                })
            })
            .catch((error) => {
                Alert.alert("No internet / Server may be down");
                this.setState({
                    Loading: false
                })
            });
    }

    //getting details for weeks
    webCall3 = async (item) => {
        fetch("https://zakpro-api.pinesphere.com/get/user/stepper/details/weeks", {
            method: "GET",
            headers: {
                "id": "ranjith@pine.com",
                "week": item
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    TotalStep: parseInt(responseJson[0].Step12am) + parseInt(responseJson[0].Step06am)
                        + parseInt(responseJson[0].Step12pm) + parseInt(responseJson[0].Step06pm),
                    TotalDistance: parseInt(responseJson[0].Distance12am) + parseInt(responseJson[0].Distance06am)
                        + parseInt(responseJson[0].Distance12pm) + parseInt(responseJson[0].Distance06pm),
                    Loading: false
                })
            })
            .catch((error) => {
                Alert.alert("No internet / Server may be down");
                this.setState({
                    Loading: false
                })
            });
    }

    //getting details for month
    webCall4 = async (item) => {
        fetch("https://zakpro-api.pinesphere.com/get/user/stepper/details/month", {
            method: "GET",
            headers: {
                "id": "ranjith@pine.com",
                "month": item + "-" + new Date().toUTCString().slice(12, 16)
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    TotalStep: parseInt(responseJson[0].Step12am) + parseInt(responseJson[0].Step06am)
                        + parseInt(responseJson[0].Step12pm) + parseInt(responseJson[0].Step06pm),
                    TotalDistance: parseInt(responseJson[0].Distance12am) + parseInt(responseJson[0].Distance06am)
                        + parseInt(responseJson[0].Distance12pm) + parseInt(responseJson[0].Distance06pm),
                    Loading: false
                })
            })
            .catch((error) => {
                Alert.alert("No internet / Server may be down");
                this.setState({
                    Loading: false
                })
            });
    }
    render() {
        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;
        const month = [{ name: "Jan" }, { name: "Feb" }, { name: "Mar" }, { name: "Apr" }, { name: "May" }, { name: "Jun" },
        { name: "Jul" }, { name: "Aug" }, { name: "Sep" }, { name: "Oct" }, { name: "Nov" }, { name: "Dec" }
        ];
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
                    <Text style={styles.title}>Calendar</Text>
                    <View style={{ flex: 0.1 }}></View>
                </View>
                {/* header ends */}
                <View style={{ flex: 1, marginTop: 5 }}>
                    {/* picker for selection days,week,month start */}
                    <Picker
                        selectedValue={this.state.Type}
                        // style={{ height: 50, width: 80 }}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({
                                Type: itemValue
                            })
                            if (itemValue === "Week") {
                                this.webCall3(this.state.GetWeek);
                            } else if (itemValue === "Month") {
                                this.webCall4(this.state.GetMonth);
                            } else {
                                this.webCall2(this.state.GetDate);
                            }
                        }}
                    >
                        <Picker.Item label="Days" value="Days" key={0} />
                        <Picker.Item label="Week" value="Week" key={1} />
                        <Picker.Item label="Month" value="Month" key={2} />
                    </Picker>
                    {/* picker for selection days,week,month ends */}


                    {/* rendering scroll sontent for selction day,week,month starts */}
                    {
                        this.state.Loading ?
                            <ActivityIndicator color="rgba(255,0,0,0.5)" size="large" style={{ flex: 1, alignContent: 'center' }} />

                            :
                            <ScrollView
                                horizontal={true}
                                style={{ backgroundColor: "white" }}
                                contentContainerStyle={{ width: null }}
                                showsHorizontalScrollIndicator={false}
                                scrollEventThrottle={200}
                                decelerationRate="fast"
                                ref={ref => this.scrollView = ref}
                                onContentSizeChange={(contentWidth, contentHeight) => {
                                    this.scrollView.scrollToEnd({ animated: true });
                                }}
                            >
                                {
                                    this.state.datas ?
                                        this.state.Type === "Days" ?
                                            //   render day content
                                            this.state.datas.map((item, i) =>
                                                <View key={i}>
                                                    <TouchableOpacity
                                                        style={{
                                                            height: 40, width: 40, justifyContent: 'center',
                                                            borderRadius: 50, marginHorizontal: 10, marginTop: 10,
                                                            backgroundColor: this.state.DayIndex === i ? "rgba(255,0,0,0.5)" : null
                                                        }}

                                                        onPress={() => {
                                                            this.setState({ DayIndex: i, GetDate: item.date });
                                                            this.webCall2(item.date);
                                                        }}
                                                    >
                                                        <Text style={{
                                                            textAlign: 'center',
                                                            color: this.state.DayIndex === i ? "white" : "black"
                                                        }}>{item.date.slice(8, 11)}</Text>

                                                    </TouchableOpacity>
                                                    {
                                                        this.state.DayIndex === i ?
                                                            <Icon1 name="caret-up" size={40} color="#f7f7f7"
                                                                style={{ textAlign: 'center', marginTop: -15 }}
                                                            />
                                                            :
                                                            null
                                                    }
                                                </View>
                                            )
                                            :
                                            this.state.Type === "Week" ?
                                                //render week content
                                                this.state.datas1.map((item, i) =>
                                                    <View key={i}>
                                                        <TouchableOpacity
                                                            style={{
                                                                height: 40, width: 40, justifyContent: 'center',
                                                                borderRadius: 50, marginHorizontal: 10, marginTop: 10,
                                                                backgroundColor: this.state.WeekIndex === i ? "rgba(255,0,0,0.5)" : null
                                                            }}
                                                            onPress={() => {
                                                                this.setState({ WeekIndex: i, GetWeek: item.week });
                                                                this.webCall3(item.week);
                                                            }}
                                                        >
                                                            <Text style={{
                                                                textAlign: 'center',
                                                                color: this.state.WeekIndex === i ? "white" : "black"
                                                            }}>{item.week.slice(0, 3)}</Text>

                                                        </TouchableOpacity>
                                                        {
                                                            this.state.WeekIndex === i ?
                                                                <Icon1 name="caret-up" size={30} color="#f7f7f7"
                                                                    style={{ textAlign: 'center', marginTop: -12 }}
                                                                />
                                                                :
                                                                null
                                                        }
                                                    </View>
                                                )
                                                :
                                                //render month content
                                                month.map((item, i) =>
                                                    <View key={i}>
                                                        <TouchableOpacity
                                                            style={{
                                                                height: 40, width: 40, justifyContent: 'center',
                                                                borderRadius: 50, marginHorizontal: 10, marginTop: 10,
                                                                backgroundColor: this.state.MonthIndex === item.name ? "rgba(255,0,0,0.5)" : null
                                                            }}
                                                            onPress={() => {
                                                                this.setState({
                                                                    MonthIndex: item.name,
                                                                    GetMonth: item.name
                                                                });
                                                                this.webCall4(item.name);
                                                            }}
                                                        >
                                                            <Text style={{
                                                                textAlign: 'center',
                                                                color: this.state.MonthIndex === item.name ? "white" : "black"
                                                            }}>{item.name}</Text>
                                                        </TouchableOpacity>
                                                        {
                                                            this.state.MonthIndex === item.name ?
                                                                <Icon1 name="caret-up" size={30} color="#f7f7f7"
                                                                    style={{ textAlign: 'center', marginTop: -12 }}
                                                                />
                                                                :
                                                                null
                                                        }
                                                    </View>
                                                )
                                        :
                                        null
                                }
                            </ScrollView>
                    }
                    {/* rendering scroll sontent for selction day,week,month ends */}
                    <View style={{ height: 15 }}></View>
                    {/* renders list of exam dates,api containing all exam dates */}

                    {
                        this.state.Loading ?
                            <ActivityIndicator color="rgba(255,0,0,0.5)" size="large" style={{ flex: 1, alignContent: 'center' }} />

                            :
                            <FlatList
                                data={data}
                                keyExtractor={(item, index) => index}
                                renderItem={({ item, index }) =>
                                    <View style={{ marginTop: 10, }}>
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
                    }
                    <View style={{ height: 10 }}></View>
                </View>
            </View>
        );
    }
}

export default CalendarView;

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