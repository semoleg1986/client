import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICard } from '../../components/Card/Card.props';

interface IState {
  cards: ICard[];
}

const initialState: IState = {
  cards: [],
};

const formSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<ICard>) {
      state.cards.push(action.payload);
    },
    removeCard(state, action: PayloadAction<number>) {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },
  },
});

export const { addCard, removeCard } = formSlice.actions;

export default formSlice.reducer;
