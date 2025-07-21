import Admin_AuthForm from '../components/admin-auth-form'; 

export default function Admin_SignUp() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 relative">
      <div className="w-full max-w-md">
        <Admin_AuthForm />
      </div>
    </div>
  );
}
