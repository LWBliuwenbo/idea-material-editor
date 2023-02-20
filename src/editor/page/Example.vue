<template>
    <div class="editor">

        <div class="view-panel">
            <canvas id="editor-canvas" width="1000" height="1000" ref="canvasref" ></canvas>
        </div>
    </div>

</template>

<script setup lang="ts">
import * as THREE from 'three';

import { onMounted, ref, nextTick } from "vue";

const initScene = (canvas: HTMLCanvasElement) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 15);

    const renderer = new THREE.WebGLRenderer({
        canvas
    });

    renderer.setClearColor(0xffffff,1)

    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube1 = new THREE.Mesh(geometry, material);
    const cube2 = new THREE.Mesh(geometry, material);
    scene.add(cube1)
    scene.add(cube2);

    cube1.position.set(-1,0,0);
    cube2.position.set(1,0,0);

    camera.position.set(1,5,10)
    camera.up.set(0,1,0)
    camera.lookAt(cube2.position)

    function animate() {
        requestAnimationFrame(animate);
        camera.rotateOnAxis(new THREE.Vector3(0,0,1), 0.01)

        renderer.render(scene, camera);
    };

    animate();
}

const canvasref = ref(null)


onMounted(async() => {
    await nextTick();
    if(canvasref.value){
        initScene(canvasref.value)
    }
})



</script>
<style scoped>
.editor {
    display: flex;
    justify-content: space-between;
}

canvas {
    border: 1px solid;
}
</style>

