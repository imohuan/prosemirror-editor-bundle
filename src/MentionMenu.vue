<template>
  <div v-show="visible" class="mention-menu" :style="{ left: position.left, top: position.top }">
    <div
      v-for="(item, index) in resources"
      :key="item.id"
      class="menu-item"
      :class="{ active: index === activeIndex }"
      @mousedown.prevent="$emit('select', item)"
      @mouseenter="$emit('hover', index)"
    >
      <img
        :ref="(el) => setItemRef(el as HTMLImageElement, item)"
        class="w-6 h-6 rounded object-cover"
        draggable="false"
      />
      <span class="text-sm">{{ item.name }}</span>
    </div>
    <div v-if="resources.length === 0" class="px-3 py-2 text-sm text-gray-400">无匹配资源</div>
  </div>
</template>

<script setup lang="ts">
import { onUpdated } from "vue";
import type { ResourceItem, MenuPosition } from "./types";
import { loadImageWithThumbnail } from "./utils";

const props = defineProps<{
  visible: boolean;
  resources: ResourceItem[];
  position: MenuPosition;
  activeIndex: number;
}>();

defineEmits<{
  select: [item: ResourceItem];
  hover: [index: number];
}>();

// 存储每个图片元素的取消加载函数
const cleanupMap = new Map<HTMLImageElement, () => void>();
const itemImgRefs = new Map<string, HTMLImageElement>();

function setItemRef(el: HTMLImageElement | null, item: ResourceItem) {
  if (el) {
    itemImgRefs.set(item.id, el);
    // 清理之前的加载
    const oldCleanup = cleanupMap.get(el);
    if (oldCleanup) oldCleanup();
    
    // 开始新的加载
    const cleanup = loadImageWithThumbnail(el, item, true);
    cleanupMap.set(el, cleanup);
  }
}

// 资源列表更新时重新加载图片
onUpdated(() => {
  props.resources.forEach((item) => {
    const img = itemImgRefs.get(item.id);
    if (img) {
      // 清理之前的加载
      const oldCleanup = cleanupMap.get(img);
      if (oldCleanup) oldCleanup();
      
      // 重新加载
      const cleanup = loadImageWithThumbnail(img, item, true);
      cleanupMap.set(img, cleanup);
    }
  });
});
</script>
