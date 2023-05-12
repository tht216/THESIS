import {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import MapView, {Marker} from 'react-native-maps';
import tw from 'twrnc';
import markerCircleImage from '../../assets/images/markercircle.png';

export const Map = style => {
  const mapRef = useRef();
  const location = useSelector(selector => selector.userReduce.location);
  const address = useSelector(selector => selector.userReduce.address);
  const origin = location.split(', ');
  useEffect(() => {}, [origin]);
  return (
    <MapView
      key={`${origin[0]},${origin[1]}`}
      ref={mapRef}
      style={[tw`flex-1 relative`, {...style}]}
      //   showsUserLocation={true}
      userInterfaceStyle={'dark'}
      initialRegion={{
        latitude: +origin[0] || 10.4181252, //+origin[0] || 0,
        longitude: +origin[1] || 107.2817437, //+origin[1] || 0,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}>
      {/* {!origin.length && ( */}
      <Marker
        title="Origin"
        description={'Trần Phú, Phước Hải, Đất Đỏ, Bà Rịa-Vũng Tàu'}
        coordinate={{
          latitude: +origin[0] || 10.4181252, //+origin[0] || 0,
          longitude: +origin[1] || 107.2817437, //+origin[1] || 0,
        }}></Marker>
      {/* )} */}
    </MapView>
  );
};
