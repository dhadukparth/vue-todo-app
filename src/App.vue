<template>
  <div style="max-width: 1280px;" class="mx-auto">
    <Todo />
  </div>
</template>

<script>
import Todo from './page/Todo.vue';

export default {
  name: "App",
  components: {
    Todo
  }
}
</script>