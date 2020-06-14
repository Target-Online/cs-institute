import Slideshow from "react-native-image-slider";
import React from 'react';
import { theme } from 'galio-framework';

import { Images } from '../constants/'

export const ImagesSlider = () => (
  <Slideshow
    loopBothSides
    resizeMode={'contain'}
    autoPlayWithInterval={3000}
    images={Images.sliderImages}
    style={{ resizeMode: 'contain', marginTop: theme.SIZES.BASE * 2 }}
  />
);

export default ImagesSlider;
// import { SliderBox } from "react-native-image-slider-box";
// import React, { useEffect } from 'react';

// import { Images } from '../constants/'
// import data from './data.json'
// import { realTimedbApi } from '../../api'

// export const ImagesSlider = () => (
//     <SliderBox
//       sliderBoxHeight={600}
//       images={Images.sliderImages}
//       resizeMode={'contain'}
//       autoplay
//       circleLoop
//     />
//   );

// export default ImagesSlider;