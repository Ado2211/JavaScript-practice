function ucitavanjeStatistike() {
    let form = new FormData();
    form.append('key', 'e5ad1ee36f0d002a7aada935c62937d866dcad8764841b4ad4fa65dc624caef4');
    form.append('action', 'getSaleStatistics');

    fetch('http://zadatak.singidunum.ac.rs/predmeti/osnove-html-css-js/fake-api.php',
        {
            method: 'POST',
            body: form
        }
    ).then(res => res.json())
        .then(res => {
            let app = document.getElementById('app');

            app.innerHTML = '';

            if (res.type !== 'success') {
                app.innerHTML = 'Doslo je do neke greske: ' + res.code;
                return;
            }

            app.innerHTML = 'Ukupno prodaja: ' + res.data.total_sales + '<br>'
                + 'Najmanje prodato: ' + res.data.minimum_sold_quantity + '<br>'
                + 'Najviše prodato: ' + res.data.maximum_sold_quantity + '<br>'
                + 'Najmanja cijena: ' + res.data.minimum_sale_price + '<br>'
                + 'Najveća cijena: ' + res.data.maximum_sale_price + '<br>'
                + 'Najprodavaniji artikal: ' + res.data.most_sold_article_name;
        });
}

function ucitavanjeTop10() {
    let form = new FormData();
    form.append('key', 'e5ad1ee36f0d002a7aada935c62937d866dcad8764841b4ad4fa65dc624caef4');
    form.append('action', 'getTopTenSales');

    fetch('http://zadatak.singidunum.ac.rs/predmeti/osnove-html-css-js/fake-api.php',
        {
            method: 'POST',
            body: form
        }
    ).then(res => res.json())
        .then(res => {
            let app = document.getElementById('app');

            app.innerHTML = '';

            if (res.type !== 'success') {
                app.innerHTML = 'Doslo je do neke greske: ' + res.code;
                return;
            }

            //[{"sale_id":56,"sold_at":"2019-07-16","article":"SG Laptop - Model SG-1","price":2912.34,"quantity":1},

            let htmlTabele = `<table>
                                  <thead>
                                  <tr>
                                      <th>#
                                      <th>Datum prodaje
                                      <th>Naziv artikla
                                      <th>Cena
                                      <th>Kolicina
                                <tbody>
                                        `;
             
             for (let artikal of res.data)  {
                htmlTabele += `<tr>
                <td>${ artikal.sale_id }
                <td>${ artikal.sold_at }
                <td>${ artikal.article }
                <td>${ artikal.price }
                <td>${ artikal.quantity }
                          `;
             }                         

            app.innerHTML = htmlTabele;
        });
}

function evidentirajProdaju() {
    let datumProdaje = document.getElementById('datum_prodaje').value;
    let nazivArtikla = document.getElementById('naziv_artikla').value;
    let cenaArtikla = document.getElementById('cena_artikla').value;
    let prodataKolicina = document.getElementById('prodata_kolicina').value;

    let form = new FormData();
    form.append('key', 'e5ad1ee36f0d002a7aada935c62937d866dcad8764841b4ad4fa65dc624caef4');
    form.append('action', 'storeSale');
    form.append('sale_date', datumProdaje);
    form.append('article_name', nazivArtikla);
    form.append('article_price', cenaArtikla);
    form.append('quantity', prodataKolicina);

    fetch('http://zadatak.singidunum.ac.rs/predmeti/osnove-html-css-js/fake-api.php',
        {
            method: 'POST',
            body: form
        }
    ).then(res => res.json())
        .then(res => {
            let app = document.getElementById('app');

            app.innerHTML = '';

            if (res.type !== 'success') {
                app.innerHTML = 'Doslo je do neke greske: ' + res.code;
                return;
            }

            app.innerHTML = res.data ;
        });
}
