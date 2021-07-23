import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'list',
  initialState: {
    list: [],
    addedList: ['btc', 'eth', 'xrp'],
    newCryptoPage: false
  },
  reducers: {
    increment: (state, action) => {
      state.list = action.payload;
    },
    decrement: (state, action) => {
        const value = action.payload.symbol.toLowerCase();
        const symbolIndex = state.list.indexOf(value);
        if (symbolIndex > -1) {
            state.list.splice(symbolIndex, 1);
        }
        const nameIndex = state.list.indexOf(value);
        if (nameIndex > -1) {
            state.list.splice(nameIndex, 1);
        }
    },
    newCryptoPageVisible: (state) => {
        state.newCryptoPage = true;
    },
    newCryptoPageDisable: (state) => {
        state.newCryptoPage = false;
    },
    addInWatchList: (state, action) => {
        state.addedList.push(action.payload);
    },
    removeFromWatchList: (state, action) => {
        const value = action.payload.symbol.toLowerCase();
        const symbolIndex = state.addedList.indexOf(value);
        if (symbolIndex > -1) {
            state.addedList.splice(symbolIndex, 1);
        }
        const nameIndex = state.addedList.indexOf(value);
        if (nameIndex > -1) {
            state.addedList.splice(nameIndex, 1);
        }
    }
  },
});

export const { increment, decrement, newCryptoPageVisible, newCryptoPageDisable, addInWatchList, removeFromWatchList } = counterSlice.actions; 

export default counterSlice.reducer;
