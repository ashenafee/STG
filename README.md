# See The Good

A high fidelity prototype made for the "See The Good" project for CSC318 at the University of Toronto.

See the Figma design mockup [here](https://www.figma.com/file/3SMArc1drGfTS25a9D3QCb/See-The-Good).

## Contributing

### Setup

#### Step 1: Installing Dependencies

Make sure you have a recent version of Node.js installed. The most recent LTS version can be downloaded [here](https://nodejs.org/en/).

Then run the following command in the root directory to install all dependencies:
```
npm install
```

#### Step 2: Running the App

Run the following command to start a development server:
```
npx expo start
```

Next, install the Expo Go app on your device, available on both the [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) and the [iOS App Store](https://play.google.com/store/apps/details?id=host.exp.exponent).

Then, to see the app running on:
- **iOS**
    
    Use the device's camera app to scan the generated QR code.

- **Android**

    Scan the generated QR code through the Expo Go app.

Alternatively, you can open the app on emulators. See here for more information on connecting an [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/) or an [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/), and [here](https://docs.expo.dev/more/expo-cli/#develop) for more information on developing with Expo CLI.

### Development Guidlines

#### Styling Units

Something to keep in mind is that the Figma mockup will have a different screen aspect ratio than actual devices. Specifically, most devices will not have the same amount of vertical space to work with. We want to place and size elements on the screen such that the overall **proportions** look the same, in order to preserve the app visuals across multiple devices.

When choosing what unit to use for styling, consider the following, in order:

1. percentages (%)

    Whenever possible, place elements such that they are the correct percentage of the way across/below the screen. i.e. an element whose top is `20rem` below the top of a `40rem` tall screen should have `top: 50%`. The Figma frame is `20.5625rem x 42.75rem`.

    Place items using the "outer" edges where possible. That is, for an element in the top left corner of the screen, use the `top` and `left` properties (if using `position: absolute`), so that as screen size increases, the item stays in the top left. 

2. `rem`

    With [`EStyleSheet`](https://github.com/vitalets/react-native-extended-stylesheet), we are able to globally define a `rem` unit that will scale with different screen sizes.

3. `px`

    Use this extremely sparingly, as it will not scale at all. Keep in mind that a React Native pixel is not the same size as a physical pixel ([see here](https://reactnative.dev/docs/pixelratio.html#content)).

#### General Tips

- Don't be afraid to use `position: absolute` to hard-code element placement
- Use [`flex`](https://reactnative.dev/docs/height-and-width#flex-dimensions)
- Type-hint functions as much as possible
- Be careful of side-effects of using async functions. For example, a Promise is truthy while is it unresolved.
