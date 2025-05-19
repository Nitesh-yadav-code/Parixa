'use client'

import { useEffect, useRef, useState } from "react"

interface TestTimerProps{
    initialTime: number
    onTimeUpdate: (timeRemaining : number) => void
}
const TestTimer = ({initialTime, onTimeUpdate}: TestTimerProps) => {
    const [timeRemaining, setTimeRemaining] = useState(initialTime)
    const onTimeUpdateRef = useRef(onTimeUpdate)

    useEffect(()=>{
        onTimeUpdateRef.current = onTimeUpdate
    },[onTimeUpdate])

    useEffect(()=>{
        const timer = setInterval(()=>{
            setTimeRemaining((prevTime)=>{
                const newTime = prevTime > 0 ? prevTime-1 : 0
                return newTime
            })
        }, 1000)

        return ()=> clearInterval(timer)
    })

    useEffect(()=>{
        onTimeUpdateRef.current(timeRemaining)
    },[timeRemaining])

//format time as mm:ss
const minutes = Math.floor(timeRemaining / 60)
const seconds = timeRemaining % 60
  return (
    <span>{minutes.toString().padStart(2, "0")}: {seconds.toString().padStart(2, "0")}</span>
  )
}

export default TestTimer