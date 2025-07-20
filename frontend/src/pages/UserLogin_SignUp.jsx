import AuthForm from '../components/user-auth-form';

export default function UserSignUp() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center w-full bg-gray-100 bg-background">
      <div className="w-full max-w-md">
        <AuthForm />
      </div>
    </div>
  );
}
