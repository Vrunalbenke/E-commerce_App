import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {DeleteAddress} from '../redux/Slice/addressSlice';



type AddressProps = {
  place: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country:string;
}
type CustomAddressCardProps = {
  address:AddressProps;
  order: number;
  index?:number;
  SelectedState?:number;
  stateFunc:(index:number)=>void;
};

const CustomAddressCard = ({address,order,index,SelectedState,stateFunc}:CustomAddressCardProps) => {
  const dispatch = useAppDispatch();
  const UserData = useAppSelector(state => state.User.user.data.user_data);
  console.log(UserData,'&&&&&&')
  let place = address.place === 'home' ? 'Home' : 'Work';
  const icon =
    address.place === 'home' ? 'home-outline' : 'briefcase-outline';
  
  console.log(address, '^^^^^^^^^');

  function handleDelete(streetAddress:string) {
    dispatch(DeleteAddress(streetAddress));
  }

  return (
    <View style={styles.root}>
      {order === 0 ? (
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
                  {UserData.first_name}{' '}
                  {UserData.last_name}
                </Text>
                <Text>+91-{UserData.phone_no}</Text>
              </View>
            </View>
            <View style={{marginTop: 5, borderTopWidth: 1}}>
              <Text style={{padding: 10}}>
                {address.streetAddress},{address.city}-
                {address.postalCode},{address.state}-
                {address.country}
              </Text>
            </View>
          </View>
          <View style={{paddingHorizontal: 10, paddingBottom: 10}}>
            {order == 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'flex-end',
                }}>
                <TouchableOpacity>
                  <Ionicons name="create-outline" size={25} color={'#325f88'} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(address.address.streetAddress)}>
                  <Ionicons name="trash-outline" size={25} color={'#325f88'}/>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      ) : (
        <TouchableOpacity 
        style={{backgroundColor:SelectedState === index ? '#325f88':'#fff'}}
        onPress={()=>stateFunc(index)}>
          <View>
            <View style={{padding: 10, flexDirection:'row',justifyContent:'space-between'}}>
              <View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                {/* <MaterialIcons name='work' size={30}/> */}
                <Ionicons name={icon} size={30} style={{color:SelectedState === index?'#ffffff':'#000000'}}/>
                <Text style={{fontSize: 20, fontWeight: '700',color:SelectedState === index?'#ffffff':'#000000'}}>{place}</Text>
              </View>
              <View>
                <Text style={{fontSize: 18,color:SelectedState === index?'#ffffff':'#000000'}}>
                  {UserData.first_name}{' '}
                  {UserData.last_name}
                </Text>
                <Text style={{color:SelectedState === index?'#ffffff':'#000000'}}>+91-{UserData.phone_no}</Text>
              </View>
              </View>
              <View>
                {SelectedState === index && <Ionicons name='checkbox' size={30} style={{color:'#ffffff'}} />}
              </View>
            </View>
            <View style={{marginTop: 5, borderTopWidth: 1, borderTopColor:SelectedState === index?'#ffffff':'#000000'}}>
              <Text style={{padding: 10,fontSize:16,color:SelectedState === index?'#ffffff':'#000000'}}>
                {address.streetAddress},{address.city}-
                {address.postalCode},{address.state}-
                {address.country}
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
    // borderColor:'#325f88',
    margin: 10,
  },
});

export default CustomAddressCard;
