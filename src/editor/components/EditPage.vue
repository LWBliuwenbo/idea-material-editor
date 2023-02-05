<template>
    <div class="editor">
        <MeshListPanel v-model="currentModel" @change="changeModel" />
        <div class="view-panel">
            <canvas id="editor-canvas" width="1000" height="1000"></canvas>
        </div>
        <!-- <div class="hiderimage-panel" >
            <canvas id="hide-canvas" width="1000" height="1000" ></canvas>
        </div> -->
        <PropsEditPanel @props-set="propsSet" @camera-change="cameraChange" @env-set="setEnv" />
    </div>

</template>

<script setup lang="ts">
import { Engine, Camera, PbrLight, PBRMaterial, Vec3, Texture, Model } from "ideagraphics";

import { onMounted, ref, nextTick } from "vue";
import MeshListPanel from "./MeshListPanel.vue";
import PropsEditPanel from "./PropsEditPanel.vue";

enum MeshID {
    Sphere = 'Sphere',
    Teapot = 'Teapot'
}
interface ModelProp {
    image: string,
    id: MeshID,
    name: string
    modelurl: string,
    scale: number
}

interface CameraProps {
    roateVec: Vec3
}

interface EditProps {
    light: PbrLight,
    material: PBRMaterial
}

const camera = new Camera();
const light = new PbrLight();

const currentModel = ref({
    id: MeshID.Sphere,
    modelurl: '/materialeditor/model/sphere.obj',
    name: '球体',
    scale: 0.5
})



let engine: Engine;


const cameraInit = () => {

    camera.lookAt(
        new Vec3(0, 0, 3),
        new Vec3(0, 0, 0),
        new Vec3(0, 1, 0)
    ).persective(45, engine.canvas.width / engine.canvas.height, 0.1, 5);
}

const engineInit = async () => {
    engine = new Engine('editor-canvas')
    engine.setLight(light)

    cameraInit();
    engine.setCamera(camera)

    // material.matrialDiffuseTexture = await Texture.createTexture(engine.gl, './brickwall.jpg') as Texture
    // material.normalMap =  await Texture.createTexture(engine.gl, './brickwall_normal.jpg') as Texture
    // const cube = new Cube();
    // const mesh = meshs[currentMesh.value.id];
    // engine.addGeo(mesh)


    const model = new Model(engine.gl, currentModel.value.id)
    await model.loadOBJ(currentModel.value.modelurl, currentModel.value.scale)

    engine.addModel(model)

    await setEnv(false)
    // const ibl = new IBL(engine.gl, cubenv, model, light)
    // engine.setIBL(ibl)
    engine.drawInit();


}
const engineRender = () => {
    engine.render();
}

const propsSet = (props: EditProps) => {
    engine.updateMaterial(0, props.material)
    engine.updateLight(props.light);
}

const changeModel = async (modelinfo: ModelProp) => {
    const model = new Model(engine.gl, modelinfo.id)
    await model.loadOBJ(modelinfo.modelurl, modelinfo.scale)
    engine.clear();
    engine.addModel(model)
    engineRender();
}

const setEnv = async (showEnv: boolean) => {
    if (showEnv) {
        const cubenv = await Texture.createCubeTexture(engine.gl, 1321, 1321,
            [
                './skybox/front.jpg',
                './skybox/back.jpg',
                './skybox/top.jpg',
                './skybox/bottom.jpg',
                './skybox/right.jpg',
                './skybox/left.jpg',
            ]) as Texture

    
            engine.setEnv(cubenv);
    
    }else {
        engine.setEnv(null);
    }
    engine.drawInit();
    engine.render();
}
const cameraChange = (cameraProps: CameraProps) => {
    cameraInit();

    camera.roateViewX(cameraProps.roateVec.x)
    camera.roateViewY(cameraProps.roateVec.y)

    engine.updateCamera(camera)

    engine.upateEnv(cameraProps.roateVec.x, cameraProps.roateVec.y)
}

onMounted(async () => {
    await nextTick()
    await engineInit();
    engineRender();
})


</script>
<style>
.editor {
    display: flex;
    justify-content: space-between;
}
</style>

