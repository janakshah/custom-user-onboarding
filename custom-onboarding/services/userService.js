import {
  insertUser,
  findUserByUsername,
  insertUserDetails,
  upsertUserPageProgress,
} from '../dao/DAO';
import bcrypt from 'bcrypt';

export async function loginUser(username, password) {
  try {
    const { data: currUser, error: queryError } =
      await findUserByUsername(username);

    if (queryError) {
      throw new Error(queryError.message);
    }

    if (currUser) {
      const match = await bcrypt.compare(password, currUser.password);
      if (!match) {
        throw new Error('Invalid password');
      }
      return { message: 'User logged in successfully!', data: currUser };
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const { data: newUser, error: insertError } = await insertUser(
      username,
      hashedPassword
    );

    if (insertError) {
      throw new Error(insertError.message);
    }

    const { error: insertDetailsError } = await insertUserDetails(
      newUser.user_id
    );

    if (insertDetailsError) {
      throw new Error(insertDetailsError.message);
    }

    const { error: pageProgressError } = await upsertUserPageProgress(
      newUser.user_id,
      2
    );

    if (pageProgressError) {
      throw new Error(pageProgressError.message);
    }

    return { message: 'User created successfully!', data: newUser };
  } catch (error) {
    return { error: error.message };
  }
}
