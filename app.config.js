module.exports = ({ config }) => {
  // Get the original config
  const originalConfig = { ...config };

  // Add extra configuration for Android
  if (!originalConfig.android) {
    originalConfig.android = {};
  }

  // We'll handle Kotlin version through EAS build configuration instead of directly in android section

  // Configure splash screen
  if (!originalConfig.splash) {
    originalConfig.splash = {
      image: './assets/images/icon.png',
      resizeMode: 'contain',
      backgroundColor: '#000000',
    };
  }

  // Add required plugins
  if (!originalConfig.plugins) {
    originalConfig.plugins = [];
  }

  // Add expo-font plugin if not already included
  if (!originalConfig.plugins.includes('expo-font')) {
    originalConfig.plugins.push('expo-font');
  }

  // Add extra configuration for EAS Build
  if (!originalConfig.extra) {
    originalConfig.extra = {};
  }
  if (!originalConfig.extra.eas) {
    originalConfig.extra.eas = {};
  }
  if (!originalConfig.extra.eas.build) {
    originalConfig.extra.eas.build = {};
  }

  // Add experimental configuration for Android
  originalConfig.extra.eas.build.experimental = {
    android: {
      gradleCommand:
        ':app:assembleDebug -PkotlinVersion=1.9.25 -Pandroid.suppressKotlinVersionCompatibilityCheck=true',
      buildType: 'apk',
      image: 'ubuntu-22.04-jdk-17-ndk-r25b',
      env: {
        KOTLIN_VERSION: '1.9.25',
        ANDROID_SUPPRESS_KOTLIN_VERSION_COMPATIBILITY_CHECK: 'true',
      },
    },
  };

  // Add Kotlin version to extra config for EAS Build to use
  if (!originalConfig.extra.kotlinVersion) {
    originalConfig.extra.kotlinVersion = '1.9.25';
  }

  return originalConfig;
};
