<template>
  <g @mousemove="onMousemove">
    <path class="connector" :d="connectorData" />
    <foreignObject x="0" y="0" width="300" height="20">
      <div class="text-xs">{{ connectorData }}</div>
    </foreignObject>
    <g>
      <g>
        <rect
          :x="startPoint.x - 5"
          :y="startPoint.y - 5"
          width="10"
          height="10"
          class="zz-point"
          @pointerdown="dragStart('startPoint')"
          @pointerup="dragStop"
        />
        <text :x="startPoint.x + 15" :y="startPoint.y + 15" font-size="12">
          x:{{ startPoint.x }} y:{{ startPoint.y }}
        </text>
      </g>
      <g>
        <rect
          :x="endPoint.x - 5"
          :y="endPoint.y - 5"
          width="10"
          height="10"
          class="zz-point"
          @pointerdown="dragStart('endPoint')"
          @pointerup="dragStop"
        />
        <text :x="endPoint.x + 15" :y="endPoint.y + 15" font-size="12">
          x:{{ endPoint.x }} y:{{ endPoint.y }}
        </text>
      </g>
      <g>
        <path :d="startHandlePath" class="zz-handleline" />
        <circle
          :cx="startHandle.x"
          :cy="startHandle.y"
          r="5"
          class="zz-handle"
          @pointerdown="dragStart('startHandle')"
          @pointerup="dragStop"
        />
        <text :x="startHandle.x + 15" :y="startHandle.y + 15" font-size="12">
          x:{{ startHandle.x }} y:{{ startHandle.y }}
        </text>
      </g>
      <g>
        <path :d="endHandlePath" class="zz-handleline" />
        <circle
          :cx="endHandle.x"
          :cy="endHandle.y"
          r="5"
          class="zz-handle"
          @pointerdown="dragStart('endHandle')"
          @pointerup="dragStop"
        />
        <text :x="endHandle.x + 15" :y="endHandle.y + 15" font-size="12">
          x:{{ endHandle.x }} y:{{ endHandle.y }}
        </text>
      </g>
    </g>
  </g>
</template>

<script>
export default {
  data: () => ({
    isDragging: false,
    dragProp: '',
    startPoint: { x: 100, y: 100 },
    startHandle: { x: 250, y: 50 },
    endHandle: { x: 200, y: 300 },
    endPoint: { x: 400, y: 250 },
  }),
  computed: {
    startHandlePath() {
      const { startPoint: sp, startHandle: sh } = this
      return `M${sp.x},${sp.y} L${sh.x},${sh.y}`
    },
    endHandlePath() {
      const { endPoint: ep, endHandle: eh } = this
      return `M${ep.x},${ep.y} L${eh.x},${eh.y}`
    },
    connectorData() {
      const {
        startPoint: sp,
        startHandle: sh,
        endHandle: eh,
        endPoint: ep,
      } = this
      return `M${sp.x},${sp.y} C${sh.x},${sh.y} ${eh.x},${eh.y} ${ep.x},${ep.y}`
    },
  },
  methods: {
    dragStart(prop) {
      this.isDragging = true
      this.dragProp = prop
    },
    dragStop() {
      this.isDragging = false
    },
    onMousemove(event) {
      if (!this.isDragging) return false
      const { offsetX, offsetY } = event
      this[this.dragProp].x = offsetX
      this[this.dragProp].y = offsetY
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
  fill: rgba(30, 144, 255, 0.2);
  stroke: dodgerblue;
  stroke-width: 1;
  cursor: pointer;
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
