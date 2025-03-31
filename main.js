const { CSVToUpper, rowstocolumns, columnstorows,
    insertrow, insertcolumn, swap,
    rowdelete, columndelete, tohtmltable } = require("./services");

const file = 'data.csv';
const newRow = ['Borja', 'Errazuriz', 'berrazuriz3@uc.cl'];
const newColumn = ["993456780", "995674543", "995674543", "995674543"];

rowdelete(file, 1);
columndelete(file, 2);
rowstocolumns(file);
columnstorows(file);
insertrow(file, 0, newRow);
insertcolumn(file, 3, newColumn);
swap(file, 0, 2);
tohtmltable(file);
CSVToUpper(file);

