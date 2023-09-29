import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../components/CustomHeader';
import font from '../../Constants/fonts';
import {AddressListNavigationProp} from '../../navigation/type';
import {useAppSelector} from '../../redux/store';
import CustomAddressCard from '../../components/CustomAddressCard';

const AddressList = ({route, navigation}: AddressListNavigationProp) => {
  const address = useAppSelector(state => state.Address.address);
  console.log(address);

  useEffect(() => {}, [address]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#d4d1d1'}}>
      <View style={styles.headerContianer}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="arrow-back-outline" size={29} />
        </TouchableOpacity>
        <CustomHeader
          style={{
            // paddingTop: 6,
            fontSize: 30,
            fontFamily: font.BebasNB,
          }}
          headerContainerStyle={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 10,
          }}
          headerTitle="Add Address"
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate('NewAddress');
          }}>
          <Ionicons name="add-circle-outline" size={45} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.mainContainer}>
        {address.length === 0 ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/Address.png')}
              style={{height: 300, width: 300}}
            />
          </View>
        ) : (
          <ScrollView bounces={false}>
            {address.map((element, index) => {
              return (
                <CustomAddressCard key={index} address={element} order={0} />
              );
            })}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AddressList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContianer: {
    // backgroundColor:'#d4d1d1',
    padding: 5,
    margin: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 10,
  },
  iconContainer: {
    padding: 5,
  },
  addButton: {
    paddingTop: 5,
    paddingRight: 5,
  },
});
