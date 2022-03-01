/* eslint-disable prettier/prettier */

import { schema, rules } from '@ioc:Adonis/Core/Validator'

const userSchema = schema.create({
  username: schema.string({ trim: true }, [
    rules.unique({ table: 'users', column: 'username', caseInsensitive: true }),
  ]),
  email: schema.string({ trim: true }, [
    rules.email(),
    rules.unique({ table: 'users', column: 'email', caseInsensitive: true }),
  ]),
  password: schema.string({}, [rules.minLength(8)]),
})

export default {
  userSchema,
}
