import React from 'react';

class ReportCard extends React.Component {
  render() {
    const { images, details } = this.props.report;
    return (
      <div
        style={styles.reportWrapper}
        style={styles.reportInfo}
        onClick={() => navigate('ReportInfo', { report })}
      >
        <img src={images[0].imageUrl} style={styles.reportImage} loading="lazy" />
        <div>
          <p style={styles.reportType}>{details.type}</p>
          <p style={styles.reportAuth}>{details.authority}</p>
        </div>
      </div>
    );
  }
}

export default ReportCard;

const styles = {
  reportWrapper: {
    width: wp('90%'),
    height: hp('11%'),
    backgroundColor: 'white',
    borderRadius: wp('3%'),
    marginTop: hp('1%'),
    padding: wp('1%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#222',
    shadowOpacity: 0.2,
    shadowOffset: { width: 3, height: 3 },
    elevation: 1,
  },
  reportInfo: {
    width: wp('70%'),
    height: hp('13%'),
    backgroundColor: 'white',
    borderRadius: wp('3%'),
    marginTop: hp('2%'),
    paddingLeft: wp('15%'),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    position: 'relative',
  },
  reportImage: {
    width: hp('10%'),
    height: hp('10%'),
    marginRight: wp('5%'),
    borderRadius: wp('3%'),
    position: 'absolute',
    left: wp('-5%'),
  },
  reportType: {
    fontSize: wp('5%'),
    color: '#222',
  },
  reportAuth: {
    fontSize: wp('3%'),
    color: '#666',
  },
};
