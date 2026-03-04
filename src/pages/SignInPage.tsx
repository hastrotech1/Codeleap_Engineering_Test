import React from "react";
import { SignIn } from "../components/features/SignIn/SignIn";

interface SignInPageProps {
  onLogin: (username: string) => void;
}

const SignInPage: React.FC<SignInPageProps> = ({ onLogin }) => (
  <div className="page-center">
    <SignIn onLogin={onLogin} />
  </div>
);

export default SignInPage;
