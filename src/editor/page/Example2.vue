<template>
    <div class="editor">

        <div class="view-panel" 
         v-loading="loading"
         element-loading-text="模型加载中">
            <canvas id="editor-canvas" width="1000" height="1000"></canvas>
        </div>
    </div>

</template>

<script setup lang="ts">
import { Engine, Camera, PbrLight, Vec3, Cube } from "ideagraphics";

import { onMounted, ref, nextTick } from "vue";


const camera = new Camera();
const light = new PbrLight();




let engine: Engine;

const loading = ref(false)
const cameraInit = () => {
    camera.lookAt(
        new Vec3(0, 0, 4),
        new Vec3(0, 0, 0),
        new Vec3(0, 1, 0)
    ).persective(45, engine.canvas.width / engine.canvas.height, 0.1, 5);
}


const engineInit = async () => {
    engine = new Engine('editor-canvas')
    engine.setLight(light)

    cameraInit();
    engine.setCamera(camera)
    const model = new Cube(engine.gl)

    engine.addModel(model)
    engine.enableHoverByNormal(true);
    engine.drawInit();
}



const engineRender = () => {
    engine.scene[0].roateY(45);
    engine.scene[0].roateX(45);

    engine.render(()=> {
    });
}

onMounted(async () => {
    await nextTick()
    await engineInit();
    engineRender();
})


</script>
<style scoped>
.editor {
    display: flex;
    justify-content: space-between;
}
canvas{
    border: 1px solid;
}
</style>

