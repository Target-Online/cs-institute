import { SliderBox } from "react-native-image-slider-box";
import React, { useEffect } from 'react';

import { Images } from '../constants/'
import data from './data.json'
import { realTimedbApi } from '../../api'

export const ImagesSlider = () => {

  useEffect(() => {

    // console.log('data', data)
    // data.map(post =>  setTimeout(() => {
    //   realTimedbApi.setData('posts', {
    //     caption: post.Caption,
    //     userId: 'csentillegmailcom',
    //     image: post.Avatar,
    //     likes: Math.ceil(Math.random() * 100),
    //     datetime: post.Datetime,
    //     createdAt: 0
    //   })
    // }, 10000))
  }, [])
  return (
    <SliderBox
      sliderBoxHeight={600}
      images={Images.sliderImages}
      resizeMode={'contain'}
      autoplay
      circleLoop
    />
  );
}

export default ImagesSlider;