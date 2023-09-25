import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { deleteItem, editCartItem, getCartItem } from '../../redux/Slice/cartSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../Constants/colors';
import font from '../../Constants/fonts';
import CustomHeader from '../../components/CustomHeader';
import { CartNavigatonProp } from '../../navigation/type';

interface productProps extends itemProps {
  cost: number;
  id: number;
  name: string;
  product_category: string;
  product_images: string;
  sub_total: number;
}

type itemProps = {
  id: number;
  product: productProps;
};

const Cart = ({ navigation }: CartNavigatonProp) => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.Auth.AuthData);
  const cartItems = useAppSelector((state) => state.Cart.CartItem.data);
  const cartItemsTotal = useAppSelector((state) => state.Cart.CartItem.total);
  const editStatus = useAppSelector(state => state.Cart.EditStatus)
  const deletedItem = useAppSelector(state => state.Cart.DeleteItem)
  console.log('☄️☄️☄️☄️☄️☄️☄️☄️☄️',editStatus)
  console.log('☄️☄️☄️☄️☄️☄️☄️☄️☄️',cartItems,'☄️☄️☄️☄️☄️☄️☄️☄️☄️')
  console.log(cartItems)
  useEffect(() => {
    getCartData();
  }, [cartItems,editStatus,deletedItem]);

  async function getCartData() {
    try {
      await dispatch(getCartItem(accessToken));
    } catch (error) {
      console.log(error);
    }
  }

  const incrementQuantity = async (itemId: number,itemQuantity:number,accessToken:string) => {
      try{
        console.log('error')
        const IncrementedItem = await dispatch(editCartItem({
          product_id: itemId,
          quantity: ++itemQuantity,
          accessToken: accessToken,
          ToastMessage: itemQuantity > 8 ? 'Max Quantity can only be 8': `Woohoo! You've added one more to your cart!`
        })).unwrap();
        
      }
      catch(error){
        console.log(error)
      }
  };

  const decrementQuantity = async (itemId: number,itemQuantity:number,accessToken:string) => {
    console.log(' product with item id: ',itemId,' has ',itemQuantity,' quantity in cart')
    try{
      const decrementItem = await dispatch(editCartItem({
        product_id: itemId,
        quantity: --itemQuantity,
        accessToken: accessToken,
        ToastMessage: itemQuantity < 1 ? 'To remove Item from cart swipe left': 'Oops! One item less in your cart.'
      })).unwrap()
      console.log(decrementItem)
    }
    catch(error){
      console.log(error)
    }
  };


  const deleteCartItem = async(itemId:number, accessToken:string)=>{
    try{
      const deleted = await dispatch(deleteItem({
        product_id:itemId,
        accessToken: accessToken
      })).unwrap();
    }
    catch(error){
      console.log(error)
    }
  }


  const CartFooter = ()=>{
    return (
      <View style={{width:'100%',height:60,backgroundColor:'lightblue',flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{width:'70%'}}>
          <Text>{cartItemsTotal}</Text>
        </View>
        <TouchableOpacity
        style={{width:'25%',backgroundColor:'#000',justifyContent:'center',alignItems:'center'}}
        onPress={()=> navigation.navigate('AddressList')}
        >
          <Text style={{color:'#fff',fontSize:20}}>Place Order</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerConatiner}>
        <TouchableOpacity
          style={styles.IconContainer}
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
          headerTitle="Cart"
        />
        <Ionicons name="search-outline" size={30} />
      </View>
      {cartItems === null ? (
        <View style={{backgroundColor:'#fff',height:'100%',width:'100%',alignItems:'center',justifyContent:'center'}}>
          <Image source={require('../../assets/images/emptyCart.jpg')} style={{height:300,width:300}} />
        </View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={CartFooter}
          renderItem={({ item }) => (
            <View style={styles.cartItemContainer}>
              
              <View style={styles.cartItem}>
                <Image source={{ uri: item.product.product_images }} style={styles.productImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.productName}>{item.product.name}</Text>
                  <Text style={styles.productPrice}>Price: ${item.product.cost}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => decrementQuantity(item.product.id,item.quantity,accessToken)}>
                      <Ionicons name="remove-circle-outline" size={30} color={color.primary} />
                    </TouchableOpacity>
                    <Text style={styles.productQuantity}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => incrementQuantity(item.product.id,item.quantity,accessToken)}>
                      <Ionicons name="add-circle-outline" size={30} color={color.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={() => deleteCartItem(item.product.id, accessToken)} style={styles.deleteButton}>
                <Ionicons name="trash-bin" size={30} color="black" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerConatiner: {
    flexDirection: 'row',
    backgroundColor: color.offWhite,
    height: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    // marginBottom: 20,
  },

  IconContainer: {
    padding: 10,
  },
  cartItemContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 2,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  deleteButton: {
    position: 'absolute',
    bottom: 10,
    right: 10, // Adjusted to position it in the bottom right corner
    zIndex: 1,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: 'gray',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  productQuantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default Cart;
