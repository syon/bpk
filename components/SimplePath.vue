<template>
  <g>
    <path class="connector" :d="connectorData" />
    <g>
      <rect
        :x="startPoint.x - 5"
        :y="startPoint.y - 5"
        width="10"
        height="10"
        class="zz-point"
      />
      <rect
        :x="endPoint.x - 5"
        :y="endPoint.y - 5"
        width="10"
        height="10"
        class="zz-point"
      />
      <g>
        <path :d="startHandlePath" class="zz-handleline" />
        <circle
          :cx="startHandle.x"
          :cy="startHandle.y"
          r="5"
          class="zz-handle"
          @pointerdown="dragStartSH"
          @pointerup="dragStopSH"
        />
      </g>
      <g>
        <path :d="endHandlePath" class="zz-handleline" />
        <circle :cx="endHandle.x" :cy="endHandle.y" r="5" class="zz-handle" />
      </g>
    </g>
  </g>
</template>

<script>
export default {
  props: {
    obj: { type: Object, required: true },
  },
  computed: {
    startPoint() {
      return this.obj.startPoint
    },
    endPoint() {
      return this.obj.endPoint
    },
    startHandle() {
      return this.obj.startHandle
    },
    endHandle() {
      return this.obj.endHandle
    },
    startHandlePath() {
      const { startPoint: sp, startHandle: sh } = this.obj
      return `M${sp.x},${sp.y} L${sh.x},${sh.y}`
    },
    endHandlePath() {
      const { endPoint: ep, endHandle: eh } = this.obj
      return `M${ep.x},${ep.y} L${eh.x},${eh.y}`
    },
    connectorData() {
      const {
        startPoint: sp,
        startHandle: sh,
        endHandle: eh,
        endPoint: ep,
      } = this.obj
      return `M${sp.x},${sp.y} C${sh.x},${sh.y} ${eh.x},${eh.y} ${ep.x},${ep.y}`
    },
  },
  methods: {
    dragStartSH(event) {
      this.$emit('dragStart', event)
    },
    dragStopSH(event) {
      this.$emit('dragStop', event)
    },
  },
}
</script>

<style scoped>
.connector {
  fill: none;
  stroke: black;
  stroke-width: 3px;
}

.zz-point {
  fill: none;
  stroke: dodgerblue;
  stroke-width: 1;
}

.zz-handle {
  fill: rgba(30, 144, 255, 0.2);
  stroke: dodgerblue;
  stroke-width: 1;
  cursor: pointer;
}

.zz-handleline {
  stroke: dodgerblue;
  stroke-width: 1;
}
</style>
