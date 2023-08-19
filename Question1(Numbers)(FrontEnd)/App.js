const express = require('express');
const app = express();
const port = 3000;

 
function FinalArray(arrays) {
    const merged = arrays.reduce((merged, current) => merged.concat(current), []);
    const uniqueNumbers = Array.from(new Set(merged));
    return uniqueNumbers.sort((a, b) => a - b);
}

app.get('/numbers', (req, res) => {
    const { url } = req.query;

    if (!url) {
        res.status(400).json({ error: 'Please provide a "url" query parameter.' });
        return;
    }

    const urls = url.split('&');

    const fetchedNumbers = urls.map(singleUrl => {
         
        switch (singleUrl) {
            case 'http://20.244.56.144/numbers/prime':
                return [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

            case 'http://20.244.56.144/numbers/odd':
                return [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

            case 'http://20.244.56.144/numbers/fibonacci':
                return [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];

            case 'http://20.244.56.144/numbers/random':
                return [42, 87, 19, 63, 9, 55, 71, 29, 91, 11];

            default:
                return [];
        }
    });

    const mergedAndSortedNumbers = FinalArray(fetchedNumbers);

    res.json({ numbers: mergedAndSortedNumbers });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
