import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../../navigation/routes';
import {colors} from '../../themes/Colors';
import StatusIndicator from './StatusIndicator';
import {CustomCard} from './CustomCard';
import {Rating} from 'react-native-ratings';

import Fontisto from 'react-native-vector-icons/Fontisto';

const {width} = Dimensions.get('screen');

export default PickUpCard = memo(
  ({data}) => {
    const navigation = useNavigation();

    const handleOnPress = () => {
      navigation.navigate(routes.DETAIL, {data});
    };

    return (
      <TouchableOpacity style={{marginBottom: 12}} onPress={handleOnPress}>
        <View
          style={{
            height: 180,
            width: 120,
            marginBottom: -140,
            borderRadius: 24,
            zIndex: 10,
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 9,
            },
            shadowOpacity: 0.22,
            shadowRadius: 9.22,
            elevation: 12,
          }}>
          <Image source={{uri: data.image}} style={styles.icon} />
        </View>
        <CustomCard elevated={true} style={styles.card}>
          <View style={styles.infoContainer}>
            <View style={styles.info}>
              <Text numberOfLines={1} style={styles.mainText}>
                {data.companyName}
              </Text>
              <View style={styles.infoRow}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 24,
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 16,
                      color: colors.BLACK,
                      marginHorizontal: 10,
                    }}>
                    {data.collection.toLocaleUpperCase()}
                  </Text>
                  <StatusIndicator status={data.status.toLocaleUpperCase()} />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                  }}>
                  <Rating
                    ratingCount={5}
                    type="custom"
                    readonly={true}
                    startingValue={data?.star || 0}
                    imageSize={16}
                    ratingColor={colors.BLACK}
                    tintColor={colors.WHITE}
                    ratingBackgroundColor="transparent"
                    style={{backgroundColor: 'transparent'}}
                  />
                  <Text style={styles.ratingTxt}>{data?.star || 0}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    marginTop: 12,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      borderRightWidth: 1,
                      borderColor: 'black',
                    }}>
                    <Text style={styles.text}>Amount</Text>
                    <Text
                      numberOfLines={1}
                      style={[styles.text, {fontWeight: 'bold'}]}>
                      {data.amount}
                    </Text>
                  </View>
                  <View style={{flex: 1, paddingHorizontal: 12}}>
                    <Text style={styles.text}>Price</Text>
                    <Text
                      numberOfLines={1}
                      style={[styles.text, {fontWeight: 'bold'}]}>
                      {data.price}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.infoRow}></View>
            </View>
          </View>
        </CustomCard>
      </TouchableOpacity>
    );
  },
  (prev, next) => prev.data.id === next.data.id,
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    marginLeft: 24,
    padding: 12,
    paddingLeft: 100,
    borderRadius: 24,
  },
  icon: {
    height: 180,
    width: 120,
    borderRadius: 24,
    zIndex: 10,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  text: {
    color: colors.BLACK,
    fontSize: 16,
    marginVertical: 5,
  },
  infoRow: {
    overflow: 'hidden',
  },
  mainText: {
    color: colors.BLACK,
    fontSize: 20,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  subText: {
    color: 'black',
    fontWeight: '800',
    fontSize: 16,
    marginHorizontal: 10,
  },
  ratingTxt: {
    fontSize: 15,
    marginLeft: 5,
    color: 'black',
    fontWeight: 'bold',
  },
  viewContainer: {justifyContent: 'center', marginHorizontal: 5},
  viewText: {color: colors.BLACK, fontSize: 22, fontWeight: 'bold'},
});
