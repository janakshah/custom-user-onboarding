import SettingsComponent from './components/SettingsComponent';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-center text-3xl font-bold my-6">Admin Settings</h1>
      <div className="max-w-4xl mx-auto p-4">
        <SettingsComponent />
      </div>
    </div>
  );
}
