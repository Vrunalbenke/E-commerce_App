import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { logout } from '../../redux/Slice/registerSlice'
import { HomeNavigatonProp } from '../../navigation/type'
import CustomButton from '../../components/CustomButton'

const Home = ({navigation}:HomeNavigatonProp) => {
  const data = useAppSelector(state => (state.Auth.AuthData))
    console.log('Home data:--😋😋😋',data)
  const dispatch = useAppDispatch()

  function LogoutUser(){
    console.log('Logged')
    // dispatch(logout(AuthData.length))
    dispatch(logout(undefined))
    console.log('Home data,AuthData is Popped:--😋#😋',data)
    navigation.navigate('Login')
  }
  return (
    <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <CustomButton
      onPress={LogoutUser}
      BtnName="logout"
      />
      {/* <TouchableOpacity onPress={LogoutUser} style = {styles.Logout}>
        <Text>Logout</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  
})