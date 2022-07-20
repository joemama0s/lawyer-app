import React from "react";
import { useRef } from "react";

// TODO FIND OUT WHAT TYPE HANDLE SUBMIT LOGIN IS SUPPOSED TO BE. ITS A FUNCTION
function LoginForm(props: any) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    if (
      null !== usernameRef.current?.value &&
      null !== passwordRef.current?.value
    ) {
      props.handleSubmitLogin(
        usernameRef.current?.value,
        passwordRef.current?.value
      );
    }
  }

  return (
    <div>
      <h1>Username</h1>
      <input ref={usernameRef} type="text" id="username" name="username" />
      <h1>Password</h1>
      <input ref={passwordRef} type="text" id="password" name="password" />
      <h1></h1>
      <button onClick={handleClick}>Sign In</button>
    </div>
  );
}

export default LoginForm;
