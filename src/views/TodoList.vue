<template>
  <div id="TodoList" class="mx-auto max-w-760px max-sm:mx-10px">
    <h1 class="text-center">{{ $t('TodoList.Title') }}</h1>
    <TodoHeader v-model="newTodoInput" @addTodo="addTodoAPI" />
    <TodoContent
      :todoList="todoListData"
      ref="REF_TodoContent"
      @deleteClick="handleDeleteClick"
      @checkClick="handleCheckClick"
      @editTitle="handleEditTitle"
    />

    <div class="bg-[rgb(202,199,199)] w-full h-[1px]"></div>
    <TodoFooterVue :listNum="unFinishNum" />

    <div class="flex w-full justify-center">
      <el-button type="primary" @click="doIntro">{{ $t('TodoList.Teaching') }}</el-button>
      <el-button type="success" @click="goGithub"> {{ $t('TodoList.DownloadCode') }} </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import intro from 'intro.js';
import TodoHeader from '@/components/TodoList/TodoHeader.vue';
import TodoContent from '@/components/TodoList/TodoContent.vue';
import TodoFooterVue from '@/components/TodoList/TodoFooter.vue';
import { GetTodoListModel } from '../api/sys/model/todoListModel';
import { ElMessage } from 'element-plus';
import 'intro.js/minified/introjs.min.css';

const { t } = useI18n();
let introInstance: any = null;
const doIntro = () => {
  introInstance = intro();
  introInstance
    .setOptions({
      exitOnOverlayClick: false,
      steps: [
        {
          title: t('TodoList.Intro.WelcomeTitle'),
          intro: t('TodoList.Intro.Welcome'),
        },
        {
          element: document.querySelector('#addTodoInput'),
          intro: t('TodoList.Intro.InputWhatUWant'),
        },
        {
          element: document.querySelector('#addTodoInputBtn'),
          intro: t('TodoList.Intro.AddData'),
        },
        {
          element: document.querySelector('.titleInput'),
          intro: t('TodoList.Intro.ClickEditData'),
        },
        {
          element: document.querySelector('.titleCheckBox'),
          intro: t('TodoList.Intro.SelectData'),
        },
        {
          element: document.querySelector('.deleteIcon'),
          intro: t('TodoList.Intro.DeleteData'),
        },
        {
          element: document.querySelector('.checkIcon'),
          intro: t('TodoList.Intro.ChangeDataToComplete'),
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

<style lang="scss" scoped></style>
