import { useEffect, useState } from 'react';
import {
  fetchPageComponents,
  savePageComponentSettings,
} from '../../services/pageComponentService';

export default function SettingsComponent() {
  const [settings, setSettings] = useState({
    about_me_page: 2,
    address_page: 2,
    birthdate_page: 2,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      setErrorMessage('');
      const { data, error } = await fetchPageComponents();
      if (error) {
        setErrorMessage('Failed to load settings.');
      } else {
        const filteredData = {
          about_me_page: data.about_me_page,
          address_page: data.address_page,
          birthdate_page: data.birthdate_page,
        };
        setSettings(filteredData);
      }
      setLoading(false);
    };
    loadSettings();
  }, []);

  const handleChange = async (field, value) => {
    setLoading(true);
    const updatedSettings = { ...settings, [field]: value };

    const { error } = await savePageComponentSettings(updatedSettings);
    if (error) {
      setErrorMessage('Failed to update settings. Please try again.');
    } else {
      setSettings(updatedSettings);
      setErrorMessage('');
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-md max-w-lg mx-auto">
      {errorMessage && (
        <p className="text-red-500 dark:text-red-400 mb-4">{errorMessage}</p>
      )}
      <div className="space-y-4">
        {['about_me_page', 'address_page', 'birthdate_page'].map((key) => (
          <div key={key} className="flex items-center">
            <label className="mr-4 font-semibold">
              {key.replace(/_/g, ' ')}:
            </label>
            <select
              value={settings[key]}
              onChange={(e) => handleChange(key, parseInt(e.target.value, 10))}
              disabled={loading}
              className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
