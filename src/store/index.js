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
  },
  mutations: {
    SET_ACTIVE_VIEW(state, view) {
      state.activeView = view;
    },
    SET_ROOT_DIRECTORY_TREE(state, newRootDirectoryTree) {
      state.rootDirectoryTree = newRootDirectoryTree;
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
  }
})
