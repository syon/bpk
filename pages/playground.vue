<template>
  <main>
    <div class="border mt-8 mx-64">
      <svg
        width="500"
        height="500"
        xmlns="http://www.w3.org/2000/svg"
        @mousemove="onMousemove"
      >
        <simple-path
          :obj="obj"
          @dragStart="dragStartSH"
          @dragStop="dragStopSH"
        />
      </svg>
    </div>
    <div class="absolute top-0">
      <div class="flex flex-col w-32 p-4">
        <label>
          <span>startPointX</span>
          <input v-model="startPointX" type="number" class="border px-2 py-1" />
        </label>
        <label>
          <span>startPointY</span>
          <input v-model="startPointY" type="number" class="border px-2 py-1" />
        </label>

        <label>
          <span>startHandleX</span>
          <input v-model="startHandleX" type="number" class="border px-2 py-1" />
        </label>
        <label>
          <span>startHandleY</span>
          <input v-model="startHandleY" type="number" class="border px-2 py-1" />
        </label>

        <label>
          <span>endHandleX</span>
          <input v-model="endHandleX" type="number" class="border px-2 py-1" />
        </label>
        <label>
          <span>endHandleY</span>
          <input v-model="endHandleY" type="number" class="border px-2 py-1" />
        </label>

        <label>
          <span>endPointX</span>
          <input v-model="endPointX" type="number" class="border p-2" />
        </label>
        <label>
          <span>endPointY</span>
          <input v-model="endPointY" type="number" class="border p-2" />
        </label>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'PlaygroundPage',
  data: () => ({
    isDragging: false,
    startPointX: 100,
    startPointY: 100,
    startHandleX: 250,
    startHandleY: 50,
    endHandleX: 200,
    endHandleY: 300,
    endPointX: 400,
    endPointY: 250,
  }),
  computed: {
    obj() {
      return {
        startPoint: { x: this.startPointX, y: this.startPointY },
        startHandle: { x: this.startHandleX, y: this.startHandleY },
        endHandle: { x: this.endHandleX, y: this.endHandleY },
        endPoint: { x: this.endPointX, y: this.endPointY },
      }
    },
  },
  methods: {
    onMousemove(event) {
      if (!this.isDragging) return false
      const { offsetX, offsetY } = event
      this.startHandleX = offsetX
      this.startHandleY = offsetY
    },
    dragStartSH(eee) {
      this.isDragging = true
    },
    dragStopSH(eee) {
      this.isDragging = false
    },
  },
}
</script>
