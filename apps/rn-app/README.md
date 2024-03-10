# RN Expo App Study

## Development

### Install Dependencies

```barh
yarn install
```

### Setup

```bash
cp product.json5.example product.json5
```

And change the values in `product.json5` to match your needs.

### Prebuild

This app uses [Continuous Native Generation (CNG)](https://docs.expo.dev/workflow/continuous-native-generation/), meaning that the iOS/Android project files are generated from configuration files. This can be done by running the following command:

```bash
yarn prebuild <platform> <environment>
```

For example, to generate the iOS project for development, run:

```bash
yarn prebuild ios development
```

> [!NOTE]
> The generated iOS/Android project files are not committed to the repository.
> While you can open the generated iOS/Android project files in Xcode/Android Studio and make changes to them, you should be aware that the changes will be overwritten when the project files are regenerated. Therefore, if a change is needed, it should be made in the configuration files instead of the generated project files.

### Run

#### iOS

```bash
yarn run ios
```

Alternatively, you can run `yarn pod-install` then open the generated iOS project in Xcode (`open ios/*.xcworkspace`) and run it from there.

#### Android

```bash
yarn run android
```

Alternatively, you can cd into the `android` directory and run `./gradlew assembleDebug` to build the app for development, or `./gradlew installDebug` to install the app on an emulator or device.
