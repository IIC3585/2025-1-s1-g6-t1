const csv = require('@fast-csv/parse');
const fs = require('fs');
const path = require('path');
const _ = require('lodash/fp');

async function* readCSVGenerator(file) {
    const csvFilePath = path.join(__dirname, file);
    const stream = fs.createReadStream(csvFilePath).pipe(csv.parse({ headers: false }));
    for await (const row of stream) {
        yield row;
    }
}

const readCSV = async (file) => {
    const data = [];
    for await (const row of readCSVGenerator(file)) {
        data.push(row);
    }
    return data;
};

const logResult = _.curry((message, data) => {
    console.log(message, data);
});

const transformCSVToUpper = _.map(_.map(_.toUpper));

const CSVToUpper = async (file) => {
    const data = await readCSV(file);
    const transformedData = transformCSVToUpper(data);
    logResult('Transformed CSV:', transformedData);
};

const rowstocolumns = async (file) => {
    const data = await readCSV(file);
    const transposed = _.zip(...data);
    logResult('Transposed CSV:', transposed);
};

const columnstorows = rowstocolumns; 

const insertrow = async (file, n, row) => {
    try {
        const data = await readCSV(file);
        data.splice(n, 0, row);
        logResult('Inserted Row:', data);
    } catch (error) {
        console.error('Error reading CSV:', error);
    }
}

const insertcolumn = async (file, n, column) => {
    try {
        const data = await readCSV(file);
        data.forEach((row, i) => {
            row.splice(n, 0, column[i]);
        });
        logResult('Inserted Column:', data);
    } catch (error) {
        console.error('Error reading CSV:', error);
    }
}

const swap = async (file, n, m) => {
    const data = await readCSV(file);
    const newData = _.map(row => {
        const newRow = [...row];
        [newRow[n], newRow[m]] = [newRow[m], newRow[n]];
        return newRow;
    })(data);
    logResult('Swapped Columns:', newData);
};

const rowdelete = async (file, n) => {
    const data = await readCSV(file);
    const newData = _.remove((_, index) => index === n, data);
    logResult('Row Deleted:', newData);
};

const columndelete = async (file, n) => {
    const data = await readCSV(file);
    const newData = _.map(row => _.remove((_, index) => index === n, row), data);
    logResult('Column Deleted:', newData);
};

const tohtmltable = async (file) => {
    const data = await readCSV(file);
    const html = `<table>\n` + _.flow([
        _.map(row =>
            `    <tr>\n` +
            _.map(cell => `        <td>${cell}</td>\n`, row).join('') +
            `    </tr>\n`
        ),
        rows => rows.join('')
    ])(data) + `</table>`;
    logResult('HTML Table:', html);
};

module.exports = {
    readCSV,
    logResult,
    transformCSVToUpper,
    CSVToUpper,
    rowstocolumns,
    columnstorows,
    insertrow,
    insertcolumn,
    swap,
    rowdelete,
    columndelete,
    tohtmltable
};
