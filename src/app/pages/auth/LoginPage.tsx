import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful!');
      
      // Navigate based on role
      const user = await login(email, password);
      // The context will be updated, navigate to role-specific dashboard
      navigate(`/${email.includes('admin') ? 'admin' : email.includes('approver') ? 'approver' : 'requester'}`);
    } catch (error) {
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogins = [
    { email: 'admin@university.edu', role: 'Admin', color: 'bg-purple-500' },
    { email: 'approver@university.edu', role: 'Approver', color: 'bg-blue-500' },
    { email: 'requester@university.edu', role: 'Requester', color: 'bg-green-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2563eb] rounded-2xl mb-4">
            <span className="text-white font-bold text-3xl">RB</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">RoomBook</h1>
          <p className="text-gray-600 mt-2">Room & Lab Booking Management</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#2563eb] hover:bg-[#1e40af]"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-4">
              <button className="text-sm text-[#2563eb] hover:underline">
                Forgot password?
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Login Demo */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm">Quick Login (Demo)</CardTitle>
            <CardDescription className="text-xs">
              Click to auto-fill credentials for different roles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickLogins.map((login) => (
              <Button
                key={login.email}
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  setEmail(login.email);
                  setPassword('demo');
                }}
              >
                <span className={`w-3 h-3 rounded-full ${login.color} mr-2`}></span>
                Login as {login.role}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
