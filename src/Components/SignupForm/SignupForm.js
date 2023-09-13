import { Button, Center, Flex, Input } from "@mantine/core";
import React, { useContext, useState } from "react";
import { LoginContext } from "../Context/LoginContext/LoginContext";
import { When } from "react-if";
import axios from "axios";

import "./SignUp.css"; 

export default function SignUp() {
  const [usernameS, setUsernameS] = useState("");
  const [passwordS, setPasswordS] = useState("");
  const [role, setRole] = useState("");
  const { login, loginData } = useContext(LoginContext);

  async function handleSignupSub(e) {
    e.preventDefault();
    try {
      let res = await axios.post("https://hoehoehooo.onrender.com/signup", {
        username: usernameS,
        password: passwordS,
        role: role,
      });
      console.log(res);
      alert(`You have Signed up Successfully ${usernameS}`);
    } catch (err) {
      console.log("login ", err);
    }
    setPasswordS("");
    setUsernameS("");
    setRole("");
  }
  function handlePwChange(e) {
    setPasswordS(e.target.value);
  }
  function handleUnChange(e) {
    setUsernameS(e.target.value);
  }
  function handleRoleChange(e) {
    setRole(e.target.value);
  }

  return (
    <>
      <div className="signup-container">
        <When condition={!loginData.loggedIn}>
          <form onSubmit={handleSignupSub}>
            <Flex
              direction={"column"}
              m={"20px"}
              gap={"20px"} // Increase the gap between form elements
              justify={Center}
              align={Center}
              className="signup-form"
            >
              <Input
                onChange={handleUnChange}
                placeholder="Username"
                required
                size="lg" // Increase the size of the input fields
              />
              <Input
                onChange={handlePwChange}
                placeholder="Password"
                required
                type="password"
                size="lg" // Increase the size of the input fields
              />
              <Input
                onChange={handleRoleChange}
                placeholder="Role (admin, writer, editor, user)"
                required
                type="text"
                size="lg" // Increase the size of the input fields
              />
              <Button type="submit" className="signup-button">
                SignUp
              </Button>
            </Flex>
          </form>
        </When>
      </div>
    </>
  );
}
