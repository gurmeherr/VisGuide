#!/bin/bash

# Create necessary directories if they don't exist
mkdir -p android/app/src/main/res/drawable
mkdir -p android/app/src/main/res/mipmap-mdpi
mkdir -p android/app/src/main/res/mipmap-hdpi
mkdir -p android/app/src/main/res/mipmap-xhdpi
mkdir -p android/app/src/main/res/mipmap-xxhdpi
mkdir -p android/app/src/main/res/mipmap-xxxhdpi

# Scale the icon for different densities
magick high_res_icon.png -resize 48x48 android/app/src/main/res/mipmap-mdpi/ic_launcher.png
magick high_res_icon.png -resize 72x72 android/app/src/main/res/mipmap-hdpi/ic_launcher.png
magick high_res_icon.png -resize 96x96 android/app/src/main/res/mipmap-xhdpi/ic_launcher.png
magick high_res_icon.png -resize 144x144 android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png
magick high_res_icon.png -resize 192x192 android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png

# Create splash screen icon (slightly larger for better visibility)
magick high_res_icon.png -resize 256x256 android/app/src/main/res/drawable/splash_icon.png

# Create round icons (same as regular icons since the image is already circular)
cp android/app/src/main/res/mipmap-mdpi/ic_launcher.png android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png
cp android/app/src/main/res/mipmap-hdpi/ic_launcher.png android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png
cp android/app/src/main/res/mipmap-xhdpi/ic_launcher.png android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png
cp android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png
cp android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png

# Create foreground icons (same as regular icons)
cp android/app/src/main/res/mipmap-mdpi/ic_launcher.png android/app/src/main/res/mipmap-mdpi/ic_launcher_foreground.png
cp android/app/src/main/res/mipmap-hdpi/ic_launcher.png android/app/src/main/res/mipmap-hdpi/ic_launcher_foreground.png
cp android/app/src/main/res/mipmap-xhdpi/ic_launcher.png android/app/src/main/res/mipmap-xhdpi/ic_launcher_foreground.png
cp android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png android/app/src/main/res/mipmap-xxhdpi/ic_launcher_foreground.png
cp android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_foreground.png 