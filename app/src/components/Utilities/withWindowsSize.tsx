import React, { useEffect, useState } from 'react'

export interface IWindowSizeProps {
  windowSize: {
    height?: number
    width?: number
    bootstrapBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  }
}

const withWindowSize = <T extends object>(
  WrappedComponent: React.ComponentType<T & IWindowSizeProps>
) => {
  const NewComponent: React.FC<T> = (props: T) => {
    const defaultState: IWindowSizeProps = {
      windowSize: {
        bootstrapBreakpoint: 'sm'
      }
    }

    const [{ windowSize }, setState] = useState(defaultState)

    useEffect(() => {
      const getBootstrapBreakpoint = (width: number): 'xs' | 'sm' | 'md' | 'lg' | 'xl' => {
        if (width < 576) {
          return 'xs'
        }

        if (width < 768) {
          return 'sm'
        }

        if (width < 992) {
          return 'md'
        }

        if (width < 1200) {
          return 'lg'
        }

        return 'xl'
      }

      const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window
        return {
          height,
          width,
          bootstrapBreakpoint: getBootstrapBreakpoint(width)
        }
      }

      setState((s) => ({ ...s, windowSize: getWindowDimensions() }))

      const handleResize = () => {
        setState((s) => ({ ...s, windowSize: getWindowDimensions() }))
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [])

    return <WrappedComponent {...props} windowSize={windowSize} />
  }

  return NewComponent
}

export default withWindowSize
