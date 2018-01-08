// the entire section is optional.
App.info({
  id: 'com.industec.nombre.tinajas',
  name: 'Las Tinajas',
  description: 'polleria',
  author: 'Grupo DDV SAC',
  email: 'danieldelgadilloh@gmail.com',
  version: '1.0.11',
});

App.setPreference('Orientation', 'portrait');


App.accessRule('*');

App.icons({
  'android_mdpi': 'public/res/mipmap-mdpi/ic_launcher.png',
  'android_hdpi': 'public/res/mipmap-hdpi/ic_launcher.png',
  'android_xhdpi': 'public/res/mipmap-xhdpi/ic_launcher.png',
  'android_xxhdpi': 'public/res/mipmap-xxhdpi/ic_launcher.png',
  'android_xxxhdpi': 'public/res/mipmap-xxxhdpi/ic_launcher.png',
});

App.launchScreens({
	'android_mdpi_portrait': 'public/res/mipmap-mdpi/android_mdpi_portrait.png',
	'android_hdpi_portrait': 'public/res/mipmap-hdpi/android_hdpi_portrait.png',
	'android_xhdpi_portrait': 'public/res/mipmap-xhdpi/android_xhdpi_portrait.png',
	'android_xxhdpi_portrait': 'public/res/mipmap-xxhdpi/android_xxhdpi_portrait.png'
});

/*App.appendToConfig(`<platform name="ios">
    <config-file platform="ios" target="*-Info.plist" parent="NSPhotoLibraryUsageDescription">
      <string>Accederemos a las fotos de su dispositivo para que seleccione su ID de Identificacion</string>
    </config-file>
    <config-file platform="ios" target="*-Info.plist" parent="NSCameraUsageDescription">
      <string>Accederemos a las fotos de su dispositivo para que seleccione su ID de Identificacion</string>
    </config-file>
  </platform>`);*/
