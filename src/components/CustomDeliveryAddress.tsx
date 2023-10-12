import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppDispatch, useAppSelector} from '../redux/store';
import CustomAddressCard from './CustomAddressCard';
import {useNavigation} from '@react-navigation/native';
import {DeliveryAddress} from '../redux/Slice/addressSlice';

type CustomDeliveryAddressProps = {
  stage: (index: number) => void;
};
const CustomDeliveryAddress = ({stage}: CustomDeliveryAddressProps) => {
  const AddressArray = useAppSelector(state => state.Address.address);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [isSelected, setIsSelected] = useState<number>();
  function handleSelect(index: number) {
    setIsSelected(index);
  }

  function getAddressIndex(index: number) {
    stage(2);
    dispatch(DeliveryAddress(index));
  }
  return (
    <View style={{flex: 1}}>
      <View style={styles.firstContainer}>
        <Text style={styles.headerText}>Select Delivery Address</Text>
        <TouchableOpacity
          style={styles.TOPContainer}
          onPress={() => {
            navigation.navigate('NewAddress', {
              place: 'home',
              streetAddress: '',
              city: '',
              postalCode: '',
              state: '',
              country: '',
              btnName: 'Add Address',
              index: 0,
            });
          }}>
          <Ionicons
            name="add-circle-outline"
            size={30}
            style={{color: '#fff'}}
          />
          <Text style={{fontSize: 20, color: '#ffffff'}}> Add New Address</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.secondContainer}>
        <ScrollView
          style={{height: 350}}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          {AddressArray.map((element, index) => {
            return (
              <CustomAddressCard
                key={index}
                index={index}
                stateFunc={() => handleSelect(index)}
                SelectedState={isSelected}
                address={element}
                order={1}
              />
            );
          })}
        </ScrollView>
        {/* <View></View> */}
      </View>
      {/* <View style={styles.NextBtnContainer}> */}
      <TouchableOpacity
        style={styles.NextBtn}
        disabled={isSelected === undefined}
        onPress={() => getAddressIndex(isSelected)}>
        <Text style={{fontSize: 25, color: '#fff'}}>Proceed to Payment</Text>
      </TouchableOpacity>
      {/* </View> */}
    </View>
  );
};

export default CustomDeliveryAddress;

const styles = StyleSheet.create({
  firstContainer: {
    padding: 10,
  },
  headerText: {
    fontSize: 23,
    fontWeight: '700',
    color: '#325f88',
  },
  TOPContainer: {
    marginTop: 20,
    // borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 30,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A3851',
    //2b2a2a
  },
  secondContainer: {
    // flex: 1,
    // paddingBottom:10
  },
  NextBtnContainer: {
    // paddingTop:10,
  },
  NextBtn: {
    position: 'absolute',
    bottom: 10,
    // shadowColor:'#000',
    // backgroundColor: '#8B4513',
    backgroundColor: '#1A3851',
    width: '95%',
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
});
