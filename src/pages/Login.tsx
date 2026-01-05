import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { Lock, User } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login logic
    const role = isAdminLogin ? 'admin' : 'user';
    login(email, role);
// Redirect based on role
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isAdminLogin ? 'Admin Login' : 'User Login'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isAdminLogin 
              ? "Enter admin credentials to manage bookings" 
              : "Sign in to book your futsal slot"}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsAdminLogin(!isAdminLogin)}
            className="text-sm text-indigo-600 hover:text-indigo-500 font-medium flex items-center justify-center w-full"
          >
            {isAdminLogin ? (
              <>
            
                <User className="h-4 w-4 mr-1" /> Switch to User Login
              </>
            ) : (
              <>
                <Lock className="h-4 w-4 mr-1" /> Switch to Admin page
              </>
            )}
          </button>
        </div>
        
        <div className="mt-4 bg-blue-50 p-3 rounded text-xs text-blue-800">
          <p><strong>Demo Hint:</strong></p>
          <p>This is a mock login. You can use any email/password.</p>
          <p>Switch modes to test User vs Admin roles.</p>
        </div>
      </div>
    </div>
  );
};
