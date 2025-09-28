import React from 'react';
import LoginForm from '@/components/form/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side (Form Section) */}
      <div className="xl:w-full w-full px-8 flex flex-col items-center justify-center">
        <div className="xl:max-w-[456px] w-[94%] mx-auto text-center">
          <h1 className="md:text-2xl mb-4 text-xl font-semibold text-text-secondary-200">
            Welcome back to Quartus
          </h1>
         
          <LoginForm />
        </div>
      </div>

      {/* Right Side (Image Section) */}
      <div className="hidden xl:block xl:flex-1 bg-[url(/auth.png)] bg-cover bg-center" />
    </div>
  );
};

export default LoginPage;
