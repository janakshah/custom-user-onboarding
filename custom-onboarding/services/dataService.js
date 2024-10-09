import { getAllUsers } from '../dao/DAO';

export async function getUserDetailsList() {
  try {
    const { data, error } = await getAllUsers();

    if (error) {
      throw new Error(error);
    }

    const userList = data.map((item) => ({
      user_id: item.user_id,
      username: item.username,
      about_me: item.user_details.about_me,
      birthday: item.user_details.birthday,
      street_address: item.user_details.street_address,
      city: item.user_details.city,
      state: item.user_details.state,
      zip_code: item.user_details.zip_code,
    }));

    return { data: userList, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}
