import React, {useEffect, useState} from 'react';
import {SafeAreaView,TouchableOpacity,StyleSheet,Text,View,TextInput} from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../components/CustomHeader';
import font from '../../Constants/fonts';
import {NewAddressNavigationProp} from '../../navigation/type';
import {useAppDispatch} from '../../redux/store';
import {AddAddress} from '../../redux/Slice/addressSlice';
import {Dropdown} from 'react-native-element-dropdown';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import CustomButton from '../../components/CustomButton';

const NewAddress = ({navigation}: NewAddressNavigationProp) => {
  const dispatch = useAppDispatch();
  const [countryData,setCountryData] = useState([]);
  const [stateData,setStateData] = useState([]);
  const [cityData,setCityData] = useState([]);


  const [countryForState,setCountryForState] = useState('');

  const radioData = [
    {label: 'Home', value: 'home', index: 0},
    {label: 'Work', value: 'work', index: 1},
  ];

  const [input, setInput] = useState({
    streetAddress: '',
    city: '',
    state: '',
    place: 'home',
    country:'',
    postalCode:'',
  });
  const [error, setError] = useState({
    streetAddress: '',
    city: '',
    state: '',
    country:'',
    postalCode: '',
  });

  useEffect(()=>{
    var config = {
      method: 'get',
      url: 'https://api.countrystatecity.in/v1/countries',
      headers: {
        'X-CSCAPI-KEY': 'T2JsODlsdzFZd2FXZE1Fd3l0c2dWZVFURUFHRFpIbnU5N0ZyaWpyNw=='
      }
    };
    
    axios(config)
    .then(function (response) {
      var count = (response.data).length
      let countryArrayData = []
      for(var i = 0; i < count;i++){
        countryArrayData.push({
          name:response.data[i].iso2,
          label:response.data[i].name
        })
      }
      setCountryData(countryArrayData);
    })
    .catch(function (error) {
      console.log(error);
    });
  },[])

  function handleState(countryLabel:string){
    setCountryForState(countryLabel)
    var config = {
      method: 'get',
      url: `https://api.countrystatecity.in/v1/countries/${countryLabel}/states`,
      headers: {
        'X-CSCAPI-KEY': 'T2JsODlsdzFZd2FXZE1Fd3l0c2dWZVFURUFHRFpIbnU5N0ZyaWpyNw=='
      }
    };
  
    axios(config)
    .then(function (response) {
      var count = (response.data).length
      let stateArrayData = []
      for(var i = 0; i < count;i++){
        stateArrayData.push({
          name:response.data[i].iso2,
          label:response.data[i].name
        })
      }
      setStateData(stateArrayData);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function handleCity(countryLabel:string,stateLabel:string){
    var config = {
      method: 'get',
      url: `https://api.countrystatecity.in/v1/countries/${countryLabel}/states/${stateLabel}/cities`,
      headers: {
        'X-CSCAPI-KEY': 'T2JsODlsdzFZd2FXZE1Fd3l0c2dWZVFURUFHRFpIbnU5N0ZyaWpyNw=='
      }
    };
    
    axios(config)
    .then(function (response) {
      var count = (response.data).length
      let cityArrayData = []
      for(var i = 0; i < count;i++){
        cityArrayData.push({
          name:response.data[i].iso2,
          label:response.data[i].name
        })
      }
      setCityData(cityArrayData);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  function handleOnChange(input: string, text: string | null) {
    console.log(text);
    setInput(prevState => ({...prevState, [input]: text}));
  }

  function handleError(input: string, errorMessage: string) {
    setError(prevState => ({...prevState, [input]: errorMessage}));
  }

  function validate() {
    let valid = true;

    if (!input.streetAddress) {
      handleError('streetAddress', 'Please input street address');
      valid = false;
    } else if (!input.streetAddress.match(/^[A-Za-z0-9\s\.,#'-/]+$/)) {
      handleError('streetAddress', 'Please input valid street address');
      valid = false;
    }
    if (!input.city) {
      handleError('city', 'Please select a city');
      valid = false;
    }

    if (!input.state) {
      handleError('state', 'Please select a state');
      valid = false;
    }

    if (!input.postalCode) {
      handleError('postalCode', 'Please select a state');
      valid = false;
    }
    else if(!input.postalCode.match(/^.{6}$/)){
      handleError('postalCode', 'Please input valid postal code');
      valid = false;
    }

    if (!input.country) {
      handleError('country', 'Please select a state');
      valid = false;
    }

    if (valid) {
      loggedIN();
    }
  }

   function loggedIN() {
    const address = {
      place:input.place,
      streetAddress: input.streetAddress,
      city: input.city,
      postalCode: input.postalCode,
      state: input.state,
      country: input.country,
    };

    
    console.log('Saved address:', address);
    dispatch(AddAddress(address));
    navigation.navigate('AddressList');
    setInput({
      streetAddress: '',
      city: '',
      state: '',
      place: '',
      country:'',
      postalCode: '',
    });
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#325f88'}}>
      <View style={styles.headerContianer}>
        <TouchableOpacity onPress={() => navigation.navigate('AddressList')}>
          <Ionicons name="arrow-back-outline" size={29} color={'#fff'} />
        </TouchableOpacity>
        <CustomHeader
          style={{
            paddingTop: 6,
            fontSize: 30,
            fontFamily: font.BebasNB,
            color:'#fff'
          }}
          headerContainerStyle={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 10,
          }}
          headerTitle="Add Address"
        />
        <View></View>
      </View>
      <View style={styles.mainContainer}>
        <View>
          <RadioForm formHorizontal={true} animation={true}>
            {/* To create radio buttons, loop through your array of options */}
            {radioData.map((obj, i) => (
              <RadioButton labelHorizontal={true} key={i}>
                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={obj.value === input.place}
                  onPress={value => handleOnChange('place', value)}
                  borderWidth={2}
                  buttonInnerColor={'#325f88'}
                  buttonOuterColor={
                    obj.value === input.place ? '#000000' : '#000'
                  }
                  buttonSize={20}
                  buttonOuterSize={30}
                  buttonStyle={{}}
                  buttonWrapStyle={{marginLeft: 10}}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  labelHorizontal={true}
                  onPress={value => console.log(value)}
                  // onPress={value => handleOnChange('place', value)}
                  labelStyle={{fontSize: 20, color: '#000000'}}
                  labelWrapStyle={{}}
                />
              </RadioButton>
            ))}
          </RadioForm>
        </View>
        <View style={styles.LabelInputContainer}>
          <Text style={styles.Label}>Street Address</Text>
          {error.streetAddress && (
            <Text style={styles.error}>{error.streetAddress}</Text>
          )}
          <TextInput
            style={styles.InputFeild}
            placeholder="Altamount Road"
            autoCorrect={false}
            value={input.streetAddress}
            maxLength={50}
            onChangeText={(text: string) =>
              handleOnChange('streetAddress', text)
            }
            onFocus={() => handleError('streetAddress', '')}
          />
        </View>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <View style={styles.LabelInputContainer}>
            <Text style={styles.Label}>Country</Text>
            {error.country && <Text style={styles.error}>{error.country}</Text>}

            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={countryData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              // placeholder={!isFocus ? 'Select item' : '...'}
              placeholder= 'Select item'
              searchPlaceholder="Search..."
              value={input.country}
              // onFocus={() => setIsFocus(true)}
              // onBlur={() => setIsFocus(false)}
              onChange={item => {
                
                handleOnChange('country',item.label)
                handleState(item.name)
                // setIsFocus(false);
              }}
            />
          </View>

          <View style={styles.LabelInputContainer}>
            <Text style={styles.Label}>State</Text>
            {error.state && <Text style={styles.error}>{error.state}</Text>}

            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={stateData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              // placeholder={!isFocus ? 'Select item' : '...'}
              placeholder= 'Select item'
              searchPlaceholder="Search..."
              value={input.state}
              // onFocus={() => setIsFocus(true)}
              // onBlur={() => setIsFocus(false)}
              onChange={item => {
                handleOnChange('state',item.label)
                handleCity(countryForState,item.name)
                // setIsFocus(false);
              }}
            />
          </View>
        </View>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <View style={styles.LabelInputContainer}>
            <Text style={styles.Label}>City</Text>
            {error.city && <Text style={styles.error}>{error.city}</Text>}

            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={cityData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              // placeholder={!isFocus ? 'Select item' : '...'}
              placeholder= 'Select item'
              searchPlaceholder="Search..."
              value={input.city}
              // onFocus={() => setIsFocus(true)}
              // onBlur={() => setIsFocus(false)}
              onChange={item => {
                handleOnChange('city',item.label)
                // setIsFocus(false);
              }}
            />
          </View>
          <View style={styles.LabelInputContainer}>
              <Text style={styles.Label}>Postal code</Text>
              {error.postalCode && (
                <Text style={styles.error}>{error.postalCode}</Text>
              )}
              <TextInput
                style={styles.InputFeild}
                placeholder="400004"
                autoCorrect={false}
                keyboardType='numeric'
                maxLength={6}
                value={input.postalCode}
                onChangeText={(text: string) =>
                  handleOnChange('postalCode', text.toString())
                }
                onFocus={() => handleError('postalCode', '')}
              />
            </View>
        </View>

        <View style={{marginTop:20}}>
        <CustomButton onPress={validate} BtnName="Add address" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  LabelInputContainer: {
    margin: 10,
    gap: 10,
  },
  Label: {
    fontSize: 20,
  },
  InputFeild: {
    backgroundColor: '#f4f3f3',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  error: {
    color: 'red',
  },
  dropdown: {
    width: 150,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 10,
//     backgroundColor: 'white', // Change the background color as needed
//   },
//   iconContainer: {
//     padding: 5,
//   },
//   inputContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width:'80%',
//     padding: 16,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   input: {
//     width:'100%',
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     marginBottom: 16,
//   },
// });

export default NewAddress;
