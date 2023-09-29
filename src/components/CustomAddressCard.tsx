import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {DeleteAddress} from '../redux/Slice/addressSlice';

type CustomAddressCardProps = {
  place: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  order: number;
};

const CustomAddressCard = (address: CustomAddressCardProps) => {
  const dispatch = useAppDispatch();
  const UserData = useAppSelector(state => state.User.user);
  const [isSelected, setIsSelected] = useState(false);
  let place = address.address.place === 'home' ? 'Home' : 'Work';
  const icon =
    address.address.place === 'home' ? 'home-outline' : 'briefcase-outline';
  const toggleSelection = () => {
    setIsSelected(!isSelected); // Pass the selection status and address data to the parent component
  };
  console.log(address, '^^^^^^^^^');

  function handleDelete(streetAddress) {
    dispatch(DeleteAddress(streetAddress));
  }

  function SelectAddress(){
    setIsSelected(!isSelected)
  }
  return (
    <View style={styles.root}>
      {address.order === 0 ? (
        <View>
          <View>
            <View style={{padding: 10}}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                {/* <MaterialIcons name='work' size={30}/> */}
                <Ionicons name={icon} size={30} />
                <Text style={{fontSize: 20, fontWeight: '700'}}>{place}</Text>
              </View>
              <View>
                <Text style={{fontSize: 18}}>
                  {UserData.data.user_data.first_name}{' '}
                  {UserData.data.user_data.last_name}
                </Text>
                <Text>+91-{UserData.data.user_data.phone_no}</Text>
              </View>
            </View>
            <View style={{marginTop: 5, borderTopWidth: 1}}>
              <Text style={{padding: 10}}>
                {address.address.streetAddress},{address.address.city}-
                {address.address.postalCode},{address.address.state}-
                {address.address.country}
              </Text>
            </View>
          </View>
          <View style={{paddingHorizontal: 10, paddingBottom: 10}}>
            {address.order == 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'flex-end',
                }}>
                <TouchableOpacity>
                  <Ionicons name="create-outline" size={25} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(address.address.streetAddress)}>
                  <Ionicons name="trash-outline" size={25} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      ) : (
        <TouchableOpacity 
        style={{backgroundColor:isSelected ? '#666464':'#fff'}}
        onPress={()=>SelectAddress()}>
          <View>
            <View style={{padding: 10}}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                {/* <MaterialIcons name='work' size={30}/> */}
                <Ionicons name={icon} size={30} />
                <Text style={{fontSize: 20, fontWeight: '700',color:isSelected?'#343333':'#000000'}}>{place}</Text>
              </View>
              <View>
                <Text style={{fontSize: 18}}>
                  {UserData.data.user_data.first_name}{' '}
                  {UserData.data.user_data.last_name}
                </Text>
                <Text>+91-{UserData.data.user_data.phone_no}</Text>
              </View>
            </View>
            <View style={{marginTop: 5, borderTopWidth: 1}}>
              <Text style={{padding: 10}}>
                {address.address.streetAddress},{address.address.city}-
                {address.address.postalCode},{address.address.state}-
                {address.address.country}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    // padding: 10,
    margin: 10,
  },
});

export default CustomAddressCard;
