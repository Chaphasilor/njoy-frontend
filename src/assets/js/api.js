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