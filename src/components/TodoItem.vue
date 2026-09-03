<!-- 이 컴포넌트의 로직을 TypeScript로 작성하고 props 등을 template에 자동 노출한다. -->
<script setup lang="ts">
// defineProps는 부모인 TodoList에서 받을 props의 타입을 선언하는 Vue 컴파일러 매크로다.
// `<...>`는 TypeScript 제네릭이고 안쪽 `{}`는 전체 props 객체의 타입 모양이다.
defineProps<{
    // 전달받을 id prop은 필수 숫자 타입이다.
    id: number
    // 전달받을 title prop은 필수 문자열 타입이다.
    title: string
    // 전달받을 done prop은 필수 boolean 타입이다.
    done: boolean
// `}`와 `>`로 props 타입을 닫고 빈 `()`로 defineProps를 호출한다.
// 반환값을 변수에 담지 않았지만 id, title, done은 template 안에서 자동으로 사용할 수 있다.
}>()

// 이 컴포넌트가 발생시킬 이벤트와 이벤트 인자의 타입을 선언한다.
const emit = defineEmits<{
    // delete 이벤트를 발생시킬 때 숫자 id 하나를 함께 전달해야 한다.
    delete: [id: number]
// 이벤트 타입과 제네릭을 닫고 defineEmits를 호출하여 emit 함수를 받는다.
}>()

// 삭제 이벤트를 함수로 분리하려고 만든 핸들러지만 현재 template에서는 이 함수를 호출하지 않는다.
const handleDelete = () => {
    // 주의: template과 달리 일반 script 함수에는 prop 이름 id가 지역 변수로 자동 선언되지 않는다.
    // 따라서 이 id는 TypeScript가 찾지 못한다. `const props = defineProps<...>()`로 받은 뒤 `props.id`를 사용해야 한다.
    emit('delete', id)
// handleDelete 함수 정의를 끝낸다.
}
// script setup 로직 영역을 끝낸다.
</script>

<!-- Todo 하나의 내용과 삭제 버튼을 화면에 표현하는 영역이다. -->
<template>
    <!-- Todo 한 항목을 나타내는 li 요소다. -->
    <li>
        <!-- 제목과 상태 문구를 한 영역으로 묶는다. -->
        <span>
            <!-- defineProps의 반환값을 변수에 담지 않아도 template에서는 title prop이 자동 노출된다. -->
            {{ title }}

            <!-- done이 true일 때만 이 strong 요소를 렌더링한다. -->
            <strong v-if="done">
                <!-- 완료 상태임을 표시하는 텍스트다. -->
                - 완료
            <!-- 완료 상태용 strong 요소를 닫는다. -->
            </strong>

            <!-- 앞의 v-if 조건이 거짓, 즉 done이 false일 때 이 strong 요소를 렌더링한다. -->
            <strong v-else>
                <!-- 진행 중 상태임을 표시하는 텍스트다. -->
                - 진행중
            <!-- 진행 중 상태용 strong 요소를 닫는다. -->
            </strong>
        <!-- 제목과 상태를 묶은 span 요소를 닫는다. -->
        </span>

        <!-- 클릭 시 handleDelete가 아니라 emit을 직접 호출하므로 현재 화면의 삭제 기능은 정상 동작한다. -->
        <!-- template에서는 props인 id가 자동 노출되므로 아래 id를 정상적으로 찾을 수 있다. -->
        <button @click="emit('delete', id)">
            <!-- 버튼에 표시할 텍스트다. -->
            삭제
        <!-- 삭제 버튼을 닫는다. -->
        </button>
    <!-- Todo 항목 li 요소를 닫는다. -->
    </li>
<!-- template 영역을 끝낸다. -->
</template>
