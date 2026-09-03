<!-- 이 컴포넌트의 로직을 TypeScript로 작성하며, setup 덕분에 선언값을 template에서 바로 사용할 수 있다. -->
<script setup lang="ts">
// Vue의 반응형 참조 값을 만드는 ref 함수를 가져온다.
import {ref} from 'vue'
// 할 일 목록 전체를 표시하고 삭제 이벤트를 전달할 TodoList 컴포넌트를 가져온다.
import TodoList from './components/TodoList.vue'

// 할 일 객체 하나가 가져야 할 속성과 각 속성의 타입을 정의한다.
interface Todo {
  // 각 할 일을 구분하는 id는 숫자 타입이다.
  id: number
  // 화면에 표시할 제목은 문자열 타입이다.
  title: string
  // 완료 여부는 true 또는 false만 가지는 boolean 타입이다.
  done: boolean
// Todo 인터페이스의 타입 정의를 끝낸다.
}

// `<Todo[]>`는 ref가 보관할 값이 Todo 객체들의 배열임을 지정하는 제네릭 타입 인자다.
// `Todo[]`의 `[]`는 Todo를 여러 개 담는 배열이라는 뜻이며 `Array<Todo>`와 같다.
const todos = ref<Todo[]>([
  // 배열의 첫 번째 Todo 객체를 시작한다.
  {
    // 첫 번째 할 일의 고유 번호다.
    id: 1,
    // 첫 번째 할 일의 제목이다.
    title: 'Vue study',
    // 첫 번째 할 일은 아직 완료되지 않았다.
    done: false
  // 첫 번째 Todo 객체를 닫는다.
  },
  // 배열의 두 번째 Todo 객체를 시작한다.
  {
    // 두 번째 할 일의 고유 번호다.
    id: 2,
    // 두 번째 할 일의 제목이다.
    title: 'Spring study',
    // 두 번째 할 일은 완료되었다.
    done: true
  // 두 번째 Todo 객체를 닫는다.
  },
  // 배열의 세 번째 Todo 객체를 시작한다.
  {
    // 세 번째 할 일의 고유 번호다.
    id: 3,
    // 세 번째 할 일의 제목이다.
    title: 'PostgrSQL study',
    // 세 번째 할 일은 아직 완료되지 않았다.
    done: false
  // 세 번째 Todo 객체를 닫는다.
  }
// Todo 배열을 닫고 ref 함수 호출을 끝낸다.
])

// 하위 컴포넌트가 전달한 id를 받아 해당 할 일을 삭제하는 함수다.
const deleteTodo = (id: number) => {
  // script에서는 ref의 실제 값에 접근할 때 `.value`를 사용한다.
  // filter로 삭제할 id와 다른 항목만 남긴 새 배열을 만들어 todos.value에 저장한다.
  todos.value = todos.value.filter((todo) => todo.id !== id)
// deleteTodo 함수 정의를 끝낸다.
}
// script setup 로직 영역을 끝낸다.
</script>

<!-- 화면에 렌더링할 구조와 컴포넌트를 작성하는 영역이다. -->
<template>
  <!-- 제목과 목록 컴포넌트를 하나로 묶는다. -->
  <div>
    <!-- 화면의 주 제목을 표시한다. -->
    <h1>Todo List</h1>

    <!-- TodoList 컴포넌트의 prop과 이벤트 연결을 시작한다. -->
    <!-- `:todos`의 `:`는 v-bind 축약형이며 todos 배열을 자식의 todos prop으로 전달한다. template에서는 ref가 자동으로 풀린다. -->
    <!-- `@delete`의 `@`는 v-on 축약형이며 TodoList가 보낸 delete 이벤트의 id를 deleteTodo에 전달한다. -->
    <!-- 마지막 `/>`는 내부 내용이 없는 TodoList 컴포넌트 태그를 닫는다. -->
    <TodoList
      :todos="todos"
      @delete="deleteTodo"
    />
  <!-- 최상위 div 요소를 닫는다. -->
  </div>
<!-- template 영역을 끝낸다. -->
</template>
