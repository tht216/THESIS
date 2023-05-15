import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  SafeAreaView,
  Text,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import PickUpCard from '../../components/PickUpCard';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors} from '../../../themes/Colors';
import {units} from '../../../themes/Units';
import {useHistoryPickupQuery} from '../../../utils/api';
import Loading from '../../components/Loading';
const {height} = Dimensions.get('screen');

const CardsTray = ({characters}) => {
  const {isLoading, data, error} = useHistoryPickupQuery();
  //   {
  //     id: '1',
  //     image:
  //       'https://vcdn1-vnexpress.vnecdn.net/2022/09/16/-9660-1663317578.jpg?w=900&h=540&q=100&dpr=1&fit=crop&s=ZZ14jxe3Whlcw7PASlpBRA',
  //     companyName: 'Company A',
  //     collection: 'Plastic',
  //     amount: '1',
  //     status: 'Pending',
  //     price: '$200',
  //     star: 4.5,
  //   },
  //   {
  //     id: '2',
  //     image:
  //       'https://vcdn1-vnexpress.vnecdn.net/2022/09/16/-9660-1663317578.jpg?w=900&h=540&q=100&dpr=1&fit=crop&s=ZZ14jxe3Whlcw7PASlpBRA',
  //     companyName: 'Company A',
  //     collection: 'Plastic',
  //     amount: '1',
  //     status: 'Pending',
  //     price: '$200',
  //     star: 4.5,
  //   },
  //   {
  //     id: '3',
  //     image:
  //       'https://vcdn1-vnexpress.vnecdn.net/2022/09/16/-9660-1663317578.jpg?w=900&h=540&q=100&dpr=1&fit=crop&s=ZZ14jxe3Whlcw7PASlpBRA',
  //     companyName: 'Company A',
  //     collection: 'Plastic',
  //     amount: '1',
  //     status: 'Done',
  //     price: '$200',
  //     star: 4.5,
  //   },
  //   {
  //     id: '4',
  //     image:
  //       'https://vcdn1-vnexpress.vnecdn.net/2022/09/16/-9660-1663317578.jpg?w=900&h=540&q=100&dpr=1&fit=crop&s=ZZ14jxe3Whlcw7PASlpBRA',
  //     companyName: 'Company A',
  //     collection: 'Plastic',
  //     amount: '1',
  //     status: 'Pending',
  //     price: '$200',
  //     star: 4.5,
  //   },
  // ]);

  const renderItem = ({item}) => <PickUpCard data={item} />;

  const keyExtractor = useCallback(item => `${item._id}`, []);
  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Loading />}
      <View style={styles.topview}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 30,
            color: '#fff',
            fontWeight: 'bold',
          }}>
          Your Pickup
        </Text>
      </View>
      <View style={styles.bottomview}>
        {data && (
          <FlatList
            showsVerticalScrollIndicator={false}
            // stickyHeaderIndices={[0]} // Note: Avoiding sticky headers, not performant for 60fps
            data={data?.pickup}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            windowSize={height}
            initialNumToRender={10}
            removeClippedSubviews={true}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CardsTray;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ORANGE,
  },
  topview: {
    marginTop: 20,
    backgroundColor: colors.ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  bottomview: {
    flex: 4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 24,
    paddingBottom: 12,
    paddingTop: 24,
  },
});
