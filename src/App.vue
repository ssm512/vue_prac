<!-- 이 컴포넌트의 로직을 TypeScript로 작성하며, setup 덕분에 선언값을 template에서 바로 사용할 수 있다. -->
<script setup lang="ts">
// Vue에서 반응형 참조 값을 만들 때 사용하는 ref 함수를 가져온다.
import {ref} from 'vue'

// 사용자 한 명이 가져야 할 속성과 각 속성의 타입을 정의한다.
interface User {
  // 사용자를 구분하는 id는 숫자 타입이다.
  id: number
  // 사용자의 이름은 문자열 타입이다.
  name: string
  // 사용자의 나이는 숫자 타입이다.
  age: number
  // 사용자의 이메일은 문자열 타입이다.
  email: string
// User 인터페이스의 타입 정의를 끝낸다.
}

// `<User[]>`는 ref가 User 객체 여러 개로 구성된 배열을 저장한다는 뜻이다.
const users = ref<User[]>([
  // 첫 번째 사용자 객체를 시작한다.
  {
    // 첫 번째 사용자의 고유 번호를 지정한다.
    id: 1,
    // 첫 번째 사용자의 이름을 지정한다.
    name: '홍길동',
    // 첫 번째 사용자의 나이를 지정한다.
    age: 30,
    // 첫 번째 사용자의 이메일을 지정한다.
    email: 'hong@test.com'
  // 첫 번째 사용자 객체를 닫는다.
  },
  // 두 번째 사용자 객체를 시작한다.
  {
    // 두 번째 사용자의 고유 번호를 지정한다.
    id: 2,
    // 두 번째 사용자의 이름을 지정한다.
    name: '김철수',
    // 두 번째 사용자의 나이를 지정한다.
    age: 25,
    // 두 번째 사용자의 이메일을 지정한다.
    email: 'kim@test.com'
  // 두 번째 사용자 객체를 닫는다.
  }
// 사용자 배열과 ref 함수 호출을 닫는다.
])

// 이름 입력창의 현재 문자열을 저장하며 초기값은 빈 문자열이다.
const name = ref<string>('')
// 나이 입력창의 현재 숫자를 저장하며 초기값은 0이다.
const age = ref<number>(0)
// 이메일 입력창의 현재 문자열을 저장하며 초기값은 빈 문자열이다.
const email = ref<string>('')

// 입력값으로 새 사용자를 만들어 목록에 추가하는 함수다.
const addUser = () => {
  // User 타입에 맞는 새 사용자 객체를 생성한다.
  const newUser: User = {
    // 현재 시각의 밀리초 값을 간단한 고유 id로 사용한다.
    id: Date.now(),
    // script에서는 ref가 가진 실제 값에 `.value`로 접근한다.
    name: name.value,
    // 나이 입력값을 새 사용자의 age에 넣는다.
    age: age.value,
    // 이메일 입력값을 새 사용자의 email에 넣는다.
    email: email.value
  // 새 사용자 객체 정의를 닫는다.
  }

  // 반응형 사용자 배열의 끝에 새 사용자 객체를 추가한다.
  users.value.push(newUser)

  // 사용자를 추가한 뒤 이름 입력값을 빈 문자열로 초기화한다.
  name.value = ''
  // 나이 입력값을 0으로 초기화한다.
  age.value = 0
  // 이메일 입력값을 빈 문자열로 초기화한다.
  email.value = ''

// addUser 함수 정의를 끝낸다.
}

// 삭제할 사용자의 숫자 id를 전달받는 함수다.
const deleteUser = (id: number) => {
  // 전달받은 id와 다른 사용자만 filter로 남겨 해당 사용자를 목록에서 제거한다.
  users.value = users.value.filter((user) => user.id !== id)
// deleteUser 함수 정의를 끝낸다.
}
// script setup 로직 영역을 끝낸다.
</script>

<!-- 브라우저 화면에 렌더링할 HTML 구조를 작성하는 영역이다. -->
<template>
  <!-- 사용자 입력 폼과 사용자 목록 전체를 하나로 묶는다. -->
  <div>
    <!-- 페이지의 주 제목을 표시한다. -->
    <h1>사용자 관리</h1>
    <!-- 이름 입력 영역을 묶는다. -->
    <div>
      <!-- 이름 문구와 입력창을 연결된 하나의 라벨 영역으로 묶는다. -->
      <label>
        <!-- 입력창 앞에 이름 항목임을 표시한다. -->
        이름
        <!-- v-model로 입력값과 name ref를 양방향 연결하며 text 타입 입력창을 만든다. -->
        <input v-model="name" type="text"/>
      <!-- 이름 label 요소를 닫는다. -->
      </label>
    <!-- 이름 입력 영역의 div를 닫는다. -->
    </div>

    <!-- 나이 입력 영역을 묶는다. -->
    <div>
      <!-- 주의: `lable`은 표준 HTML `label`의 오타라서 일반 사용자 정의 요소처럼 처리된다. -->
      <lable>
        <!-- 입력창 앞에 나이 항목임을 표시한다. -->
        나이
        <!-- v-model.number로 입력값을 숫자로 변환해 age ref와 연결하고 number 타입 입력창을 만든다. -->
        <input v-model.number="age" type="number" />
      <!-- 위에서 연 lable 요소를 닫는다. 표준 라벨 기능을 쓰려면 시작과 끝을 모두 label로 고쳐야 한다. -->
      </lable>
    <!-- 나이 입력 영역의 div를 닫는다. -->
    </div>

    <!-- 이메일 입력 영역을 묶는다. -->
    <div>
      <!-- 이메일 문구와 입력창을 연결된 하나의 라벨 영역으로 묶는다. -->
      <label>
         <!-- 입력창 앞에 이메일 항목임을 표시한다. -->
         이메일
         <!-- v-model로 입력값과 email ref를 양방향 연결하며 text 타입 입력창을 만든다. -->
         <input v-model="email" type="text" />
      <!-- 이메일 label 요소를 닫는다. -->
      </label>
    <!-- 이메일 입력 영역의 div를 닫는다. -->
    </div>
    
    <!-- 클릭 이벤트가 발생하면 addUser 함수를 실행해 입력한 사용자를 추가한다. -->
    <button @click="addUser">사용자 추가</button>

    <!-- 입력 폼과 사용자 목록 사이에 수평 구분선을 표시한다. -->
    <hr/>

    <!-- 여러 사용자를 표시할 순서 없는 목록을 만든다. -->
    <ul>
      <!-- users 배열을 반복하며 현재 요소를 user로 사용하고 user.id를 DOM 추적용 key로 지정한다. -->
      <li 
        v-for="user in users"
        :key="user.id"
      >
        <!-- 현재 사용자의 이름을 텍스트 보간법으로 출력한다. -->
        {{ user.name }}
        <!-- 사용자 속성 사이의 구분 기호를 출력한다. -->
        /
        <!-- 현재 사용자의 나이를 출력한다. -->
        {{ user.age }}
        <!-- 사용자 속성 사이의 구분 기호를 출력한다. -->
        /
        <!-- 현재 사용자의 이메일을 출력한다. -->
        {{ user.email }}
        <!-- 클릭하면 현재 user의 id를 deleteUser에 전달하는 삭제 버튼이다. -->
        <button @click="deleteUser(user.id)">
          <!-- 삭제 버튼에 표시할 텍스트다. -->
          삭제
        <!-- 삭제 버튼을 닫는다. -->
        </button>
      <!-- 현재 반복 항목의 li 요소를 닫는다. -->
      </li>
    <!-- 사용자 목록 ul 요소를 닫는다. -->
    </ul>
  <!-- 최상위 div 요소를 닫는다. -->
  </div>
<!-- template 영역을 끝낸다. -->
</template>
