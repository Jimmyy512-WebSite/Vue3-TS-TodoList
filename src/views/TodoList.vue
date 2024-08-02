<template>
  <div id="TodoList">
    <img class="logo" src="@/assets/logo.png" alt="" />
    <h1>代辦清單</h1>
    <TodoHeader v-model="newTodoInput" @addTodo="addTodoAPI" />
    <TodoContent
      :todoList="todoListData"
      ref="REF_TodoContent"
      @deleteClick="handleDeleteClick"
      @checkClick="handleCheckClick"
      @editTitle="handleEditTitle"
    />
    <div class="line"></div>
    <TodoFooterVue :listNum="unFinishNum" />
    <el-row justify="center">
      <el-col :span="3">
        <el-button type="primary" @click="doIntro">點擊教學</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="success" @click="goGithub"> 原始碼下載 </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import TodoHeader from '../components/TodoList/TodoHeader.vue';
import TodoContent from '../components/TodoList/TodoContent.vue';
import TodoFooterVue from '../components/TodoList/TodoFooter.vue';
import { computed, nextTick, ref } from 'vue';
import { useBaseStore } from '../store/modules/base';
import { GetTodoListModel } from '../api/sys/model/todoListModel';
import { ElMessage } from 'element-plus';
import intro from 'intro.js';
import 'intro.js/minified/introjs.min.css';
let introInstance: any = null;
const doIntro = () => {
  introInstance = intro();
  introInstance
    .setOptions({
      exitOnOverlayClick: false,
      steps: [
        {
          title: 'Welcome',
          intro: '這是vue3 todoList的Demo👋',
        },
        {
          element: document.querySelector('#addTodoInput'),
          intro: '輸入想要添加的內容',
        },
        {
          element: document.querySelector('#addTodoInputBtn'),
          intro: '新增數據',
        },
        {
          element: document.querySelector('.titleInput'),
          intro: '點擊編輯數據',
        },
        {
          element: document.querySelector('.titleCheckBox'),
          intro: '選取資料',
        },
        {
          element: document.querySelector('.deleteIcon'),
          intro: '刪除資料',
        },
        {
          element: document.querySelector('.checkIcon'),
          intro: '將資料改成完成狀態',
        },
      ],
    })
    .onchange(() => {
      const currentStep = introInstance.currentStep();
      if (currentStep === 4) {
        REF_TodoContent.value?.forceEnableFirstSelect();
      }
    })
    .start();
};

const baseStore = useBaseStore();
let newTodoInput = ref('');
let todoListData = ref<GetTodoListModel[]>([]);
let REF_TodoContent = ref<typeof TodoContent>();
// 計算進行中任務的數量
let unFinishNum = computed(() => todoListData.value.filter((it) => it.status === 0).length);

//* 獲取Todo列表
const getTodoListAPI = async () => {
  baseStore.setLoading(true);
  let res = await baseStore.getTodoList();
  console.log('getTodoListAPI res:', res);
  todoListData.value = res.data;
  await nextTick();
  sessionStorage.getItem('isFirstVisit') === '1'
    ? ''
    : (sessionStorage.setItem('isFirstVisit', '1'), doIntro());

  baseStore.setLoading(false);
};

//* 添加Todo
const addTodoAPI = async () => {
  if (newTodoInput.value === '') {
    ElMessage({
      type: 'error',
      message: '新增失敗,請檢查是否有正確輸入',
    });
    return;
  }
  baseStore.setLoading(true);
  let res = await baseStore.addTodo({
    title: newTodoInput.value,
    status: 0,
  });
  todoListData.value.push(res.data);
  baseStore.setLoading(false);
  newTodoInput.value = '';
  ElMessage({
    type: 'success',
    message: '新增成功',
  });
};

//* 刪除指定todo
const handleDeleteClick = async (idArr: number[]) => {
  baseStore.setLoading(true);
  let promiseList = idArr.map((id) => baseStore.deleteTodo({ id }));
  Promise.all(promiseList)
    .then(() => {
      idArr.forEach((id) => {
        const indexPos = todoListData.value.map((it) => it.id).indexOf(id);
        todoListData.value.splice(indexPos, 1);
      });
      ElMessage({
        type: 'success',
        message: '刪除成功',
      });
    })
    .finally(() => {
      baseStore.setLoading(false);
    });
};

//* 變更選取選項的狀態'已完成'
const handleCheckClick = async (idArr: number[]) => {
  baseStore.setLoading(true);
  let promiseList = idArr.map((id) => baseStore.patchTodo({ id, status: 1 }));
  Promise.all(promiseList)
    .then(() => {
      idArr.forEach((id) => {
        const indexPos = todoListData.value.map((it) => it.id).indexOf(id);
        todoListData.value[indexPos].status = 1;
      });
    })
    .finally(() => {
      baseStore.setLoading(false);
    });
};

//* 變更選取標題
const handleEditTitle = async ({ id, editTitle }) => {
  baseStore.setLoading(true);
  let res = await baseStore.patchTodo({
    id,
    title: editTitle,
  });
  const indexPos = todoListData.value.map((it) => it.id).indexOf(id);
  todoListData.value[indexPos] = res.data;
  baseStore.setLoading(false);
};

const goGithub = () => {
  window.open('https://github.com/jimmyy512/Vue3-TS-TodoList');
};

getTodoListAPI();
</script>

<style lang="scss" scoped>
#TodoList {
  width: 100%;
  max-width: 760px;
  margin: 0 auto;

  .logo {
    display: block;
    margin: 0 auto;
    width: 20px;
    height: auto;
    margin-top: 20px;
  }

  h1 {
    text-align: center;
  }

  .line {
    background-color: rgb(202, 199, 199);
    width: 100%;
    height: 1px;
  }
}
</style>
