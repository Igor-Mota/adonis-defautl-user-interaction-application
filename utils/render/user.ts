/* eslint-disable prettier/prettier */
import User from 'App/Models/User'

const user = (user: User) => {
  return {
      id:user.id,
      username:user.username,
      email:user.email,
      created_at:user.createdAt,
      updated_at: user.updatedAt
  }
}

export default {
  user,
}
