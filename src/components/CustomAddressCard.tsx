import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {DeleteAddress} from '../redux/Slice/addressSlice';
import { useNavigation } from '@react-navigation/native';



type AddressProps = {
  place: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country:string;
  index:number;
}
type CustomAddressCardProps = {
  key:number,
  address:AddressProps;
  order: number;
  index?:number;
  SelectedState?:number;
  stateFunc?:(index:number)=>void;
  editAddress?:((place:string,streetAddress:string,city:string,postalCode:string,state:string,country:string)=> void) | undefined;
};

const CustomAddressCard = ({address,order,index,SelectedState,stateFunc,editAddress}:CustomAddressCardProps) => {
  const dispatch = useAppDispatch();
  const UserData = useAppSelector(state => state.User.user.data.user_data);
  let place = address.place === 'home' ? 'Home' : 'Work';
  const icon =
    address.place === 'home' ? 'home-outline' : 'briefcase-outline';
  
  // useEffect(()=>{

  // },[editAddress])

  function handleDelete(index:number) {
    dispatch(DeleteAddress(index));
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
                <Ionicons name={icon} size={30} color={'#000'}/>
                <Text style={{fontSize: 20, fontWeight: '700',color:'#000'}}>{place}</Text>
              </View>
              <View>
                <Text style={{fontSize: 18,color:'#000'}}>
                  {UserData.first_name}{' '}
                  {UserData.last_name}
                </Text>
                <Text style={{color:'#000'}}>+91-{UserData.phone_no}</Text>
              </View>
            </View>
            <View style={{marginTop: 5, borderTopWidth: 1}}>
              <Text style={{padding: 10,fontSize:18,color:'#000'}}>
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
                <TouchableOpacity
                onPress={() => {
                  if(editAddress){
                    editAddress(address.place,address.streetAddress,address.city,address.postalCode,address.state,address.country,address.index)
                  }
                  }}
                >
                  <Ionicons name="create-outline" size={25} color={'#325f88'} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(address.index)}>
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
