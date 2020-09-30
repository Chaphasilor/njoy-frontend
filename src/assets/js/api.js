export default class API {

  constructor(baseUrl) {

    this.baseUrl = baseUrl;
    this.apiEndpoint = `${this.baseUrl}/api`;
    
  }

  async checkAuthenticated() {

    let res, result;
    
    try {
      
      res = await fetch(this.baseUrl + `/auth/check`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      })

    } catch (err) {
      console.error(`Something went wrong during authentication!`);
      throw new Error(`Couldn't authenticate!`);
    }

    try {
      result = await res.json();
    } catch (err) {
      console.error(`Something went wrong during authentication!`);
      throw new Error(`Couldn't authenticate!`);
    }

    if (result.success) {
      return true;
    } else {
      throw new Error(`Authentication failed! Cookie seems to be missing...`);
    }
    
  }
  
  async authenticate(username, password) {
    
    let res, result;
    
    try {
      
      res = await fetch(this.baseUrl + `/auth/local`, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        })
      })

    } catch (err) {
      console.error(`Something went wrong during authentication!`);
      throw new Error(`Couldn't authenticate!`);
    }

    try {
      result = await res.json();
    } catch (err) {
      console.error(`Something went wrong during authentication!`);
      throw new Error(`Couldn't authenticate!`);
    }

    if (result.success) {
      return true;
    } else {
      throw new Error(`Authentication failed! Maybe wrong password?`);
    }
    
  }

  loadProgress() {
    return new Promise((resolve, reject) => {

        fetch(this.apiEndpoint + `/progress`, {
          mode: 'cors',
          method: 'GET',
          credentials: 'include',
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

      fetch(this.apiEndpoint + `/downloads/${id}`, {
        mode: 'cors',
        method: 'GET',
        credentials: 'include',
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
    
      download.mkdir = true; // enable creation of new folders (directories are fetched from the API, so this shouldn't cause any issues)
      
      fetch(this.apiEndpoint + `/download`, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
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
    
      fetch(this.apiEndpoint + `/download/${id}`, {
        mode: 'cors',
        method: 'PATCH',
        credentials: 'include',
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
    
      fetch(this.apiEndpoint + `/download/${id}`, {
        mode: 'cors',
        method: 'PATCH',
        credentials: 'include',
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
    
      fetch(this.apiEndpoint + `/download/${id}`, {
        mode: 'cors',
        method: 'PATCH',
        credentials: 'include',
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

  async fetchRootDirectoryTree() {

    let res;

    try {
      
      res = await fetch(this.apiEndpoint + `/directoryListing`, {
        mode: 'cors',
        method: 'GET',
        credentials: 'include',
      });

    } catch (err) {
      console.error(`Failed to fetch directory listing:`, err);
    }

    return res.json();
    
  }

  async fetchFileSize(url) {

    let res;

    try {
      
      res = await fetch(this.apiEndpoint + `/fileSize/${encodeURIComponent(url)}`, {
        mode: 'cors',
        method: 'GET',
        credentials: 'include',
      });

    } catch (err) {
      console.error(`Failed to fetch file size:`, err);
    }

    if (200 == res.status) {
      return res.text();
    } else {
      throw new Error(`Failed to fetch file size, server responded with status ${res.status}`);
    }
    
    
  }
  
}