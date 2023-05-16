import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../../themes/Colors';
import {units} from '../../../themes/Units';
import {routes} from '../../../navigation/routes';
import {useDispatch, useSelector} from 'react-redux';
import {
  logOutAccount,
  setAddress,
  setLocation,
} from '../../../utils/userSlicer';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomCard} from '../../components/CustomCard';
import {categories} from '../../../utils/constant';
import WasteCard from '../../components/WasteCard';
import Carousel from 'react-native-snap-carousel';
import GetLocation from 'react-native-get-location';
import {
  useGeocodeLocationMutation,
  useSearchLocationMutation,
} from '../../../utils/goongapi';
import Loading from '../../components/Loading';
import {
  saveAddress,
  saveLat,
  saveLong,
  saveServiceType,
} from '../../../utils/pickupSlice';
import {getToken} from '../../../utils/localstorage';
import {useGetDetailQuery} from '../../../utils/api';
import {DrawerLayoutAndroid} from 'react-native';

const HomeCompany = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const address = useSelector(selector => selector.userReduce.address);
  const [geocodeLocation] = useGeocodeLocationMutation();
  const {isLoading, data, error} = useGetDetailQuery();
  useEffect(() => {
    // GetLocation.getCurrentPosition({
    //   enableHighAccuracy: true,
    //   timeout: 60000,
    // })
    //   .then(async locations => {
    //     dispatch(setLocation(`${locations.latitude}, ${locations.longitude}`));
    //     dispatch(saveLat(locations.latitude));
    //     dispatch(saveLong(locations.longitude));
    //     geocodeLocation(`${locations.latitude}, ${locations.longitude}`)
    //       .unwrap()
    //       .then(payload => {
    //         console.log(payload.results[0]);
    //         dispatch(setAddress(payload.results[0].formatted_address));
    //         dispatch(saveAddress(payload.results[0].formatted_address));
    //         setLoading(false);
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    //   })
    //   .catch(error => {
    //     const {code, message} = error;
    //     console.warn(code, message);
    //   });
  }, []);

  const onClickMenu = () => {
    dispatch(logOutAccount());
  };
  let _carousel = null;
  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Loading />}
      {/* background */}
      <Image
        source={require('../../../assets/images/background.png')}
        style={styles.background}
      />
      {/* user bar */}
      <View style={styles.topbar}>
        {/* user image */}
        <TouchableOpacity
          style={{
            padding: 5,
            borderRadius: 50,
            backgroundColor: colors.WHITE,
            elevation: 12,
            shadowColor: '#000',
          }}
          onPress={onClickMenu}>
          <Icon name="log-out-outline" size={27} color={colors.ORANGE} />
        </TouchableOpacity>
        {/* location */}
        <TouchableOpacity
          onPress={() => navigation.navigate(routes.CURRENTLOCATION)}
          style={styles.mapContainer}>
          <Icon name="ios-location" size={25} color={colors.WHITE} />
          <Text numberOfLines={1} style={styles.mapText}>
            {address}
          </Text>
        </TouchableOpacity>
        {/* notification */}
        <Icon name="notifications" size={27} color="white" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* top view */}
        <View style={styles.topview}>
          <View style={styles.welcomecontainer}>
            <Text style={styles.welcomemessage}>
              {`Hello,<br/>${data?.data?.data?.name || ''}`
                .split('<br/>')
                .join('\n')}
            </Text>
          </View>
        </View>

        {/* body view */}
        <View style={styles.bodyContainer}>
          {/* status bar */}
          <CustomCard
            elevated={true}
            style={{
              backgroundColor: '#fff',
              marginHorizontal: 24,
              marginTop: -40,
              padding: 30,
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>Points</Text>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
                {data?.data?.point}
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>
                Total Pickup
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>189</Text>
            </View>
          </CustomCard>
          {/* search bar */}
          {/* <Text style={{color: colors.BLACK, marginVertical: 24}}>
            Which collection type you want to make?
          </Text>
          <SearchInput placeholder={'Search...'} /> */}

          {/* categories */}

          {/* coffee cards */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeCompany;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ORANGE,
    position: 'relative',
  },
  topview: {
    marginVertical: 40,
    marginHorizontal: 24,
    flex: 1,
    justifyContent: 'space-between',
  },
  welcomecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomemessage: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
  },
  background: {
    height: 270,
    width: '100%',
    position: 'absolute',
    top: 0,
    opacity: 0.1,
  },
  mapContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    flex: 1,
  },
  mapText: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 8,
    color: colors.WHITE,
    fontWeight: 'bold',
  },
  image: {
    borderRadius: 50,
    shadowColor: 'yellow',
  },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: units.width / 14,
    marginVertical: units.height / 30,
  },
  bodyContainer: {
    paddingHorizontal: units.width / 14,
    marginTop: units.height / 30,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingBottom: 24,
  },
  title: {
    fontSize: 30,
    lineHeight: 30,
    fontWeight: '700',
    color: colors.DARK,
    marginTop: units.height / 30,
  },
  listCategories: {
    marginTop: 24,
  },
  textCategories: isActive => {
    const style = {
      fontWeight: '600',
      color: isActive ? colors.WHITE : colors.DARKGRAY,
    };
    return style;
  },
  categoriesContainer: isActive => {
    const style = {
      paddingVertical: 16,
      paddingHorizontal: 20,
      marginRight: 4,
      borderRadius: 50,
      boxShadow:
        '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      backgroundColor: isActive ? colors.LIGHTORANGE : 'rgba(0,0,0,0.07)',
    };
    return style;
  },
});
