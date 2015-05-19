Package.describe({
  summary: "Coursera OAuth flow",
  version: "0.1.0",
  documentation: 'README.md',
  git: 'https://github.com/kljensen/meteor-coursera.git'

});

Package.onUse(function(api) {
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use('underscore', 'client');
  api.use('templating', 'client');
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.export('Coursera');

  api.addFiles(
    ['coursera_configure.html', 'coursera_configure.js'],
    'client');

  api.addFiles('coursera_server.js', 'server');
  api.addFiles('coursera_client.js', 'client');
});
