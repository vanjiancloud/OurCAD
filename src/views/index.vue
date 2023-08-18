<script setup lang="ts">
import footerTools from './footer-tools/index.vue'
import layerTree from './layer-tree/index.vue'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Viewer, Controller } from 'ourcad'
import { useRoute } from 'vue-router'
// import { Viewer, Controller } from '../../esm'

const route = useRoute()
let isLoading = ref(true)
let progress = ref(0)

let control: Controller

onMounted(() => {
    const container = <HTMLElement>document.getElementById('container')
    // 加载线上
    // const fileName = route.query.file ? route.query.file as string : '20230713151640518'
    // const view = new Viewer(container, fileName)

    // 加载本地模型
    const modelUrl = new URL('../assets/models/test.dxf', import.meta.url).href
    const view = new Viewer(container, modelUrl)

    view.registFinishCallBack(() => {
        isLoading.value = false
    })
    view.registProgressCallBack(() => {
        progress.value = view.progress
    })

    control = new Controller(view)
})

const tool = ref<any>(null)
let showLayerModelTree = ref(false)
const showOrHiddenLayerTree = (status?: boolean) => {
    if (status !== undefined) {
        showLayerModelTree.value = status
    } else {
        showLayerModelTree.value = !showLayerModelTree.value
    }

    if (tool.value) {
        tool.value.changeIconStatus('layerTree')
    }
}

let showPointer = ref(false)
document.addEventListener('mousedown', () => {
    showPointer.value = true
})
document.addEventListener('mouseup', () => {
    showPointer.value = false
})

// 文字搜索相关
interface optionsItem {
    index: number
    text: string
}
let search = ref()
let options = ref<optionsItem[]>([])
let loading = ref(false) // 是否正在加载数据
const remoteMethod = (query: string) => {
    loading.value = true
    if (query) {
        options.value = control.getSearchList(query) as optionsItem[]
    }
    loading.value = false
}
const positionToSelected = () => {
    control.positionByText(search.value)
}
</script>

<template>
    <div v-if="isLoading" class="loading-box flex-column-center">
        <img class="loading-image" src="../assets/images/ourbim-logo.png" alt="" />
        <div class="loading-progress">
            <div class="load-tip">
                图纸加载中...
                <div>{{ progress }}%</div>
            </div>
            <el-progress type="line" :show-text="false" :percentage="progress"></el-progress>
        </div>
    </div>
    <div class="cad-page" id="CAD-Page">
        <div id="container" :class="['cad-page', showPointer ? 'pointer' : '']">
            <footerTools
                ref="tool"
                :control="control"
                v-if="!isLoading"
                @showOrHiddenLayerTree="showOrHiddenLayerTree"
            ></footerTools>
        </div>

        <layerTree
            v-if="showLayerModelTree"
            :control="control"
            @showOrHiddenLayerTree="showOrHiddenLayerTree"
        ></layerTree>
    </div>

    <!-- <div class="search-input flex-space-between">
        <i class="iconfont icon-sousuo"></i>
        <el-select
            v-model="search"
            filterable
            remote
            placeholder="请输入您想要搜索的内容"
            :remote-method="remoteMethod"
            :loading="loading"
            @change="positionToSelected"
        >
            <el-option v-for="item in options" :key="item.index" :label="item.text" :value="item.index" />
        </el-select>
    </div> -->
</template>
<style scoped lang="less">
.cad-page {
    display: flex !important;
    justify-content: center;
}
.pointer {
    cursor: pointer;
}

.loading-box {
    background-color: #000;
    height: 100%;
    .loading-image {
        width: 80px;
        height: 80px;
        margin-bottom: 30px;
    }
}

.loading-progress {
    position: absolute;
    margin-top: 120px;
    width: 260px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    /deep/ .el-progress {
        margin: 0 auto;
        width: 100%;
        .el-progress-bar__outer {
            background-color: #00a8f054;
        }
        .el-progress-bar__inner {
            line-height: 0;
            background-color: #00aaf0;
        }
    }
    .load-tip {
        width: 100%;
        display: flex;
        margin: 20px 0;
        letter-spacing: 2px;
        color: #00aaf0;
        div {
            margin-left: auto;
        }
    }
}

.search-input {
    position: absolute;
    background-color: white;
    top: 20px;
    right: 20px;
    width: 240px;
    padding: 0 0 0 5px;
    .icon-sousuo {
        font-size: 22px;
    }
    ::v-deep .el-select {
        width: 220px;
    }
    ::v-deep .el-select .el-input__wrapper {
        border-radius: 0;
        box-shadow: none !important;
    }
}
</style>
