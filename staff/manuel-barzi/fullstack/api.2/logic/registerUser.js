const context = require('./context')
const { validateEmail, validatePassword, validateName } = require('./helpers/validators')

/**
 * Registers a user
 * 
 * @param {string} name The user name
 * @param {string} email The user email
 * @param {string} password The user password
 * 
 * @throws {Error} In case name, email or password do not match the expected value types and formats (synchronous)
 * 
 * @returns {Promise}
 * 
 * @throws {Error} In case user already exists (asynchronous)
 */
function registerUser(name, email, password) {
    validateName(name)
    validateEmail(email)
    validatePassword(password)

    return context.users.findOne({ email })
        .then(user => {
            if (user) throw new Error('user already exists')

            return context.users.insertOne({ name, email, password })
        })
        .then(() => { })
}

module.exports = registerUser
