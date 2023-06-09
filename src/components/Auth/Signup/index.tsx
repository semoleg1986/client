import { useMutation } from "@apollo/client";
import { CREATE_SELLER, CREATE_USER } from "../../../graphql/mutation/auth";
import { Button, FormContainer, Input } from "../../Form/Form.styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [createUser] = useMutation(CREATE_USER);
    const [createSeller] = useMutation(CREATE_SELLER);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [showSellerFields, setShowSellerFields] = useState(false);
    const [companyName, setCompanyName] = useState("");
    const [description, setDescription] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    
    const handleCreateUser = async () => {
        try {
          if (!showSellerFields) {
          const { data } = await createUser({
            variables: { email, password, username },
          });
          const createdUserId = data.createUser.user.id;
          setUserId(createdUserId); 
          console.log(createdUserId);

          setShowSellerFields(true);
          // console.log(data);
          // Handle success or perform any other actions
        } else {
          const sellerData = await createSeller({
            variables: {
              companyName: companyName,
              description: description,
              phoneNumber: phoneNumber,
              userId: userId,
            },
          });
          console.log(sellerData);
          navigate('/crud');

          setCompanyName("");
          setDescription("");
          setPhoneNumber("");

          setShowSellerFields(false);
          }
        }
          catch (error) {
          console.error(error);
          // Handle error or display an error message
        }
      };


    return (
        <div>
            <FormContainer>
              {!showSellerFields && (
                <>
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
            </>
           )}

           {showSellerFields && (
            <>
            <Input
              type="text"
              placeholder="company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              type="text"
              placeholder="phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </>
        )}
            <Button onClick={handleCreateUser}>
          {showSellerFields ? "Create Seller" : "Sign Up"}
        </Button>
      </FormContainer>
        </div>
    )
}

export default Signup;