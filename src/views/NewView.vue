<template>
  <div class="new">
    <section>
      <h2>Edit employee</h2>
      <label for="personal-card">Personal card Number </label>
      <input v-model="employeeData.personal_card_id" type="number" id="personal-card">
      <br>
      <label for="name">Full name </label>
      <input v-model="employeeData.full_name" type="text" id="name">
      <br>
      <label for="position">Position </label>
      <input v-model="employeeData.position" type="text" id="position">
      <br>
      <label for="msid">Marital status id </label>
      <select id="msid" v-model="employeeData.marital_status_id">
        <!-- inline object literal -->
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>
      <br>
      <label for="children">Amount of children </label>
      <input v-model="employeeData.children_amount" type="number" id="children">
      <br>
      <label for="salary">Salary </label>
      <input v-model="employeeData.salary" type="number" min="0" id="salary">
      <br>
      <button @click="saveEdited">save</button>
      <button @click="cancelEdit">cancel</button>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NewView',
  data() {
    return {
      employeeData: {
        children_amount: null,
        full_name: null,
        id: null,
        marital_status_id: null,
        personal_card_id: null,
        position: null,
        salary: null,
      },
    };
  },
  methods: {
    saveEdited() {
      axios.post('http://localhost:3000/employees/new', {
        ...this.employeeData,
      })
        .then(() => {
          this.$router.push({ name: 'Home' });
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    cancelEdit() {
      this.employeeData = {
        children_amount: null,
        full_name: null,
        id: null,
        marital_status_id: null,
        personal_card_id: null,
        position: null,
        salary: null,
      };
    },
  },
};
</script>
