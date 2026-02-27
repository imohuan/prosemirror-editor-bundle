<template>
  <div class="container">
    <h1>ProseMirror Editor 演示</h1>
    
    <div class="editor-wrapper">
      <ProseMirrorEditor
        v-model="content"
        :resources="resources"
        placeholder="输入 @ 来插入资源..."
        @resource-insert="handleResourceInsert"
      />
    </div>

    <div class="output">
      <h3>输出内容：</h3>
      <pre>{{ content }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ProseMirrorEditor } from '../src/index';
import type { ResourceItem } from '../src/types';

const content = ref('这是一个测试编辑器，输入 @ 可以插入资源');

const resources = ref<ResourceItem[]>([
  {
    id: '1',
    name: '示例图片1',
    url: 'https://picsum.photos/200/300',
    type: 'image',
  },
  {
    id: '2',
    name: '示例图片2',
    url: 'https://picsum.photos/300/200',
    type: 'image',
  },
  {
    id: '3',
    name: '示例图片3',
    url: 'https://picsum.photos/250/250',
    type: 'image',
  },
]);

function handleResourceInsert(resource: ResourceItem) {
  console.log('插入资源:', resource);
}
</script>
