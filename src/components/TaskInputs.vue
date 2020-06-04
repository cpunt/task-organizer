<template>
  <div>
    <div class='taskInput'>
      <label class='w-100'>Task:
        <input v-model='task.task' class='form-control mb-4' type='text'>
      </label>
    </div>

    <div class='taskInput'>
      <label class='w-100'>Time Frame:
        <select class='form-control mb-3' v-model='task.time.timeframe' @change='toDateMinDate()'>
          <option value='yearly'>Yearly</option>
          <option value='monthly'>Monthly</option>
          <option value='weekly'>Weekly</option>
          <option value='daily' v-if='taskPath.length > 0'>Daily</option>
        </select>
      </label>
    </div>

    <div class='taskInput'>
      <label class='w-100'>Start Date:
        <input v-model='task.time.fromDate'
               class='form-control  d-inline'
               type='date'
               :min='fromDateMin'
               @change='toDateMinDate'
        >
      </label>
    </div>

    <div class='taskInput'>
      <label class='w-100'>End Date:
        <input v-model='task.time.toDate'
               class='form-control d-inline'
               type='date'
               :min='toDateMin'
        >
      </label>
    </div>

  </div>
</template>

<script>
import { addZero, currentDate } from '../js/sharedFunctions.js';

export default {
  name: 'TaskInput',
  props: {
    task: {
      type: Object,
      required: true
    },
    taskPath: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      fromDateMin: this.currentDate(),
      toDateMin: this.currentDate()
    }
  },
  methods: {
    addZero,
    currentDate,
    toDateMinDate() {
      let fromDate = new Date(this.task.time.fromDate),
                     fDYear = fromDate.getFullYear(),
                     fDMonth = fromDate.getMonth(),
                     fDDay = fromDate.getDate();

      switch(this.task.time.timeframe) {
        case 'yearly':
          fDYear++;
          break;
        case 'monthly':
          fDMonth++;
          break;
        case 'weekly':
          fDDay += 7;
          break;
      }

      const toDateMin = new Date(fDYear, fDMonth, fDDay);
      let tDMYear = toDateMin.getFullYear(),
          tDMMonth = this.addZero(toDateMin.getMonth() + 1),
          tDMDay = this.addZero(toDateMin.getDate());

      const date = `${tDMYear}-${tDMMonth}-${tDMDay}`;

      this.toDateMin = date
      this.task.time.toDate = date;
    }
  }
}
</script>

<style scoped>
.taskInput {
  height: 90px;
}
</style>
