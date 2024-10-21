import { useState } from 'react';
import { useRouter } from 'next/router';
import { register } from '../../services/loginApiService';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setMessage('');

    try {
      const { message: successMessage, error: errorMessage } = await register(
        username,
        password
      );

      if (errorMessage) {
        setError(errorMessage);
      } else {
        setMessage(successMessage);
        router.push('/');
        router.reload();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-2xl p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg md:w-3/4 lg:w-1/2">
        <h1 className="text-2xl font-semibold text-center text-gray-700 dark:text-gray-100">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-sm text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit
          </button>
        </form>

        {message && (
          <p className="mt-4 text-green-600 dark:text-green-400">{message}</p>
        )}
        {error && (
          <p className="mt-4 text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    </div>
  );
}
