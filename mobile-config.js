// the entire section is optional.
App.info({
  id: 'com.industec.nombre.aecheck',
  name: 'A&E Envíos',
  description: 'Casa de cambio',
  author: 'Grupo DDV SAC',
  email: 'danieldelgadilloh@gmail.com',
  version: '1.0.3',
});

App.setPreference('Orientation', 'portrait');

App.configurePlugin('phonegap-plugin-push', {
  SENDER_ID: 246059673095
});

App.icons({
  'android_mdpi': 'public/res/mipmap-mdpi/ic_launcher.png',
  'android_hdpi': 'public/res/mipmap-hdpi/ic_launcher.png',
  'android_xhdpi': 'public/res/mipmap-xhdpi/ic_launcher.png',
  'android_xxhdpi': 'public/res/mipmap-xxhdpi/ic_launcher.png',
  'android_xxxhdpi': 'public/res/mipmap-xxxhdpi/ic_launcher.png',
  'iphone_2x': 'public/logos/logo_120x120.png',
  'iphone_3x': 'public/logos/logo_180x180.png',
  'ipad': 'public/logos/logo_76x76.png',
  'ipad_2x': 'public/logos/logo_152x152.png',
  'ipad_pro': 'public/logos/logo_167x167.png',
  'ios_settings': 'public/logos/logo_29x29.png',
  'ios_settings_2x': 'public/logos/logo_58x58.png',
  'ios_settings_3x': 'public/logos/logo_87x87.png',
  'ios_spotlight': 'public/logos/logo_40x40.png',
  'ios_spotlight_2x': 'public/logos/logo_80x80.png'
});

App.launchScreens({
	'android_mdpi_portrait': 'public/res/mipmap-mdpi/android_mdpi_portrait.png',
	'android_hdpi_portrait': 'public/res/mipmap-hdpi/android_hdpi_portrait.png',
	'android_xhdpi_portrait': 'public/res/mipmap-xhdpi/android_xhdpi_portrait.png',
	'android_xxhdpi_portrait': 'public/res/mipmap-xxhdpi/android_xxhdpi_portrait.png',
  'iphone_2x': 'public/logos/launch_640x960.png',
  'iphone5': 'public/logos/launch_640x1136.png',
  'iphone6': 'public/logos/launch_750x1334.png',
  'iphone6p_portrait': 'public/logos/launch_1242x2208.png'
});

App.appendToConfig(`<platform name="ios">
    <config-file platform="ios" target="*-Info.plist" parent="NSPhotoLibraryUsageDescription">
      <string>Accederemos a las fotos de su dispositivo para que seleccione su ID de Identificacion</string>
    </config-file>
    <config-file platform="ios" target="*-Info.plist" parent="NSCameraUsageDescription">
      <string>Accederemos a las fotos de su dispositivo para que seleccione su ID de Identificacion</string>
    </config-file>
  </platform>`);
