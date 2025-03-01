<template>
  <div>
    <TodoForm v-if="showTodoForm" v-bind:closeForm="handleCloseForm" v-bind:is-edit="updateTodoId" />
    <TodoList
      v-else
      v-bind:btnCreateClick="handleCreateClick"
      v-bind:btnEditClick="handleEditClick"
    />
  </div>
</template>

<script>
import TodoForm from './TodoForm.vue'
import TodoList from './TodoList.vue'

export default {
  name: 'Todo',
  components: {
    TodoList,
    TodoForm,
  },
  data() {
    return { showTodoForm: false, updateTodoId: null }
  },
  methods: {
    handleCreateClick() {
      this.showTodoForm = true
      this.updateTodoId = null
    },
    handleCloseForm() {
      this.showTodoForm = false
    },
    handleEditClick(todoId) {
      this.showTodoForm = true
      this.updateTodoId = todoId
    },
  },
}
</script>
