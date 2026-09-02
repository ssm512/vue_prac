<script setup lang="ts">
// 사용자 객체가 가져야 할 데이터의 타입을 정의합니다.
interface User {
  // 사용자를 구분하는 고유 번호입니다.
  id: number
  // 화면에 표시할 사용자 이름입니다.
  name: string
}

// 부모 컴포넌트로부터 User 타입의 user 데이터를 전달받습니다.
defineProps<{
  // 이 컴포넌트에서 표시할 사용자 한 명의 정보입니다.
  user: User
}>()

// 부모 컴포넌트로 전달할 delete 이벤트와 매개변수 타입을 정의합니다.
const emit = defineEmits<{
  // delete 이벤트가 사용자의 고유 번호를 전달하도록 지정합니다.
  delete: [id: number]
}>()
</script>

<template>
  <!-- 사용자 한 명의 정보를 목록 항목으로 표시합니다. -->
  <li>
    <!-- 전달받은 사용자의 고유 번호와 이름을 출력합니다. -->
    {{ user.id }} - {{ user.name }}

    <!-- 클릭하면 현재 사용자의 고유 번호를 담은 delete 이벤트를 부모에게 전달합니다. -->
    <button @click="emit('delete', user.id)">
      <!-- 버튼에 표시할 문구입니다. -->
      삭제
    </button>
  </li>
</template>
