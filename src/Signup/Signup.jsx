import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Alert,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isFullNameValid, setIsFullNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    setIsFormValid(isFullNameValid && isEmailValid && isPasswordValid);
  }, [isFullNameValid, isEmailValid, isPasswordValid]);

  const handleFullNameChange = (event) => {
    const value = event.target.value;
    if (/^[a-zA-Z ]*$/.test(value) || value === "") {
      setFullName(value);
      setIsFullNameValid(true);
    } else {
      setIsFullNameValid(false);
    }
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);

    if (/^\S+@\S+\.\S+$/.test(value) || value === "") {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasDigit = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*]/.test(value);

    if (value.length >= 10 && hasLowerCase && hasDigit && hasSpecialChar) {
      setPasswordStrength("strong");
      setIsPasswordValid(true);
    } else if (
      value.length >= 6 &&
      (hasLowerCase || hasDigit || hasSpecialChar)
    ) {
      setPasswordStrength("moderate");
      setIsPasswordValid(true);
    } else {
      setPasswordStrength("weak");
      setIsPasswordValid(false);
    }
  };

  const handleRegister = () => {
    if (isFullNameValid && isEmailValid && isPasswordValid) {
      setIsSuccessModalOpen(true);
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <Box p={6} bg="gray.100" borderRadius="md" boxShadow="md">
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "16px",
          color: "#333",
        }}
      >
        Signup
      </h1>
      <FormControl mb={4} isRequired isInvalid={!isFullNameValid}>
        <FormLabel>Full Name</FormLabel>
        <Input type="text" value={fullName} onChange={handleFullNameChange} />
        <FormHelperText>
          {isFullNameValid ? null : "Invalid characters"}
        </FormHelperText>
      </FormControl>
      <FormControl mb={4} isRequired isInvalid={!isEmailValid}>
        <FormLabel>Email</FormLabel>
        <Input type="email" value={email} onChange={handleEmailChange} />
        <FormHelperText>
          {isEmailValid ? null : "Invalid email format"}
        </FormHelperText>
      </FormControl>
      <FormControl mb={4} isRequired isInvalid={!isPasswordValid}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <FormHelperText>
          {isPasswordValid
            ? "Minimum 10 characters with at least one lowercase letter, one digit, and one special character"
            : "Password requirements not met"}
        </FormHelperText>
        <Box mt={2}>
          {passwordStrength && (
            <Alert
              status={
                passwordStrength === "weak"
                  ? "error"
                  : passwordStrength === "moderate"
                  ? "warning"
                  : "success"
              }
            >
              <AlertIcon />
              {passwordStrength === "weak"
                ? "Weak"
                : passwordStrength === "moderate"
                ? "Moderate"
                : "Strong"}{" "}
              password
            </Alert>
          )}
        </Box>
      </FormControl>
      <Button
        colorScheme="teal"
        onClick={handleRegister}
        isDisabled={!isFormValid}
        mt={4}
      >
        Register
      </Button>
      {isSuccessModalOpen && (
        <Box mt={4}>
          <Alert status="success">
            <AlertIcon />
            Registration successful! Welcome, {fullName}!
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={closeSuccessModal}
            />
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default Signup;
