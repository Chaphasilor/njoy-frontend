import Vue from 'vue'
import Vuex from 'vuex'
import API from '@/assets/js/api.js';
import DownloadItem from '@/assets/js/download-item.js';

Vue.use(Vuex)

async function getApiBaseUrl() {

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
baseUrl = `http://192.168.2.129:69/api`;
var api = new API(baseUrl);
(async () => {
  try {
    baseUrl = await getApiBaseUrl();
    api = new API(baseUrl);
  } catch (err) {
    console.warn(err);
  } finally {
    console.log(`baseUrl:`, baseUrl);
  }
})

const VIEWS = {
  PROGRESS: 0,
  DOWNLOAD: 1,
  DOWNLOAD_DETAILS: 2,
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
      
        default:
          context.commit('SET_ACTIVE_VIEW', VIEWS.PROGRESS);
          break;
      }
    },
    nativgateToDownload(context) {
      context.commit('SET_ACTIVE_VIEW', VIEWS.DOWNLOAD);
    },
    loadRootDirectoryTree(context) {
      //TODO fetch from API
      context.commit('SET_ROOT_DIRECTORY_TREE', context.getters.getRootDirectoryTree);
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

      //TODO call API endpoint

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
      
        default:
          view = 'progress';
          break;
      }
      return view;
    },
    rootDirectoryTree: state => state.rootDirectoryTree,
    downloads: state => state.downloads,
  }
})
