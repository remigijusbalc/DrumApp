import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ListView,TextInput } from 'react-native';
import { Accelerometer, Gyroscope } from 'expo';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';


import DataScreen from "./DataScreen";


  // Initialize Firebase
  var configFirebase = {
    apiKey: "AIzaSyB2czHQ5W3BJcCk6wZy7dnucQ8IeDxbBX0",
    authDomain: "projektinis-ca402.firebaseapp.com",
    databaseURL: "https://projektinis-ca402.firebaseio.com",
    projectId: "projektinis-ca402",
    storageBucket: "",
    messagingSenderId: "466966477277"
  };
  firebase.initializeApp(configFirebase);

  var data = []

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Treniruoklis'
  };

  constructor(props) {
  super(props);

  this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

  this.state = {
    count: 0,
    accelerometerData: {},
    gyroscopeData: {},
    ListViewData: data,
    newContent: ""
   }
  }


  componentDidMount() {
    this._toggle();
    this._toggle2();

    var that = this
     firebase.database().ref('/taskai').on('child_added', function(data){
      var newData = [...that.state.ListViewData]
      newData.push(data)
      that.setState({ListViewData: newData })
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
    this._unsubscribe2();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
  } else {
      this._subscribe();
    }
  }

  _toggle2 = () => {
    if (this._subscription2) {
      this._unsubscribe2();
  } else {
      this._subscribe2();
    }
  }

  _subscribe2 = () => {
    this._subscription2 = Gyroscope.addListener((result) => {
      this.setState({ gyroscopeData: result });
    });
  }

  _unsubscribe2 = () => {
    this._subscription2 && this._subscription2.remove();
    this._subscription2 = null;
  }





  _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      this.setState({ accelerometerData })
    
      let zAcceloOperation = this.state.accelerometerData.z < -1.03;
      let zAcceloOperation2 = this.state.accelerometerData.z > -0.97 ;
      let yGyroOperation = this.state.gyroscopeData.y < -0.16;
      let yGyroOperation2 = this.state.gyroscopeData.y > -0.14;

      if(zAcceloOperation && yGyroOperation2 || yGyroOperation) 
    this.setState({count: this.state.count +1});
    
    // zAcceloOperation && yGyroOperation2 || yGyroOperation
    // yGyroOperation && zAcceloOperation || zAcceloOperation2
    // yGyroOperation2 && zAcceloOperation || zAcceloOperation2

    // zAcceloOperation2 && yGyroOperation || yGyroOperation2
    });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

    pradeti(){
      this._toggle();
      this._toggle2();
    }

    addRow(data) {
        var key = firebase.database().ref('/taskai').push().key
        firebase.database().ref('/taskai').child(key).set({name: data, taskai: this.state.count})
        }

      async deleteRow(secId,rowId,rowMap,data)
        {
          await firebase.database().ref('taskai/' + data.key).set(null)
          rowMap[`${secId}${rowId}`].props.closeRow();
          var removeData = [...this.state.ListViewData];
          removeData.slice(rowId,1)
          this.setState({ListViewData: removeData});
        }

        againRemove(data,secId,rowId,rowMap) {
          this.deleteRow(secId,rowId,rowMap,data)
        }

        
      


  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.mainContainer}>
                <TextInput style={{fontSize: 20, marginTop: 10, marginBottom: 10}}
          onChangeText={(newContent) => this.setState({newContent})}
          placeholder="Jusu vardas"
          />

        <Text style={{fontFamily: "Avenir", fontSize: 25}}>{this.state.count}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.middleButton]}
          onPress={() => navigate('Home')}>
            <Text>Pagrindinis</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.middleButton]}
          onPress={() => this.pradeti()}>
            <Text>Start/Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.middleButton]}
          onPress={() =>this.addRow(this.state.newContent, this.state.count)}>
            <Text>Issaugoti</Text>
          </TouchableOpacity>
        </View>

      <ListView style={{marginTop: 20}}
        enableEmptySections
        dataSource={this.ds.cloneWithRows(this.state.ListViewData)}
        renderRow={data => 
            <View>
            <Text>{data.val().name} {data.val().taskai}</Text>
          </View>}/>

      </View>
    );
  } 
}




const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    backgroundColor: '#f4b841',
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f4b841'

  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#8341f4',
  }
  
});