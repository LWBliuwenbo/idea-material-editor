<template>
    <div class="editor">
        <MeshListPanel v-model="currentMesh" @change="changeMesh" />
        <div class="view-panel">
            <canvas id="editor-canvas" width="1000" height="1000"></canvas>
        </div>
        <PropsEditPanel @props-set="propsSet" />
    </div>
    
</template>

<script setup lang="ts">
import {Engine, Camera, Sphere, PbrLight, PBRMaterial,Vec3 } from "ideagraphics";
import { onMounted,ref } from "vue";
import MeshListPanel from "./MeshListPanel.vue";
import PropsEditPanel from "./PropsEditPanel.vue";

enum MeshID {
    Sphere= 'Sphere'
}
interface mesh {
    image: string,
    id: MeshID,
    name: string
}

interface Meshs {
    Sphere: Sphere
}

interface EditProps {
    light: PbrLight,
    material: PBRMaterial
}

const camera = new Camera();
const light = new PbrLight();

let meshs:Meshs;

const currentMesh  = ref({
    id: MeshID.Sphere,
    name: '',
    image: ''
})

let engine: Engine;
const material : PBRMaterial = new PBRMaterial();

const engineInit = async () => {
    engine = new Engine('editor-canvas')
    engine.setLight(light)

    meshs = {
        Sphere: new Sphere(engine.gl, 0.5, 64, 64)
    }
    
    camera.lookAt(
        new Vec3(0, 0, 3),
        new Vec3(0, 0, 0),
        new Vec3(0, 1, 0)
    ).persective(45, engine.canvas.width / engine.canvas.height, 0.1, 5);

    engine.setCamera(camera)

    // material.matrialDiffuseTexture = await Texture.createTexture(engine.gl, './brickwall.jpg') as Texture
    // material.normalMap =  await Texture.createTexture(engine.gl, './brickwall_normal.jpg') as Texture
    
    let roateX = 0;
    let roateY = 0;
    engine.addMouseMoveListener((degx: number, degy: number)=>{
        roateX += degx;
        roateY += degy;
        engine.scene[0].roateX(roateX)
        engine.scene[0].roateY(roateY)
    });

    // const cube = new Cube();
    const mesh = meshs[currentMesh.value.id];
    engine.addGeo(mesh)
    engine.drawInit();


}
const engineRender =  () => {    
    engine.render();
}

const propsSet = (props:EditProps) => {
    material.setProps(props.material)
    light.setProps(props.light);
    engine.scene[0].setMaterial(material)
    engine.clearAnimate();
    engine.drawInitLight();
    engineRender();
}

const changeMesh = (mesh: mesh) => {
    engine.clear();
    const meshInstance = meshs[mesh.id];
    meshInstance.setMaterial(material)
    engine.addGeo(meshInstance)
    engineRender();
}

onMounted( async()=>{
   await engineInit();
    engineRender();
})

</script>
<style>
.editor {
    display: flex;
}
</style>

