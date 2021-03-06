# Real-Time-Chat-Application

socket을 한 번 사용해보고자 실시간 채팅 기능을 구현해보는 프로젝트입니다.  

## Index
- [기능](#기능)
  - [맡은 역할](#맡은-역할)
  - [실제 화면](#실제-화면)
- [개발 일지 및 회고](#개발-일지-및-회고)

## 기능
- 실시간으로 채팅을 주고 받을 수 있다.
- 특정 사용자가 현재 입력 중이라면 텍스트로 표기된다.

### 맡은 역할
  - Socket.io와 Express.js를 사용한 채팅 백엔드 구현
  - 채팅 UI 화면 구현

### 실제 화면
![image](https://user-images.githubusercontent.com/51042546/115130207-955d7c80-a028-11eb-9c60-a6c6839f010c.png)  
새로운 사용자가 접속하면 접속 알림이 출력된다. 또한 우측 하단에 현재 메시지를 입력하고 있는 사용자가 있다면 메시지로 출력된다.  
  
![image](https://user-images.githubusercontent.com/51042546/115130239-e66d7080-a028-11eb-8d8e-3ac22e978815.png)
자신이 보낸 메시지와 상대방이 보낸 메시지의 색깔을 달리해 구별하게 하였으며, 상대방이 보낸 메시지의 경우 발신자의 닉네임을 표기한다.

## 개발 일지 및 회고

- velog : <a href="https://velog.io/@shin0805/series/JobITs-%ED%9A%8C%EA%B3%A0%EB%A1%9D" target="_blank">실시간 채팅 in Node.js 개발일지</a>
  
- Socket.io를 한 번 사용해보자는 취지에서 만들기 시작했는데, Socket.io를 사용해 서버를 개발하는 것보다 프론트 쪽을 더 많이 건드는 경우가 더 많았다.  
  
  물론 프론트엔드를 배우고 싶은 마음도 있었지만 아직 백엔드 한 쪽에서도 많이 부족하기 때문에 현재는 해당 프로젝트를 중단했다. 만약 차후 프론트엔드를 배우고 나서는 다시 만들어보고 싶은 마음은 있다.