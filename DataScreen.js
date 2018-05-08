import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';


import HomeScreen from "./HomeScreen";




export default class DataScreen extends React.Component {
    static navigationOptions = {
        title: 'Treniruoklis'
    };

    constructor(props){
        super(props);
    }

  render() {
      const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
            <Image style={{width: 160, height: 160, marginHorizontal: 100, marginBottom: 20}}
            source={{uri: 'https://i.pinimg.com/originals/9d/83/a2/9d83a2dea8d8d0316163df70c6a247ef.jpg'}}/>
            <Text style={{ marginHorizontal: 100, fontFamily: 'Avenir', fontSize: 30}}>
            HitCounter</Text>
            <Text style={{marginBottom: 60, marginHorizontal: 50, paddingTop: 5, fontFamily: 'Avenir', color: '#f4ca41'}}>
            Suderink treniruotes su zaidimais, isbandyk!</Text>
            <TouchableOpacity style={styles.button}
            onPress={() => navigate('Data')}>
            <Text style={{fontWeight: 'bold', letterSpacing: 2}}>PRADETI</Text>
            </TouchableOpacity>
            
          
      </View>
    );
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8341f4',
        justifyContent: 'center',
             },
        button: {
            borderRadius: 10,
            alignItems: 'center',
            borderWidth: 2,
            padding: 10,
            marginBottom: 120,
            backgroundColor: '#f4b841'


        }
})
