const API_URL = 'allevents-rs.json'

const app = document.getElementById('root')

const container = document.createElement('div');
container.setAttribute('class', 'container')

app.appendChild(container)
const options = {
    method: 'GET',
    mode: 'no-cors'
};



async function getData() {
    const response = await fetch(API_URL, options);
    if (response.status === 200) {
        const result = await response.json();

        //console.log('result', result);

        let header = result.header;
        let data = result.data;
        let headerData = header.map(val => val.name)
            //console.log('Random', headerData);
        let newMap = new Map();
        // addRow(tbl, );
        for (let i = 0; i < data.length; i++) {

            let rowData = data[i];

            //console.log('rowData----->', rowData)
            rowData.map((value, index) => {
                let headerArray = newMap.get(headerData[index])
                if (!headerArray)
                    headerArray = [];
                headerArray.push(value);
                newMap.set(headerData[index], headerArray);

            })

        }

        let html = '';
        let headerTab = document.createElement('div');
        for (let [key, value] of newMap) {
            console.log(key + ' = ' + value);
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            const h1 = document.createElement('h1')
            h1.textContent = key
            const p = document.createElement('p');

            p.textContent = `${value.join(', ')}`;
            container.appendChild(card);
            card.appendChild(h1);
            card.appendChild(p);
        }





    } else {
        console.log('is error');

    }
}

getData();