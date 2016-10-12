const Eureka = require('eureka-js-client').Eureka;

const client = new Eureka({
  // application instance information
  instance: {
    app: 'likes-servie',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    statusPageUrl: 'http://localhost:8080/todo',
    port: {
      '$': 8000,
      '@enabled': true
    },  
    vipAddress: 'likes-service',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn'
    }
  },
  eureka: {
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/'
  }
});

client.start( () => console.log(client.getInstancesByAppId('spielplatz')));
