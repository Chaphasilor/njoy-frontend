export default class API {

  constructor(baseUrl) {

    this.baseUrl = baseUrl;
    
  }

  loadProgress() {
    return new Promise((resolve, reject) => {

        fetch(this.baseUrl + `/progress`, {
          mode: 'cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          return response.json();
        })
        .then(result => {
          return resolve(result.downloads);
        })
        .catch(err => {
          console.error(err);
          return reject(`An error occured during the request!`);
        })
    
    })
  }

  loadDownloadItem(id) {
    return new Promise((resolve, reject) => {

      fetch(this.baseUrl + `/downloads/details/${id}`, {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        return response.json();
      })
      .then(result => {
        return resolve(result);
      })
      .catch(err => {
        console.error(err);
        return reject(`An error occured during the request!`);
      })
    
    })
  }

  submitDownload(download) {
    return new Promise((resolve, reject) => {
    
      fetch(this.baseUrl + `/download`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(download)
      })
      .then(response => {
        return response.text();
      })
      .then(result => {
        return resolve(result);
      })
      .catch(err => {
        console.error(err);
        return reject(`An error occured during the request!`);
      })
    
    })
  }
  
}