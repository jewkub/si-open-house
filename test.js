
(async () => {
  const bcrypt = require('bcryptjs');
  const saltRounds = 10;
  let salt = await bcrypt.genSalt(saltRounds);
  let hash = await bcrypt.hash('sisimpic', salt);
  console.log(hash);
})();