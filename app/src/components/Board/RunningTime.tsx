import React, { useEffect, useState } from 'react'

interface IRunningTimeProps {
  startTime: Date
}

interface IRunningTimeState {
  runningTime: Date
  currentTimeout?: NodeJS.Timeout
}

export const RunningTime: React.FC<IRunningTimeProps> = ({ startTime }) => {
  const defaultState: IRunningTimeState = {
    runningTime: new Date(0)
  }

  const [{ runningTime }, setState] = useState(defaultState)

  useEffect(() => {
    const now = new Date()
    const currentTimeout: NodeJS.Timeout = setTimeout(() => {
      setState((s) => ({ ...s, runningTime: new Date(Number(now) - Number(startTime)) }))
    }, 500)

    return () => {
      clearTimeout(currentTimeout)
    }
  }, [startTime, runningTime])

  return (
    <div>
      {runningTime.getUTCHours()}h {runningTime.getUTCMinutes()}m {runningTime.getUTCSeconds()}s
    </div>
  )
}

export default RunningTime
