"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Text3D, Float, Environment, PerspectiveCamera, Center } from "@react-three/drei"

// Individual star component with its own movement
function Star({ position, size, speed, rotationAxis }) {
  const ref = useRef()
  const [randomOffset] = useState(() => Math.random() * Math.PI * 2)
  const [randomSpeed] = useState(() => speed * (0.5 + Math.random() * 0.5))
  const [localMovement] = useState(() => [
    (Math.random() - 0.5) * 0.002,
    (Math.random() - 0.5) * 0.002,
    (Math.random() - 0.5) * 0.002,
  ])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Individual twinkling
    if (ref.current) {
      ref.current.material.opacity = Math.abs(Math.sin(randomOffset + t * 0.5)) * 0.7 + 0.3

      // Individual star movement - small local oscillation
      ref.current.position.x = position[0] + Math.sin(t * randomSpeed + randomOffset) * 0.1
      ref.current.position.y = position[1] + Math.cos(t * randomSpeed + randomOffset) * 0.1
      ref.current.position.z = position[2] + Math.sin(t * randomSpeed * 0.7 + randomOffset) * 0.1
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 4, 4]} />
      <meshBasicMaterial color="#ffffff" transparent={true} opacity={0.7} />
    </mesh>
  )
}

// Star field with multiple layers moving in different directions
function StarField() {
  // Create three different star layers with different movement patterns
  const starLayers = useMemo(() => {
    const layers = []

    // Near layer - faster movement
    const nearStars = []
    for (let i = 0; i < 500; i++) {
      const radius = 10 + Math.random() * 5
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos(2 * Math.random() - 1)

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      nearStars.push({
        position: [x, y, z],
        size: Math.random() * 0.03 + 0.02,
        speed: 0.3 + Math.random() * 0.2,
        rotationAxis: [Math.random(), Math.random(), Math.random()],
      })
    }
    layers.push(nearStars)

    // Mid layer - medium movement
    const midStars = []
    for (let i = 0; i < 500; i++) {
      const radius = 15 + Math.random() * 8
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos(2 * Math.random() - 1)

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      midStars.push({
        position: [x, y, z],
        size: Math.random() * 0.025 + 0.015,
        speed: 0.2 + Math.random() * 0.15,
        rotationAxis: [Math.random(), Math.random(), Math.random()],
      })
    }
    layers.push(midStars)

    // Far layer - slower movement
    const farStars = []
    for (let i = 0; i < 500; i++) {
      const radius = 25 + Math.random() * 10
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos(2 * Math.random() - 1)

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      farStars.push({
        position: [x, y, z],
        size: Math.random() * 0.02 + 0.01,
        speed: 0.1 + Math.random() * 0.1,
        rotationAxis: [Math.random(), Math.random(), Math.random()],
      })
    }
    layers.push(farStars)

    return layers
  }, [])

  // Create refs for each layer group
  const layerRefs = [useRef(), useRef(), useRef()]

  // Animate each layer with different rotation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Layer 1 - rotate one way
    if (layerRefs[0].current) {
      layerRefs[0].current.rotation.y = t * 0.02
      layerRefs[0].current.rotation.x = Math.sin(t * 0.01) * 0.1
    }

    // Layer 2 - rotate another way
    if (layerRefs[1].current) {
      layerRefs[1].current.rotation.y = -t * 0.015
      layerRefs[1].current.rotation.z = Math.sin(t * 0.008) * 0.05
    }

    // Layer 3 - rotate a third way
    if (layerRefs[2].current) {
      layerRefs[2].current.rotation.z = t * 0.01
      layerRefs[2].current.rotation.x = -Math.sin(t * 0.005) * 0.08
    }
  })

  return (
    <>
      {starLayers.map((layer, layerIndex) => (
        <group key={layerIndex} ref={layerRefs[layerIndex]}>
          {layer.map((star, starIndex) => (
            <Star
              key={`${layerIndex}-${starIndex}`}
              position={star.position}
              size={star.size}
              speed={star.speed}
              rotationAxis={star.rotationAxis}
            />
          ))}
        </group>
      ))}
    </>
  )
}

function AnimatedText3D() {
  const textRef = useRef()
  const { viewport } = useThree()

  // Calculate responsive sizes based on viewport
  const isMobile = viewport.width < 3
  const isVerySmall = viewport.width < 2

  // Adjust sizes for different screen sizes
  const nameSize = isVerySmall ? 0.18 : isMobile ? 0.2 : 0.6
  const titleSize = isVerySmall ? 0.06 : isMobile ? 0.06 : 0.15

  // Position adjustments for different screen sizes - keeping the improved spacing
  const namePosition = isVerySmall ? [-0.9, 0.5, 0] : isMobile ? [-1.2, 0.5, 0] : [-2.7, 0.3, 0]
  const titlePosition = isVerySmall ? [-0.8, -0.5, 0] : isMobile ? [-0.85, -0.5, 0] : [-2.3, -0.6, 0]

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <Center>
        <Text3D
          ref={textRef}
          font="/fonts/helvetiker_bold.typeface.json"
          size={nameSize}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          position={namePosition}
        >
          ANAS HMIDAN
          <meshStandardMaterial
            color="#2DD4BF"
            metalness={0.8}
            roughness={0.2}
            emissive="#2DD4BF"
            emissiveIntensity={0.2}
          />
        </Text3D>
      </Center>

      {/* For larger screens - single line title */}
      {!isVerySmall && (
        <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={titleSize}
        position={titlePosition}
        height={0.02}
        bevelEnabled
        bevelThickness={0.005} // Reduce this value for a thinner bevel
        bevelSize={0.005} // Reduce this value for a sharper edge
      >
        IT Student | Information Systems Development
        <meshStandardMaterial 
          color="#94A3B8" 
          metalness={0.5} 
          roughness={0.1} 
          emissive="#94A3B8" 
          emissiveIntensity={1.5} 
        />
      </Text3D>
      )}

      {/* For very small screens - two line title with much more spacing */}
      {isVerySmall && (
        <>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={titleSize}
            position={[titlePosition[0], titlePosition[1] + 0.25, titlePosition[2]]}
            height={0.02}
            bevelEnabled={false}
          >
            IT Student
            <meshStandardMaterial color="#94A3B8" emissive="#94A3B8" emissiveIntensity={0.3} />
          </Text3D>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={titleSize}
            position={[titlePosition[0], titlePosition[1] - 0.25, titlePosition[2]]}
            height={0.02}
            bevelEnabled={false}
          >
            Information Systems Development
            <meshStandardMaterial color="#94A3B8" emissive="#94A3B8" emissiveIntensity={0.3} />
          </Text3D>
        </>
      )}
    </Float>
  )
}

export default function ThreeScene() {
  const [mounted, setMounted] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Handle errors in the 3D scene
  useEffect(() => {
    setMounted(true)

    const handleError = (event) => {
      console.error("ThreeJS error:", event)
      setHasError(true)
    }

    window.addEventListener("error", handleError)

    return () => {
      window.removeEventListener("error", handleError)
    }
  }, [])

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-teal-400">A</span>nas <span className="text-teal-400">H</span>midan
          </h1>
          <p className="text-gray-300 text-xl mb-8">IT Student | Information Systems Development</p>
        </div>
      </div>
    )
  }

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <StarField />
      <AnimatedText3D />
      <Environment preset="city" />
    </Canvas>
  )
}

