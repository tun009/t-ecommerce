export interface WelfareTitleTextProps {
  class?: string
  title?: string
  smallTitle?: boolean
  displayBackIcon?: boolean
  displayMenuIcon?: boolean
  displayHomeLeftIcon?: boolean
  displayHomeRightIcon?: boolean
  displaySearchIcon?: boolean
  displayCartIcon?: boolean
  displayCloseIcon?: boolean
  displayShareIcon?: boolean
  hideBorder?: boolean
}

export interface WelfareTitleTextEmits {
  (e: 'on-click-back'): void
  (e: 'on-click-menu'): void
  (e: 'on-click-home-left'): void
  (e: 'on-click-home-right'): void
  (e: 'on-click-search'): void
  (e: 'on-click-cart'): void
  (e: 'on-click-close'): void
  (e: 'on-click-share'): void
}

export interface WelfareTitleTextStickyTopProps extends WelfareTitleTextProps {}
export interface WelfareTitleTextStickyTopEmits extends WelfareTitleTextEmits {}
