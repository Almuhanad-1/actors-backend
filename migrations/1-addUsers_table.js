'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "actor", deps: []
 * createTable "users", deps: []
 * createTable "film", deps: [language, language]
 * createTable "film_actor", deps: [actor, film]
 *
 **/

var info = {
    "revision": 1,
    "name": "addUsers_table",
    "created": "2022-04-13T10:32:15.741Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "actor",
            {
                "actor_id": {
                    "type": Sequelize.INTEGER.UNSIGNED,
                    "field": "actor_id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "first_name": {
                    "type": Sequelize.STRING(45),
                    "field": "first_name",
                    "allowNull": false
                },
                "last_name": {
                    "type": Sequelize.STRING(45),
                    "field": "last_name",
                    "allowNull": false
                },
                "last_update": {
                    "type": Sequelize.DATE,
                    "field": "last_update",
                    "defaultValue": Sequelize.Literal,
                    "allowNull": false
                },
                "DOB": {
                    "type": Sequelize.DATEONLY,
                    "field": "DOB",
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": true
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "users",
            {
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "FirstName": {
                    "type": Sequelize.STRING,
                    "field": "FirstName"
                },
                "LastName": {
                    "type": Sequelize.STRING,
                    "field": "LastName"
                },
                "Email": {
                    "type": Sequelize.STRING,
                    "field": "Email",
                    "unique": true
                },
                "Password": {
                    "type": Sequelize.STRING,
                    "field": "Password"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt"
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "film",
            {
                "film_id": {
                    "type": Sequelize.INTEGER.UNSIGNED,
                    "field": "film_id",
                    "primaryKey": true,
                    "allowNull": false
                },
                "title": {
                    "type": Sequelize.STRING(128),
                    "field": "title",
                    "allowNull": false
                },
                "description": {
                    "type": Sequelize.TEXT,
                    "field": "description",
                    "allowNull": true
                },
                "release_year": {
                    "type": Sequelize.undefined,
                    "field": "release_year",
                    "allowNull": true
                },
                "language_id": {
                    "type": Sequelize.INTEGER.UNSIGNED,
                    "field": "language_id",
                    "references": {
                        "model": "language",
                        "key": "language_id"
                    },
                    "allowNull": false
                },
                "original_language_id": {
                    "type": Sequelize.INTEGER.UNSIGNED,
                    "field": "original_language_id",
                    "references": {
                        "model": "language",
                        "key": "language_id"
                    },
                    "allowNull": true
                },
                "rental_duration": {
                    "type": Sequelize.INTEGER.UNSIGNED,
                    "field": "rental_duration",
                    "defaultValue": "3",
                    "allowNull": false
                },
                "rental_rate": {
                    "type": Sequelize.DECIMAL,
                    "field": "rental_rate",
                    "defaultValue": "4.99",
                    "allowNull": false
                },
                "length": {
                    "type": Sequelize.INTEGER.UNSIGNED,
                    "field": "length",
                    "allowNull": true
                },
                "replacement_cost": {
                    "type": Sequelize.DECIMAL,
                    "field": "replacement_cost",
                    "defaultValue": "19.99",
                    "allowNull": false
                },
                "rating": {
                    "type": Sequelize.ENUM('G', 'PG', 'PG-13', 'R', 'NC-17'),
                    "field": "rating",
                    "defaultValue": "G",
                    "allowNull": true
                },
                "special_features": {
                    "type": Sequelize.undefined,
                    "field": "special_features",
                    "allowNull": true
                },
                "last_update": {
                    "type": Sequelize.DATE,
                    "field": "last_update",
                    "defaultValue": Sequelize.Literal,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "film_actor",
            {
                "actor_id": {
                    "type": Sequelize.INTEGER.UNSIGNED,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "unique": "film_actor_film_id_actor_id_unique",
                    "field": "actor_id",
                    "references": {
                        "model": "actor",
                        "key": "actor_id"
                    },
                    "primaryKey": true,
                    "allowNull": false
                },
                "film_id": {
                    "type": Sequelize.INTEGER.UNSIGNED,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "unique": "film_actor_film_id_actor_id_unique",
                    "field": "film_id",
                    "references": {
                        "model": "film",
                        "key": "film_id"
                    },
                    "primaryKey": true,
                    "allowNull": false
                },
                "last_update": {
                    "type": Sequelize.DATE,
                    "field": "last_update",
                    "defaultValue": Sequelize.Literal,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
