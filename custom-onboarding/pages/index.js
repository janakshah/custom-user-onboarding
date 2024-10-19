import { useEffect, useState } from 'react';
import Login from './components/Login';
import PageComponentLoader from './components/PageComponentLoader';
import ProgressBar from './components/ProgressBar';

const fetchLoginStatus = async () => {
  const res = await fetch('/api/check-login');
  const { loggedIn, userId } = await res.json();
  return { loggedIn, userId };
};

const fetchUserDetails = async (userId) => {
  const res = await fetch(`/api/user-details?user_id=${userId}`);
  const { data } = await res.json();
  return data;
};

const fetchPageProgress = async (userId) => {
  const res = await fetch(`/api/page-progress?user_id=${userId}`);
  const { data } = await res.json();
  return data;
};

const savePageProgress = async (userId, newPage) => {
  const res = await fetch('/api/page-progress', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id: userId, current_page: newPage }),
  });
  return res.ok;
};

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [userDetails, setUserDetails] = useState(null);
  const [totalSteps] = useState(3);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      setLoading(true);
      const { loggedIn, userId } = await fetchLoginStatus();
      if (loggedIn) {
        const pageData = await fetchPageProgress(userId);
        const userData = await fetchUserDetails(userId);
        setCurrentPage(pageData);
        setUserDetails(userData);
        setIsLoggedIn(true);
        setProgress(pageData - 1);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    };
    checkLogin();
  }, []);

  const handleLogout = async () => {
    const res = await fetch('/api/check-login', { method: 'POST' });
    if (res.ok) {
      window.location.reload();
    }
  };

  const handleNextPage = async () => {
    const newPage = currentPage + 1;
    if (await savePageProgress(userDetails.user_id, newPage)) {
      setCurrentPage(newPage);
      setProgress(newPage === 3 ? 2 : newPage - 1);
    }
  };

  const handlePreviousPage = async () => {
    const newPage = currentPage - 1;
    if (await savePageProgress(userDetails.user_id, newPage)) {
      setCurrentPage(newPage);
      setProgress(newPage - 1);
    }
  };

  const handleSubmit = async () => {
    setProgress(totalSteps);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner border-4 border-t-4 border-blue-500 h-12 w-12 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <div className="flex justify-end p-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm"
        >
          Logout
        </button>
      </div>
      <div className="mb-16">
        <ProgressBar currentProgress={progress} totalSteps={totalSteps} />
      </div>
      <div className="px-4">
        <PageComponentLoader
          pageNumber={currentPage}
          userDetails={userDetails}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
