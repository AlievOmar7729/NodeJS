const yargs = require('yargs');
const user = require('./user');

yargs(process.argv.slice(2)) // skip first two parameters
    .command({
        command: 'add',
        desc: 'Add new language',
        builder: {
            title: {
                type: 'string',
                demandOption: true, // it is required
                describe: "Name of language"
            },
            level: {
                describe: 'Level of knowledge/current position',
                demandOption: true, // it is required too
                type: 'string'
            }
        },
        handler: (argv) => {
            user.addLanguage({title: argv.title, level: argv.level})
        }
    })
    .command({
        command: 'remove',
        desc: "Remove language by its title",
        builder: {
            title: {
                type: 'string',
                demandOption: true,
                describe: 'Language title'
            },
        },
        handler: (argv) => {
            user.removeLanguage(argv.title)
        }
    })
    .command({
        command: 'list',
        desc: 'Get the list of languages',
        handler: () => {
            console.log(user.getLanguages());
        }
    })
    .command({
        command: 'read',
        desc: 'Get the language by title',
        builder: {
            title: {
                type: 'string',
                demandOption: true,
                describe: "Name of language"
            },
        },
        handler: (argv) => {
            console.log(user.findLanguage(argv.title));
        }
    })
    .parse()