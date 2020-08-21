export default class DownloadItem {

  constructor (properties) {

    this.status = properties.status;
    this.url = properties.url | properties._restore.url;
    this.downloadUrl = properties.downloadUrl | properties._restore.downloadUrl;
    this.filename = properties.name | properties.fileName;
    this.path = properties.dest  | properties._restore.dest;
    this.headers = properties.customHeaders | properties._restore.customHeaders;
    this.percentage = parseFloat(properties.percentage);
    this.eta = new Date(properties.eta);
    this.size = properties.size;
    this.downloaded = properties.downloaded;
    this.startDate = new Date(properties.startDate);
    this.speed = properties.speed;
    this.retries = parseInt(properties.retries);
    
  }

  get status() {


    return status;
  }
    
}
