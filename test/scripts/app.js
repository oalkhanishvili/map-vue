Vue.component('tasks', {
  props: ['list'],
  template: '#myComponent',

  data: function(){
    return {
      title: '',
      description: '',
      success: false
    };
  },
  methods:{
    change: function(tasks){
      tasks.display = !tasks.display;
    },
    remove: function(task){
      this.list.$remove(task);
    },
    clearAll: function(){
      this.$root.$data.tasks = this.list.filter(this.inProgress);
      console.log(this.list);
    },
    isCompleted: function(task){
      return task.display;
    },

    inProgress: function(task){
      return !this.isCompleted(task);
    },
    reset: function(){
      this.list = this.list.filter(this.isCompleted);
    },
    addTask: function(){
      this.list.push({body: this.title, display: false});

      this.title = '';
      this.description = '';
      this.success = true;
      setTimeout(function(){
        this.success = false;
      }.bind(this),2000);
    }
  },

  computed: {
    remaining: function(){
      return this.list.filter(this.inProgress).length;
    },
    progressBar: function(){
      return this.list.filter(this.isCompleted).length/this.list.length*100;
    },
    validation: function(){
      return {
        title: !!this.title,
        description: !!this.description
      };
    },
    isValid: function(){
      var validation = this.validation;
      return Object.keys(validation).every(function(key){
        return validation[key];
      });
    }
  }

});
new Vue({
  el: '#app',
  data: {
    popup: false,
    tasks: [
      {body: 'first task', display: true},
      {body: 'second task', display: false},
      {body: 'third task', display: false},
    ]
  }
});
