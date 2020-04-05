import { Platform, StatusBar } from 'react-native';
import { theme } from 'galio-framework';

export const IMGIcon = 'https://i.stack.imgur.com/l60Hf.png'
export const CourseIcon = 'https://image.flaticon.com/sprites/new_packs/111078-educational-icons.png'
export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = (theme.SIZES.BASE * 3.5 + (StatusHeight || 0));
export const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812);