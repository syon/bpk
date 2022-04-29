<template>
  <main>
    <div id="canvas">
      <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
        <template v-for="(pSet, idx) of lines">
          <auto-bezier :key="`bez-${idx}`" :sp="pSet.sp" :ep="pSet.ep" />
        </template>

        <template v-for="(b, idx) of questBoxes">
          <foreignObject
            :key="`fo-${idx}`"
            width="160"
            height="160"
            :x="b.x"
            :y="b.y"
          >
            <quest-box />
          </foreignObject>
        </template>

        <template v-for="(obj, key) of skeletonSet">
          <g :key="`ske-${key}`">
            <text :x="obj.mx" :y="obj.my - 5" font-size="10" fill="red">
              x:{{ obj.mx }} y:{{ obj.my }}
            </text>
            <rect
              width="160"
              height="160"
              :x="obj.mx"
              :y="obj.my"
              fill="none"
              stroke="red"
            />
            <g v-for="(inp, idx) of obj.in" :key="`inp-${idx}`">
              <circle :cx="inp.x" :cy="inp.y" r="5" fill="red" />
            </g>
            <circle :cx="obj.out.x" :cy="obj.out.y" r="5" fill="orange" />
          </g>
        </template>
      </svg>
    </div>
  </main>
</template>

<script>
const storeBoxSet = {
  aaa: { x: 40, y: 30, inlen: 4 },
  bbb: { x: 280, y: 50, inlen: 3 },
  ccc: { x: 540, y: 80, inlen: 3 },
  ddd: { x: 60, y: 280, inlen: 1 },
  eee: { x: 320, y: 360, inlen: 5 },
  fff: { x: 560, y: 300, inlen: 2 },
}

const storeBonds = [
  { src: 'aaa', dst: 'bbb', dstidx: 1 },
  { src: 'bbb', dst: 'ccc', dstidx: 2 },
  { src: 'ddd', dst: 'eee', dstidx: 3 },
  { src: 'eee', dst: 'fff', dstidx: 0 },
  { src: 'bbb', dst: 'fff', dstidx: 1 },
  { src: 'ddd', dst: 'ccc', dstidx: 1 },
]

export default {
  name: 'Step5Page',
  computed: {
    questBoxes() {
      return storeBoxSet
    },
    skeletonSet() {
      const boxSet = storeBoxSet
      return Object.fromEntries(
        Object.entries(boxSet).map(([key, box]) => {
          const { x, y, inlen } = box
          const inPoints = []
          for (let i = 0; i < inlen; i++) {
            inPoints.push({ x, y: y + 18 * i + 50 })
          }
          const val = {
            mx: x,
            my: y,
            in: inPoints,
            out: { x: x + 160, y: y + 18 },
          }
          return [key, val]
        })
      )
    },
    lines() {
      const bonds = storeBonds
      return bonds.map((b) => {
        const sBox = this.skeletonSet[b.src]
        const dBox = this.skeletonSet[b.dst]
        return {
          sp: sBox.out,
          ep: dBox.in[b.dstidx],
        }
      })
    },
  },
}
</script>

<style>
body {
  background-color: #f8fafd;
}

#canvas {
  width: 800px;
  margin: 2rem auto;
}

svg {
  border: 1px solid #eee;
  box-shadow: 0 2px 12px 4px rgba(0, 0, 0, 0.01);
  margin: 0 auto;
  background-color: #fff;
}
</style>
