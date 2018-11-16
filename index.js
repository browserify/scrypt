var crypto = require('crypto')
if (typeof crypto.scrypt === 'function' && typeof crypto.scryptSync === 'function') {
  exports.scrypt = crypto.scrypt
  exports.scryptSync = crypto.scryptSync
} else {
  module.exports = require('./browser')
}
