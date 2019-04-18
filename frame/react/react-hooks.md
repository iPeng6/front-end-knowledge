# React Hooks

## 状态管理

```js
// context.tsx
import React, { useReducer, createContext, FC, useContext } from 'react'
import { ActionType } from './types'
import { initialState, reducer } from './reducer'

const StateCtx = createContext(initialState)
const DispatchCtx = createContext((() => {}) as React.Dispatch<ActionType>)

export const Provider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <DispatchCtx.Provider value={dispatch}>
      <StateCtx.Provider value={state}>{children}</StateCtx.Provider>
    </DispatchCtx.Provider>
  )
}

export const useStore = () => {
  const state = useContext(StateCtx)
  const dispatch = useContext(DispatchCtx)
  return { state, dispatch }
}
```

```js
// reducer.ts
import { Types, ActionType } from './types'
import { Plans, PlanWithDetail, TaskWithDetail } from '../List/model'
import { getPlans, getTasks } from '../List/model'

export const initialState: State = {
  groupId: ''
}

interface State {
  groupId: string;
}

export const reducer = (state: State, { type, payload }: ActionType): State => {
  switch (type) {
    case Types.SetGroupId:
      return { ...state, groupId: payload.groupId }
    default:
      return state
  }
}
```

```js
// types.ts
export enum Types {
  SetGroupId,
  SetPlanData,
  SetPlanTasks,
  FetchPlanData,
  FetchPlanTasks,
}

export type ActionType = {
  type: Types
  payload: any
}
```
