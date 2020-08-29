export default class API {

  constructor(baseUrl) {

    this.baseUrl = baseUrl;
    
  }

  loadProgress() {
    return new Promise((resolve, reject) => {

        fetch(this.baseUrl + `/progress`, {
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
          return resolve(result.downloads);
        })
        .catch(err => {
          console.warn(`Failed to fetch progress:`, err);
          // respond with emtpy progress object
          return reject({
            active: [],
            queued: [],
            finished: [],
            failed: [{
              name: `Failed to load progress!`,
              status: `failed`,
            }],
          })
          // return reject(`Couldn't fetch progress!`);
        })
    
    })
  }

  loadDownloadItem(id) {
    return new Promise((resolve, reject) => {

      fetch(this.baseUrl + `/downloads/${id}`, {
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
      .then(async response => {
        
        console.log(`response.status:`, response.status);
        
        return {
          status: response.status,
          text: await response.text(),
        }
        
      })
      .then(result => {

        switch (result.status) {
          case 200:
            return resolve(result.text);
          case 201:
            return resolve(result.text);
          case 400:
            return reject(result.text);
          case 500:
            return reject(result.text);
            
          default:
            return reject(result.text);
        }
        
      })
      .catch(err => {
        console.error(err);
        return reject(`An error occured during the request!`);
      })
    
    })
  }

  pauseDownload(id) {
    return new Promise((resolve, reject) => {
    
      fetch(this.baseUrl + `/download/${id}`, {
        mode: 'cors',
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'pause',
        })
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

  resumeDownload(id) {
    return new Promise((resolve, reject) => {
    
      fetch(this.baseUrl + `/download/${id}`, {
        mode: 'cors',
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'resume',
        })
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

  stopDownload(id) {
    return new Promise((resolve, reject) => {
    
      fetch(this.baseUrl + `/download/${id}`, {
        mode: 'cors',
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'stop',
        })
      })
      .then(response => {
        return Boolean(response.text());
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