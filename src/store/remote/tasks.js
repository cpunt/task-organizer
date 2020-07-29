import Vue from 'vue';

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
    trackTasks({ rootState, commit, dispatch }) {
      rootState.db.collection('users')
        .doc(rootState.user.email)
        .collection('tasks')
        .onSnapshot(querySnapshot => {
          console.log('Im doing something');
          querySnapshot.docChanges().forEach(change => {
            if(change.type === 'added' || change.type === 'modified') {
              if(!change.doc.data().parent) {
                commit('SET_ROOT', change.doc.id);
              }
              commit('SET_TASK', { id: change.doc.id, task: change.doc.data() });
            }

          });

          dispatch('timeframes/setTimeframes', null, { root: true });
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
    updateTask({ rootState }, taskData) {
      rootState.db.collection('users')
        .doc(rootState.user.email)
        .collection('tasks')
        .doc(taskData.taskId)
        .update(taskData.task);
    },
    deleteTask({ rootState, state, commit, getters }, taskId) {
      const parentId = state.tasks[taskId].parent,
            toDelete = getters.getToDelete(taskId),
            tasksRef = rootState.db.collection('users')
              .doc(rootState.user.email)
              .collection('tasks');

      toDelete.forEach(id => {
        tasksRef.doc(id)
          .delete();

        commit('timeframes/DELETE_TASK', { taskId: id, timeframe: state.tasks[id].time.timeframe }, { root: true });
        commit('DELETE_TASK', id);
      });

      if(parentId) {
        let parentChildren = state.tasks[parentId].children,
            index = parentChildren.indexOf(taskId);

        parentChildren.splice(index, 1);

        tasksRef.doc(parentId)
          .update({
            children: parentChildren
          });
      } else {
        commit('DELETE_ROOT', taskId);
      }
    },
    updateDateTaskCompleted({ rootState, dispatch }, taskData) {
      const dates = taskData.task.dateTaskCompleted;
      dates[taskData.completedIndex] = !dates[taskData.completedIndex];

      rootState.db.collection('users')
        .doc(rootState.user.email)
        .collection('tasks')
        .doc(taskData.taskId)
        .update({
          dateTaskCompleted: dates
        })

      const taskComplete = dates.every((val) => val === true);

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