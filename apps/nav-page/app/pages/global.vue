<template>
  <div class=" flex justify-center h-full z-20">
    <canvas class="py-8 rounded-3xl h-full w-full" ref="threeRef">
    </canvas>
  </div>
  <NuxtPage page-key="static"></NuxtPage>


</template>

<script lang="ts" setup>
// canvas 对比 svg
// canvas 的互动性能可能要差了一点
import type { WebGLRenderer } from 'three'
import * as THREE from 'three'
const threeRef = useTemplateRef('threeRef')
defineOptions({
  name: 'global-map'
})

const renderer = shallowRef<WebGLRenderer>()

// init
onMounted(() => {
  const res = threeRef.value?.getBoundingClientRect()

  const width = res?.width
  const height = res?.height
  if (!width || !height) {
    return
  }
  const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10)
  camera.position.z = 1

  const scene = new THREE.Scene()
  const circle = new THREE.RingGeometry(0.4, 0.6)

  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
  const material = new THREE.MeshNormalMaterial()
  const material2 = new THREE.MeshNormalMaterial()

  const mesh = new THREE.Mesh(geometry, material)
  const mesh2 = new THREE.Mesh(circle, material2)

  scene.add(mesh)
  scene.add(mesh2)

  renderer.value = new THREE.WebGLRenderer({
    antialias: true,
    canvas: threeRef.value!
  })

  renderer.value.setSize(width, height)
  renderer.value.setAnimationLoop((time) => {
    mesh.rotation.x = time / 2000
    // mesh2.rotation.x = time / 2000
    mesh.rotation.y = time / 1000
    renderer.value!.render(scene, camera)
  })
})


// animation


</script>

<style>

</style>
