import Vue from 'vue'
import Vuex from 'vuex'
import API from '@/assets/js/api.js';
import DownloadItem from '@/assets/js/download-item.js';

Vue.use(Vuex)

async function getBaseUrl() {

  let response;
  try {
    response = await fetch(`https://web-services.chaphasilor.xyz/url?type=njoy`);
    return await response.text();
  } catch (err) {
    console.error(`Failed to fetch base url:`, err);
    throw `Coulnd't fetch API base url, using the default one...`;
  }
  
}

var baseUrl = `https://web-services.chaphasilor.xyz/njoy/tunnel`;
baseUrl = `http://192.168.2.129:69`;
var api = new API(baseUrl);
(async () => {
  try {
    baseUrl = await getBaseUrl();
    api = new API(baseUrl);
  } catch (err) {
    console.warn(err);
  } finally {
    console.log(`baseUrl:`, baseUrl);
  }
// })()
})

const VIEWS = {
  PROGRESS: 0,
  DOWNLOAD: 1,
  DOWNLOAD_DETAILS: 2,
  LOGIN: 3,
}

export default new Vuex.Store({
  state: {
    activeView: VIEWS.PROGRESS,
    rootDirectoryTree: {
      name: 'ROOT',
      subdirectories: [
        {
          name: 'Backups',
          subdirectories: [
            {
              name: 'OnePlus 5',
              subdirectories: [],
            },
            {
              name: 'Raspberry Pi',
              subdirectories: [],
            },
            {
              name: 'Spectre',
              subdirectories: [],
            },
          ]
        },
        {
          name: 'Documents',
          subdirectories: [
            {
              name: 'Uni',
              subdirectories: [],
            },
            {
              name: 'Unsorted',
              subdirectories: [],
            },
            {
              name: 'Work',
              subdirectories: [],
            },
          ]
        },
        {
          name: 'Media',
          subdirectories: [
            {
              name: 'eBooks',
              subdirectories: [],
            },
            {
              name: 'Movies',
              subdirectories: [],
            },
            {
              name: 'Music',
              subdirectories: [],
            },
            {
              name: 'Pictures',
              subdirectories: [
                {
                  name: 'Wallpapers',
                  subdirectories: [],
                },
              ],
            },
            {
              name: 'TV Shows',
              subdirectories: [
                {
                  name: 'Altered Carbon (2018)',
                  subdirectories: [],
                },
                {
                  name: 'Cloak and Dagger (2018)',
                  subdirectories: [
                    {
                      name: 'S1',
                      subdirectories: [],
                    },
                    {
                      name: 'S2',
                      subdirectories: [],
                    },
                  ],
                },
                {
                  name: 'Dark (2017)',
                  subdirectories: [
                    {
                      name: 'Season 1',
                      subdirectories: [],
                    },
                    {
                      name: 'Season 2',
                      subdirectories: [],
                    },
                    {
                      name: 'Season 3',
                      subdirectories: [],
                    },
                  ],
                },
                {
                  name: 'Dark Matter (2015)',
                  subdirectories: [
                    {
                      name: 'Season 1',
                      subdirectories: [],
                    },
                    {
                      name: 'Season 2',
                      subdirectories: [],
                    },
                    {
                      name: 'Season 3',
                      subdirectories: [],
                    },
                  ],
                },
              ],
            },
          ]
        },
        {
          name: 'Misc',
          subdirectories: [
            {
              name: 'Code',
              subdirectories: [],
            },
            {
              name: 'Jam Session',
              subdirectories: [],
            },
          ]
        },
      ]
    },
    downloads: [],
    authenticated: false,
  },
  mutations: {
    SET_ACTIVE_VIEW(state, view) {
      state.activeView = view;
    },
    SET_ROOT_DIRECTORY_TREE(state, newRootDirectoryTree) {
      state.rootDirectoryTree = newRootDirectoryTree;
    },
    SET_DOWNLOADS(state, newDownloads) {
      state.downloads = newDownloads;
    },
    CHANGE_DOWNLOAD_STATUS(state, { downloadId, newDownloadStatus }) {

      let download = state.downloads.find(x => x.id === downloadId);

      if (download) {
        download.status = newDownloadStatus;
      }

    },
    SET_AUTH_STATUS(state, newStatus) {
      state.authenticated = newStatus;
    }
  },
  actions: {
    navigate(context, { target }) {
      switch (target) {
        case 'progress':
          context.commit('SET_ACTIVE_VIEW', VIEWS.PROGRESS);
          break;
        case 'download':
          context.commit('SET_ACTIVE_VIEW', VIEWS.DOWNLOAD);
          break;
        case 'download-details':
          context.commit('SET_ACTIVE_VIEW', VIEWS.DOWNLOAD_DETAILS);
          break;
        case 'login':
          context.commit('SET_ACTIVE_VIEW', VIEWS.LOGIN);
          break;
      
        default:
          context.commit('SET_ACTIVE_VIEW', VIEWS.PROGRESS);
          break;
      }
    },
    nativgateToDownload(context) {
      context.commit('SET_ACTIVE_VIEW', VIEWS.DOWNLOAD);
    },
    async authenticateApi(context, { username, password }) {

      try {
        api.authenticate(username, password);
      } catch (err) {
        console.warn(err);
        context.commit('SET_AUTH_STATUS', false);
        return err.message;
      }

      context.commit('SET_AUTH_STATUS', true);
      
      return `Success`;
      
    },
    async loadRootDirectoryTree(context) {
      let tree;
      
      try {
        tree = await api.fetchRootDirectoryTree();
      } catch (err) {

        console.error(`Couldn't get root directory tree from API!`, err);
        tree = {
          name: `ROOT`,
          subdirectories: [],
        }
        
      }

      context.commit('SET_ROOT_DIRECTORY_TREE', tree);

    },
    createNewDirectory(context, path, name) {
      //TODO create via API
      console.log(`path:`, path);
      console.log(`name:`, name);
      context.actions.loadRootDirectoryTree();
    },
    createNewDummyDirectory(context, { path, name, newRootDirectoryTree }) {
      console.log(`path:`, path);
      console.log(`name:`, name);
      console.log(`newRootDirectoryTree:`, newRootDirectoryTree);
      context.commit('SET_ROOT_DIRECTORY_TREE', newRootDirectoryTree);
    },
    async fetchProgress(context) {

      let downloads;
      
      try {
        downloads = await api.loadProgress();
      } catch (emptyObject) {
        console.warn(`Couldn't fetch data from API, using empty object...`);
        downloads = emptyObject;
      }

      console.log(`downloads:`, downloads);

      downloads = [...downloads.active,...downloads.queued, ...downloads.finished, ...downloads.failed];

      downloads = downloads.map(item => new DownloadItem(item));

      context.commit('SET_DOWNLOADS', downloads);
      
    },
    async modifyDownloadState(context, { id, action }) {

      let newStatus;
      
      try {

        switch (action) {
          case `pause`:
            newStatus = await api.pauseDownload(id);
            break;
          case `resume`:
            newStatus = await api.resumeDownload(id);
            break;
          case `stop`:
            newStatus = await api.stopDownload(id);
            break;
        
          default:
            throw new Error(`Action '${action}' not supported!`);
        }

        context.commit(`CHANGE_DOWNLOAD_STATUS`, {
          downloadId: id,
          newDownloadStatus: newStatus,
        })

      } catch (err) {

        console.error(`Couldn't ${action} download ${id}:`, err);
        
      }

    },
    async submitDownload(context, download) {

      console.log(`download.path:`, download.path);
      
      let response;

      try {
        response = await api.submitDownload(download);
      } catch (err) {
        console.error(`Failed to submit download:`, err);
        throw new Error(`Failed to submit download!`);
      }

      return response;
      
    },
    async getFileSize(context, url) {

      let size;
      
      try {
        size = await api.fetchFileSize(url);
      } catch (err) {
        
        console.warn(`Couldn't fetch the file size for the given URL through the API:`, err);
        size = `Unknown`;
        
      }

      return size;
      
    }
  },
  getters: {
    activeView: state => {
      let view;
      switch (state.activeView) {
        case VIEWS.PROGRESS:
          view = 'progress';
          break;
        case VIEWS.DOWNLOAD:
          view = 'download';
          break;
        case VIEWS.DOWNLOAD_DETAILS:
          view = 'download-details';
          break;
        case VIEWS.LOGIN:
          view = 'login';
          break;
      
        default:
          view = 'progress';
          break;
      }
      return view;
    },
    rootDirectoryTree: state => state.rootDirectoryTree,
    downloads: state => state.downloads,
    authStatus: state => state.authenticated,
  }
})
