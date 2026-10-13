import React from 'react';
import LoginForm from './components/LoginForm';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login Aplikasi
        </h1>
        
        {/* Memanggil komponen LoginForm yang berisi input username & password */}
        <LoginForm />
        
      </div>
    </main>
  );
}