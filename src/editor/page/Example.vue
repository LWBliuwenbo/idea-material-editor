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
import { Engine, Camera, PbrLight, Vec3, Model } from "ideagraphics";

import { onMounted, ref, nextTick } from "vue";

enum MeshID {
    Sphere = 'Sphere',
    Teapot = 'Teapot'
}

const camera = new Camera();
const light = new PbrLight();

const currentModel = ref({
    id: MeshID.Sphere,
    modelurl: '/materialeditor/model/cube.obj',
    name: '球体',
    scale: 0.2
})



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
    const model = new Model(engine.gl, currentModel.value.id)
    loading.value = true;
    await model.loadOBJ(currentModel.value.modelurl, currentModel.value.scale)
    loading.value = false;
    engine.addModel(model)
    engine.drawInit();


}

let origin_roate = 0;
const engineRender = () => {

    engine.scene[0].tranlateX(1);
    engine.render(()=> {
        origin_roate += 2;
        engine.scene[0].roateY(origin_roate);
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

