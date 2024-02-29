import { create } from 'zustand'

interface Prediction {
    value: string;
    label: string;
}

interface AutocompleteState {
    input: string;
    predictions: Prediction[];
    setInput: (input: string) => void;
    setPredictions: (predictions: Prediction[]) => void;
    resetAutocomplete: () => void;
}

export const useAutocompleteStore = create<AutocompleteState>((set) => ({
    input: '',
    predictions: [],
    setInput: (input) => set({ input }),
    setPredictions: (predictions) => set({ predictions }),
    resetAutocomplete: () => set({ input: '', predictions: [] }),
}));