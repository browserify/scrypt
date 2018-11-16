var sync = require('./scrypt-sync');
var crypto = require('crypto');
var ScryptRom = require('./scrypt-rom');
var password = 'calvin';
var salt = 'salty';
var len = 32;
var out =  {
  N: 16384,
  p: 1,
  r: 8,
  maxmem: 32 << 20
};
// var b = Buffer.from(`f7 ce 0b 65 3d 2d 72 a4 10 8c f5 ab e9 12 ff dd
//        77 76 16 db bb 27 a7 0e 82 04 f3 ae 2d 0f 6f ad
//        89 f6 8f 48 11 d1 e8 7b cc 3b d7 40 0a 9f fd 29
//        09 4f 01 84 63 95 74 f3 9a e5 a1 31 52 17 bc d7
//        89 49 91 44 72 13 bb 22 6c 25 b5 4d a8 63 70 fb
//        cd 98 43 80 37 46 66 bb 8f fc b5 bf 40 c2 54 b0
//        67 d2 7c 51 ce 4a d5 fe d8 29 c9 0b 50 5a 57 1b
//        7f 4d 1c ad 6a 52 3c da 77 0e 67 bc ea af 7e 89`.replace(/\n/g, '').replace(/ /g, ''), 'hex')
// var scrypt = new ScryptRom(b, 1, 16, 1)

// console.log(scrypt.run().toString('hex'))

var tests = [
  {
    password: 'calvin',
    salt: 'salty',
    len: 32,
    params: {p: 1}
  },
  {
    password: 'calvin',
    salt: 'salty',
    len: 32,
    params: {p: 2}
  },
  {
    password: 'calvin',
    salt: 'salty',
    len: 32,
    params: {r: 4}
  },
  {
    password: 'calvin',
    salt: 'salty',
    len: 32,
    params: {r: 4, N: 16384 * 2}
  },
  {
    password: 'calvin',
    salt: 'salty',
    len: 32,
    params: {N: 16384 * 2, maxmem: 32 << 21}
  },
  {
    password: 'calvin',
    salt: 'salty',
    len: 32,
    params: {r: 16, maxmem: 32 << 21}
  }
]
for (let test of tests) {
  console.time('them');
  let them = crypto.scryptSync(test.password, test.salt, test.len,test.params).toString('base64');
  console.timeEnd('them');
  console.time('us')
  let us = sync(test.password, test.salt, test.len,test.params).toString('base64');
  console.timeEnd('us')
  console.log(them === us, us, them)
}
