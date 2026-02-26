"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

type Stage = "countdown" | "almost" | "played"

export function Countdown() {
  const [count, setCount] = useState(10)
  const [stage, setStage] = useState<Stage>("countdown")

  useEffect(() => {
    if (stage !== "countdown") return

    if (count <= 0) {
      setStage("almost")
      return
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [count, stage])

  const handleClick = useCallback(() => {
    setStage("played")
  }, [])

  if (stage === "countdown") {
    return <CountdownDisplay count={count} />
  }

  if (stage === "almost") {
    return <AlmostThereDisplay onClickMe={handleClick} />
  }

  return <PlayedYourselfDisplay />
}

function CountdownDisplay({ count }: { count: number }) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8">
        <p className="text-lg font-medium tracking-widest uppercase text-muted-foreground">
          Get Ready
        </p>
        <div className="relative flex items-center justify-center">
          {/* Pulsing ring */}
          <div
            className="absolute size-48 rounded-full border-2 border-primary/30 animate-ping md:size-64"
            style={{ animationDuration: "1.5s" }}
          />
          <div className="absolute size-48 rounded-full border border-primary/20 md:size-64" />
          {/* Number */}
          <span
            key={count}
            className="text-9xl font-bold tabular-nums text-primary animate-in zoom-in-50 duration-300 md:text-[12rem]"
          >
            {count}
          </span>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-6 rounded-full transition-colors duration-300 md:w-8 ${
                i < 10 - count
                  ? "bg-primary"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

function AlmostThereDisplay({ onClickMe }: { onClickMe: () => void }) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-balance text-center text-5xl font-bold tracking-tight text-foreground md:text-7xl">
            You Almost There
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Just one more step to go.
          </p>
        </div>
        <Button
          size="lg"
          onClick={onClickMe}
          className="h-14 cursor-pointer px-10 text-lg font-semibold shadow-lg shadow-primary/25 transition-transform hover:scale-105 active:scale-95"
        >
          Click Me
        </Button>
      </div>
    </main>
  )
}

function PlayedYourselfDisplay() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8 px-4 animate-in fade-in zoom-in-90 duration-500">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-balance text-center text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Congratulations, You Played Yourself
          </h1>
        </div>
        <div className="relative mt-4 w-full max-w-md overflow-hidden rounded-xl border border-border shadow-2xl shadow-primary/10">
          <Image
            src="/images/smiling.JPG"
            alt="Congratulations, you played yourself"
            width={600}
            height={600}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
        <p className="text-center text-muted-foreground">
          This makes two people that have wasted their time on this project. You and I
        </p>
        <p className="text-center text-muted-foreground">
          Get a life, seriously. And if you have one, get a better one. Maybe go outside, meet some people, do something productive with your time instead of playing around with this dumb project. Just saying. Or you can send me money. That works
        </p>
      </div>
    </main>
  )
}
