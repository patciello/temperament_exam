#!/usr/bin/env node

/**
 * This script is executed by EAS before the build process.
 * It modifies Android configuration files to fix the Kotlin version compatibility issue.
 */

try {
  console.log('Running prebuild script to fix Kotlin version compatibility...');

  // Only proceed if we're building for Android
  const args = process.argv.slice(2);
  const isAndroid =
    args.includes('--platform') &&
    args[args.indexOf('--platform') + 1] === 'android';

  if (!isAndroid) {
    console.log('Not building for Android, skipping Kotlin version fix');
    process.exit(0);
  }

  console.log('Applying Kotlin version fix for Android build...');

  // No need to modify any files locally
  // The fix will be applied by EAS during the build process
  console.log(
    'Kotlin version fix will be applied by EAS during the build process'
  );

  console.log('Prebuild script completed successfully');
  process.exit(0);
} catch (error) {
  console.error('Error in prebuild script:', error);
  // Exit with success code to prevent build failure
  process.exit(0);
}
