<script setup lang="ts">
// Vue에서 반응형 상태를 만들기 위한 ref 함수를 가져옵니다.
import { ref } from 'vue'

// 입력창과 연결할 사용자 이름을 빈 문자열로 초기화합니다.
const name = ref('')
</script>

<template>
  <!-- 사용자 등록 영역 전체를 감싸는 컨테이너입니다. -->
  <div>
    <!-- 사용자 등록 영역의 제목을 표시합니다. -->
    <h2>사용자 등록</h2>

    <!-- 입력값을 name 상태와 양방향으로 연결하고 안내 문구를 표시합니다. -->
    <input v-model="name"
           placeholder="사용자 이름" />

    <!-- 입력한 사용자 정보를 등록하기 위한 버튼입니다. -->
    <button>
      <!-- 버튼에 표시할 문구입니다. -->
      등록
    </button>
  </div>
</template>

<style scoped>
/* 이 컴포넌트에서만 적용할 스타일을 작성하는 영역입니다. */
</style>
