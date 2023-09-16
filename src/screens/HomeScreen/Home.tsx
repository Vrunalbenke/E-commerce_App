import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppSelector } from '../../redux/store'

const Home = () => {
  const AuthData = useAppSelector(state => (state.Auth.AuthData))
  console.log(AuthData)
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})