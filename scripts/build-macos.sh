#! /bin/bash

echo -e "Start running the script..."
cd ../

echo -e "Start building the app for macos platform..."
sudo rm -rf build/bin/*
wails build --clean --platform darwin/universal
sudo productbuild --component ./build/bin/midgard.app / ./build/bin/midgard.pkg
hdiutil create -volname "midgard" -srcfolder "./build/bin/midgard.app" -ov -format UDZO "./build/bin/midgard.dmg"

echo -e "End running the script!"
