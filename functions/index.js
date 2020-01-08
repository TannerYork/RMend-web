const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./config/rmend-789c8-firebase-adminsdk-hmfrb-042a92ca23.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://rmend-789c8.firebaseio.com'
});

// Only for dev build
exports.makeModeratorOnSignIn = functions.auth.user().onCreate(async data => {
  const user = await admin.auth().getUser(data.uid);
  return admin.auth().setCustomUserClaims(user.uid, {
    verified: true,
    moderator: true,
    magisterialDistrict: 'moderator',
    allowNotifications: false
  });
});

exports.addUser = functions.auth.user().onCreate(async data => {
  const user = await admin.auth().getUser(data.uid);
  return admin
    .firestore()
    .collection('users')
    .doc(user.uid)
    .set({
      email: user.email,
      id: user.uid,
      displayName: user.displayName ? user.displayName : 'New User',
      magisterialDistrict: '',
      verified: false
    });
});

exports.updateUserInfo = functions.https.onCall((data, context) => {
  if (context.auth.token.moderator !== true) {
    return { error: 'Request not authorized. You must be a moderator to fulfill this request.' };
  }
  return admin
    .auth()
    .getUser(data.userId)
    .then(user => {
      if (data.verification && data.verification === 'moderator') {
        // Moderate User
        return addModerator(user);
      } else if (data.verification && data.verification === 'verified') {
        // Verify User
        return addUser(user, data.magisterialDistrict);
      } else if (data.verification && data.verification === 'unverified') {
        // Unverifiy User
        return removeUser(user, '');
      } else {
        return { error: 'ERROR! Verification data was not found' };
      }
    })
    .catch(err => {
      return { error: err.message, stack: err.stack };
    });
});

const addModerator = async user => {
  if (user.customClaims && user.customClaims.moderator === true)
    return { error: `ERROR! ${user.displayName} is already a moderator` };
  await admin.auth().setCustomUserClaims(user.uid, {
    verified: true,
    moderator: true,
    magisterialDistrict: 'moderator',
    allowNotifications: false
  });
  await admin
    .firestore()
    .collection('users')
    .doc(user.uid)
    .update({
      verified: true
    });
};

const addUser = async (user, magisterialDistrict) => {
  if (user.customClaims && user.customClaims.verified === true)
    return { error: `ERROR! ${user.displayName} is already a verified` };
  await admin
    .auth()
    .setCustomUserClaims(user.uid, { verified: true, moderator: false, magisterialDistrict });
  await admin
    .firestore()
    .collection('users')
    .doc(user.uid)
    .update({
      verified: true
    });
};

const removeUser = async (user, magisterialDistrict) => {
  if (user.customClaims && user.customClaims.moderator === true)
    return { error: `ERROR! ${user.displayName} is already a moderator` };
  await admin
    .auth()
    .setCustomUserClaims(user.uid, { verified: false, moderator: false, magisterialDistrict });
  await admin
    .firestore()
    .collection('users')
    .doc(user.uid)
    .update({
      verified: false
    });
};

exports.sendNotification = functions.firestore.document('reports/{reportid}')
    .onCreate((change, context) => {
      const userUID = context.params.userUID;

      const tokens = getUserDeviceTokens(userUID);
      const name = 'Tanner';

      // Notification details.
      const payload = {
        notification: {
          title: 'New Report Added',
          body: `${name} added a report`
        }
      };
      return admin.messaging().sendToDevice(tokens, payload);
    });

exports.sendReportReviewEmail = functions.https.onCall(async (data, context) => {
  if (context.auth.token.moderator !== true)
    return { error: 'ERROR! You need to be a moderator to send emails' };

  const { displayName, magisterialDistrict, message } = data;
  return admin
    .firestore()
    .collection('users')
    .where('magisterialDistrict', '==', magisterialDistrict)
    .get()
    .then(async districtUsers => {
      return districtUsers
        .forEach(user => {
          const { email } = user.data();
          const mailOptions = {
            from: `Barren County Road Department: ${displayName}`, // Something like: Jane Doe <janedoe@gmail.com>
            to: email,
            subject: 'Report Under Review', // email subject
            html: `<p style="font-size: 16px;">${message}</p>` // email content in HTML
          };
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log(err);
          });
        })
        .then(() => {
          return admin
            .firestore()
            .collection('users')
            .where('magisterialDistrict', '==', 'manager')
            .get()
            .then(managers => {
              return managers.forEach(manager => {
                const { email } = manager.data();
                const mailOptions = {
                  from: `Barren County Road Department: ${displayName}`, // Something like: Jane Doe <janedoe@gmail.com>
                  to: email,
                  subject: 'Report Under Review', // email subject
                  html: `<p style="font-size: 16px;">${message}</p>` // email content in HTML
                };
                transporter.sendMail(mailOptions, (err, info) => {
                  if (err) console.log(err);
                });
                return { result: 'Emails sent to district managers' };
              });
            });
        });
    })
    .catch(err => {
      return { error: err.message, stack: err.stack };
    });
});