<!-- 이 컴포넌트의 로직을 TypeScript로 작성하고 선언값을 template에 자동 노출한다. -->
<script setup lang="ts">
// Todo 하나를 표시하고 삭제 이벤트를 발생시키는 자식 컴포넌트를 가져온다.
import TodoItem from './TodoItem.vue'

// Todo 객체 하나의 모양을 재사용할 수 있도록 인터페이스로 정의한다.
interface Todo {
    // Todo의 id는 숫자 타입이다.
    id: number
    // Todo의 title은 문자열 타입이다.
    title: string
    // Todo의 done은 boolean 타입이다.
    done: boolean
// Todo 인터페이스 정의를 끝낸다.
}

// defineProps는 부모 컴포넌트에서 전달받을 props를 선언하는 Vue 컴파일러 매크로다.
// `<...>`는 실행 값이 아니라 TypeScript 타입을 전달하는 제네릭 문법이다.
defineProps<{
    // 바깥쪽 `{}`는 전체 props 객체의 모양이고, 그 안에 todos라는 필수 prop을 선언한다.
    // `Todo[]`의 `[]`는 Todo 객체 여러 개를 담는 배열을 뜻하며 `Array<Todo>`와 같다.
    // 따라서 v-for의 todo는 배열 전체가 아니라 배열 안의 Todo 객체 하나로 추론된다.
    todos: Todo[]
// `}`는 전체 props 타입을 닫고 `>`는 제네릭 타입 인자를 닫는다.
// 마지막 `()`는 defineProps 호출이다. 실행 인자가 없는 이유는 필요한 정보를 위의 타입으로 전달했기 때문이다.
// 반환값을 변수에 담지 않아도 script setup 컴파일러가 todos prop을 template에 자동으로 노출한다.
}>()

// 이 컴포넌트가 부모에게 발생시킬 수 있는 이벤트와 전달값 타입을 선언한다.
const emit = defineEmits<{
    // delete 이벤트는 숫자 id 하나를 전달하며 `[id: number]`는 이벤트 인자 목록을 나타내는 튜플 타입이다.
    delete: [id: number]
// 이벤트 타입과 제네릭을 닫고 defineEmits를 호출하여 emit 함수를 받는다.
}>()

// TodoItem에서 전달된 숫자 id를 받는 이벤트 중계 함수다.
const handleDelete = (id: number) => {
    // 받은 id로 상위 App 컴포넌트에 delete 이벤트를 다시 발생시킨다.
    emit('delete', id)
// handleDelete 함수 정의를 끝낸다.
}
// script setup 로직 영역을 끝낸다.
</script>

<!-- Todo 배열을 실제 목록 UI로 표현하는 영역이다. -->
<template>
    <!-- TodoItem들을 하나의 순서 없는 목록으로 묶는다. -->
    <ul>
        <!-- 각 Todo를 표시할 TodoItem 컴포넌트의 반복과 데이터 연결을 시작한다. -->
        <!-- `v-for`는 todos의 각 항목을 todo로 사용하고 `:key`는 id를 DOM 추적용 키로 지정한다. -->
        <!-- `:id`, `:title`, `:done`은 현재 todo의 각 값을 TodoItem의 같은 이름 prop으로 전달한다. -->
        <!-- `@delete`는 TodoItem의 delete 이벤트를 handleDelete로 받고 마지막 `/>`는 내용 없는 태그를 닫는다. -->
        <TodoItem
            v-for="todo in todos"
            :key="todo.id"
            :id="todo.id"
            :title="todo.title"
            :done="todo.done"
            @delete="handleDelete"
        />
    <!-- ul 목록을 닫는다. -->
    </ul>
<!-- template 영역을 끝낸다. -->
</template>
