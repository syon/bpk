<template>
  <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path class="connector" :d="connectorPath"></path>
    </g>
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
        />
      </g>
      <g>
        <path :d="endHandlePath" class="zz-handleline" />
        <circle :cx="endHandle.x" :cy="endHandle.y" r="5" class="zz-handle" />
      </g>
    </g>
  </svg>
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
    connectorPath() {
      const { startPoint, startHandle, endHandle, endPoint } = this.obj
      return `M${startPoint.x},${startPoint.y} C${startHandle.x},${startHandle.y} ${endHandle.x},${endHandle.y} ${endPoint.x},${endPoint.y}`
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
  stroke: gray;
  stroke-width: 1;
}

.zz-handle {
  fill: none;
  stroke: dodgerblue;
  stroke-width: 1;
}

.zz-handleline {
  stroke: dodgerblue;
  stroke-width: 1;
}
</style>
