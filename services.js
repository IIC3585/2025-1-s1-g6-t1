const csv = require('@fast-csv/parse');
const fs = require('fs');
const path = require('path');


const readCSV = (file) => {
    const csvFilePath = path.join(__dirname, file);
    return new Promise((resolve, reject) => {
        const data = [];
        fs.createReadStream(csvFilePath)
        .pipe(csv.parse({ headers: false }))
        .on('error', error => reject(error))
        .on('data', row => data.push(row))
        .on('end', rowCount => resolve(data));
  });
}

const printCSVData = async (file) => {
  try {
    const data = await readCSV(file);
    console.log(data);
  } catch (error) {
    console.error('Error reading CSV:', error);
  }
}

//2
const rowstocolumns = async (file) => {
    try {
        const data = await readCSV(file);
        const transposed = data[0].map((_, colIndex) => data.map(row => row[colIndex]));
        console.log(transposed.map(row => row.join(',')).join('\n'));
    } catch (error) {
        console.error('Error processing CSV:', error);
    }
};

//3
const columnstorows = async (file) => {
    try {
        const data = await readCSV(file);
        const transposed = data[0].map((_, colIndex) => data.map(row => row[colIndex]));
        console.log(transposed.map(row => row.join(',')).join('\n'));
    } catch (error) {
        console.error('Error processing CSV:', error);
    }
};

const insertrow = async (file, n, row) => {
    try {
        const data = await readCSV(file);
        data.splice(n, 0, row);
        console.log(data);
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
        console.log(data);
    } catch (error) {
        console.error('Error reading CSV:', error);
    }
}



const newRow = ['Borja', 'Errazuriz', 'berrazuriz3@uc.cl']
const newColumn = ["993456780", "995674543", "995674543", "995674543"]

const file = 'data.csv';
printCSVData(file);

rowstocolumns(file);
columnstorows(file);

insertrow(file, 0, newRow);
insertcolumn(file, 3, newColumn);