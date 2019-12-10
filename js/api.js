const id_tim = 2001;
let base_url = "https://api.football-data.org/v2/";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getArticles() {
  let stand_url = base_url +"competitions/" + id_tim + "/standings";
  if ("caches" in window) {
    caches.match(stand_url)
      .then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var articlesHTML = "";

          console.log('data cache', data);

          data.standings.forEach(function(standing) {
            articlesHTML += `
            <div class="col l4 s12 m4">
              <div class="card">
                <div class="card-content center">
                  <span class="card-title truncate"> ${standing.group}</span>
                  <p>${standing.type}</p>
                </div>
                
                <div class="collection">
                  <div class="collection-item">
                    <div class="row">
                      <h5 class="center">
                      <a href="/article.html?id=${standing.table[0].team.id}">${standing.table[0].team.name}</a></h5>
                    </div>
                    <div class="row">
                      <span class="col badge green">${standing.table[0].won}</span>
                      <span class="col badge blue">${standing.table[0].draw}</span>
                      <span class="col badge red">${standing.table[0].lost}</span>
                    </div>
                  </div>
                </div>

                <div class="collection">
                  <div class="collection-item">
                    <div class="row">
                      <h5 class="center">
                      <a href="/article.html?id=${standing.table[1].team.id}">${standing.table[1].team.name}</a></h5>
                    </div>
                    <div class="row">
                      <span class="col badge green">${standing.table[1].won}</span>
                      <span class="col badge blue">${standing.table[1].draw}</span>
                      <span class="col badge red">${standing.table[1].lost}</span>
                    </div>
                  </div>
                </div>

                <div class="collection">
                  <div class="collection-item">
                    <div class="row">
                      <h5 class="center">
                      <a href="/article.html?id=${standing.table[2].team.id}">${standing.table[2].team.name}</a></h5>
                    </div>
                    <div class="row">
                      <span class="col badge green">${standing.table[2].won}</span>
                      <span class="col badge blue">${standing.table[2].draw}</span>
                      <span class="col badge red">${standing.table[2].lost}</span>
                    </div>
                  </div>
                </div>

                <div class="collection">
                  <div class="collection-item">
                    <div class="row">
                      <h5 class="center">
                       <a href="/article.html?id=${standing.table[3].team.id}">${standing.table[3].team.name}</a>
                      </h5>
                    </div>
                    <div class="row">
                      <span class="col badge green">${standing.table[3].won}</span>
                      <span class="col badge blue">${standing.table[3].draw}</span>
                      <span class="col badge red">${standing.table[3].lost}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            `;
          });

          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("articles").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetch(stand_url, {
      headers: { 'X-Auth-Token': '1138a6a277674e1280b16ee4a1445f8d' }
    })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // console.log(data);
      // Menyusun komponen card artikel secara dinamis
      let articlesHTML = "";
      data.standings.forEach(function(standing) {
        articlesHTML += `
            <div class="col l4 s12 m4">
              <div class="card">
                <div class="card-content center">
                  <span class="card-title truncate"> ${standing.group}</span>
                  <p>${standing.type}</p>
                </div>
                
                <div class="collection">
                  <div class="collection-item">
                    <div class="row">
                      <h5 class="center">
                      <a href="/article.html?id=${standing.table[0].team.id}">${standing.table[0].team.name}</a></h5>
                    </div>
                    <div class="row">
                      <span class="col badge green">${standing.table[0].won}</span>
                      <span class="col badge blue">${standing.table[0].draw}</span>
                      <span class="col badge red">${standing.table[0].lost}</span>
                    </div>
                  </div>
                </div>

                <div class="collection">
                  <div class="collection-item">
                    <div class="row">
                      <h5 class="center">
                      <a href="/article.html?id=${standing.table[1].team.id}">${standing.table[1].team.name}</a></h5>
                    </div>
                    <div class="row">
                      <span class="col badge green">${standing.table[1].won}</span>
                      <span class="col badge blue">${standing.table[1].draw}</span>
                      <span class="col badge red">${standing.table[1].lost}</span>
                    </div>
                  </div>
                </div>

                <div class="collection">
                  <div class="collection-item">
                    <div class="row">
                      <h5 class="center">
                      <a href="/article.html?id=${standing.table[2].team.id}">${standing.table[2].team.name}</a></h5>
                    </div>
                    <div class="row">
                      <span class="col badge green">${standing.table[2].won}</span>
                      <span class="col badge blue">${standing.table[2].draw}</span>
                      <span class="col badge red">${standing.table[2].lost}</span>
                    </div>
                  </div>
                </div>

                <div class="collection">
                  <div class="collection-item">
                    <div class="row">
                      <h5 class="center">
                       <a href="/article.html?id=${standing.table[3].team.id}">${standing.table[3].team.name}</a>
                      </h5>
                    </div>
                    <div class="row">
                      <span class="col badge green">${standing.table[3].won}</span>
                      <span class="col badge blue">${standing.table[3].draw}</span>
                      <span class="col badge red">${standing.table[3].lost}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getArticleById() {
  console.log('ini log')
  
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    let fullurl = base_url + "teams/" + idParam;
    
    //read from cache
    if ("caches" in window) {
      caches.match(fullurl)
      .then(function(response) {
        if (response) {
          response.json().then(function(data) {

            console.log('data cache', data);

            let tes = '';
            data.squad.forEach(function(data) {
              tes += `
                <div class="col s12 m4">
                  <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                      <span class="card-title">${data.name}</span>
                      <p>Position : ${data.position}</p>
                      <p>Birth : ${data.countryOfBirth}</p>
                      <p>Nationality : ${data.nationality}</p>
                      <p>Role : ${data.role}</p>
                    </div>
                  </div>
                </div>
              `;
            })

            articleHTML = `
              <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${data.crestUrl}" />
                </div>
                <div class="card-content">
                  <span class="card-title">${data.name}</span>
                </div>
              </div>

              <div class="row">
                ${tes}
              </div>
            `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = articleHTML;

            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }
    
    // Onlie Read
    fetch(fullurl,  {
        headers: { 'X-Auth-Token': '1138a6a277674e1280b16ee4a1445f8d' }
      })
      .then(status)
      .then(json)
      .then(function(data) {

        let tes = '';
        data.squad.forEach(function(data) {
          tes += `
            <div class="col s12 m4">
              <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                  <span class="card-title">${data.name}</span>
                  <p>Position : ${data.position}</p>
                  <p>Birth : ${data.countryOfBirth}</p>
                  <p>Nationality : ${data.nationality}</p>
                  <p>Role : ${data.role}</p>
                </div>
              </div>
            </div>
          `;
        })

        articleHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${data.crestUrl}" />
            </div>
            <div class="card-content">
              <span class="card-title">${data.name}</span>
            </div>
          </div>

          <div class="row">
            ${tes}
          </div>
        `;

        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = articleHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

// function getSavedArticles() {
//   getAll().then(function(articles) {
//     console.log(articles);
//     // Menyusun komponen card artikel secara dinamis
//     var articlesHTML = "";
//     articles.forEach(function(article) {
//       var description = article.post_content.substring(0, 100);

//       articlesHTML += `
//                   <div class="card">
//                     <a href="./article.html?id=${article.ID}&saved=true">
//                       <div class="card-image waves-effect waves-block waves-light">
//                         <img src="${article.cover}" />
//                       </div>
//                     </a>
//                     <div class="card-content">
//                       <span class="card-title truncate">${
//                         article.post_title
//                       }</span>
//                       <p>${description}</p>
//                     </div>
//                   </div>
//                 `;
//     });
//     // Sisipkan komponen card ke dalam elemen dengan id #content
//     document.getElementById("body-content").innerHTML = articlesHTML;
//   });
// }

function getSavedArticles() {
  getAllsave().then(function(articles) {
    var articlesHTML = `<div class="row">`;
    articles.forEach(function(article) {
      console.log('data dri api local db', article)
      articlesHTML += `
        <div class="col s12 m6 l4" id="artikel-${article.id}">
          <div class="card">
            <a href="./article.html?id=${article.id}&saved=true">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${article.crestUrl}" />
              </div>
            </a>
            <div class="card-content">
              <span class="card-title truncate">${
                article.name
              }</span>
              <p>${article.address}</p>
            </div>
            <a class="waves-effect waves-light btn-large" onclick="hapusArtikel(${article.id})">Hapus</a>
          </div>
        </div>
      `;
    });
    articlesHTML += '</div>';
    document.getElementById("body-content").innerHTML = articlesHTML;
    console.log(articlesHTML)
  });
}

function getSavedArticleById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  console.log(idParam);
  getArticleById();
}
