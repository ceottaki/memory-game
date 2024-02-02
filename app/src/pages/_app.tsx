import { AppProps } from 'next/app'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { ToastContainer, Toast, Button } from 'react-bootstrap'
import { Workbox, WorkboxLifecycleWaitingEvent } from 'workbox-window'

import '../global-styles/global-styles.scss'

declare global {
  interface Window {
    workbox: Workbox
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const [updateAvailable, setUpdateAvailable] = useState(false)

  useEffect(() => {
    const isWorkboxPresent =
      typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined
    if (isWorkboxPresent) {
      const wb = window.workbox
      // wb.addEventListener('installed', (event) => {
      //   console.log(`Event ${event.type} is triggered.`)
      //   console.log(event)
      // })

      // wb.addEventListener('controlling', (event) => {
      //   console.log(`Event ${event.type} is triggered.`)
      //   console.log(event)
      // })

      // wb.addEventListener('activated', (event) => {
      //   console.log(`Event ${event.type} is triggered.`)
      //   console.log(event)
      // })

      // A common UX pattern for progressive web apps is to show a banner when a service worker has updated and waiting to install.
      // NOTE: MUST set skipWaiting to false in next.config.js pwa object
      // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const promptNewVersionAvailable = (event: WorkboxLifecycleWaitingEvent) => {
        // `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
        // When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
        setUpdateAvailable(true)
      }

      wb.addEventListener('waiting', promptNewVersionAvailable)

      // ISSUE - this is not working as expected, why?
      // I could only make message event listener work when I manually add this listener into sw.js file
      // wb.addEventListener('message', (event) => {
      //   console.log(`Event ${event.type} is triggered.`)
      //   console.log(event)
      // })

      // Never forget to call register as auto register is turned off in next.config.js
      wb.register()
    }
  }, [])

  const dismissUpdateToast = useCallback(() => {
    setUpdateAvailable(false)
  }, [])

  const performAppUpdate = useCallback(() => {
    const isWorkboxPresent =
      typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined
    if (isWorkboxPresent) {
      const wb = window.workbox
      wb.addEventListener('controlling', () => {
        window.location.reload()
      })

      // Send a message to the waiting service worker, instructing it to activate.
      wb.messageSkipWaiting()
      setTimeout(() => {
        wb.messageSkipWaiting()
        dismissUpdateToast()
      }, 100)
    } else {
      dismissUpdateToast()
    }
  }, [dismissUpdateToast])

  return (
    <>
      <Component {...pageProps} />
      <div aria-live='polite' aria-atomic='true'>
        <ToastContainer className='update-toast-container position-fixed' position='bottom-end'>
          <Toast show={updateAvailable} onClose={dismissUpdateToast}>
            <Toast.Header closeButton={true}>
              <Image src='/images/pwa.png' width={20} height={20} alt='Memory Game logo' />
              <strong className='me-auto'>Update Available</strong>
            </Toast.Header>
            <Toast.Body>
              Please click the update button to update your application.
              <br />
              <div className='text-center'>
                <Button size='sm' variant='primary' onClick={performAppUpdate}>
                  Update
                </Button>
              </div>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </>
  )
}

export default MyApp
