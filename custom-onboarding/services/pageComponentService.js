import {
  getPageComponentSettings,
  updatePageComponentSettings,
} from '../dao/DAO';

export async function fetchPageComponents() {
  try {
    const { data, error } = await getPageComponentSettings();

    if (error) {
      throw new Error(
        `Failed to fetch page component settings: ${error.message}`
      );
    }

    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

export async function savePageComponentSettings({
  about_me_page,
  address_page,
  birthdate_page,
}) {
  try {
    const { data, error } = await updatePageComponentSettings({
      about_me_page,
      address_page,
      birthdate_page,
    });

    if (error) {
      throw new Error(
        `Failed to update page component settings: ${error.message}`
      );
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}
