export enum WelfareModalType {
  main = 'MAIN',
  backup = 'BACKUP'
}

export interface ModalContainerProps<T> {
  component?: any
  props?: T
  events?: T
}

export interface ModalModelParams {
  component: any
  props?: any
}

export interface ModalProvideProps {
  modals: ModalContainerProps<any>[]
}

export interface ModalMutationProps<T> {
  showModal: (params: ModalContainerProps<T>) => void
  closeAllModal: () => void
  closeModalByPop: () => void
  closeModalByIndex: (index: number | number[]) => void
  replaceModal: (params: ModalContainerProps<T>, index?: number) => void
}

export interface BaseNotificationModalProps {
  content?: string
  type?: 'default' | 'warning'
}

export interface BaseNotificationMutationProps<T> extends ModalMutationProps<T> {
  openModal?: (options: T) => void
}

export interface NotificationModalProps extends BaseNotificationModalProps {
  buttonLabel?: string
  onAccept?: () => void
  onClose?: () => void
}

export interface ConfirmModalProps extends BaseNotificationModalProps {
  buttonCancelLabel?: string
  buttonConfirmLabel?: string
  onCancel?: () => void
  onConfirm?: () => void
}

export enum ModalBottomSheetType {
  swipeFullscreen = 'swipe-fullscreen',
  swipeFitContent = 'swipe-fit-content',
  click = 'click'
}

export interface ModalBottomSheetContainerProps<T> extends ModalContainerProps<T> {
  type?: ModalBottomSheetType
  hideHeader?: boolean
  disableDraggingContent?: boolean
  onCloseModalBottom?: () => void
}

export interface ModalBottomSheetMutationProps<T> {
  isShow: boolean
  showModal: (params: ModalBottomSheetContainerProps<T>) => void
  closeModal: () => void
}

export interface ModalBottomSheetProps {
  type?: ModalBottomSheetType
  overlay?: boolean
  overlayClickClose?: boolean
  canSwipe?: boolean
  transitionDuration?: number
  hideHeader?: boolean
  disableDraggingContent?: boolean
}

export interface BaseModalProps {
  title: string
}

export type BaseModalEmits = (e: 'onClose') => void

export type BaseModalContentEmits = (e: 'close') => void

export interface BaseConfirmModalEmits<T> extends BaseModalEmits {
  (e: 'onAccept', data?: T): void
}

export interface BaseContentConfirmModalEmits<T> extends BaseModalContentEmits {
  (e: 'onAccept', data?: T): void
}

export interface BaseApplyCouponConfirmModalEmits extends BaseModalEmits {
  (
    e: 'onAccept',
    data?: {
      orderCarts: any[]
      coupon: {
        discount: number
        total: number
      }
    }
  ): void
}
