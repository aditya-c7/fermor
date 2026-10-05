"use client"

import { useEffect, useState, useMemo, useCallback, memo } from "react"
import { m, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

interface FlipFadeTextProps {
    /**
     * Array of words to cycle through
     * @default ["legible.", "planned.", "invested."]
     */
    words?: string[]
    /**
     * Interval between word changes in milliseconds
     * @default 2600
     */
    interval?: number
    /**
     * Additional CSS classes for the container
     */
    className?: string
    /**
     * Additional CSS classes for the text
     */
    textClassName?: string
    /**
     * Animation duration for each letter in seconds
     * @default 0.5
     */
    letterDuration?: number
    /**
     * Stagger delay between letters on enter in seconds
     * @default 0.1
     */
    staggerDelay?: number
    /**
     * Stagger delay between letters on exit in seconds
     * @default 0.05
     */
    exitStaggerDelay?: number
}

const defaultWords = ["legible.", "planned.", "invested."]

// Memoized Letter component for performance
const Letter = memo(function Letter({
    char,
    letterDuration
}: {
    char: string
    letterDuration: number
}) {
    return (
        <m.span
            style={{ transformStyle: "preserve-3d" }}
            variants={{
                initial: {
                    rotateX: 90,
                    y: 20,
                    opacity: 0,
                    filter: "blur(8px)",
                },
                animate: {
                    rotateX: 0,
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    transition: {
                        duration: letterDuration,
                        ease: [0.2, 0.65, 0.3, 0.9],
                    },
                },
                exit: {
                    rotateX: -90,
                    y: -20,
                    opacity: 0,
                    filter: "blur(8px)",
                    transition: {
                        duration: letterDuration * 0.67,
                        ease: "easeIn",
                    },
                },
            }}
            className="inline-block"
        >
            {char === " " ? "\u00A0" : char}
        </m.span>
    )
})

// Memoized Word component for performance
const Word = memo(function Word({
    text,
    staggerDelay,
    exitStaggerDelay,
    letterDuration,
    textClassName
}: {
    text: string
    staggerDelay: number
    exitStaggerDelay: number
    letterDuration: number
    textClassName?: string
}) {
    const letters = useMemo(() => text.split(""), [text])

    return (
        <m.span
            className={cn(
                "inline-flex font-serif text-[#1A1A1A]",
                textClassName
            )}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
                initial: { opacity: 1 },
                animate: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
                exit: {
                    opacity: 1,
                    transition: {
                        staggerChildren: exitStaggerDelay,
                    },
                },
            }}
        >
            {letters.map((char, i) => (
                <Letter
                    key={`${char}-${i}`}
                    char={char}
                    letterDuration={letterDuration}
                />
            ))}
        </m.span>
    )
})

export function FlipFadeText({
    words = defaultWords,
    interval = 2600,
    className,
    textClassName,
    letterDuration = 0.5,
    staggerDelay = 0.1,
    exitStaggerDelay = 0.05,
}: FlipFadeTextProps) {
    const [index, setIndex] = useState(0)

    // Memoize the interval callback
    const updateIndex = useCallback(() => {
        setIndex((prev) => (prev + 1) % words.length)
    }, [words.length])

    useEffect(() => {
        const timer = setInterval(updateIndex, interval)
        return () => clearInterval(timer)
    }, [updateIndex, interval])

    // Memoize the current word
    const currentWord = useMemo(() => words[index], [words, index])

    return (
        <span className={cn("inline-flex items-baseline", className)}>
            <span className="relative inline-flex items-baseline" style={{ perspective: "1000px" }}>
                <AnimatePresence mode="wait">
                    <Word
                        key={currentWord}
                        text={currentWord}
                        staggerDelay={staggerDelay}
                        exitStaggerDelay={exitStaggerDelay}
                        letterDuration={letterDuration}
                        textClassName={textClassName}
                    />
                </AnimatePresence>
            </span>
        </span>
    )
}

export default FlipFadeText
