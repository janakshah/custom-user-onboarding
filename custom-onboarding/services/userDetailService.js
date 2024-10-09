import { updateUserDetail, getUserDetailsByUserId } from '../dao/DAO';

export async function saveUserDetail(user_id, column, value) {
  try {
    const { data, error } = await updateUserDetail(user_id, column, value);
    if (error) {
      throw new Error(`Failed to update user detail: ${error}`);
    }
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

export async function fetchUserDetails(user_id) {
  try {
    const { data, error } = await getUserDetailsByUserId(user_id);
    if (error) {
      throw new Error(`Failed to fetch user details: ${error}`);
    }
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}
