<template>
  <section class="home">
    <h1>Home page</h1>
    <h2>Employees</h2>
    <template v-if="!editMode">
      <table v-if="employeesList.length " width="100%" border="1px">
        <tr>
          <td>ID</td>
          <td>Personal Card</td>
          <td>Full name</td>
          <td>Position</td>
          <td>Marital status ID</td>
          <td>Amount of children </td>
          <td>Salary</td>
          <td>Delete action</td>
        </tr>
        <tr
          v-for="(e, i) in employeesList"
          :key="i"
        >
          <td
            v-for="(ev, idx) in e"
            :key="idx"
          >
            {{ ev }}
          </td>
          <td>
            <button
              @click="editEmployee(e.id)"
            >Edit</button>
            <button
              @click="deleteEmployee(e.id)"
            >Delete</button>
          </td>
        </tr>
      </table>
    </template>
    <section v-if="editMode">
      <h3>Edit employee</h3>
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
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data() {
    return {
      employeesList: [],
      editMode: false,
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
  created() {
    this.getEmployees();
  },
  methods: {
    getEmployees() {
      axios.get('http://localhost:3000/employees')
        .then((response) => {
          this.employeesList = response.data.data;
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    deleteEmployee(id) {
      axios.post('http://localhost:3000/employees/delete', {
        id,
      })
        .then((response) => {
          this.employeesList = this.employeesList.filter((e) => e.id !== response.data.data.id);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    editEmployee(id) {
      this.editMode = true;
      const item = this.employeesList.filter((e) => e.id === id);
      // eslint-disable-next-line prefer-destructuring
      this.employeeData = item[0];
    },
    saveEdited() {
      axios.post('http://localhost:3000/employees/update', {
        ...this.employeeData,
      })
        .then(() => {
          this.getEmployees();
          this.editMode = false;
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    cancelEdit() {
      this.editMode = false;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
