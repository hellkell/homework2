const { Client } = require('pg')
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1234',
    port: 5432,
    database: 'node_homework'
})

const execute = async (query) => {
    try {
        await client.connect();     // gets connection
        await client.query(query);  // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();         // closes connection
    }
};

const text = `
    DROP TABLE IF EXISTS spectators;
    DROP TABLE IF EXISTS movie_genres;
    DROP TABLE IF EXISTS movie_person;
    DROP TABLE IF EXISTS movie;
    DROP TABLE IF EXISTS genres;
    DROP TABLE IF EXISTS person;
    CREATE TABLE IF NOT EXISTS "genres" (
	    "id" SERIAL,
	    "genre" VARCHAR(15) NOT NULL,
	    PRIMARY KEY ("id")
    );
    CREATE TABLE IF NOT EXISTS "movie" (
        "id" SERIAL,
        "name" VARCHAR(20),
        "release_year" INTEGER,
        "budget" INTEGER,
        "marketing" INTEGER,
        "usa_fees" INTEGER,
        "world_fees" INTEGER,
        "country" VARCHAR(20),
        "premiere_russia" DATE,
        "premiere_world" DATE,
        "release_dvd" DATE,
        "minimum_age" INTEGER,
        "rating" VARCHAR(6),
        "duration" INTEGER,
        PRIMARY KEY ("id")
    );
    CREATE TABLE IF NOT EXISTS "movie_genres" (
        "id" SERIAL,
        "movie_id" INTEGER,
        "genre_id" INTEGER,
        PRIMARY KEY ("id"),
        FOREIGN KEY ("movie_id") REFERENCES movie ("id"),
        FOREIGN KEY ("genre_id") REFERENCES genres ("id")
    );
    CREATE TABLE IF NOT EXISTS "spectators" (
        "id" SERIAL,
        "count" INTEGER,
        "movie_id" INTEGER,
        PRIMARY KEY ("id"),
        FOREIGN KEY ("movie_id") REFERENCES movie ("id")
    );
    CREATE TABLE IF NOT EXISTS "person" (
        "id" SERIAL,
        "name" VARCHAR(20),
        "surname" VARCHAR(20),
        PRIMARY KEY ("id")
    );
    CREATE TABLE IF NOT EXISTS "movie_person" (
        "movie_id" INTEGER,
        "person_id" INTEGER,
        "role" VARCHAR(25),
        FOREIGN KEY ("movie_id") REFERENCES movie ("id"),
        FOREIGN KEY ("person_id") REFERENCES person ("id")
    );`;

execute(text).then(result => {
    if (result) {
        console.log('Table created');
    }
});
