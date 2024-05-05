import Airtable from 'airtable';
import chalk from 'chalk';
import readline from 'readline';
import wrapAnsi from 'wrap-ansi';

const base = new Airtable({ apiKey: 'patMTxpaVnIU8MFUA.0b950a3b06555ae413187512f0e8b7fca57b25b96b42e09e558991c272e58f04' }).base('appL9IBwLCb8NUTEG');


const headline = chalk.bold.hex('#0fa3b1');
const ingred = chalk.hex('#b5e2fa');
const descr = chalk.hex('#eddea4')
const comment = chalk.hex('#b5e2fa')

let records = [];

base('Cocktails').select().eachPage((batch, fetchNextPage) => {
    // Add the records from this page to our array
    records.push(...batch);
    fetchNextPage();
}, (err) => {
    if (err) { console.error(err); return; }
    // Create a simplified object and add a index value
    records = records.map((obj, ind) => ({
        namn: obj.get('Namn'),
        tillredning: obj.get('Tillredning'),
        ingredienser: obj.get('Ingredienser'),
        kommentar: obj.get('Kommentar') || '',
        tags: obj.get('Taggar') || [],
        index: ind
    }));
    startSession();
});

function startSession() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.on('line', (input) => {
        handleInput(input);
    });
}

function handleInput(input) {
    const args = input.split(' ');
    const command = args[0];
    console.clear();
    switch (command) {
        case 'list':
            listRecords();
            break;
        case 'filter':
            filterRecords(args[1]);
            break;
        case 'show':
            showRecord(args[1]);
            break;
        case 'menu':
            exportMenu();
            break;
        default:
            console.log(`Unknown command: ${command}`);

    }
}

function listRecords() {
    records.forEach((record, n) => {
        console.log(chalk.bold(record.index + ": "), headline(record.namn));
    });
}

function showRecord(n) {
    if(n > records.length) {
        console.log(chalk.red("Det finns ingen cocktail med det numret"));
    }
    else {
        const cocktail = records[n];
        console.log(headline(cocktail.namn));
        console.log(ingred(cocktail.ingredienser));
        console.log(wrapAnsi(descr(cocktail.tillredning), 50));
        console.log(wrapAnsi(comment(cocktail.kommentar), 50));
        let tags = '';
        cocktail.tags.forEach(tag => tags += '[' + tag + ']  ' );
        console.log(descr(tags));
    }
}

function filterRecords(filter) {
    const filtered = records.filter((record) => record.namn.toLowerCase().includes(filter.toLowerCase()));
    filtered.forEach((record) => {
        console.log(chalk.bold(record.index + ": "), headline(record.namn));
    });
}

function exportMenu() {

}
