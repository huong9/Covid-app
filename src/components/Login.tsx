import { Button, Form } from "react-bootstrap";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { logIn } from "../redux/actions/userAction";

import { Account } from "../types/account.type";
import { RootState } from "../types/rootState.type";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmpassword, setConfirmpassword] = useState<string>("");
  const dispatch = useDispatch();
  const user = useSelector((store: RootState) => store);
  const history = useHistory();

  useEffect(
    function () {
      if (user.user) {
        history.push("/admin");
      } else {
        history.push("/login");
      }
    },
    [user, history]
  );

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;

    switch (name) {
      case "email": {
        setEmail(value);
        break;
      }
      case "password": {
        setPassword(value);
        break;
      }
      case "confirmpassword": {
        setConfirmpassword(value);
        break;
      }
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const account: Account = { email: email, password: password };
    if (password !== confirmpassword) {
      alert("passwords do not match");
      return;
    }
    dispatch(logIn(account));
  }

  return (
    <Form onSubmit={handleSubmit} className="form">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={email}
          name="email"
          onChange={handleOnChange}
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          name="password"
          onChange={handleOnChange}
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          value={confirmpassword}
          name="confirmpassword"
          onChange={handleOnChange}
          placeholder="Confirm Password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Login;
