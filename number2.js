const http = require("http");
const { Pool, Client } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '1234',
    port: 5432,
    database: 'node_postgres2'
});
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1234',
    port: 5432,
    database: 'node_postgres2'
});

const execute = async (query) => {
    try {
        await client.connect();
        await client.query(query);
        // await client.end();
        return true;
    } catch (error) {
        console.error(error.stack);
        console.log(error)
        return false;
    } finally {
        console.log('finally')
        await client.end();
    }
};

const text = `
    DROP TABLE IF EXISTS movie_genres;
    DROP TABLE IF EXISTS movie;
    DROP TABLE IF EXISTS genres;
    CREATE TABLE IF NOT EXISTS "genres" (
	    "id" SERIAL,
	    "genre" VARCHAR(15) NOT NULL UNIQUE,
	    PRIMARY KEY ("id")
    );
    CREATE TABLE IF NOT EXISTS "movie" (
        "id" SERIAL,
        "name" VARCHAR(20),
        "release_year" INTEGER,
        CONSTRAINT name_year UNIQUE (name, release_year),
        PRIMARY KEY ("id")
    );
    CREATE TABLE IF NOT EXISTS "movie_genres" (
        "id" SERIAL,
        "movie_id" INTEGER,
        "genre_id" INTEGER,
        PRIMARY KEY ("id"),
        FOREIGN KEY ("movie_id") REFERENCES movie ("id"),
        FOREIGN KEY ("genre_id") REFERENCES genres ("id"),
        CONSTRAINT _xy_unique UNIQUE (movie_id, genre_id)
    );`;

// execute(text).then(result => {
//     if (result) {
//         console.log('Table created');
//     }
// });

function decode_string(str) {
    let elems = [];
    let args = [];
    let values = [];
    let line = [];
    let p = 0;
    str = str.slice(str.indexOf('?') + 1);
    while (str.indexOf('&', p) > -1) {
        elems.push(str.slice(p, str.indexOf('&')));
        p = str.indexOf('&', p) + 1;
    }
    elems.push(str.slice(p));
    let result = elems.map(x => x.split('='));
    result.forEach(elem => {
        args.push(elem[0]);
        values.push("'"+elem[1]+"'");
        line.push(elem[0] + " = " + "'" + elem[1] + "'");
    })
    return[args.join(', '), values.join(', '), line.join(', ')]
}

http.createServer((req, res) => {
    console.log(req.url)
    res.setHeader("Content-Type", "text/html; charset=utf-8;");
    res.writeHead(200, {'Content-Type': 'text/plain'});
    // if (req.url.indexOf('?') > 0) {
    //     table = req.url.slice(1, req.url.indexOf('?'));
    // }
    table = req.url.indexOf('?') > 0 ? req.url.slice(1, req.url.indexOf('?')) : req.url.slice(1);
    let id;
    let text;
    if (table.indexOf(':') >= 0) {
        console.log(table, table.indexOf(':'));
        id = table.slice(table.indexOf(':') + 1)
        table = table.slice(0, table.indexOf(':'))
    }
    let [a, b, c] = req.url.indexOf('?') > 0 ? decode_string(req.url.slice(req.url.indexOf('?') + 1)) : [undefined, undefined, undefined]
    switch(req.method) {
        case 'GET':
            text = id == undeined ? "SELECT * FROM " + table + " WHERE id = " + id : "SELECT * FROM " + table;
            break;
        case 'POST':
            text = "INSERT INTO " + table + "(" + a + ") VALUES ("+b+") RETURNING *";
            break;
        case 'PUT':
            text = "UPDATE " + table + " SET " + c + " WHERE id = " + id;
            break;
        case 'DELETE':
            text = "DELETE FROM " + table + " WHERE id = " + id;
            break;
    }
    if (text) {
        console.log(text)
        pool.query(text, (error, results) => {
            if (error) {
                res.end(JSON.stringify(error.detail))
            }
            else {
                res.end(JSON.stringify(results.rows))
            }
        });

    }
    else {
        res.end('no text')
        console.log('no text')
    }
    console.log("Тип запроса: " + req.method);
}).listen(3000);