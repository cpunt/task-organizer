<template>
<div>
  <div class='taskInputDiv w-75 mt-2'>
    <div class='form-group'>
      <label class='w-100 mb-0 text-left'>Task Parent:
        <select class='form-control mb-0' disabled>
          <option :value='taskParent'>{{ taskParent }}</option>
        </select>
      </label>
    </div>
  </div>

  <div class='taskInputDiv w-75'>
    <label class='w-100 mb-0 text-left'>Task:
      <input v-model='task' type='text' class='form-control' :class='{ invalidInput: errors.task }' maxlength='50' >
    </label>
    <p v-if='errors.task' class='invalidFeedback'>*Task length needs to be between 3-50 characters</p>
  </div>

  <div class='desDiv w-75'>
    <label class='w-100 mb-0 text-left'>Description:
      <textarea v-model='description' class='desTextarea rounded w-100' :class='{ invalidInput: errors.description }' maxlength='500' placeholder='(optional)'>
      </textarea>
    </label>
    <p v-if='errors.description' class='invalidFeedback'>*Description needs to be between 0-500 characters</p>
  </div>

  <div class='taskInputDiv w-75'>
    <div class='form-group'>
      <label class='w-100 mb-0 text-left'>Timeframe:
        <select v-model='timeframe' class='form-control' :class='{ invalidInput: errors.timeframe }' disabled>
          <option value='yearly'>Yearly</option>
          <option value='monthly'>Monthly</option>
          <option value='weekly'>Weekly</option>
          <option value='daily'>Daily</option>
        </select>
      </label>
      <p v-if='errors.timeframe' class='invalidFeedback'>*Timeframe needs to be selected</p>
    </div>
  </div>

  <div class='taskInputDiv w-75'>
    <label class='w-100 mb-0 text-left'>Start Date:
      <input v-model='startDate'
             type='date'
             class='form-control'
             :class='{ invalidInput: errors.startDate }'
             :min='startDateMin'
             :max='startDateMax'
      >
    </label>
    <p v-if='errors.startDate' class='invalidFeedback'>*Start Date needs to be between {{ formatDate(startDateMin) }} - {{ formatDate(startDateMax) }}</p>
  </div>

  <div class='taskInputDiv w-75'>
    <label class='w-100 mb-0 text-left'>End Date:
      <input v-model='endDate'
             type='date'
             class='form-control'
             :class='{ invalidInput: errors.endDate }'
             :min='endDateMin'
             :max='endDateMax'
      >
    </label>
    <p v-if='errors.endDate' class='invalidFeedback'>*End Date needs to be between {{ formatDate(endDateMin) }} - {{ formatDate(endDateMax) }}</p>
  </div>

  <div class='my-2'>
    <button type='button' class='btn btn-info w-25 mx-3' @click='cancelEdit'>Cancel</button>
    <button type='button' class='btn btn-info w-25 mx-3' @click='updateTask'>Update</button>
  </div>
</div>
</template>

<script>
import { startDateMin, startDateMax, endDateMin, endDateMax } from '../js/editTask/editTaskComputed.js';
import { validateTasks } from '../js/createTask/createTaskMethods.js';
import { task, description, timeframe, startDate, endDate } from '../js/createTask/createTaskWatchers.js';
import { formatDate } from '../js/sharedFunctions.js';
import { getDateIndex } from '../js/app/appFunctions.js'

export default {
  name: 'EditTask',
  props: {
    taskobj: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      taskParent: this.taskobj.parent ? this.taskobj.parent.task : null,
      task: this.taskobj.task,
      description: this.taskobj.description,
      timeframe: this.taskobj.time.timeframe,
      startDate: this.taskobj.time.startDate,
      endDate: this.taskobj.time.endDate,
      errors: {
        task: false,
        description: false,
        timeframe: false,
        startDate: false,
        endDate: false
      }
    }
  },
  watch: {
    task,
    description,
    timeframe,
    startDate,
    endDate
  },
  methods: {
    validateTasks,
    validateChildrenDates() {
      if(this.taskobj.children.length > 0) {
        if(this.taskobj.time.startDate != this.startDate || this.taskobj.time.endDate != this.endDate) {
          const startDate = new Date(this.startDate),
                endDate = new Date(this.endDate);

          let child,
              childStartDate,
              childEndDate;

          for(let i = 0; i < this.taskobj.children.length; i++) {
            child = this.taskobj.children[i];
            childStartDate = new Date(child.time.startDate);
            childEndDate = new Date(child.time.endDate);

            if(startDate > childStartDate || endDate < childEndDate) {
              //Error msg
              alert("Subtask dates greater than parent dates. Unable to change dates.");

              //Change startDate and endDate back to default
              this.startDate = this.taskobj.time.startDate;
              this.endDate = this.taskobj.time.endDate;

              return false;
            }
          }
        }
      }

      return true;
    },
    formatDate,
    cancelEdit() {
      this.$emit('cancel-edit');
    },
    updateTask() {
      const validTasks = this.validateTasks(),
            validChildrenDates = this.validateChildrenDates();

      if(validTasks && validChildrenDates) {
        //Will have to update dateTaskCompleted aswell
        if(this.taskobj.task != this.task) {
          this.taskobj.task = this.task;
        }

        if(this.taskobj.description != this.description) {
          this.taskobj.description = this.description;
        }

        if(this.taskobj.time.timeframe != this.timeframe) {
          this.taskobj.time.timeframe = this.timeframe;
        }

        if(this.taskobj.time.endDate != this.endDate || this.taskobj.time.startDate != this.startDate) {
          this.updateDateTaskCompleted();
        }

        if(this.taskobj.time.startDate != this.startDate) {
          this.taskobj.time.startDate = this.startDate;
        }

        if(this.taskobj.time.endDate != this.endDate) {
          this.taskobj.time.endDate = this.endDate;
        }

        this.$emit('close-task');
      }
    },
    updateDateTaskCompleted() {
      const timeframe = this.taskobj.time.timeframe,
            startDate = new Date(this.taskobj.time.startDate),
            endDate = new Date(this.taskobj.time.endDate),
            newStartDate = new Date(this.startDate),
            newEndDate = new Date(this.endDate);


      let startIndex = getDateIndex(timeframe, startDate, newStartDate),
          endIndex = getDateIndex(timeframe, endDate, newEndDate);

      if(startIndex > 0) {
        while(startIndex > 0) {
          startIndex--;
          this.taskobj.dateTaskCompleted.shift();
        }
      } else if(startIndex < 0) {
        while(startIndex < 0) {
          startIndex++;
          this.taskobj.dateTaskCompleted.unshift(false);
        }
      }

      if(endIndex > 0) {
        while(endIndex > 0) {
          endIndex--;
          this.taskobj.dateTaskCompleted.push(false);
        }
      } else if(endIndex < 0) {
        while(endIndex < 0) {
          endIndex++;
          this.taskobj.dateTaskCompleted.pop();
        }
      }

      let dateTaskArr = this.taskobj.dateTaskCompleted

      for(let i = 0; i < dateTaskArr.length; i++) {
        if(dateTaskArr[i] == false) {
          this.taskobj.taskCompleted = false;
          return;
        }
      }

      this.taskobj.taskCompleted = true;
    }
  },
  computed: {
    startDateMin,
    startDateMax,
    endDateMin,
    endDateMax
  }
}
</script>

<style scoped>
.taskInputDiv {
  margin-left: auto;
  margin-right: auto;
  height: 80px;
}

.desTextarea {
  height: 38px;
  min-height: 38px;
  max-height: 150px;
  overflow: scroll;
  border: 1px solid #ced4da;
  color: #495057;
  padding: .375rem .75rem;
  font-size: 1rem;
}

.desTextarea:focus {
  color: #495057;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
}

.desDiv {
  min-height: 70px;
  max-height: 200px;
  margin-left: auto;
  margin-right: auto;
}

.invalidFeedback {
  margin-bottom: 0px;
  text-align: left;
  font-size: 80%;
}

.invalidInput {
  border-color: #dc3545;
}

.invalidInput:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220,53,69,.25);
}
</style>
