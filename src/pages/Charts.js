import { View, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { height, width } from '../Consts';



export default function Charts() {

    const fetchData = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "csrftoken=XrZ21zawQLTzsfHhgMRb0aSPUt27OtRf; sessionid=tpxs6ge4xtu4f4shfqsqgnxc4niny1tz");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/news/Top25Fundedcompanybargraphapi/", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    const fetchGraphs = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "csrftoken=XrZ21zawQLTzsfHhgMRb0aSPUt27OtRf; sessionid=tpxs6ge4xtu4f4shfqsqgnxc4niny1tz");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/news/Fundingperregionbargraphapi/", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        fetchData();
        fetchGraphs();
    }, []);


    const config1 = {
        startAtZero: false,
        hasXAxisBackgroundLines: false,
        xAxisLabelStyle: {
            prefix: '$',
            offset: 0
        }
    };

    const progressdata = {
        labels: ["Bhilwara", "Kochi", "Orissia", "Powai ", "Nagpur"], // optional
        data: [8000000, 800000, 5000000, 400000, 350000]
    };

    const linedata = {
        labels: ["Bangalore",
            "Mumbai",
            "Gurugram",
            "New Delhi",
            "Pune",
            "Chennai",
            "Noida",
            "Hyderabad",
            "Gurgaon",
            "Jaipur"],
        datasets: [
            {
                data: [438,
                    213,
                    155,
                    144,
                    51,
                    41,
                    37,
                    35,
                    15,
                    12],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Rainy Days"] // optional
    };

    const bardata = {
        labels: ["January",
            "February",
            "March",
            "April",
            "May",
            "June",],
        datasets: [
            {
                data: [82,
                    62,
                    92,
                    87,
                    62,
                    122,]
            }
        ]
    };

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.7,
        useShadowColorFromDataset: false // optional
    };

    return (
        <ScrollView>
            <View style={{ flex: 1, margin: 10, alignSelf: "center", alignContent: "center", justifyContent: "center", alignItems: "center" }}>

                <BarChart
                    // style={graphStyle}
                    data={bardata}
                    width={width * 0.8}
                    height={height * 0.3}
                    yAxisLabel="$"
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                />
                <Text style={{ fontSize: 20, textAlign: 'center' ,margin:10}}>Voting Trends</Text>
                <LineChart
                    data={linedata}
                    width={width * 0.8}
                    height={height * 0.3}
                    chartConfig={chartConfig}
                />
                <Text style={{ fontSize: 20, textAlign: 'center', margin: 10 }}>Most Sensitive Content</Text>
                <ProgressChart
                    data={progressdata}
                    width={width * 0.8}
                    height={height * 0.3}
                    strokeWidth={16}
                    radius={32}
                    chartConfig={chartConfig}
                    hideLegend={false}
                />
                <Text style={{ fontSize: 20, textAlign: 'center', margin: 10 }}>Consequences</Text>
            </View>
        </ScrollView>
    );
}



const styles = StyleSheet.create({
    chart: {
        margin: 20,
        padding: 10,

        borderRadius: 20,
        backgroundColor: 'green',
        width: 350, alignSelf: "center", alignContent: "center", justifyContent: "center"
    },
    chart1: {
        margin: 20,
        padding: 10,

        borderRadius: 20,
        width: 350,
        backgroundColor: 'lightblue', alignSelf: "center", alignContent: "center", justifyContent: "center"
    },
    chart2:
    {
        margin: 20,
        padding: 10,
        paddingTop: 20,
        borderRadius: 20,
        width: 350,
        backgroundColor: 'green', alignSelf: "center", alignContent: "center", justifyContent: "center"
    }
});