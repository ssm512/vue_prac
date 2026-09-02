<script setup lang="ts">
// Vue에서 반응형 상태를 만들기 위한 ref 함수를 가져옵니다.
import { ref } from 'vue'
// 사용자 한 명을 표시하는 자식 컴포넌트를 가져옵니다.
import UserItem from './UserItem.vue'

// 사용자 객체가 가져야 할 데이터의 타입을 정의합니다.
interface User {
  // 사용자를 구분하는 고유 번호입니다.
  id: number
  // 화면에 표시할 사용자 이름입니다.
  name: string
}

// 사용자 목록을 반응형 배열로 선언하고 초기 사용자 데이터를 저장합니다.
const users = ref<User[]>([
  // 첫 번째 사용자의 고유 번호와 이름입니다.
  { id: 1, name: 'Kim' },
  // 두 번째 사용자의 고유 번호와 이름입니다.
  { id: 2, name: 'Lee' }
])

// 전달받은 고유 번호에 해당하는 사용자를 목록에서 삭제하는 함수입니다.
const deleteUser = (id: number) => {
  // 기존 목록에서 삭제 대상과 고유 번호가 다른 사용자만 남깁니다.
  users.value = users.value.filter(
    // 각 사용자의 고유 번호를 삭제 대상의 고유 번호와 비교합니다.
    (user) => user.id !== id
  )
}
</script>

<template>
  <!-- 여러 사용자 항목을 묶는 순서 없는 목록입니다. -->
  <ul>
    <!-- users 배열을 반복하며 각 사용자 정보와 삭제 이벤트 처리 함수를 자식에게 연결합니다. -->
    <UserItem
      v-for="user in users"
      :key="user.id"
      :user="user"
      @delete="deleteUser"
    />
  </ul>
</template>
