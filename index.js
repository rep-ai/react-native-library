// @flow
// Folder Components
import { AppRegistry } from 'react-native'
import App from './src'

AppRegistry.registerComponent('ReactNativeLibrary', () => App)

import _Button from './src/Button'
export const Button = _Button

import _HorizontalTab from './src/HorizontalTab'
export const HorizontalTab = _HorizontalTab

import _InputView from './src/InputView/InputView'
export const InputView = _InputView

import _NumberInputView from './src/InputView/NumberInputView'
export const NumberInputView = _NumberInputView

import _OnboardingScreen from './src/OnboardingScreen'
export const OnboardingScreen = _OnboardingScreen

import _Tooltip from './src/Tooltip'
export const Tooltip = _Tooltip

// Individual Components
import _ActivityIndicator from './src/ActivityIndicator'
export const ActivityIndicator = _ActivityIndicator

import _Alert from './src/Alert'
export const Alert = _Alert

import _AvatarView from './src/AvatarView'
export const AvatarView = _AvatarView

import _Card from './src/Card'
export const Card = _Card

import _CheckBox from './src/CheckBox'
export const CheckBox = _CheckBox

import _colors from './src/colors'
export const colors = _colors

import _EditableText from './src/EditableText'
export const EditableText = _EditableText

import _FabComponent from './src/FabComponent'
export const FabComponent = _FabComponent

import _FlatList from './src/FlatList'
export const FlatList = _FlatList

import _Header from './src/Header'
export const Header = _Header

import {
    _HeaderButtonTouchable,
    _HeaderButtonOptions,
    _BackButton,
    _CheckButton,
} from './src/HeaderButtons'

export const HeaderButtonTouchable = _HeaderButtonTouchable
export const HeaderButtonOptions = _HeaderButtonOptions
export const BackButton = _BackButton
export const CheckButton = _CheckButton

import _HorizontalPagingScrollView from './src/HorizontalPagingScrollView'
export const HorizontalPagingScrollView = _HorizontalPagingScrollView

import _ImageListView from './src/ImageListView'
export const ImageListView = _ImageListView

import _ImageLoader from './src/ImageLoader'
export const ImageLoader = _ImageLoader

import _ImportIconWithCount from './src/ImportIconWithCount'
export const ImportIconWithCount = _ImportIconWithCount

import _KeyboardSpacer from './src/KeyboardSpacer'
export const KeyboardSpacer = _KeyboardSpacer

import _LoadingText from './src/LoadingText'
export const LoadingText = _LoadingText

import _ModalScreen from './src/ModalScreen'
export const ModalScreen = _ModalScreen

import _PanResponder from './src/PanResponder'
export const PanResponder = _PanResponder

import _SectionList from './src/SectionList'
export const SectionList = _SectionList

import _styles from './src/styles'
export const styles  = _styles

import _SubmitButton from './src/SubmitButton'
export const SubmitButton = _SubmitButton

import _Switch from './src/Switch'
export const Switch = _Switch

import _Text from './src/Text'
export const Text = _Text

import _TextAdjustsToFit from './src/TextAdjustsToFit'
export const TextAdjustsToFit = _TextAdjustsToFit

import _TextInput from './src/TextInput'
export const TextInput = _TextInput

import _Title from './src/Title'
export const Title = _Title

import _TouchableResponder from './src/TouchableResponder'
export const TouchableResponder = _TouchableResponder

import _VideoSlider from './src/VideoSlider'
export const VideoSlider = _VideoSlider

// Utility Methods
import _capitalize from './src/UtilityMethods/capitalize'
export const capitalize = _capitalize

import _dateTimeConvert from './src/UtilityMethods/dateTimeConvert'
export const dateTimeConvert = _dateTimeConvert

import _limitTextLength from './src/UtilityMethods/limitTextLength'
export const limitTextLength = _limitTextLength

import _mergeFilterIds from './src/UtilityMethods/mergeFilterIds'
export const mergeFilterIds = _mergeFilterIds

import _mergeStyles from './src/UtilityMethods/mergeStyles'
export const mergeStyles = _mergeStyles

import _ordinalSuffix from './src/UtilityMethods/ordinalSuffix'
export const ordinalSuffix = _ordinalSuffix

import _shortNum from './src/UtilityMethods/shortNum'
export const shortNum = _shortNum

import _v4 from './src/UtilityMethods/v4'
export const v4 = _v4
