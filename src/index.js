import { bugAdded, bugRemoved, bugResolved } from "./actions";
import store from "./store";

const unsubscribe = store.subscribe(() => {
  console.log("Store changed!", store.getState());
});

unsubscribe();
store.dispatch(bugAdded("Bug 1"));

unsubscribe();
store.dispatch(bugAdded("Bug 2"));

unsubscribe();
store.dispatch(bugResolved(1));

// store.dispatch(bugRemoved(1));

console.log(store.getState());
