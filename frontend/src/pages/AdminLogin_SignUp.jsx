import Admin_AuthForm from '../components/admin-auth-form'; // No curly braces for default export

export default function Admin_SignUp() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Admin_AuthForm />
      </div>
    </div>
  );
}
