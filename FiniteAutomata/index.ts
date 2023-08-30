class State {
    private acceptingState: boolean;
    private transitionsMap: Map<string, Array<State>>;
    constructor({ accepting = false }) {
        this.acceptingState = accepting;
        this.transitionsMap = new Map<string, Array<State>>();
    }

    addTransitionForSymbol(symbol: string, state: State) {
        // check if symbol already exists in the map
        if(this.transitionsMap.has(symbol)) {
            const transitions = this.transitionsMap.get(symbol);
            transitions.push(state);
            this.transitionsMap.set(symbol, transitions);
        } else {
            this.transitionsMap.set(symbol, [state]);
        }
    }


    getTransitionsForSymbol(symbol: string): Array<State> {
        // check if symbol exists in map
        if(!this.transitionsMap.has(symbol)) {
            return []
        } else {
            return this.transitionsMap.get(symbol);
        }
    }
}

export default State;