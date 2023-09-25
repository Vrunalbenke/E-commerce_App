import {StyleSheet, TouchableOpacity, Text, View, Image, SafeAreaView} from 'react-native';
import React, { useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../components/CustomHeader';
import font from '../../Constants/fonts';
import {AddressListNavigationProp} from '../../navigation/type';
import { useAppSelector } from '../../redux/store';
import CustomAddressCard from '../../components/CustomAddressCard';

const AddressList = ({route,navigation}: AddressListNavigationProp) => {


  const address = useAppSelector(state => state.Address.address)
  console.log(address)


    useEffect(() => {
      
    }, [address])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={30} />
        </TouchableOpacity>
        <CustomHeader
          style={{
            fontSize: 30,
            fontFamily: font.RobotoCLI,
          }}
          headerContainerStyle={{
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          headerTitle="Address List"
        />
        <Ionicons name="location-outline" size={30} />
      </View>
      <View>
      {address.length === 0 ? (<View style={{justifyContent:'center',alignItems:'center'}}>
        <Image source={require('../../assets/images/Address.png')} style={{height:300,width:300}}/>
      </View>) :
      ( address.map((element)=>{
        return (
          <CustomAddressCard address={element} />
        )
      }))
      }
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate('NewAddress')
        }}>
        <Ionicons name="add-circle-outline" size={60} color="black" />
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default AddressList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white', // Change the background color as needed
  },
  iconContainer: {
    padding: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'transparent', // You can customize the button's background color
  },
});
