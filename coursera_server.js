Coursera = {};

OAuth.registerService('coursera', 2, null, function(query) {

  var accessToken = getAccessToken(query);
  var profile = getProfile(accessToken);

  return {
    serviceData: {
      id: profile.id,
      accessToken: OAuth.sealSecret(accessToken),
      profile: profile
      // email: profile.email,
      // username: profile.login
    },
    options: {profile: {name: profile.name}}
  };
});

// http://developer.github.com/v3/#user-agent-required
// var userAgent = "Meteor";
// if (Meteor.release){
//   userAgent += "/" + Meteor.release;
// }

var getAccessToken = function (query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'coursera'});
  if (!config){
    throw new ServiceConfiguration.ConfigError();
  }

  var response;
  try {
    response = HTTP.post(
      "https://accounts.coursera.org/oauth2/v1/token", {
        headers: {
          Accept: 'application/json'
        },
        params: {
          code: query.code,
          client_id: config.clientId,
          client_secret: OAuth.openSecret(config.secret),
          redirect_uri: OAuth._redirectUri('coursera', config),
          state: query.state,
          grant_type: 'authorization_code'
        }
      });
  } catch (err) {
    throw _.extend(new Error("Failed to complete OAuth handshake with Coursera. " + err.message),
                   {response: err.response});
  }
  if (response.data.error) { // if the http response was a json object with an error attribute
    throw new Error("Failed to complete OAuth handshake with Coursera. " + response.data.error);
  } else {
    return response.data.access_token;
  }
};

var getProfile = function (accessToken) {
  try {
    var profileResponse = HTTP.get(
      "https://api.coursera.org/api/externalBasicProfiles.v1?q=me", {
        headers: {"Authorization": 'Bearer ' + accessToken},
        params: {fields: 'timezone,locale,privacy,name'}
    });
    return profileResponse.data.elements[0];
  } catch (err) {
    throw _.extend(new Error("Failed to fetch identity from Coursera. " + err.message),
                   {response: err.response});
  }
};


Coursera.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
