#!/bin/bash

# This script is executed by EAS Build after the project is installed
# It fixes the Kotlin version compatibility issue with the Compose Compiler

echo "Applying Kotlin version compatibility fix..."

# Check if we're in an EAS build environment
if [ -d "android" ]; then
  # Fix build.gradle
  if [ -f "android/build.gradle" ]; then
    echo "Updating android/build.gradle with Kotlin version 1.9.25..."
    
    # Backup the original file
    cp android/build.gradle android/build.gradle.bak
    
    # Add kotlinVersion to ext block
    sed -i 's/ext {/ext {\n        kotlinVersion = "1.9.25"/g' android/build.gradle
    
    # Add kotlin-gradle-plugin to dependencies
    sed -i 's/dependencies {/dependencies {\n        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:1.9.25")/g' android/build.gradle
    
    echo "Updated android/build.gradle successfully"
  else
    echo "android/build.gradle not found"
  fi
  
  # Fix gradle.properties
  if [ -f "android/gradle.properties" ]; then
    echo "Updating android/gradle.properties with Kotlin compatibility settings..."
    
    # Backup the original file
    cp android/gradle.properties android/gradle.properties.bak
    
    # Append Kotlin compatibility settings
    echo "# Fix for Kotlin version compatibility with Compose Compiler" >> android/gradle.properties
    echo "kotlin.version=1.9.25" >> android/gradle.properties
    echo "android.suppressKotlinVersionCompatibilityCheck=true" >> android/gradle.properties
    
    echo "Updated android/gradle.properties successfully"
  else
    echo "android/gradle.properties not found"
  fi
  
  echo "Kotlin version compatibility fix applied successfully"
else
  echo "Not in an EAS build environment, skipping Kotlin version fix"
fi
