import React, {Component} from 'react'
import {Button, View, Text} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import JoinRoom from './JoinRoom'
import CreateRoom from './CreateRoom'

export default class Lobby extends Component {


  render(){
        return (
          <View>
          < CreateRoom />
          <Text>create room or join room here</Text>
              <Button onPress={()=>this.props.navigation.navigate('Room')} title={'Go to da room'}/>
          < JoinRoom />
          </View>
         )

  }
}
