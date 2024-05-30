let { central, db1, db2, db3, vault, mark, marked } = require('./db')
let tests = require('./referee')


// shradhan@quizizz.com

const DBMap = {
    db1,
    db2,
    db3,
};

// const getUserData = () => {

// };

function solution(id) {
    let centralResult, dbResult, vaultResult;

    const centralPromise = central(id)
        .then(data => {
            centralResult = data;
            return Promise.all([
                db1(id).catch(error => { throw new Error('Error db1'); }),
                db2(id).catch(error => { throw new Error('Error db2'); }),
                db3(id).catch(error => { throw new Error('Error db3'); })
            ]);
        });

    const vaultPromise = new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error('Vault service timeout'));
        }, 150); // Vault service timeout is set to 150ms

        vault(id)
            .then(vaultData => {
                clearTimeout(timeout);
                resolve(vaultData);
            })
            .catch(error => {
                clearTimeout(timeout);
                reject(new Error('Error vault'));
            });
    });

    return Promise.allSettled([centralPromise, vaultPromise])
        .then(([centralResult, vaultResult]) => {
            if (vaultResult.status === 'fulfilled') {
                vaultResult = vaultResult.value;
            } else {
                throw vaultResult.reason;
            }

            if (centralResult.status === 'rejected') {
                throw centralResult.reason;
            }

            const [db1Data, db2Data, db3Data] = centralResult.value;
            dbResult = db1Data || db2Data || db3Data;
        })
        .catch(error => {
            return Promise.reject({ error: error.message });
        })
        .finally(() => {
            if (centralResult && dbResult && vaultResult) {
                mark(id).catch(() => { });
            }
        })
        .then(() => {
            return {
                id: id,
                username: dbResult.username,
                country: dbResult.country,
                firstname: vaultResult.firstname,
                lastname: vaultResult.lastname,
                email: vaultResult.email
            };
        });

}

// solution(9);
tests(solution, marked);
