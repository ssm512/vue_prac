<!-- 이 컴포넌트의 로직을 TypeScript로 작성하고 선언값을 template에 자동 노출한다. -->
<script setup lang="ts">
// defineProps는 부모 컴포넌트로부터 전달받을 props의 타입을 선언하는 Vue 컴파일러 매크로다.
// `<...>`는 TypeScript 제네릭 문법이며 `{}`는 이 컴포넌트가 받을 전체 props 객체의 모양이다.
defineProps<{
    // v-model을 통해 부모가 전달하는 현재 입력값은 modelValue라는 필수 문자열 prop으로 받는다.
    modelValue: string
// `}`와 `>`로 props 타입을 닫고 빈 `()`로 defineProps를 호출한다.
// 반환값을 변수에 담지 않아도 script setup이 modelValue를 template에 자동으로 노출한다.
}>()

// defineEmits는 이 컴포넌트가 부모에게 발생시킬 이벤트와 전달값의 타입을 선언한다.
const emit = defineEmits<{
    // `update:modelValue`는 기본 v-model이 변경값을 전달할 때 사용하는 정해진 이벤트 이름이다.
    // `[value: string]`은 이 이벤트가 value라는 문자열 인자 하나를 전달한다는 튜플 타입이다.
    'update:modelValue': [value: string]
// 이벤트 타입과 제네릭을 닫고 defineEmits를 호출하여 이벤트 발생 함수 emit을 받는다.
}>()
// script setup 로직 영역을 끝낸다.
</script>

<!-- 실제 검색 입력창을 화면에 렌더링하는 영역이다. -->
<template>
    <!-- input 요소의 여러 줄 속성은 아래와 같이 동작한다. -->
    <!-- `type="text"`는 문자열을 입력하는 일반 텍스트 입력창으로 지정한다. -->
    <!-- `:value="modelValue"`는 부모로부터 받은 현재 값을 input의 value 속성에 단방향으로 연결한다. -->
    <!-- `@input`은 사용자가 입력할 때 발생하는 DOM input 이벤트를 감지한다. -->
    <!-- emit 호출은 새 문자열로 `update:modelValue` 이벤트를 발생시켜 부모의 v-model 값을 갱신한다. -->
    <!-- `emit(`은 이벤트 발생 함수 호출의 시작이고 첫 번째 인자는 발생시킬 이벤트 이름이다. -->
    <!-- 두 번째 인자인 `($event.target as HTMLInputElement).value`는 이벤트 대상을 input으로 간주하고 현재 문자열을 읽는다. -->
    <!-- 마지막 `)`는 emit 호출, `"`는 @input 표현식, `/>`는 내용이 없는 input 요소를 각각 닫는다. -->
    <input
        type="text"
        :value="modelValue"
        @input="
            emit(
                'update:modelValue',
                ($event.target as HTMLInputElement).value
            )
        "
    />
<!-- template 영역을 끝낸다. -->
</template>
