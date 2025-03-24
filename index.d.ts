declare module 'react-native-slide-to-unlock' {
  import { ReactNode } from 'react'
  interface ButtonProps {
    childrenContainer?: any,
    onEndReached: () => void,
    onSlideStart: () => void,
    onSlideEnd: () => void,
    containerStyle?: any,
    sliderElement?: ReactNode,
    disableSliding?: boolean,
    children?: ReactNode
  }

  export default class SliderButton extends React.Component<ButtonProps, any> { }
}
