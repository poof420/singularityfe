'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

const SlimVideoPlayer: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div 
      className="w-full h-full relative bg-zinc-800 rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        loop
        muted={isMuted}
        playsInline
        autoPlay
      >
        <source src="/videos/testfile.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {isHovering && (
        <button
          onClick={toggleMute}
          className="absolute top-2 right-2 text-white hover:text-eva-purple transition-colors opacity-50 hover:opacity-100"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}
    </div>
  )
}

export default SlimVideoPlayer