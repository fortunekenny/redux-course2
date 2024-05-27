import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

// Reducer
let lastId = 0;

/* using createSlice to createAction and createReducer*/

const slice = createSlice({
  name: "bug",
  initialState: [],
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugResolved: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },
    bugRemoved: (bugs, action) => {
      return bugs.filter((bug) => bug.id !== action.payload.id);
    },
    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.findIndex((bug) => bug.id === bugId);
      bugs[index].userId = userId;
    },
  },
});

// console.log(slice);
export const { bugAdded, bugResolved, bugRemoved, bugAssignedToUser } =
  slice.actions;
export default slice.reducer;

//Selector function

export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);

export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );

//Action creators
//using arrow function style

/*export const bugAdded = createAction("bugAdded");

export const bugRemoved = createAction("bugRemoved");

export const bugResolved = createAction("bugResolved");*/

/*export const bugRemoved = (id) => ({
  type: BUG_REMOVED,
  payload: {
    id,
  },
});

export const bugResolved = (id) => ({
  type: BUG_RESOLVED,
  payload: {
    id,
  },
});*/

/** reducer & action in RTK without switch sttmnt */

/*export default createReducer([], {
  [bugAdded.type]: (bugs, action) => {
    bugs.push({
      id: ++lastId,
      description: action.payload.description,
      resolved: false,
    });
  },

  [bugResolved.type]: (bugs, action) => {
    const index = bugs.findIndex((bug) => bug.id === action.payload.id);
    bugs[index].resolved = true;
  },

  [bugRemoved.type]: (bugs, action) => {
    return bugs.filter((bug) => bug.id !== action.payload.id);
  },
});*/

/** actions with RTK */
/*export default function redubugs = [], action) {
  switch (action.type) {
    case bugAdded.type:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case bugRemoved.type:
      return state.filter((bug) => bug.id !== action.payload.id);

    case bugResolved.type:
      return state.map((bug) =>
        bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
      );

    default:
      return state;
  }
}

/** Manual Without RTK */
/*export default function reducer(state = [], action) {
  switch (action.type) {
    case BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case BUG_REMOVED:
      return state.filter((bug) => bug.id !== action.payload.id);

    case BUG_RESOLVED:
      return state.map((bug) =>
        bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
      );

    default:
      return state;
  }
}*/
