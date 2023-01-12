import React, { ChangeEvent, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const userInit = {
  email: null,
  nickname: null,
  profile: null,
  telNumber: null,
  address: null
}

function App() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [nickname, setNickName] = useState<string>("");
  const [telNumber, setTelNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [addressDetail, setAddressDetail] = useState<string>("");

  const [userList, setUserList] = useState<any[]>([]);

  const getUserHandler = () => {
    axios.post(`http://localhost:4040/api/auth/`, {
      email,
      password
    })
    .then((response) => {
      if (response.data.data.token) {
        alert('로그인 성공')
      } else {
        alert('실패')
      }
    }).catch((e) => {
      alert('실패')
      console.log(e);
    })
  }
  
  const postUserHandler = () => {
    axios.post(`http://localhost:4040/api/user/`,{
      email,
      password,
      password2,
      nickname,
      telNumber,
      address,
      addressDetail,
    })
    .then((response) => {
      getUserListHandler();
    }).catch((e) => {
      console.log(e);
    })
  }

  const getUserListHandler = () => {
    axios.get(`http://localhost:4040/api/user/`)
    .then((response) => {
      setUserList(response.data.data);
    }).catch((e) => {
      console.log(e);
    })
  }

  useEffect(() => {
    getUserListHandler();
  }, [])

  return (
    <div>
      <div>
        {userList.map((user) => (
          <div style={{display: "flex"}}>
            <div>{user.email}</div>
            <div>{user.nickname}</div>
            <div>{user.telNumber}</div>
            <div>{user.address}</div>
          </div>
        ))}
      </div>
      <input onChange={(e) => setEmail(e.target.value)} placeholder="이메일"/>
      <input onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호"/>
      <input onChange={(e) => setPassword2(e.target.value)} placeholder="비밀번호확인"/>
      <input onChange={(e) => setNickName(e.target.value)} placeholder="닉네임"/>
      <input onChange={(e) => setTelNumber(e.target.value)} placeholder="전화번호"/>
      <input onChange={(e) => setAddress(e.target.value)} placeholder="주소"/>
      <input onChange={(e) => setAddressDetail(e.target.value)} placeholder="상세주소"/>
      <button onClick={() => getUserHandler()}>검색</button>
      <button onClick={() => postUserHandler()}>등록</button>
      { user ? (
        <>
        <h1>{user.email}</h1>
      <h1>{user.nickname}</h1>
      <h1>{user.address}</h1>
        </>
        
      ) : (<></>) }
      
    </div>
  );
}

export default App;
