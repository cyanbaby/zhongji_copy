/* eslint-disable */
import types, {
  ENABLE_ACTIVE,
  DISABLE_ACTIVE,
  ENABLE_ASPECT,
  DISABLE_ASPECT,
  ENABLE_DRAGGABLE,
  DISABLE_DRAGGABLE,
  ENABLE_RESIZABLE,
  DISABLE_RESIZABLE,
  ENABLE_PARENT_LIMITATION,
  DISABLE_PARENT_LIMITATION,
  ENABLE_SNAP_TO_GRID,
  DISABLE_SNAP_TO_GRID,
  CHANGE_ZINDEX,
  ENABLE_BOTH_AXIS,
  ENABLE_X_AXIS,
  ENABLE_Y_AXIS,
  ENABLE_NONE_AXIS,
  CHANGE_HEIGHT,
  CHANGE_LEFT,
  CHANGE_MINH,
  CHANGE_MINW,
  CHANGE_TOP,
  CHANGE_WIDTH,
} from "./types/mutation-types";

const state = {
  /*
        TODO
            
            text 属性是新增的 ✔
            
            动态组件 name
                EditableText
                UneditableText
                Picture

            rects 中原有的属性，新增时需要计算 例如宽高..

            移除功能

            预设 class 例如： box-shaddow

            Tip 回显

            import {nanoid} from "nanoid";  nanoid()

            isShow ✔

    */
  rects: [
    {
      // id: nanoid(),
      isShowEditor: false,
      isShow: true,
      showHtml: true,
      width: 200,
      height: 150,

      top: 10,
      left: 10,
      draggable: true,
      resizable: true,
      minw: 10,
      minh: 10,
      axis: "both",
      parentLim: true,
      snapToGrid: false,
      aspectRatio: false,
      zIndex: 1,
      color: "#E6C27A",
      active: false,
      text: "我是标题 1111111111111111111111111111111111111111111111111111111111111111111",
    },
    {
      // id: nanoid(),
      isShowEditor: false,
      isShow: true,
      showHtml: true,
      width: 200,
      height: 150,

      top: 10,
      left: 220,
      draggable: true,
      resizable: true,
      minw: 10,
      minh: 10,
      axis: "both",
      parentLim: true,
      snapToGrid: false,
      aspectRatio: false,
      zIndex: 1,
      color: "#E6C27A",
      active: false,
      text: "我是标题 222222222222222222222222222222222222222222222222222222222222222222",
    },
    {
      // id: nanoid(),
      isShowEditor: false,
      isShow: true,
      showHtml: true,
      width: 200,
      height: 150,
      top: 170,
      left: 10,
      draggable: true,
      resizable: true,
      minw: 10,
      minh: 10,
      axis: "both",
      parentLim: true,
      snapToGrid: false,
      aspectRatio: false,
      zIndex: 1,
      color: "#AED581",
      active: false,
      text: "我是标题 33333333333333333333333333333333333333333333333333333333333333333333",
    },
    {
      // id: nanoid(),
      isShowEditor: false,
      isShow: true,
      showHtml: true,
      width: 200,
      height: 150,

      top: 170,
      left: 220,
      draggable: true,
      resizable: true,
      minw: 10,
      minh: 10,
      axis: "both",
      parentLim: true,
      snapToGrid: false,
      aspectRatio: false,
      // 'zIndex': 3,
      zIndex: 1,
      color: "#81D4FA",
      active: false,
      text: "我是标题 444444444444444444444444444444444444444444444444444444444444444444444",
    },
  ],
};

const mutations = {
  chnageText(state, { id, text }) {
    state.rects[id].text = text;
  },

  resizeElement(state, { id, width, height }) {
    state.rects[id].width = width;
    state.rects[id].height = height;
  },
  changeShowHtml(state, { id, showHtml }) {
    state.rects[id].showHtml = showHtml;
  },
  pushElement(state, elem) {
    state.rects.push(elem);
  },
  setNewRects(state, newRects) {
    state.rects = newRects;
  },
  [ENABLE_ACTIVE](state, id) {
    state.rects[id].active = true;
  },
  [DISABLE_ACTIVE](state, id) {
    state.rects[id].active = false;
    // console.log(state.rects.map(e => e.active))
  },

  [ENABLE_ASPECT](state, id) {
    state.rects[id].aspectRatio = true;
  },
  [DISABLE_ASPECT](state, id) {
    state.rects[id].aspectRatio = false;
  },

  [ENABLE_DRAGGABLE](state, id) {
    state.rects[id].draggable = true;
  },
  [DISABLE_DRAGGABLE](state, id) {
    state.rects[id].draggable = false;
  },

  [ENABLE_RESIZABLE](state, id) {
    state.rects[id].resizable = true;
  },
  [DISABLE_RESIZABLE](state, id) {
    state.rects[id].resizable = false;
  },

  [ENABLE_SNAP_TO_GRID](state, id) {
    state.rects[id].snapToGrid = true;
  },
  [DISABLE_SNAP_TO_GRID](state, id) {
    state.rects[id].snapToGrid = false;
  },

  [ENABLE_BOTH_AXIS](state, id) {
    state.rects[id].axis = "both";
  },
  [ENABLE_NONE_AXIS](state, id) {
    state.rects[id].axis = "none";
  },
  [ENABLE_X_AXIS](state, id) {
    state.rects[id].axis = "x";
  },
  [ENABLE_Y_AXIS](state, id) {
    state.rects[id].axis = "y";
  },

  [ENABLE_PARENT_LIMITATION](state, id) {
    state.rects[id].parentLim = true;
  },
  [DISABLE_PARENT_LIMITATION](state, id) {
    state.rects[id].parentLim = false;
  },

  [CHANGE_ZINDEX](state, payload) {
    state.rects[payload.id].zIndex = payload.zIndex;
  },

  [CHANGE_HEIGHT](state, payload) {
    state.rects[payload.id].height = payload.height;
  },

  [CHANGE_WIDTH](state, payload) {
    state.rects[payload.id].width = payload.width;
  },

  [CHANGE_TOP](state, payload) {
    state.rects[payload.id].top = payload.top;
  },

  [CHANGE_LEFT](state, payload) {
    state.rects[payload.id].left = payload.left;
  },

  [CHANGE_MINH](state, payload) {
    state.rects[payload.id].minh = payload.minh;
  },

  [CHANGE_MINW](state, payload) {
    state.rects[payload.id].minw = payload.minw;
  },
};

const actions = {
  chnageText({ commit }, { id, text }) {
    // console.group('actions chnageText')
    // console.log(id)
    // console.log(text)
    // console.groupEnd()

    commit("chnageText", { id, text });
  },

  resizeElement({ commit }, obj) {
    // alert(JSON.stringify(obj, null, 4))
    commit("resizeElement", obj);
  },

  changeShowHtml({ commit }, { id, showHtml }) {
    commit("changeShowHtml", { id, showHtml });
  },

  addElement({ commit }, { elem }) {
    commit("pushElement", elem);
  },

  removeElement({ commit, state }, { id }) {
    const newList = JSON.parse(JSON.stringify(state.rects)).map(
      (element, index) => {
        element.active = false;
        if (index === id) {
          element.isShow = false;
        }
        return element;
      }
    );

    commit("setNewRects", newList);
  },

  setActive({ commit, state }, { id }) {
    for (let i = 0, l = state.rects.length; i < l; i++) {
      if (i === id) {
        commit(types.ENABLE_ACTIVE, i);
        continue;
      }

      commit(types.DISABLE_ACTIVE, i);
    }
  },
  unsetActive({ commit }, { id }) {
    commit(types.DISABLE_ACTIVE, id);
  },

  toggleDraggable({ commit, state }, { id }) {
    if (!state.rects[id].draggable) {
      commit(types.ENABLE_DRAGGABLE, id);
    } else {
      commit(types.DISABLE_DRAGGABLE, id);
    }
  },

  toggleResizable({ commit, state }, { id }) {
    if (!state.rects[id].resizable) {
      commit(types.ENABLE_RESIZABLE, id);
    } else {
      commit(types.DISABLE_RESIZABLE, id);
    }
  },

  toggleParentLimitation({ commit, state }, { id }) {
    if (!state.rects[id].parentLim) {
      commit(types.ENABLE_PARENT_LIMITATION, id);
    } else {
      commit(types.DISABLE_PARENT_LIMITATION, id);
    }
  },

  toggleSnapToGrid({ commit, state }, { id }) {
    if (!state.rects[id].snapToGrid) {
      commit(types.ENABLE_SNAP_TO_GRID, id);
    } else {
      commit(types.DISABLE_SNAP_TO_GRID, id);
    }
  },

  setAspect({ commit }, { id }) {
    commit(types.ENABLE_ASPECT, id);
  },
  unsetAspect({ commit }, { id }) {
    commit(types.DISABLE_ASPECT, id);
  },

  setWidth({ commit }, { id, width }) {
    commit(types.CHANGE_WIDTH, { id, width });
  },

  setHeight({ commit }, { id, height }) {
    commit(types.CHANGE_HEIGHT, { id, height });
  },

  setTop({ commit }, { id, top }) {
    commit(types.CHANGE_TOP, { id, top });
  },

  setLeft({ commit }, { id, left }) {
    commit(types.CHANGE_LEFT, { id, left });
  },

  changeXLock({ commit, state }, { id }) {
    switch (state.rects[id].axis) {
      case "both":
        commit(types.ENABLE_Y_AXIS, id);
        break;
      case "x":
        commit(types.ENABLE_NONE_AXIS, id);
        break;
      case "y":
        commit(types.ENABLE_BOTH_AXIS, id);
        break;
      case "none":
        commit(types.ENABLE_X_AXIS, id);
        break;
    }
  },

  changeYLock({ commit, state }, { id }) {
    switch (state.rects[id].axis) {
      case "both":
        commit(types.ENABLE_X_AXIS, id);
        break;
      case "x":
        commit(types.ENABLE_BOTH_AXIS, id);
        break;
      case "y":
        commit(types.ENABLE_NONE_AXIS, id);
        break;
      case "none":
        commit(types.ENABLE_Y_AXIS, id);
        break;
    }
  },

  changeZToBottom({ commit, state }, { id }) {
    if (state.rects[id].zIndex === 1) {
      return;
    }

    commit(types.CHANGE_ZINDEX, { id, zIndex: 1 });

    for (let i = 0, l = state.rects.length; i < l; i++) {
      if (i !== id) {
        if (state.rects[i].zIndex === state.rects.length) {
          continue;
        }
        commit(types.CHANGE_ZINDEX, {
          id: i,
          zIndex: state.rects[i].zIndex + 1,
        });
      }
    }
  },

  changeZToTop({ commit, state }, { id }) {
    if (state.rects[id].zIndex === state.rects.length) {
      return;
    }

    commit(types.CHANGE_ZINDEX, { id, zIndex: state.rects.length });

    for (let i = 0, l = state.rects.length; i < l; i++) {
      if (i !== id) {
        if (state.rects[i].zIndex === 1) {
          continue;
        }
        commit(types.CHANGE_ZINDEX, {
          id: i,
          zIndex: state.rects[i].zIndex - 1,
        });
      }
    }
  },

  setMinWidth({ commit }, { id, width }) {
    commit(types.CHANGE_MINW, { id, minw: width });
  },

  setMinHeight({ commit }, { id, height }) {
    commit(types.CHANGE_MINH, { id, minh: height });
  },
};

const getters = {
  getActive: (state) => {
    for (let i = 0, l = state.rects.length; i < l; i++) {
      let rect = state.rects[i];

      if (rect.active) {
        return i;
      }
    }
    return null;
  },
};

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};
