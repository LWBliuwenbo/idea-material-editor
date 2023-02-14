import EditPage from "@/editor/components/EditPage.vue";
import Example from "@/editor/page/Example.vue";
import Example2 from "@/editor/page/Example2.vue";
import Example3 from "@/editor/page/Example3.vue";
import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    { path: '/', component: EditPage },
    { path: '/example1', component: Example },
    { path: '/example2', component: Example2 },
    { path: '/example3', component: Example3 },
]

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

export default router;