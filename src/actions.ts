import { initGlobalState, type MicroAppStateActions } from 'qiankun';

const initialState = {
  sharedData: null,
};

export const actions: MicroAppStateActions = initGlobalState(initialState);

// 监听全局状态变化
actions.onGlobalStateChange((state, prev) => {
  console.log('主应用监听到全局状态变化:', state, prev);
});
