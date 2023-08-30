import State from "./";

describe('Test state implementation', () => {
    it('adds transition for symbol', () => {
        const s1 = new State({ accepting: false });
        const s2 =  new State({ accepting: true });

        s1.addTransitionForSymbol('a', s2);
        expect(s1.getTransitionsForSymbol('a')).toEqual([s2])
    });

    it('returns an empty array for a symbol that is not existent in the state', () => {
        const s1 = new State({ accepting: false });
        const s2 =  new State({ accepting: true });
        expect(s1.getTransitionsForSymbol('a')).toEqual([])
    })
})