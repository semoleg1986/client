import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../../graphql/mutation";
import { Button, FormContainer, Input } from "../../Form/Form.styled";
import { useState } from "react";

const Signup = () => {
    const [createUser] = useMutation(CREATE_USER);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleCreateUser = async () => {
        try {
          const { data } = await createUser({
            variables: { email, password, username },
          });
          console.log(data);
          // Handle success or perform any other actions
        } catch (error) {
          console.error(error);
          // Handle error or display an error message
        }
      };


    return (
        <div>
            <FormContainer>
            <Input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Button onClick={handleCreateUser}>Sig Up</Button>
            </FormContainer>
        </div>


    )
}

export default Signup;