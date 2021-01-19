import { createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchAudiosAll,
  fetchMyPartAudios,
  fetchMyPlaylists,
  fetchMyFriends,
  fetchSearchedSongs,
  fetchPlaylist,
  fetchFriendAudios,
  fetchFriends,
} from './AudioAPI';
import IFriendData from '../../types/friendData';
import errFetchHandler from '../../helperFunctions/errFetchHandler';
import { TypeRootReducer } from '../../redux-toolkit/rootReducer';

// Типа action, который потом диспатчится

export const searchSongsAction = createAsyncThunk(
  'audios/searchSongsAction',
  async (name: string, argThunkAPI) => {
    try {
      const response = await fetchSearchedSongs(name);
      return response.data;
    } catch (err) {
      return errFetchHandler(err.response.data, argThunkAPI);
    }
  }
);

export const openPlayListAction = createAsyncThunk(
  'audios/openPlayListAction',
  async (id: number, argThunkAPI) => {
    try {
      const response = await fetchPlaylist(id);
      return response.data;
    } catch (err) {
      return errFetchHandler(err.response.data, argThunkAPI);
    }
  }
);

export const allAudiosAction = createAsyncThunk(
  'audios/allAudiosAction',
  async (data, argThunkAPI) => {
    try {
      const response = await fetchAudiosAll();
      return response.data;
    } catch (err) {
      return errFetchHandler(err.response.data, argThunkAPI);
    }
  }
);

export const myAudiosAction = createAsyncThunk(
  'fetch/myAudiosAction',
  async (data, argThunkAPI) => {
    try {
      const response = await fetchMyPartAudios();
      return response.data;
    } catch (err) {
      return errFetchHandler(err.response.data, argThunkAPI);
    }
  }
);

export const friendAudiosAction = createAsyncThunk(
  'fetch/friendAudiosAction',
  async (id: number, argThunkAPI) => {
    try {
      const response = await fetchFriendAudios(id);
      return response.data;
    } catch (err) {
      return errFetchHandler(err.response.data, argThunkAPI);
    }
  }
);

export const friendsAudioAction = createAsyncThunk(
  'fetch/friendsAudioAction',
  async (data, argThunkAPI) => {
    try {
      const arrFriendsIds = await fetchMyFriends();
      const arrPromiseFriendsData: Array<Promise<IFriendData>> = arrFriendsIds.data.map(
        async ({ id }: { id: number }) => {
          try {
            const friendData = await fetchFriends(id);
            friendData.data.id = id;
            return friendData.data;
          } catch (e) {
            return e.response.data;
          }
        }
      );
      const arrFriendsData: Array<IFriendData> = await Promise.all(arrPromiseFriendsData);
      return arrFriendsData;
    } catch (err) {
      return errFetchHandler(err.response.data, argThunkAPI);
    }
  }
);

export const myPlaylistsAction = createAsyncThunk(
  'audios/myPlaylistsAction',
  async (data, argThunkAPI) => {
    try {
      const response = await fetchMyPlaylists();
      return response.data;
    } catch (err) {
      return errFetchHandler(err.response.data, argThunkAPI);
    }
  }
);

export interface IAudioState {
  myAudios: [];
  allAudios: [];
  friends: [];
  myPlaylists: Array<Record<string, any>>;
  currentSearch: [];
  isLoading: boolean;
  error: Error | null;
}

const initialState: IAudioState = {
  myAudios: [],
  allAudios: [],
  friends: [],
  myPlaylists: [],
  currentSearch: [],
  isLoading: false,
  error: null,
};

const audioSlice = createSlice({
  name: 'allAudiosSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(allAudiosAction.pending, (state, action: PayloadAction<any>) => {
      console.log(state, action, 'plug');
    });
    builder.addCase(allAudiosAction.fulfilled, (state: Draft<any>, action: PayloadAction<any>) => {
      state.friends = [];
      state.currentSearch = [];
      state.allAudios = action.payload;
      state.isLoading = !state.isLoading;
    });
    builder.addCase(allAudiosAction.rejected, (state: Draft<any>, action) => {
      state.friends = [];
      state.currentSearch = [];
      state.isLoading = !state.isLoading;
      state.msgFetchState = action.error.message;
    });
    builder.addCase(myAudiosAction.pending, (state: Draft<any>, action: PayloadAction<any>) => {
      state.isLoading = !state.isLoading;
      state.msgFetchState = action.payload;
    });
    builder.addCase(myAudiosAction.fulfilled, (state: Draft<any>, action: PayloadAction<any>) => {
      state.allAudios = [];
      state.friends = [];
      state.currentSearch = [];
      state.myAudios = action.payload;
    });
    builder.addCase(myAudiosAction.rejected, (state: Draft<any>, action) => {
      state.allAudios = [];
      state.friends = [];
      state.currentSearch = [];
      state.isLoading = !state.isLoading;
      state.msgFetchState = action.error.message;
    });
    builder.addCase(friendsAudioAction.pending, (state, action) => {
      console.log(state, action, 'plug');
    });
    builder.addCase(
      friendsAudioAction.fulfilled,
      (state: Draft<any>, action: PayloadAction<any>) => {
        state.allAudios = [];
        state.currentSearch = [];
        state.friends = action.payload;
      }
    );
    builder.addCase(friendsAudioAction.rejected, (state: Draft<any>, action) => {
      state.allAudios = [];
      state.currentSearch = [];
      state.isLoading = !state.isLoading;
      state.msgFetchState = action.error.message;
    });
    builder.addCase(myPlaylistsAction.pending, (state: Draft<any>, action: PayloadAction<any>) => {
      state.isLoading = !state.isLoading;
      state.msgFetchState = action.payload;
    });
    builder.addCase(
      myPlaylistsAction.fulfilled,
      (state: Draft<any>, action: PayloadAction<any>) => {
        state.myPlaylists = action.payload;
      }
    );
    builder.addCase(myPlaylistsAction.rejected, (state: Draft<any>, action) => {
      state.isLoading = !state.isLoading;
      state.msgFetchState = action.error.message;
    });
    builder.addCase(openPlayListAction.pending, (state: Draft<any>, action: PayloadAction<any>) => {
      state.isLoading = !state.isLoading;
      state.msgFetchState = action.payload;
    });
    builder.addCase(
      openPlayListAction.fulfilled,
      (state: Draft<any>, action: PayloadAction<any>) => {
        state.allAudios = [];
        state.myAudios = [];
        state.currentSearch = action.payload;
      }
    );
    builder.addCase(openPlayListAction.rejected, (state: Draft<any>, action) => {
      state.isLoading = !state.isLoading;
      state.msgFetchState = action.error.message;
    });
    builder.addCase(searchSongsAction.pending, (state: Draft<any>, action: PayloadAction<any>) => {
      state.isLoading = !state.isLoading;
      state.msgFetchState = action.payload;
    });
    builder.addCase(
      searchSongsAction.fulfilled,
      (state: Draft<any>, action: PayloadAction<any>) => {
        state.allAudios = [];
        state.myAudios = [];
        state.currentSearch = action.payload;
      }
    );
    builder.addCase(searchSongsAction.rejected, (state: Draft<any>, action) => {
      state.isLoading = !state.isLoading;
      state.msgFetchState = action.error.message;
    });
    builder.addCase(friendAudiosAction.pending, (state: Draft<any>, action: PayloadAction<any>) => {
      state.isLoading = !state.isLoading;
      state.msgFetchState = action.payload;
    });
    builder.addCase(
      friendAudiosAction.fulfilled,
      (state: Draft<any>, action: PayloadAction<any>) => {
        state.currentSearch = action.payload;
      }
    );
    builder.addCase(friendAudiosAction.rejected, (state: Draft<any>, action) => {
      state.isLoading = !state.isLoading;
      state.msgFetchState = action.error.message;
    });
  },
});

// Можно в useSelector подставлять просто эту константу
export const allAudiosSliceSelector = (state: TypeRootReducer) => state.audios;
// Можно в useSelector подставлять просто эту константу END

export default audioSlice.reducer;