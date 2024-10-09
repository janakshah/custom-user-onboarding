import { upsertUserPageProgress, getUserPageProgress } from '../dao/DAO';

export async function saveUserPageProgress(user_id, current_page) {
  try {
    const { data, error } = await upsertUserPageProgress(user_id, current_page);
    if (error) {
      throw new Error(`Failed to save user page progress: ${error}`);
    }
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

export async function fetchUserPageProgress(user_id) {
  try {
    const { data, error } = await getUserPageProgress(user_id);
    if (error) {
      throw new Error(`Failed to fetch user page progress: ${error}`);
    }
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}
