import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
    downloads: {
      active: [],
      queue: [],
      downloaded: [],
    },
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
    fetchProgress(context) {

      //TODO call API endpoint

      let dateTimeReviver = (key, value) => {
        if (key === 'eta') {
          return new Date(value);
        }
        return value;
      }
      
      let response = JSON.parse(`{"downloads":{"active":[{"filename":"Once Upon a Time ... in Hollywood (2019).mp4","status":"downloading","percentage":80,"eta":"2020-08-18T20:29:28.204Z","size":"2.3 GB","downloaded":"800 MB","startDate":"2020-08-18T16:59:28.204Z","speed":"786 Kb/s","path":"Storage / Media / Movies","url":"https://example.com/download","retries":0,"headers":{"Content-Type":"application/json","Authorization":"Bearer t73485z235u9835498","Cookie":["approve = 1","allow = true"]}},{"filename":"The Avengers (2015).mp4","status":"paused","size":"1.9 GB","percentage":23,"eta":null,"downloaded":"437 MB","startDate":"2020-08-18T16:59:28.204Z","speed":null,"path":"Storage / Media / Movies","url":"https://example.com/download","retries":0,"headers":{"Cookie":[]}}],"queue":[{"filename":"Extraction (2020).mkv","status":"pending","size":"1.7 GB"},{"filename":"Train to Busan (2015).mp4","status":"pending","size":"1.2 GB"}],"downloaded":[{"filename":"Once Upon a Time ... in Hollywood (2019).mp4","status":"completed","percentage":80,"eta":"2020-08-18T20:29:28.204Z","size":"2.3 GB","downloaded":"800 MB","startDate":"2020-08-18T16:59:28.204Z","speed":"786 Kb/s","path":"Storage / Media / Movies","url":"https://example.com/download","retries":0,"headers":{"Content-Type":"application/json","Authorization":"Bearer t73485z235u9835498","Cookie":["approve = 1","allow = true"]}}]},"previews":[]}`, dateTimeReviver);

      context.commit('SET_DOWNLOADS', response.downloads);
      
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
