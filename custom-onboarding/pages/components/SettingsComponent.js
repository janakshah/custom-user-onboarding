import { useEffect, useState } from 'react';

const fetchSettings = async () => {
  try {
    const res = await fetch('/api/settings');
    const { data, error } = await res.json();
    if (error) throw new Error(error);
    return data;
  } catch (err) {
    console.error('Failed to fetch settings:', err);
    return null;
  }
};

const updateSettings = async (newSettings) => {
  try {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSettings),
    });
    const { error } = await res.json();
    if (error) throw new Error(error);
    return true;
  } catch (err) {
    console.error('Failed to update settings:', err);
    return false;
  }
};

export default function SettingsComponent() {
  const [settings, setSettings] = useState({
    about_me_page: 2,
    address_page: 2,
    birthdate_page: 2,
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      setErrorMessage('');
      const data = await fetchSettings();
      if (data) {
        setSettings(data);
      } else {
        setErrorMessage('Failed to load settings.');
      }
    };
    loadSettings();
  }, []);

  const handleChange = async (field, value) => {
    const updatedSettings = { ...settings, [field]: value };
    setSettings(updatedSettings);
    const success = await updateSettings(updatedSettings);
    if (!success) {
      setErrorMessage('Failed to update settings. Please try again.');
    } else {
      setErrorMessage('');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Page Component Settings</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <div className="space-y-4">
        {Object.keys(settings).map((key) => (
          <div key={key} className="flex items-center">
            <label className="mr-4 font-semibold">
              {key.replace(/_/g, ' ')}:
            </label>
            <select
              value={settings[key]}
              onChange={(e) => handleChange(key, parseInt(e.target.value, 10))}
              className="border rounded px-2 py-1"
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
