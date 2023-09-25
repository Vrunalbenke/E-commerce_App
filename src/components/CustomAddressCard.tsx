import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type CustomAddressCardProps = {
    streetAddress:string,
      city:string,
      state:string,
      postalCode:string,
}


const CustomAddressCard = (address :CustomAddressCardProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelection = () => {
    setIsSelected(!isSelected);// Pass the selection status and address data to the parent component
  };
  console.log(address,'^^^^^^^^^')
  return (
    <TouchableOpacity onPress={toggleSelection} key={address.address.postalCode} style={styles.TOP}>
      <View style={styles.container}>
        <Text style={styles.addressText}>{address.address.streetAddress}</Text>
        <Text style={styles.addressText}>{address.address.city}, {address.address.state} {address.address.postalCode}</Text>
        <View style={styles.checkboxContainer}>
          {isSelected ? (
            <Ionicons name="checkbox" size={24} color="green" />
          ) : (
            <Ionicons name="square-outline" size={24} color="gray" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    TOP:{
        width:'80%',
        height:100
    },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width:'100%',
    height:'100%'
  },
  addressText: {
    fontSize: 16,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomAddressCard;
