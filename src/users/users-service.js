const xss = require('xss')
const bcrypt = require('bcryptjs')

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

const UsersService = {

  hasUserWithUserName(db, user_name) {
    return db('hitchcocktober_users')
      .where({ user_name })
      .first()
      .then(user => !!user)
  },

  insertUser(db, newUser) {
    return db
    .insert(newUser)
    .into('hitchcocktober_users')
    .returning('*')
    .then(([user]) => user)
  },

  getAllUsers(knex) {
    return knex.select('*').from('hitchcocktober_users')
  },

  insertUser(knex, newUser) {
    return knex
      .insert(newUser)
      .into ('hitchcocktober_users')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  getById(knex, id) {
    return knex
      .from('hitchcocktober_users')
      .select('*')
      .where('id', id)
      .first()
  },

  updateUsers(knex, id, newUserFields) {
    console.log(newUserFields)
    return knex('hitchcocktober_users')
      .where({ id })
      .update(newUserFields)
  },

  deleteUser(knex, id) {
    return knex('hitchcocktober_users')
    .where({ id })
    .delete()
  },

  validatePassword(password) {
  if (password.length < 8) {
    return 'Password must be longer than 8 characters'
  }
  if (password.length > 72) {
    return 'Password must be less than 72 characters'
  }
  if (password.startsWith(' ') || password.endsWith(' ')) {
    return 'Password must not start or end with empty spaces'
  }
  if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
    return 'Password must contain 1 upper case, lower case, number and special character'
  }
  return null
  },

  hashPassword(password) {
    return bcrypt.hash(password, 12)
  },
  
  serializeUser(user) {
    return {
      id: user.id,
      user_name: xss(user.user_name),
      date_created: new Date(user.date_created),
      1: user.oct1, 2: user.oct2, 3: user.oct3, 4: user.oct4,
      5: user.oct5, 6: user.oct6, 7: user.oct7, 8: user.oct8,
      9: user.oct9, 10: user.oct10, 11: user.oct11, 12: user.oct12,
      13: user.oct13, 14: user.oct14, 15: user.oct15, 16: user.oct16,
      17: user.oct17, 18: user.oct18, 19: user.oct19, 20: user.oct20,
      21: user.oct21, 22: user.oct22, 23: user.oct23, 24: user.oct24,
      25: user.oct25, 26: user.oct26, 27: user.oct27, 28: user.oct28,
      29: user.oct29, 30: user.oct30, 31: user.oct31,
    }
  },
  
}

module.exports = UsersService

