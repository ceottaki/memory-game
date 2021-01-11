import React, { useEffect } from 'react'

declare global {
  interface Window {
    lazySizes?: any
    loadingLazySizes?: boolean
  }

  interface HTMLImageElement {
    loading: string
  }
}

const withLazyLoading = <T extends {}>(WrappedComponent: React.ComponentType<T>) => {
  const NewComponent: React.FC<T> = (props: T) => {
    useEffect(() => {
      const lazyLoadingImages = Array.from(document.getElementsByTagName('img')).filter((i) => {
        const loadingAttr = i.attributes.getNamedItem('loading')
        return (
          i.loading === 'lazy' ||
          // tslint:disable-next-line: no-string-literal
          (loadingAttr && loadingAttr.nodeValue === 'lazy')
        )
      })

      if ('loading' in HTMLImageElement.prototype) {
        // Lazy loading is provided by the browser.
        // Swap data-src with src and let the browser do the rest.
        lazyLoadingImages.forEach((i) => {
          if (i.dataset.src) {
            i.src = i.dataset.src
          }
        })
      } else {
        // Lazy loading is not provided by the browser, use lazysizes instead.
        lazyLoadingImages.forEach((i) => {
          if (i.dataset.src) {
            i.classList.add('lazyload')
          }
        })

        if (!window.lazySizes && !window.loadingLazySizes) {
          window.loadingLazySizes = true
          const lazySizesLib = import('lazysizes').then(() => {
            window.lazySizes.init()
            window.loadingLazySizes = false
          })
        }
      }
    })

    return <WrappedComponent {...props} />
  }

  return NewComponent
}

export default withLazyLoading
