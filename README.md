# Coursera OAuth flow for Meteor

An implementation of the
[Coursera OAuth flow](https://tech.coursera.org/app-platform/oauth2/)
for the [Meteor Accounts](https://www.meteor.com/accounts) system.
See the [the accounts documentation](https://www.meteor.com/accounts)
for background. This package is a dependency of
[kljensen:meteor-accounts-coursera](https://github.com/kljensen/meteor-accounts-coursera)
and the two would rarely be used apart.

## Installation

	meteor add kljensen:coursera

## Configuration

First, you'll need to create an app on coursera through their
[developer console](https://accounts.coursera.org/console).
You'll need to record the "Client ID" and "Secret Key" to use
in your Meteor app. You'll also need to setup your redirect
URLs on the Coursera developer console. Your URLs should look,
at a minimum, like the following

	http://$FQDN/_oauth/coursera
	http://$FQDN/_oauth/coursera?close

Where `$FQDN` is your fully qualified domain name. So, for
local development, your URLs might be something like

	http://localhost:3000/_oauth/coursera
	http://localhost:3000/_oauth/coursera?close

Or, in production, they might be

	http://www.your-website-url.edu/_oauth/coursera
	http://www.your-website-url.edu/_oauth/coursera?close

Next, you'll need to tell your Meteor app that Coursera
OAuth is a valid login mechanism.
To do this, you can use
[Meteor Service Configuration](https://atmospherejs.com/meteor/service-configuration).
To configure your Coursera OAuth flow, use something like the following
on the *server side only*, likely during startup.

```javascript
ServiceConfiguration.configurations.remove({
  service: 'coursera'
});
 
 ServiceConfiguration.configurations.insert({
    service: 'coursera',
    clientId: 'w4MV0YEagyqpZ6fHgtMu6D',
    secret: 'Pr-rF2LffZS0IZ0zQNa29j'
 });
```

(Obviously, those are bogus credentials. They are shown for example.)

## Contributing

Pull requests!

## License

See LICENSE.md.