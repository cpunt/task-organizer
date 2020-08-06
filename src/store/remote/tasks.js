import Vue from 'vue';
import { getDateIndex } from '../../js/app/appFunctions.js';

export default {
  namespaced: true,
  state: {
    roots: [],
    tasks: {}
  },
  mutations: {
    SET_ROOT(state, id) {
      if(!state.roots.includes(id)) {
        state.roots.push(id);
      }
    },
    SET_TASK(state, { id, task }) {
      Vue.set(state.tasks, id, task);
    },
    DELETE_TASK(state, id) {
      Vue.delete(state.tasks, id);
    },
    DELETE_ROOT(state, id) {
      const index = state.roots.indexOf(id);

      state.roots.splice(index, 1);
    },
    SET_TASK_HIGHLIGHT(state, id) {
      Vue.set(state.tasks[id], 'highlight', true);
    },
    UNSET_TASK_HIGHLIGHT(state, id) {
      Vue.set(state.tasks[id], 'highlight', false);
    }
  },
  actions: {
    trackTasks({ rootState, state, commit, dispatch }) {
      rootState.db.collection('users')
        .doc(rootState.user.email)
        .collection('tasks')
        .onSnapshot(querySnapshot => {
          console.log('Im doing something');
          const timeframes = [];
          let oldStartDate, oldEndDate, newStartDate, newEndDate;

          querySnapshot.docChanges().forEach(change => {
            switch (change.type) {
              case 'modified':
                oldStartDate = new Date(state.tasks[change.doc.id].time.startDate).getTime();
                oldEndDate = new Date(state.tasks[change.doc.id].time.endDate).getTime();
                newStartDate = new Date(change.doc.data().time.startDate).getTime();
                newEndDate = new Date(change.doc.data().time.endDate).getTime();

                if (oldStartDate !== newStartDate || oldEndDate !== newEndDate) {
                  timeframes.push(change.doc.data().time.timeframe);
                }
    
                commit('SET_TASK', {
                  id: change.doc.id,
                  task: change.doc.data()
                });
                break;
              case 'added':
                timeframes.push(change.doc.data().time.timeframe);

                if (!change.doc.data().parent) {
                  commit('SET_ROOT', change.doc.id);
                }

                commit('SET_TASK', {
                  id: change.doc.id,
                  task: change.doc.data()
                });
                break;
              case 'removed':
                timeframes.push(change.doc.data().time.timeframe);

                if (!change.doc.data().parent) {
                  commit('DELETE_ROOT', change.doc.id);
                }

                commit('DELETE_TASK', change.doc.id);
                break;
            }
          });

          timeframes.forEach(timeframe => {
            dispatch('timeframes/setTimeframes', timeframe, { root: true })
          });
        });
    },
    addTask({ rootState }, taskData) {
      const taskParent = taskData.task.parent;
      const addTaskRef = rootState.db.collection('users')
        .doc(rootState.user.email)
        .collection('tasks')
        .add(taskData.task);

      if(taskParent) {
        addTaskRef.then(doc => {
          taskData.parentChildren.push(doc.id);
          rootState.db.collection('users')
            .doc(rootState.user.email)
            .collection('tasks')
            .doc(taskParent)
            .update({
              children: taskData.parentChildren
            });
        });
      }
    },
    updateTask({ rootState }, body) {
      rootState.db.collection('users')
        .doc(rootState.user.email)
        .collection('tasks')
        .doc(body.taskId)
        .update(body.task);
    },
    deleteTask({ rootState, state, getters }, taskId) {
      const parentId = state.tasks[taskId].parent,
            toDelete = getters.getToDelete(taskId),
            tasksRef = rootState.db.collection('users')
              .doc(rootState.user.email)
              .collection('tasks');

      toDelete.forEach(id => {
        tasksRef.doc(id)
          .delete();
      });

      if(parentId) {
        let parentChildren = state.tasks[parentId].children,
            index = parentChildren.indexOf(taskId);

        parentChildren.splice(index, 1);

        tasksRef.doc(parentId)
          .update({
            children: parentChildren
          });
      }
    },
    updateDateTaskCompleted({ rootState, dispatch }, taskData) {
      const dates = taskData.task.dateTaskCompleted;

      if (taskData.completedIndex in dates) {
        delete dates[taskData.completedIndex];
      } else {
        dates[taskData.completedIndex] = true;
      }

      rootState.db.collection('users')
        .doc(rootState.user.email)
        .collection('tasks')
        .doc(taskData.taskId)
        .update({
          dateTaskCompleted: dates
        });

      const time = taskData.task.time;
      const datesTotal = getDateIndex(time.timeframe, new Date(time.startDate), new Date(time.endDate)) + 1;
      const taskComplete = Object.keys(dates).length === datesTotal;

      if(taskComplete != taskData.task.taskCompleted) {
        dispatch('updateTaskCompleted', taskData.taskId);
      }
    },
    updateTaskCompleted({ rootState, getters }, taskId) {
      const taskCompleted = !getters.getTaskCompleted(taskId);

      rootState.db.collection('users')
        .doc(rootState.user.email)
        .collection('tasks')
        .doc(taskId)
        .update({
          taskCompleted: taskCompleted
        });
    },
    highlightTasks({ state, commit } , taskIds) {
      taskIds.forEach(id => {
        if (!('hightlight' in state.tasks[id]) || !state.tasks[id].highlight) {
          commit('SET_TASK_HIGHLIGHT', id);
        }
      });
    },
    unhighlightTasks({ state, commit } , taskIds) {
      taskIds.forEach(id => {
        if (!('hightlight' in state.tasks[id]) || state.tasks[id].highlight) {
          commit('UNSET_TASK_HIGHLIGHT', id);
        }
      });
    }
  },
  getters: {
    getToDelete: state => taskId => {
      let currentId;
      const toDelete = [],
            queue = [];

      queue.push(taskId);
      currentId = queue.pop();

      while(currentId) {
        let children = state.tasks[currentId].children;

        children.forEach(child => {
          queue.push(child);
        });

        toDelete.push(currentId);
        currentId = queue.pop();
      }

      return toDelete;
    },
    getTaskCompleted: state => id => {
      return state.tasks[id].taskCompleted;
    }
  }
}
