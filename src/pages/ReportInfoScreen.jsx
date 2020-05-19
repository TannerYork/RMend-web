import React from 'react';
import mapStyle from '../../constants/MapStyle';
import Colors from '../../constants/Colors';

export default class ReportInfoPage extends React.Component {
  render() {
    const { images, location, details, senderInfo } = this.props.report;
    return (
      <div style={styles.container}>
        <div style={styles.titleWrapper}>
          <p style={styles.titleText}>{details.type}</p>
          <p style={styles.titleSubText}>{details.authority}</p>
        </div>
        <div>
          <div style={styles.info}>
            <p style={styles.header}>Images</p>
            <p style={styles.subHeader}>Images of the incident and the surouding area</p>
            <div
              contentContainerStyle={styles.images}
              horizontal={true}
              directionalLockEnabled={false}
              decelerationRate={0}
              snapToAlignment={'center'}
            >
              {images.map((image, index) => {
                return (
                  <View style={styles.imageWrapper} key={index}>
                    <Image source={{ uri: image.imageUrl }} style={styles.image} />
                  </View>
                );
              })}
            </div>
            <p style={styles.header}>Details</p>
            <p style={styles.subHeader}>Information about the incident</p>
            <div style={styles.details}>
              <p style={styles.detailsText}>{'This incident was reported by ' + senderInfo.name}</p>
              <p style={styles.detailsText}>{details.details ? '"' + details.details + '"' : ''}</p>
            </div>
            <p style={styles.header}>Location</p>
            <p style={styles.subHeader}>
              Location of the incident on google maps (click map to get directions)
            </p>
            {/* <MapView
              provider={PROVIDER_GOOGLE}
              customMapStyle={mapStyle}
              initialRegion={{ ...location, latitudeDelta: 0.001, longitudeDelta: 0.001 }}
              style={styles.map}
              onPress={() =>
                openMap({
                  ...location,
                  zoom: 20,
                  provider: 'google',
                })
              }
              pitchEnabled={false}
              rotateEnabled={false}
              scrollEnabled={false}
              zoomEnabled={false}
            >
              <Marker
                coordinate={location}
                image={require('../../assets/images/location_icon.jpg')}
              />
            </MapView> */}
            <button style={styles.button} onPress={() => navigate('Nearby')}>
              <p style={styles.buttonText}>Return</p>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  titleWrapper: {
    width: wp('100%'),
    minHeight: hp('14%'),
    justifyContent: 'flex-end',
    backgroundColor: 'black',
    padding: wp('1%'),
    zIndex: 100,
  },
  titleText: {
    color: 'white',
    fontSize: wp('9%'),
    fontWeight: 'bold',
  },
  titleSubText: {
    fontSize: wp('5%'),
    color: '#444',
    fontFamily: 'Arial',
  },
  info: {
    width: wp('100%'),
    alignItems: 'center',
  },
  header: {
    width: wp('80%'),
    fontSize: wp('10%'),
    color: Colors.mainText,
    fontFamily: 'Arial-BoldMT',
    marginLeft: wp('5%'),
    marginTop: hp('2%'),
  },
  subHeader: {
    width: wp('80%'),
    fontSize: wp('5%'),
    color: '#444',
    marginBottom: hp('1%'),
    marginLeft: wp('5%'),
    fontFamily: 'Arial',
  },
  details: {
    width: wp('80%'),
    height: hp('40%'),
    backgroundColor: '#212834',
    borderRadius: wp('5%'),
    borderColor: '#555',
    borderWidth: 1,
  },
  detailsText: {
    fontSize: wp('5%'),
    color: '#888',
    padding: wp('3%'),
    fontFamily: 'Arial',
  },
  map: {
    height: hp('30%'),
    width: wp('80%'),
    backgroundColor: '#545454',
    borderRadius: wp('5%'),
  },
  images: {
    height: hp('50%'),
    minWidth: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    height: hp('45%'),
    width: wp('70%'),
    backgroundColor: '#333',
    borderRadius: 20,
    position: 'relative',
    marginRight: wp('2%'),
  },
  image: {
    height: hp('45%'),
    width: wp('70%'),
    borderRadius: 20,
  },
  imageDelete: {
    width: wp('10%'),
    height: wp('10%'),
    backgroundColor: '#FF5733',
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageDeleteContainer: {
    position: 'absolute',
    right: wp('-2%'),
    top: wp('-2%'),
    zIndex: 10,
  },
  button: {
    width: wp('80%'),
    height: hp('7%'),
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('5%'),
    marginBottom: hp('2%'),
    backgroundColor: '#ff6a30',
  },
  buttonText: {
    fontSize: wp('6%'),
    color: 'white',
    fontWeight: 'bold',
  },
});
