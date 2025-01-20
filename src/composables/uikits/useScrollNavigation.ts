import { onMounted, onUnmounted } from 'vue'

export const useScrollNavigation = (callback?: (value: number) => void) => {
  onMounted(() => {
    let lastIndex = 0
    window.addEventListener(
      'scroll',
      () => {
        callback?.(document.documentElement.scrollTop)
        const bottomBar = document.getElementById('bottom-bar')
        const floatButtonBar = document.getElementById('wf-float-button-navigation')
        const hideItems = document?.querySelectorAll('.wf-float-button-navigation-hide')
        if (bottomBar) {
          const headerBreak = bottomBar.clientHeight + 30
          if (lastIndex < document.documentElement.scrollTop) {
            bottomBar.style.transform = `translateY(${headerBreak}px)`
            if (floatButtonBar) {
              floatButtonBar.style.transform = `translateY(${bottomBar.clientHeight}px)`
            }
            lastIndex = document.documentElement.scrollTop
          } else {
            bottomBar.style.transform = `translateY(${0}px)`
            if (floatButtonBar) floatButtonBar.style.transform = `translateY(${0}px)`
            if (lastIndex > 0) lastIndex = document.documentElement.scrollTop
          }
        }
        if (floatButtonBar && hideItems) {
          hideItems.forEach((item: Element) => {
            const htmlItem = item as HTMLElement
            htmlItem.style.display = document.documentElement.scrollTop === 0 ? 'none' : 'flex'
          })
        }
      },
      {
        passive: true
      }
    )
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', () => { })
  })
}
