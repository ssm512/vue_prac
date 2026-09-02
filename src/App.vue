<!-- Composition API의 script setup 문법을 사용하고 작성 언어를 TypeScript로 지정합니다. -->
<script setup lang="ts">
// 단일 값을 반응형으로 만드는 ref와 객체를 반응형으로 만드는 reactive를 Vue에서 가져옵니다.
import { ref, reactive } from 'vue'

// 사용자 한 명이 가져야 할 데이터 구조를 정의합니다.
interface User {
  // 사용자를 구분하는 숫자형 고유 ID입니다.
  id: number
  // 사용자의 이름을 문자열로 저장합니다.
  name: string
  // 사용자의 이메일을 문자열로 저장합니다.
  email: string
// User 인터페이스 정의를 끝냅니다.
}

// User 객체들을 저장할 빈 배열을 반응형 상태로 만듭니다.
const users = ref<User[]>([])

// 사용자 입력 폼을 반응형 객체로 만듭니다.
const form = reactive({
  // 사용자 ID의 초기값을 0으로 설정합니다.
  id: 0,
  // 사용자 이름의 초기값을 빈 문자열로 설정합니다.
  name: '',
  // 사용자 이메일의 초기값을 빈 문자열로 설정합니다.
  email: ''
// 반응형 폼 객체의 초기값 정의를 끝냅니다.
})

// 현재 폼이 수정 모드인지 나타내는 반응형 값을 false로 초기화합니다.
const isEdit = ref(false)

// 폼 제출 시 사용자를 새로 등록하거나 기존 사용자 정보를 수정하는 함수를 선언합니다.
const saveUser = () => {
  // 현재 수정 모드인지 확인합니다.
  if (isEdit.value) {
    // 사용자 배열에서 폼의 ID와 같은 ID를 가진 사용자를 찾습니다.
    const target = users.value.find(user => user.id === form.id)

    // 수정할 사용자를 찾았는지 확인합니다.
    if (target) {
      // 찾은 사용자의 이름을 폼에 입력된 이름으로 변경합니다.
      target.name = form.name
      // 찾은 사용자의 이메일을 폼에 입력된 이메일로 변경합니다.
      target.email = form.email
    // 수정 대상이 있을 때 실행하는 조건문을 닫습니다.
    }
  // 수정 모드가 아니면 신규 등록 로직을 실행합니다.
  } else {
    // 사용자 배열에 새로운 사용자 객체를 추가합니다.
    users.value.push({
      // 현재 시각을 밀리초로 변환한 값을 새 사용자의 ID로 사용합니다.
      id: Date.now(),
      // 폼에 입력된 이름을 새 사용자의 이름으로 저장합니다.
      name: form.name,
      // 폼에 입력된 이메일을 새 사용자의 이메일로 저장합니다.
      email: form.email
    // 새 사용자 객체 정의와 push 함수 호출을 닫습니다.
    })
  // 수정 여부에 따라 실행되는 조건문을 닫습니다.
  }
  // 저장 작업이 끝난 뒤 입력 폼과 수정 상태를 초기화합니다.
  resetForm()
// saveUser 함수 정의를 끝냅니다.
}

// 선택한 사용자의 정보를 폼에 채우고 수정 모드로 전환하는 함수를 선언합니다.
const editUser = (user: User) => {
  // 선택한 사용자의 ID를 폼에 저장합니다.
  form.id = user.id
  // 선택한 사용자의 이름을 폼에 저장합니다.
  form.name = user.name
  // 선택한 사용자의 이메일을 폼에 저장합니다.
  form.email = user.email

  // 저장 버튼이 수정 기능을 수행하도록 수정 모드를 활성화합니다.
  isEdit.value = true
// editUser 함수 정의를 끝냅니다.
}

// 전달받은 ID를 가진 사용자를 목록에서 삭제하는 함수를 선언합니다.
const deleteUser = (id: number) => {
  // 전달받은 ID와 다른 사용자만 남긴 새 배열을 users에 저장합니다.
  users.value = users.value.filter(user => user.id !== id)
// deleteUser 함수 정의를 끝냅니다.
}

// 입력 폼과 수정 상태를 초기값으로 되돌리는 함수를 선언합니다.
const resetForm = () => {
  // 폼의 사용자 ID를 초기값인 0으로 되돌립니다.
  form.id = 0
  // 폼의 사용자 이름을 빈 문자열로 초기화합니다.
  form.name = ''
  // 폼의 사용자 이메일을 빈 문자열로 초기화합니다.
  form.email = ''
  // 수정 모드를 해제하여 신규 등록 상태로 되돌립니다.
  isEdit.value = false
// resetForm 함수 정의를 끝냅니다.
}
// 컴포넌트의 TypeScript 로직 영역을 끝냅니다.
</script>

<!-- 컴포넌트가 화면에 표시할 HTML 구조를 정의합니다. -->
<template>
  <!-- 사용자 CRUD 화면 전체를 하나의 영역으로 묶습니다. -->
  <div>
    <!-- 화면의 제목을 표시합니다. -->
    <h1>사용자 CRUD</h1>

    <!-- 기본 새로고침을 막고 제출 시 saveUser 함수를 실행하는 입력 폼입니다. -->
    <form @submit.prevent="saveUser">
      <!-- 입력값을 form.name과 연결하고 비어 있을 때 이름 안내 문구를 표시합니다. -->
      <input v-model="form.name" placeholder="이름" />

      <!-- 입력값을 form.email과 연결하고 비어 있을 때 이메일 안내 문구를 표시합니다. -->
      <input v-model="form.email" placeholder="이메일" />

      <!-- 폼을 제출하고 현재 모드에 따라 수정 또는 등록 문구를 표시하는 버튼입니다. -->
      <button type="submit">{{ isEdit ? '수정' : '등록' }}</button>

      <!-- 수정 모드에서만 표시되며 클릭하면 폼을 초기화하는 취소 버튼입니다. -->
      <button v-if="isEdit" type="button" @click="resetForm">취소</button>
    <!-- 사용자 입력 폼을 닫습니다. -->
    </form>

  <!-- 수평선 요소를 닫는 태그입니다. -->
  </hr>

  <!-- 사용자 목록을 표 형태로 표시합니다. -->
  <table>
    <!-- 표의 제목 행 영역을 정의합니다. -->
    <thead>
      <!-- 제목 셀들을 하나의 행으로 묶습니다. -->
      <tr>
        <!-- 사용자 ID 열의 제목을 표시합니다. -->
        <th>ID</th>
        <!-- 사용자 이름 열의 제목을 표시합니다. -->
        <th>이름</th>
        <!-- 사용자 이메일 열의 제목을 표시합니다. -->
        <th>이메일</th>
        <!-- 수정 및 삭제 기능 열의 제목을 표시합니다. -->
        <th>관리</th>
      <!-- 표의 제목 행을 닫습니다. -->
      </tr>
    <!-- 표의 제목 행 영역을 닫습니다. -->
    </thead>

    <!-- 사용자 데이터 행들이 들어갈 표의 본문 영역을 정의합니다. -->
    <tbody>
      <!-- users 배열을 반복해 사용자마다 고유 ID를 키로 사용하는 행을 만듭니다. -->
      <tr v-for="user in users" :key="user.id">
        <!-- 현재 사용자의 ID를 표시합니다. -->
        <td>{{ user.id }}</td>
        <!-- 현재 사용자의 이름을 표시합니다. -->
        <td>{{ user.name }}</td>
        <!-- 현재 사용자의 이메일을 표시합니다. -->
        <td>{{ user.email }}</td>
        <!-- 현재 사용자의 수정 및 삭제 버튼을 담는 셀입니다. -->
        <td>
          <!-- 클릭하면 현재 사용자 정보를 폼에 불러오는 수정 버튼입니다. -->
          <button @click="editUser(user)">수정</button>
          <!-- 클릭하면 현재 사용자의 ID를 전달해 목록에서 삭제하는 버튼입니다. -->
          <button @click="deleteUser(user.id)">삭제</button>
        <!-- 관리 기능을 담는 셀을 닫습니다. -->
        </td>
      <!-- 현재 사용자의 표 행을 닫습니다. -->
      </tr>
    <!-- 표의 본문 영역을 닫습니다. -->
    </tbody>
  <!-- 사용자 목록 표를 닫습니다. -->
  </table>

  <!-- 사용자 CRUD 화면 전체를 감싼 영역을 닫습니다. -->
  </div>
<!-- 컴포넌트의 템플릿 영역을 끝냅니다. -->
</template>
