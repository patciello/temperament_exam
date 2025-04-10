/**
 * This script is used by EAS Build to modify the build.gradle file
 * to fix the Kotlin version compatibility issue.
 * 
 * It's executed during the build process on the EAS servers,
 * not locally on your machine.
 */

module.exports = {
  modifyBuildGradle({ buildGradle }) {
    // Add kotlinVersion to ext block
    const modifiedBuildGradle = buildGradle.replace(
      /ext\s*{/,
      'ext {\n        kotlinVersion = "1.9.25"'
    );

    // Add kotlin-gradle-plugin to dependencies
    return modifiedBuildGradle.replace(
      /dependencies\s*{/,
      'dependencies {\n        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:1.9.25")'
    );
  },
};
