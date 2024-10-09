import { supabase } from '../lib/supabaseClient';

export async function insertUser(username, password) {
  try {
    const { data, error } = await supabase
      .from('user_registration')
      .insert([{ username, password }])
      .select('user_id')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function findUserByUsername(username) {
  try {
    const { data, error } = await supabase
      .from('user_registration')
      .select('*')
      .eq('username', username)
      .single();

    if (error && error.details !== 'The result contains 0 rows') {
      throw new Error(error.message);
    }

    return { data: data || null, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function insertUserDetails(user_id) {
  try {
    const { data, error } = await supabase.from('user_details').insert([
      {
        user_id: user_id,
        about_me: '',
        birthday: null,
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function getPageComponentSettings() {
  try {
    const { data, error } = await supabase
      .from('page_component_settings')
      .select('about_me_page, address_page, birthdate_page')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function upsertUserPageProgress(user_id, current_page) {
  try {
    const { data, error } = await supabase.from('user_page_progress').upsert(
      [
        {
          user_id: user_id,
          current_page: current_page,
        },
      ],
      { onConflict: ['user_id'] }
    );

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function getUserPageProgress(user_id) {
  try {
    const { data, error } = await supabase
      .from('user_page_progress')
      .select('current_page')
      .eq('user_id', user_id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return { data: data.current_page, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateUserDetail(user_id, column, value) {
  try {
    const { data: updatedData, error } = await supabase
      .from('user_details')
      .update({ [column]: value })
      .eq('user_id', user_id);

    if (error) {
      throw new Error(`Error updating user detail: ${error.message}`);
    }

    return { data: updatedData, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

export async function getUserDetailsByUserId(user_id) {
  try {
    const { data, error } = await supabase
      .from('user_details')
      .select('*')
      .eq('user_id', user_id)
      .single();

    if (error) {
      throw new Error(`Error fetching user details: ${error.message}`);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

export async function getAllUsers() {
  try {
    const { data, error } = await supabase.from('user_registration').select(`
        user_id,
        username,
        user_details (
          about_me,
          birthday,
          street_address,
          city,
          state,
          zip_code
        )
      `);

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

export async function updatePageComponentSettings({
  about_me_page,
  address_page,
  birthdate_page,
}) {
  try {
    const { data, error } = await supabase
      .from('page_component_settings')
      .update({ about_me_page, address_page, birthdate_page })
      .eq('id', 2);

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}
