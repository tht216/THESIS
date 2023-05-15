import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SvgQRCode from 'react-native-qrcode-svg';
import {FromTo} from '../../components/FromTo';
import {CustomCard} from '../../components/CustomCard';
import {colors} from '../../../themes/Colors';
import {units} from '../../../themes/Units';
import CustomButton from '../../components/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PaymentCard from '../../components/PaymentCard';
import BackButton from '../../components/BackButton';
import {useSelector} from 'react-redux';

export default Checkout = ({navigation, route}) => {
  const params = route.params;
  const serviceType = useSelector(selector => selector.pickupSlice.serviceType);
  const amount = useSelector(selector => selector.pickupSlice.amount);
  const long = useSelector(selector => selector.pickupSlice.long);
  const lat = useSelector(selector => selector.pickupSlice.lat);
  const address = useSelector(selector => selector.pickupSlice.address);
  const companyId = useSelector(selector => selector.pickupSlice.companyId);
  const payments = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'ZaloPay',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'COD',
    },
  ];
  const [value, setValue] = React.useState('');
  const [selectedPayment, setSelectedPayment] = React.useState(payments[0].id);
  console.log({
    address,
    amount,
    lat,
    long,
    address,
    companyId,
    params,
    serviceType,
  });

  const handleChange = text => {
    setValue(text);
  };
  const onClickBack = () => {
    navigation.goBack();
  };
  const renderPayemtCard = ({item}) => (
    <PaymentCard
      item={item}
      selectedItem={selectedPayment}
      onPress={() => setSelectedPayment(item.id)}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.topBar}>
          <BackButton onPress={onClickBack} />
        </View>
        <View style={styles.topview}>
          <Text
            style={{
              top: 20,
              textAlign: 'center',
              position: 'absolute',
              fontSize: 30,
              color: '#fff',
              fontWeight: 'bold',
            }}>
            Checkout
          </Text>
        </View>

        <View style={styles.bottomview}>
          <CustomCard
            elevated={true}
            style={{
              backgroundColor: '#fff',
              marginHorizontal: 24,
              marginTop: -100,
              padding: 30,
              borderRadius: 10,
            }}>
            <FromTo from={address} to={params.title} />
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                  <Fontisto name="recycle" size={15} color="#000" />
                  <Text style={{marginLeft: 10, fontWeight: 'bold'}}>
                    Collection Type
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                  <Text style={{marginLeft: 25}}>{serviceType} ({amount} bags)</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                  <Icon
                    name="chatbox-ellipses-outline"
                    size={15}
                    color="#000"
                  />
                  <Text style={{marginLeft: 10, fontWeight: 'bold'}}>
                    Note for collector (Optional)
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                  <TextInput
                    value={value}
                    onChangeText={handleChange}
                    placeholder="Eg. Please make it before 1pm, I will leaveing home beyond that"
                    multiline={true}
                    numberOfLines={4}
                    style={{
                      borderWidth: 1,
                      borderColor: '#ccc',
                      padding: 10,
                      width: '100%',
                      borderRadius: 24,
                    }}
                  />
                </View>
              </View>
            </View>
          </CustomCard>
          <View style={styles.paymentContainer}>
            <Text style={styles.paymentText}>Payment</Text>
            <FlatList
              data={payments}
              renderItem={renderPayemtCard}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              style={{
                marginTop: units.height / 50,
              }}
            />
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceTitle}>SubTotal:</Text>
              <Text style={styles.priceText}>120 $</Text>
            </View>
            <View
              style={[styles.priceContainer, {marginTop: units.height / 81}]}>
              <Text style={styles.priceTitle}>Delivery:</Text>
              <Text style={styles.priceText}>120 $</Text>
            </View>
            <View
              style={[styles.priceContainer, {marginTop: units.height / 81}]}>
              <Text style={styles.priceTitle}>Total:</Text>
              <Text style={styles.priceText}>240 $</Text>
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton title="Pay" onPress={() => {}} />
            </View>
            <View style={styles.lineContainer}>
              <View style={styles.progressLine} />
              <View style={[styles.progressLine]} />
              <View style={[styles.progressLine]} />
              <View style={[styles.progressLine]} />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topview: {
    marginTop: 20,
    backgroundColor: colors.ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
    height: units.height / 4,
  },
  topBar: {
    position: 'absolute',
    flexDirection: 'row',
    left: units.width / 28,
    right: units.width / 28,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: units.height / 30,
    zIndex: 10,
  },
  welcomemessage: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  paymentText: {
    color: colors.DARK,
    fontSize: 20,
    fontWeight: '600',
  },
  paymentContainer: {
    marginVertical: units.height / 28,
    marginHorizontal: units.width / 15,
  },
  searchbar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderRadius: 10,
    marginBottom: 65,
  },
  circle: {
    borderRadius: 25,
    height: 50,
    width: 50,
    backgroundColor: '#fff',
  },
  welcomecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomview: {
    flex: 4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  container: {
    flex: 1,
    backgroundColor: colors.ORANGE,
  },
  bottomContainer: {
    marginHorizontal: units.width / 17,
    marginVertical: units.height / 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.LIGHTGREY,
    paddingBottom: units.height / 81,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: units.height / 25,
  },
  progressLine: {
    height: 4,
    width: units.width / 5.3,
    backgroundColor: colors.GREEN,
    borderRadius: 20,
  },
  priceTitle: {
    fontSize: 16,
    color: colors.DARK,
  },
  priceText: {
    fontSize: 19,
    color: colors.DARK,
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: units.height / 50,
    marginHorizontal: units.width / 7,
    marginBottom: units.height / 81,
  },
});
