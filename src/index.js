/*  
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
*/

import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugResolved,
  bugRemoved,
  getUnresolvedBugs,
  bugAssignedToUser,
  getBugsByUser,
} from "./store/bugs";
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";

const store = configureStore();

store.subscribe(() => {
  console.log("store changed!");
});

/** With RTK */
store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));
store.dispatch(bugAdded({ description: "Bug 3" }));
store.dispatch(bugResolved({ id: 1 }));
store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));
// store.dispatch(bugRemoved({ id: 2 }));

store.dispatch(projectAdded({ name: "Road Construction" }));

store.dispatch(userAdded({ name: "Mark" }));
store.dispatch(userAdded({ name: "John" }));

const unresolvedBugs = getUnresolvedBugs(store.getState());
const bugs = getBugsByUser(1)(store.getState());
console.log(bugs);

/** without RTK */
/*store.dispatch(actions.bugAdded("Bug 1"));
store.dispatch(actions.bugAdded("Bug 2"));
store.dispatch(actions.bugAdded("Bug 3"));
store.dispatch(actions.bugResolved(1));*/

console.log(store.getState());
