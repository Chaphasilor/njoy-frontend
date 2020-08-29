export default class DownloadItem {

  constructor (properties) {

    this.id = properties.id;
    this.status = properties.status;
    this.url = properties.url || properties._restore?.url;
    this.downloadUrl = properties.downloadUrl || properties._restore?.downloadUrl;
    this.filename = properties.name || properties.fileName;
    this.path = properties.dest || properties._restore?.dest;
    this.headers = properties.customHeaders || properties._restore?.customHeaders;
    this.percentage = parseFloat(properties.percentage);
    this.eta = new Date(properties.eta);
    this.size = properties.size;
    this.downloaded = properties.downloaded;
    this.startDate = new Date(properties.startDate);
    this.speed = properties.speed;
    this.retries = parseInt(properties.retries);

    // this.id = Math.random().toString(36).substring(7); // TEMPORARY solution for identifying download items
    
  }

  get textColor() {

    let color = `dark`;
    
    switch (this.status) {
      case `paused`:
        color = `cta-yellow`
        break;
      case `error`:
        color = `cta-red`
        break;
      case `failed`:
        color = `cta-red`
        break;
      case `incomplete`:
        color = `cta-red`
        break;
      case `completed`:
        color = `cta-green`
        break;
      case `duplicate`:
        color = `cta-yellow`
        break;
    
      default:
        color = `dark`;
        break;
    }

    return color;
    
  }
  
  get statusString() {

    let statusString = ``;
    switch (this.status) {
      case `queued`:
        statusString = `Pending`;
        break;
      case `initializing`:
        statusString = `Connecting`;
        break;
      case `downloading`:
        statusString = `Downloading`;
        break;
      case `paused`:
        statusString = `Paused`;
        break;
      case `error`:
        statusString = `Error`;
        break;
      case `failed`:
        statusString = `Failed`;
        break;
      case `incomplete`:
        statusString = `Incomplete`;
        break;
      case `completed`:
        statusString = `Completed`;
        break;
      case `duplicate`:
        statusString = `Duplicate`;
        break;
    
      default:
        statusString = `Unknown Status`;
        break;
    }

    return statusString;

  }

  // get status() {


  //   return status;
  // }
    
}
