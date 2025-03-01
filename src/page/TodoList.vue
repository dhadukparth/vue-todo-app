<template>
  <div class="p-4">
    <div class="d-flex justify-content-between align-items-center border-bottom mb-4 px-3">
      <h1 class="text-center mb-3">Todo List</h1>
      <button v-on:click="btnCreateClick" class="btn btn-outline-primary">Create Todo</button>
    </div>
    <table class="table" width="100%">
      <thead>
        <tr>
          <th scope="col" class="text-center">No</th>
          <th scope="col" class="text-center">Title</th>
          <th scope="col" class="text-center">Description</th>
          <th scope="col" class="text-center">Status</th>
          <th scope="col" class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="todoList.length">
          <tr v-for="(todo, index) in todoList" v-bind:key="todo.id">
            <td>{{ index + 1 }}</td>
            <td>{{ todo.title }}</td>
            <td>{{ todo.description }}</td>
            <td>
              <h6 class="text-center">
                <span v-bind:class="`badge text-bg-${todo.status ? 'success' : 'warning'}`">{{
                  todo.status ? 'Completed' : 'Pending'
                }}</span>
              </h6>
            </td>
            <td>
              <div class="d-flex justify-content-center align-items-center gap-2">
                <!-- change status button -->
                <button
                  v-on:click="changeStatus(todo.id)"
                  type="button"
                  v-bind:class="`btn btn-sm btn-outline-${todo.status ? 'danger' : 'success'}`"
                >
                  <i v-bind:class="`fa-solid fa-${todo.status ? 'xmark' : 'check'}`"></i>
                </button>
                <!-- edit button -->
                <button type="button" v-on:click="btnEditClick(todo.id)" class="btn btn-sm btn-outline-primary">
                  <i class="fa-solid fa-pen"></i>
                </button>
                <!-- delete button -->
                <button
                  type="button"
                  class="btn btn-sm btn-outline-danger"
                  v-on:click="removeTodo(todo.id)"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="4" class="text-center py-5">
            <h2 class="text-secondary">Sorry! todo's not found!!!</h2>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { deleteTodo, getAllTodos, updateStatus } from '@/store/todo'

export default {
  name: 'TodoList',
  props: {
    btnCreateClick: Function,
    btnEditClick: Function,
  },
  data() {
    return {
      todoList: [],
    }
  },
  mounted: async function () {
    await this.fetchAllTodos()
  },
  methods: {
    async fetchAllTodos() {
      const todoList = await getAllTodos()
      this.todoList = todoList
    },
    async changeStatus(todoId) {
      if (todoId) {
        const res = await updateStatus(todoId)
        if (res) {
          alert('Todo is status update successfully.')
          await this.fetchAllTodos()
        } else {
          alert('Sorry! this todo status is not updated.')
        }
      }
    },
    async removeTodo(todoId) {
      if (todoId) {
        const confirmRes = confirm('Are you sure this todo is deleted?')
        if (confirmRes) {
          const res = await deleteTodo(todoId)
          if (res) {
            alert('Todo delete successfully.')
            await this.fetchAllTodos()
          } else {
            alert('Sorry! this todo is not deleted.')
          }
        }
      }
    },
  },
}
</script>
