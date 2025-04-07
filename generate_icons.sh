#!/bin/bash

# Create necessary directories if they don't exist
mkdir -p android/app/src/main/res/drawable
mkdir -p android/app/src/main/res/mipmap-mdpi
mkdir -p android/app/src/main/res/mipmap-hdpi
mkdir -p android/app/src/main/res/mipmap-xhdpi
mkdir -p android/app/src/main/res/mipmap-xxhdpi
mkdir -p android/app/src/main/res/mipmap-xxxhdpi

# Create base icon with proper padding and transparency
magick icon.png -background none -gravity center -extent 110%x110% icon_padded.png

# Convert and resize the icon for different densities
magick icon_padded.png -resize 48x48 android/app/src/main/res/mipmap-mdpi/ic_launcher.png
magick icon_padded.png -resize 72x72 android/app/src/main/res/mipmap-hdpi/ic_launcher.png
magick icon_padded.png -resize 96x96 android/app/src/main/res/mipmap-xhdpi/ic_launcher.png
magick icon_padded.png -resize 144x144 android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png
magick icon_padded.png -resize 192x192 android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png

# Create splash screen icons
magick icon_padded.png -resize 160x160 android/app/src/main/res/drawable/splash_icon.png

# Create round icons with circular mask
for size in 48 72 96 144 192; do
    density=""
    case $size in
        48) density="mdpi" ;;
        72) density="hdpi" ;;
        96) density="xhdpi" ;;
        144) density="xxhdpi" ;;
        192) density="xxxhdpi" ;;
    esac
    center=$((size/2))
    magick icon_padded.png -resize ${size}x${size} \
        \( +clone -alpha extract -draw "circle $center,$center $center,0" -alpha copy \) \
        -compose in -composite \
        android/app/src/main/res/mipmap-${density}/ic_launcher_round.png
done

# Create foreground icons with transparency
magick icon_padded.png -resize 48x48 android/app/src/main/res/mipmap-mdpi/ic_launcher_foreground.png
magick icon_padded.png -resize 72x72 android/app/src/main/res/mipmap-hdpi/ic_launcher_foreground.png
magick icon_padded.png -resize 96x96 android/app/src/main/res/mipmap-xhdpi/ic_launcher_foreground.png
magick icon_padded.png -resize 144x144 android/app/src/main/res/mipmap-xxhdpi/ic_launcher_foreground.png
magick icon_padded.png -resize 192x192 android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_foreground.png

# Clean up temporary file
rm icon_padded.png 