# react-native-slide-to-unlock
A small button component inspired by old iPhone's feature 'slide to unlock'.

# What it looks like

![5j2jduk](https://github.com/gutioliveira/react-native-slide-to-unlock/blob/master/usage.gif?raw=true)

# Installing
```npm install --save react-native-slide-to-unlock```

# Usage

Example import

```jsx
import Slider from 'react-native-slide-to-unlock';
```

Example usage and props! They're self explaining.

```jsx
<Slider
  childrenContainer={{ backgroundColor: 'red' }}
  onEndReached={() => {
    Alert.alert('Attention', 'onEndReached!');
  }}
  containerStyle={{
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%'
  }}
  sliderElement={
    <Image
      style={{
        width: 50,
        margin: 4,
        borderRadius: 5,
        height: 50,
        backgroundColor: 'red',
      }}
      source={{
        uri:
          'https://facebook.github.io/react-native/docs/assets/favicon.png',
      }}
    />
  }
>
  <Text>{'SLIDE TO UNLOCK'}</Text>
</Slider>
```

# Contributing
Feel free to contribute to this project at any time. Fixing issues or developing new features.
Just a small example on how to contribute on this project.

```
cd yourReactNativeProject
git clone https://github.com/gutioliveira/react-native-slide-to-unlock.git  ./yourComponentsFolder/react-native-slide-to-unlock
```
import it from your project

```jsx
import Slider from './yourComponentsFolder/react-native-slide-to-unlock';
```

start hacking and after you're done, submit your pull request.

