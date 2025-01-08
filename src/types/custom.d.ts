// src/types/custom.d.ts

declare module 'react-native-vector-icons/MaterialIcons' {
  import {Icon} from 'react-native-vector-icons';
  export default Icon;
}

declare module 'react-native-vector-icons/Ionicons' {
  import {Icon} from 'react-native-vector-icons';
  export default Icon;
}

declare module 'react-native-vector-icons/*' {
  import {Icon} from 'react-native-vector-icons';
  export default Icon;
}

// 이미지 임포트를 위한 타입 선언
declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}

declare module '*.webp' {
  const content: any;
  export default content;
}
