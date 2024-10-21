import { supabase } from '../lib/supabaseClient';

const handleSupabaseError = (error) => {
  if (error) throw new Error(error.message);
  return { data: null, error: error.message };
};

const fetchSingleRecord = async (table, condition) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq(...condition)
      .single();
    if (error) return handleSupabaseError(error);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

const upsertRecord = async (table, values, conflictKey) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .upsert(values, { onConflict: [conflictKey] })
      .select()
      .single();
    if (error) return handleSupabaseError(error);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

const updateRecord = async (table, condition, values) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .update(values)
      .eq(...condition);
    if (error) return handleSupabaseError(error);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export async function insertUser(username, password) {
  return upsertRecord(
    'user_registration',
    [{ username, password }],
    'username'
  );
}

export async function findUserByUsername(username) {
  return fetchSingleRecord('user_registration', ['username', username]);
}

export async function insertUserDetails(user_id) {
  return upsertRecord(
    'user_details',
    [
      {
        user_id,
        about_me: '',
        birthday: null,
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
      },
    ],
    'user_id'
  );
}

export async function getPageComponentSettings() {
  return fetchSingleRecord('page_component_settings', ['id', 2]);
}

export async function upsertUserPageProgress(user_id, current_page) {
  return upsertRecord(
    'user_page_progress',
    [{ user_id, current_page }],
    'user_id'
  );
}

export async function getUserPageProgress(user_id) {
  const { data, error } = await fetchSingleRecord('user_page_progress', [
    'user_id',
    user_id,
  ]);
  return { data: data?.current_page || null, error };
}

export async function updateUserDetail(user_id, column, value) {
  return updateRecord('user_details', ['user_id', user_id], {
    [column]: value,
  });
}

export async function getUserDetailsByUserId(user_id) {
  return fetchSingleRecord('user_details', ['user_id', user_id]);
}

export async function getAllUsers() {
  try {
    const { data, error } = await supabase.from('user_registration').select(`
        user_id,
        username,
        user_details (about_me, birthday, street_address, city, state, zip_code)
    `);
    if (error) return handleSupabaseError(error);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

export async function updatePageComponentSettings(settings) {
  return updateRecord('page_component_settings', ['id', 2], settings);
}
