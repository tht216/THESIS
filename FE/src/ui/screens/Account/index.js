import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../themes/Colors';
import {units} from '../../../themes/Units';
import ProfileCard from '../../components/ProfileCard';
import CustomButton from '../../components/CustomButton';
import {useGetDetailQuery} from '../../../utils/api';
import Loading from '../../components/Loading';

const Account = ({navigation}) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const {isLoading, data, error} = useGetDetailQuery();

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Loading />}
      <ScrollView>
        <View>
          <Image
            source={require('../../../assets/images/profileBg.png')}
            style={styles.image}
          />
          <View style={styles.profie}>
            <ProfileCard />
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.userName}>{data?.data?.data?.name}</Text>
          <TouchableOpacity onPress={() => setIsUpdate(true)}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bodyContainer}>
          <View>
            <Text style={styles.fieldTitle}>Full Name</Text>
            <View style={styles.fieldContainer}>
              <TextInput
                editable={isUpdate}
                style={styles.userName}
                value={data?.data?.data?.name}
              />
            </View>
          </View>
          <View style={{marginTop: units.height / 50}}>
            <Text style={styles.fieldTitle}>E-mail</Text>
            <View style={styles.fieldContainer}>
              <TextInput
                editable={false}
                style={styles.userName}
                value={data?.data?.data?.email}
              />
            </View>
          </View>
          <View style={{marginTop: units.height / 50}}>
            <Text style={styles.fieldTitle}>Phone Number</Text>
            <View style={styles.fieldContainer}>
              <TextInput
                editable={isUpdate}
                style={styles.userName}
                value={data?.data?.data?.phone}
              />
            </View>
          </View>
          {isUpdate && (
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Update Information"
                onPress={() => {
                  setIsUpdate(false);
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  image: {
    alignSelf: 'center',
  },
  profie: {
    position: 'absolute',
    bottom: units.height / 41,
    left: 0,
    right: 0,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.DARK,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: units.height / -41,
  },
  editText: {
    color: colors.GRAY,
    marginTop: units.height / 81,
  },
  fieldContainer: {
    borderWidth: 1,
    borderColor: colors.ORANGE,
    borderRadius: 10,
    paddingVertical: units.height / 48,
    paddingLeft: units.width / 23,
    marginTop: units.height / 67,
  },
  bodyContainer: {
    marginHorizontal: units.width / 21,
    marginTop: units.height / 25,
    marginBottom: 24,
  },
  fieldTitle: {
    fontSize: 16,
    color: colors.GRAY,
  },
  buttonContainer: {
    marginHorizontal: units.width / 12,
    marginTop: units.height / 38,
  },
});
