<template>
  <div class="pt-5 px-4">
    <div class="mb-4">
      <h1 class="text-center">{{ isEdit ? 'Edit' : 'Create' }} New Todo</h1>
    </div>
    <form @submit="onSubmit">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          placeholder="enter title"
          v-model="formData.title"
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          class="form-control"
          id="description"
          placeholder="enter description"
          rows="6"
          v-model="formData.description"
        ></textarea>
      </div>
      <div class="d-flex gap-2">
        <button type="button" class="btn btn-outline-danger" v-on:click="closeForm">Cancel</button>
        <button type="submit" class="btn btn-primary" v-bind:disabled="loading">
          <Loader v-if="loading" size="small" color="#0000" />
          <span v-else>Submit</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Loader from '@/components/Loader.vue'
import { createTodo, getSingleTodos, updateTodo } from '@/store/todo'

export default {
  name: 'TodoForm',
  components: {
    Loader,
  },
  props: {
    closeForm: {
      type: Function,
    },
    isEdit: {
      type: Number,
    },
  },
  data() {
    return {
      loading: false,
      formData: {
        title: '',
        description: '',
        status: false,
      },
    }
  },
  async created() {
    if (this.isEdit) {
      const res = await getSingleTodos(this.isEdit)
      this.formData = {
        title: res.title,
        description: res.description,
      }
    }
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      try {
        this.loading = true
        const apiData = {
          title: this.formData.title,
          description: this.formData.description,
          status: false,
        }
        // UPDATE TODO FUNCTION HERE
        if (this.isEdit) {
          const result = await updateTodo(this.isEdit, apiData)
          if (result) {
            alert('Todo update successfully')
            this.formData = {
              id: '',
              title: '',
              description: '',
              status: false,
            }
            this.closeForm()
          } else {
            alert('Sorry! This todo is not created')
          }
        } 
        // CREATE TODO FUNCTION HERE
        else {
          const result = await createTodo(apiData)
          if (result) {
            alert('Todo create successfully')
            this.formData = {
              title: '',
              description: '',
              status: false,
            }
            this.closeForm()
          } else {
            alert('Sorry! This todo is not created')
          }
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
