/**
 * Central Database: central
 */
let centralDatabase = {
  1: "db1",
  2: "db1",
  3: "db2",
  4: "db3",
  6: "db1",
  7: "db2",
  8: "db3",
  9: "db3",
};

function central(id) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (centralDatabase[id]) {
        resolve(centralDatabase[id]);
      } else {
        reject();
      }
    }, 100);
  });
};


/**
 * Vault database: vault
 */
let vaultDatabase = {
  1: "John Smith jsmith@gmail.com",
  2: "Kevin Martin darkwarrior73@msn.fr",
  3: "Erico Gringo elgringo@gmail.com",
  4: "Gunter Kruger guntertag@hotmail.com",
  6: "Martine Dupont mdupont@yahoo.fr",
  7: "Martinez Dupont martinez@lycoz.fr",
  8: "Holly Molly holmol@gmail.com",
};

function vault(id) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (vaultDatabase[id]) {
        let data = vaultDatabase[id].split(" ");
        resolve({
          firstname: data[0],
          lastname: data[1],
          email: data[2],
        });
      } else {
        reject();
      }
    }, 150);
  });
};

/**
 * Database 1: db1
 */
let database = {
  1: "jsmith USA",
  2: "kmartin France",
};

function db1(id) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (database[id]) {
        let data = database[id].split(" ");
        resolve({
          username: data[0],
          country: data[1],
        });
      } else {
        reject();
      }
    }, 100);
  });
};

/**
 * Database 2: db2
 */
let database2 = {
  3: "egringo Mexico",
};

function db2(id) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (database2[id]) {
        let data = database2[id].split(" ");
        resolve({
          username: data[0],
          country: data[1],
        });
      } else {
        reject();
      }
    }, 100);
  });
};

/**
 * Database 3: db3
 */
let database3 = {
  4: "gkruger Germany",
  9: "",
};

function db3(id) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (database3[id]) {
        let data = database3[id].split(" ");
        resolve({
          username: data[0],
          country: data[1],
        });
      } else {
        reject();
      }
    }, 100);
  });
};

/**
 * Mark central
 */
let marked = {};

function mark(id) {
  marked[id] = true;

  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (id === 4) {
        reject();
      } else {
        resolve();
      }
    }, 100);
  });
};

module.exports = {
  central,
  vault,
  mark,
  marked,
  db1,
  db2,
  db3
}
