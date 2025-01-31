
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



function solution(id) {
  // TODO

};


function test(job, markeds) {
  Promise.all([
    testSuccess.apply(
      null,
      "1 jsmith USA John Smith jsmith@gmail.com".split(" "),
    ),
    testSuccess.apply(
      null,
      "2 kmartin France Kevin Martin darkwarrior73@msn.fr".split(" "),
    ),
    testSuccess.apply(
      null,
      "3 egringo Mexico Erico Gringo elgringo@gmail.com".split(" "),
    ),
    testSuccess.apply(
      null,
      "4 gkruger Germany Gunter Kruger guntertag@hotmail.com".split(" "),
    ),
    testError(5, "Error central"),
    testError(6, "Error db1"),
    testError(7, "Error db2"),
    testError(8, "Error db3"),
    testError(9, "Error vault"),
  ])
    .then(function () {
      console.log("TECHIO> success true");
    })
    .catch(function () {
      console.log("TECHIO> success false");
    });

  function testSuccess(id, username, country, firstname, lastname, email) {
    id = Number(id);

    return new Promise(function (resolve, reject) {
      let promise = job(id);

      if (!isPromise(promise)) {
        console.error("Test with id", id + ": Result is not a promise");
        reject();
        return;
      }

      let success = false,
        called = false;

      promise
        .then(function (data) {
          success = true;

          if (data.id !== id) {
            console.error(
              "Test with id",
              id + ": The returned id is",
              data.id,
              "but it should be",
              id,
            );
            success = false;
          }

          if (data.username !== username) {
            console.error(
              "Test with id",
              id + ": The returned username is",
              data.username,
              "but it should be",
              username,
            );
            success = false;
          }

          if (data.country !== country) {
            console.error(
              "Test with id",
              id + ": The returned country is",
              data.country,
              "but it should be",
              country,
            );
            success = false;
          }

          if (data.firstname !== firstname) {
            console.error(
              "Test with id",
              id + ": The returned firstname is",
              data.firstname,
              "but it should be",
              firstname,
            );
            success = false;
          }

          if (data.lastname !== lastname) {
            console.error(
              "Test with id",
              id + ": The returned lastname is",
              data.lastname,
              "but it should be",
              lastname,
            );
            success = false;
          }

          if (data.email !== email) {
            console.error(
              "Test with id",
              id + ": The returned email is",
              data.email,
              "but it should be",
              email,
            );
            success = false;
          }
        })
        .catch(function () {
          console.error(
            "Test with id",
            id + ": The returned promise should be resvoled",
          );
          reject();
        })
        .then(function () {
          called = true;
        });

      setTimeout(function () {
        if (!called) {
          console.error("Test with id", id + ": Code too slow");
          reject();
        } else if (!success) {
          reject();
        } else {
          if (!markeds[id]) {
            console.error("Test with id", id + ": mark service never called");
            reject();
          } else {
            console.log("Test with id", id + ": Success");
            resolve();
          }
        }
      }, 225);
    });
  }

  function testError(id, error) {
    return new Promise(function (resolve, reject) {
      let promise = job(id);

      if (!isPromise(promise)) {
        console.error("Test with id", id + ": Result is not a promise");
        reject();
        return;
      }

      let success = false,
        called = false;

      promise
        .then(function () {
          console.error(
            "Test with id",
            id + ": The returned promise should be rejected",
          );
          reject();
        })
        .catch(function (data) {
          if (error !== data) {
            console.error(
              "Test with id",
              id + ": The returned promise should be rejected with error",
              error,
              "but it was",
              data,
            );
            reject();
          } else {
            success = true;
          }
        })
        .then(function () {
          called = true;
        });

      setTimeout(function () {
        if (!called) {
          console.error("Test with id", id + ": Code too slow");
          reject();
        } else if (!success) {
          reject();
        } else {
          if (markeds[id]) {
            console.error("Test with id", id + ": mark service called");
            reject();
          } else {
            console.log("Test with id", id + ": Success");
            resolve();
          }
        }
      }, 225);
    });
  }

  function isPromise(obj) {
    return obj instanceof Promise;
  }
}


test(solution, marked)