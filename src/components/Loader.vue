<template>
  <div v-bind:class="`spinner-border ${size==='small' ? 'spinner-border-sm': ''}`" role="status" style="color">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<script>
export default {
    name: "Loader",
    props: {
        size: {
          type: String,
          default: "media"
        },
        color: {
          type: String,
          default: '#fff'
        },
    }
}
</script>