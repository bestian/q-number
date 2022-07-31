<template>
  <q-page class="flex flex-center">
    <div v-show="true || mode == 'all'">
      <div class="item" v-for= "n in s(numbers)" :key="n.n + n.date"> <img class="avatar" :src="n.photoURL" v-show="n.photoURL" :alt="n.n"/> {{n.date}}: {{n.n}}念了<span class="highlight"> {{parseInt(n.number)}} 聲</span>佛號!! </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import firebase from 'firebase/compat/app';
import { getDatabase } from "firebase/database";
import 'firebase/compat/auth';
import { numbersRef } from '../boot/firebase'

export default defineComponent({
  name: 'IndexPage',
  firebase: {
    numbers: numbersRef
  },
  data: () => ({
      date: new Date().getFullYear() +'/'+ parseInt(1+new Date().getMonth()) +'/'+ new Date().getDate(),
      mode: 'today',
      number: 0,
      p: '',
      msg: '',
      key: '',
      edit: '',
      read: 0,
      user: '',
      name: '',
      token: '',
      numbers: [],
      uid: '',
      provider: '',
      photoURL: '',
      dismiss: false

  }),
  methods: {
    t:function (list) {
      var ans = list.filter(function(u) {
        return u.date == new Date().getFullYear() +'/'+ parseInt(1+new Date().getMonth()) +'/'+ new Date().getDate();
      });
      return ans;
    },
    s: function (list) {
      var l = list.slice().sort(function(a, b) {
        var arr1 = a.date.split('/');
        var arr2 = b.date.split('/');
        var ans = (parseInt(arr2[0]) * 36500 + parseInt(arr2[1]) * 3000 + parseInt(arr2[2]) * 100) - (parseInt(arr1[0]) * 36500 + parseInt(arr1[1]) * 3000 + parseInt(arr1[2]) * 100) + parseInt(b.time) - parseInt(a.time);
        return ans;
      })
      return l
    },
    submit: function () {
      var o = {
        uid: this.uid || '123',
        n: this.name,
        photoURL: this.photoURL || 'https://bestian.github.io/number/img/number.jpg',
        time: (new Date()).getTime(),
        date: this.date,
        number: this.number
      }
      if (this.number) {
        debugger;
        if (this.numbers.filter(function(u){
          return u.n == o.n && u.date == o.date
        }).length == 0) {
          this.$firebaseRefs.numbers.push(o);
          this.number = 0;
          window.alert('登入成功:' + o.n + '今天念了' + o.number +  '聲佛號')
        } else {
          window.alert('您今天已經登錄過了，請明天再來')
        }
      } else {
        window.alert('請輸入您今天念了幾聲佛號')
      }
    },
    loginGoogle: function () {
      var vm = this
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        vm.provider = 'google'
        vm.token = result.credential.accessToken
        // The signed-in user info.
        vm.uid = result.user.uid
        console.log(vm.uid)
        vm.user = result.user
        vm.name = localStorage.name || vm.user.displayName
        console.log(vm.user)
        console.log(decodeURI(result.user.photoURL))
        decodeURI(result.user.photoURL)
        vm.photoURL = decodeURI(result.user.photoURL)
        window.alert('Google 登入成功')
        // ...
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // The email of the user's account used.
        var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential
        console.log(errorCode + errorMessage + email + credential)
      })
    }
  },
  mounted() {
    if (localStorage.name) {
      this.name = localStorage.name;
    }
    if (localStorage.dismiss) {
      this.dismiss = localStorage.dismiss;
    }
    const database = getDatabase();
    console.log(database);
    this.numbers = database;
  },
  watch: {
    name(newName) {
      localStorage.name = newName;
    },
    dismiss(newDismiss) {
      localStorage.dismiss = newDismiss;
    }
  }
})
</script>
