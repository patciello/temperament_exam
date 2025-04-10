module.exports = {
  cli: {
    version: '>= 5.9.1',
    appVersionSource: 'remote',
  },
  build: {
    development: {
      developmentClient: true,
      distribution: 'internal',
      android: {
        buildType: 'apk',
        gradleCommand: ':app:assembleDebug',
        withoutCredentials: true,
        image: 'ubuntu-22.04-jdk-17-ndk-r25c',
      },
      ios: {
        simulator: true,
      },
      env: {
        KOTLIN_VERSION: '1.9.25',
      },
      prebuildCommand: 'node ./prebuild.js',
    },
    preview: {
      distribution: 'internal',
      android: {
        buildType: 'apk',
        withoutCredentials: true,
        image: 'ubuntu-22.04-jdk-17-ndk-r25c',
      },
      ios: {
        simulator: true,
      },
      env: {
        KOTLIN_VERSION: '1.9.25',
      },
      prebuildCommand: 'node ./prebuild.js',
    },
    production: {
      autoIncrement: true,
      android: {
        buildType: 'app-bundle',
        withoutCredentials: true,
        image: 'ubuntu-22.04-jdk-17-ndk-r25c',
      },
      env: {
        KOTLIN_VERSION: '1.9.25',
      },
      prebuildCommand: 'node ./prebuild.js',
    },
  },
  submit: {
    production: {},
  },
};
