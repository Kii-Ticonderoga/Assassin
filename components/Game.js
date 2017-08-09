
import React, {Component} from 'react'
import {Button, View, Text, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import Compass from './CompassComponents/Compass'
console.log('Compass', Compass)
export default class Game extends Component {
  constructor(props){
    super(props)
    this.state = {
      latitude: ' ',
      longitude: ' ',
      roomCode: ' ',
      username: ' ',
      targets: ' ',
      compass: ' '

    }

  }

Alert = () => {
  const showAlert = () => {
      Alert.alert(
         'WARNING!',
         'AN ASSASSIN IS NEARBY!!!!!!!'
      )
   }

   return (
      <TouchableOpacity onPress = {showAlert} style = {styles.button}>
        <Text>RUN!!!</Text>
      </TouchableOpacity>
   )
}

kill(){
    fetch('/user/kill', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({latitude: this.latitude,
                           longitude: this.longitude})
    })
  }

  locationUpdate(){
    fetch('/user/location', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({latitude: this.latitude,
                           longitude: this.longitude})
    })
  }

  heartbeatMonitor(){
    fetch('/user/heartbeat', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({latitude: this.latitude,
                            longitude: this.longitude,
                            time: this.time,
                            target: this.target
                          })
    })
  }

 // compass(){
 //   //fetch()to be determined
 // }

 listOfTheLiving() {
   fetch('/user/list/:roomCode', {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({username: this.username})
   })
 }

//logout of game
  logout(){
    fetch('/logout', {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({username: this.username})
    })
  }
//do we want the ghost room to be an automatic redirect?
  render(){
    return (
      <View>
        <Text>DONT GET GOT, also look! a compass!</Text>
        <Button onPress={()=>this.props.navigation.navigate('GhostRoom')} title={'you got got'}/
        <Compass />
      </View>
     )
  }
}
