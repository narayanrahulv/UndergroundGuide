# Description

Simple app to provide information about the London underground. Features include:
- Scrollable/clickable list of all tube lines.
- Real time status (delays, outages etc) for a selected line along with whether the line provides regular and/or night tube service.
- All station stops for a sellected line including 
   - Accessibility information for each station (eg: lifts).
   - Other lines available from a station.

# Prerequisites
[React Native - Environment Setup](https://reactnative.dev/docs/environment-setup)

# Running the project
- Clone the repository.
- Start metro bundler from the _root_ of your folder the repository was cloned into as follows (ideally, lset Metro Bundler run in its _own_ terminal):
```bash
# using npm
npm start

# OR using Yarn
yarn start
```
- Open a _new_ terminal from the _root_ of your folder the repository was cloned into and run for _Android_ or _iOS_ as follows:
```bash
# run on android using npm
npm run android

# run on android using Yarn
yarn android
```

```bash
# run on ios using npm
npm run ios

# run on ios using Yarn
yarn ios
```
- If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_.
- Alternately, the project can also be run directly from within Android Studio and Xcode respectively (using build/run tools on each).