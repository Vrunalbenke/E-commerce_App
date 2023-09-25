import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../components/CustomHeader';
import font from '../../Constants/fonts';
import { NewAddressNavigationProp } from '../../navigation/type';
import { useAppDispatch } from '../../redux/store';
import { AddAddress } from '../../redux/Slice/addressSlice';
const NewAddress = ({ navigation }: NewAddressNavigationProp) => {

    const dispatch = useAppDispatch();
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleSaveAddress = () => {
    // Create an address object with the collected data
    const address = {
        streetAddress:streetAddress,
        city:city,
        state:state,
        postalCode:postalCode,
      };
      
    // Handle saving the address data (e.g., send it to an API or store it in state)
    console.log('Saved address:', address);
    dispatch(AddAddress(address))
    navigation.navigate('AddressList')
    // Clear the input fields after saving
    setStreetAddress('');
    setCity('');
    setState('');
    setPostalCode('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate('AddressList')}>
          <Ionicons name="chevron-back-outline" size={30} />
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
          headerTitle="Add Address"
        />
        <Ionicons name="location-outline" size={30} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Street Address:</Text>
        <TextInput
          style={styles.input}
          value={streetAddress}
          onChangeText={(text) => setStreetAddress(text)}
        />

        <Text style={styles.label}>City:</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={(text) => setCity(text)}
        />

        <Text style={styles.label}>State:</Text>
        <TextInput
          style={styles.input}
          value={state}
          onChangeText={(text) => setState(text)}
        />

        <Text style={styles.label}>Postal Code:</Text>
        <TextInput
          style={styles.input}
          value={postalCode}
          onChangeText={(text) => setPostalCode(text)}
        />

        <Button title="Save Address" onPress={handleSaveAddress} />
      </View>
    </SafeAreaView>
  );
};

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
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:'80%',
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    width:'100%',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
});

export default NewAddress;
