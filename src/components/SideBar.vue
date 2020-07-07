<template>
<div class='text-center'>
  <div v-if='!sidebaractive' class='h-100 pt-2' @click='toggleSideBar'>
    <img class='icon' src='../assets/right-arrow.svg' alt='Right Arrow' title='Open SideBar' >
    <!-- <img class='icon my-4' src='../assets/add.svg' alt='Cross' title='Add Task' @click='addTask'> -->
  </div>

  <div v-else class='text-left'>

    <div class='divTop borderBtm'>
      <div class='ml-3 pt-2'>
        <h5 class='d-inline'>Task Organizer</h5>
        <img class='icon mr-3 float-right' src='../assets/left-arrow.svg' alt='left-arrow' title='Close SideBar' @click='toggleSideBar'>
      </div>
    </div>

    <div class='userDiv borderBtm'>
      <div v-if='user'>
        <p class='my-0 ml-3 py-1 font-weight-bold'>Profile</p>
        <p class='my-0 ml-3 py-2'>{{ user.username }}</p>
        <div class='hoverDiv py-2' @click='signOut'>
          <img class='textIcon d-inline ml-3' src='../assets/sidebar/sign.svg' alt='Sign out' title='Sign out'>
          <p class='my-0 text-primary d-inline ml-2 text'>Sign out</p>
        </div>
      </div>
      <div v-else class='hoverDiv py-2' @click='signIn'>
        <img class='textIcon d-inline ml-3' src='../assets/sidebar/sign.svg' alt='Sign In' title='Sign In'>
        <p class='my-0 text-primary d-inline ml-2 text'>Sign in</p>
      </div>
    </div>

    <div>
      <p class='my-0 ml-3 py-2 font-weight-bold'>Features</p>

      <div class='hoverDiv py-2' @click='addTask'>
        <img class='textIcon d-inline ml-3' src='../assets/sidebar/add.svg' alt='Add' title='Add'>
        <p class='my-0 text-primary d-inline ml-2 text'>Add Task</p>
      </div>

      <div class='hoverDiv py-2' :class="{ dropdown: display.fromDate }" @click='display.fromDate = !display.fromDate'>
        <img class='textIcon d-inline ml-3' src='../assets/sidebar/calendar.svg' alt='Calendar' title='Calendar'>
        <p class='my-0 text-primary d-inline ml-2 text'>From Date</p>

        <img v-if='!display.fromDate' class='angle mr-2 d-inline' src='../assets/sidebar/angle-right.svg'>
        <img v-else class='angle mr-2 d-inline' src='../assets/sidebar/angle-down.svg'>

        <div v-if='display.fromDate' class='py-2 dropdown'>
          <input v-model='dateselected'
                 class='ml-3 form-control w-75'
                 type='date'
                 @change='updateDate'
                 @click.stop='stopTheEvent'
          >
        </div>
      </div>

      <div class='hoverDiv py-2' :class="{ dropdown: display.selectTask }" @click='display.selectTask = !display.selectTask'>
        <img class='textIcon d-inline ml-3' src='../assets/sidebar/thumbtack.svg' alt='Thumbtack' title='Thumbtack'>
        <p class='my-0 text-primary d-inline ml-2 text'>Select Task</p>

        <img v-if='!display.selectTask' class='angle mr-2 d-inline' src='../assets/sidebar/angle-right.svg'>
        <img v-else class='angle mr-2 d-inline' src='../assets/sidebar/angle-down.svg'>

        <div v-if='display.selectTask' class='py-2 dropdown'>
          <select class='ml-3 form-control w-75' v-model='taskid' @change='updateTaskSelected' @click.stop='stopTheEvent'>
            <option value=''></option>
            <option v-for='rootid in roots' :key='rootid' :value='rootid'>{{ tasks[rootid].task }}</option>
          </select>
        </div>
      </div>

      <div class='hoverDiv py-2' :class="{ dropdown: display.taskStatus }" @click='display.taskStatus = !display.taskStatus'>
        <img class='textIcon d-inline ml-3' src='../assets/sidebar/status.svg' alt='Status' title='Status'>
        <p class='my-0 text-primary d-inline ml-2 text'>Task Status</p>

        <img v-if='!display.taskStatus' class='angle mr-2 d-inline' src='../assets/sidebar/angle-right.svg'>
        <img v-else class='angle mr-2 d-inline' src='../assets/sidebar/angle-down.svg'>

        <div v-if='display.taskStatus' class='py-2 dropdown'>
          <select class='ml-3 form-control w-75' v-model='taskstatus' @click.stop='stopTheEvent'>
            <option value=''></option>
            <option value='Active'>Active</option>
            <option value='Completed'>Completed</option>
            <option value='Incompleted'>Incompleted</option>
          </select>
        </div>
      </div>

      <div class='hoverDiv py-2' :class="{ dropdown: display.childrenDisplayed }" @click='display.childrenDisplayed = !display.childrenDisplayed'>
        <img class='textIcon d-inline ml-3' src='../assets/sidebar/depth.svg' alt='Depth' title='Depth'>
        <p class='my-0 text-primary d-inline ml-2 text'>Children Displayed</p>

        <img v-if='!display.childrenDisplayed' class='angle mr-2 d-inline' src='../assets/sidebar/angle-right.svg'>
        <img v-else class='angle mr-2 d-inline' src='../assets/sidebar/angle-down.svg'>

        <div v-if='display.childrenDisplayed' class='py-2 dropdown'>
          <select class='ml-3 form-control w-75' v-model='childrendisplayed' @click.stop='stopTheEvent'>
            <option value='0'>0</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
        </div>
      </div>

    </div>
  </div>
</div>
</template>


<script>
import { currentDate } from '../js/sharedFunctions.js';
import { updateTaskSelectedDB } from '../js/server/firestore.js';
import { signIn, signOut } from '../js/server/auth.js';

export default {
  name: 'SideBar',
  props: {
    roots: {
      type: Array,
      required: true
    },
    tasks: {
      type: Object,
      required: true
    },
    taskselected: {
      type: String,
      required: true
    },
    sidebaractive: {
      type: Boolean,
      required: true
    },
    user: {
      type: Object,
      required: false
    }
  },
  data: function() {
    return {
      dateselected: '',
      taskid: this.taskselected,
      taskstatus: '',
      childrendisplayed: 0,
      display: {
        fromDate: false,
        selectTask: false,
        taskStatus: false,
        childrenDisplayed: false
      }
    };
  },
  watch: {
    taskselected(val) {
      this.taskid = val;
    }
  },
  methods: {
    currentDate,
    addTask() {
      this.$emit('add-task', '');
    },
    toggleSideBar() {
      this.$emit('toggle-side-bar');
    },
    updateTaskSelected() {
      updateTaskSelectedDB(this.taskid);
    },
    updateDate() {
      this.$emit('update-date-selected', this.dateselected);
    },
    stopTheEvent(event) {
      event.stopPropagation();
    },
    signIn,
    signOut
  },
  mounted: function() {
    this.dateselected = this.currentDate();
    this.updateDate();
  }
}
</script>


<style scoped>
.icon {
  display: block;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  height: 26px;
}

.borderBtm {
  border-bottom: 1px solid black;
}

.divTop {
  height: 42px;
}

.angle {
  height: 24px;
  float: right;
  vertical-align: middle;
}

.hoverDiv:hover {
  background-color: #e3e3e3;
  cursor: pointer
}

.dropdown {
  background-color: #e3e3e3;
}

.text, .textIcon {
  vertical-align: middle;
}

.textIcon {
  height: 18px;
  width: 18px;
}
</style>
