const rp = require('request-promise');

const clanName = 'Bellatores';


rp('http://services.runescape.com/m=clan-hiscores/members_lite.ws?clanName=' + clanName)
  .then(function (htmlString) {
    let members = htmlString.split("\n");
    members.shift();
    return Promise.all(members.map(userToObject));
  })
  .then((users) => {
    console.log(users)
  })
  .catch(function (err) {
    // Crawling failed...
  });


function userToObject(user) {
  user = user.split(',');
  return new Promise((resolve, reject) => {
    return resolve({
      clanmate: user[0].replace('�', ' '),
      rank: user[1],
      totalXP: user[2],
      Kills: user[3]
    });
  });
}
